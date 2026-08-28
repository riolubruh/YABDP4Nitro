import { BetterDiscord } from "@shared/*";

import * as modules from "./modules";
import * as contextMenus from "./contextMenus";

import type { Ids, Patch } from "../types/patches";

const PatcherAPI = new BdApi("Patcher");

const moduleCache = new Map<any, any>();
const idCache = new Map<string, number>();
const entryCache = new Map<string, number>();

export interface DebugLogEntry {
	level: "info" | "warn" | "error";
	message: string;
	patch?: string;
	timestamp: number;
}

export const DebugLog: DebugLogEntry[] = [];

function log(level: DebugLogEntry["level"], message: string, patch?: string, ...args: any[]) {
	DebugLog.push({ level, message, patch, timestamp: Date.now() });

	switch (level) {
		case "info":
			BetterDiscord.Logger.info(message, ...args);
			break;
		case "warn":
			BetterDiscord.Logger.warn(message, ...args);
			break;
		case "error":
			BetterDiscord.Logger.error(message, ...args);
			break;
	}
}

export interface ResolveReport {
	requested: number;
	resolved: number;
	failed: string[];
}

function emptyReport(): ResolveReport {
	return { requested: 0, resolved: 0, failed: [] };
}

export interface PatchLoadReport {
	name: string;
	ids: ResolveReport;
	entries: ResolveReport;
	modules: ResolveReport;
	mangled: "not-used" | "ok" | "failed";
	applied: boolean;
	appliedError: string | null;
}

export const PatchReports: Record<string, PatchLoadReport> = {};

export function getDebugSnapshot() {
	return {
		log: DebugLog,
		reports: PatchReports,
	};
}

async function resolveList(
	ids: Ids | undefined,
	loader: (id: any) => Promise<number>,
	cache: Map<string, number>,
	patchName: string,
	report: ResolveReport
): Promise<number[]> {
	if (!ids) return [];
	const entries = typeof ids === "function" ? await ids() : ids;
	report.requested = entries.length;

	const results = await Promise.allSettled(
		entries.map(async (entry) => {
			const id = typeof entry === "function" ? await entry() : entry;
			const cacheKey = id.toString();

			if (cache.has(cacheKey)) {
				return cache.get(cacheKey)!;
			}

			const resolvedId = await loader?.(id);

			cache.set(cacheKey, resolvedId);
			return resolvedId;
		})
	);

	const resolved: number[] = [];
	results.forEach((r, i) => {
		if (r.status === "fulfilled") {
			resolved.push(r.value);
			report.resolved++;
		} else {
			const reason = r.reason?.message ?? String(r.reason);
			log(
				"warn",
				`[Patcher] Failed to resolve id at index ${i}: ${reason}`,
				patchName,
				r.reason
			);
			report.failed.push(`index ${i}: ${reason}`);
		}
	});

	return resolved;
}

const resolveIds = (ids: Ids | undefined, patchName: string, report: ResolveReport) =>
	resolveList(ids, BdApi.Utils.forceLoad, idCache, patchName, report);

const resolveEntries = (ids: Ids | undefined, patchName: string, report: ResolveReport) =>
	resolveList(ids, BdApi.Utils.loadEntry, entryCache, patchName, report);

export function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
	return Promise.race([
		p,
		new Promise<T>((_, rej) =>
			setTimeout(() => rej(new Error(`timeout waiting for ${label}`)), ms)
		),
	]);
}

async function getCachedModule(filter: any, patchName: string): Promise<any> {
	const cacheKey = typeof filter === "function" ? filter : JSON.stringify(filter);

	if (moduleCache.has(cacheKey)) {
		return moduleCache.get(cacheKey);
	}

	const module = await withTimeout(BetterDiscord.Webpack.waitForModule(filter), 10000, patchName);

	moduleCache.set(cacheKey, module);
	return module;
}

async function loadPatch(patch: Patch) {
	const finale: Record<string, any> = {};

	const report: PatchLoadReport = {
		name: patch.name,
		ids: emptyReport(),
		entries: emptyReport(),
		modules: emptyReport(),
		mangled: "not-used",
		applied: false,
		appliedError: null,
	};
	PatchReports[patch.name] = report;

	const operations = [
		resolveIds(patch.ids, patch.name, report.ids)
			.then((ids) => {
				if (ids.length) finale.ids = ids;
			})
			.catch((e) =>
				log("warn", `[Patcher] Failed to load IDs for ${patch.name}`, patch.name, e)
			),

		resolveEntries(patch.entrys, patch.name, report.entries)
			.then((entrys) => {
				if (entrys.length) finale.entrys = entrys;
			})
			.catch((e) =>
				log("warn", `[Patcher] Failed to load entries for ${patch.name}`, patch.name, e)
			),

		...(Array.isArray(patch.waitFor)
			? (() => {
					report.modules.requested = patch.waitFor.length;
					return patch.waitFor.map(async (x, i) => {
						try {
							const module = await getCachedModule(x, patch.name);
							if (!finale.modules) finale.modules = [];
							finale.modules[i] = module;
							report.modules.resolved++;
						} catch (e) {
							const reason = (e as Error)?.message ?? String(e);
							log(
								"warn",
								`[Patcher] Failed to load module ${i} for ${patch.name}: ${reason}`,
								patch.name,
								e
							);
							report.modules.failed.push(`index ${i}: ${reason}`);
						}
					});
				})()
			: []),

		...(patch.mangled && patch.waitFor
			? [
					getCachedModule(patch.waitFor[0], patch.name)
						.then(() => {
							finale.mangled = BetterDiscord.Webpack.getMangled(
								patch.waitFor![0],
								patch.mangled
							);
							report.mangled = "ok";
						})
						.catch((e) => {
							report.mangled = "failed";
							log(
								"warn",
								`[Patcher] Failed to load mangled for ${patch.name}`,
								patch.name,
								e
							);
						}),
				]
			: []),
	];

	await Promise.allSettled(operations);

	return finale;
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
			const finale = await loadPatch(patch);

			if (isCleanedUp) return;

			patch.apply(finale, PatcherAPI.Patcher);
			loaded.push(patch);
			if (PatchReports[patch.name]) PatchReports[patch.name].applied = true;
		} catch (e) {
			const reason = (e as Error)?.message ?? String(e);
			log("error", `[Patcher] "${patch.name}" failed: ${reason}`, patch.name, e);
			if (PatchReports[patch.name]) PatchReports[patch.name].appliedError = reason;
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
		const patch = BetterDiscord.ContextMenu.patch(module.id, (res, props) =>
			module.callback(res, props)
		);
		loaded.push(patch);
	}

	return cleanup;
}
