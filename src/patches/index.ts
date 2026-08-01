import * as modules from "./modules"
import {BetterDiscord} from "@global/*";
import type {Patch} from "../types/patches";

const PatcherAPI = new BdApi("Patcher");

export async function load()
{
    const loaded: Patch[] = [];

    for (const [path, module] of Object.entries(modules)) {
        const Patch: Patch = module;
        if (Array.isArray(Patch.ids)) {
            await Promise.all([Patch.ids.map(x => BetterDiscord.Utils.forceLoad(x))])
        }

        if (Array.isArray(Patch.waitFor)) {
            await Promise.all([Patch.waitFor.map(x => BetterDiscord.Webpack.waitForModule(x))])
        }

        Patch.apply(PatcherAPI.Patcher)
    }

    return () => {
        for (const patch of loaded) patch.revert?.();
        PatcherAPI.Patcher.unpatchAll();
    };
}
