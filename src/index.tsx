import {BetterDiscord} from "@shared/";
import {loadContextMenus, loadPatches} from "@patches/*";
import SettingsStore from "./global/stores/SettingsStore.ts";
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
    emojiSize: {label: "Emoji Size", note: "Pixel size emotes are uploaded/rendered at."},
    screenSharing: {label: "Screen Sharing", note: "Enable enhanced screen share options."},
    emojiBypass: {label: "Emoji Bypass", note: "Bypass Nitro restrictions on custom emoji."},
    emojiBypassType: {label: "Emoji Bypass Method", note: "Which technique is used to bypass emoji restrictions."},
    emojiBypassForValidEmoji: {label: "Bypass Valid Emoji Too", note: "Apply bypass even to emoji you're already allowed to use."},
    PNGemote: {label: "Force PNG Emotes", note: "Send static emotes as PNG instead of the platform default."},
    uploadStickers: {label: "Upload Stickers", note: "Allow uploading custom stickers."},
    CustomFPSEnabled: {label: "Custom Stream FPS", note: "Override the frame rate used for screen shares."},
    CustomFPS: {label: "Stream FPS", note: "Target frame rate when Custom Stream FPS is enabled."},
    ResolutionEnabled: {label: "Custom Stream Resolution", note: "Override the resolution used for screen shares."},
    CustomResolution: {label: "Stream Resolution", note: "Target vertical resolution when Custom Stream Resolution is enabled."},
    CustomBitrateEnabled: {label: "Custom Voice Bitrate", note: "Override bitrate limits for voice/video."},
    minBitrate: {label: "Min Bitrate", note: "Minimum allowed bitrate (-1 for default)."},
    maxBitrate: {label: "Max Bitrate", note: "Maximum allowed bitrate (-1 for default)."},
    targetBitrate: {label: "Target Bitrate", note: "Preferred bitrate to negotiate (-1 for default)."},
    voiceBitrate: {label: "Voice Bitrate", note: "Bitrate used for voice channels (-1 for default)."},
    ResolutionSwapper: {label: "Resolution Swapper", note: "Swap between resolution presets while streaming."},
    stickerBypass: {label: "Sticker Bypass", note: "Bypass Nitro restrictions on stickers."},
    profileV2: {label: "Profile V2", note: "Use the newer Discord profile layout."},
    forceStickersUnlocked: {label: "Force Stickers Unlocked", note: "Show all stickers as unlocked regardless of Nitro status."},
    changePremiumType2: {label: "Fake Premium Type", note: "Spoof your Nitro tier client-side (-1 to disable)."},
    videoCodec2: {label: "Video Codec Override", note: "Force a specific video codec for calls (-1 for default)."},
    clientThemes: {label: "Client Themes", note: "Enable client theming support."},
    fakeProfileThemes: {label: "Fake Profile Themes", note: "Show custom profile theme colors on your profile."},
    removeProfileUpsell: {label: "Remove Profile Upsell", note: "Hide the Nitro upsell on user profiles."},
    removeScreenshareUpsell: {label: "Remove Screenshare Upsell", note: "Hide the Nitro upsell in screen share settings."},
    fakeProfileBanners: {label: "Fake Profile Banners", note: "Show a custom banner on your profile without Nitro."},
    fakeAvatarDecorations: {label: "Fake Avatar Decorations", note: "Show avatar decorations without Nitro."},
    unlockAppIcons: {label: "Unlock App Icons", note: "Unlock all alternate app icons."},
    profileEffects: {label: "Profile Effects", note: "Enable animated profile effects."},
    killProfileEffects: {label: "Disable Profile Effects", note: "Force-disable profile effects entirely (overrides above)."},
    customPFPs: {label: "Custom Avatars", note: "Allow setting custom/animated avatars without Nitro."},
    experiments: {label: "Experiments", note: "Enable access to Discord's internal experiments menu."},
    userPfpIntegration: {label: "Avatar Integration", note: "Integrate custom avatars into other UI elements."},
    userBgIntegration: {label: "Background Integration", note: "Integrate custom user backgrounds into other UI elements."},
    useClipBypass: {label: "Clip Bypass", note: "Bypass Nitro restrictions on clip recording."},
    forceClip: {label: "Force Clip", note: "Force-enable clip recording even if unsupported."},
    checkForUpdates: {label: "Check For Updates", note: "Automatically check for plugin updates on start."},
    fakeInlineVencordEmotes: {label: "Fake Inline Emotes", note: "Render inline emotes similarly to Vencord's implementation."},
    soundmojiEnabled: {label: "Soundmoji", note: "Enable soundmoji support."},
    useAudioClipBypass: {label: "Audio Clip Bypass", note: "Bypass restrictions on audio clip recording."},
    forceAudioClip: {label: "Force Audio Clip", note: "Force-enable audio clip recording even if unsupported."},
    zipClip: {label: "Zip Clips", note: "Compress clips before upload/export."},
    enableClipsExperiment: {label: "Enable Clips Experiment", note: "Force-enable the clips feature experiment."},
    disableUserBadge: {label: "Disable Plugin Badge", note: "Hide the badge this plugin adds to your profile."},
    nameplatesEnabled: {label: "Nameplates", note: "Enable profile nameplates."},
    clipTimestamp: {label: "Clip Timestamp Format", note: "How timestamps are formatted on recorded clips."},
    removeNotStaffWarning: {label: "Remove Staff Warning", note: "Hide the \"you are not staff\" console warning."},
    editMessageWithEmoji: {label: "Edit Message Emoji", note: "Allow using bypassed emoji when editing messages."},
    extraContextMenus: {label: "Extra Context Menus", note: "Add extra entries to right-click context menus."},
    sharpenStreams: {label: "Sharpen Streams", note: "Apply the stream sharpening filter to shared video."},
    displayNameStyles: {label: "Display Name Styles", note: "Enable custom display name styling."},
    voiceTileBannerBackground: {label: "Voice Tile Banner Background", note: "Use profile banners as backgrounds on voice tiles."},
    advancedProfileCustomization: {label: "Advanced Profile Customization", note: "Enable additional, less-stable profile customization options."},
};

const SettingCategories: Record<string, string> = {
    emojiSize: "Emoji & Stickers",
    emojiBypass: "Emoji & Stickers",
    emojiBypassType: "Emoji & Stickers",
    emojiBypassForValidEmoji: "Emoji & Stickers",
    PNGemote: "Emoji & Stickers",
    uploadStickers: "Emoji & Stickers",
    stickerBypass: "Emoji & Stickers",
    forceStickersUnlocked: "Emoji & Stickers",
    fakeInlineVencordEmotes: "Emoji & Stickers",
    editMessageWithEmoji: "Emoji & Stickers",
    soundmojiEnabled: "Emoji & Stickers",

    screenSharing: "Voice & Screen Share",
    CustomFPSEnabled: "Voice & Screen Share",
    CustomFPS: "Voice & Screen Share",
    ResolutionEnabled: "Voice & Screen Share",
    CustomResolution: "Voice & Screen Share",
    CustomBitrateEnabled: "Voice & Screen Share",
    minBitrate: "Voice & Screen Share",
    maxBitrate: "Voice & Screen Share",
    targetBitrate: "Voice & Screen Share",
    voiceBitrate: "Voice & Screen Share",
    ResolutionSwapper: "Voice & Screen Share",
    removeScreenshareUpsell: "Voice & Screen Share",
    videoCodec2: "Voice & Screen Share",
    voiceTileBannerBackground: "Voice & Screen Share",
    sharpenStreams: "Voice & Screen Share",

    profileV2: "Profile Customization",
    changePremiumType2: "Profile Customization",
    clientThemes: "Profile Customization",
    fakeProfileThemes: "Profile Customization",
    removeProfileUpsell: "Profile Customization",
    fakeProfileBanners: "Profile Customization",
    fakeAvatarDecorations: "Profile Customization",
    unlockAppIcons: "Profile Customization",
    profileEffects: "Profile Customization",
    killProfileEffects: "Profile Customization",
    customPFPs: "Profile Customization",
    userPfpIntegration: "Profile Customization",
    userBgIntegration: "Profile Customization",
    disableUserBadge: "Profile Customization",
    nameplatesEnabled: "Profile Customization",
    displayNameStyles: "Profile Customization",
    advancedProfileCustomization: "Profile Customization",

    useClipBypass: "Clips",
    forceClip: "Clips",
    useAudioClipBypass: "Clips",
    forceAudioClip: "Clips",
    zipClip: "Clips",
    enableClipsExperiment: "Clips",
    clipTimestamp: "Clips",

    experiments: "General",
    checkForUpdates: "General",
    extraContextMenus: "General",
    removeNotStaffWarning: "General",
};

const CategoryOrder = ["General", "Emoji & Stickers", "Voice & Screen Share", "Profile Customization", "Clips"];

const SelectOptions: Record<string, {label: string; value: number}[]> = {
    emojiBypassType: [
        {label: "Method 0", value: 0},
        {label: "Method 1", value: 1},
    ],
    changePremiumType2: [
        {label: "Disabled", value: -1},
        {label: "None", value: 0},
        {label: "Nitro Classic", value: 1},
        {label: "Nitro", value: 2},
    ],
    videoCodec2: [
        {label: "Default", value: -1},
        {label: "H264", value: 0},
        {label: "VP8", value: 1},
        {label: "VP9", value: 2},
        {label: "AV1", value: 3},
    ],
    clipTimestamp: [
        {label: "None", value: 0},
        {label: "Relative", value: 1},
        {label: "Absolute", value: 2},
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