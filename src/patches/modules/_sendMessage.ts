import SettingsStore from "../../global/stores/SettingsStore.ts";
import {
	EMOJI_PREFIX,
	getEmojiExtension,
	getEmojiString,
	getEmojiUrl,
	shouldSkipEmojiBypass,
} from "@utils/*";
import { BetterDiscord } from "@shared/";
import { doClipsBypass } from "./clipsBypass.ts";
const { StickersStore, SoundboardStore, EmojiStore } = BetterDiscord.Webpack.Stores;
enum StickerTypeToExtension {
	// @ts-ignore
	".png" = 1,
	".png",
	".json",
	".gif",
}

const CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", {
	searchExports: true,
});

async function downloadAndUploadUrls(
	filesToDownload: { url: string; filename: string }[],
	channelId: string,
	msg: any,
	extraData: any,
	send: Function,
	numFilesInMessage: number = 1,
	alwaysSendInNewMessage: boolean = false
) {
	if (!filesToDownload.length) return;

	const preexisting = extraData.attachmentsToUpload ?? [];
	extraData.attachmentsToUpload = preexisting;

	const uploads = await Promise.all(
		filesToDownload.map(async (f) => {
			const blob = await BetterDiscord.Net.fetch(f.url, {timeout:300000}).then((r) => r.blob());
			return new CloudUploader(
				{
					file: new File([blob], f.filename),
					isClip: false,
					isThumbnail: false,
					platform: 1,
					isImage: true,
				},
				channelId,
				false,
				0
			);
		})
	);

	if (preexisting.length || alwaysSendInNewMessage) {
		await send(channelId, msg, extraData);
	} else {
		extraData.attachmentsToUpload = uploads.splice(0, numFilesInMessage);
		await send(channelId, msg, extraData);
	}
	extraData.attachmentsToUpload = [];
	msg.content = "";

	while (uploads.length) {
		await send(
			channelId,
			{ content: "" },
			{ attachmentsToUpload: uploads.splice(0, numFilesInMessage) }
		);
	}
}

const SOUNDMOJI_REGEX = /<sound:\d+:\d+>/g;

export default {
	name: "Send Message",
	description: "Upload emoji, soundmoji, stickers, and insta-clips.",
	ids: undefined,
	waitFor: [(x) => x._sendMessage],
	apply(finale, patcher) {
		patcher.instead(
			finale.modules[0],
			"_sendMessage",
			async (_: any, [channelId, msg, extraData]: any, send: Function) => {
				if (extraData.poll || extraData.activityAction || msg.location === "forwarding")
					return send.apply(_, [channelId, msg, extraData]);

				const emojiBypassType: number = SettingsStore.get("emojiBypassType");
				const {
					zipClip,
					useClipBypass,
					useAudioClipBypass,
					stickerBypass,
					soundmojiEnabled,
					emojiBypass,
				} = SettingsStore.getAll();

				let urlsToUpload: any = [];

				for (let i = 0; i < msg.validNonShortcutEmojis?.length; i++) {
					const emoji = msg.validNonShortcutEmojis[i];
					if (!emojiBypass) break;

					if (shouldSkipEmojiBypass(emoji, channelId)) continue;
					const emojiString = getEmojiString(emoji);

					//skip if hyphen precedes the emoji
					if (msg.content.includes(`-${emojiString}`)) {
						msg.content = msg.content.replace("-" + emojiString, emojiString);
						continue;
					}

					const emojiUrl = getEmojiUrl(emoji);

					switch (emojiBypassType) {
						case 0: //upload
							msg.content = msg.content.replace(emojiString, "");
							urlsToUpload.push({
								url: emojiUrl,
								filename: emoji.name + getEmojiExtension(emoji),
							});
							break;
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

				if (extraData.stickerIds && stickerBypass) {
					extraData.stickerIds = extraData.stickerIds.map((stickerId, index) => {
						const STICKER_PREFIX = "https://media.discordapp.net/stickers/";

						const sticker = StickersStore.getStickerById(stickerId);
						if (sticker.format_type == 3) return stickerId;

						let extension = StickerTypeToExtension[sticker.format_type];

						urlsToUpload.push({
							url: `${STICKER_PREFIX + stickerId + extension}?size=4096&quality=lossless`,
							filename: `${sticker.name}${extension}`,
						});

						return null;
					});

					extraData.stickerIds = extraData.stickerIds.filter(Boolean);
				}

				let soundmojiUrls: any = [];
				if (soundmojiEnabled) {
					const SOUNDBOARD_PREFIX = "https://cdn.discordapp.com/soundboard-sounds/";
					const soundmojiStrings = msg.content.match(SOUNDMOJI_REGEX);
					const soundmojiObjects = soundmojiStrings?.map?.((x) =>
						SoundboardStore.getSoundById(x?.split?.(":")?.[2]?.slice?.(0, -1))
					);
					soundmojiObjects?.forEach?.((x) =>
						soundmojiUrls.push({
							url: SOUNDBOARD_PREFIX + x.soundId,
							filename: x.name + ".ogg",
						})
					);
					for (let i = 0; i < soundmojiObjects?.length; i++) {
						const sound = soundmojiObjects[i];
						if (!sound) continue;
						const soundmojiString = soundmojiStrings[i];

						// default / system emoji
						!sound.emojiId &&
							sound.emojiName &&
							(msg.content = msg.content.replace(
								soundmojiString,
								`( ${sound.emojiName} ${sound.name} )`
							));
						// custom emoji
						if (sound?.emojiId) {
							let emoji = EmojiStore.getCustomEmojiById(sound.emojiId);
							msg.content = msg.content.replace(
								soundmojiString,
								`( [${emoji?.name ?? "someCustomEmoji"}](${EMOJI_PREFIX + sound.emojiId}.${emoji?.animated ? "webp" : "png"}?size=32&animated=true) ${sound.name} ) `
							);
						}
						//no emoji
						!sound.emojiId &&
							!sound.emojiName &&
							(msg.content = msg.content.replace(
								soundmojiString,
								`( ${sound.name} ) `
							));
					}
				}

				if (
					extraData?.location === "instant_upload" &&
					(zipClip || useClipBypass || useAudioClipBypass)
				) {
					await Promise.all(
						extraData.attachmentsToUpload.map(async (attachment) => {
							attachment.item = await doClipsBypass(attachment.item);
							attachment.filename = attachment.item.file.name;
							attachment.clip = attachment.item.clip;
							return attachment;
						})
					);
				}

				if (urlsToUpload?.length > 0)
					downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send, 1, false);
				if (soundmojiUrls?.length > 0)
					downloadAndUploadUrls(soundmojiUrls, channelId, msg, extraData, send, 10, true);
				if (!urlsToUpload.length && !soundmojiUrls.length) send(channelId, msg, extraData);
			}
		);
	},
};
