import {BetterDiscord} from "@shared/*";

import * as modules from "./modules";
import * as contextMenus from "./contextMenus";

import type {Ids, Patch} from "../types/patches";

const PatcherAPI = new BdApi("Patcher");

const moduleCache = new Map<string, any>();
const idCache = new Map<string, number>();

async function resolveIds(ids?: Ids): Promise<number[]> {
    if (!ids) return [];
    const entries = typeof ids === "function" ? await ids() : ids;

    const results = await Promise.allSettled(entries.map(async entry => {
        const id = typeof entry === "function" ? await entry() : entry;
        const cacheKey = id.toString();

        if (idCache.has(cacheKey)) {
            return idCache.get(cacheKey)!;
        }

        const resolvedId = await BetterDiscord.Utils.forceLoad(id);
        idCache.set(cacheKey, resolvedId);
        return resolvedId;
    }));

    const resolved: number[] = [];
    results.forEach((r, i) => {
        if (r.status === "fulfilled") {
            resolved.push(r.value); // fixed race condition with loading modules ?
        } else {
            BetterDiscord.Logger.warn(`[Patcher] Failed to resolve id at index ${i}`, r.reason);
        }
    });

    return resolved;
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
    return Promise.race([
        p,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timeout waiting for ${label}`)), ms)),
    ]);
}

async function getCachedModule(filter: any, patchName: string): Promise<any> {
    const cacheKey = typeof filter === "function" ? filter.toString() : JSON.stringify(filter);

    if (moduleCache.has(cacheKey)) {
        return moduleCache.get(cacheKey);
    }

    const module = await withTimeout(
        BetterDiscord.Webpack.waitForModule(filter),
        10000,
        patchName
    );

    moduleCache.set(cacheKey, module);
    return module;
}

async function loadPatch(patch: Patch) {
    const finale: Record<string, any> = {};

    const operations = [
        resolveIds(patch.ids)
            .then(ids => {
                if (ids.length) finale.ids = ids;
            })
            .catch(e => BetterDiscord.Logger.warn(`[Patcher] Failed to load IDs for ${patch.name}`, e)),

        ...(Array.isArray(patch.waitFor)
            ? patch.waitFor.map(async (x, i) => {
                try {
                    const module = await getCachedModule(x, patch.name);
                    if (!finale.modules) finale.modules = [];
                    finale.modules[i] = module;
                } catch (e) {
                    BetterDiscord.Logger.warn(`[Patcher] Failed to load module ${i} for ${patch.name}`, e);
                }
            })
            : []),

        ...(patch.mangled && patch.waitFor
            ? [getCachedModule(patch.waitFor[0], patch.name)
                .then(() => {
                    finale.mangled = BetterDiscord.Webpack.getMangled(patch.waitFor![0], patch.mangled);
                })
                .catch(e => BetterDiscord.Logger.warn(`[Patcher] Failed to load mangled for ${patch.name}`, e))]
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
    };

    const sortedPatches = patches.sort((a, b) =>
        ((b as any).priority || 0) - ((a as any).priority || 0)
    );

    sortedPatches.forEach(async patch => {
        if (isCleanedUp) return;

        try {
            const finale = await loadPatch(patch);

            if (isCleanedUp) return;

            patch.apply(finale, PatcherAPI.Patcher);
            loaded.push(patch);
        } catch (e) {
            BetterDiscord.Logger.error(`[Patcher] "${patch.name}" failed`, e);
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
        const patch = BetterDiscord.ContextMenu.patch(module.id, (res, props) => module.callback(res, props));
        loaded.push(patch);
    }

    return cleanup;
}