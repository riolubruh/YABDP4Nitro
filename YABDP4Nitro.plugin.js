/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 5.7.4
 * @invite EFmGEWAUns
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @donate https://github.com/riolubruh/YABDP4Nitro?tab=readme-ov-file#donate
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js
 * @description Unlock all screensharing modes, and use cross-server & GIF emotes!
 */
/*@cc_on
@if(@_jscript)
	
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if(fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)){
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    }else if(!fs.FolderExists(pathPlugins)){
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    }else if(shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6){
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

//#region Module Hell
const { Webpack, Patcher, Net, React, UI, Logger, Data, Components, DOM } = BdApi;
const StreamButtons = Webpack.getMangled("RESOLUTION_1080", {
    ApplicationStreamFPS: Webpack.Filters.byKeys("FPS_30"),
    ApplicationStreamFPSButtons: o => Array.isArray(o) && typeof o[0]?.label === 'number' && o[0]?.value === 15,
    ApplicationStreamFPSButtonsWithSuffixLabel: o => Array.isArray(o) && typeof o[0]?.label === 'string' && o[0]?.value === 15,
    ApplicationStreamResolutionButtons: o => Array.isArray(o) && o[0]?.value !== undefined,
    ApplicationStreamResolutionButtonsWithSuffixLabel: o => Array.isArray(o) && o[0]?.label === "480p",
    ApplicationStreamResolutions: Webpack.Filters.byKeys("RESOLUTION_1080"),
    ApplicationStreamSettingRequirements: o => Array.isArray(o) && o[0]?.resolution !== undefined,
    getApplicationResolution: Webpack.Filters.byStrings('"Unknown resolution: ".concat('),
    getApplicationFramerate: Webpack.Filters.byStrings('"Unknown frame rate: ".concat('),
});
const { ApplicationStreamFPS, ApplicationStreamFPSButtons, ApplicationStreamFPSButtonsWithSuffixLabel,
    ApplicationStreamResolutionButtons, ApplicationStreamResolutionButtonsWithSuffixLabel,
    ApplicationStreamResolutions, ApplicationStreamSettingRequirements } = StreamButtons;
const CloudUploader = Webpack.getModule(Webpack.Filters.byPrototypeKeys("uploadFileToCloud"), { searchExports: true });
const Uploader = Webpack.getByKeys("uploadFiles", "upload");
const CurrentUser = Webpack.getByKeys("getCurrentUser").getCurrentUser();
const ORIGINAL_NITRO_STATUS = CurrentUser.premiumType;
const getBannerURL = Webpack.getByPrototypeKeys("getBannerURL").prototype;
const userProfileMod = Webpack.getByKeys("getUserProfile");
const buttonClassModule = Webpack.getByKeys("lookFilled", "button", "contents");
const Dispatcher = Webpack.getByKeys("subscribe", "dispatch");
const canUserUseMod = Webpack.getMangled(".getFeatureValue(", {
    canUserUse: Webpack.Filters.byStrings("getFeatureValue")
});
const AvatarDefaults = Webpack.getByKeys("getEmojiURL");
const LadderModule = Webpack.getModule(Webpack.Filters.byKeys("calculateLadder"), { searchExports: true });
const FetchCollectibleCategories = Webpack.getByStrings('{type:"COLLECTIBLES_CATEGORIES_FETCH"', { searchExports: true });
let ffmpeg = undefined;
const udta = new Uint8Array([0, 0, 0, 89, 109, 101, 116, 97, 0, 0, 0, 0, 0, 0, 0, 33, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 109, 100, 105, 114, 97, 112, 112, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 105, 108, 115, 116, 0, 0, 0, 36, 169, 116, 111, 111, 0, 0, 0, 28, 100, 97, 116, 97, 0, 0, 0, 1, 0, 0, 0, 0, 76, 97, 118, 102, 54, 49, 46, 51, 46, 49, 48, 51, 0, 0, 46, 46, 117, 117, 105, 100, 161, 200, 82, 153, 51, 70, 77, 184, 136, 240, 131, 245, 122, 117, 165, 239]);
const udtaBuffer = udta.buffer;
const UserStatusStore = Webpack.getByKeys("getStatus", "getState");
const SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
const ChannelStore = Webpack.getStore("ChannelStore");
const MessageActions = Webpack.getByKeys("jumpToMessage", "_sendMessage");
const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
const UserStore = Webpack.getStore("UserStore");
const MessageEmojiReact = Webpack.getByStrings(',nudgeAlignIntoViewport:!0,position:', 'jumboable?', { searchExports: true });
const renderEmbedsMod = Webpack.getByPrototypeKeys('renderSocialProofingFileSizeNitroUpsell', { searchExports: true }).prototype;
const messageRender = Webpack.getMangled('.SEND_FAILED,', {
    renderMessage: o => typeof o === "object"
});
const stickerSendabilityModule = Webpack.getMangled("SENDABLE_WITH_BOOSTED_GUILD", {
    getStickerSendability: Webpack.Filters.byStrings("canUseCustomStickersEverywhere"),
    isSendableSticker: Webpack.Filters.byStrings(")=>0===")
});
const clientThemesModule = Webpack.getModule(Webpack.Filters.byKeys("isPreview"));
const streamSettingsMod = Webpack.getByPrototypeKeys("getCodecOptions").prototype;
const themesModule = Webpack.getMangled("changes:{appearance:{settings:{clientThemeSettings:{", {
    saveClientTheme: Webpack.Filters.byStrings("changes:{appearance:{settings:{clientThemeSettings:{")
});
const accountSwitchModule = Webpack.getByKeys("startSession", "login");
const getAvatarUrlModule = Webpack.getByPrototypeKeys("getAvatarURL").prototype;
const fetchProfileEffects = Webpack.getByStrings("USER_PROFILE_EFFECTS_FETCH", { searchExports: true });
const getSoundMod = Webpack.getByKeys("getSoundById");
const emojiMod = Webpack.getByKeys("getCustomEmojiById");
const isEmojiAvailableMod = Webpack.getByKeys("isEmojiFilteredOrLocked");
const TextClasses = Webpack.getByKeys("errorMessage", "h5");
const videoOptionFunctions = Webpack.getByPrototypeKeys("updateVideoQuality").prototype;
const appIconButtonsModule = Webpack.getByStrings("renderCTAButtons", {defaultExport:false});
const addFilesMod = Webpack.getByKeys("addFiles");
const AppIcon = Webpack.getByStrings("getCurrentDesktopIcon", "isEditorOpen", "isPremium", {defaultExport:false});
const RegularAppIcon = Webpack.getByStrings("M19.73 4.87a18.2", {searchExports:true});
const CurrentDesktopIcon = Webpack.getByKeys("getCurrentDesktopIcon");
const CustomAppIcon = Webpack.getByStrings(".iconSource,width:");
const ClipsEnabledMod = Webpack.getMangled('useExperiment({location:"useEnableClips"', {
    useEnableClips: Webpack.Filters.byStrings('useExperiment({location:"useEnableClips"'),
    areClipsEnabled: Webpack.Filters.byStrings('areClipsEnabled'),
    isPremium: Webpack.Filters.byStrings('isPremiumAtLeast')
});
const ClipsAllowedMod = Webpack.getMangled(`let{ignorePlatformRestriction:`, {
    isClipsClientCapable: (x)=>x==x //just get the first result lol
});
const ClipsMod = Webpack.getByKeys(`isViewerClippingAllowedForUser`);
//#endregion

const defaultSettings = {
    "emojiSize": 64,
    "screenSharing": true,
    "emojiBypass": true,
    "emojiBypassType": 0,
    "emojiBypassForValidEmoji": true,
    "PNGemote": true,
    "uploadStickers": false,
    "CustomFPSEnabled": false,
    "CustomFPS": 60,
    "ResolutionEnabled": false,
    "CustomResolution": 1440,
    "CustomBitrateEnabled": false,
    "minBitrate": -1,
    "maxBitrate": -1,
    "targetBitrate": -1,
    "voiceBitrate": -1,
    "ResolutionSwapper": true,
    "stickerBypass": false,
    "profileV2": false,
    "forceStickersUnlocked": false,
    "changePremiumType": false,
    "videoCodec2": -1,
    "clientThemes": true,
    "lastGradientSettingStore": -1,
    "fakeProfileThemes": true,
    "removeProfileUpsell": false,
    "removeScreenshareUpsell": true,
    "fakeProfileBanners": true,
    "fakeAvatarDecorations": true,
    "unlockAppIcons": false,
    "profileEffects": true,
    "killProfileEffects": false,
    "avatarDecorations": {},
    "customPFPs": true,
    "experiments": false,
    "userPfpIntegration": true,
    "userBgIntegration": true,
    "useClipBypass": true,
    "alwaysTransmuxClips": false,
    "forceClip": false,
    "checkForUpdates": true,
    "fakeInlineVencordEmotes": true,
    "soundmojiEnabled": true
};

//Plugin-wide variables
let settings = {};
let usrBgUsers = [];
let badgeUserIDs = [];
let fetchedUserBg = false;
let fetchedUserPfp = false;

// #region Config
const config = {
    info: {
        "name": "YABDP4Nitro",
        "authors": [{
            "name": "Riolubruh",
            "discord_id": "359063827091816448",
            "github_username": "riolubruh"
        }],
        "version": "5.7.4",
        "description": "Unlock all screensharing modes, and use cross-server & GIF emotes!",
        "github": "https://github.com/riolubruh/YABDP4Nitro",
        "github_raw": "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js"
    },
    changelog: [
        {
            title: "5.7.4",
            items: [
                "Made it so you can properly switch to and from the new Dark and Onyx themes from the Desktop Visual Refresh when Nitro Client Themes is enabled. I would've pushed this fix earlier, but I thought I already did for some reason.",
                "Updated descriptions of the Clips and Soundmoji bypasses to mention that Experiments will be enabled if they are enabled.",
                "Made it so FFmpeg.js is now loaded from GitHub instead of unpkg due to unpkg adding a CORS policy which was causing it to fail to load for some users. This also has the benefit of being (potentially) faster and more reliable than unpkg, so it's a win-win.",
                "Made it so the Clips Bypass puts the name of the file without the extension as the title of the clip.",
                "Removed the \"Transmuxing video...\" toast when using Clips since the transmux is so short that the message is basically pointless other than to confirm whether or not the bypass is loaded and enabled.",
                "Added toast message if there is an error at some point when processing a non-MP4 file for the Clips Bypass."
            ]
        }
    ],
    settingsPanel: [
        {
            type: "category",
            id: "ScreenShare",
            name: "Screen Share Features",
            collapsible: true,
            shown: false,
            settings: [
                { type: "switch", id: "screenSharing", name: "High Quality Screensharing", note: "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options.", value: () => settings.screenSharing },
                { type: "switch", id: "ResolutionEnabled", name: "Custom Screenshare Resolution", note: "Choose your own screen share resolution!", value: () => settings.ResolutionEnabled },
                { type: "text", id: "CustomResolution", name: "Resolution", note: "The custom resolution you want (in pixels)", value: () => settings.CustomResolution },
                { type: "switch", id: "CustomFPSEnabled", name: "Custom Screenshare FPS", note: "Choose your own screen share FPS!", value: () => settings.CustomFPSEnabled },
                { type: "text", id: "CustomFPS", name: "FPS", note: "The custom FPS you want to stream at.", value: () => settings.CustomFPS },
                { type: "switch", id: "ResolutionSwapper", name: "Stream Settings Quick Swapper", note: "Lets you change your custom resolution and FPS quickly in the stream settings modal!", value: () => settings.ResolutionSwapper },
                { type: "switch", id: "CustomBitrateEnabled", name: "Custom Bitrate", note: "Choose the bitrate for your streams!", value: () => settings.CustomBitrateEnabled },
                { type: "text", id: "minBitrate", name: "Minimum Bitrate", note: "The minimum bitrate (in kbps). If this is set to a negative number, the Discord default of 150kbps will be used.", value: () => settings.minBitrate },
                { type: "text", id: "targetBitrate", name: "Target Bitrate", note: "The target bitrate (in kbps). If this is set to a negative number, the Discord default of 600kbps will be used.", value: () => settings.targetBitrate },
                { type: "text", id: "maxBitrate", name: "Maximum Bitrate", note: "The maximum bitrate (in kbps). If this is set to a negative number, the Discord default of 2500kbps will be used.", value: () => settings.maxBitrate },
                { type: "text", id: "voiceBitrate", name: "Voice Audio Bitrate", note: "Allows you to change the voice bitrate to whatever you want. Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. (bitrate in kbps). Disabled if this is set to 128 or -1.", value: () => settings.voiceBitrate },
                {
                    type: "dropdown", id: "videoCodec2", name: "Force Video Codec (Advanced Users Only)", note: `
                    Allows you to force a specified video codec to be used. Normally, Discord would automatically 
                    choose this based on your hardware, options in Voice & Video, and the viewers watching.
                    Mobile and Web clients can only view H.264 and VP8 streams.
                    If a client does not support the codec you choose, the stream will infinitely load for them!`, value: () => settings.videoCodec2, options: [
                        { label: "Default (recommended, automatic)", value: -1 },
                        { label: "AV1", value: 0 },
                        { label: "H265", value: 1 },
                        { label: "H264", value: 2 },
                        { label: "VP8", value: 3 },
                        { label: "VP9", value: 4 },
                    ]
                },
            ]
        },
        {
            type: "category",
            id: "emojis",
            name: "Emojis",
            collapsible: true,
            shown: false,
            settings: [
                { type: "switch", id: "emojiBypass", name: "Nitro Emotes Bypass", note: "Enable or disable using the emoji bypass.", value: () => settings.emojiBypass },
                {
                    type: "dropdown", id: "emojiSize", name: "Size", note: "The size of the emoji in pixels.", value: () => settings.emojiSize, options: [
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
                    ]
                },
                {
                    type: "dropdown", id: "emojiBypassType", name: "Emoji Bypass Method", note: "The method of bypass to use.", value: () => settings.emojiBypassType,
                    options: [
                        { label: "Upload Emojis", value: 0 },
                        { label: "Ghost Link Mode", value: 1 },
                        { label: "Classic Mode", value: 2 },
                        { label: "Hyperlink/Vencord-Like Mode", value: 3 }
                    ]
                },
                { type: "switch", id: "emojiBypassForValidEmoji", name: "Don't Use Emote Bypass if Emote is Unlocked", note: "Disable to use emoji bypass even if bypass is not required for that emoji.", value: () => settings.emojiBypassForValidEmoji },
                { type: "switch", id: "PNGemote", name: "Use PNG instead of WEBP", note: "Use the PNG version of static emoji for higher quality!", value: () => settings.PNGemote },
                { type: "switch", id: "stickerBypass", name: "Sticker Bypass", note: "Enable or disable using the sticker bypass. I recommend using An00nymushun's DiscordFreeStickers over this. Animated APNG/WEBP/Lottie Stickers WILL NOT animate.", value: () => settings.stickerBypass },
                { type: "switch", id: "uploadStickers", name: "Upload Stickers", note: "Upload stickers in the same way as emotes.", value: () => settings.uploadStickers },
                { type: "switch", id: "forceStickersUnlocked", name: "Force Stickers Unlocked", note: "Enable to cause Stickers to be unlocked.", value: () => settings.forceStickersUnlocked },
                { type: "switch", id: "fakeInlineVencordEmotes", name: "Fake Inline Hyperlink Emotes", note: "Makes hyperlinked emojis appear as if they were real emojis, inlined in the message, similar to Vencord FakeNitro emotes.", value: () => settings.fakeInlineVencordEmotes },
                { type: "switch", id:"soundmojiEnabled", name: "Soundmoji Bypass", note: "Unlocks soundmojis and allows you to \"send\" them by automatically replacing them with a MP3 upload and some special text that will make them render as real soundmojis on the client side. Please note that this will enable Experiments.", value: () => settings.soundmojiEnabled }
            ]
        },
        {
            type: "category",
            id: "profile",
            name: "Profile",
            collapsible: true,
            shown: false,
            settings: [
                { type: "switch", id: "profileV2", name: "Profile Accents", note: "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.", value: () => settings.profileV2 },
                { type: "switch", id: "fakeProfileThemes", name: "Fake Profile Themes", note: "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio.", value: () => settings.fakeProfileThemes },
                { type: "switch", id: "fakeProfileBanners", name: "Fake Profile Banners", note: "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons.", value: () => settings.fakeProfileBanners },
                { type: "switch", id: "userBgIntegration", name: "UserBG Integration", note: "Downloads and parses the UserBG JSON database so that UserBG banners will appear for you.", value: () => settings.userBgIntegration },
                { type: "switch", id: "fakeAvatarDecorations", name: "Fake Avatar Decorations", note: "Uses invisible 3y3 encoding to allow setting avatar decorations by hiding information in your bio and/or your custom status.", value: () => settings.fakeAvatarDecorations },
                { type: "switch", id: "profileEffects", name: "Fake Profile Effects", note: "Uses invisible 3y3 encoding to allow setting profile effects by hiding information in your bio.", value: () => settings.profileEffects },
                { type: "switch", id: "killProfileEffects", name: "Kill Profile Effects", note: "Hate profile effects? Enable this and they'll be gone. All of them. Overrides all profile effects.", value: () => settings.killProfileEffects },
                { type: "switch", id: "customPFPs", name: "Fake Profile Pictures", note: "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL IN YOUR CUSTOM STATUS. Only supports Imgur URLs for security reasons.", value: () => settings.customPFPs },
                { type: "switch", id: "userPfpIntegration", name: "UserPFP Integration", note: "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture. There's little reason to disable this.", value: () => settings.userPfpIntegration },
            ]
        },
        {
            type: "category",
            id: "clips",
            name: "Clips",
            collapsible: true,
            shown: false,
            settings: [
                { type: "switch", id: "useClipBypass", name: "Use Clips Bypass", note: "Enabling this will effectively set your file upload limit for video files to 100MB. Disable this if you have a file upload limit larger than 100MB. Enabling this option will also enable Experiments.", value: () => settings.useClipBypass },
                { type: "switch", id: "alwaysTransmuxClips", name: "Force Transmuxing", note: "Always transmux the video, even if transmuxing would normally be skipped. Transmuxing is only ever skipped if the codec does not include AVC1 or includes MP42.", value: () => settings.alwaysTransmuxClips },
                { type: "switch", id: "forceClip", name: "Force Clip", note: "Always send video files as a clip, even if the size is below 10MB.", value: () => settings.forceClip }
            ]
        },
        {
            type: "category",
            id: "miscellaneous",
            name: "Miscellaneous",
            collapsible: true,
            shown: false,
            settings: [
                { type: "switch", id: "changePremiumType", name: "Change PremiumType", note: "This is now optional. Enabling this may help compatibility for certain things or harm it. SimpleDiscordCrypt requires this to be enabled to have the emoji bypass work. Only enable this if you don't have Nitro.", value: () => settings.changePremiumType },
                { type: "switch", id: "clientThemes", name: "Gradient Client Themes", note: "Allows you to use Nitro-exclusive Client Themes.", value: () => settings.clientThemes },
                { type: "switch", id: "removeProfileUpsell", name: "Remove Profile Customization Upsell", note: "Removes the \"Try It Out\" upsell in the profile customization screen and replaces it with the Nitro variant. Note: does not allow you to use Nitro customization on Server Profiles as the API disallows this.", value: () => settings.removeProfileUpsell },
                { type: "switch", id: "removeScreenshareUpsell", name: "Remove Screen Share Nitro Upsell", note: "Removes the Nitro upsell in the Screen Share quality option menu.", value: () => settings.removeScreenshareUpsell },
                { type: "switch", id: "unlockAppIcons", name: "App Icons", note: "Unlocks app icons.", value: () => settings.unlockAppIcons },
                { type: "switch", id: "experiments", name: "Experiments", note: "Unlocks experiments. Use at your own risk.", value: () => settings.experiments },
                { type: "switch", id: "checkForUpdates", name: "Check for Updates", note: "Should the plugin check for updates on startup?", value: () => settings.checkForUpdates }
            ]
        }

    ],
    "main": "YABDP4Nitro.plugin.js"
};
// #endregion

// #region Exports
module.exports = class YABDP4Nitro {
    constructor(meta){
        this.meta = meta;
    }

    getSettingsPanel(){
        return UI.buildSettingsPanel({
            settings: config.settingsPanel,
            onChange: (category, id, value) => {
                switch (id){
                    case "CustomResolution":
                    case "CustomFPS":
                        settings[id] = parseInt(value);
                        this.saveAndUpdate();
                        break;
                    case "minBitrate":
                    case "targetBitrate":
                    case "maxBitrate":
                    case "voiceBitrate":
                        settings[id] = parseFloat(value);
                        this.saveAndUpdate();
                        break;
                    default:
                        settings[id] = value;
                        this.saveAndUpdate();
                        break;
                }
            }
        });
    }

    // #region Save and Update
    saveAndUpdate(){ //Saves and updates settings and runs functions
        Data.save(this.meta.name, "settings", settings);

        Patcher.unpatchAll(this.meta.name);

        if(settings.changePremiumType){
            try {
                if(!(ORIGINAL_NITRO_STATUS > 1)){
                    CurrentUser.premiumType = 1;
                    setTimeout(() => {
                        if(settings.changePremiumType){
                            CurrentUser.premiumType = 1;
                        }
                    }, 10000);
                }
            }
            catch(err){
                Logger.error(this.meta.name, "An error occurred changing premium type." + err);
            }
        }

        if(settings.CustomFPS == 15) settings.CustomFPS = 16;
        if(settings.CustomFPS == 30) settings.CustomFPS = 31;
        if(settings.CustomFPS == 5) settings.CustomFPS = 6;

        if(settings.ResolutionSwapper){
            try {
                this.resolutionSwapper();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.stickerBypass){
            try {
                this.stickerSending();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.forceStickersUnlocked || settings.stickerBypass){
            try {
                this.unlockStickers();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.emojiBypass){
            try {
                this.emojiBypass();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.profileV2){
            try {
                Patcher.after(this.meta.name, userProfileMod, "getUserProfile", (_, args, ret) => {
                    if(ret == undefined) return;
                    ret.premiumType = 2;
                });
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.screenSharing){
            try {
                this.customVideoSettings(); //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
            } catch(err){
                Logger.error(this.meta.name, "Error occurred during customVideoSettings() " + err);
            }
            try {
                this.videoQualityModule(); //Custom bitrate, fps, resolution module
            } catch(err){
                Logger.error(this.meta.name, "Error occurred during videoQualityModule() " + err);
            }
        }

        if(settings.clientThemes){
            try {
                this.clientThemes();
            } catch(err){
                Logger.warn(this.meta.name, err);
            }
        }

        if(settings.fakeProfileThemes){
            try {
                this.decodeAndApplyProfileColors();
                this.encodeProfileColors();
            } catch(err){
                Logger.error(this.meta.name, "Error occurred running fakeProfileThemes bypass. " + err);
            }

        }

        DOM.removeStyle(this.meta.name);

        if(settings.removeScreenshareUpsell){
            try {
                DOM.addStyle(this.meta.name, `
                [class*="upsellBanner"] {
                  display: none;
                  visibility: hidden;
                }`);
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.fakeProfileBanners){
            this.bannerUrlDecoding();
            this.bannerUrlEncoding(this.secondsightifyEncodeOnly);
            if(settings.userBgIntegration){
            }
        }

        Dispatcher.unsubscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);

        if(settings.fakeAvatarDecorations){
            this.fakeAvatarDecorations();
        }

        if(settings.unlockAppIcons){
            this.appIcons();
        }

        if(settings.profileEffects){
            try {
                this.profileFX(this.secondsightifyEncodeOnly);
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.killProfileEffects){
            try {
                this.killProfileFX();
            } catch(err){
                Logger.error(this.meta.name, "Error occured during killProfileFX() " + err);
            }
        }

        DOM.removeStyle("YABDP4NitroBadges");
        try {
            this.honorBadge();
        } catch(err){
            Logger.error(this.meta.name, "An error occurred during honorBadge() " + err);
        }

        if(settings.customPFPs){
            try {
                this.customProfilePictureDecoding();
                this.customProfilePictureEncoding(this.secondsightifyEncodeOnly);
            } catch(err){
                Logger.error(this.meta.name, "An error occurred during customProfilePicture decoding/encoding. " + err);
            }
        }

        if(settings.experiments){
            try {
                this.experiments();
            } catch(err){
                Logger.error(this.meta.name, "Error occurred in experiments() " + err);
            }
        }

        Patcher.instead(this.meta.name, canUserUseMod, "canUserUse", (_, [feature, user], originalFunction) => {
            if(settings.emojiBypass && (feature.name == "emojisEverywhere" || feature.name == "animatedEmojis"))
                return true;

            if(settings.unlockAppIcons && feature.name == 'appIcons')
                return true;

            if(settings.removeProfileUpsell && feature.name == 'profilePremiumFeatures')
                return true;

            if(settings.clientThemes && feature.name == 'clientThemes')
                return true;

            if(settings.soundmojiEnabled && feature.name == 'soundboardEverywhere')
                return true;

            return originalFunction(feature, user);
        });

        //Clips Bypass
        if(settings.useClipBypass){
            try {
                this.experiments();
                this.overrideExperiment("2023-09_clips_nitro_early_access", 2);
                this.overrideExperiment("2022-11_clips_experiment", 1);
                this.overrideExperiment("2023-10_viewer_clipping", 1);

                this.clipsBypass();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.fakeInlineVencordEmotes){
            this.inlineFakemojiPatch();
        }

        if(settings.soundmojiEnabled || (settings.emojiBypass && settings.emojiBypassType == 0))
            this._sendMessageInsteadPatch();

        if(settings.videoCodec2 > -1)
            this.videoCodecs();

    } //End of saveAndUpdate()
    // #endregion

    // #region Resolution Swapper
    async resolutionSwapper(){
        if(!this.StreamSettingsPanelMod)
            this.StreamSettingsPanelMod = await Webpack.waitForModule(Webpack.Filters.byStrings("StreamSettings: user cannot be undefined"), {defaultExport:false});
        
        if(!this.FormModalClasses) 
            this.FormModalClasses = Webpack.getByKeys("formItemTitleSlim", "modalContent");
        
        Patcher.after(this.meta.name, this.StreamSettingsPanelMod, "Z", (_, [args], ret) => {

            //Only if the selected preset is "Custom"
            if(args.selectedPreset === 3){
                //Preparations 
                const streamQualityButtonsSection = ret.props.children.props.children.props.children[1].props.children[0].props.children;

                const resolutionButtonsSection = streamQualityButtonsSection[0].props;
                const thirdResolutionButton = resolutionButtonsSection.children.props.buttons[2];

                const fpsButtonsSection = streamQualityButtonsSection[1].props;
                const thirdFpsButton = fpsButtonsSection.children.props.buttons[2];


                //make each section into arrays so we can add another element
                resolutionButtonsSection.children = [resolutionButtonsSection.children];
                fpsButtonsSection.children = [fpsButtonsSection.children];

                //Resolution input
                resolutionButtonsSection.children.push(React.createElement("div", {
                    children: [
                        React.createElement("h1", {
                            children: "CUSTOM RESOLUTION",
                            className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                        }),
                        React.createElement(Components.NumberInput, {
                            value: settings.CustomResolution,
                            onChange: (input) => {
                                settings.CustomResolution = input;
                                //updates visual
                                thirdResolutionButton.value = input;
                                //sets values and saves to settings
                                this.unlockAndCustomizeStreamButtons();
                                //simulate click on button -- serves to both select it and to make react re-render it.
                                thirdResolutionButton.onClick();
                            }
                        })
                    ]
                }));

                fpsButtonsSection.children.push(React.createElement("div", {
                    children: [
                        React.createElement("h1", {
                            children: "CUSTOM FRAME RATE",
                            className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                        }),
                        React.createElement(Components.NumberInput, {
                            value: settings.CustomFPS,
                            onChange: (input) => {
                                settings.CustomFPS = input;
                                //updates visual
                                thirdFpsButton.value = input;
                                //sets values and saves to settings
                                this.unlockAndCustomizeStreamButtons();
                                //simulate click on button -- serves to both select it and to make react re-render it.
                                thirdFpsButton.onClick();
                            }
                        })
                    ]
                }));
            }
        });
    }
    // #endregion

    unlockStickers(){
        Patcher.instead(this.meta.name, stickerSendabilityModule, "getStickerSendability", () => {
            return 0; //SENDABLE
        });
        Patcher.instead(this.meta.name, stickerSendabilityModule, "isSendableSticker", () => {
            return true;
        });
    }

    videoCodecs(){
        Patcher.after(this.meta.name, streamSettingsMod, "getCodecOptions", (_, args, ret) => {
            ret.videoEncoder = ret.videoDecoders[settings.videoCodec2];
        });
    }

    overrideExperiment(type, bucket){
        //console.log("applying experiment override " + type + "; bucket " + bucket);
        Dispatcher.dispatch({
            type: "EXPERIMENT_OVERRIDE_BUCKET",
            experimentId: type,
            experimentBucket: bucket
        });
    }

    // #region Clips Bypass
    async clipsBypass(){
        if(!this.MP4Box){
            try{
                await Webpack.getByStrings("mp4boxInputFile.boxes")();
            }catch(e){}
            this.MP4Box = await Webpack.waitForModule(BdApi.Webpack.Filters.byKeys("MP4BoxStream"));
        }
        if(ffmpeg == undefined) await this.loadFFmpeg();

        async function ffmpegTransmux(arrayBuffer, fileName = "input.mp4"){
            if(ffmpeg){
                //UI.showToast("Transmuxing video...", { type: "info" });
                ffmpeg.on("log", ({ message }) => {
                    console.log(message);
                });
                await ffmpeg.writeFile(fileName, new Uint8Array(arrayBuffer));
                await ffmpeg.exec(["-i", fileName, "-codec", "copy", "-brand", "isom/avc1", "-movflags", "+faststart", "-map", "0", "-map_metadata", "-1", "-map_chapters", "-1", "output.mp4"]);
                const data = await ffmpeg.readFile('output.mp4');

                return data.buffer;
            }
        }
        Patcher.instead(this.meta.name, addFilesMod, "addFiles", async (_, [args], originalFunction) => {
            /* If ffmpeg isn't loaded, or was unloaded for some reason,
               when the user adds a file, make sure to load it again if it's undefined
               If we don't do this check, then the user would have to
               trigger saveAndUpdate or restart the plugin to
               make ffmpeg load if it wasn't loaded properly the first time. */
            if(ffmpeg == undefined) await this.loadFFmpeg();
			
            //for each file being added
            for(let i = 0; i < args.files.length; i++){
                const currentFile = args.files[i];

                if(currentFile.file.name.endsWith(".dlfc")) return;

                //larger than 10mb
                if(currentFile.file.size > 10485759 || settings.forceClip){
					const clipData = {
                        "id": "",
                        "version": 3,
                        "applicationName": "",
                        "applicationId": "1301689862256066560",
                        "users": [
							CurrentUser.id
						],
                        "clipMethod": "manual",
                        "length": currentFile.file.size,
                        "thumbnail": "",
                        "filepath": "",
                        "name": currentFile.file.name.substring(0, currentFile.file.name.lastIndexOf('.'))
                    };
					
					//if this file is an mp4 file
                    if(currentFile.file.type == "video/mp4"){
                        let dontStopMeNow = true;
                        let mp4BoxFile = this.MP4Box.createFile();
                        mp4BoxFile.onError = (e) => {
                            Logger.error(this.meta.name, e);
                            dontStopMeNow = false;
                        };
                        mp4BoxFile.onReady = async (info) => {
                            mp4BoxFile.flush();

                            try {
                                //check if file is H264 or H265
                                if(info.videoTracks[0].codec.startsWith("avc") || info.videoTracks[0].codec.startsWith("hev1")){

                                    let hasTransmuxed = false;
                                    if(!info.brands.includes("avc1") || info.brands.includes("mp42") || settings.alwaysTransmuxClips){
                                        arrayBuffer = await ffmpegTransmux(arrayBuffer, currentFile.file.name);
                                        hasTransmuxed = true;
                                    }

                                    let isMetadataPresent = false;

                                    //skip if we transmuxed since we know it won't have the tag
                                    if(!hasTransmuxed){
                                        //Is this file already a Discord clip?
                                        for(let j = 0; j < mp4BoxFile.boxes.length; j++){
                                            if(mp4BoxFile.boxes[j].type == "uuid"){
                                                isMetadataPresent = true;
                                            }
                                        }
                                    }

                                    //If this file is not a Discord clip, append udtaBuffer
                                    if(!isMetadataPresent){

                                        let array1 = ArrayBuffer.concat(arrayBuffer, udtaBuffer);

                                        let video = new File([new Uint8Array(array1)], currentFile.file.name, { type: "video/mp4" });

                                        currentFile.file = video;
                                    }

                                }else{
                                    //file is not H264 or H265, but is an mp4
                                    arrayBuffer = await ffmpegTransmux(arrayBuffer, currentFile.file.name);
                                    let array1 = ArrayBuffer.concat(arrayBuffer, udtaBuffer);
                                    let video = new File([new Uint8Array(array1)], currentFile.file.name, { type: "video/mp4" });

                                    currentFile.file = video;
                                }

                                //send as a "clip"
                                currentFile.clip = clipData;
                            } catch(err){
                                UI.showToast("Something went wrong. See console for details.", { type: "error" });
                                Logger.error(this.meta.name, err);
                            } finally {
                                dontStopMeNow = false;
                            }
                        };

                        let arrayBuffer;
                        currentFile.file.arrayBuffer().then(obj => {
                            arrayBuffer = obj;
                            arrayBuffer.fileStart = 0;
                            //examine file with mp4Box.
                            mp4BoxFile.appendBuffer(arrayBuffer);
                            //onReady will run after the buffer is appended successfully
                        });

                        //wait for onReady to finish
                        while (dontStopMeNow){
                            await new Promise(r => setTimeout(r, 10));
                        }
                    }else if(currentFile.file.type.startsWith("video/")){
                        //Is a video file, but not MP4

                        //AVI file warning
                        if(currentFile.file.type == "video/x-msvideo"){
                            UI.showToast("[YABDP4Nitro] NOTE: AVI Files will send, but HTML5 does not support playing AVI video codecs!", { type: "warning" });
                        }
                        try {
                            let arrayBuffer = await currentFile.file.arrayBuffer();

                            let array1 = ArrayBuffer.concat(await ffmpegTransmux(arrayBuffer, currentFile.file.name), udtaBuffer);
                            let video = new File([new Uint8Array(array1)], currentFile.file.name.substr(0, currentFile.file.name.lastIndexOf(".")) + ".mp4", { type: "video/mp4" });

                            currentFile.file = video;

                            //send as a "clip"
                            currentFile.clip = clipData;
                        } catch(err){
                            UI.showToast("Something went wrong. See console for details.", { type: "error" });
                            Logger.error(this.meta.name, err);
                        }
                    }
                    currentFile.platform = 1;
                }
            }
            originalFunction(args);
        });

        Patcher.after(this.meta.name, ClipsEnabledMod, "useEnableClips", (_, args, ret) => {
            //I have no earthly idea why but, instead patching this one causes React crashes./
            // Luckily after-patching prevents it from crashing and it still unlocks it as it should
            return true;
        });
        Patcher.instead(this.meta.name, ClipsEnabledMod, "areClipsEnabled", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsEnabledMod, "isPremium", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsAllowedMod, "isClipsClientCapable", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsMod, "isViewerClippingAllowedForUser", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsMod, "isClipsEnabledForUser", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsMod, "isVoiceRecordingAllowedForUser", () => {
            return true;
        });
    } //End of clipsBypass()
    // #endregion

    // #region Load FFmpeg.js
    async loadFFmpeg(){
        const defineTemp = window.global.define;

        try {
            const ffmpeg_js_baseurl = "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg/";
            //load ffmpeg worker
            const ffmpegWorkerURL = URL.createObjectURL(await (await fetch(ffmpeg_js_baseurl + "814.ffmpeg.js", { timeout: 100000 })).blob());

            //load FFmpeg.WASM
            let ffmpegSrc = await (await fetch(ffmpeg_js_baseurl + "ffmpeg.js")).text();

            //patch worker URL in the source of ffmpeg.js (why is this a problem lmao)
            ffmpegSrc = ffmpegSrc.replace(`new URL(e.p+e.u(814),e.b)`, `"${ffmpegWorkerURL.toString()}"`);
            //blob ffmpeg
            const ffmpegURL = URL.createObjectURL(new Blob([ffmpegSrc]));

            // for some reason, for ffmpeg.js to work we need to set global define to undefined temporarily.
            // since for a brief moment it is undefined, any function that uses it may throw an error during that window.
            window.global.define = undefined;

            //deprecated function, but uhhhh fuck you we need it
            await BdApi.linkJS("ffmpeg.js", ffmpegURL);

            window.global.define = defineTemp;

            ffmpeg = new FFmpegWASM.FFmpeg();

            const ffmpegCoreURL = URL.createObjectURL(await (await fetch(ffmpeg_js_baseurl + "ffmpeg-core.js", { timeout: 100000 })).blob());

            const ffmpegCoreWasmURL = URL.createObjectURL(await (await fetch(ffmpeg_js_baseurl + "ffmpeg-core.wasm", { timeout: 100000 })).blob());

            await ffmpeg.load({
                coreURL: ffmpegCoreURL,
                wasmURL: ffmpegCoreWasmURL
            });
            Logger.info(this.meta.name, "FFmpeg load success!");
        } catch(err){
            UI.showToast("An error occured trying to load FFmpeg.wasm. Check console for details.", { type: "error" });
            Logger.info(this.meta.name, "FFmpeg failed to load. The clips bypass will not work without this unless the file is already the correct format! Error details below.");
            Logger.error(this.meta.name, err);
        } finally {
            //Ensure we return window.global.define to its regular state just in case we errored during the short window where it has to be set to undefined.
            window.global.define = defineTemp;
        }
    } //End of loadFFmpeg()
    // #endregion

    // #region Experiments
    async experiments(){
        try {
            //code heavily modified from https://gist.github.com/JohannesMP/afdf27383608c3b6f20a6a072d0be93c?permalink_comment_id=4784940#gistcomment-4784940
            CurrentUser.flags |= 1;
            const Stores = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
            Stores.find((x) => x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
            try { Stores.find((x) => x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } }); } catch {}
            Stores.find((x) => x.name === "ExperimentStore").storeDidChange(); 
        } catch(err){
            Logger.warn(this.meta.name, err);
        }
    }
    // #endregion

    // #region Client Themes
    clientThemes(){

        //delete isPreview property so that we can set our own
        delete clientThemesModule.isPreview;

        //this property basically unlocks the client theme buttons
        Object.defineProperty(clientThemesModule, "isPreview", { //Enabling the nitro theme settings
            value: false,
            configurable: true,
            enumerable: true,
            writable: true,
        });

        //Patching saveClientTheme function.
        Patcher.instead(this.meta.name, themesModule, "saveClientTheme", (_, [args]) => {
            if(args.backgroundGradientPresetId == undefined){

                //If this number is -1, that indicates to the plugin that the current theme we're setting to is not a gradient nitro theme.
                settings.lastGradientSettingStore = -1;
                //save any changes to settings
                //Utilities.saveSettings(this.meta.name, this.settings);
                Data.save(this.meta.name, "settings", this.settings);

                //if user is trying to set the theme to the default dark theme
                if(args.theme == 'dark' || args.theme == 'light' || args.theme == 'darker' || args.theme == 'midnight'){
                    //dispatch settings update to change to dark theme
                    Dispatcher.dispatch({
                        type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
                        changes: {
                            appearance: {
                                shouldSync: false, //prevent sync to stop discord api from butting in. Since this is not a nitro theme, shouldn't this be set to true? Idk, but I'm not touching it lol.
                                settings: {
                                    theme: args.theme, //default dark theme
                                    developerMode: true //genuinely have no idea what this does.
                                }
                            }
                        }
                    });
                    return;
                }
                return;
            }else{ //gradient themes
                //Store the last gradient setting used in settings
                settings.lastGradientSettingStore = args.backgroundGradientPresetId;
                
                //save any changes to settings
                Data.save(this.meta.name, "settings", this.settings);

                //dispatch settings update event to change to the gradient the user chose
                Dispatcher.dispatch({
                    type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
                    changes: {
                        appearance: {
                            shouldSync: false,  //prevent sync to stop discord api from butting in
                            settings: {
                                theme: args.theme, //gradient themes are based off of either dark or light, args.theme stores this information
                                clientThemeSettings: {
                                    backgroundGradientPresetId: args.backgroundGradientPresetId //preset ID for the gradient theme
                                },
                                developerMode: true
                            }
                        }
                    }
                });

                //update background gradient preset to the one that was just chosen.
                Dispatcher.dispatch({
                    type: "UPDATE_BACKGROUND_GRADIENT_PRESET",
                    presetId: settings.lastGradientSettingStore
                });
            }
        }); //End of saveClientTheme patch.


        //If last appearance choice was a nitro client theme
        if(settings.lastGradientSettingStore != -1){

            //This sets the gradient on plugin save and load.
            Dispatcher.dispatch({
                type: "UPDATE_BACKGROUND_GRADIENT_PRESET",
                presetId: settings.lastGradientSettingStore
            });
        }

        //startSession patch. This function runs upon switching accounts.
        Patcher.after(this.meta.name, accountSwitchModule, "startSession", () => {

            setTimeout(() => {
                //If last appearance choice was a nitro client theme
                if(settings.lastGradientSettingStore != -1){
                    //Restore gradient on account switch
                    Dispatcher.dispatch({
                        type: "UPDATE_BACKGROUND_GRADIENT_PRESET",
                        presetId: settings.lastGradientSettingStore
                    });
                }
            }, 3000);
        });
    } //End of clientThemes()
    // #endregion

    // #region Custom PFP Decode
    customProfilePictureDecoding(){

        Patcher.instead(this.meta.name, getAvatarUrlModule, "getAvatarURL", (user, [userId, size, shouldAnimate], originalFunction) => {

            //userpfp closer integration
            //if we haven't fetched userPFP database yet and it's enabled
            if((!fetchedUserPfp || this.userPfps == undefined) && settings.userPfpIntegration){

                const userPfpJsonUrl = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";

                // download userPfp data
                Net.fetch(userPfpJsonUrl)
                    // parse as json
                    .then(res => res.json())
                    // store res.avatars in this.userPfps
                    .then(res => this.userPfps = res.avatars);
                //set fetchedUserPfp flag to true.
                fetchedUserPfp = true;

            }

            //if userPfp database is not undefined, has been fetched, and is enabled
            if((this.userPfps != undefined && fetchedUserPfp) && settings.userPfpIntegration){
                //and this user is in the userPfp database,
                if(this.userPfps[user.id] != undefined){
                    //return UserPFP profile picture URL.
                    return this.userPfps[user.id];
                }
            }

            //get user activities
            let activities = UserStatusStore.getActivities(user.id);

            if(activities.length > 0){
                //if user does not have a custom status, return original function.
                if(activities[0].name != "Custom Status") return originalFunction(userId, size, shouldAnimate);

                //if user does have a custom status, assign it to customStatus variable.
                let customStatus = activities[0].state;
                //checking if anything went wrong
                if(customStatus == undefined) return originalFunction(userId, size, shouldAnimate);
                //decode any 3y3 text
                let revealedText = this.secondsightifyRevealOnly(String(customStatus));
                //if there is no 3y3 encoded text, return original function.
                if(revealedText == undefined) return originalFunction(userId, size, shouldAnimate);

                //This regex matches /P{*} . (Do not fuck with this)
                let regex = /P\{[^}]*?\}/;

                //Check if there are any matches in the custom status.
                let matches = revealedText.toString().match(regex);
                //if not, return orig function
                if(matches == undefined) return originalFunction(userId, size, shouldAnimate);
                if(matches == "") return originalFunction(userId, size, shouldAnimate);

                //if there is a match, take the first match and remove the starting "P{ and ending "}"
                let matchedText = matches[0].replace("P{", "").replace("}", "");

                //look for a file extension. If omitted, fallback to .gif .
                if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
                    matchedText += ".gif"; //No supported file extension detected. Falling back to a default file extension.
                }

                //add this user to the list of users who have the YABDP4Nitro user badge if we haven't added them already.
                if(!badgeUserIDs.includes(user.id)) badgeUserIDs.push(user.id);

                //return imgur url
                return `https://i.imgur.com/${matchedText}`;
            }

            //if user does not have any activities active, return original function.
            return originalFunction(userId, size, shouldAnimate);
        });
    }
    // #endregion

    // #region Custom PFP Encode
    //Custom PFP profile customization buttons and encoding code.
    async customProfilePictureEncoding(secondsightifyEncodeOnly){

        //wait for avatar customization section renderer to be loaded
        await Webpack.waitForModule(Webpack.Filters.byStrings("showRemoveAvatarButton", "isTryItOutFlow"));
        //store avatar customization section renderer module
        if(this.customPFPSettingsRenderMod == undefined) this.customPFPSettingsRenderMod = Webpack.getByStrings("showRemoveAvatarButton", "isTryItOutFlow", { defaultExport: false });

        Patcher.after(this.meta.name, this.customPFPSettingsRenderMod, "Z", (_, [args], ret) => {

            //don't need to do anything if this is the "Try out Nitro" flow.
            if(args.isTryItOutFlow) return;

            ret.props.children.props.children.push(
                React.createElement("input", {
                    id: "profilePictureUrlInput",
                    style: {
                        width: "30%",
                        height: "20%",
                        maxHeight: "50%",
                        marginTop: "5px",
                        marginLeft: "5px"
                    },
                    placeholder: "Imgur URL for PFP"
                })
            );

            //Create and append Copy PFP 3y3 button.
            ret.props.children.props.children.push(
                React.createElement("button", {
                    children: "Copy PFP 3y3",
                    className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                    id: "profilePictureButton",
                    style: {
                        marginLeft: "10px",
                        whiteSpace: "nowrap"
                    },
                    onClick: async function(){ //on copy pfp 3y3 button click

                        //grab text from pfp url input textarea.
                        let profilePictureUrlInputValue = String(document.getElementById("profilePictureUrlInput").value);

                        //empty, skip.
                        if(profilePictureUrlInputValue == "") return;
                        if(profilePictureUrlInputValue == undefined) return;

                        //clean up string to encode
                        let stringToEncode = "" + profilePictureUrlInputValue
                            //clean up URL
                            .replace("http://", "") //remove protocol
                            .replace("https://", "")
                            .replace("i.imgur.com", "imgur.com");

                        let encodedStr = ""; //initialize encoded string as empty string
                        stringToEncode = String(stringToEncode); //make doubly sure stringToEncode is a string

                        //if url seems correct
                        if(stringToEncode.toLowerCase().startsWith("imgur.com")){

                            //Check for album or gallery URL
                            if(stringToEncode.replace("imgur.com/", "").startsWith("a/") || stringToEncode.replace("imgur.com/", "").startsWith("gallery/")){
                                //Album URL, what follows is all to get the direct image link, since the album URL is not a direct link to the file.

                                //Fetch imgur album page
                                try {
                                    const parser = new DOMParser();
                                    stringToEncode = await Net.fetch(("https://" + stringToEncode), {
                                        method: "GET",
                                        mode: "cors"
                                    }).then(res => res.text()
                                        //parse html, queryselect meta tag with certain name
                                        .then(res => parser.parseFromString(res, "text/html").querySelector('[name="twitter:player"]').content));
                                    stringToEncode = stringToEncode.replace("http://", "") //get rid of protocol
                                        .replace("https://", "") //get rid of protocol
                                        .replace("i.imgur.com", "imgur.com")
                                        .replace(".jpg", "").replace(".jpeg", "").replace(".webp", "").replace(".png", "").replace(".mp4", "").replace(".webm", "").replace(".gifv", "").replace(".gif", "") //get rid of any file extension
                                        .split("?")[0]; //remove any URL parameters since we don't want or need them
                                } catch(err){
                                    Logger.error(this.meta.name, err);
                                    BdApi.UI.showToast("An error occurred. Are there multiple images in this album/gallery?", { type: "error" });
                                    return;
                                }
                            }
                            if(stringToEncode == ""){
                                BdApi.UI.showToast("An error occurred: couldn't find file name.", { type: "error" });
                                Logger.error(this.meta.name, "Couldn't find file name for some reason. Contact Riolubruh!");
                            }

                            //add starting "P{" , remove "imgur.com/" , and add ending "}"
                            stringToEncode = "P{" + stringToEncode.replace("imgur.com/", "") + "}";
                            //finally encode the string, adding a space before it so nothing fucks up
                            encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
                            //let the user know what has happened
                            BdApi.UI.showToast("3y3 copied to clipboard!", { type: "info" });

                            //If this is not an Imgur URL, yell at the user.
                        }else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
                            BdApi.UI.showToast("Please use Imgur!", { type: "warning" });
                            return;
                        }

                        //if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
                        if(encodedStr == "") return;

                        //Do this stupid shit that Chrome forces you to do to copy text to the clipboard.
                        const clipboardTextElem = document.createElement("textarea"); //create a textarea
                        clipboardTextElem.style.position = 'fixed'; //this is so that the rest of the document doesn't try to format itself to fit a textarea in it
                        clipboardTextElem.value = encodedStr; //add the encoded string to the textarea
                        document.body.appendChild(clipboardTextElem); //add the textarea to the document
                        clipboardTextElem.select(); //focus the textarea?
                        clipboardTextElem.setSelectionRange(0, 99999); //select all of the text in the textarea
                        document.execCommand('copy'); //finally send the copy command
                        document.body.removeChild(clipboardTextElem); //get rid of the evidence	
                    } //end copy pfp 3y3 click event
                }) //end of react createElement
            ); //end of element push
        }); //end of patch
    } //End of customProfilePictureEncoding()
    // #endregion

    // #region Badges
    //Apply custom badges.
    honorBadge(){

        // Use CSS to select badge elements via aria-label and change them to the correct icon.
        DOM.addStyle("YABDP4NitroBadges", `
            a[aria-label="A fellow YABDP4Nitro user!"] img {
                content: url("https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png") !important;
            }
            
            div [aria-label="A fellow YABDP4Nitro user!"] > a > img {
                content: url("https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png") !important;
            }

            a[aria-label="YABDP4Nitro Creator!"] img, a[aria-label="YABDP4Nitro Contributor!"] img  {
                content: url("https://i.imgur.com/bYGGXnq.gif") !important;
            }
            
            div [aria-label="YABDP4Nitro Creator!"] > a > img {
                content: url("https://i.imgur.com/bYGGXnq.gif") !important;
            }
            
            div [aria-label="YABDP4Nitro Contributor!"] > a > img {
                content: url("https://i.imgur.com/bYGGXnq.gif") !important;
            }
        `);

        //User profile badge patches
        Patcher.after(this.meta.name, userProfileMod, "getUserProfile", (_, args, ret) => {
            //bad data checks
            if(ret == undefined) return;
            if(ret.userId == undefined) return;
            if(ret.badges == undefined) return;

            const badgesList = []; //list of the currently processed user's badge IDs

            for(let i = 0; i < ret.badges.length; i++){ //for each of currently processed user's badges
                badgesList.push(ret.badges[i].id); //add each of this user's badge IDs to badgesList
            }

            //if list of users that should have yabdp_user badge includes current user, and they don't already have the badge applied,
            if(badgeUserIDs.includes(ret.userId) && !badgesList.includes("yabdp_user")){
                //add the yabdp user badge to the user's list of badges.
                ret.badges.push({
                    id: "yabdp_user",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
                    description: "A fellow YABDP4Nitro user!",
                    link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
                });
            }

            //if this user is Riolubruh, and they don't already have the badge applied,
            if(ret.userId == "359063827091816448" && !badgesList.includes("yabdp_creator")){
                //add the yabdp creator badge to riolubruh's list of badges.
                ret.badges.push({
                    id: "yabdp_creator",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
                    description: "YABDP4Nitro Creator!",
                    link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
                });
            }

            // List of Discord User IDs of people who have made contributions to the plugin
            // Special thanks to the following gamers:
            const specialThanks = [
                "122072911455453184", // Weblure,
                "760274365853335563", // Kozhura_ubezhishe_player_fly,
                "482224256730791967", // Moeefa,
                "1106012563835195412",// HunBun (hunbun.net),
                "917630027477159986"  // and Arven (zrodevkaan)!
            ];

            //if the currently processed user is included in specialThanks, and they don't already have the badge applied,
            if(specialThanks.includes(ret.userId) && !badgesList.includes("yabdp_contributor")){
                //add the yabdp contributor badge to the contributor's list of badges
                ret.badges.push({
                    id: "yabdp_contributor",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
                    description: "YABDP4Nitro Contributor!",
                    link: "https://github.com/riolubruh/YABDP4Nitro#contributors" //this link opens upon clicking the badge.
                });
            }

        }); //End of user profile badge patches
    } //End of honorBadge()
    // #endregion

    // #region 3y3 Secondsightify
    secondsightifyRevealOnly(t){
        if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))){
            // 3y3 text detected. Revealing...
            return (t => ([...t].map(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f) ? String.fromCodePoint(x.codePointAt(0) - 0xe0000) : x).join("")))(t);
        }else{
            // no encoded text found, returning
            return;
        }
    }

    secondsightifyEncodeOnly(t){
        if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))){
            // 3y3 text detected. returning...
            return;
        }else{
            //3y3 text detected. revealing...
            return (t => [...t].map(x => (0x00 < x.codePointAt(0) && x.codePointAt(0) < 0x7f) ? String.fromCodePoint(x.codePointAt(0) + 0xe0000) : x).join(""))(t);
        }
    }
    // #endregion

    // #region Profile Effects
    //Everything related to Fake Profile Effects.
    async profileFX(secondsightifyEncodeOnly){

        if(settings.killProfileEffects) return; //profileFX is mutually exclusive with killProfileEffects (obviously)

        //wait for profile effects module
        await Webpack.waitForModule(Webpack.Filters.byKeys("profileEffects", "tryItOutId"));

        if (this.profileEffects == undefined) this.profileEffects = Webpack.getStore("ProfileEffectStore").profileEffects;


        //if profile effects data hasn't been fetched by the client yet
        if(this.profileEffects == undefined || this.profileEffects?.length === 0){
            //make the client fetch profile effects
            await fetchProfileEffects();
            this.profileEffects = Webpack.getStore("ProfileEffectStore").profileEffects;
        }

        let profileEffectIdList = new Array();
        for(let i = 0; i < this.profileEffects.length; i++){
            profileEffectIdList.push(this.profileEffects[i].id);
        }

        Patcher.after(this.meta.name, userProfileMod, "getUserProfile", (_, [args], ret) => {
            //error prevention
            if(ret == undefined) return;
            if(ret.bio == undefined) return;

            //reveal 3y3 encoded text. this string will also include the rest of the bio
            let revealedText = this.secondsightifyRevealOnly(ret.bio);
            if(revealedText == undefined) return;

            //if profile effect 3y3 is detected
            if(revealedText.includes("/fx")){
                const regex = /\/fx\d+/;
                let matches = revealedText.toString().match(regex);
                if(matches == undefined) return;
                let firstMatch = matches[0];
                if(firstMatch == undefined) return;

                //slice the /fx and only take the number after it.
                let effectIndex = parseInt(firstMatch.slice(3));
                //ignore invalid data 
                if(isNaN(effectIndex)) return;
                //ignore if the profile effect id does not point to an actual profile effect
                if(profileEffectIdList[effectIndex] == undefined) return;
                //set the profile effect. stringify it.
                ret.profileEffectId = profileEffectIdList[effectIndex] + "";

                //if for some reason we dont know what this user's ID is, stop here
                if(args == undefined) return;
                //otherwise add them to the list of users who show up with the YABDP4Nitro user badge
                if(!badgeUserIDs.includes(args)) badgeUserIDs.push(args);
            }
        }); //end of getUserProfile patch.

        //wait for profile effect section renderer to be loaded.
        await Webpack.waitForModule(Webpack.Filters.byStrings("initialSelectedEffectId"));

        //fetch the module now that it's loaded
        if(this.profileEffectSectionRenderer == undefined) this.profileEffectSectionRenderer = Webpack.getByStrings("initialSelectedEffectId", { defaultExport: false });

        //patch profile effect section renderer function to run the following code after the function runs
        Patcher.after(this.meta.name, this.profileEffectSectionRenderer, "Z", (_, [args], ret) => {
            //if this is the tryItOut flow, don't do anything.
            if(args.isTryItOutFlow) return;

            let profileEffectChildren = [];

            //for each profile effect
            for(let i = 0; i < this.profileEffects.length; i++){

                //get preview image url
                let previewURL = this.profileEffects[i].config.thumbnailPreviewSrc;
                let title = this.profileEffects[i].config.title;
                //encode 3y3
                let encodedText = secondsightifyEncodeOnly("/fx" + i); //fx0, fx1, etc.
                //javascript that runs onclick for each profile effect button
                let copyDecoration3y3 = function(){
                    const clipboardTextElem = document.createElement("textarea");
                    clipboardTextElem.style.position = "fixed";
                    clipboardTextElem.value = ` ${encodedText}`;
                    document.body.appendChild(clipboardTextElem);
                    clipboardTextElem.select();
                    clipboardTextElem.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    BdApi.UI.showToast("3y3 copied to clipboard!", { type: "info" });
                    document.body.removeChild(clipboardTextElem);
                };

                profileEffectChildren.push(
                    React.createElement("img", {
                        className: "riolubruhsSecretStuff",
                        onClick: copyDecoration3y3,
                        src: previewURL,
                        title,
                        style: {
                            width: "22.5%",
                            cursor: "pointer",
                            marginBottom: "0.5em",
                            marginLeft: "0.5em",
                            backgroundColor: "var(--background-tertiary)"
                        }
                    })
                );

                //add newline every 4th profile effect
                if((i + 1) % 4 == 0){
                    profileEffectChildren.push(
                        React.createElement("br")
                    );
                }
            }

            //Profile Effects Modal
            function EffectsModal(){
                const elem = React.createElement("div", {
                    style: {
                        width: "100%",
                        display: "block",
                        color: "white",
                        whiteSpace: "nowrap",
                        overflow: "visible",
                        marginTop: ".5em"
                    },
                    children: profileEffectChildren
                });
                return elem;
            }

            //Append Change Effect button
            ret.props.children.props.children.push(
                //self explanatory create react element
                React.createElement("button", {
                    children: "Change Effect [YABDP4Nitro]",
                    className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                    size: "bd-button-small",
                    id: "changeProfileEffectButton",
                    style: {
                        width: "100px",
                        height: "32px",
                        color: "white",
                        marginLeft: "10px"
                    },
                    onClick: () => {
                        UI.showConfirmationModal("Change Profile Effect (YABDP4Nitro)", React.createElement(EffectsModal));
                    }

                })
            );
        }); //end patch of profile effect section renderer function

    } //End of profileFX()

    killProfileFX(){ //self explanatory, just tries to make it so any profile that has a profile effect appears without it
        Patcher.after(this.meta.name, userProfileMod, "getUserProfile", (_, args, ret) => {
            if(ret?.profileEffectID === undefined) return;
            ret.profileEffectID = undefined;
        });
    }
    // #endregion

    // #region Avatar Decorations
    //Everything related to fake avatar decorations.
    storeProductsFromCategories = event => {
        if(event.categories){
            event.categories.forEach(category => {
                category.products.forEach(product => {
                    product.items.forEach(item => {
                        if(item.asset){
                            Object.assign(settings.avatarDecorations)[item.id] = item.asset;
                        }
                    });
                });
            });
        }
    };

    async fakeAvatarDecorations(){
        //apply decorations
        Patcher.after(this.meta.name, UserStore, "getUser", (_, args, ret) => {
            //basic error checking
            if(args == undefined) return;
            if(args[0] == undefined) return;
            if(ret == undefined) return;
            let avatarDecorations = settings.avatarDecorations;

            //user has an avatar decoration
            if(ret.avatarDecorationData){
                //error check
                if(avatarDecorations){
                    //dont process fake avatar decorations
                    if(ret.avatarDecorationData.sku_id != "0"){
                        //cache avatar decoration
                        avatarDecorations[ret.avatarDecorationData.skuId] = ret.avatarDecorationData.asset;
                    }
                }
            }

            function getRevealedText(self){
                let revealedTextLocal = ""; //init empty string with local scope
                let userProfile = userProfileMod.getUserProfile(args[0]); //get the user's profile from the cached user profiles

                //if this user's profile has been downloaded
                if(userProfile){
                    //if their bio is empty, move on to the next check.
                    if(userProfile?.bio != undefined){
                        //reveal 3y3 encoded text
                        revealedTextLocal = self.secondsightifyRevealOnly(String(userProfile.bio));
                        //if there's no 3y3 text, move on to the next check.
                        if(revealedTextLocal != undefined){
                            if(String(revealedTextLocal).includes("/a")){
                                //return bio with the 3y3 decoded
                                return revealedTextLocal;
                            }
                        }
                    }
                }
                let activities = UserStatusStore.getActivities(args[0]);
                if(activities.length > 0){
                    //grab user's activities (this includes custom status)

                    //if they don't have a custom status, stop processing.
                    if(activities[0].name != "Custom Status") return;
                    //otherwise, grab the text from the custom status
                    let customStatus = activities[0].state;
                    //if something has gone horribly wrong, stop processing.
                    if(customStatus == undefined) return;
                    //finally reveal 3y3 encoded text
                    revealedTextLocal = self.secondsightifyRevealOnly(String(customStatus));
                    //return custom status with the 3y3 decoded
                    return revealedTextLocal;
                }
            }
            let revealedText = getRevealedText(this);
            //if nothing's returned, or an empty string is returned, stop processing.
            if(revealedText == undefined) return;
            if(revealedText == "") return;

            //Matches the characters "/a" and any numbers after the a
            const regex = /\/a\d+/;
            let matches = revealedText.toString().match(regex);
            if(matches == undefined) return;
            let firstMatch = matches[0];
            if(firstMatch == undefined) return;

            //slice off the /a and just store the ID number
            let assetId = firstMatch.slice(2);

            //if this decoration is not in the list, return
            if(avatarDecorations[assetId] == undefined) return;

            //if this user does not have an avatar decoration, or the avatar decoration data does not match the one in the avatar decorations array,
            if(ret.avatarDecorationData == undefined || ret.avatarDecorationData?.asset != avatarDecorations[assetId]){
                //set avatar decoration data to fake avatar decoration
                ret.avatarDecorationData = {
                    asset: avatarDecorations[assetId],
                    sku_id: "0" //dummy sku id
                };

                //add user to the list of users to show with the YABDP4Nitro user badge if we haven't already.
                if(!badgeUserIDs.includes(ret.id)) badgeUserIDs.push(ret.id);
            }
        }); //end of getUser patch for avatar decorations

        //subscribe to successful collectible category fetch event
        Dispatcher.subscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);

        //trigger decorations fetch
        FetchCollectibleCategories(
            {
                includeBundles: true,
                includeUnpublished: false,
                noCache: false,
                paymentGateway: undefined
            }
        );

        //Wait for avatar decor customization section render module to be loaded.
        await Webpack.waitForModule(Webpack.Filters.byStrings("userAvatarDecoration"));

        //Avatar decoration customization section render module/function.
        if(!this.decorationCustomizationSectionMod) this.decorationCustomizationSectionMod = Webpack.getByStrings("userAvatarDecoration", { defaultExport: false });

        //Avatar decoration customization section patch
        Patcher.after(this.meta.name, this.decorationCustomizationSectionMod, "Z", (_, [args], ret) => {
            //don't run if this is the try out nitro flow.
            if(args.isTryItOutFlow) return;

            //push change decoration button
            ret.props.children[0].props.children.push(
                React.createElement("button", {
                    id: "decorationButton",
                    children: "Change Decoration [YABDP4Nitro]",
                    style: {
                        width: "100px",
                        height: "50px",
                        color: "white",
                        borderRadius: "3px",
                        marginLeft: "5px",
                    },
                    className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                    onClick: () => {
                        UI.showConfirmationModal("Change Avatar Decoration (YABDP4Nitro)", React.createElement(DecorModal));
                    }
                })
            );


            let listOfDecorationIds = Object.keys(Data.load(this.meta.name, "settings").avatarDecorations);
            let avatarDecorationChildren = [];

            //for each avatar decoration
            for(let i = 0; i < listOfDecorationIds.length; i++){

                //text to encode to 3y3
                let encodedText = this.secondsightifyEncodeOnly("/a" + listOfDecorationIds[i]); // /a[id]
                //javascript that runs onclick for each avatar decoration button
                let copyDecoration3y3 = function(){
                    const clipboardTextElem = document.createElement("textarea");
                    clipboardTextElem.style.position = "fixed";
                    clipboardTextElem.value = ` ${encodedText}`;
                    document.body.appendChild(clipboardTextElem);
                    clipboardTextElem.select();
                    clipboardTextElem.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    BdApi.UI.showToast("3y3 copied to clipboard!", { type: "info" });
                    document.body.removeChild(clipboardTextElem);
                };
                let child = React.createElement("img", {
                    style: {
                        width: "23%",
                        cursor: "pointer",
                        marginLeft: "5px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                        backgroundColor: "var(--background-tertiary)"
                    },
                    onClick: copyDecoration3y3,
                    src: "https://cdn.discordapp.com/avatar-decoration-presets/" + settings.avatarDecorations[listOfDecorationIds[i]] + ".png?size=64"
                });
                avatarDecorationChildren.push(child);

                //add newline every 4th decoration
                if((i + 1) % 4 == 0){
                    //avatarDecorationsHTML += "<br>"
                    avatarDecorationChildren.push(React.createElement("br"));
                }
            }

            function DecorModal(){
                return React.createElement("div", {
                    style: {
                        width: "100%",
                        display: "block",
                        color: "white",
                        whiteSpace: "nowrap",
                        overflow: "visible",
                        marginTop: ".5em"
                    },
                    children: avatarDecorationChildren
                });
            }

        }); //end patch of profile decoration section renderer function

    } //End of fakeAvatarDecorations()
    // #endregion

    //#region Emote Uploader
    async UploadEmote(url, channelIdLmao, msg, emoji, runs){
        if(emoji === undefined){
            let emoji;
        }

        if(msg === undefined){
            let msg;
        }

        let extension = ".gif";
        if(!emoji.animated){
            extension = ".png";
            if(!settings.PNGemote){
                extension = ".webp";
            }
        }

        //Download emote by URL, convert to blob, then convert to File object
        let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], (emoji.name + extension)));
        file.platform = 1; // Not exactly sure what this does, but it should be set to 1.
        file.spoiler = false; //not marked as spoiler.

        //Start file upload
        let fileUp = new CloudUploader({ file: file, isClip: false, isThumbnail: false, platform: 1 }, channelIdLmao, false, 0);
        fileUp.isImage = true;

        //Options for the upload
        let uploadOptions = new Object();
        uploadOptions.channelId = channelIdLmao; //Upload to current channel
        uploadOptions.uploads = [fileUp]; //The file from before
        uploadOptions.draftType = 0; // Not sure what this does.
        uploadOptions.options = {
            stickerIds: [] //No stickers in the message
        };
        //Message attached to the upload.
        uploadOptions.parsedMessage = { channelId: channelIdLmao, content: msg[1].content, tts: false, invalidEmojis: [] };

        //if this is not the first emoji uploaded
        if(runs > 1){
            //make the message attached to the upload have no text
            uploadOptions.parsedMessage = { channelId: channelIdLmao, content: "", tts: false, invalidEmojis: [] };
        }

        try {
            await Uploader.uploadFiles(uploadOptions); //finally finish the process of uploading
        } catch(err){
            Logger.error(this.meta.name, err);
        }
    }
    // #endregion

    //#region Soundmoji Uploader
    async UploadSoundmojis(ids, channelId, msg, sounds){

        if(ids != undefined && channelId != undefined && msg != undefined){
            let files = [];
            for(let i = 0; i < ids.length; i++){
                let file = await fetch("https://cdn.discordapp.com/soundboard-sounds/" + ids[i])
                    .then(res => res.blob())
                    .then(blobFile => new File([blobFile], `${sounds[i].name}.mp3`));
                file.platform = 1;
                file.spoiler = false;
                let fileUp = new CloudUploader({ file: file, isClip: false, isThumbnail: false, platform: 1 }, channelId, false, 0);
                files.push(fileUp);
                fileUp.isAudio = true;
            }
            let uploadOptions = new Object();
            uploadOptions.channelId = channelId;
            uploadOptions.draftType = 0;
            uploadOptions.options = {
                stickerIds: []
            };
            if(files.length <= 10){
                uploadOptions.uploads = files;
                uploadOptions.parsedMessage = { channelId, content: msg.content, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] };
                try {
                    await Uploader.uploadFiles(uploadOptions); //finally finish the process of uploading
                } catch(err){
                    Logger.error(this.meta.name, err);
                }
            }else{
				//Upload 10 files at a time with a delay
                let firstTime = true;
                while (files.length){
                    let tenFiles = files.splice(0, 10);
                    uploadOptions.uploads = tenFiles;
                    if(firstTime)
                        uploadOptions.parsedMessage = { channelId, content: msg.content, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] };
                    else
                        uploadOptions.parsedMessage = { channelId, content: "", tts: false, invalidEmojis: [], validNonShortcutEmojis: [] };
                    try {
                        await Uploader.uploadFiles(uploadOptions); //finally finish the process of uploading
                    } catch(err){
                        Logger.error(this.meta.name, err);
                    }
                    firstTime = false;
                    await new Promise(r => setTimeout(r, 3000));
                }
            }
        }
    }
    // #endregion


    customVideoSettings(){
        //If you're trying to figure this shit out yourself, I recommend uncommenting the line below.
        //console.log(StreamButtons);

        //Nice try, Discord.
        Patcher.instead(this.meta.name, StreamButtons, "getApplicationFramerate", (_, [args]) => {
            return args;
        });
        Patcher.instead(this.meta.name, StreamButtons, "getApplicationResolution", (_, [args]) => {
            return args;
        });

        this.unlockAndCustomizeStreamButtons();


    } //End of customVideoSettings()

    // #region Emoji Bypass-related

    //Whether we should skip the emoji bypass for a given emoji.
    // true = skip bypass
    // false = perform bypass
    emojiBypassForValidEmoji(emoji, currentChannelId){
        if(settings.emojiBypassForValidEmoji){
            if((SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId && !emoji.animated
                && (ChannelStore.getChannel(currentChannelId.toString()).type <= 0 || ChannelStore.getChannel(currentChannelId.toString()).type == 11) && emoji.available)
                //If emoji is from current guild, not animated, and we are actually in a guild channel,
                //and emoji is "available" (could be unavailable due to Server Boost level dropping), cancel emoji bypass

                || emoji.managed){
                // OR if emoji is "managed" (emoji.managed = whether the emoji is managed by a Twitch integration)
                return true;
            }
        }
        return false;
    }

    _sendMessageInsteadPatch(){
        this.experiments();
        this.overrideExperiment("2024-11_soundmoji_sending", 2);

        //#region _sendMessage Patch
        Patcher.instead(this.meta.name, MessageActions, "_sendMessage", async (_, msg, send) => {
            if(msg[2].poll != undefined || msg[2].activityAction != undefined || msg[2].messageReference) { //fix polls, activity actions, forwarding
                send(msg[0], msg[1], msg[2], msg[3]);
                return;
            }

            const currentChannelId = msg[0];
            let emojis = [];
            let emojiUrls = [];
            //#region Upload Emojis
            if(settings.emojiBypass && settings.emojiBypassType == 0){
                //SimpleDiscordCrypt compat
                let SDCEnabled = false;
                if(document.getElementsByClassName("sdc-tooltip").length > 0) {
                    let SDC_Tooltip = document.getElementsByClassName("sdc-tooltip")[0];
                    if(SDC_Tooltip.innerHTML == "Disable Encryption") {
                        //SDC Encryption Enabled
                        SDCEnabled = true;
                    }
                }    

                if(!SDCEnabled){
                    msg[1].validNonShortcutEmojis.forEach(async emoji => {
                        if(this.emojiBypassForValidEmoji(emoji, currentChannelId)) return; //Unlocked emoji. Skip.
                        if(emoji.type == "UNICODE") return; //If this "emoji" is actually a unicode character, it doesn't count. Skip bypassing if so.
                        if(emoji.guildId === undefined || emoji.id === undefined || emoji.useSpriteSheet) return; //Skip system emoji.
                        if(settings.PNGemote) {
                            emoji.forcePNG = true; //replace WEBP with PNG if the option is enabled.
                        }
                        let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                        if(emoji.animated) {
                            emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                        }
    
                        //If there is a backslash (\) before the emote we are processing,
                        if(msg[1].content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")) {
                            //remove the backslash
                            msg[1].content = msg[1].content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
                            //and skip bypass for that emote
                            return;
                        }
    
                        //remove existing URL parameters and add custom URL parameters for user's size preference. quality is always lossless.
                        emojiUrl = emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless&`;
                        //remove emote from message.
                        msg[1].content = msg[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "");
    
                        //queue for upload
                        emojis.push(emoji);
                        emojiUrls.push(emojiUrl);
                    });
                }
            }
            //#endregion
            
            //#region Upload Soundmojis
            const channelId = msg[0];
            let regex = /<sound:[0-9]\d+:[0-9]\d+>/g;
            let ids = [];
            let sounds = [];
            if(settings.soundmojiEnabled){
                let soundmojis = msg[1].content.match(regex);
                if(soundmojis) {
                    for(let i = 0; i < soundmojis.length; i++) {
                        let id = soundmojis[i].slice(-20, -1);
                        let sound = getSoundMod.getSoundById(id);
                        if(sound) {
                            sounds.push(sound);
                            ids.push(id);
                            if(sound?.emojiId == null && sound?.emojiName != null) { //default / system emoji
                                msg[1].content = msg[1].content.replace(soundmojis[i], `( ${sound.emojiName} ${sound.name} )`);
                            }
                            else if(sound?.emojiId != null) { // custom emoji
                                let emoji = emojiMod.getCustomEmojiById(sound.emojiId);
                                msg[1].content = msg[1].content.replace(soundmojis[i], `( [${emoji?.name ? emoji.name : "someCustomEmoji"}](https://cdn.discordapp.com/emojis/${sound.emojiId}.${emoji?.animated ? "gif" : "png"}) ${sound.name} ) `);
                            }
                            else { //no emoji
                                msg[1].content = msg[1].content.replace(soundmojis[i], `( ${sound.name} ) `);
                            }
                        } else continue;
                    }
                }
            }
            if(settings.emojiBypass && settings.emojiBypassType == 0){
                if(emojis.length > 0){
                    //upload all emotes
                    for(let i = 0; i < emojis.length; i++){
                        await this.UploadEmote(emojiUrls[i], currentChannelId, msg, emojis[i], i)
                    }
                    //reset message content since we dont want a repeated message if soundmoji upload happens next
                    msg[1].content = "";
                }
            }
            
            if(settings.soundmojiEnabled){
                if(sounds.length > 0)
                    await this.UploadSoundmojis(ids, channelId, msg[1], sounds);
            }

            if(emojis.length == 0 && sounds.length == 0){
                send(msg[0], msg[1], msg[2], msg[3]);
            }
            
        });
    }

    emojiBypass(){

        Patcher.instead(this.meta.name, isEmojiAvailableMod, "isEmojiFilteredOrLocked", () => {
            return false;
        });
        Patcher.instead(this.meta.name, isEmojiAvailableMod, "isEmojiDisabled", () => {
            return false;
        });
        Patcher.instead(this.meta.name, isEmojiAvailableMod, "isEmojiFiltered", () => {
            return false;
        });
        Patcher.instead(this.meta.name, isEmojiAvailableMod, "isEmojiPremiumLocked", () => {
            return false;
        });
        Patcher.instead(this.meta.name, isEmojiAvailableMod, "getEmojiUnavailableReason", () => {
            return;
        });

        if(settings.emojiBypassType == 0){

            //#region uploadFiles Upload
            Patcher.instead(this.meta.name, Uploader, "uploadFiles", (_, [args], originalFunction) => {

                if(document.getElementsByClassName("sdc-tooltip").length > 0){
                    let SDC_Tooltip = document.getElementsByClassName("sdc-tooltip")[0];
                    if(SDC_Tooltip.innerHTML == "Disable Encryption"){
                        //SDC Encryption Enabled
                        originalFunction(args);
                        return;
                    }
                }
                const currentChannelId = args.channelId;
                let emojis = [];
                let runs = 0;

                if(args.parsedMessage.validNonShortcutEmojis != undefined){
                    if(args.parsedMessage.validNonShortcutEmojis.length > 0){
                        args.parsedMessage.validNonShortcutEmojis.forEach(emoji => {
                            if(this.emojiBypassForValidEmoji(emoji, currentChannelId)) return; //Unlocked emoji. Skip.
                            if(emoji.type == "UNICODE") return; //If this "emoji" is actually a unicode character, it doesn't count. Skip bypassing if so.
                            if(settings.PNGemote){
                                emoji.forcePNG = true; //replace WEBP with PNG if the option is enabled.
                            }

                            let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                            if(emoji.guildId === undefined || emoji.id === undefined || emoji.useSpriteSheet) return; //Skip system emoji.
                            if(emoji.animated){
                                emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                            }

                            //If there is a backslash (\) before the emote we are processing,
                            if(args.parsedMessage.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
                                //remove the backslash
                                args.parsedMessage.content = args.parsedMessage.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
                                //and skip bypass for that emote
                                return;
                            }

                            //add to list of emojis
                            emojis.push(emoji);

                            //remove emote from message.
                            args.parsedMessage.content = args.parsedMessage.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "");
                        });

                        //send file with text and shit
                        originalFunction(args);

                        //loop through emotes to send one at a time. this has technically no delay so it may trigger anti-spam.
                        for(let i = 0; i < emojis.length; i++){
                            let emoji = emojis[i];
                            let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                            if(emoji.animated){
                                emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                            }

                            //remove existing URL parameters and add custom URL parameters for user's size preference. quality is always lossless.
                            emojiUrl = emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless&`;

                            this.UploadEmote(emojiUrl, currentChannelId, [currentChannelId, { content: "", tts: false, invalidEmojis: [] }], emoji, 1);
                        }

                    }else{
                        originalFunction(args);
                    }
                }else{
                    originalFunction(args);
                }

            });
            //#endregion
        }

        //#region Ghost Mode Patch
        //Ghost mode method
        const ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ ";

        if(settings.emojiBypassType == 1){

            function ghostModeMethod(msg, currentChannelId, self){
                if(document.getElementsByClassName("sdc-tooltip").length > 0){
                    let SDC_Tooltip = document.getElementsByClassName("sdc-tooltip")[0];
                    if(SDC_Tooltip.innerHTML == "Disable Encryption"){
                        //SDC Encryption Enabled
                        return;
                    }
                }
                let emojiGhostIteration = 0; // dummy value we add to the end of the URL parameters to make the same emoji appear more than once despite having the same URL.
                msg.validNonShortcutEmojis.forEach(emoji => {
                    if(self.emojiBypassForValidEmoji(emoji, currentChannelId)) return;
                    if(emoji.type == "UNICODE") return;
                    if(settings.PNGemote) emoji.forcePNG = true;

                    let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                    if(emoji.guildId === undefined || emoji.id === undefined || emoji.useSpriteSheet) return; //Skip system emoji.
                    if(emoji.animated){
                        emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                    }

                    if(msg.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
                        msg.content = msg.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
                        return; //If there is a backslash before the emoji, skip it.
                    }

                    //if ghost mode is not required
                    if(msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "") == ""){
                        msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless& `);
                        return;
                    }
                    emojiGhostIteration++; //increment dummy value

                    //if message already has ghostmodetext.
                    if(msg.content.includes(ghostmodetext)){
                        //remove processed emoji from the message
                        msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""),
                            //add to the end of the message
                            msg.content += " " + emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless&${emojiGhostIteration}& `;
                        return;
                    }
                    //if message doesn't already have ghostmodetext, remove processed emoji and add it to the end of the message with the ghost mode text
                    msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += ghostmodetext + "\n" + emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless& `;
                });
            }

            //sending message in ghost mode
            Patcher.before(this.meta.name, MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
                ghostModeMethod(msg, currentChannelId, this);
            });

            //uploading file with emoji in the message in ghost mode.
            Patcher.before(this.meta.name, Uploader, "uploadFiles", (_, [args], originalFunction) => {
                const currentChannelId = args.channelId;
                const msg = args.parsedMessage;
                ghostModeMethod(msg, currentChannelId, this);
            });

        }
        //#endregion

        //#region Classic Mode Patch
        //Original method
        if(settings.emojiBypassType == 2){

            function classicModeMethod(msg, currentChannelId, self){
                if(document.getElementsByClassName("sdc-tooltip").length > 0){
                    let SDC_Tooltip = document.getElementsByClassName("sdc-tooltip")[0];
                    if(SDC_Tooltip.innerHTML == "Disable Encryption"){
                        //SDC Encryption Enabled
                        return;
                    }
                }
                //refer to previous bypasses for comments on what this all is for.
                let emojiGhostIteration = 0;
                msg.validNonShortcutEmojis.forEach(emoji => {
                    if(self.emojiBypassForValidEmoji(emoji, currentChannelId)) return;
                    if(emoji.type == "UNICODE") return;
                    if(settings.PNGemote) emoji.forcePNG = true;

                    let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                    if(emoji.guildId === undefined || emoji.id === undefined || emoji.useSpriteSheet) return; //Skip system emoji.
                    if(emoji.animated){
                        emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                    }

                    if(msg.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
                        msg.content = msg.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
                        return; //If there is a backslash before the emoji, skip it.
                    }
                    emojiGhostIteration++;
                    msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless&${emojiGhostIteration}& `);
                });
            }

            //sending message in classic mode
            Patcher.before(this.meta.name, MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
                classicModeMethod(msg, currentChannelId, this);
            });

            //uploading file with emoji in the message in classic mode.
            Patcher.before(this.meta.name, Uploader, "uploadFiles", (_, [args], originalFunction) => {
                const msg = args.parsedMessage;
                const currentChannelId = args.channelId;
                classicModeMethod(msg, currentChannelId, this);
            });

            //editing message in classic mode
            Patcher.before(this.meta.name, MessageActions, "editMessage", (_, obj) => {
                let msg = obj[2].content;
                if(msg.search(/\d{18}/g) == -1) return;
                if(msg.includes(":ENC:")) return; //Fix jank with editing SimpleDiscordCrypt encrypted messages.
                msg.match(/<a:.+?:\d{18}>|<:.+?:\d{18}>/g).forEach(idfkAnymore => {
                    obj[2].content = obj[2].content.replace(idfkAnymore, `https://cdn.discordapp.com/emojis/${idfkAnymore.match(/\d{18}/g)[0]}?size=${settings.emojiSize}&quality=lossless&`);
                });
            });
        }
        //#endregion


        //#region Vencord-like Patch
        //Vencord-like bypass
        if(settings.emojiBypassType == 3){
            function vencordModeMethod(msg, currentChannelId, self){
                if(document.getElementsByClassName("sdc-tooltip").length > 0){
                    let SDC_Tooltip = document.getElementsByClassName("sdc-tooltip")[0];
                    if(SDC_Tooltip.innerHTML == "Disable Encryption"){
                        //SDC Encryption Enabled
                        return;
                    }
                }
                //refer to previous bypasses for comments on what this all is for.
                let emojiGhostIteration = 0;
                msg.validNonShortcutEmojis.forEach(emoji => {
                    if(self.emojiBypassForValidEmoji(emoji, currentChannelId)) return;
                    if(emoji.type == "UNICODE") return;
                    if(settings.PNGemote) emoji.forcePNG = true;

                    let emojiUrl = AvatarDefaults.getEmojiURL(emoji);
                    if(emoji.guildId === undefined || emoji.id === undefined || emoji.useSpriteSheet) return; //Skip system emoji.
                    if(emoji.animated){
                        emojiUrl = emojiUrl.substr(0, emojiUrl.lastIndexOf(".")) + ".gif";
                    }

                    if(msg.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
                        msg.content = msg.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
                        return; //If there is a backslash before the emoji, skip it.
                    }
                    emojiGhostIteration++;
                    msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, `[${emoji.name}](` + emojiUrl.split("?")[0] + `?size=${settings.emojiSize}&quality=lossless&${emojiGhostIteration}&)`);
                });
            }

            //sending message in vencord-like mode
            Patcher.before(this.meta.name, MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
                vencordModeMethod(msg, currentChannelId, this);
            });

            //uploading file with emoji in the message in vencord-like mode.
            Patcher.before(this.meta.name, Uploader, "uploadFiles", (_, [args], originalFunction) => {
                const msg = args.parsedMessage;
                const currentChannelId = args.channelId;
                vencordModeMethod(msg, currentChannelId, this);
            });
        }
        //#endregion
    } //End of emojiBypass()

    //#region Fake Inline Emoji
    inlineFakemojiPatch(){
        //Somehow, this is the first time I've had to actually patch message rendering. (and it shows!)
        Patcher.before(this.meta.name, messageRender.renderMessage, "type", (_, [args]) => {
            for(let i = 0; i < args.content.length; i++){
                let contentItem = args.content[i];

                if(contentItem.type.type?.toString().includes("MASKED_LINK")){ //is it a hyperlink?

                    if(contentItem.props.href.startsWith("https://cdn.discordapp.com/emojis/")){ //does this hyperlink have an emoji URL?

                        let emojiName = contentItem.props?.children[0]?.props?.children;
                        if(emojiName == undefined) continue;

                        let key = contentItem.key; //store key

                        //create discord emoji react element
                        let emoteElement = React.createElement(MessageEmojiReact, {
                            node: {
                                name: `:${emojiName}:`,
                                src: contentItem.props.href.split("?")[0] + "?size=48",
                                type: "emoji",
                                emojiId: contentItem.props.href.replace("https://cdn.discordapp.com/emojis/", "").split(".")[0],
                                animated: true,
                                jumboable: false //makes the emoji large or small. "jumboable" is a stupid ass name, Discord. 
                            },
                            channelId: args.message.channel_id,
                            messageId: args.message.id,
                            enableClick: true //I'm curious in what circumstance this value becomes false. Does what it says on the tin; enables or disables the emoji click menu.
                        });

                        //restore key
                        emoteElement.key = key;
                        //replace this content item with our fake emoji
                        args.content[i] = emoteElement;
                    }
                }
            }
        });

        //who knows what unholy compatibility issues this will bring me
        //this code fucking sucks i think
        Patcher.instead(this.meta.name, renderEmbedsMod, "renderEmbeds", (_, [message], originalFunction) => {
            //get what the original function would have returned
            let ret = originalFunction(message);
            if(ret){
                if(ret.length > 0){
                    for(let i = 0; i < ret.length; i++){
                        if(ret[i]){
                            if(ret[i].props?.children?.props?.embed?.image?.url){
                                let url = ret[i].props.children.props.embed.image.url;
                                let isEmojiHyperlink = false;

                                //this embed is an emoji
                                if(url.startsWith("https://cdn.discordapp.com/emojis/")){

                                    /* Is embed from a hyperlink? It can't tell if it's from a hyperlink *this time*, unfortunately, 
                                     * so if someone has an emoji URL and a hyperlink with that same URL in the same message, it won't render correctly (or at least not how you might expect)!
                                     * Let's just hope nobody notices that..! I didn't have this system initially cause I'm a dumbfuck and didn't think it over.
                                    */
                                    if(message.content.includes(`](${url})`)){
                                        isEmojiHyperlink = true;
                                    }

                                    //if currently processed embed is an emoji and a hyperlink
                                    if(isEmojiHyperlink){
                                        if(ret.length == 1){ //if there is only 1 fakemoji

                                            //removes first instance of pattern [anyemojiname](https://cdn.discordapp.com/emojis/anynumber.ext) then checks if there is anything else in the message
                                            if(message.content.replace(/\[.*?\]\(https:\/\/cdn\.discordapp\.com\/emojis\/\d+\.(png|webp|gif).*?\)/, "") //is regex necessary? probably.
                                                .trim().length > 0){ //if there is other stuff in the message, delete the embed
                                                delete ret[i];
                                            }
                                            //if there is 1 fakemoji and nothing else in the message, it will keep the regular embed (default behavior)
                                            //for some reason, if the fakemoji is in a message alone, it disappears, so keeping the embed was the easiest solution
                                        }

                                        //if there is more than 1 hyperlink
                                        else{
                                            delete ret[i]; //if the hyperlink is an emoji url, delete the embed
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //removes empty items from the array. def did not take from stackoverflow (trust)
                ret = ret.filter(n => n);

                return ret;
            }else{ //if the original function returns undefined/null
                //this should never happen, but in case it does, return an empty array
                return [];
            }
        });
        //#endregion
    }
    //#endregion

    //#region Streaming Unlock
    unlockAndCustomizeStreamButtons(){ //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
        const settings = Data.load("YABDP4Nitro", "settings"); //just in case we can't access "this";

        //If custom resolution tick is disabled or custom resolution is set to 0, set it to 1440
        let resolutionToSet = parseInt(settings.CustomResolution);
        if(!settings.ResolutionEnabled || settings.CustomResolution == 0)
            resolutionToSet = 1440;

        //Some of these properties are marked as read only, but they still allow you to delete them
        //So any time you see "delete", what we're doing is bypassing the read-only lock by deleting it and remaking it.

        //Set resolution buttons and requirements

        delete ApplicationStreamResolutions.RESOLUTION_1440;
        //Change 1440p resolution internally to custom resolution
        ApplicationStreamResolutions.RESOLUTION_1440 = resolutionToSet;

        //********************************** Requirements below this point*************************************
        ApplicationStreamSettingRequirements[4].resolution = resolutionToSet;
        ApplicationStreamSettingRequirements[5].resolution = resolutionToSet;
        ApplicationStreamSettingRequirements[6].resolution = resolutionToSet;


        //************************************Buttons below this point*****************************************
        //Set resolution button value to custom resolution
        ApplicationStreamResolutionButtons[2].value = resolutionToSet;
        delete ApplicationStreamResolutionButtons[2].label;
        //Set label of resolution button to custom resolution. This one is used in the popup window that appears before you start streaming.
        ApplicationStreamResolutionButtons[2].label = resolutionToSet.toString();

        //Set value of button with suffix label to custom resolution
        ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = resolutionToSet;
        delete ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
        //Set label of button with suffix label to custom resolution with "p" after it, ex: "1440p"
        //This one is used in the dropdown kind of menu after you've started streaming
        ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = resolutionToSet + "p";

        //Removes stream setting requirements
        function removeQualityParameters(x){
            try {
                delete x.quality;
            } catch(err){}
            try {
                delete x.guildPremiumTier;
            } catch(err){}
        }

        /*Remove each of the stream setting requirements 
        which normally tell the client what premiumType / guildPremiumTier you need to access that resolution.
        Removing the setting requirements makes it default to thinking that every premiumType can use it.*/
        ApplicationStreamSettingRequirements.forEach(removeQualityParameters);

        function replace60FPSRequirements(x){
            if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = fpsToSet;
        }

        let fpsToSet = parseInt(settings.CustomFPS);
        //If custom FPS toggle is disabled, set to the default 60.
        if(!settings.CustomFPSEnabled)
            fpsToSet = 60;

        //Set FPS buttons and requirements

        //remove FPS nitro requirements
        ApplicationStreamSettingRequirements.forEach(replace60FPSRequirements);
        //set suffix label button value to the custom number
        ApplicationStreamFPSButtonsWithSuffixLabel[2].value = fpsToSet;
        delete ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
        //set button suffix label with the correct number with " FPS" after it. ex: "75 FPS". This one is used in the dropdown kind of menu
        ApplicationStreamFPSButtonsWithSuffixLabel[2].label = fpsToSet + " FPS";
        //set fps button value to the correct number.
        ApplicationStreamFPSButtons[2].value = fpsToSet;
        delete ApplicationStreamFPSButtons[2].label;
        //set fps button label to the correct number. This one is used in the popup window that appears before you start streaming.
        ApplicationStreamFPSButtons[2].label = fpsToSet.toString();
        ApplicationStreamFPS.FPS_60 = fpsToSet;

        Data.save("YABDP4Nitro", "settings", settings);
    } //End of unlockAndCustomizeStreamButtons()
    //#endregion

    //#region Video Quality Patch
    videoQualityModule(){ //Custom Bitrates, FPS, Resolution
        Patcher.before(this.meta.name, videoOptionFunctions, "updateVideoQuality", (e) => {

            if(settings.minBitrate > 0 && settings.CustomBitrateEnabled){
                //Minimum Bitrate
                e.videoQualityManager.options.videoBitrateFloor = (settings.minBitrate * 1000);
                e.videoQualityManager.options.videoBitrate.min = (settings.minBitrate * 1000);
                e.videoQualityManager.options.desktopBitrate.min = (settings.minBitrate * 1000);
            }else{
                e.videoQualityManager.options.videoBitrateFloor = 150000;
                e.videoQualityManager.options.videoBitrate.min = 150000;
                e.videoQualityManager.options.desktopBitrate.min = 150000;
            }

            if(settings.maxBitrate > 0 && settings.CustomBitrateEnabled){
                //Maximum Bitrate
                e.videoQualityManager.options.videoBitrate.max = (settings.maxBitrate * 1000);
                e.videoQualityManager.options.desktopBitrate.max = (settings.maxBitrate * 1000);
            }else{
                //Default max bitrate
                e.videoQualityManager.options.videoBitrate.max = 2500000;
                e.videoQualityManager.options.desktopBitrate.max = 2500000;
            }

            if(settings.targetBitrate > 0 && settings.CustomBitrateEnabled){
                //Target Bitrate
                e.videoQualityManager.options.desktopBitrate.target = (settings.targetBitrate * 1000);
            }else{
                //Default target bitrate
                e.videoQualityManager.options.desktopBitrate.target = 600000;
            }

            if(settings.voiceBitrate != 128 && settings.voiceBitrate != -1){
                //Audio Bitrate
                e.voiceBitrate = settings.voiceBitrate * 1000;

                e.conn.setTransportOptions({
                    encodingVoiceBitRate: e.voiceBitrate
                });
            }

            //Video quality bypasses if Custom FPS is enabled.
            if(settings.CustomFPSEnabled){
                e.videoQualityManager.options.videoBudget.framerate = e.videoStreamParameters[0].maxFrameRate;
                e.videoQualityManager.options.videoCapture.framerate = e.videoStreamParameters[0].maxFrameRate;
            }

            //If screen sharing bypasses are enabled,
            if(settings.screenSharing){
                //Ensure video quality parameters match the stream parameters.
                const videoQuality = new Object({
                    width: e.videoStreamParameters[0].maxResolution.width,
                    height: e.videoStreamParameters[0].maxResolution.height,
                    framerate: e.videoStreamParameters[0].maxFrameRate,
                });

                e.remoteSinkWantsMaxFramerate = e.videoStreamParameters[0].maxFrameRate;

                //janky fix to #218
                if(videoQuality.height <= 0){
                    videoQuality.height = 1440;
                }
                if(videoQuality.width <= 0){
                    videoQuality.width = 2160;
                    if(parseInt(((e.videoStreamParameters[0].maxResolution.height * (16 / 9)) > (2160 * (16 / 9)))))
                        videoQuality.width = parseInt(e.videoStreamParameters[0].maxResolution.height * (16 / 9));
                }

                //Ensure video budget and capture quality parameters match stream parameters
                e.videoQualityManager.options.videoBudget = videoQuality;
                e.videoQualityManager.options.videoCapture = videoQuality;

                //Ladder bypasses
                let pixelBudget = (videoQuality.width * videoQuality.height);
                e.videoQualityManager.ladder.pixelBudget = pixelBudget;
                e.videoQualityManager.ladder.ladder = LadderModule.calculateLadder(pixelBudget);
                e.videoQualityManager.ladder.orderedLadder = LadderModule.calculateOrderedLadder(e.videoQualityManager.ladder.ladder);
            }
        });
    } //End of videoQualityModule()
    //#endregion


    async stickerSending(){
        Patcher.instead(this.meta.name, MessageActions, "sendStickers", (_, args, originalFunction) => {
            let stickerID = args[1][0];
            let stickerURL = "https://media.discordapp.net/stickers/" + stickerID + ".png?size=4096&quality=lossless";
            let currentChannelId = SelectedChannelStore.getChannelId();

            if(settings.uploadStickers){
                let emoji = new Object();
                emoji.animated = false;
                emoji.name = args[0];
                let msg = [undefined, { content: "" }];
                this.UploadEmote(stickerURL, currentChannelId, [undefined, { content: "" }], emoji);
                return;
            }
            if(!settings.uploadStickers){
                let messageContent = { content: stickerURL, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] };
                MessageActions.sendMessage(currentChannelId, messageContent, undefined, {});
            }
        });
    }

    //#region 3y3 Profile Colors
    decodeAndApplyProfileColors(){
        Patcher.after(this.meta.name, userProfileMod, "getUserProfile", (_, args, ret) => {
            if(ret == undefined) return;
            if(ret.bio == null) return;
            const colorString = ret.bio.match(
                /\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u,
            );
            if(colorString == null) return;
            let parsed = [...colorString[0]].map((c) => String.fromCodePoint(c.codePointAt(0) - 0xe0000)).join("");
            let colors = parsed
                .substring(1, parsed.length - 1)
                .split(",")
                .map(x => parseInt(x.replace("#", "0x"), 16));
            ret.themeColors = colors;
            ret.premiumType = 2;
        });
    }

    //Everything that has to do with the GUI and encoding of the fake profile colors 3y3 shit.
    //Replaced DOM manipulation with React patching 4/2/2024
    async encodeProfileColors(){

        //wait for theme color picker module to be loaded
        await Webpack.waitForModule(Webpack.Filters.byKeys("getTryItOutThemeColors"));

        //wait for color picker renderer module to be loaded
        await Webpack.waitForModule(Webpack.Filters.byStrings("__invalid_profileThemesSection"));

        if(this.colorPickerRendererMod == undefined) this.colorPickerRendererMod = Webpack.getByStrings("__invalid_profileThemesSection", {defaultExport:false});

        Patcher.after(this.meta.name, this.colorPickerRendererMod, "Z", (_, args, ret) => {

            ret.props.children.props.children.push( //append copy colors 3y3 button
                React.createElement("button", {
                    id: "copy3y3button",
                    children: "Copy Colors 3y3",
                    className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                    style: {
                        marginLeft: "10px",
                        marginTop: "10px"
                    },
                    onClick: () => {
                        let themeColors = null;
                        try {
                            themeColors = Webpack.getStore("UserSettingsAccountStore").getAllTryItOut().tryItOutThemeColors;
                        } catch(err){
                            Logger.warn(this.meta.name, err);
                        }
                        if(themeColors == null){
                            try {
                                themeColors = Webpack.getStore("UserSettingsAccountStore").getAllPending().pendingThemeColors;
                            } catch(err){
                                Logger.error(this.meta.name, err);
                            }
                        }
                        if(themeColors == undefined){
                            UI.showToast("Nothing has been copied. Is the selected color identical to your current color?", { type: "warning" });
                            return;
                        }
                        const primary = themeColors[0];
                        const accent = themeColors[1];
                        let message = `[#${primary.toString(16).padStart(6, "0")},#${accent.toString(16).padStart(6, "0")}]`;
                        const padding = "";
                        let encoded = Array.from(message)
                            .map(x => x.codePointAt(0))
                            .filter(x => x >= 0x20 && x <= 0x7f)
                            .map(x => String.fromCodePoint(x + 0xe0000))
                            .join("");

                        let encodedStr = ((padding || "") + " " + encoded);

                        //do this stupid shit Chrome makes you do to copy text to the clipboard.
                        const clipboardTextElem = document.createElement("textarea");
                        clipboardTextElem.style.position = 'fixed';
                        clipboardTextElem.value = encodedStr;
                        document.body.appendChild(clipboardTextElem);
                        clipboardTextElem.select();
                        clipboardTextElem.setSelectionRange(0, 99999);
                        document.execCommand('copy');
                        UI.showToast("3y3 copied to clipboard!", { type: "info" });
                        document.body.removeChild(clipboardTextElem);
                    }
                })
            );
        });

    } //End of encodeProfileColors()
    //#endregion

    //#region Banner Decoding
    //Decode 3y3 from profile bio and apply fake banners.
    bannerUrlDecoding(){

        let endpoint, bucket, prefix, data;

        //if userBg integration is enabled, and we havent already downloaded & parsed userBg data,
        if(settings.userBgIntegration && !fetchedUserBg){

            //userBg database url.
            const userBgJsonUrl = "https://usrbg.is-hardly.online/users";

            //download, then store json
            Net.fetch(userBgJsonUrl, { timeout: 100000 }).then(res => res.json().then(res => {
                data = res;
                endpoint = res.endpoint;
                bucket = res.bucket;
                prefix = res.prefix;
                usrBgUsers = Object.keys(res.users);
                //mark db as fetched so we only fetch it once per load of the plugin
                fetchedUserBg = true;
            }));
        }

        //Patch getUserBannerURL function
        Patcher.before(this.meta.name, AvatarDefaults, "getUserBannerURL", (_, args) => {
            args[0].canAnimate = true;
        });

        //Patch getBannerURL function
        Patcher.instead(this.meta.name, getBannerURL, "getBannerURL", (user, [args], ogFunction) => {
            let profile = user._userProfile;

            //Returning ogFunction with the same arguments that were passed to this function will do the vanilla check for a legit banner.
            if(profile == undefined) return ogFunction(args);

            if(settings.userBgIntegration){ //if userBg integration is enabled
                //if we've fetched the userbg database
                if(fetchedUserBg){
                    //if user is in userBg database,
                    if(usrBgUsers.includes(user.userId)){
                        profile.banner = "funky_kong_is_epic"; //set banner id to fake value
                        profile.premiumType = 2; //set this profile to appear with premium rendering
                        return `${endpoint}/${bucket}/${prefix}${user.userId}?${data.users[user.userId]}`; //return userBg banner URL and exit.
                    }
                }

            }

            //do original function if we don't have the user's bio
            if(profile.bio == undefined) return ogFunction(args);

            //reveal 3y3 encoded text, store as parsed
            let parsed = this.secondsightifyRevealOnly(profile.bio);
            //if there is no 3y3 encoded text, return original function
            if(parsed == undefined) return ogFunction(args);

            //This regex matches /B{*} . Do not touch unless you know what you are doing.
            let regex = /B\{[^}]*?\}/;

            //find banner url in parsed bio
            let matches = parsed.toString().match(regex);

            //if there's no matches, return original function
            if(matches == undefined) return ogFunction(args);
            if(matches == "") return ogFunction(args);

            //if there is matched text, grab the first match, replace the starting "B{" and ending "}" to get the clean filename
            let matchedText = matches[0].replace("B{", "").replace("}", "");

            //Checking for file extension. 
            if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
                matchedText += ".gif"; //Fallback to a default file extension if one is not found.

            }

            //set banner id to fake value
            profile.banner = "funky_kong_is_epic";

            //set this profile to appear with premium rendering
            profile.premiumType = 2;

            //add this user to the list of users that show with the YABDP4Nitro user badge if we haven't aleady.
            if(!badgeUserIDs.includes(user.userId)) badgeUserIDs.push(user.userId);

            //return final banner URL.
            return `https://i.imgur.com/${matchedText}`;

        }); //End of patch for getBannerURL
    } //End of bannerUrlDecoding()
    //#endregion

    //#region Banner Encoding
    //Make buttons in profile customization settings, encode imgur URLs and copy to clipboard
    //Documented/commented and partially rewritten to use React patching on 3/6/2024
    async bannerUrlEncoding(secondsightifyEncodeOnly){

        //wait for banner customization renderer module to be loaded
        await Webpack.waitForModule(Webpack.Filters.byStrings("showRemoveBannerButton", "isTryItOutFlow", "buttonsContainer"));
        if(this.profileBannerSectionRenderer == undefined) this.profileBannerSectionRenderer = Webpack.getByStrings("showRemoveBannerButton", "isTryItOutFlow", "buttonsContainer", {defaultExport:false});

        Patcher.after(this.meta.name, this.profileBannerSectionRenderer, "Z", (_, args, ret) => {
            //create and append profileBannerUrlInput input element.
            let profileBannerUrlInput = React.createElement("input", {
                id: "profileBannerUrlInput",
                placeholder: "Imgur URL for Banner",
                style: {
                    float: "right",
                    width: "30%",
                    height: "20%",
                    maxHeight: "50%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "10px"
                }
            });
            ret.props.children.props.children.push(profileBannerUrlInput);

            ret.props.children.props.children.push( //append Copy 3y3 button
                //create react element

                React.createElement("button", {
                    id: "profileBannerButton",
                    children: "Copy Banner 3y3",
                    className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                    size: "bd-button-small",
                    style: {
                        whiteSpace: "nowrap",
                        marginLeft: "10px"
                    },
                    onClick: async function(){ //Upon clicking Copy 3y3 button

                        //grab text from banner URL input textarea 
                        let profileBannerUrlInputValue = String(document.getElementById("profileBannerUrlInput").value);

                        //if it's empty, stop processing.
                        if(profileBannerUrlInputValue == "") return;
                        if(profileBannerUrlInputValue == undefined) return;

                        //clean up string to encode
                        let stringToEncode = "" + profileBannerUrlInputValue
                            .replace("http://", "") //get rid of protocol
                            .replace("https://", "")
                            .replace(".jpg", "")
                            .replace(".png", "")
                            .replace(".mp4", "")
                            .replace("webm", "")
                            .replace("i.imgur.com", "imgur.com"); //change i.imgur.com to imgur.com


                        let encodedStr = ""; //initialize encoded string as empty string

                        stringToEncode = String(stringToEncode); //make doubly sure stringToEncode is a string

                        //if url seems correct
                        if(stringToEncode.toLowerCase().startsWith("imgur.com")){

                            //Check for album or gallery URL
                            if(stringToEncode.replace("imgur.com/", "").startsWith("a/") || stringToEncode.replace("imgur.com/", "").startsWith("gallery/")){

                                //Album URL, what follows is all to get the direct image link, since the album URL is not a direct link to the file.

                                //Fetch imgur album page
                                try {
                                    const parser = new DOMParser();
                                    stringToEncode = await Net.fetch(("https://" + stringToEncode), {
                                        method: "GET",
                                        mode: "cors"
                                    }).then(res => res.text()
                                        //parse html, queryselect meta tag with certain name
                                        .then(res => parser.parseFromString(res, "text/html").querySelector('[name="twitter:player"]').content));
                                    stringToEncode = stringToEncode.replace("http://", "") //get rid of protocol
                                        .replace("https://", "") //get rid of protocol
                                        .replace("i.imgur.com", "imgur.com")
                                        .replace(".jpg", "").replace(".jpeg", "").replace(".webp", "").replace(".png", "").replace(".mp4", "").replace(".webm", "").replace(".gifv", "").replace(".gif", "") //get rid of any file extension
                                        .split("?")[0]; //remove any URL parameters since we don't want or need them
                                } catch(err){
                                    Logger.error(this.meta.name, err);
                                    BdApi.UI.showToast("An error occurred. Are there multiple images in this album/gallery?", { type: "error" });
                                    return;
                                }
                            }
                            if(stringToEncode == ""){
                                BdApi.UI.showToast("An error occurred: couldn't find file name.", { type: "error" });
                                Logger.error(this.meta.name, "Couldn't find file name for some reason. Contact Riolubruh.");
                            }
                            //add starting "B{" , remove "imgur.com/" , and add ending "}"
                            stringToEncode = "B{" + stringToEncode.replace("imgur.com/", "") + "}";
                            //finally encode the string, adding a space before it so nothing fucks up
                            encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
                            //let the user know what has happened
                            UI.showToast("3y3 copied to clipboard!", { type: "info" });

                            //If this is not an Imgur URL, yell at the user.
                        }else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
                            UI.showToast("Please use Imgur!", { type: "warning" });
                            return;
                        }

                        //if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
                        if(encodedStr == "") return;

                        //Do this stupid shit that Chrome forces you to do to copy text to the clipboard.
                        const clipboardTextElem = document.createElement("textarea"); //create a textarea
                        clipboardTextElem.style.position = 'fixed'; //this is so that the rest of the document doesn't try to format itself to fit a textarea in it
                        clipboardTextElem.value = encodedStr; //add the encoded string to the textarea
                        document.body.appendChild(clipboardTextElem); //add the textarea to the document
                        clipboardTextElem.select(); //focus the textarea?
                        clipboardTextElem.setSelectionRange(0, 99999); //select all of the text in the textarea
                        document.execCommand('copy'); //finally send the copy command
                        document.body.removeChild(clipboardTextElem); //get rid of the evidence

                    } //end of onClick function
                }) //end of react createElement
            ); //end of profileBannerButton element push

        }); //end of patched function

    } //End of bannerUrlEncoding()
    //#endregion

    //#region App Icons
    appIcons(){
        //technically don't need this anymore but i'll leave it in for the sake of redundancy
        Patcher.before(this.meta.name, appIconButtonsModule, "Z", (_, args) => {
            args[0].disabled = false; //force buttons clickable
        });

        Patcher.instead(this.meta.name, AppIcon, "Z", (_, __, originalFunction) => {
            const currentDesktopIcon = CurrentDesktopIcon.getCurrentDesktopIcon();
            if(currentDesktopIcon == "AppIcon"){
                return React.createElement(RegularAppIcon, {
                    size: "custom",
                    color: "currentColor",
                    width: 30,
                    height: 30
                });
            }else{
                return React.createElement(CustomAppIcon, {
                    id: currentDesktopIcon,
                    width: 48
                });
            } 
        });
    }
    //#endregion

    //#region Meta and Updates
    parseMeta(fileContent){
        //zlibrary code
        const splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
        const escapedAtRegex = /^\\@/;
        const block = fileContent.split("/**", 2)[1].split("*/", 1)[0];
        const out = {};
        let field = "";
        let accum = "";
        for(const line of block.split(splitRegex)){
            if(line.length === 0) continue;
            if(line.charAt(0) === "@" && line.charAt(1) !== " "){
                out[field] = accum;
                const l = line.indexOf(" ");
                field = line.substring(1, l);
                accum = line.substring(l + 1);
            }
            else{
                accum += " " + line.replace("\\n", "\n").replace(escapedAtRegex, "@");
            }
        }
        out[field] = accum.trim();
        delete out[""];
        out.format = "jsdoc";
        return out;
    }

    async checkForUpdate(){
        try {
            let fileContent = await (await fetch(this.meta.updateUrl)).text();
            let remoteMeta = this.parseMeta(fileContent);
            let remoteVersion = remoteMeta.version.trim().split('.');
            let currentVersion = this.meta.version.trim().split('.');

            if(parseInt(remoteVersion[0]) > parseInt(currentVersion[0])){
                this.newUpdateNotify(remoteMeta, fileContent);
            }else if(remoteVersion[0] == currentVersion[0] && parseInt(remoteVersion[1]) > parseInt(currentVersion[1])){
                this.newUpdateNotify(remoteMeta, fileContent);
            }else if(remoteVersion[0] == currentVersion[0] && remoteVersion[1] == currentVersion[1] && parseInt(remoteVersion[2]) > parseInt(currentVersion[2])){
                this.newUpdateNotify(remoteMeta, fileContent);
            }
        }
        catch(err){
            Logger.error(this.meta.name, err);
        }

    }

    newUpdateNotify(remoteMeta, remoteFile){
        Logger.info(this.meta.name, "A new update is available!");

        UI.showConfirmationModal("Update Available", [`Update ${remoteMeta.version} is now available for YABDP4Nitro!`, "Press Download Now to update!"], {
            confirmText: "Download Now",
            onConfirm: async (e) => {
                if(remoteFile){
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, `${this.meta.name}.plugin.js`), remoteFile, r));
                    try {
                        let currentVersionInfo = Data.load(this.meta.name, "currentVersionInfo");
                        currentVersionInfo.hasShownChangelog = false;
                        Data.save(this.meta.name, "currentVersionInfo", currentVersionInfo);
                    } catch(err){
                        UI.showToast("An error occurred when trying to download the update!", { type: "error" });
                    }
                }
            }
        });
    }
    //#endregion

    //#region Start, Stop
    start(){
        Logger.info(this.meta.name, "(v" + this.meta.version + ") has started.");

        try {
            //load settings from config
            settings = Object.assign({}, defaultSettings, Data.load(this.meta.name, "settings"));
        } catch(err){
            //The super mega awesome data-unfucker 9000
            Logger.warn(this.meta.name, err);
            Logger.info(this.meta.name, "Error parsing JSON. Resetting file to default...");
            //watch this shit yo
            require("fs").rmSync(require("path").join(BdApi.Plugins.folder, `${this.meta.name}.config.json`));
            BdApi.Plugins.reload(this.meta.name);
            BdApi.Plugins.enable(this.meta.name);
            return;
        }

        //update check
        try {
            let currentVersionInfo = {};
            try {
                currentVersionInfo = Object.assign({}, { version: this.meta.version, hasShownChangelog: false }, Data.load("YABDP4Nitro", "currentVersionInfo"));
            } catch(err){
                currentVersionInfo = { version: this.meta.version, hasShownChangelog: false };
            }
            if(this.meta.version != currentVersionInfo.version) currentVersionInfo.hasShownChangelog = false;
            currentVersionInfo.version = this.meta.version;
            Data.save(this.meta.name, "currentVersionInfo", currentVersionInfo);

            if(settings.checkForUpdates) this.checkForUpdate();

            if(!currentVersionInfo.hasShownChangelog){
                UI.showChangelogModal({
                    title: "YABDP4Nitro Changelog",
                    subtitle: config.changelog[0].title,
                    changes: [{
                        title: config.changelog[0].title,
                        type: "changed",
                        items: config.changelog[0].items
                    }]
                });
                currentVersionInfo.hasShownChangelog = true;
                Data.save(this.meta.name, "currentVersionInfo", currentVersionInfo);
            }
        }
        catch(err){
            Logger.error(this.meta.name, err);
        }

        this.saveAndUpdate();
    }

    stop(){
        CurrentUser.premiumType = ORIGINAL_NITRO_STATUS;
        Patcher.unpatchAll(this.meta.name);
        Dispatcher.unsubscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);
        DOM.removeStyle(this.meta.name);
        DOM.removeStyle("YABDP4NitroBadges");
        usrBgUsers = [];
        BdApi.unlinkJS("ffmpeg.js");
        Data.save("YABDP4Nitro", "settings", settings);
        Logger.info(this.meta.name, "(v" + this.meta.version + ") has stopped.");
    }
    // #endregion
};
// #endregion
/*@end@*/
