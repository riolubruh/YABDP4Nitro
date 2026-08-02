import {BetterDiscord} from "@shared/";
import CustomUserProfileStore from "../global/stores/CustomUserProfileStore.ts";
import SettingsStore from "../global/stores/SettingsStore.ts";


const {UserProfileStore, SelectedGuildStore, PresenceStore, ChannelStore} = BetterDiscord.Webpack.Stores

export function getRevealedTextPerServer(userId: string | undefined, shouldInclude = "") {
    const guildId = SelectedGuildStore.getGuildId();
    if (!guildId) return;

    const userGuildProfile = UserProfileStore.getGuildMemberProfile(userId, guildId);

    // avoid calling getMemberUserProfile inside itself. so we store it and grab it once this is called.
    // this is called once the profile is opened anyway.
    userGuildProfile && Object.defineProperty(userGuildProfile, "guildId", {value: guildId});
    userGuildProfile && CustomUserProfileStore.cacheMember(userGuildProfile)

    if (userGuildProfile?.pronouns && userGuildProfile.pronouns.includes(shouldInclude)) {
        return secondsightifyRevealOnly(String(userGuildProfile.pronouns));
    }

    if (userGuildProfile?.bio && userGuildProfile.bio.includes(shouldInclude)) {
        return secondsightifyRevealOnly(String(userGuildProfile.bio));
    }

    //per-server pronoun field check
    // const guildId = SelectedGuildStore.getGuildId();
    // if(guildId){
    //     let userGuildProfile = UserProfileStore.getGuildMemberProfile(userId, guildId);
    //     if(userGuildProfile?.pronouns){
    //         if(userGuildProfile.pronouns.includes(shouldInclude)){
    //             let revealedText = secondsightifyRevealOnly(String(userGuildProfile.pronouns));
    //             if(revealedText != undefined && revealedText != ""){
    //                 return revealedText;
    //             }
    //         }
    //     }
    //     //per-server bio check
    //     if(userGuildProfile?.bio){
    //         if(userGuildProfile.bio.includes(shouldInclude)){
    //             let revealedText = secondsightifyRevealOnly(String(userGuildProfile.bio));
    //             if(revealedText != undefined && revealedText != ""){
    //                 return revealedText;
    //             }
    //         }
    //     }
    // }
}

//shouldInclude is a string containing the characters that the encoded text should contain
//that means that in order to check for "P{" for example, you check for the characters \uDB40\uDC50\uDB40\uDC7B since we're checking the encoded text
//but since the encoded text is over 2 bytes, you need to use the surrogate pairs ( you can calculate them here https://russellcottrell.com/greek/utilities/SurrogatePairCalculator.htm )
//if shouldInclude is blank, always return the revealed text if there is revealed text
export function getRevealedText(userId: string, shouldInclude = "") {
    let revealedText: string | undefined = ""; //init variable

    let perServer = getRevealedTextPerServer(userId, shouldInclude);
    if (perServer != undefined && perServer != "") return perServer;

    //get the user's profile from the cached user profiles
    let userProfile = UserProfileStore.getUserProfile(userId);
    //if this user's profile has been downloaded
    if (userProfile) {
        //if their bio is empty, move on to the next check.
        if (userProfile?.bio != undefined) {
            if (userProfile.bio.includes(shouldInclude)) {
                //reveal 3y3 encoded text
                revealedText = secondsightifyRevealOnly(String(userProfile.bio));
                //if there's no 3y3 text, move on to the next check.
                if (revealedText != undefined && revealedText != "") {
                    //return bio with the 3y3 decoded
                    return revealedText;
                }
            }
        }
    }

    let customStatusActivity;
    try {
        //get Custom Status
        //avoid using findActivity function due to conflict with ChatFilter (#290)
        customStatusActivity = PresenceStore.getActivities(userId).find((e) => e.name == "Custom Status" || e.id == "custom");
    } catch (err) {
        BetterDiscord.Logger.error("Something went wrong getting custom status, oh god oh shit!", err);
    }

    //if the user has a custom status
    if (customStatusActivity) {
        //grab the text from the custom status
        let customStatus = customStatusActivity.state;
        //if something has gone horribly wrong, stop processing.
        if (customStatus == undefined) return;
        //reveal 3y3 encoded text
        if (customStatus.includes(shouldInclude)) {
            revealedText = secondsightifyRevealOnly(String(customStatus));
            //return custom status with the 3y3 decoded
            return revealedText;
        }
    }
}

export function secondsightifyRevealOnly(t: string) {
    if ([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
        // 3y3 text detected. Revealing...
        return (t => ([...t].map(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f) ? String.fromCodePoint(x.codePointAt(0) - 0xe0000) : x).join("")))(t);
    } else {
        // no encoded text found, returning
        return;
    }
}

export function secondsightifyEncodeOnly(t: string) {
    if ([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
        // 3y3 text detected. returning...
        return;
    } else {
        // no 3y3 text detected. encoding...
        return (t => [...t].map(x => (0x00 < x.codePointAt(0) && x.codePointAt(0) < 0x7f) ? String.fromCodePoint(x.codePointAt(0) + 0xe0000) : x).join(""))(t);
    }
}

//Whether we should skip the emoji bypass for a given emoji.
// true = skip bypass
// false = perform bypass
export function shouldSkipEmojiBypass(emoji: any, currentChannelId: string){
    const shouldAlwaysUseEmojiBypass = SettingsStore.get("emojiBypassForValidEmoji");
    //If emoji is from current guild, not animated, and we are actually in a guild channel,
    //and emoji is "available" (could be unavailable due to Server Boost level dropping)
    // OR if emoji is "managed" (emoji.managed = whether the emoji is managed by a Twitch integration), cancel emoji bypass
    return (emoji.type === "UNICODE" || !emoji.guildId || !emoji.id || emoji.useSpriteSheet || shouldAlwaysUseEmojiBypass && ((SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId && !emoji.animated && (ChannelStore.getChannel(currentChannelId.toString()).type <= 0 || ChannelStore.getChannel(currentChannelId.toString()).type == 11) && emoji.available) || emoji.managed));
}

export function getEmojiExtension(emoji: any){
    const pngEmote = SettingsStore.get("PNGemote");
    return `${emoji.animated ? ".webp" : pngEmote ? ".png" : ".webp"}`
}

export const EMOJI_PREFIX = "https://cdn.discordapp.com/emojis/";

export function getEmojiUrl(emoji: any, emojiSize:number = SettingsStore.get("emojiSize")){

    return `${EMOJI_PREFIX}${emoji.id}${getEmojiExtension(emoji)}?animated=${emoji.animated}&size=${emojiSize}&quality=lossless`;
}

export function getEmojiString(emoji: any){
    return `<${emoji.animated ? "a:" : ":"}${emoji.originalName ? emoji.originalName : emoji.name}:${emoji.id}>`;
}

export const styled = new Proxy(styledBase, {
    get(target, p) {
        return (cssOrFn: CSSProperties | ((props: any) => CSSProperties) | undefined) =>
            target(p as keyof React.JSX.IntrinsicElements, cssOrFn);
    },
}) as typeof styledBase & {
    [key in keyof React.JSX.IntrinsicElements]: (
        css:
            | React.JSX.IntrinsicElements[key]["style"]
            | ((props: any) => React.JSX.IntrinsicElements[key]["style"])
    ) => React.ComponentType<React.JSX.IntrinsicElements[key]>;
};

export function styledBase<T extends keyof React.JSX.IntrinsicElements>(
    tag: T,
    cssOrFn: CSSProperties | ((props: any) => CSSProperties) | undefined
): React.ComponentType<React.JSX.IntrinsicElements[T]> {
    return (props: any) => {
        const style = typeof cssOrFn === "function" ? cssOrFn(props) : cssOrFn;
        return React.createElement(tag, { ...props, style: { ...style, ...props.style } });
    };
}

export const ContextMenuWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
})

export const ContextMenuLabel = () => <span style={{fontSize: "14px", opacity: 0.6}}>YABDP4Nitro</span>