import SettingsStore from "../../global/stores/SettingsStore.ts";
import {getEmojiExtension, getEmojiString, getEmojiUrl, shouldSkipEmojiBypass} from "@utils/*";
import {BetterDiscord} from "@global/*";

const CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", {searchExports:true});

async function downloadAndUploadUrls(filesToDownload: any, channelId: string, msg: any, extraData: any, send: Function){
    console.log(filesToDownload);
    for(let i = 0; i < filesToDownload.length; i++){
        const fileToDownload = filesToDownload[i];
        console.log(fileToDownload);
        let file = await BetterDiscord.Net.fetch(fileToDownload.url).then(r => r.blob()).then(blobFile => new File([blobFile], fileToDownload.filename));
        console.log(file);
        let fileUp = new CloudUploader({ file: file, isClip: false, isThumbnail: false, platform: 1, isImage: true }, channelId, false, 0);
        !extraData.attachmentsToUpload && (extraData.attachmentsToUpload = []);

        if(i == 0 && !extraData.attachmentsToUpload.length){
            extraData.attachmentsToUpload = [fileUp];
            await send(channelId, msg, extraData);
            extraData.attachmentsToUpload = [];
            msg.content = "";
        } else if ((i == 0 && extraData.attachmentsToUpload.length > 0)){

            await send(channelId, msg, extraData);
            extraData.attachmentsToUpload = [];
            msg.content = "";
            await send(channelId, {content:""}, {attachmentsToUpload: [fileUp]});
        } else {
            await send(channelId, {content:""}, {attachmentsToUpload: [fileUp]});
        }
    }
}

export default {
    name: "Send Message",
    description: "Upload emoji, soundmoji, stickers, and insta-clips.",
    ids: undefined,
    waitFor: [x=>x._sendMessage],
    apply(finale, patcher) {
        patcher.instead(finale.modules[0], "_sendMessage", async (_: any, [channelId, msg, extraData]: any, send: Function) => {
            const emojiBypassEnabled = SettingsStore.get("emojiBypass");
            const emojiBypassType = SettingsStore.get("emojiBypassType");
            const pngEmote = SettingsStore.get("PNGemote");
            const soundBoardEnabled = SettingsStore.get("soundmojiEnabled");

            if (extraData.poll || extraData.activityAction || msg.location === "forwarding") return send(_,msg);

            let urlsToUpload: any = [];

            console.log(channelId);
            console.log(msg);
            console.log(extraData);

            if(emojiBypassEnabled && emojiBypassType === 0){
                for (const emoji of msg.validNonShortcutEmojis) {

                    if(shouldSkipEmojiBypass(emoji, channelId) || emoji.type === "UNICODE" || !emoji.guildId || !emoji.id || emoji.useSpriteSheet) continue;
                    const emojiString = getEmojiString(emoji);

                    //skip if hyphen precedes the emoji
                    if(msg.content.includes(`-${emojiString}`)) {
                        msg.content = msg.content.replace(("-" + emojiString), emojiString); continue
                    }

                    const emojiUrl = getEmojiUrl(emoji);
                    msg.content = msg.content.replace(emojiString, "");

                    urlsToUpload.push({
                        url: emojiUrl,
                        filename: emoji.name + getEmojiExtension(emoji)
                    });
                }
            }

            if(urlsToUpload.length > 0) downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send);
            else return send(channelId, msg, extraData);
        })
    }
}