/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @authorLink https://github.com/riolubruh
 * @version 6.2.1
 * @invite EFmGEWAUns
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @donate https://github.com/riolubruh/YABDP4Nitro?tab=readme-ov-file#donate
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js
 * @description Unlock all screensharing modes, use cross-server & GIF emotes, and more!
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

/*    ***** ATTRIBUTION NOTICE *****
 *
 * YABDP4Nitro is a free BetterDiscord plugin that bypasses and unlocks Nitro-locked features in the Discord client.
 *
 * Copyright (c) 2025 Riolubruh and contributors
 *
 * Licensed under the Non-Profit Open Software License version 3.0 (NPOSL-3.0).
 * You may use, distribute, and modify this code under the terms of this license.
 *
 * Derivative works must be licensed under NPOSL-3.0 (or OSL-3.0 for for-profit use).
 *
 * Removal or modification of this notice in the source code of any Derivative Work
 * of this software violates the terms of the license.
 *
 * This software is provided on an "AS IS" BASIS and WITHOUT WARRANTY, either express or implied,
 * including, without limitation, the warranties of non-infringement, merchantability or fitness for a particular purpose.
 * THE ENTIRE RISK AS TO THE QUALITY OF THIS SOFTWARE IS WITH YOU.
 *
 * You should have received a copy of the license agreement alongside this file.
 * If not, please visit https://github.com/riolubruh/YABDP4Nitro/blob/main/LICENSE.md
 *
*/

//#region Module Hell
const {Webpack,Patcher,Net,React,UI,Logger,Data,Components,DOM,Plugins} = BdApi;
const StreamButtons = Webpack.getMangled("RESOLUTION_1080",{
    ApplicationStreamFPS: Webpack.Filters.byKeys("FPS_30"),
    ApplicationStreamFPSButtons: o => Array.isArray(o) && typeof o[0]?.label === 'number' && o[0]?.value === 15,
    ApplicationStreamFPSButtonsWithSuffixLabel: o => Array.isArray(o) && typeof o[0]?.label === 'string' && o[0]?.value === 15,
    ApplicationStreamResolutionButtons: o => Array.isArray(o) && o[0]?.value !== undefined,
    ApplicationStreamResolutionButtonsWithSuffixLabel: o => Array.isArray(o) && o[0]?.label === "480p",
    ApplicationStreamResolutions: Webpack.Filters.byKeys("RESOLUTION_1080")
});
const {ApplicationStreamFPS,ApplicationStreamFPSButtons,ApplicationStreamFPSButtonsWithSuffixLabel,
    ApplicationStreamResolutionButtons,ApplicationStreamResolutionButtonsWithSuffixLabel,
    ApplicationStreamResolutions} = StreamButtons;
const CloudUploader = Webpack.getModule(Webpack.Filters.byPrototypeKeys("uploadFileToCloud"),{searchExports: true});
const UserStore = Webpack.getStore("UserStore");
const CurrentUser = UserStore.getCurrentUser();
const ORIGINAL_NITRO_STATUS = CurrentUser.premiumType;
const getBannerURL = Webpack.getByPrototypeKeys("getBannerURL").prototype;
const UserProfileStore = Webpack.getStore("UserProfileStore");
const buttonClassModule = Webpack.getByKeys("lookFilled","button","contents");
const Dispatcher = Webpack.getByKeys("subscribe","dispatch");
const canUserUseMod = Webpack.getMangled(".getFeatureValue(",{
    canUserUse: Webpack.Filters.byStrings("getFeatureValue")
});
const AvatarDefaults = Webpack.getByKeys("getEmojiURL");
const LadderModule = Webpack.getModule(Webpack.Filters.byKeys("calculateLadder"),{searchExports: true});
const FetchCollectibleCategories = Webpack.getByStrings('{type:"COLLECTIBLES_CATEGORIES_FETCH"',{searchExports: true});
let ffmpeg = undefined;
const udta = new Uint8Array([0,0,0,89,109,101,116,97,0,0,0,0,0,0,0,33,104,100,108,114,0,0,0,0,0,0,0,0,109,100,105,114,97,112,112,108,0,0,0,0,0,0,0,0,0,0,0,0,44,105,108,115,116,0,0,0,36,169,116,111,111,0,0,0,28,100,97,116,97,0,0,0,1,0,0,0,0,76,97,118,102,54,49,46,51,46,49,48,51,0,0,46,46,117,117,105,100,161,200,82,153,51,70,77,184,136,240,131,245,122,117,165,239]);
const udtaBuffer = udta.buffer;
const PresenceStore = Webpack.getStore("PresenceStore");
const SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
const ChannelStore = Webpack.getStore("ChannelStore");
const MessageActions = Webpack.getByKeys("jumpToMessage","_sendMessage");
const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
const MessageEmojiReact = Webpack.getByStrings(',nudgeAlignIntoViewport:!0,position:','jumboable?',{searchExports: true});
const renderEmbedsMod = Webpack.getByPrototypeKeys('renderSocialProofingFileSizeNitroUpsell',{searchExports: true}).prototype;
const messageRender = Webpack.getMangled('.SEND_FAILED,',{
    renderMessage: o => typeof o === "object"
});
const stickerSendabilityModule = Webpack.getMangled("SENDABLE_WITH_BOOSTED_GUILD",{
    getStickerSendability: Webpack.Filters.byStrings("canUseCustomStickersEverywhere"),
    isSendableSticker: Webpack.Filters.byStrings(")=>0===")
});
const clientThemesModule = Webpack.getModule(Webpack.Filters.byKeys("isPreview"));
const streamSettingsMod = Webpack.getByPrototypeKeys("getCodecOptions").prototype;
const themesModule = Webpack.getMangled("changes:{appearance:{settings:{clientThemeSettings:{",{
    saveClientTheme: Webpack.Filters.byStrings("changes:{appearance:{settings:{clientThemeSettings:{")
});
const accountSwitchModule = Webpack.getByKeys("startSession","login");
const getAvatarUrlModule = Webpack.getByPrototypeKeys("getAvatarURL").prototype;
const fetchProfileEffects = Webpack.getByStrings("USER_PROFILE_EFFECTS_FETCH",{searchExports: true});
const SoundboardStore = Webpack.getStore("SoundboardStore");
const EmojiStore = Webpack.getStore("EmojiStore");
const isEmojiAvailableMod = Webpack.getByKeys("isEmojiFilteredOrLocked");
const TextClasses = Webpack.getByKeys("errorMessage","h5");
const videoOptionFunctions = Webpack.getByPrototypeKeys("updateVideoQuality").prototype;
const appIconButtonsModule = Webpack.getMangled(/isEditor:.{1,3},renderCTAButtons/,{
    CTAButtons: x=>x
});
const addFilesMod = Webpack.getByKeys("addFiles");
const AppIcon = Webpack.getMangled("AppIconHome", {
    AppIconHome: x=>x
});
const RegularAppIcon = Webpack.getByStrings("M19.73 4.87a18.2",{searchExports: true});
const CurrentDesktopIcon = Webpack.getStore("AppIconPersistedStoreState");
const CustomAppIcon = Webpack.getByStrings(".iconSource,width:");
const ClipsEnabledMod = Webpack.getMangled('useExperiment({location:"useEnableClips"',{
    useEnableClips: Webpack.Filters.byStrings('useExperiment({location:"useEnableClips"'),
    areClipsEnabled: Webpack.Filters.byStrings('areClipsEnabled'),
    isPremium: Webpack.Filters.byStrings('isPremiumAtLeast')
});
const ClipsAllowedMod = Webpack.getMangled(`let{ignorePlatformRestriction:`,{
    isClipsClientCapable: (x) => x == x //just get the first result lol
});
const ClipsStore = Webpack.getStore("ClipsStore");
const MaxFileSizeMod = Webpack.getMangled('.premiumTier].limits.fileSize:', {
    getMaxFileSize: Webpack.Filters.byStrings('.premiumTier].limits.fileSize:'),
    exceedsMessageSizeLimit: Webpack.Filters.byStrings('Array.from(', '.size>')
});
const InvalidStreamSettingsModal = Webpack.getMangled(/\.preset\)&&.{1,3}?===.{1,3}?resolution&&/, {
    areStreamSettingsAllowed: x=>x
});
const GoLiveModalV2UpsellMod = Webpack.getMangled("onNitroClick:function", {
    GoLiveModalV2Upsell: x=>x==x
});
const fs = require("fs");
const path = require("path");
const NameplateSectionMod = Webpack.getMangled(/\{pendingNameplate:.{1,3}?,pendingErrors:.{1,3}?\}=\(/, {
    NameplateSection: x=>x
});
const UserSettingsAccountStore = Webpack.getStore("UserSettingsAccountStore");
const NameplatePalettes = Webpack.getBySource('Crimson', "darkBackground", "lightBackground", {searchExports:true});
const NameplatePreview = Webpack.getByRegex(/user:.{1,3}?,nameplate:.{1,3}?,nameplateData:/);
//#endregion

// Calc CRC32 Table
const crcTable = Array.from({ length: 256 }, (_, i) =>
    Array.from({ length: 8 }, (_, j) => j).reduce(crc =>
        (crc & 1) ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1, i));

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
    "customPFPs": true,
    "experiments": false,
    "userPfpIntegration": true,
    "userBgIntegration": true,
    "useClipBypass": true,
    "alwaysTransmuxClips": false,
    "forceClip": false,
    "checkForUpdates": true,
    "fakeInlineVencordEmotes": true,
    "soundmojiEnabled": true,
    "useAudioClipBypass": true,
    "forceAudioClip": false,
    "zipClip": true,
    "enableClipsExperiment": true,
    "disableUserBadge": false,
    "nameplatesEnabled": true,
    "clipTimestamp": 2
};
const defaultData = {
    avatarDecorations: {},
    nameplatesV2: {}
}

//Plugin-wide variables
let settings = {};
let data = {};
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
        "version": "6.2.1",
        "description": "Unlock all screensharing modes, and use cross-server & GIF emotes!",
        "github": "https://github.com/riolubruh/YABDP4Nitro",
        "github_raw": "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js"
    },
    changelog: [
        {
            title: "6.2.1",
            items: [
                "Fixed incompatibility issue between Upload Emoji and FreeStickers.",
                "Fixed FFmpeg output error message having newlines.",
                "Fixed FFmpeg transmux failing if the video file contains a data stream."
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
                { type: "text", id: "minBitrate", name: "Minimum Bitrate", note: "The minimum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.", value: () => settings.minBitrate },
                { type: "text", id: "targetBitrate", name: "Target Bitrate", note: "The target bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.", value: () => settings.targetBitrate },
                { type: "text", id: "maxBitrate", name: "Maximum Bitrate",
                    note: `The maximum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used. 
                    The default max bitrate for free quality options is 3500kbps, and for Nitro quality options (higher than 720p or higher than 30fps) it is 9000kbps as of April 2025. 
                    There is also a strange bug(?) where setting your max bitrate will cause issues with your stream's preview. 
                    If you want to avoid these issues, please disable this option.`, value: () => settings.maxBitrate },
                { type: "text", id: "voiceBitrate", name: "Voice Audio Bitrate", note: `
                    Allows you to change the voice bitrate to whatever you want. 
                    Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. 
                    Bitrate in kbps. Disabled if this is set to -1.`, value: () => settings.voiceBitrate },
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
                { type: "switch", id: "disableUserBadge", name: "Disable User Badge", note: "Disables the YABDP4Nitro User Badge which appears on any user that uses Profile Customization. (client side)", value: () => settings.disableUserBadge },
                { type: "switch", id: "nameplatesEnabled", name: "Fake Nameplates", note: "Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio. Please paste the 3y3 in one or both of those areas.", value: () => settings.nameplatesEnabled }
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
                { type: "dropdown", id: "clipTimestamp", name: "Timestamp", note: "This option lets you choose how the plugin determines the timestamp to put on the generated clip.", value: () => settings.clipTimestamp, options: [
                        { label: "Zero (January 1st, 2015)", value: 0 },
                        { label: "Current Date/Time", value: 1 },
                        { label: "Last Modified Date/Time of File", value: 2 },
                    ]
                },
                { type: "switch", id: "alwaysTransmuxClips", name: "Force Transmuxing", note: "Always transmux the video, even if transmuxing would normally be skipped. Transmuxing is only ever skipped if the codec does not include AVC1 or includes MP42.", value: () => settings.alwaysTransmuxClips },
                { type: "switch", id: "forceClip", name: "Force Clip", note: "Always send video files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.", value: () => settings.forceClip },
                { type: "switch", id: "useAudioClipBypass", name: "Audio Clips Bypass", note: "Identical to the Clips Bypass for videos, except it works with audio files.", value: () => settings.useAudioClipBypass },
                { type: "switch", id: "forceAudioClip", name: "Force Audio Clip", note: "Always send audio files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.", value: () => settings.forceAudioClip },
                { type: "switch", id: "zipClip", name: "ZipClip", note: "Upload any file with the 100MB file upload limit by making your files into polyglot video+zip files that can be opened as a zip file. In 7-Zip, you will have to either: Rename the file to remove the .mp4 extension and then right-click and go 7-Zip > Open Archive > and then manually choose the file format (usually zip or 7z), or: Open the containing folder, right click the file and hit \"Open Inside\", then choose the zip. In WinRAR you don't need to do this, just rename if necessary, open, and it works. Windows' File Explorer's zip integration won't be able to open these, sorry. If you upload a file that is already an archive, the plugin will just append the file so the contents of your uploaded archive will appear rather than having your archive in a new zip.", value: () => settings.zipClip },
                { type: "switch", id: "enableClipsExperiment", name: "Enable Clips Experiments", note: "Whether or not Clips-related experiments should be enabled. This doesn't disable on the fly, you will have to reload your client to get rid of the Experiments buttons in settings.", value: () => settings.enableClipsExperiment}
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
                { type: "switch", id: "experiments", name: "Experiments", note: "Unlocks experiments. Soundmoji and Enable Clips Experiments have to be disabled to turn this off. Use at your own risk.", value: () => (settings.experiments || settings.soundmojiEnabled || (settings.useClipBypass && settings.enableClipsExperiment))},
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

        //migrate settings.avatarDecorations to data.avatarDecorations
        if(settings.avatarDecorations){
            try{
                data.avatarDecorations = settings.avatarDecorations;
                this.saveDataFile();
                delete settings.avatarDecorations;
            }catch(err){
                Logger.error(this.meta.name, "Data migration failed.");
            }
        }

        //delete old nameplate data
        if(data.nameplates) delete data.nameplates;

        Data.save(this.meta.name, "settings", settings);
        this.saveDataFile();

        Patcher.unpatchAll(this.meta.name);

        Dispatcher.unsubscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);

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

        if(isNaN(settings.CustomFPS)) settings.CustomFPS = 60;
        if(isNaN(settings.CustomResolution)) settings.CustomResolution = 1440;

        if(settings.ResolutionSwapper){
            try {
                this.resolutionSwapper();
                this.resolutionSwapperV2();
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
                Patcher.after(this.meta.name, UserProfileStore, "getUserProfile", (_, args, ret) => {
                    if(ret == undefined) return;
                    ret.premiumType = 2;
                });
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.screenSharing){
            try {
                this.customizeStreamButtons(); //Apply custom resolution and fps options for Go Live Modal V1
            } catch(err){
                Logger.error(this.meta.name, "Error occurred during customizeStreamButtons() " + err);
            }
            try {
                this.videoQualityModule(); //Custom Bitrates, FPS, Resolution

                //disable resolution / fps check
                Patcher.instead(this.meta.name, InvalidStreamSettingsModal, "areStreamSettingsAllowed", (_, args, originalFunction) => {
                    return true;
                });
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
                    [class*="upsellBanner"], [class*="reverseTrialEducationBannerContainer"] {
                        display: none;
                        visibility: hidden;
                    }
                `);

                //Disable GoLiveModalV2 upsell
                Patcher.instead(this.meta.name, GoLiveModalV2UpsellMod, "GoLiveModalV2Upsell", () => {
                    return;
                });
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.fakeProfileBanners){
            try{
                this.bannerUrlDecoding();
                this.bannerUrlEncoding(this.secondsightifyEncodeOnly);
            }catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        Dispatcher.unsubscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);

        if(settings.fakeAvatarDecorations){
            try{
                this.fakeAvatarDecorations();
            }catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.unlockAppIcons){
            try{
                this.appIcons();
            }catch(err){
                Logger.error(this.meta.name, err);
            }
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
        if(settings.useClipBypass || settings.useAudioClipBypass){
            try {
                this.clipsBypass();
            } catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.fakeInlineVencordEmotes){
            try{
                this.inlineFakemojiPatch();
            }catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.soundmojiEnabled || (settings.emojiBypass && settings.emojiBypassType == 0) || settings.stickerBypass){
            try{
                this._sendMessageInsteadPatch();
            }catch(err){
                Logger.error(this.meta.name, err);
            }
        }

        if(settings.videoCodec2 > -1){
            try{
                this.videoCodecs();
            }catch(err){
                Logger.error(this.meta.name, err);
            }
        }
        
        if(settings.fakeAvatarDecorations || settings.nameplatesEnabled){
            //subscribe to successful collectible category fetch event
            Dispatcher.subscribe("COLLECTIBLES_CATEGORIES_FETCH_SUCCESS", this.storeProductsFromCategories);

            //trigger collectibles fetch
            FetchCollectibleCategories({
                includeBundles: true,
                includeUnpublished: false,
                noCache: false,
                paymentGateway: undefined
            });
        }

        if(settings.nameplatesEnabled){
            this.nameplates();
        }

    } //End of saveAndUpdate()
    // #endregion

    //shouldInclude is a string containing the characters that the encoded text should contain
    //that means that in order to check for "P{" for example, you check for the characters \uDB40\uDC50\uDB40\uDC7B since we're checking the encoded text
    //but since the encoded text is over 2 bytes, you need to use the surrogate pairs ( you can calculate them here https://russellcottrell.com/greek/utilities/SurrogatePairCalculator.htm )
    //if shouldInclude is blank, always return the revealed text if there is revealed text
    getRevealedText(userId, shouldInclude=""){
        let revealedText = ""; //init variable

        //get the user's profile from the cached user profiles
        let userProfile = UserProfileStore.getUserProfile(userId);
        //if this user's profile has been downloaded
        if(userProfile){
            //if their bio is empty, move on to the next check.
            if(userProfile?.bio != undefined){
                if(userProfile.bio.includes(shouldInclude)){
                    //reveal 3y3 encoded text
                    revealedText = this.secondsightifyRevealOnly(String(userProfile.bio));
                    //if there's no 3y3 text, move on to the next check.
                    if(revealedText != undefined && revealedText != ""){
                        //return bio with the 3y3 decoded
                        return revealedText;
                    }
                }
            }
        }
        //get Custom Status
        let customStatusActivity = PresenceStore.findActivity(userId,(e) => e.name == "Custom Status" || e.id == "custom");
        //if the user has a custom status
        if(customStatusActivity) {
            //grab the text from the custom status
            let customStatus = customStatusActivity.state;
            //if something has gone horribly wrong, stop processing.
            if(customStatus == undefined) return;
            //reveal 3y3 encoded text
            if(customStatus.includes(shouldInclude)){
                revealedText = this.secondsightifyRevealOnly(String(customStatus));
                //return custom status with the 3y3 decoded
                return revealedText;
            }
        }
    }

    //#region Nameplates
    // nameplate 3y3 format: n{asset/palette}
    nameplates(){
        Patcher.after(this.meta.name, UserStore, "getUser", (_, [userId], ret) => {
            if(!ret || !userId) return;
            
            let userNameplate = ret?.collectibles?.nameplate;

            //if user has a nameplate
            if(userNameplate) {
                //filter out bad or existing nameplate
                if(userNameplate.sku_id != 0 && userNameplate.sku_id != undefined && userNameplate.sku_id != null && data.nameplatesV2[userNameplate.skuId] == undefined) {
                    //get shortened asset name
                    let nameplateAsset = userNameplate.asset.replace('nameplates/','').replaceAll('/','');
                    //create name for nameplate since it's not provided through getUser
                    let nameplateName = nameplateAsset.replaceAll('_',' '); //replace _ with space
                    nameplateName = nameplateName.replace(/(^\w|\s\w)/g,m => m.toUpperCase()); //make every word start with uppercase letter

                    //store seen nameplate
                    data.nameplatesV2[userNameplate.sku_id] = {
                        asset: userNameplate.asset.replace('nameplates/',''),
                        palette: userNameplate.palette,
                        name: nameplateName
                    }
                }
            }

            //Nameplate decoding
                                    // check if it includes /n encoded
            let revealedText = this.getRevealedText(userId, `\uDB40\uDC6E\uDB40\uDC7B`);

            //if nothing's returned, or an empty string is returned, stop processing.
            if(revealedText == undefined) return;
            if(revealedText == "") return;
            
            //This regex matches n{*} . (Do not fuck with this)
            let regex = /n\{[^}]*?\}/;

            //Check if there are any matches in the revealed text.
            let matches = revealedText.match(regex);
            if(matches == undefined) return;

            let firstMatch = matches[0];
            if(firstMatch == undefined) return;

            //slice off the n{ and the ending }
            let nameplate = firstMatch.slice(2,-1);
            if(nameplate){
                let [asset, palette] = nameplate.split(',');
                if(asset != undefined && palette != undefined){
                    if(ret.collectibles == undefined) ret.collectibles = {};
                    ret.collectibles.nameplate = {
                        asset: `nameplates/${asset}`,
                        palette,
                        sku_id: 0
                    }
                }
            }
        });

        const secondsightifyEncodeOnly = this.secondsightifyEncodeOnly;
        
        //#region Nameplates UI
        function NameplateList(){
            let [query, setQuery] = React.useState("");

            let nameplatesList = [];

            if(!data?.nameplatesV2 || data?.nameplatesV2?.length < 1){
                return React.createElement('h1', {
                    children: "No nameplates were found!",
                    style: {
                        color: "red",
                        fontWeight: "bold"
                    }
                });
            } else{
                const listOfNameplatesBySku = Object.keys(data.nameplatesV2);
                for(let i = 0; i < listOfNameplatesBySku.length; i++){
                    let sku = listOfNameplatesBySku[i];
                    let nameplate = data.nameplatesV2[sku];
                    if(query != "" && !nameplate.name.toLowerCase().includes(query.toLowerCase())){
                        continue;
                    }

                    nameplatesList.push(React.createElement('div', {
                        children: React.createElement(NameplatePreview, {
                            user: CurrentUser,
                            isHighlighted: true,
                            nameplateData: {
                                imgAlt: nameplate.name,
                                src: `nameplates/${nameplate.asset}`,
                                palette: NameplatePalettes[nameplate.palette]
                            },
                        }),
                        style: {
                            borderRadius: "10px",
                            width: "95%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            height: "42px",
                            marginTop: "10px",
                            position: "relative",
                            top: '5px',
                            cursor: "pointer",
                        },
                        onClick: () => {
                            //make 3y3 string
                            let strToEncode = `n{${nameplate.asset},${nameplate.palette}}`;
                            let encodedStr = secondsightifyEncodeOnly(strToEncode);

                            //copy to clipboard
                            try{
                                DiscordNative.clipboard.copy(" " + encodedStr);
                                UI.showToast("3y3 copied to clipboard!", { type: "info" });    
                            }catch(err){
                                UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                                Logger.error("YABDP4Nitro", err);
                            }
                        },
                        title: nameplate.name
                    }));
                }
                return React.createElement('div', {
                    children: [
                        React.createElement(Components.TextInput, {
                            value: query,
                            placeholder: "Search...",
                            onChange: (input) => setQuery(input)
                        }),
                        React.createElement('br'),
                        React.createElement('div', {
                            children: nameplatesList
                        })
                    ],
                });
            }
        }

        Patcher.after(this.meta.name, NameplateSectionMod, "NameplateSection", (_, args, ret) => {
            const ButtonsSection = ret.props.children.props.children;
            ButtonsSection.push(React.createElement("button",{
                className: `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`,
                style: {
                    marginLeft: "10px",
                    whiteSpace: "nowrap"
                },
                children: "Change Nameplate [YABDP4Nitro]",
                onClick: () => {
                    UI.showConfirmationModal("Change Nameplate", React.createElement(NameplateList), {cancelText: ""})
                }
            }))
        });
        //#endregion
    }
    //#endregion

    // #region Resolution Swapper
    async resolutionSwapper(){
        if(!this.StreamSettingsPanelMod){
            await Webpack.waitForModule(Webpack.Filters.byStrings("StreamSettings: user cannot be undefined"), {defaultExport:false});
            this.StreamSettingsPanelMod = Webpack.getMangled("StreamSettings: user cannot be undefined", {
                GoLiveModal: Webpack.Filters.byStrings("StreamSettings: user cannot be undefined")
            });
        }

        if(!this.FormModalClasses) 
            this.FormModalClasses = Webpack.getByKeys("formItemTitleSlim", "modalContent");
        
        Patcher.after(this.meta.name, this.StreamSettingsPanelMod, "GoLiveModal", (_, [args], ret) => {

            //Only if the selected preset is "Custom"
            if(args.selectedPreset === 3){
                //Preparations 
                const childrenOfParentOfQualityButtonsSection = ret?.props?.children?.props?.children?.props?.children[1]?.props?.children;
                const streamQualityButtonsSection = childrenOfParentOfQualityButtonsSection[0]?.props?.children;

                const resolutionButtonsSection = streamQualityButtonsSection[0]?.props;

                const fpsButtonsSection = streamQualityButtonsSection[1]?.props;

                //Resolution input
                if(resolutionButtonsSection?.children){
                    //make each section into arrays so we can add another element
                    if(!Array.isArray(resolutionButtonsSection.children))
                        resolutionButtonsSection.children = [resolutionButtonsSection.children];

                    const thirdResolutionButton = resolutionButtonsSection?.children[0]?.props?.buttons[2];

                    resolutionButtonsSection?.children?.push(React.createElement("div", {
                        children: [
                            React.createElement("h1", {
                                children: "CUSTOM RESOLUTION",
                                className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                            }),
                            React.createElement(Components.NumberInput, {
                                value: settings.CustomResolution,
                                min: -1,
                                onChange: (input) => {
                                    input = parseInt(input);
                                    if(isNaN(input)) input = 1440;
                                    settings.CustomResolution = input;
                                    //updates visual
                                    thirdResolutionButton.value = input;
                                    //sets values and saves to settings
                                    this.customizeStreamButtons();
                                    //simulate click on button -- serves to both select it and to make react re-render it.
                                    thirdResolutionButton.onClick();
                                }
                            })
                        ]
                    }));
                }
                
                if(fpsButtonsSection?.children){

                    fpsButtonsSection.children = [fpsButtonsSection.children];

                    const thirdFpsButton = fpsButtonsSection?.children[0]?.props?.buttons[2];

                    fpsButtonsSection?.children.push(React.createElement("div", {
                        children: [
                            React.createElement("h1", {
                                children: "CUSTOM FRAME RATE",
                                className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                            }),
                            React.createElement(Components.NumberInput, {
                                value: settings.CustomFPS,
                                min: -1,
                                onChange: (input) => {
                                    input = parseInt(input);
                                    if(isNaN(input)) input = 60;
                                    settings.CustomFPS = input;
                                    //updates visual
                                    thirdFpsButton.value = input;
                                    //sets values and saves to settings
                                    this.customizeStreamButtons();
                                    //simulate click on button -- serves to both select it and to make react re-render it.
                                    thirdFpsButton.onClick();
                                }
                            })
                        ]
                    }));
                }

                if(settings.CustomBitrateEnabled){
                    if(childrenOfParentOfQualityButtonsSection){
                        childrenOfParentOfQualityButtonsSection.push(React.createElement("br"));

                        childrenOfParentOfQualityButtonsSection.push(React.createElement(Components.SettingGroup, {
                            name: "Bitrate",
                            collapsible: true,
                            shown: false,
                            children: [
                                //headers
                                React.createElement('div', {
                                    style: {
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "space-around"
                                    },
                                    children: [
                                        React.createElement("h1", {
                                            children: "MIN",
                                            style: {
                                                marginBlock: "0 5px",
                                            },
                                            className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                        }),
                                        React.createElement("h1", {
                                            children: "TARGET",
                                            style: {
                                                marginBlock: "0 5px",
                                            },
                                            className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                        }),
                                        React.createElement("h1", {
                                            children: "MAX",
                                            style: {
                                                marginBlock: "0 5px",
                                            },
                                            className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                        }),
                                    ]
                                }),
                                React.createElement('div', {
                                    style: {
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "space-around",
                                        marginBottom: "5px"
                                    },
                                    children: [
                                        React.createElement(Components.NumberInput, {
                                            value: settings.minBitrate,
                                            min: -1,
                                            onChange: (input) => {
                                                input = parseInt(input);
                                                if(isNaN(input)) input = -1;
                                                settings.minBitrate = input;
                                                //save to settings
                                                Data.save(this.meta.name, "settings", settings);
                                            }
                                        }),
                                        React.createElement(Components.NumberInput, {
                                            value: settings.targetBitrate,
                                            min: -1,
                                            onChange: (input) => {
                                                input = parseInt(input);
                                                if(isNaN(input)) input = -1;
                                                settings.targetBitrate = input;
                                                //save to settings
                                                Data.save(this.meta.name, "settings", settings);
                                            }
                                        }),
                                        React.createElement(Components.NumberInput, {
                                            value: settings.maxBitrate,
                                            min: -1,
                                            onChange: (input) => {
                                                input = parseInt(input);
                                                if(isNaN(input)) input = -1;
                                                settings.maxBitrate = input;
                                                //save to settings
                                                Data.save(this.meta.name, "settings", settings);
                                            }
                                        }),
                                    ]
                                })
                            ]
                        }));
                    }
                }
            }
        });
    }

    //#region Go Live Modal V2
    async resolutionSwapperV2(){

        //wait for lazy loaded modules
        await Webpack.waitForModule(Webpack.Filters.bySource("golivemodalv2"));
        if(this.GoLiveModalMod == undefined) 
            this.GoLiveModalMod = Webpack.getMangled("golivemodalv2", {
                goLiveModalV2: Webpack.Filters.byStrings("golivemodalv2")
            });

        await Webpack.waitForModule(Webpack.Filters.byKeys("streamOptionsButton", "settingsIcon"));
        if(this.SteamOptionsButtonClassesMod == undefined) this.SteamOptionsButtonClassesMod = Webpack.getByKeys("streamOptionsButton", "settingsIcon");

        //the sign of janky code inbound
        let GLMV2Opt = {
            resolutionToSet: undefined,
            fpsToSet: undefined,
            minBitrateToSet: undefined,
            targetBitrateToSet: undefined,
            maxBitrateToSet: undefined
        };

        Patcher.after(this.meta.name, this.GoLiveModalMod, "goLiveModalV2", (_,args,ret) => {
            //maybe the worst amalgamation in this whole plugin?

            if(GLMV2Opt.resolutionToSet != undefined) {
                ret.props.state.resolution = GLMV2Opt.resolutionToSet;
                settings.CustomResolution = GLMV2Opt.resolutionToSet;
                GLMV2Opt.resolutionToSet = undefined;
            }
            if(GLMV2Opt.fpsToSet != undefined) {
                ret.props.state.fps = GLMV2Opt.fpsToSet;
                settings.CustomFPS = GLMV2Opt.fpsToSet;
                GLMV2Opt.fpsToSet = undefined;
            }

            const ModalFooter = ret?.props?.children?.props?.children[2]?.props?.children[0]?.props?.children[1]?.props?.children;
            
            if(ModalFooter) {
                ModalFooter.splice(2,0,React.createElement("button",{
                    class: `${this.SteamOptionsButtonClassesMod.streamOptionsButton} ${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorPrimary} ${buttonClassModule.sizeIcon} ${buttonClassModule.grow}`,
                    style: {
                        height: "46px",
                        width: "46px"
                    },
                    children: 'YABD',
                    onClick: () => {
                        let localStreamOptions = {
                            resolutionToSet: undefined,
                            fpsToSet: undefined,
                            minBitrateToSet: undefined,
                            targetBitrateToSet: undefined,
                            maxBitrateToSet: undefined
                        }

                        //defaults
                        if(settings.ResolutionEnabled) localStreamOptions.resolutionToSet = settings.CustomResolution;
                        if(settings.CustomFPSEnabled) localStreamOptions.fpsToSet = settings.CustomFPS;
                        if(settings.CustomBitrateEnabled) {
                            localStreamOptions.minBitrateToSet = settings.minBitrate;
                            localStreamOptions.targetBitrateToSet = settings.targetBitrate;
                            localStreamOptions.maxBitrateToSet = settings.maxBitrate;
                        }

                        UI.showConfirmationModal("Configure Stream Settings",[
                            React.createElement('div', {
                                children: [
                                    React.createElement('div', {
                                        style: {
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-around"
                                        },
                                        children: [
                                            React.createElement("h1",{
                                                children: "Resolution",
                                                className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                            }),
                                            React.createElement("h1",{
                                                children: "FPS",
                                                className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                            }),
                                        ]
                                    }),
                                    React.createElement('div', {
                                        style: {
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-around"
                                        },
                                        children: [
                                            React.createElement(Components.NumberInput,{
                                                value: settings.CustomResolution,
                                                min: -1,
                                                onChange: (input) => {
                                                    input = parseInt(input);
                                                    if(isNaN(input)) input = 1440;
                
                                                    localStreamOptions.resolutionToSet = input;
                                                }
                                            }),
                                            React.createElement(Components.NumberInput,{
                                                value: settings.CustomFPS,
                                                min: -1,
                                                onChange: (input) => {
                                                    input = parseInt(input);
                                                    if(isNaN(input)) input = 60;
                
                                                    localStreamOptions.fpsToSet = input;
                                                }
                                            }),
                                        ]
                                    }),
                                ]
                            }),
                            settings.CustomBitrateEnabled ? React.createElement("br") : undefined,
                            settings.CustomBitrateEnabled ? React.createElement("h1",{
                                children: "Custom Bitrate (kbps)",
                                className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                            }) : undefined,
                            settings.CustomBitrateEnabled ? React.createElement('div', {
                                style: {
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-around"
                                },
                                children: [
                                    React.createElement("h1", {
                                        children: "Min",
                                        style: {
                                            marginBlock: "0 5px",
                                        },
                                        className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                    }),
                                    React.createElement("h1", {
                                        children: "Target",
                                        style: {
                                            marginBlock: "0 5px",
                                        },
                                        className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                    }),
                                    React.createElement("h1", {
                                        children: "Max",
                                        style: {
                                            marginBlock: "0 5px",
                                        },
                                        className: `${TextClasses.h5} ${TextClasses.eyebrow} ${this.FormModalClasses.formItemTitleSlim}`
                                    }),
                                ]
                            }) : undefined,
                            React.createElement('div',{
                                style: {
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-around",
                                    marginBottom: "5px"
                                },
                                children: settings.CustomBitrateEnabled ? [
                                    React.createElement(Components.NumberInput,{
                                        value: settings.minBitrate,
                                        min: -1,
                                        onChange: (input) => {
                                            input = parseInt(input);
                                            if(isNaN(input)) input = -1;
                                            localStreamOptions.minBitrateToSet = input;
                                        }
                                    }),
                                    React.createElement(Components.NumberInput,{
                                        value: settings.targetBitrate,
                                        min: -1,
                                        onChange: (input) => {
                                            input = parseInt(input);
                                            if(isNaN(input)) input = -1;
                                            localStreamOptions.targetBitrateToSet = input;
                                        }
                                    }),
                                    React.createElement(Components.NumberInput,{
                                        value: settings.maxBitrate,
                                        min: -1,
                                        onChange: (input) => {
                                            input = parseInt(input);
                                            if(isNaN(input)) input = -1;
                                            localStreamOptions.maxBitrateToSet = input;
                                        }
                                    }),
                                ] : undefined
                            })
                        ],
                        {
                            confirmText: "Apply",
                            onConfirm: () => {
                                GLMV2Opt = localStreamOptions;

                                if(localStreamOptions.minBitrateToSet != undefined) settings.minBitrate = localStreamOptions.minBitrateToSet;
                                if(localStreamOptions.targetBitrateToSet != undefined) settings.targetBitrate = localStreamOptions.targetBitrateToSet;
                                if(localStreamOptions.maxBitrateToSet != undefined) settings.maxBitrate = localStreamOptions.maxBitrateToSet;
                                Data.save(this.meta.name,"settings",settings);
                            }
                        }
                        )
                    }
                }
                ));
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

    // #region Clips Bypasses
    async clipsBypass(){

        if(settings.enableClipsExperiment){
            this.experiments();
            this.overrideExperiment("2023-09_clips_nitro_early_access", 2);
            this.overrideExperiment("2022-11_clips_experiment", 1);
            this.overrideExperiment("2023-10_viewer_clipping", 1);
        }
        //spoof nitro file size limit
        Patcher.instead(this.meta.name, MaxFileSizeMod, "getMaxFileSize", (_,args) => {
            return 500 * 1024 * 1024; //512 MB
        });

        //disable max file size message
        Patcher.instead(this.meta.name, MaxFileSizeMod, "exceedsMessageSizeLimit", (_,args) => {
            return false;
        });

        // todo: maybe fix ActionBarClipsButton and ClipsButton button not appearing with experiments disabled eventually
        // currently they use useExperiment to check if they should appear, which is a function that I can't patch
        // and remaking the respective React elements sounds really difficult


        //base64 for file clipping mp4
        const clipMe = "AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAABbBtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAyAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAACUXRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAyAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAMgAAADIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAMgAAAAAAAEAAAAAAcltZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAADIAAAAKAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAF0bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABNHN0YmwAAADAc3RzZAAAAAAAAAABAAAAsG1wNHYAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAMgAyAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAsZXNkcwAAAAADgICAGwABAASAgIANbBEAAAAAAMmQAADJkAaAgIABAgAAAApmaWVsAQAAAAAQcGFzcAAAAAEAAAABAAAAFGJ0cnQAAAAAAADJkAAAyZAAAAAYc3R0cwAAAAAAAAABAAAABQAAAgAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAABAgAAAAUAAAAkc3RjbwAAAAAAAAAFAAAF8QAABvsAAAgFAAAJDwAAChUAAAKJdHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAgAAAAAAAAC6AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAAuQAABAAAAQAAAAACAW1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAArEQAACPfVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAaxtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAXBzdGJsAAAAfnN0c2QAAAAAAAAAAQAAAG5tcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADZlc2RzAAAAAAOAgIAlAAIABICAgBdAFQAAAAAAB/QAAAf0BYCAgAUSCFblAAaAgIABAgAAABRidHJ0AAAAAAAAB/QAAAf0AAAAIHN0dHMAAAAAAAAAAgAAAAgAAAQAAAAAAQAAA98AAAA0c3RzYwAAAAAAAAADAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAABQAAAAEAAAABAAAAOHN0c3oAAAAAAAAAAAAAAAkAAAAVAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAoc3RjbwAAAAAAAAAGAAAF3AAABvMAAAf9AAAJBwAAChEAAAsXAAAAGnNncGQBAAAAcm9sbAAAAAIAAAAB//8AAAAcc2JncAAAAAByb2xsAAAAAQAAAAkAAAABAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1OS4yNy4xMDAAAAAIZnJlZQAABUdtZGF03gIATGF2YzU5LjM3LjEwMAACMEAO/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzU5LjM3LjEwMAD//gAMQ1M9SVRVNjAxAP/bAEMACAQEBAQEBQUFBQUFBgYGBgYGBgYGBgYGBgcHBwgICAcHBwYGBwcICAgICQkJCAgICAkJCgoKDAwLCw4ODhERFP/EAEsAAQEAAAAAAAAAAAAAAAAAAAAHAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgAMgAyAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8Ah4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/ZARggBwEYIAf/2P/gABBKRklGAAECAAABAAEAAP/+ABBMYXZjNTkuMzcuMTAwAP/+AAxDUz1JVFU2MDEA/9sAQwAIBAQEBAQFBQUFBQUGBgYGBgYGBgYGBgYGBwcHCAgIBwcHBgYHBwgICAgJCQkICAgICQkKCgoMDAsLDg4OEREU/8QASwABAQAAAAAAAAAAAAAAAAAAAAcBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAyADIDASIAAhEAAxEA/9oADAMBAAIRAxEAPwCHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9kBGCAHARggB//Y/+AAEEpGSUYAAQIAAAEAAQAA//4AEExhdmM1OS4zNy4xMDAA//4ADENTPUlUVTYwMQD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABLAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAABABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/AABEIADIAMgMBIgACEQADEQD/2gAMAwEAAhEDEQA/AIeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2QEYIAcBGCAH/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzU5LjM3LjEwMAD//gAMQ1M9SVRVNjAxAP/bAEMACAQEBAQEBQUFBQUFBgYGBgYGBgYGBgYGBgcHBwgICAcHBwYGBwcICAgICQkJCAgICAkJCgoKDAwLCw4ODhERFP/EAEsAAQEAAAAAAAAAAAAAAAAAAAAHAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgAMgAyAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8Ah4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/ZARggB//Y/+AAEEpGSUYAAQIAAAEAAQAA//4AEExhdmM1OS4zNy4xMDAA//4ADENTPUlUVTYwMQD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABLAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAABABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/AABEIADIAMgMBIgACEQADEQD/2gAMAwEAAhEDEQA/AIeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2QEYIAcAAABZbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAsaWxzdAAAACSpdG9vAAAAHGRhdGEAAAABAAAAAExhdmY2MS4zLjEwMwAALi51dWlkochSmTNGTbiI8IP1enWl7w==";

        //convert base64 to ArrayBuffer
        var binaryString = atob(clipMe);
        var bytes = new Uint8Array(binaryString.length);
        for(var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const clipMaBuffer = bytes.buffer;

        if(!this.MP4Box){
            try{
                await Webpack.getByStrings("mp4boxInputFile.boxes")();
            }catch(e){}
            this.MP4Box = await Webpack.waitForModule(Webpack.Filters.byKeys("MP4BoxStream"));
        }
        if(ffmpeg == undefined) await this.loadFFmpeg();

        async function ffmpegTransmux(arrayBuffer, inFileName = "input.mp4", ffmpegArguments, outFileName = "output.mp4"){
            if(ffmpeg){
                if(!ffmpegArguments)
                    ffmpegArguments = ["-i",inFileName,"-codec","copy","-dn","-map_chapters","-1","-brand","isom/avc1","-movflags","+faststart",
                                       "-map","0","-map_metadata","-1","-map_chapters","-1",outFileName];
                
                await ffmpeg.writeFile(inFileName, new Uint8Array(arrayBuffer));
                console.log("Approximately equivalent ffmpeg command:");
                console.log("ffmpeg " + ffmpegArguments.join(" "));
                await ffmpeg.exec(ffmpegArguments);
                const data = await ffmpeg.readFile(outFileName);
                
                ffmpeg.deleteFile(inFileName);
                ffmpeg.deleteFile(outFileName);
                
                if(data.length == 0){
                    throw new Error("An error occurred during muxing/encoding: Output file ended up empty or doesn't exist, " + 
                                    "likely due to an FFmpeg error. Please check the FFmpeg logs above. " +
                                    "If you need assistance, please use the support channel in the Discord server.");
                }

                return data.buffer;
            }
            else throw new Error(`Can't mux/encode: ffmpeg is not loaded!`);
        }
        async function ffmpegAudioTransmux(arrayBuffer, inFileName = "input.mp3", outFileName = "output.mp4"){

            let ffmpegArgs = ["-f","lavfi","-i","color=c=black:s=400x50","-i",inFileName,"-shortest","-fflags","+shortest", 
                "-brand","isom/avc1","-movflags","+faststart","-map_metadata","-1","-dn","-map_chapters","-1",
                "-preset","ultrafast","-c:a","copy","-strict","-2","-tune", "stillimage","-r","1", outFileName];

            return await ffmpegTransmux(arrayBuffer, inFileName, ffmpegArgs, outFileName);
        }

        const skippedAudioTypes = ['audio/mid','audio/basic','audio/mpegurl','audio/3gp'];
        const skippedVideoTypes = ['video/3gp',"video/asf",'video/ivf'];

        Patcher.instead(this.meta.name, addFilesMod, "addFiles", async (_, [args], originalFunction) => {
            /* If ffmpeg isn't loaded, or was unloaded for some reason,
               when the user adds a file, make sure to load it again if it's undefined
               If we don't do this check, then the user would have to
               trigger saveAndUpdate or restart the plugin to
               make ffmpeg load if it wasn't loaded properly the first time. */
            if(ffmpeg == undefined) await this.loadFFmpeg();

            function errorHandler(err, currentFile, name) {
                UI.showToast("Something went wrong. See console for details.", { type: "error", forceShow: true });
                Logger.error(name, err);
                if(currentFile) {
                    Logger.info(name, "Current file information for debugging:");
                    Logger.info(name, currentFile);
                    Logger.info(name, `File Type: "${currentFile.file?.type}"`);
                }
            }
			
            //for each file being added
            for(let i = 0; i < args.files.length; i++){
                const currentFile = args.files[i];

               if(currentFile.file.name.endsWith(".dlfc")) return;

               console.log(currentFile);

                const clipData = {
                    "id": 0,
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

                switch(settings.clipTimestamp){
                    default:
                    case 0: //Zero
                        break;
                    case 1: //Current Time
                        clipData.id = (BigInt(Date.now()) - 1420070400000n) << 22n;
                        break;
                    case 2: //Last Modified Date
                        clipData.id = (BigInt(currentFile.file.lastModified) - 1420070400000n) << 22n;
                        break;
                }

                // #region MP4 Clip
                //larger than 10mb or force video clip enabled AND video clip bypass enabled AND is a video file AND is not a video type to skip
                if((currentFile.file.size > 10485759 || settings.forceClip) && settings.useClipBypass && currentFile.file.type.startsWith("video/") && !skippedVideoTypes.includes(currentFile.file.type)){
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
                                if(info.videoTracks[0]?.codec?.startsWith("avc") || info.videoTracks[0]?.codec?.startsWith("hev1")){

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
                                errorHandler(err, currentFile, this.meta.name);
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
                    
                    }
                    // #endregion
                    // #region Other Video Clip
                    else if(currentFile.file.name.toLowerCase().endsWith(".mod") && currentFile.file.type == 'video/mpeg'){
                        continue;
                    }
                    else{
                        //Is a video file, but not MP4

                        let outFileName = "output.mp4";

                        //AVI file warning
                        if(currentFile.file.type == "video/avi"){
                            UI.showToast("[YABDP4Nitro] NOTE: AVI Files may send, but HTML5 and MP4 do not support all AVI video codecs, it may not play and FFmpeg may error!", { type: "warning" });
                        }
                        try {
                            let arrayBuffer = await currentFile.file.arrayBuffer();
                            const movTypes = ["video/flv", "video/ogg", "video/wmv", "video/mov"];
                            if(movTypes.includes(currentFile.file.type)){
                                Logger.info(this.meta.name, 'Using MOV format for clip.');
                                
                                outFileName = "output.mov";
                            }

                            let array1 = ArrayBuffer.concat(await ffmpegTransmux(arrayBuffer, currentFile.file.name, undefined, outFileName), udtaBuffer);

                            let video = new File([new Uint8Array(array1)], currentFile.file.name.substr(0, currentFile.file.name.lastIndexOf(".")) + ".mp4", { type: "video/mp4" });

                            currentFile.file = video;

                            //send as a "clip"
                            currentFile.clip = clipData;
                        } catch(err){
                            errorHandler(err, currentFile, this.meta.name);
                            continue;
                        }
                    }
                    //#endregion
                }
                // #region Audio Clip
                //Audio file above 10mb or Force Audio Clip and it not an incompatible type and useAudioClipBypass is true
                else if(settings.useAudioClipBypass && (currentFile.file.size > 10485759 || settings.forceAudioClip) &&
                   (currentFile.file.type.startsWith("audio/") && !skippedAudioTypes.includes(currentFile.file.type))){

                    try {
                        let arrayBuffer = await currentFile.file.arrayBuffer();

                        let outFileName = "output.mp4";

                        if(['audio/wav', 'audio/aiff', 'audio/x-ms-wma'].includes(currentFile.file.type)){
                            Logger.info("YABDP4Nitro", 'Using MOV format for audio clip.');
                            outFileName = 'output.mov';
                        }
                        if(currentFile.file.type == 'audio/vnd.dolby.dd-raw'){
                            UI.showToast("AC3 should send but playback is not supported!", {type: "warn"});
                        }

                        let array1 = ArrayBuffer.concat(await ffmpegAudioTransmux(arrayBuffer, currentFile.file.name, outFileName), udtaBuffer);

                        let video = new File([new Uint8Array(array1)], clipData.name + ".mp4", { type: "video/mp4" });

                        currentFile.file = video;

                        //send as a "clip"
                        currentFile.clip = clipData;
                    } catch(err){
                        errorHandler(err, currentFile, this.meta.name);
                        continue;
                    }
                }
                //#endregion

                // #region File Clip

                //any file above 10mb and below 100mb that does not fit any previous criteria
                else if(currentFile.file.size > 10485759 && currentFile.file.size < 104857590 && settings.zipClip) {
                    const archiveMimeTypes = ['x-7z-compressed', 'x-bzip', 'x-bzip2', 'x-rar-compressed', 'x-tar', 'gzip', 'x-gzip', 'zip', 'x-zip-compressed'];
                    
                    let zipFile;
                    let fileArrayBuffer = await currentFile.file.arrayBuffer();

                    //if the file has an archive mime type or is a .001 through .999 part file. technically also would work with more than 999 parts but i dont think it goes that high lol
                    if(archiveMimeTypes.includes(currentFile.file.type.replace('application/','')) || parseInt(currentFile.file.name.substring(currentFile.file.name.lastIndexOf('.') + 1, currentFile.file.name.length)) > 0) {

                        zipFile = fileArrayBuffer;
                        clipData.name = currentFile.file.name;
                    }else{
                        /* DeepSeek-R1 helped to write this createZip function.
                        Don't worry, I'm not completely stupid, I understand what the code does, how it works, and made sure to optimize it.
                        I was just not feeling like learning the ins and outs of the zip format totally from scratch. Sue me.
                        An explanation of the function is below (yes I wrote the explanation):
                        The function creates a basic zip file containing the data variable as a file with no compression and returns a Uint8Array of the zip file.
                        The name variable is the file name of the file within the zip.
                        The data variable can be ArrayBuffer, Uint8Array, or string.
                        To make a zip file, a bunch of headers and data descriptors, including a CRC checksum and a bunch of info about the file, must be created, so that's what we're doing.
                        https://en.wikipedia.org/wiki/ZIP_(file_format)#File_headers for more information on that.
                        Writing all this shit would've been pretty tedious so yea. */
                        function createZip(name, data) {

                            // Convert input to Uint8Array
                            const enc = new TextEncoder();
                            const nameBytes = enc.encode(name);
                            const dataBytes = data instanceof ArrayBuffer ? new Uint8Array(data) :
                                data instanceof Uint8Array ? data : enc.encode(data);

                            // Calculate CRC and lengths
                            let crc = -1;  // Initial value
                            const len = dataBytes.length;

                            // Process bytes in chunks
                            for(let i = 0; i < len; i++) {
                                crc = (crc >>> 8) ^ crcTable[(crc ^ dataBytes[i]) & 0xFF];
                            }

                            // Finalize CRC and convert to unsigned int
                            crc = (crc ^ -1) >>> 0;

                            const dataLength = dataBytes.length;
                            const headerLength = 30 + nameBytes.length;

                            // Local File Header (starts at 0)
                            const localHeader = new DataView(new ArrayBuffer(headerLength));
                            localHeader.setUint32(0, 0x04034B50, true);  // Signature
                            localHeader.setUint16(4, 0x0A00, true);      // Version needed
                            localHeader.setUint32(14, crc, true);        // CRC-32
                            localHeader.setUint32(18, dataLength, true); // Compressed size
                            localHeader.setUint32(22, dataLength, true); // Uncompressed size
                            localHeader.setUint16(26, nameBytes.length, true);
                            new Uint8Array(localHeader.buffer).set(nameBytes, 30);

                            // Central Directory (starts after file data)
                            // Note: Omitted fields default to 0, since the length is set manually.
                            const centralDir = new DataView(new ArrayBuffer(46 + nameBytes.length));
                            centralDir.setUint32(0, 0x02014B50, true);   // Signature
                            centralDir.setUint16(6, 0x0A00, true);       // Version needed
                            centralDir.setUint32(16, crc, true);         // CRC-32
                            centralDir.setUint32(20, dataLength, true);  // Sizes
                            centralDir.setUint32(24, dataLength, true);
                            centralDir.setUint16(28, nameBytes.length, true);
                            new Uint8Array(centralDir.buffer).set(nameBytes, 46);

                            // End of Central Directory
                            const end = new DataView(new ArrayBuffer(22));
                            end.setUint32(0, 0x06054B50, true);         // Signature
                            end.setUint16(8, 1, true);                  // Entry count
                            end.setUint16(10, 1, true);                 // Total entries
                            end.setUint32(12, centralDir.buffer.byteLength, true); // Dir size
                            end.setUint32(16, headerLength + dataLength, true);    // Dir offset

                            //Allocating a Uint8Array large enough for the file
                            const totalSize = localHeader.buffer.byteLength + dataBytes.length +
                                centralDir.buffer.byteLength + end.buffer.byteLength;
                            const result = new Uint8Array(totalSize);

                            //Putting all the data together
                            let offset = 0;
                            [localHeader.buffer, dataBytes, centralDir.buffer, end.buffer].forEach(buf => {
                                result.set(new Uint8Array(buf), offset);
                                offset += buf.byteLength || buf.length;
                            });

                            return result;
                        }

                        zipFile = createZip(currentFile.file.name, fileArrayBuffer).buffer;
                        
                        clipData.name += ".zip";
                    }

                    try {
                        let newArrBuf = ArrayBuffer.concat(clipMaBuffer, zipFile);
                        
                        let newFile = new File([new Uint8Array(newArrBuf)], clipData.name + ".mp4", { type: "video/mp4" });
                        currentFile.file = newFile;
                        currentFile.clip = clipData;
                    } catch(err) {
                        errorHandler(err, currentFile, this.meta.name);
                    }
                }
                //#endregion
                currentFile.platform = 1;
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
        Patcher.instead(this.meta.name, ClipsStore, "isViewerClippingAllowedForUser", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsStore, "isClipsEnabledForUser", () => {
            return true;
        });
        Patcher.instead(this.meta.name, ClipsStore, "isVoiceRecordingAllowedForUser", () => {
            return true;
        });
    } //End of clipsBypass()
    // #endregion

    // #region Load FFmpeg.js
    async loadFFmpeg(){
        const defineTemp = window.global.define;

        let ffmpegScript = document.getElementById("ffmpegScript");
        if(ffmpegScript) {
            ffmpegScript.remove();
        }

        function tryFetchFromDisk(filename, encoding){
            const basepath = path.join(BdApi.Plugins.folder, "ffmpeg");
            let filepath = path.join(basepath, filename);
            try{
                if(fs.existsSync(filepath)){
                    let file = fs.readFileSync(filepath, encoding);
                    Logger.info("YABDP4Nitro", `Fetch from disk for file ${filename} succeeded.`);
                    return file;
                }
            }catch(err){
                Logger.warn("YABDP4Nitro", "Tried to read " + filename + "from disk but an error occurred.");
                Logger.warn("YABDP4Nitro", err);
            }
        }

        async function fetchAndRetryWithNetFetch(filename){            
            const ffmpeg_js_baseurl = "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg/";
            let res = await fetch(ffmpeg_js_baseurl + filename, { timeout: 100000, cache: "force-cache" });
            if(res.ok || res.status == 200) {
                return res;
            } else {
                Logger.warn("YABDP4Nitro", res);
                res = await Net.fetch(ffmpeg_js_baseurl + filename, { timeout: 100000 });
                if(res.ok || res.status == 200){
                    return res;
                }else{
                    Logger.error("YABDP4Nitro", res);
                    throw new Error(filename + " failed to fetch.");
                }
            }
        }

        async function fetchBlobUrl(filename){
            try{
                let blobUrl;
                let file = tryFetchFromDisk(filename, "");
                if(file) blobUrl = URL.createObjectURL(new Blob([file]));
                else blobUrl = URL.createObjectURL(await (await fetchAndRetryWithNetFetch(filename)).blob());
                return blobUrl;
            }catch(err){
                Logger.error(this.meta.name, "An error occurred while fetching " + filename);
                throw err;
            }
        }

        try {

            //load 814.ffmpeg.js (ffmpeg worker)
            let ffmpegWorkerURL = await fetchBlobUrl("814.ffmpeg.js");

            //load FFmpeg.js as text
            let ffmpegSrc;
            try{
                let file = tryFetchFromDisk("ffmpeg.js");
                if(file) ffmpegSrc = file;
                else ffmpegSrc = await (await fetchAndRetryWithNetFetch("ffmpeg.js")).text();
            }catch(err){
                Logger.error(this.meta.name, "An error occurred while fetching ffmpeg.js");
                throw err;
            }

            //patch worker URL in the source of ffmpeg.js (why is this a problem lmao)
            ffmpegSrc = ffmpegSrc.replace(`new URL(e.p+e.u(814),e.b)`, `"${ffmpegWorkerURL.toString()}"`);
            //blob ffmpeg
            const ffmpegURL = URL.createObjectURL(new Blob([ffmpegSrc]));

            // for some reason, for ffmpeg.js to work we need to set global define to undefined temporarily.
            // since for a brief moment it is undefined, any function that uses it may throw an error during that window.
            window.global.define = undefined;

            //load external JS as a script
            await new Promise((load, err) => {
                const ffmpegScriptElem = document.getElementById("ffmpegScript") || document.createElement("script");
                ffmpegScriptElem.id = "ffmpegScript";
                ffmpegScriptElem.src = ffmpegURL;
                ffmpegScriptElem.onload = load;
                ffmpegScriptElem.onerror = err;
                document.head.appendChild(ffmpegScriptElem);
            });

            window.global.define = defineTemp;

            //load ffmpeg core
            let ffmpegCoreURL = await fetchBlobUrl("ffmpeg-core.js");

            let ffmpegCoreWasmURL = await fetchBlobUrl("ffmpeg-core.wasm");

            if(FFmpegWASM && ffmpegCoreURL && ffmpegCoreWasmURL && ffmpegWorkerURL) {
                ffmpeg = new FFmpegWASM.FFmpeg();

                await ffmpeg.load({
                    coreURL: ffmpegCoreURL,
                    wasmURL: ffmpegCoreWasmURL
                });
                Logger.info(this.meta.name, "FFmpeg load success!");
                ffmpeg.on("log", ({ message }) => {
                    console.log(message);
                });
            }else{
                Logger.info(this.meta.name, FFmpegWASM);
                Logger.info(this.meta.name, ffmpegCoreURL);
                Logger.info(this.meta.name, ffmpegCoreWasmURL);
                Logger.info(this.meta.name, ffmpegWorkerURL);
                throw new Error("One or more of the necessary components failed to load.");
            }
        } catch(err) {
            UI.showToast("An error occured trying to load FFmpeg.wasm. Check console for details.", { type: "error", forceShow: true });
            Logger.info(this.meta.name, "FFmpeg failed to load. The clips bypass will not work without this unless the file is already the correct format! Include above and below error messages (if they exist) when reporting!");
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

    overrideExperiment(type, bucket){
        //console.log("applying experiment override " + type + "; bucket " + bucket);
        Dispatcher.dispatch({
            type: "EXPERIMENT_OVERRIDE_BUCKET",
            experimentId: type,
            experimentBucket: bucket
        });
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

            //if user is trying to set the theme to a default theme
            if(args.backgroundGradientPresetId == undefined){

                //If this number is -1, that indicates to the plugin that the current theme we're setting to is not a gradient nitro theme.
                settings.lastGradientSettingStore = -1;

                //save any changes to settings
                Data.save(this.meta.name, "settings", this.settings);
                
                //dispatch settings update to change themes
                Dispatcher.dispatch({
                    type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
                    changes: {
                        appearance: {
                            shouldSync: false, //prevent sync to stop discord api from butting in. Since this is not a nitro theme, shouldn't this be set to true? Idk, but I'm not touching it lol.
                            settings: {
                                theme: args.theme,
                                developerMode: true //genuinely have no idea what this does.
                            }
                        }
                    }
                });
                
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
            //get revealed text                               includes P{ encoded
            let revealedText = this.getRevealedText(user.id, `\uDB40\uDC50\uDB40\uDC7B`);
            //if there is no 3y3 encoded text, return original function.
            if(revealedText == undefined) return originalFunction(userId,size,shouldAnimate);

            //This regex matches P{*} . (Do not fuck with this)
            let regex = /P\{[^}]*?\}/;

            //Check if there are any matches in the custom status.
            let matches = revealedText.toString().match(regex);
            //if not, return orig function
            if(matches == undefined || matches == "") return originalFunction(userId,size,shouldAnimate);

            //if there is a match, take the first match and remove the starting "P{ and ending "}"
            let matchedText = matches[0].replace("P{","").replace("}","");

            //look for a file extension. If omitted, fallback to .gif .
            if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")) {
                matchedText += ".gif"; //No supported file extension detected. Falling back to a default file extension.
            }

            //add this user to the list of users who have the YABDP4Nitro user badge if we haven't added them already.
            if(!badgeUserIDs.includes(user.id)) badgeUserIDs.push(user.id);

            //return imgur url
            return `https://i.imgur.com/${matchedText}`;
        });
    }
    // #endregion

    // #region Custom PFP Encode
    //Custom PFP profile customization buttons and encoding code.
    async customProfilePictureEncoding(secondsightifyEncodeOnly){

        //wait for avatar customization section renderer to be loaded
        await Webpack.waitForModule(Webpack.Filters.byStrings("showRemoveAvatarButton", 'onAvatarChange', "isTryItOutFlow"));
        //store avatar customization section renderer module
        if(this.customPFPSettingsRenderMod == undefined) this.customPFPSettingsRenderMod = Webpack.getMangled(/showRemoveAvatarButton:.{1,3},errors:.{1,3},onAvatarChange/, {
            AvatarSection: x=>x
        });

        function emptyWarn(){
            UI.showToast("No URL was provided. Please enter an Imgur URL.", {type: "warning"});
        }

        Patcher.after(this.meta.name, this.customPFPSettingsRenderMod, "AvatarSection", (_, [args], ret) => {

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
                        if(profilePictureUrlInputValue == undefined || profilePictureUrlInputValue == ""){
                            emptyWarn();
                            return;
                        }

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
                                    Logger.error("YABDP4Nitro", err);
                                    UI.showToast("An error occurred. Are there multiple images in this album/gallery?", { type: "error", forceShow: true });
                                    return;
                                }
                            }
                            if(stringToEncode == ""){
                                UI.showToast("An error occurred: couldn't find file name.", { type: "error", forceShow: true });
                                Logger.error("YABDP4Nitro", "Couldn't find file name for some reason when grabbing Imgur URL for Custom PFP. Contact Riolubruh!");
                            }

                            //add starting "P{" , remove "imgur.com/" , and add ending "}"
                            stringToEncode = "P{" + stringToEncode.replace("imgur.com/", "") + "}";
                            //finally encode the string, adding a space before it so nothing fucks up
                            encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);

                            //If this is not an Imgur URL, yell at the user.
                        }else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
                            UI.showToast("Please use Imgur!", { type: "warning" });
                            return;
                        }

                        //if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
                        if(encodedStr == "") return;

                        //copy to clipboard
                        try{
                            DiscordNative.clipboard.copy(encodedStr);
                            UI.showToast("3y3 copied to clipboard!", { type: "info" });    
                        }catch(err){
                            UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                            Logger.error("YABDP4Nitro", err);
                        }
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
        Patcher.after(this.meta.name, UserProfileStore, "getUserProfile", (_, args, ret) => {
            //bad data checks
            if(ret == undefined) return;
            if(ret.userId == undefined) return;
            if(ret.badges == undefined) return;

            const badgesList = []; //list of the currently processed user's badge IDs

            for(let i = 0; i < ret.badges.length; i++){ //for each of currently processed user's badges
                badgesList.push(ret.badges[i].id); //add each of this user's badge IDs to badgesList
            }

            // if list of users that should have yabdp_user badge includes current user,
            // and they don't already have the badge applied,
            // and the user badge isn't disabled,
            if(badgeUserIDs.includes(ret.userId) && !badgesList.includes("yabdp_user") && !settings.disableUserBadge){
                //add the yabdp user badge to the user's list of badges.
                ret.badges.push({
                    id: "yabdp_user",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
                    description: "A fellow YABDP4Nitro user!",
                    link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
                });
            }

            //remove user badge if it is disabled
            if(settings.disableUserBadge){
                let userBadgeIndex = ret.badges.findIndex(badge => badge.id == "yabdp_user");
                if(userBadgeIndex > -1){
                    ret.badges.splice(userBadgeIndex, 1);
                    badgesList.splice(userBadgeIndex, 1);
                }
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
            // no 3y3 text detected. encoding...
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

        Patcher.after(this.meta.name, UserProfileStore, "getUserProfile", (_, [args], ret) => {
            //error prevention
            if(ret == undefined) return;
            if(ret.bio == undefined) return;

            //if bio includes encoded /fx 
            if(ret.bio.includes(`\uDB40\uDC2F\uDB40\uDC66\uDB40\uDC78`)){
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
            }
        }); //end of getUserProfile patch.

        //wait for profile effect section renderer to be loaded.
        await Webpack.waitForModule(Webpack.Filters.byStrings("initialSelectedEffectId", "isTryItOutFlow"));

        //fetch the module now that it's loaded
        if(this.profileEffectSectionRenderer == undefined) this.profileEffectSectionRenderer = Webpack.getMangled(/isTryItOutFlow:.{1,3}=!1,initialSelectedEffectId/, {
            ProfileEffectSection: x=>x
        });

        //patch profile effect section renderer function to run the following code after the function runs
        Patcher.after(this.meta.name, this.profileEffectSectionRenderer, "ProfileEffectSection", (_, [args], ret) => {

            const profileEffects = this.profileEffects;

            function ProfileEffects({query}){
                //if this is the tryItOut flow, don't do anything.
                if(args.isTryItOutFlow) return;

                let profileEffectChildren = [];
                let actualRuns = 0;

                //for each profile effect
                for(let i = 0; i < profileEffects.length; i++){

                    //get preview image url
                    let previewURL = profileEffects[i].config.thumbnailPreviewSrc;
                    let title = profileEffects[i].config.title;

                    //search
                    if(query.trim() != "") {
                        if(title) {
                            if(!title.toLowerCase().includes(query)) continue;
                        } else continue;
                    }

                    //encode 3y3
                    let encodedStr = secondsightifyEncodeOnly("/fx" + i); //fx0, fx1, etc.
                    //javascript that runs onclick for each profile effect button
                    let copyDecoration3y3 = function(){
                        try{
                            DiscordNative.clipboard.copy(" " + encodedStr);
                            UI.showToast("3y3 copied to clipboard!", { type: "info" });    
                        }catch(err){
                            UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                            Logger.error("YABDP4Nitro", err);
                        }
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
                    if((actualRuns + 1) % 4 == 0){
                        profileEffectChildren.push(
                            React.createElement("br")
                        );
                    }

                    actualRuns++;
                }
                return React.createElement('div', {
                    children: profileEffectChildren,
                    style: {
                        paddingTop: "10px"
                    }
                });
            }

            //Profile Effects Modal
            function EffectsModal(){
                const [query, setQuery] = React.useState("");

                return React.createElement("div", {
                    style: {
                        width: "100%",
                        display: "block",
                        color: "white",
                        whiteSpace: "nowrap",
                        overflow: "visible",
                        marginTop: ".5em"
                    },
                    children: [
                        React.createElement(Components.TextInput, {
                            value: query,
                            placeholder: "Search...",
                            onChange: (input) => setQuery(input)
                        }),
                        React.createElement('br'),
                        React.createElement(ProfileEffects, {query})
                    ]
                });
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
                        UI.showConfirmationModal("Change Profile Effect (YABDP4Nitro)", React.createElement(EffectsModal), {cancelText:""});
                    }

                })
            );
        }); //end patch of profile effect section renderer function

    } //End of profileFX()

    killProfileFX(){ //self explanatory, just tries to make it so any profile that has a profile effect appears without it
        Patcher.after(this.meta.name, UserProfileStore, "getUserProfile", (_, args, ret) => {
            if(ret?.profileEffectID === undefined) return;
            ret.profileEffectID = undefined;
        });
    }
    // #endregion

    //fetch collectibles - decorations and nameplates are stored in data
    storeProductsFromCategories = event => {
        if(event.categories){
            event.categories.forEach(category => {
                category.products.forEach(product => {
                    product.items.forEach(item => {
                        if(item.asset){
                            //store nameplates
                            if(item.asset.startsWith('nameplates')){
                                data.nameplatesV2[item.skuId] = {
                                    asset: item.asset.replace('nameplates/', ''),
                                    palette: item.palette,
                                    name: product.name
                                };
                                return;
                            } else if(item.asset.startsWith("a_")){ //store avatar decorations assets
                                data.avatarDecorations[item.id] = item.asset;
                                return;
                            }
                        }
                    });
                });
            });
        }
    };

    // #region Avatar Decorations
    //Everything related to fake avatar decorations.
    
    async fakeAvatarDecorations(){
        //apply decorations
        Patcher.after(this.meta.name, UserStore, "getUser", (_, args, ret) => {
            //basic error checking
            if(args == undefined) return;
            if(args[0] == undefined) return;
            if(ret == undefined) return;

            let avatarDecorations = data.avatarDecorations;

            if(!avatarDecorations) return;

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

            //                                      includes /a encoded?
            let revealedText = this.getRevealedText(args[0], `\uDB40\uDC2F\uDB40\uDC61`);
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

        //Wait for avatar decor customization section render module to be loaded.
        await Webpack.waitForModule(Webpack.Filters.byStrings("userAvatarDecoration", "guildAvatarDecoration", "pendingAvatarDecoration"));

        //Avatar decoration customization section render module/function.
        if(!this.decorationCustomizationSectionMod) this.decorationCustomizationSectionMod = Webpack.getMangled(/guildAvatarDecoration:.{1,3}?,pendingAvatarDecoration/, {
            AvatarDecorationSection: x=>x
        });
        //Avatar decoration customization section patch
        Patcher.after(this.meta.name, this.decorationCustomizationSectionMod, "AvatarDecorationSection", (_, [args], ret) => {
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
                        UI.showConfirmationModal("Change Avatar Decoration (YABDP4Nitro)", React.createElement(DecorModal), {cancelText:""});
                    }
                })
            );

            const secondsightifyEncodeOnly = this.secondsightifyEncodeOnly;

            function AvatarDecorations(){
                if(!data.avatarDecorations) throw new Error(`Cannot possibly continue! Avatar decoration data is undefined! Did the data JSON fail to load?`)
                let listOfDecorationIds = Object.keys(data.avatarDecorations);
                let avatarDecorationChildren = [];

                //for each avatar decoration
                for(let i = 0; i < listOfDecorationIds.length; i++){

                    const decorationId = listOfDecorationIds[i];
                    const assetHash = data.avatarDecorations[decorationId];

                    //remove existing nameplates from decoration list
                    if(assetHash.startsWith('nameplates/nameplates/')){
                        delete data.avatarDecorations[decorationId];
                        continue;
                    }

                    //encode to 3y3 and store clipboard copy in onclick event
                    let encodedStr = secondsightifyEncodeOnly("/a" + decorationId); // /a[id]
                    //javascript that runs onclick for each avatar decoration button
                    
                    let child = React.createElement("img", {
                        style: {
                            width: "23%",
                            cursor: "pointer",
                            marginLeft: "5px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "var(--background-tertiary)"
                        },
                        onClick: () => {
                            try{
                                DiscordNative.clipboard.copy(" " + encodedStr);
                                UI.showToast("3y3 copied to clipboard!", { type: "info" });    
                            }catch(err){
                                UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                                Logger.error("YABDP4Nitro", err);
                            }
                        },
                        onMouseOver: (e) => {
                            e.target.src = e.target.src.replace('.webp','.png');
                        },
                        onMouseLeave: (e) => {
                            e.target.src = e.target.src.replace('.png','.webp');
                        },
                        src: "https://cdn.discordapp.com/avatar-decoration-presets/" + assetHash + ".webp?size=128"
                    });
                    avatarDecorationChildren.push(child);

                    //add newline every 4th decoration
                    if((i + 1) % 4 == 0){
                        //avatarDecorationsHTML += "<br>"
                        avatarDecorationChildren.push(React.createElement("br"));
                    }
                }
                return React.createElement('div', {
                    children: avatarDecorationChildren
                });
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
                    children: React.createElement(AvatarDecorations)
                });
            }

        }); //end patch of profile decoration section renderer function

    } //End of fakeAvatarDecorations()
    // #endregion

    //#region Emote Uploader
    async UploadEmote(url, channelIdLmao, msg, emoji, runs, send){

        if(!msg[2].attachmentsToUpload) msg[2].attachmentsToUpload = [];
        if(emoji === undefined){
            let emoji = {animated: true, name: "default"};
        }

        if(msg === undefined){
            let msg = [channelIdLmao, {content: ""}, []];
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

        //if this is not the first emoji uploaded
        if(runs >= 1){
            //make the message attached to the upload have no text
            msg[1].content = "";
            //clear nonce so this is sent as a new message
            msg[2].nonce = "";
            //clear list of attachments
            msg[2].attachmentsToUpload = [];
        }

        try {
            //add attachment
            msg[2].attachmentsToUpload.unshift(fileUp);

            //send and wait till its sent before moving on
            await send.apply(undefined, msg);
           
        } catch(err){
            Logger.error(this.meta.name, err);
        }
    }
    // #endregion

    //#region Soundmoji Uploader
    async UploadSoundmojis(ids, channelId, msg, sounds, send){

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
            if(files.length <= 10){
                
                try {
                    send(channelId, msg, {attachmentsToUpload: files}) //finally finish the process of uploading
                } catch(err){
                    Logger.error(this.meta.name, err);
                }
            }else{
				//Upload 10 files at a time with a delay
                let firstTime = true;
                while (files.length){
                    let tenFiles = files.splice(0, 10);
                    // uploadOptions.uploads = tenFiles;
                    if(!firstTime) msg.content = ""
                    try {
                        send(channelId, msg, {attachmentsToUpload: tenFiles});
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

    //#region Customize Go Live V1
    customizeStreamButtons(){ //Apply custom resolution and fps options for Go Live Modal V1

        //This also effects Go Live Modal V2 but only after a refresh, not much I can do about that

        //If you're trying to figure this shit out yourself, I recommend uncommenting the line below.
        //console.log(StreamButtons);

        const settings = Data.load("YABDP4Nitro", "settings"); //just in case we can't access this;

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

        let fpsToSet = parseInt(settings.CustomFPS);
        //If custom FPS toggle is disabled, set to the default 60.
        if(!settings.CustomFPSEnabled)
            fpsToSet = 60;

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
    } //End of customizeStreamButtons()
    //#endregion

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
                send.apply(_, msg);
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
                    msg[1].validNonShortcutEmojis?.forEach?.(async emoji => {
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
                        let sound = SoundboardStore.getSoundById(id);
                        if(sound) {
                            sounds.push(sound);
                            ids.push(id);
                            if(sound?.emojiId == null && sound?.emojiName != null) { //default / system emoji
                                msg[1].content = msg[1].content.replace(soundmojis[i], `( ${sound.emojiName} ${sound.name} )`);
                            }
                            else if(sound?.emojiId != null) { // custom emoji
                                let emoji = EmojiStore.getCustomEmojiById(sound.emojiId);
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
                        await this.UploadEmote(emojiUrls[i], currentChannelId, msg, emojis[i], i, send)
                    }
                    //reset message content since we dont want a repeated message if soundmoji upload happens next
                    msg[1].content = "";
                }
            }
            
            if(settings.soundmojiEnabled){
                if(sounds.length > 0)
                    await this.UploadSoundmojis(ids, channelId, msg[1], sounds, send);
            }

            if(settings.stickerBypass){
                let stickerIds = msg[2]?.stickerIds;
                let currentChannelId = SelectedChannelStore.getChannelId();
                if(stickerIds){
                    for(let i = 0; i < stickerIds.length; i++){
                        let stickerId = stickerIds[i];
                        let stickerURL = "https://media.discordapp.net/stickers/" + stickerId + ".png?size=4096&quality=lossless";
                        let msgtemp = [...msg];
                        msgtemp[2].stickerIds = [];
                        if(i > 0) msgtemp[1].content = "";
        
                        if(settings.uploadStickers){
                            let emoji = new Object();
                            emoji.animated = false;
                            emoji.name = "sticker";
                            this.UploadEmote(stickerURL, currentChannelId, msgtemp, emoji, 0, send);
                            return;
                        } else{
                            let messageContent = { content: stickerURL, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] };
                            MessageActions.sendMessage(currentChannelId, messageContent, undefined, {});
                            return;
                        }
                    }
                }
    
                
            }

            if(emojis.length == 0 && sounds.length == 0){
                send.apply(_, msg);
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
        }
        //#endregion
    } //End of emojiBypass()

    //#region Fake Inline Emoji
    inlineFakemojiPatch(){
        //Somehow, this is the first time I've had to actually patch message rendering. (and it shows!)
        Patcher.before(this.meta.name, messageRender.renderMessage, "type", (_, [args]) => {
            for(let i = 0; i < args.content.length; i++){
                let contentItem = args.content[i];

                if(contentItem?.type?.type?.toString?.().includes?.("MASKED_LINK")){ //is it a hyperlink?

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

    //#region Video Quality Patch
    videoQualityModule(){ //Custom Bitrates, FPS, Resolution
        Patcher.before(this.meta.name, videoOptionFunctions, "updateVideoQuality", (e) => {
            if(settings.CustomBitrateEnabled){
                if(settings.minBitrate > 0){
                    //Minimum Bitrate
                    e.videoQualityManager.options.videoBitrateFloor = (settings.minBitrate * 1000);
                    e.videoQualityManager.options.videoBitrate.min = (settings.minBitrate * 1000);
                    e.videoQualityManager.options.desktopBitrate.min = (settings.minBitrate * 1000);
                }else{
                    e.videoQualityManager.options.videoBitrateFloor = 5e5;
                    e.videoQualityManager.options.videoBitrate.min = 5e5;
                    e.videoQualityManager.options.desktopBitrate.min = 5e5;
                }

                if(settings.targetBitrate > 0){
                    //Target Bitrate
                    e.videoQualityManager.options.desktopBitrate.target = (settings.targetBitrate * 1000);
                }
    
                if(settings.maxBitrate > 0){
                    //Maximum Bitrate
                    e.videoQualityManager.options.videoBitrate.max = (settings.maxBitrate * 1000);
                    e.videoQualityManager.options.desktopBitrate.max = (settings.maxBitrate * 1000);
                    e.videoQualityManager.goliveMaxQuality.bitrateMax = (settings.maxBitrate * 1000);
                }
            }

            if(settings.voiceBitrate > -1){
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
                this.UploadEmote(stickerURL, currentChannelId, msg, emoji, 1, send);
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
        Patcher.after(this.meta.name, UserProfileStore, "getUserProfile", (_, args, ret) => {
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

        if(this.colorPickerRendererMod == undefined) this.colorPickerRendererMod = Webpack.getMangled("__invalid_profileThemesSection", {
            ProfileThemesSection: x=>x
        });

        Patcher.after(this.meta.name, this.colorPickerRendererMod, "ProfileThemesSection", (_, args, ret) => {
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
                        let themeColors;
                        themeColors = UserSettingsAccountStore.getAllPending().pendingThemeColors;
                        if(!themeColors)
                            themeColors = UserSettingsAccountStore.getAllTryItOut().tryItOutThemeColors;
                        if(!themeColors){
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

                        try{
                            DiscordNative.clipboard.copy(encodedStr);
                            UI.showToast("3y3 copied to clipboard!", { type: "info" });    
                        }catch(err){
                            UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                            Logger.error("YABDP4Nitro", err);
                        }
                    }
                })
            );
        });

    } //End of encodeProfileColors()
    //#endregion

    //#region Banner Decoding
    //Decode 3y3 from profile bio and apply fake banners.
    bannerUrlDecoding(){

        let endpoint, bucket, prefix, usrBgData;

        //if userBg integration is enabled, and we havent already downloaded & parsed userBg data,
        if(settings.userBgIntegration && !fetchedUserBg){

            //userBg database url.
            const userBgJsonUrl = "https://usrbg.is-hardly.online/users";

            //download, then store json
            Net.fetch(userBgJsonUrl, { timeout: 100000 }).then(res => res.json().then(res => {
                usrBgData = res;
                endpoint = res.endpoint;
                bucket = res.bucket;
                prefix = res.prefix;
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
                    if(usrBgData?.users[user.userId]){
                        profile.banner = "funky_kong_is_epic"; //set banner id to fake value
                        profile.premiumType = 2; //set this profile to appear with premium rendering
                        return `${endpoint}/${bucket}/${prefix}${user.userId}?${usrBgData?.users[user.userId]}`; //return userBg banner URL and exit.
                    }
                }
            }

            //do original function if we don't have the user's bio
            if(profile.bio == undefined) return ogFunction(args);
            //              includes /B encoded?
            if(profile.bio.includes(`\uDB40\uDC42\uDB40\uDC7B`)){
                //reveal 3y3 encoded text, store as parsed
                let parsed = this.secondsightifyRevealOnly(profile.bio);
                //if there is no 3y3 encoded text, return original function
                if(parsed == undefined) return ogFunction(args);

                //This regex matches B{*} . Do not touch unless you know what you are doing.
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
            }else return ogFunction(args);
        }); //End of patch for getBannerURL
    } //End of bannerUrlDecoding()
    //#endregion

    //#region Banner Encoding
    //Make buttons in profile customization settings, encode imgur URLs and copy to clipboard
    //Documented/commented and partially rewritten to use React patching on 3/6/2024
    async bannerUrlEncoding(secondsightifyEncodeOnly){

        //wait for banner customization renderer module to be loaded
        await Webpack.waitForModule(Webpack.Filters.byStrings("showRemoveBannerButton", "isTryItOutFlow", "buttonsContainer"));
        if(this.profileBannerSectionRenderer == undefined) this.profileBannerSectionRenderer = Webpack.getMangled(/showRemoveBannerButton:.{1,3}?,errors:.{1,3}?,onBannerChange/, {
            BannerSection: x=>x
        });

        function emptyWarn(){
            UI.showToast("No URL was provided. Please enter an Imgur URL.", {type: "warning"});
        }

        Patcher.after(this.meta.name, this.profileBannerSectionRenderer, "BannerSection", (_, args, ret) => {
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

                        //if it's empty, stop processing and issue a warning.
                        if(profileBannerUrlInputValue == undefined){
                            emptyWarn();
                            return;
                        }
                        if(profileBannerUrlInputValue == ""){
                            emptyWarn();
                            return;
                        }

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
                                    Logger.error("YABDP4Nitro", err);
                                    UI.showToast("An error occurred. Are there multiple images in this album/gallery?", { type: "error", forceShow: true });
                                    return;
                                }
                            }
                            if(stringToEncode == ""){
                                UI.showToast("An error occurred: couldn't find file name.", { type: "error", forceShow: true });
                                Logger.error("YABDP4Nitro", "Couldn't find file name when trying to grab Imgur URL for Profile Banner for some reason. Contact Riolubruh.");
                                return;
                            }
                            //add starting "B{" , remove "imgur.com/" , and add ending "}"
                            stringToEncode = "B{" + stringToEncode.replace("imgur.com/", "") + "}";
                            //finally encode the string, adding a space before it so nothing fucks up
                            encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);

                            //If this is not an Imgur URL, yell at the user.
                        }else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
                            UI.showToast("Please use Imgur!", { type: "warning" });
                            return;
                        }

                        //if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
                        if(encodedStr == "") return;

                        //copy to clipboard
                        try{
                            DiscordNative.clipboard.copy(encodedStr);
                            UI.showToast("3y3 copied to clipboard!", { type: "info" });
                        }catch(err){
                            UI.showToast("Failed to copy to clipboard!", { type: "error", forceShow: true });   
                            Logger.error("YABDP4Nitro", err);
                        }
                        
                    } //end of onClick function
                }) //end of react createElement
            ); //end of profileBannerButton element push

        }); //end of patched function

    } //End of bannerUrlEncoding()
    //#endregion

    //#region App Icons
    appIcons(){
        //technically don't need this anymore but i'll leave it in for the sake of redundancy
        Patcher.before(this.meta.name, appIconButtonsModule, "CTAButtons", (_, args) => {
            args[0].disabled = false; //force buttons clickable
        });

        Patcher.instead(this.meta.name, AppIcon, "AppIconHome", (_, __, originalFunction) => {
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
            let res = await fetch(this.meta.updateUrl);

            if(!res.ok && res.status != 200){
                Logger.warn("YABDP4Nitro", res);
                res = await Net.fetch(this.meta.updateUrl);
                if(!res.ok && res.status != 200){
                    Logger.error("YABDP4Nitro", res);
                    throw new Error("Failed to check for updates!");
                }
            }

            let fileContent = await res.text();
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
            UI.showToast("[YABDP4Nitro] Failed to check for updates", { type: "error" });
            Logger.error(this.meta.name, err);
        }

    }

    newUpdateNotify(remoteMeta, remoteFile){
        Logger.info(this.meta.name, "A new update is available!");

        UI.showConfirmationModal("Update Available", [`Update ${remoteMeta.version} is now available for YABDP4Nitro!`, "Press Download Now to update!"], {
            confirmText: "Download Now",
            onConfirm: async (e) => {
                if(remoteFile){
                    await new Promise(r => fs.writeFile(path.join(Plugins.folder, `${this.meta.name}.plugin.js`), remoteFile, r));
                    try {
                        let currentVersionInfo = Data.load(this.meta.name, "currentVersionInfo");
                        currentVersionInfo.hasShownChangelog = false;
                        Data.save(this.meta.name, "currentVersionInfo", currentVersionInfo);
                    } catch(err){
                        UI.showToast("An error occurred when trying to download the update!", { type: "error", forceShow: true });
                    }
                }
            }
        });
    }
    //#endregion

    saveDataFile(){
        const dataFilePath = path.join(Plugins.folder, `${this.meta.name}.data.json`);
        try{
            fs.writeFileSync(dataFilePath, JSON.stringify(data));
        }catch(err){
            UI.showToast(`[${this.meta.name}] Error saving dava JSON. See console for error message.`, { type: "error", forceShow: true });
            Logger.error(this.meta.name, err);
        }
    }

    loadDataFile(){
        try{
            const dataFilePath = path.join(Plugins.folder, `${this.meta.name}.data.json`);
            if(!fs.existsSync(dataFilePath)){
                fs.writeFileSync(dataFilePath, '{}');
            }

            try{
                data = Object.assign({}, defaultData, JSON.parse(fs.readFileSync(dataFilePath)));
            }catch(err){
                UI.showToast(`[${this.meta.name}] Error parsing or reading data JSON.`, { type: "error", forceShow: true });
                Logger.warn(this.meta.name, "Error parsing or reading data JSON.");
                Logger.warn(this.meta.name, err);
                data = {};
            }
        }catch(err){
            UI.showToast(`[${this.meta.name}] An error occurred loading the data file.`, { type: "error", forceShow: true });
            Logger.error(this.meta.name, "An error occurred loading the data file.");
            Logger.error(this.meta.name, err);
        }
    }

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
            fs.rmSync(path.join(Plugins.folder, `${this.meta.name}.config.json`));
            Plugins.reload(this.meta.name);
            Plugins.enable(this.meta.name);
            return;
        }

        this.loadDataFile();

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
        
        let ffmpegScript = document.getElementById("ffmpegScript");
        if(ffmpegScript){
            ffmpegScript.remove();
        }

        Data.save("YABDP4Nitro", "settings", settings);
        this.saveDataFile();
        Logger.info(this.meta.name, "(v" + this.meta.version + ") has stopped.");
    }
    // #endregion
};
// #endregion
/*@end@*/
