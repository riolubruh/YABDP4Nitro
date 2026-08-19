import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const LadderModule = BetterDiscord.Webpack.getByKeys("calculateLadder", {searchExports: true})

export default {
    name: 'streamBypass',
    description: 'Custom Bitrates, FPS, Resolution',
    waitFor: [BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"), BetterDiscord.Webpack.Filters.bySource("preset)&&","resolution&&","fps&&")],
    apply(finale: any, patcher: any) {

        const _class = finale.modules[0];
        patcher.before(_class.prototype, "updateVideoQuality", (e:any) => {
            const {CustomBitrateEnabled, minBitrate, targetBitrate, maxBitrate, voiceBitrate} = SettingsStore.getAll();

            //(shorthands)
            const vqm = e.videoQualityManager;
            const vqmOpt = vqm.options;

            if(CustomBitrateEnabled){
                //old plugin changes ALL different variables related to bitrate, but these seem to be enough?
                vqmOpt.desktopBitrate.min = minBitrate > 0 ? minBitrate * 1000 : 5e5;
                vqmOpt.videoBitrateFloor = minBitrate > 0 ? minBitrate * 1000 : 5e5;
                vqmOpt.desktopBitrate.target = targetBitrate > 0 ? targetBitrate * 1000 : 45e5;
                vqmOpt.desktopBitrate.max = maxBitrate > 0 ? maxBitrate * 1000 : 9e6;
                vqmOpt.videoBitrate.max = maxBitrate > 0 ? maxBitrate * 1000 : 9e6;
            }

            const maxVideoQuality = e.videoStreamParameters[0].maxResolution;

            let videoCapture = {
                width: maxVideoQuality.width > 0 ? maxVideoQuality.width : screen.width,
                height: maxVideoQuality.height > 0 ? maxVideoQuality.height : screen.height,
                framerate: e.videoStreamParameters[0].maxFrameRate
            };

            (voiceBitrate > 0) && (e.voiceBitrate = voiceBitrate * 1000);

            vqmOpt.videoBudget = videoCapture;
            vqmOpt.videoCapture = videoCapture;

            //Ladder bypasses - still not 100% sure what this does, probably related to Adaptive Bitrate. Maybe remove.
            let pixelBudget = (videoCapture.width * videoCapture.height);
            vqm.ladder.pixelBudget = pixelBudget;
            vqm.ladder.ladder = LadderModule.calculateLadder(pixelBudget);
            vqm.ladder.orderedLadder = LadderModule.calculateOrderedLadder(vqm.ladder.ladder);
        });

        //areStreamSettingsAllowed
        patcher.instead(finale.modules[1], Object.keys(finale.modules[1]).find(Boolean), (e,args,originalFunction) => {

            return SettingsStore.get("screenSharing") ?? originalFunction.apply(e, args);
        });
    }
} as Patch