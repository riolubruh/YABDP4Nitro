import SettingsStore from "../../global/stores/SettingsStore.ts";
import {EMOJI_PREFIX, getEmojiExtension, getEmojiString, getEmojiUrl, shouldSkipEmojiBypass} from "@utils/*";
import {BetterDiscord} from "@shared/";
const {StickersStore, SoundboardStore, EmojiStore} = BetterDiscord.Webpack.Stores;
enum StickerTypeToExtension { // @ts-ignore
    ".png" = 1, ".png", ".json", ".gif"
}

const CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", {searchExports: true});

async function downloadAndUploadUrls(filesToDownload: { url: string; filename: string }[], channelId: string, msg: any, extraData: any, send: Function, numFilesInMessage:number = 1, alwaysSendInNewMessage: boolean = false) {
    if (!filesToDownload.length) return;

    const preexisting = extraData.attachmentsToUpload ?? [];
    extraData.attachmentsToUpload = preexisting;

    const uploads = await Promise.all(filesToDownload.map(async f => {
        const blob = await BetterDiscord.Net.fetch(f.url).then(r => r.blob());
        return new CloudUploader({ file: new File([blob], f.filename), isClip: false, isThumbnail: false, platform: 1, isImage: true }, channelId, false, 0);
    }));

    if (preexisting.length || alwaysSendInNewMessage) {
        await send(channelId, msg, extraData);
    } else {
        extraData.attachmentsToUpload = uploads.splice(0, numFilesInMessage);
        await send(channelId, msg, extraData);
    }
    extraData.attachmentsToUpload = [];
    msg.content = "";

    while (uploads.length) {
        await send(channelId, { content: "" }, { attachmentsToUpload: uploads.splice(0, numFilesInMessage) });
    }
}

const SOUNDMOJI_REGEX = /<sound:\d+:\d+>/g;

export default {
    name: "Send Message",
    description: "Upload emoji, soundmoji, stickers, and insta-clips.",
    ids: undefined,
    waitFor: [x => x._sendMessage],
    apply(finale, patcher) {
        patcher.instead(finale.modules[0], "_sendMessage", async (_: any, [channelId, msg, extraData]: any, send: Function) => {
            console.log(_,channelId,msg,extraData);
            if (extraData.poll || extraData.activityAction || msg.location === "forwarding") return send.apply(_, [channelId, msg, extraData]);

            const emojiBypassEnabled = SettingsStore.get("emojiBypass");
            const emojiBypassType = SettingsStore.get("emojiBypassType");
            const soundmojiEnabled = SettingsStore.get("soundmojiEnabled");
            const stickersEnabled = SettingsStore.get("stickerBypass")

            let urlsToUpload: any = [];

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

            let soundmojiUrls: any = [];
            if(soundmojiEnabled){
                const SOUNDBOARD_PREFIX = "https://cdn.discordapp.com/soundboard-sounds/";
                const soundmojiStrings = msg.content.match(SOUNDMOJI_REGEX);
                const soundmojiObjects = soundmojiStrings?.map?.(x=>SoundboardStore.getSoundById(x?.split?.(':')?.[2]?.slice?.(0,-1)));
                soundmojiObjects?.forEach?.(x=> soundmojiUrls.push({
                    url: SOUNDBOARD_PREFIX + x.soundId,
                    filename: x.name + ".ogg"
                }));
                for(let i = 0; i < soundmojiObjects?.length; i++){
                    const sound = soundmojiObjects[i];
                    if(!sound) continue;
                    const soundmojiString = soundmojiStrings[i];

                    // default / system emoji
                    (!sound.emojiId && sound.emojiName) && (msg.content = msg.content.replace(soundmojiString, `( ${sound.emojiName} ${sound.name} )`));
                    if(sound?.emojiId){
                        let emoji = EmojiStore.getCustomEmojiById(sound.emojiId);
                        msg.content = msg.content.replace(soundmojiString, `( [${emoji?.name ? emoji.name : "someCustomEmoji"}](${EMOJI_PREFIX+sound.emojiId}.${emoji?.animated ? "webp" : "png"}?size=32&animated=true) ${sound.name} ) `);
                    }
                    (!sound.emojiId && !sound.emojiName) && (msg.content = msg.content.replace(soundmojiString, `( ${sound.name} ) `));
                }
            }

            if (urlsToUpload?.length > 0) downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send, 1, false);
            if (soundmojiUrls?.length > 0) downloadAndUploadUrls(soundmojiUrls, channelId, msg, extraData, send, 10, true);
            if(!urlsToUpload.length && !soundmojiUrls.length) send(channelId, msg, extraData);

        })
    }
}