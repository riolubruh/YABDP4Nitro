import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const LadderModule = BetterDiscord.Webpack.getByKeys("calculateLadder", {searchExports: true})

export default {
    name: 'streamBypass',
    description: 'Custom Bitrates, FPS, Resolution',
    waitFor: [BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"), BetterDiscord.Webpack.Filters.bySource("preset)&&","resolution&&","fps&&")],
    apply(finale: any, patcher: any) {

        const _class = finale.modules[0];
        patcher.before(_class.prototype, "updateVideoQuality", (e:any) => {
            const customBitrateEnabled = SettingsStore.get("CustomBitrateEnabled");
            const minBitrate = SettingsStore.get("minBitrate") > 0 ? SettingsStore.get("minBitrate") * 1000 : 5e5;
            const targetBitrate = SettingsStore.get("targetBitrate") > 0 ? SettingsStore.get("targetBitrate") * 1000 : 45e5;
            const maxBitrate = SettingsStore.get("maxBitrate") > 0 ? SettingsStore.get("maxBitrate") * 1000 : 9e6;
            const voiceBitrate = SettingsStore.get("voiceBitrate") * 1000;

            //(shorthands)
            const vqm = e.videoQualityManager;
            const vqmOpt = vqm.options;

            if(customBitrateEnabled){
                //old plugin changes ALL different variables related to bitrate, but these seem to be enough?
                vqmOpt.desktopBitrate.min = minBitrate;
                vqmOpt.desktopBitrate.target = targetBitrate;
                vqmOpt.desktopBitrate.max = maxBitrate;
            }

            const maxVideoQuality = {
                width: e.videoStreamParameters[0].maxResolution.width,
                height: e.videoStreamParameters[0].maxResolution.height,
            }

            let videoCapture = {
                width: maxVideoQuality.width > 0 ? maxVideoQuality.width : screen.width,
                height: maxVideoQuality.height > 0 ? maxVideoQuality.height : screen.height,
                framerate: e.videoStreamParameters[0].maxFrameRate
            };

            (voiceBitrate > 0) && (e.voiceBitrate = voiceBitrate);

            vqm.options.videoBudget = videoCapture;
            vqm.options.videoCapture = videoCapture;

            //Ladder bypasses - still not 100% sure what this does, probably related to Adaptive Bitrate. Maybe remove.
            let pixelBudget = (videoCapture.width * videoCapture.height);
            vqm.ladder.pixelBudget = pixelBudget;
            vqm.ladder.ladder = LadderModule.calculateLadder(pixelBudget);
            vqm.ladder.orderedLadder = LadderModule.calculateOrderedLadder(vqm.ladder.ladder);
        });

        //areStreamSettingsAllowed
        patcher.instead(finale.modules[1], Object.keys(finale.modules[1]).find(Boolean), () => {return true});
    }
} as Patch