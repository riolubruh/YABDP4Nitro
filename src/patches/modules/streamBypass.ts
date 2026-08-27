import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";

export default {
	name: "streamBypass",
	description: "Custom Bitrates, FPS, Resolution",
	waitFor: [
		BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"),
		BetterDiscord.Webpack.Filters.bySource("preset)&&", "resolution&&", "fps&&"),
	],
	apply(finale: any, patcher: any) {
		const _class = finale.modules[0];
		patcher.before(_class.prototype, "updateVideoQuality", (e: any) => {
			const { CustomBitrateEnabled, minBitrate, targetBitrate, maxBitrate, voiceBitrate } =
				SettingsStore.getAll();

			const vqm = e.videoQualityManager;
			const vqmOpt = vqm.options;

			voiceBitrate >= 0 && e.setVoiceBitRate(voiceBitrate * 1000);

			//stream bitrate
			let quality = {
				bitrateMax: CustomBitrateEnabled && maxBitrate > 0 ? maxBitrate * 1000 : null,
				bitrateMin: CustomBitrateEnabled && minBitrate >= 0 ? minBitrate * 1000 : null,
				bitrateTarget:
					CustomBitrateEnabled && targetBitrate >= 0 ? targetBitrate * 1000 : null,
			};

			vqmOpt.videoBitrateFloor =
				CustomBitrateEnabled && minBitrate > 0 ? minBitrate * 1000 : 150000;

			vqm.setGoliveQuality(quality);

			//Camera bitrate
			e.context == "default" &&
				vqm.setQualityOverwrite({
					...quality,
				});
		});

		//areStreamSettingsAllowed
		patcher.instead(
			finale.modules[1],
			Object.keys(finale.modules[1]).find(Boolean),
			(e, args, originalFunction) => {
				return SettingsStore.get("screenSharing") ?? originalFunction.apply(e, args);
			}
		);
	},
} as Patch;
