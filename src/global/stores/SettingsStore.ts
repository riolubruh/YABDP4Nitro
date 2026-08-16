import {BetterDiscord} from "@shared/";

const {Utils, Data} = BetterDiscord;

export const defaultSettings = {
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
    "changePremiumType2": -1,
    "videoCodec2": -1,
    "clientThemes": true,
    "lastGradientSettingStore": -1,
    "fakeProfileThemes": true,
    "removeProfileUpsell": true,
    "removeScreenshareUpsell": true,
    "fakeProfileBanners": true,
    "fakeAvatarDecorations": true,
    "unlockAppIcons": true,
    "profileEffects": true,
    "profileFrames": true,
    "killProfileEffects": false,
    "customPFPs": true,
    "experiments": false,
    "userPfpIntegration": true,
    "userBgIntegration": true,
    "useClipBypass": true,
    "forceClip": false,
    "checkForUpdates": true,
    "fakeInlineVencordEmotes": true,
    "soundmojiEnabled": false,
    "useAudioClipBypass": true,
    "forceAudioClip": false,
    "zipClip": true,
    "enableClipsExperiment": false,
    "disableUserBadge": false,
    "nameplatesEnabled": true,
    "clipTimestamp": 2,
    "removeNotStaffWarning": true,
    "editMessageWithEmoji": true,
    "extraContextMenus": true,
    "userSharpenPreferences": {} as Record<string, unknown>,
    "sharpenStreams": false,
    "displayNameStyles": true,
    "customUserThemeSettings": {
        custom: false,
        theme: "dark"
    },
    "appIcon": "AppIcon",
    "voiceTileBannerBackground": false,
    "advancedProfileCustomization": false,
    "lastChangelogVersion": "6.10.7",
    "installedVersion": "6.10.7",
    "customVideoFilter": {
        link: "https://cdn.discordapp.com/attachments/1334347004935147551/1538395403047673866/medic_balling.mov?ex=6a8285de&is=6a81345e&hm=f9f1f3be500425c255a95606ebf6f8d05eed06477f0f048906cfe9170c842070&", // use a CDN
        type: "mp4"
    },
    "customVideoFilterEnabled": false,
} as const satisfies Record<string, unknown>;

type SettingsResult = { [K in keyof typeof defaultSettings]: (typeof defaultSettings)[K] };
type SettingsKey = keyof SettingsResult;

type Listener<K extends SettingsKey> = (value: SettingsResult[K]) => void;

export default new class SettingsStore extends Utils.Store {
    private settings: SettingsResult = {
        ...defaultSettings,
        ...(Data.load("settings") as Partial<SettingsResult> ?? {})
    };

    private listeners = new Map<SettingsKey, Set<Listener<any>>>();

    get<K extends SettingsKey>(id: K): SettingsResult[K] {
        return this.settings[id];
    }

    set<K extends SettingsKey>(id: K, value: SettingsResult[K]) {
        this.settings = {...this.settings, [id]: value};
        Data.save("settings", this.settings);
        this.emitChange();
        this.notify(id, value);
    }

    del<K extends SettingsKey>(id: K) {
        this.settings = {...this.settings, [id]: defaultSettings[id]};
        Data.save("settings", this.settings);
        this.emitChange();
        this.notify(id, this.settings[id]);
    }

    getAll(): SettingsResult {
        return this.settings;
    }

    subscribe<K extends SettingsKey>(id: K, callback: Listener<K>): () => void {
        if (!this.listeners.has(id)) {
            this.listeners.set(id, new Set());
        }
        this.listeners.get(id)!.add(callback);

        return () => {
            this.listeners.get(id)?.delete(callback);
        };
    }

    private notify<K extends SettingsKey>(id: K, value: SettingsResult[K]) {
        this.listeners.get(id)?.forEach(cb => cb(value));
    }
}