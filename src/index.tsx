import {BetterDiscord} from "@shared/";
import {getDebugSnapshot, loadContextMenus, loadPatches} from "@patches/*";
import SettingsStore, {defaultSettings} from "./global/stores/SettingsStore.ts";
import {startChangelog} from "./global/changelog";
import UserBackgroundStore from "./global/stores/UserBackgroundStore.ts";
import {GlobalModules} from "@global/*";
import ShopCollectiblesStore from "./global/stores/ShopCollectiblesStore.tsx";
import BadgesStore from "./global/stores/BadgesStore.tsx";
import {copyToClipboard, getRevealedText, secondsightifyRevealOnly} from "@utils/*";
import {Icon} from "@iconify/react";
import {CustomSettingsTab} from "./patches/modules/UserProfileV2.tsx";
import Meta from "../package.json";
import varForcer from "../src/global/shared/varforcer";
import FFmpegStore from "./global/stores/FFmpegStore.ts";
import changelog from "./global/changelog/changelog.json";
import DebugPanel from "./ui/Debug.tsx";
import badgesStore from "./global/stores/BadgesStore.tsx";
import {CHANGELOG_FOOTER} from "./ui/ChangelogFooter.tsx";

const {Components} = BetterDiscord;
const {React} = BetterDiscord;
const {UserStore, ApexExperimentStore, OverridePremiumTypeStore} = BetterDiscord.Webpack.Stores;

type ControlType = "boolean" | "number" | "string" | "select" | "custom";

interface SelectOption {
    label: string;
    value: any;
}

interface SettingDef {
    key: string;
    label: string;
    note: string;
    category: string;
    type: ControlType;
    options?: SelectOption[];
    Custom?: React.FC;
}

const SettingsSchema: SettingDef[] = [
    // Screen Share Features
    {
        key: "screenSharing",
        label: "High Quality Screensharing",
        note: "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options.",
        category: "Screen Share Features",
        type: "boolean",
    },
    {
        key: "ResolutionSwapper",
        label: "Custom Stream Settings & Settings Quick Swapper",
        note: "Lets you customize your resolution and FPS, and change it quickly in the stream settings modal!",
        category: "Screen Share Features",
        type: "boolean",
    },
    {
        key: "CustomResolution",
        label: "Resolution",
        note: "The custom resolution you want (in pixels)",
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "CustomFPS",
        label: "FPS",
        note: "The custom FPS you want to stream at.",
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "CustomBitrateEnabled",
        label: "Custom Bitrate",
        note: "Choose the bitrate for your streams!",
        category: "Screen Share Features",
        type: "boolean",
    },
    {
        key: "minBitrate",
        label: "Minimum Bitrate",
        note: "The minimum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.",
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "targetBitrate",
        label: "Target Bitrate",
        note: "The target bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.",
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "maxBitrate",
        label: "Maximum Bitrate",
        note: `The maximum bitrate (in kbps). If this is set to zero or a negative number, the default for your quality choices is used. 
                    The default max bitrate for free quality options is 3500kbps, and for Nitro quality options (higher than 720p or higher than 30fps) it is 9000kbps as of April 2025.`,
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "voiceBitrate",
        label: "Voice Audio Bitrate",
        note: `
                    Allows you to change the voice bitrate to whatever you want. 
                    Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. 
                    Bitrate in kbps. Disabled if this is set to -1.`,
        category: "Screen Share Features",
        type: "number",
    },
    {
        key: "sharpenStreams",
        label: "Stream Sharpness",
        note: "Adds a slider to the right-click / context menu of streams that allows you to adjust the sharpness of screen shares. Saves and applies your sharpness amount per user, similar to stream volume. MAKE SURE HARDWARE ACCELERATION IS ENABLED UNDER DISCORD'S ADVANCED SETTINGS OR PERFORMANCE WILL SUFFER!!",
        category: "Screen Share Features",
        type: "boolean",
    },
    {
        key: "videoCodec2",
        label: "Force Video Codec (Advanced Users Only)",
        note: `
                    Allows you to force a specified video codec to be used. Normally, Discord would automatically 
                    choose this based on your hardware, options in Voice & Video, and the viewers watching.
                    Mobile and Web clients can only view H.264 and VP8 streams.
                    If a client does not support the codec you choose, the stream will infinitely load for them!`,
        category: "Screen Share Features",
        type: "select",
        options: [
            {label: "Default (recommended, automatic)", value: -1},
            {label: "AV1", value: 0},
            {label: "H265", value: 1},
            {label: "H264", value: 2},
            {label: "VP8", value: 3},
        ],
    },

    // Emojis
    {
        key: "emojiBypass",
        label: "Nitro Emotes Bypass",
        note: "Enable or disable using the emoji bypass.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "emojiSize",
        label: "Size",
        note: "The size of the emoji in pixels.",
        category: "Emojis",
        type: "select",
        options: [
            {label: "32px (Default small/inline)", value: 32},
            {label: "48px (Recommended, default large)", value: 48},
            {label: "16px", value: 16},
            {label: "24px", value: 24},
            {label: "40px", value: 40},
            {label: "56px", value: 56},
            {label: "64px", value: 64},
            {label: "80px", value: 80},
            {label: "96px", value: 96},
            {label: "128px (Max emoji size)", value: 128},
            {label: "256px (Max GIF emoji size)", value: 256},
        ],
    },
    {
        key: "emojiBypassType",
        label: "Emoji Bypass Method",
        note: "The method of bypass to use.",
        category: "Emojis",
        type: "select",
        options: [
            {label: "Upload Emojis", value: 0},
            {label: "Hyperlink/Vencord-Like Mode", value: 3},
            {label: "Classic Mode", value: 2},
        ],
    },
    {
        key: "editMessageWithEmoji",
        label: "Replace Fakemoji When Editing Message",
        note: "Replaces text-based fakemoji with their emoji when editing a message.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "emojiBypassForValidEmoji",
        label: "Don't Use Emote Bypass if Emote is Unlocked",
        note: "Disable to use emoji bypass even if bypass is not required for that emoji.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "PNGemote",
        label: "Use PNG instead of WEBP",
        note: "Use the PNG version of static emoji for higher quality!",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "stickerBypass",
        label: "Sticker Bypass",
        note: "Enable or disable using the sticker bypass. I recommend using my fork of DiscordFreeStickers over this. Animated APNG/Lottie Stickers WILL NOT animate.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "forceStickersUnlocked",
        label: "Force Stickers Unlocked",
        note: "Enable to cause Stickers to be unlocked.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "fakeInlineVencordEmotes",
        label: "Fake Inline Hyperlink Emotes",
        note: "Makes hyperlinked emojis appear as if they were real emojis, inlined in the message, similar to Vencord FakeNitro emotes.",
        category: "Emojis",
        type: "boolean",
    },
    {
        key: "soundmojiEnabled",
        label: "Soundmoji Bypass",
        note: 'Unlocks soundmojis and allows you to "send" them by automatically replacing them with an OGG upload and some text representing the soundmoji.',
        category: "Emojis",
        type: "boolean",
    },

    // Profile
    {
        key: "profileV2",
        label: "Profile Accents",
        note: "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "fakeProfileThemes",
        label: "Fake Profile Themes",
        note: "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "fakeProfileBanners",
        label: "Fake Profile Banners",
        note: "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "userBgIntegration",
        label: "UsrBG Integration",
        note: "Downloads and parses the UsrBG JSON database so that UsrBG banners will appear for you.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "voiceTileBannerBackground",
        label: "Call Tile Background",
        note: "Uses fake banners as the background for call tiles.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "fakeAvatarDecorations",
        label: "Fake Avatar Decorations",
        note: "Uses invisible 3y3 encoding to allow setting avatar decorations by hiding information in your bio and/or your custom status.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "profileEffects",
        label: "Fake Profile Effects",
        note: "Uses invisible 3y3 encoding to allow setting profile effects by hiding information in your bio.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "killProfileEffects",
        label: "Kill Profile Effects",
        note: "Hate profile effects? Enable this and they'll be gone. All of them. Overrides all profile effects.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "customPFPs",
        label: "Fake Profile Pictures",
        note: "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL IN YOUR CUSTOM STATUS. Only supports Imgur URLs for security reasons.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "userPfpIntegration",
        label: "UserPFP Integration",
        note: "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture. There's little reason to disable this.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "disableUserBadge",
        label: "Disable User Badge",
        note: "Disables the YABDP4Nitro User Badge which appears on any user that uses Profile Customization. (client side)",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "nameplatesEnabled",
        label: "Fake Nameplates",
        note: "Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio. Please paste the 3y3 in one or both of those areas.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "displayNameStyles",
        label: "Fake Display Name Styles",
        note: "Uses invisible 3y3 encoding to allow setting fake display name styles by hiding the information in your bio. Please paste the 3y3 information in your bio.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "profileFrames",
        label: "Fake Profile Frames",
        note: "Uses invisible 3y3 encoding to allow setting fake profile frames by hiding the information in your bio. Please paste the 3y3 information in your bio.",
        category: "Profile",
        type: "boolean",
    },
    {
        key: "advancedProfileCustomization",
        label: "Advanced Profile Editing",
        note: "Allows you to use custom SKU IDs when editing Profile Effects, and Decorations, and the ID/Palette combo with Nameplates. Allows you to use effects/decorations/nameplates that are not possible otherwise.",
        category: "Profile",
        type: "boolean",
    },

    // Clips
    {
        key: "useClipBypass",
        label: "Use Clips Bypass",
        note: "Enabling this will effectively set your file upload limit for video files to 100MB. Disable this if you have a file upload limit larger than 100MB.",
        category: "Clips",
        type: "boolean",
    },
    {
        key: "clipTimestamp",
        label: "Timestamp",
        note: "This option lets you choose how the plugin determines the timestamp to put on the generated clip.",
        category: "Clips",
        type: "select",
        options: [
            {label: "Zero (January 1st, 2015)", value: 0},
            {label: "Current Date/Time", value: 1},
            {label: "Last Modified Date/Time of File", value: 2},
        ],
    },
    {
        key: "forceClip",
        label: "Force Clip",
        note: "Always send video files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.",
        category: "Clips",
        type: "boolean",
    },
    {
        key: "useAudioClipBypass",
        label: "Audio Clips Bypass",
        note: "Identical to the Clips Bypass for videos, except it works with audio files.",
        category: "Clips",
        type: "boolean",
    },
    {
        key: "forceAudioClip",
        label: "Force Audio Clip",
        note: "Always send audio files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.",
        category: "Clips",
        type: "boolean",
    },
    {
        key: "zipClip",
        label: "ZipClip",
        note: "Upload any file with the 100MB file upload limit by making your files into polyglot video+zip files that can be opened as a zip file. In 7-Zip, you will have to either: Rename the file to remove the .mp4 extension and then right-click and go 7-Zip > Open Archive > and then manually choose the file format (usually zip or 7z), or: Open the containing folder, right click the file and hit \"Open Inside\", then choose the zip. In WinRAR you don't need to do this, just rename if necessary, open, and it works. Windows' File Explorer's zip integration won't be able to open these, sorry. If you upload a file that is already an archive, the plugin will just append the file so the contents of your uploaded archive will appear rather than having your archive in a new zip.",
        category: "Clips",
        type: "boolean",
    },
    {
        key: "enableClipsExperiment",
        label: "Enable Clips Experiments",
        note: "Whether or not Clips-related experiments should be enabled.",
        category: "Clips",
        type: "boolean",
    },

    // Miscellaneous
    {
        key: "changePremiumType2",
        label: "Change Premium Type",
        note: "This option will set your user to different Premium Types on the client-side, unlocking (or locking) certain things. Options unlocked by this may or may not work. If you don't know what you're doing, IT'S BEST TO LEAVE THIS OPTION DISABLED.",
        category: "Miscellaneous",
        type: "select",
        options: [
            {label: "Disabled (Actual Nitro Status)", value: -1},
            {label: "Free User", value: null},
            {label: "Nitro Basic", value: 3},
            {label: "Nitro Classic", value: 1},
            {label: "Nitro", value: 2},
        ],
    },
    {
        key: "clientThemes",
        label: "Gradient Client Themes",
        note: "Allows you to use Nitro-exclusive Client Themes.",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "removeProfileUpsell",
        label: "Remove Profile Customization Upsell",
        note: 'Removes the "Get Nitro" upsell in the profile editing modal.',
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "removeScreenshareUpsell",
        label: "Remove Screen Share Nitro Upsell",
        note: "Removes the Nitro upsell in the Go Live modal screen.",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "unlockAppIcons",
        label: "App Icons",
        note: "Unlocks app icons.",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "extraContextMenus",
        label: "Extra Context Menus and Options",
        note: "Adds a Copy URL and Open URL buttons to the context menu that appears when you right-click an Emoji or Sticker in the Expression Picker, a context menu that will appear with Copy Link and Open Link options when you right-click a GIF in the GIF picker, a context menu that will appear when right-clicking on user avatars in the blocked/ignored list, and a context menu on messages with attachments that lets you download all attachments.",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "experiments",
        label: "Experiments",
        note: "Unlocks experiments.",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "checkForUpdates",
        label: "Check for Updates",
        note: "Should the plugin check for updates on startup?",
        category: "Miscellaneous",
        type: "boolean",
    },
    {
        key: "customVideoFilterEnabled",
        label: "Video Filter",
        note: "Allows you to use a Custom Video preset background.",
        type: "boolean",
        category: "Miscellaneous",
    },
    {
        key: "customVideoFilter",
        label: "Custom Camera Background Source",
        note: "Set a direct link to an image or video (CDN link recommended) to use as your camera background preset.",
        type: "custom",
        category: "Miscellaneous",
        Custom: ({value, onChange}) => {
            const link = value?.link ?? "";
            const type = value?.type ?? "png"; // "png" | "mp4" — matches filter.type check in the patch (=== "mp4")

            const update = (patch: Partial<{ link: string; type: string }>) => {
                onChange({link, type, ...patch});
            };

            return (
                <>
                    <Components.TextInput
                        value={link}
                        placeholder="https://cdn.discordapp.com/attachments/..."
                        onChange={(v: string) => update({link: v})}
                    />
                    <Components.DropdownInput
                        value={type}
                        options={[
                            {label: "Image", value: "png"},
                            {label: "Video (MP4)", value: "mp4"},
                        ]}
                        onChange={(v: string) => update({type: v})}
                    />
                </>
            );
        },
    },
];

function normalizeVersion(v: string): string {
    const parts = v.split(".");
    while (parts.length < 3) parts.push("0");
    return parts.join(".");
}

const Electron = () => eval('require("electron")');
export const _path = () => require("path");
export const fs = () => eval('require("fs")');

let unpatchDevMode: (() => void) | null = null;

function startSet() {
    const {declarations: decls} = BetterDiscord.Webpack.getBySource("discord_dev_testing", {
        raw: true,
    });
    const [, key] = BetterDiscord.Webpack.getWithKey(
        BetterDiscord.Webpack.Filters.byStrings("getCurrentUser"),
        {target: decls}
    );

    decls.c = SettingsStore.get("experiments");

    if (unpatchDevMode) return;

    unpatchDevMode = BetterDiscord.Patcher.instead(decls, key, () => {
        decls.c = SettingsStore.get("experiments");
    });
}

function overrideVariant(experimentName: string, variantId: number) {
    ApexExperimentStore.createOverride(experimentName, variantId);
    ApexExperimentStore.emitChange();
}

export default class Plugin {
    private unpatch = loadContextMenus();
    private source: string = "";

    async start() {
        const version =
            BetterDiscord.Utils.semverCompare(normalizeVersion(BdApi.version), "1.14.0") <= 0;

        if (!version && !SettingsStore.get("dontUpdate"))
            return BetterDiscord.UI.showNotification({
                title: "Cannot start YABD4Nitro",
                type: "error",
                content:
                    'You need to be on BetterDiscord version 1.14.0 to have the smoothest experience. Please update. If you dont wish to update, then click "I dont care".\n\nThis will reload the plugin and you can use it normally.',
                duration: Infinity,
                actions: [
                    {
                        label: "I dont care",
                        onClick: () => {
                            SettingsStore.set("dontUpdate", true);
                            this.start();
                        },
                    },
                ],
            });

        BetterDiscord.Logger.info(`(v${Meta.version}) has started.`);

        this.checkChangelog();
        startSet();

        const soundmojiEnabled = SettingsStore.get("soundmojiEnabled");
        overrideVariant("2026-03-soundmoji-rendering", soundmojiEnabled ? 1 : 0);
        overrideVariant("2026-03-soundmoji-sending", soundmojiEnabled ? 2 : 0);

        const checkForUpdatesEnabled = SettingsStore.get("checkForUpdates");
        checkForUpdatesEnabled && (this.checkUpdate());

        GlobalModules.Dispatcher.subscribe("APP_ICON_UPDATED", ({id}) =>
            SettingsStore.set("appIcon", id)
        );

        if (IS_DEVELOPER_LMAO) {
            BetterDiscord.Logger.log("Welcome back, Developer.");
            window.YABD_DEBUG = {
                ShopCollectiblesStore,
                BadgesStore,
                getRevealedText,
                secondsightifyRevealOnly,
                SettingsStore,
                varForcer,
            };
        }

        UserBackgroundStore.fetch();
        loadPatches();
    }

    exposed = {
        YABDNitroPanel: CustomSettingsTab,
    };

    async checkUpdate() {
        const res = await BetterDiscord.Net.fetch(
            "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/YABDP4Nitro.plugin.js",
            {timeout: 10000}
        );

        if(!res.ok || res.status != 200){
            BetterDiscord.UI.showToast("[YABDP4Nitro] Failed to check for updates!", { type: "error" });
            BetterDiscord.Logger.error("Failed to check for updates!", res);
            return;
        }

        this.source = await res.text();

        const sourceVersion = this.source.match(/@version\s+(\d+\.\d+\.\d+)/)?.[1];
        const installedVersion = SettingsStore.get("installedVersion") ?? Meta.version ?? "0.0.0";

        if (!sourceVersion) return;

        if (BetterDiscord.Utils.semverCompare(sourceVersion, installedVersion) < 0) {
            BetterDiscord.Logger.log("New update version found!");

            this.notification = BetterDiscord.UI.showNotification({
                title: "YABDP4Nitro Update Available",
                icon: () => <Icon icon={"mdi:update"} width={"20"}/>,
                content: `Update ${sourceVersion} is now downloadable, Would you like to update?`,
                duration: Infinity,
                actions: [
                    {
                        label: "Update",
                        onClick: () => {
                            const bd_path = Electron().ipcRenderer.sendSync(
                                "bd-get-path",
                                "appData"
                            );
                            const path = _path().join(
                                bd_path,
                                "BetterDiscord",
                                "plugins",
                                "YABDP4Nitro.plugin.js"
                            );
                            fs().writeFile(path, this.source, (err) => {
                                if (err) {
                                    BetterDiscord.UI.showToast(
                                        "Failed to update, Please update manually."
                                    );
                                } else {
                                    BetterDiscord.UI.showToast("Update was successful!");
                                    SettingsStore.set("installedVersion", sourceVersion);
                                    startChangelog(sourceVersion);
                                }
                            });
                        },
                    },
                    {
                        label: "Hell Nah",
                        onClick: () => {
                            this.notification.close();
                        },
                    },
                ],
            });
        }

        return;
    }

    checkChangelog() {
        const currentVersion = Meta.version;
        const lastSeenVersion = SettingsStore.get("installedVersion");

        if (lastSeenVersion && lastSeenVersion !== currentVersion) {
            startChangelog(currentVersion);
        }
        if (lastSeenVersion !== currentVersion) {
            SettingsStore.set("installedVersion", currentVersion);
        }
    }

    private showChangelogFor(version: string) {
        const entry = changelog?.[version];
        if (!entry) return;

        BetterDiscord.UI.showChangelogModal({
            title: Meta.name,
            subtitle: `v${version}`,
            footer: CHANGELOG_FOOTER,
            ...entry[0],
        });
    }

    private buildChangelogMenu() {
        const versions = Object.keys(changelog);
        const getMajor = (v: string) => parseInt(v.split(".")[0], 10) || 0;

        const majors = new Map<number, string[]>();
        for (const version of versions) {
            const major = getMajor(version);
            if (!majors.has(major)) majors.set(major, []);
            majors.get(major)!.push(version);
        }

        const sortedMajors = [...majors.keys()].sort((a, b) => b - a);

        return sortedMajors.map((major) => {
            const versionsForMajor = majors
                .get(major)!
                .sort((a, b) => BetterDiscord.Utils.semverCompare(a, b));

            return {
                type: "submenu",
                label: `v${major}`,
                items: versionsForMajor.map((version) => ({
                    type: "text",
                    label: `v${version}`,
                    action: () => this.showChangelogFor(version),
                })),
            };
        });
    }

    // load()
    // {
    //     const customUserThemeSettings = SettingsStore.get("customUserThemeSettings");
    //
    //     const ThemeEnum = {
    //         "DARK": "dark",
    //         "LIGHT": "light",
    //         "MIDNIGHT": "midnight",
    //         "DARKER": "darker"
    //     }
    //     const validThemes = ["DARK", "DARKER", "LIGHT", "MIDNIGHT"];
    //     const theme = validThemes.includes(customUserThemeSettings.theme)
    //         ? ThemeEnum[customUserThemeSettings.theme]
    //         : ThemeEnum.DARK;
    //
    //     GlobalModules.Dispatcher.dispatch({
    //         type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
    //         changes: {
    //             appearance: {
    //                 shouldSync: false,
    //                 settings: {
    //                     theme,
    //                     useSystemTheme: customUserThemeSettings.theme === "system" ? 2 : 1,
    //                     developerMode: true,
    //                 },
    //             },
    //         },
    //     });
    // }

    stop() {
        this.unpatch();
        new BdApi("Patcher").Patcher.unpatchAll();
        FFmpegStore.unload();
        // UserBackgroundStore.unload();
        // UserProfilePictureStore.unload();
        // ShopCollectiblesStore.unload();
        // CustomUserProfileStore.unload();
        // BadgesStore.unload();
        // this doesnt need to be unloaded...
        UserStore.getCurrentUser().premiumType = OverridePremiumTypeStore.getPremiumTypeActual();
        BetterDiscord.Logger.info(`(v${Meta.version}) has stopped.`);
    }

    private renderControl(def: SettingDef, value: any) {
        const onChange = (v: any) => {
            SettingsStore.set(def.key as any, v);
            // just hardcode this for now. the setting exists with dropdowns.
            if (def.key == "changePremiumType2" && v != -1)
                UserStore.getCurrentUser().premiumType =
                    OverridePremiumTypeStore.getPremiumTypeActual();
            if (def.key == "experiments") startSet();
            if (def.key == "enableClipsExperiment") {
                SettingsStore.set("enableClipsExperiment", v);
                overrideVariant("2026-03-clips-experiment", v ? 2 : 0);
            }
            if (def.key == "soundmojiEnabled") {
                overrideVariant("2026-03-soundmoji-rendering", v ? 1 : 0);
                overrideVariant("2026-03-soundmoji-sending", v ? 2 : 0);
            }
        };

        switch (def.type) {
            case "custom":
                return <def.Custom value={value} options={def.options} onChange={onChange}/>;
            case "boolean":
                return <Components.SwitchInput value={value} onChange={onChange}/>;
            case "number":
                return <Components.NumberInput value={value} onChange={onChange}/>;
            case "string":
                return <Components.TextInput value={value} onChange={onChange}/>;
            case "select":
                return (
                    <Components.DropdownInput
                        value={value}
                        options={def.options}
                        onChange={onChange}
                    />
                );
        }
    }

    getSettingsPanel() {
        return () => {
            const values = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => {
                const all = SettingsStore.getAll();
                return SettingsSchema.reduce(
                    (acc, def) => {
                        acc[def.key] = def.key in all ? all[def.key] : defaultSettings[def.key];
                        return acc;
                    },
                    {} as Record<string, any>
                );
            });

            const grouped = SettingsSchema.reduce(
                (acc, def) => {
                    (acc[def.category] ??= []).push(def);
                    return acc;
                },
                {} as Record<string, SettingDef[]>
            );

            return (
                <>
                    {Object.entries(grouped).map(([category, defs]) => (
                        <Components.SettingGroup
                            key={category}
                            name={category}
                            collapsible={true}
                            shown={false}
                        >
                            {defs.map((def) => (
                                <Components.SettingItem
                                    key={def.key}
                                    name={def.label}
                                    note={def.note}
                                >
                                    {this.renderControl(def, values[def.key])}
                                </Components.SettingItem>
                            ))}
                        </Components.SettingGroup>
                    ))}
                    {badgesStore.isDeveloper(UserStore.getCurrentUser().id) && <Components.SettingGroup name="Debug" collapsible shown={false}>
                        <DebugPanel/>
                    </Components.SettingGroup>}
                    <div
                        style={{padding: "5px", display: "flex", justifyContent: "space-between"}}
                    >
                        <Components.Tooltip text={"Check recent changelog"}>
                            {(props) => {
                                return (
                                    <div {...props}>
                                        <Icon
                                            onContextMenu={(event) => {
                                                const menu = BetterDiscord.ContextMenu.buildMenu(
                                                    this.buildChangelogMenu()
                                                );
                                                BetterDiscord.ContextMenu.open(event, menu);
                                            }}
                                            onClick={() => this.showChangelogFor(Meta.version)}
                                            width={24}
                                            icon={"material-symbols:update"}
                                        />
                                    </div>
                                );
                            }}
                        </Components.Tooltip>
                        <Components.Tooltip text={"Copy debug info to clipboard"}>
                            {(props) => (
                                <div {...props}>
                                    <Icon
                                        onClick={() => {
                                            const payload = {
                                                version: Meta.version,
                                                installedVersion:
                                                    SettingsStore.get("installedVersion"),
                                                config: SettingsStore.getAll(),
                                                debug: getDebugSnapshot(),
                                            };

                                            copyToClipboard(JSON.stringify(payload, null, 2));
                                            BetterDiscord.UI.showToast(
                                                "Debug info copied to clipboard!"
                                            );
                                        }}
                                        width={24}
                                        icon={"mdi:bug"}
                                    />
                                </div>
                            )}
                        </Components.Tooltip>
                    </div>
                </>
            );
        };
    }
}