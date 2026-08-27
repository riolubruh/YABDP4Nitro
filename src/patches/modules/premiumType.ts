import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const { OverridePremiumTypeStore } = BetterDiscord.Webpack.Stores;

export default {
	name: "premiumType",
	description: "Makes sure the premium type is always what you want",
	apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
		patcher.instead(OverridePremiumTypeStore, "getPremiumTypeActual", (_, __, callback) => {
			const info = SettingsStore.get("changePremiumType2");
			if (info == -1) return callback();
			return info;
		});
	},
} as Patch;
