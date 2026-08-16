import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const {ClipsStore} = BetterDiscord.Webpack.Stores

const GLOBAL_SOURCE = BetterDiscord.Webpack.Filters.bySource("useEnableClips")

export default {
    name: "allowClips",
    description: "Allow clips",
    waitFor: [GLOBAL_SOURCE],
    mangled: {
        // useEnableClips: x=>x.toString().includes('getConfig({location:"useEnableClips"'),
        // why does react crash at this.. ? :think:
        areClipsEnabled: x=>x.toString().includes('areClipsEnabled'),
    },
    apply(finale, patcher) {
        Object.entries(finale.mangled).map(([key, value]) => {
            patcher.instead(finale.mangled, key, (_, __, originalFunction) => {
                const {useClipBypass, useAudioClipBypass, zipClip} = SettingsStore.getAll();
                if(useClipBypass || useAudioClipBypass || zipClip) return true;
                else return originalFunction();
            })
        });

        ["isViewerClippingAllowedForUser", "isClipsEnabledForUser", "isVoiceRecordingAllowedForUse"].map(x => patcher.instead(ClipsStore, x, (_, __, originalFunction) => {
            const {useClipBypass, useAudioClipBypass, zipClip} = SettingsStore.getAll();
            if(useClipBypass || useAudioClipBypass || zipClip) return true;
            else return originalFunction();
        }))
    }
} as Patch;