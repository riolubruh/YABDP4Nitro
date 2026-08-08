import {BetterDiscord} from "@shared/";
import {loadContextMenus, loadPatches} from "@patches/*";
import SettingsStore, {defaultSettings} from "./global/stores/SettingsStore.ts";
import {startChangelog} from "./global/changelog";
import UserBackgroundStore from "./global/stores/UserBackgroundStore.ts";
import {GlobalModules} from "@global/*";

const {Components} = BetterDiscord;
const {React} = BetterDiscord;

const SettingBlacklist = [
    "userSharpenPreferences",
    "customUserThemeSettings",
    "lastChangelogVersion",
    "appIcon",
    "lastGradientSettingStore",
];

const map: Record<string, {label: string; note: string}> = {
    screenSharing: {label: "High Quality Screensharing", note: "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options." },
    ResolutionEnabled: {label: "Custom Screenshare Resolution", note: "Choose your own screen share resolution!"},
    CustomResolution: {label: "Resolution", note: "The custom resolution you want (in pixels)" },
    CustomFPSEnabled: {label: "Custom Screenshare FPS", note: "Choose your own screen share FPS!" },
    CustomFPS: {label: "FPS", note: "The custom FPS you want to stream at." },
    ResolutionSwapper: {label: "Stream Settings Quick Swapper", note: "Lets you change your custom resolution and FPS quickly in the stream settings modal!" },
    CustomBitrateEnabled: {label: "Custom Bitrate", note: "Choose the bitrate for your streams!" },
    minBitrate: {label: "Minimum Bitrate", note: "The minimum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used." },
    targetBitrate: {label: "Target Bitrate", note: "The target bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used." },
    maxBitrate: {label: "Maximum Bitrate", note: `The maximum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used. 
                    The default max bitrate for free quality options is 3500kbps, and for Nitro quality options (higher than 720p or higher than 30fps) it is 9000kbps as of April 2025. 
                    There is also a strange bug(?) where setting your max bitrate will cause issues with your stream's preview. 
                    If you want to avoid these issues, please disable this option.` },
    voiceBitrate: {label: "Voice Audio Bitrate", note: `
                    Allows you to change the voice bitrate to whatever you want. 
                    Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. 
                    Bitrate in kbps. Disabled if this is set to -1.` },
    sharpenStreams: {label:"Stream Sharpness", note:"Adds a slider to the right-click / context menu of streams that allows you to adjust the sharpness of screen shares. Saves and applies your sharpness amount per user, similar to stream volume. MAKE SURE HARDWARE ACCELERATION IS ENABLED UNDER DISCORD'S ADVANCED SETTINGS OR PERFORMANCE WILL SUFFER!!"},
    videoCodec2: {label: "Force Video Codec (Advanced Users Only)", note: `
                    Allows you to force a specified video codec to be used. Normally, Discord would automatically 
                    choose this based on your hardware, options in Voice & Video, and the viewers watching.
                    Mobile and Web clients can only view H.264 and VP8 streams.
                    If a client does not support the codec you choose, the stream will infinitely load for them!`},

    emojiBypass: {label: "Nitro Emotes Bypass", note: "Enable or disable using the emoji bypass."},
    emojiSize: {label: "Size", note: "The size of the emoji in pixels."},
    emojiBypassType: {label: "Emoji Bypass Method", note: "The method of bypass to use."},
    editMessageWithEmoji: { label: "Replace Fakemoji When Editing Message", note: "Replaces text-based fakemoji with their emoji when editing a message." },
    emojiBypassForValidEmoji: { label: "Don't Use Emote Bypass if Emote is Unlocked", note: "Disable to use emoji bypass even if bypass is not required for that emoji." },
    PNGemote: { label: "Use PNG instead of WEBP", note: "Use the PNG version of static emoji for higher quality!" },
    stickerBypass: { label: "Sticker Bypass", note: "Enable or disable using the sticker bypass. I recommend using my fork of DiscordFreeStickers over this. Animated APNG/WEBP/Lottie Stickers WILL NOT animate." },
    uploadStickers: { label: "Upload Stickers", note: "Upload stickers in the same way as emotes." },
    forceStickersUnlocked: { label: "Force Stickers Unlocked", note: "Enable to cause Stickers to be unlocked." },
    fakeInlineVencordEmotes: { label: "Fake Inline Hyperlink Emotes", note: "Makes hyperlinked emojis appear as if they were real emojis, inlined in the message, similar to Vencord FakeNitro emotes." },
    soundmojiEnabled: { label: "Soundmoji Bypass", note: "Unlocks soundmojis and allows you to \"send\" them by automatically replacing them with a MP3 upload and some special text that will make them render as real soundmojis on the client side. Please note that this will enable Experiments." },

    profileV2: {label:"Profile Accents", note: "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent." },
    fakeProfileThemes: {label:"Fake Profile Themes", note: "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio." },
    fakeProfileBanners: {label:"Fake Profile Banners", note: "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons." },
    userBgIntegration: {label:"UsrBG Integration", note: "Downloads and parses the UsrBG JSON database so that UsrBG banners will appear for you." },
    voiceTileBannerBackground: {label:"Call Tile Background", note: "Uses fake banners as the background for call tiles." },
    fakeAvatarDecorations: {label:"Fake Avatar Decorations", note: "Uses invisible 3y3 encoding to allow setting avatar decorations by hiding information in your bio and/or your custom status." },
    profileEffects: {label:"Fake Profile Effects", note: "Uses invisible 3y3 encoding to allow setting profile effects by hiding information in your bio." },
    killProfileEffects: {label:"Kill Profile Effects", note: "Hate profile effects? Enable this and they'll be gone. All of them. Overrides all profile effects." },
    customPFPs: {label:"Fake Profile Pictures", note: "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL IN YOUR CUSTOM STATUS. Only supports Imgur URLs for security reasons." },
    userPfpIntegration: {label:"UserPFP Integration", note: "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture. There's little reason to disable this." },
    disableUserBadge: {label:"Disable User Badge", note: "Disables the YABDP4Nitro User Badge which appears on any user that uses Profile Customization. (client side)" },
    nameplatesEnabled: {label:"Fake Nameplates", note: "Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio. Please paste the 3y3 in one or both of those areas." },
    displayNameStyles: {label:"Fake Display Name Styles", note: "Uses invisible 3y3 encoding to allow setting fake display name styles by hiding the information in your bio. Please paste the 3y3 information in your bio." },
    advancedProfileCustomization: {label:"Advanced Profile Editing", note: "Allows you to use custom SKU IDs when editing Profile Effects, and Decorations, and the ID/Palette combo with Nameplates. Allows you to use effects/decorations/nameplates that are not possible otherwise." },

    useClipBypass: { label: "Use Clips Bypass", note: "Enabling this will effectively set your file upload limit for video files to 100MB. Disable this if you have a file upload limit larger than 100MB." },
    clipTimestamp: { label: "Timestamp", note: "This option lets you choose how the plugin determines the timestamp to put on the generated clip." },
    forceClip: { label: "Force Clip", note: "Always send video files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled." },
    useAudioClipBypass: { label: "Audio Clips Bypass", note: "Identical to the Clips Bypass for videos, except it works with audio files." },
    forceAudioClip: { label: "Force Audio Clip", note: "Always send audio files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled." },
    zipClip: { label: "ZipClip", note: "Upload any file with the 100MB file upload limit by making your files into polyglot video+zip files that can be opened as a zip file. In 7-Zip, you will have to either: Rename the file to remove the .mp4 extension and then right-click and go 7-Zip > Open Archive > and then manually choose the file format (usually zip or 7z), or: Open the containing folder, right click the file and hit \"Open Inside\", then choose the zip. In WinRAR you don't need to do this, just rename if necessary, open, and it works. Windows' File Explorer's zip integration won't be able to open these, sorry. If you upload a file that is already an archive, the plugin will just append the file so the contents of your uploaded archive will appear rather than having your archive in a new zip." },
    enableClipsExperiment: { label: "Enable Clips Experiments", note: "Whether or not Clips-related experiments should be enabled. This doesn't disable on the fly, you will have to reload your client to get rid of the Experiments buttons in settings."},

    changePremiumType2: { label: "Change Premium Type", note: "This option will set your user to different Premium Types on the client-side, unlocking (or locking) certain things. Options unlocked by this may or may not work. If you don't know what you're doing, IT'S BEST TO LEAVE THIS OPTION DISABLED." },
    clientThemes: { label: "Gradient Client Themes", note: "Allows you to use Nitro-exclusive Client Themes." },
    removeProfileUpsell: { label: "Remove Profile Customization Upsell", note: "Removes the \"Try It Out\" upsell in the profile customization screen and replaces it with the Nitro variant. Note: does not allow you to use Nitro customization on Server Profiles as the API disallows this." },
    removeScreenshareUpsell: { label: "Remove Screen Share Nitro Upsell", note: "Removes the Nitro upsell in the Screen Share quality option menu." },
    unlockAppIcons: { label: "App Icons", note: "Unlocks app icons." },
    removeNotStaffWarning: { label: "Remove Not Staff Warning", note: "Removes the \"NOT STAFF\" warning on DMs when Experiments are enabled." },
    extraContextMenus: { label: "Extra Context Menus and Options", note: "Adds a Copy URL and Open URL buttons to the context menu that appears when you right-click an Emoji or Sticker in the Expression Picker, a context menu that will appear with Copy Link and Open Link options when you right-click a GIF in the GIF picker, a context menu that will appear when right-clicking on user avatars where a context menu wouldn't normally open (ex: blocked/ignored list), and a context menu on messages with attachments that lets you download all attachments."},
    experiments: { label: "Experiments", note: "Unlocks experiments. Soundmoji and Enable Clips Experiments have to be disabled to turn this off. Use at your own risk."},
    checkForUpdates: { label: "Check for Updates", note: "Should the plugin check for updates on startup?" }
};

const SettingCategories: Record<string, string> = {
    screenSharing: "Screen Share Features",
    ResolutionEnabled: "Screen Share Features",
    CustomResolution: "Screen Share Features",
    CustomFPSEnabled: "Screen Share Features",
    CustomFPS: "Screen Share Features",
    ResolutionSwapper: "Screen Share Features",
    CustomBitrateEnabled: "Screen Share Features",
    minBitrate: "Screen Share Features",
    targetBitrate: "Screen Share Features",
    maxBitrate: "Screen Share Features",
    voiceBitrate: "Screen Share Features",
    sharpenStreams: "Screen Share Features",
    videoCodec2: "Screen Share Features",

    emojiBypass: "Emojis",
    emojiSize: "Emojis",
    emojiBypassType: "Emojis",
    editMessageWithEmoji: "Emojis",
    emojiBypassForValidEmoji: "Emojis",
    PNGemote: "Emojis",
    stickerBypass: "Emojis",
    uploadStickers: "Emojis",
    forceStickersUnlocked: "Emojis",
    fakeInlineVencordEmotes: "Emojis",
    soundmojiEnabled: "Emojis",

    profileV2: "Profile",
    fakeProfileThemes: "Profile",
    fakeProfileBanners: "Profile",
    userBgIntegration: "Profile",
    voiceTileBannerBackground: "Profile",
    fakeAvatarDecorations: "Profile",
    profileEffects: "Profile",
    killProfileEffects: "Profile",
    customPFPs: "Profile",
    userPfpIntegration: "Profile",
    disableUserBadge: "Profile",
    nameplatesEnabled: "Profile",
    displayNameStyles: "Profile",
    advancedProfileCustomization: "Profile",

    useClipBypass: "Clips",
    clipTimestamp: "Clips",
    forceClip: "Clips",
    useAudioClipBypass: "Clips",
    forceAudioClip: "Clips",
    zipClip: "Clips",
    enableClipsExperiment: "Clips",

    changePremiumType2: "Miscellaneous",
    clientThemes: "Miscellaneous",
    removeProfileUpsell: "Miscellaneous",
    removeScreenshareUpsell: "Miscellaneous",
    unlockAppIcons: "Miscellaneous",
    removeNotStaffWarning: "Miscellaneous",
    extraContextMenus: "Miscellaneous",
    experiments: "Miscellaneous",
    checkForUpdates: "Miscellaneous",
};

const CategoryOrder = ["Screen Share Features", "Emojis", "Profile", "Clips", "Miscellaneous"];

const SelectOptions: Record<string, {label: string; value: number}[]> = {
    emojiSize: [
        { label: "32px (Default small/inline)", value: 32 },
        { label: "48px (Recommended, default large)", value: 48 },
        { label: "16px", value: 16 },
        { label: "24px", value: 24 },
        { label: "40px", value: 40 },
        { label: "56px", value: 56 },
        { label: "64px", value: 64 },
        { label: "80px", value: 80 },
        { label: "96px", value: 96 },
        { label: "128px (Max emoji size)", value: 128 },
        { label: "256px (Max GIF emoji size)", value: 256 }
    ],
    emojiBypassType: [
        { label: "Upload Emojis", value: 0 },
        { label: "Hyperlink/Vencord-Like Mode", value: 3 },
        { label: "Classic Mode", value: 2 }
    ],
    changePremiumType2: [
        { label: "Disabled (Actual Nitro Status)", value: -1 },
        { label: "Free User", value: null},
        { label: "Nitro Basic", value: 3},
        { label: "Nitro Classic", value: 1},
        { label: "Nitro", value: 2},
    ],
    videoCodec2: [
        { label: "Default (recommended, automatic)", value: -1 },
        { label: "AV1", value: 0 },
        { label: "H265", value: 1 },
        { label: "H264", value: 2 },
        { label: "VP8", value: 3 }
    ],
    clipTimestamp: [
        { label: "Zero (January 1st, 2015)", value: 0 },
        { label: "Current Date/Time", value: 1 },
        { label: "Last Modified Date/Time of File", value: 2 },
    ],
};

function normalizeVersion(v: string): string {
    const parts = v.split(".");
    while (parts.length < 3) parts.push("0");
    return parts.join(".");
}

export default class Plugin {
    private unpatch = loadContextMenus();

    async start() {
        startChangelog();
        await UserBackgroundStore.fetch();
        await loadPatches();

        GlobalModules.Dispatcher.subscribe("APP_ICON_UPDATED", ({id}) => SettingsStore.set("appIcon", id));
    }

    checkUpdate() {
        return;
    }

    stop() {
        this.unpatch();
        new BdApi("Patcher").Patcher.unpatchAll();
    }

    private renderControl(key: string, value: any) {
        const onChange = (v: any) => SettingsStore.set(key as any, v);

        if (SelectOptions[key]) {
            return (
                <Components.SwitchInput
                    value={value}
                    options={SelectOptions[key]}
                    onChange={onChange}
                />
            );
        }

        switch (typeof value) {
            case "boolean":
                return <Components.SwitchInput value={value} onChange={onChange} />;
            case "number":
            case "bigint":
                return <Components.NumberInput value={value} onChange={onChange} />;
            case "string":
                return <Components.TextInput value={value} onChange={onChange} />;
            default:
                return <Components.TextInput value={JSON.stringify(value)} disabled />;
        }
    }

    getSettingsPanel() {
        return () => {
            const settings = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => {
                const all = SettingsStore.getAll();
                return Object.keys(all)
                    .filter(key => !SettingBlacklist.includes(key))
                    .reduce((acc, key) => {
                        acc[key] = all[key];
                        return acc;
                    }, {} as Record<string, any>);
            });

            const grouped = Object.entries(settings).reduce((acc, [key, value]) => {
                const category = SettingCategories[key] ?? "General";
                (acc[category] ??= []).push([key, value]);
                return acc;
            }, {} as Record<string, [string, any][]>);

            const categoryNames = Object.keys(grouped).sort((a, b) => {
                const ai = CategoryOrder.indexOf(a);
                const bi = CategoryOrder.indexOf(b);
                if (ai === -1 && bi === -1) return a.localeCompare(b);
                if (ai === -1) return 1;
                if (bi === -1) return -1;
                return ai - bi;
            });

            return <>
                {categoryNames.map(category => (
                    <Components.SettingGroup key={category} name={category} collapsible={true}>
                        {grouped[category].map(([key, value]) => {
                            const meta = map[key] ?? {label: key, note: ""};

                            return (
                                <Components.SettingItem key={key} name={meta.label} note={meta.note}>
                                    {this.renderControl(key, value)}
                                </Components.SettingItem>
                            );
                        })}
                    </Components.SettingGroup>
                ))}
            </>;
        };
    }
}