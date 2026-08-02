import SettingsStore from "../../global/stores/SettingsStore.ts";
import {getEmojiExtension, getEmojiString, getEmojiUrl, shouldSkipEmojiBypass} from "@utils/*";
import {BetterDiscord} from "@global/*";
const {StickersStore} = BetterDiscord.Webpack.Stores;
enum StickerTypeToExtension { // @ts-ignore
    ".png" = 1, ".png", ".json", ".gif"
}

const CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", {searchExports: true});

async function downloadAndUploadUrls(filesToDownload: { url: string; filename: string }[], channelId: string, msg: any, extraData: any, send: Function) {
    if (!filesToDownload.length) return;

    const preexisting = extraData.attachmentsToUpload ?? [];
    extraData.attachmentsToUpload = preexisting;

    const uploads = await Promise.all(filesToDownload.map(async f => {
        const blob = await BetterDiscord.Net.fetch(f.url).then(r => r.blob());
        return new CloudUploader({ file: new File([blob], f.filename), isClip: false, isThumbnail: false, platform: 1, isImage: true }, channelId, false, 0);
    }));

    if (preexisting.length) {
        await send(channelId, msg, extraData);
    } else {
        extraData.attachmentsToUpload = [uploads.shift()];
        await send(channelId, msg, extraData);
    }
    extraData.attachmentsToUpload = [];
    msg.content = "";

    for (const upload of uploads) {
        await send(channelId, { content: "" }, { attachmentsToUpload: [upload] });
    }
}

export default {
    name: "Send Message",
    description: "Upload emoji, soundmoji, stickers, and insta-clips.",
    ids: undefined,
    waitFor: [x => x._sendMessage],
    apply(finale, patcher) {
        patcher.instead(finale.modules[0], "_sendMessage", async (_: any, [channelId, msg, extraData]: any, send: Function) => {
            const emojiBypassEnabled = SettingsStore.get("emojiBypass");
            const emojiBypassType = SettingsStore.get("emojiBypassType");
            const pngEmote = SettingsStore.get("PNGemote");
            const soundBoardEnabled = SettingsStore.get("soundmojiEnabled");
            const stickersEnabled = SettingsStore.get("stickerBypass")

            if (extraData.poll || extraData.activityAction || msg.location === "forwarding") return send(_, msg);

            let urlsToUpload: any = [];

            console.log(channelId);
            console.log(msg);
            console.log(extraData);

            for (const emoji of msg.validNonShortcutEmojis) {
                if (!emojiBypassEnabled && !(emojiBypassType === 0)) break;

                if (shouldSkipEmojiBypass(emoji, channelId)) continue;
                const emojiString = getEmojiString(emoji);

                //skip if hyphen precedes the emoji
                if (msg.content.includes(`-${emojiString}`)) {
                    msg.content = msg.content.replace(("-" + emojiString), emojiString);
                    continue
                }

                const emojiUrl = getEmojiUrl(emoji);
                msg.content = msg.content.replace(emojiString, "");

                urlsToUpload.push({
                    url: emojiUrl,
                    filename: emoji.name + getEmojiExtension(emoji)
                });
            }


            if (extraData.stickerIds && stickersEnabled) {
                for(const stickerId of extraData.stickerIds) {

                    const STICKER_PREFIX = "https://media.discordapp.net/stickers/";
                    console.log(stickerId);
                    console.log(StickersStore.getStickerById(stickerId));

                    const sticker = StickersStore.getStickerById(stickerId);

                    let extension = StickerTypeToExtension[sticker.format_type];

                    console.log(extension);

                    urlsToUpload.push({
                        url: `${STICKER_PREFIX + stickerId + extension}?size=4096&quality=lossless`,
                        filename: `${sticker.name}${extension}`
                    });
                }
                extraData.stickerIds = [];
            }

            if (urlsToUpload.length > 0) downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send);
            else return send(channelId, msg, extraData);
        })
    }
}