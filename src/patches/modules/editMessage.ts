import {
	EMOJI_ID_FROM_URL_REGEX,
	EMOJI_STRING_REGEX,
	EMOJI_URL_REGEX,
	getEmojiExtension,
	getEmojiString,
	getEmojiUrl,
	HYPERLINK_EMOJI_REGEX,
	shouldSkipEmojiBypass,
} from "@utils/*";
import { BetterDiscord } from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const { EmojiStore } = BetterDiscord.Webpack.Stores;

export default {
	name: "Edit Message",
	description:
		"Replaces emoji URLs and hyperlinks with emoji string when starting editing, and performs emoji bypass when finished editing.",
	ids: undefined,
	waitFor: [(x) => x._sendMessage],
	apply(finale, patcher) {
		patcher.before(finale.modules[0], "editMessage", (_, [channelId, msgId, msg]: any) => {
			const emojiBypassEnabled = SettingsStore.get("emojiBypass");
			if (!emojiBypassEnabled) return;

			const emojiBypassType: number = SettingsStore.get("emojiBypassType");
			const editMessageWithEmoji: boolean = SettingsStore.get("editMessageWithEmoji");

			if (!editMessageWithEmoji) return;

			let matches = msg.content.match(EMOJI_STRING_REGEX);

			for (let i = 0; i < matches?.length; i++) {
				const emojiString = matches[i];
				let emojiId = emojiString.replace("<", "").replace(">", "").split(":")[2];
				const emoji = EmojiStore.getCustomEmojiById(emojiId);

				if (shouldSkipEmojiBypass(emoji, channelId)) continue;

				const emojiUrl = getEmojiUrl(emoji);

				switch (emojiBypassType) {
					default:
					case 0: //upload
					case 1: //ghost mode (removed)
					case 3: //vencord mode
						msg.content = msg.content.replace(
							emojiString,
							`[${emoji.name}](${emojiUrl}&${i})`
						);
						break;
					case 2: //classic
						msg.content = msg.content.replace(emojiString, `${emojiUrl}&${i}`);
						break;
				}
			}
		});

		//starting editing message
		patcher.before(finale.modules[0], "startEditMessageRecord", (_, [channelId, msg]: any) => {
			const editMessageWithEmoji: boolean = SettingsStore.get("editMessageWithEmoji");
			if (!msg?.content || !editMessageWithEmoji) return;

			function replaceMatchWithEmojiString(match: string) {
				const emoji = EmojiStore.getCustomEmojiById(match.match(EMOJI_ID_FROM_URL_REGEX));
				const emojiString = getEmojiString(emoji);

				msg.content = msg.content.replace(match, emojiString);
			}

			let hyperlinkMatches: Array<any> = msg.content.match(HYPERLINK_EMOJI_REGEX);
			hyperlinkMatches?.forEach?.((match: string) => replaceMatchWithEmojiString(match));

			// original plugin also replaces for direct url, despite the renderMessage and renderEmbeds functions ignoring them,
			// which is weird cause doing this causes weird behavior

			// let directUrlMatches: Array<any> = msg.content.match(EMOJI_URL_REGEX);
			// directUrlMatches?.forEach?.((match: string) => replaceMatchWithEmojiString(match));
		});
	},
};
