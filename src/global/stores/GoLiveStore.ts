import {BetterDiscord} from "@shared/*";
import SettingsStore from "./SettingsStore.ts";


export default new class GoLiveStore extends BetterDiscord.Utils.Store {
    getConfig() {
        const settings = SettingsStore.getAll();

        return {
            maxBitrate: settings.maxBitrate,
            minBitrate: settings.minBitrate,
            fps: settings.CustomFPS,
            targetBitrate: settings.targetBitrate,
            voiceBitrate: settings.voiceBitrate,
            videoCodec: settings.videoCodec2,
            resolution: settings.CustomResolution,
        }
    }

    isEnabled() {
        const d = SettingsStore.getAll();

        return {
            isResolutionEnabled: d.screenSharing,
            isBitrateEnabled: d.CustomBitrateEnabled
        }
    }
}