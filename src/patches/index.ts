import { BetterDiscord } from "@shared/*";

import * as modules from "./modules";
import * as contextMenus from "./contextMenus";

import type { Ids, Patch } from "../types/patches";
const PatcherAPI = new BdApi("Patcher");

const moduleCache = new Map<any, any>();
const idCache = new Map<string, number>();
const entryCache = new Map<string, number>();

// Keep this enabled for console screeshots.
const DEBUG = true;

const bootTime = Date.now();
const logBuf: { t: number; level: "warn" | "error"; msg: string }[] = [];
const pending = new Map<string, number>();
const patchStatus = new Map<string, { ok: boolean; ms: number; error?: string }>();

function log(level: "warn" | "error", msg: string) {
	logBuf.push({ t: Date.now() - bootTime, level, msg });
	if (DEBUG) BetterDiscord.Logger[level]("[Patcher:debug]", msg);
}

function track<T>(label: string, p: Promise<T>): Promise<T> {
	pending.set(label, Date.now());
	return p.finally(() => pending.delete(label));
}

export function getDebugSnapshot() {
	const now = Date.now();
	return {
		generatedAt: new Date(now).toISOString(),
		log: logBuf,
		patches: Object.fromEntries(patchStatus),
		stillPending: [...pending].map(([label, t]) => ({ label, elapsedMs: now - t })),
	};
}

async function resolveList(
	ids: Ids | undefined,
	loader: (id: any) => Promise<number>,
	cache: Map<string, number>,
	kind: "id" | "entry",
	patchName: string
): Promise<number[]> {
	if (!ids) return [];
	const entries = typeof ids === "function" ? await ids() : ids;

	const results = await Promise.allSettled(
		entries.map(async (entry) => {
			const id = typeof entry === "function" ? await entry() : entry;
			const cacheKey = id.toString();

			if (cache.has(cacheKey)) return cache.get(cacheKey)!;

			const label = `${patchName} ${kind} "${cacheKey}"`;
			const t0 = Date.now();
			const resolvedId = await track(label, loader?.(id));
			const dt = Date.now() - t0;

			if (resolvedId == null) log("warn", `${label} resolved to undefined (${dt}ms)`);
			else if (dt > 2000) log("warn", `${label} took ${dt}ms`);

			cache.set(cacheKey, resolvedId);
			return resolvedId;
		})
	);

	const resolved: number[] = [];
	results.forEach((r, i) => {
		if (r.status === "fulfilled") {
			resolved.push(r.value);
		} else {
			log("error", `${patchName} ${kind} at index ${i} rejected: ${r.reason}`);
		}
	});

	return resolved;
}

const resolveIds = (ids: Ids | undefined, patchName: string) =>
	resolveList(ids, BdApi.Utils.forceLoad, idCache, "id", patchName);
const resolveEntries = (ids: Ids | undefined, patchName: string) =>
	resolveList(ids, BdApi.Utils.loadEntry, entryCache, "entry", patchName);

export function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
	let settled = false;
	p.then(
		() => (settled = true),
		() => (settled = true)
	);

	return track(
		label,
		Promise.race([
			p,
			new Promise<T>((_, rej) =>
				setTimeout(() => {
					if (!settled) log("error", `TIMEOUT: "${label}" still hanging after ${ms}ms`);
					rej(new Error(`timeout waiting for ${label}`));
				}, ms)
			),
		])
	);
}

async function getCachedModule(filter: any, patchName: string): Promise<any> {
	const cacheKey = typeof filter === "function" ? filter : JSON.stringify(filter);

	if (moduleCache.has(cacheKey)) return moduleCache.get(cacheKey);

	const t0 = Date.now();
	let module: any;
	try {
		module = await withTimeout(BetterDiscord.Webpack.waitForModule(filter), 10000, `${patchName} module`);
	} catch (e) {
		log("error", `"${patchName}" waitForModule failed after ${Date.now() - t0}ms: ${e}`);
		throw e;
	}

	const dt = Date.now() - t0;
	if (module == null) log("warn", `"${patchName}" waitForModule resolved to undefined (${dt}ms)`);
	else if (dt > 2000) log("warn", `"${patchName}" waitForModule took ${dt}ms`);

	moduleCache.set(cacheKey, module);
	return module;
}

async function loadPatch(patch: Patch) {
	const finale: Record<string, any> = {};
	const t0 = Date.now();

	const operations = [
		resolveIds(patch.ids, patch.name)
			.then((ids) => {
				if (ids.length) finale.ids = ids;
				else if (patch.ids) log("warn", `"${patch.name}" got zero resolved ids`);
			})
			.catch((e) => log("error", `"${patch.name}" resolveIds threw: ${e}`)),

		resolveEntries(patch.entrys, patch.name)
			.then((entrys) => {
				if (entrys.length) finale.entrys = entrys;
				else if (patch.entrys) log("warn", `"${patch.name}" got zero resolved entrys`);
			})
			.catch((e) => log("error", `"${patch.name}" resolveEntries threw: ${e}`)),

		...(Array.isArray(patch.waitFor)
			? patch.waitFor.map(async (x, i) => {
				try {
					const module = await getCachedModule(x, `${patch.name}[waitFor:${i}]`);
					if (!finale.modules) finale.modules = [];
					finale.modules[i] = module;
				} catch (e) {
					log("error", `"${patch.name}" waitFor[${i}] failed: ${e}`);
				}
			})
			: []),

		...(patch.mangled && patch.waitFor
			? [
				getCachedModule(patch.waitFor[0], `${patch.name}[mangled]`)
					.then(() => {
						finale.mangled = BetterDiscord.Webpack.getMangled(patch.waitFor![0], patch.mangled);
						if (!finale.mangled) log("warn", `"${patch.name}" getMangled returned undefined`);
					})
					.catch((e) => log("error", `"${patch.name}" mangled resolution failed: ${e}`)),
			]
			: []),
	];

	await Promise.allSettled(operations);

	const dt = Date.now() - t0;
	if (dt > 5000) log("warn", `"${patch.name}" total load took ${dt}ms`);

	return { finale, dt };
}

export function loadPatches() {
	const patches = Object.values(modules) as Patch[];
	const loaded: Patch[] = [];
	let isCleanedUp = false;

	const cleanup = () => {
		if (isCleanedUp) return;
		isCleanedUp = true;
		for (const patch of loaded) patch.revert?.();
		PatcherAPI.Patcher.unpatchAll();

		moduleCache.clear();
		idCache.clear();
		entryCache.clear();
	};

	const sortedPatches = patches.sort(
		(a, b) => ((b as any).priority || 0) - ((a as any).priority || 0)
	);

	sortedPatches.forEach(async (patch) => {
		if (isCleanedUp) return;

		try {
			const { finale, dt } = await loadPatch(patch);

			if (isCleanedUp) return;

			patch.apply(finale, PatcherAPI.Patcher);
			loaded.push(patch);
			patchStatus.set(patch.name, { ok: true, ms: dt });
		} catch (e) {
			log("error", `"${patch.name}" failed to apply: ${e}`);
			patchStatus.set(patch.name, { ok: false, ms: Date.now() - bootTime, error: String(e) });
		}
	});

	return cleanup;
}

export function loadContextMenus() {
	const loaded: (() => void)[] = [];
	let isCleanedUp = false;

	const cleanup = () => {
		if (isCleanedUp) return;
		isCleanedUp = true;
		for (const patch of loaded) patch?.();
		loaded.length = 0;
	};

	for (const module of Object.values(contextMenus) as any[]) {
		if (isCleanedUp) break;
		try {
			const patch = BetterDiscord.ContextMenu.patch(module.id, (res, props) =>
				module.callback(res, props)
			);
			loaded.push(patch);
		} catch (e) {
			log("error", `context menu "${module.id}" failed to patch: ${e}`);
		}
	}

	return cleanup;
}