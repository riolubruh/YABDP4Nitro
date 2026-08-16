import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/*";
import {PresetModule} from "../../global/shared/steamExploit.ts";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const CUSTOM_ID = "custom-user-filter";

export default {
    name: "cameraPreviewBypass",
    apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
        patcher.after(PresetModule, "A", (thisObj, args, result) => {
            if (!SettingsStore.get("customVideoFilterEnabled")) return result;

            const filter = SettingsStore.get("customVideoFilter");
            if (filter?.link) {
                result[CUSTOM_ID] = {
                    id: CUSTOM_ID,
                    name: "My Custom Background",
                    source: filter.link,
                    isVideo: filter.type === "mp4",
                };
            }
            return result;
        });
    }
} as Patch