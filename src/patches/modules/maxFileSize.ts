import { BetterDiscord } from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const MaxFileSizeMod = BetterDiscord.Webpack.getMangled(
	BetterDiscord.Webpack.Filters.bySource('klass:"photoshop"'),
	{
		getMaxFileSize: (x) => x.toString().includes("getUserMaxFileSize"),
		exceedsMessageSizeLimit: (x) => x.toString().includes("Array.from(", ".size>"),
	}
);

export default {
	name: "File Size",
	description: "Disables the max file size popup (used for clips).",
	ids: undefined, // array of entry ids
	apply(finale, patcher) {
		patcher.instead(MaxFileSizeMod, "getMaxFileSize", (_, [guildId], originalFunction) => {
			const videoClipsEnabled = SettingsStore.get("useClipBypass");
			const audioClipsEnabled = SettingsStore.get("useAudioClipBypass");
			const zipClipsEnabled = SettingsStore.get("zipClip");
			let normal = originalFunction(guildId);

			if (videoClipsEnabled || audioClipsEnabled || zipClipsEnabled)
				return Math.max(100 * 1024 * 1024, normal); //100 MB or normal/server's file size if greater
			else return normal;
		});

		patcher.instead(MaxFileSizeMod, "exceedsMessageSizeLimit", () => {
			return false;
		});
	},
};
