import {BetterDiscord} from "@shared/*";

import * as modules from "./modules";
import * as contextMenus from "./contextMenus";

import type {Ids, Patch} from "../types/patches";

const PatcherAPI = new BdApi("Patcher");

async function resolveIds(ids?: Ids): Promise<number[]> {
    if (!ids) return [];
    const entries = typeof ids === "function" ? await ids() : ids;
    return Promise.all(entries.map(async entry => {
        const id = typeof entry === "function" ? await entry() : entry;
        return BetterDiscord.Utils.forceLoad(id);
    }));
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
    return Promise.race([
        p,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timeout waiting for ${label}`)), ms)),
    ]);
}

async function loadPatch(patch: Patch) {
    const finale: Record<string, any> = {};

    const [ids, waitModules] = await Promise.all([
        resolveIds(patch.ids),
        Array.isArray(patch.waitFor)
            ? Promise.all(patch.waitFor.map(x => withTimeout(BetterDiscord.Webpack.waitForModule(x), 10000, patch.name)))
            : undefined,
    ]);

    if (ids.length) finale.ids = ids;
    if (waitModules) finale.modules = waitModules;

    if (patch.mangled) {
        finale.mangled = BetterDiscord.Webpack.getMangled(patch.waitFor![0], patch.mangled);
    }

    return finale;
}

export async function loadPatches() {
    const patches = Object.values(modules) as Patch[];
    const loaded: Patch[] = [];

    await Promise.allSettled(patches.map(async patch => {
        try {
            const finale = await loadPatch(patch);
            patch.apply(finale, PatcherAPI.Patcher);
            loaded.push(patch);
        } catch (e) {
            console.error(`[Patcher] "${patch.name}" failed`, e);
        }
    }));

    return () => {
        for (const patch of loaded) patch.revert?.();
        PatcherAPI.Patcher.unpatchAll();
    };
}

export function loadContextMenus() {
    const loaded: (() => void)[] = [];

    for (const module of Object.values(contextMenus) as any[]) {
        const patch = BetterDiscord.ContextMenu.patch(module.id, (res, props) => module.callback(res, props));
        loaded.push(patch);
    }

    return () => {
        for (const patch of loaded) patch?.();
    };
}