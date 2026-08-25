import { BetterDiscord } from "@shared/*";
import { EMOJI_PREFIX } from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const EMOJI_HYPERLINK_REGEX =
	/\[.*?\]\(https:\/\/cdn\.discordapp\.com\/emojis\/\d+\.(png|webp|gif|avif|jpg|jpeg).*?\)/;

export default {
	name: "Render Message Embeds",
	description: "Removes emoji link embeds for inline fakemoji.",
	ids: undefined, // array of entry ids
	waitFor: [BetterDiscord.Webpack.Filters.bySource("renderEmbeds", "renderSuppressEmbeds")], // filters to wait for.
	mangled: {
		renderEmbeds: (x) => x?.toString?.().includes?.("renderSuppressEmbeds"),
	},
	apply(finale, patcher) {
		patcher.before(finale.mangled, "renderEmbeds", (_: any, [args]: any) => {
			if (!SettingsStore.get("fakeInlineVencordEmotes")) return;
			const message = args?.message;
			let embeds = message?.embeds;
			for (let i = 0; i < embeds?.length; i++) {
				const embed = embeds[i];
				if (
					!embed?.url ||
					!embed?.url?.startsWith(EMOJI_PREFIX) ||
					message.content.replace(EMOJI_HYPERLINK_REGEX, "").trim() == "" ||
					!args.message.content.includes(`](${embed.url})`)
				)
					continue;

				delete embeds[i];
			}
			message.embeds = embeds.filter(Boolean);
		});
	},
};
