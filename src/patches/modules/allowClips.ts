import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";

const {ClipsStore} = BetterDiscord.Webpack.Stores

const GLOBAL_SOURCE = BetterDiscord.Webpack.Filters.bySource("useEnableClips")

export default {
    name: "allowClips",
    description: "Allow clips",
    waitFor: [GLOBAL_SOURCE],
    mangled: {
        useEnableClips: x=>x.toString().includes('getConfig({location:"useEnableClips"'),
        areClipsEnabled: x=>x.toString().includes('areClipsEnabled'),
    },
    apply(finale, patcher) {
        Object.entries(finale.mangled).map(([key, value]) => {
            patcher.instead(finale.mangled, key, () => true)
        });

        ["isViewerClippingAllowedForUser", "isClipsEnabledForUser", "isVoiceRecordingAllowedForUse"].map(x => patcher.instead(ClipsStore, x, () => true))
    }
} as Patch;