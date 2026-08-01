/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @authorLink https://github.com/riolubruh
 * @version 6.10.5
 * @invite HfFxUbgsBc
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @donate https://github.com/riolubruh/YABDP4Nitro?tab=readme-ov-file#donate
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/YABDP4Nitro.plugin.js
 * @description Unlock all screensharing modes, use cross-server & GIF emotes, and more!
 */
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/index.tsx
var exports_src = {};
__export(exports_src, {
  default: () => Plugin
});
module.exports = __toCommonJS(exports_src);

// src/global/index.ts
var BetterDiscord = new BdApi("YABDP4Nitro");

// src/patches/modules/index.ts
var exports_modules = {};
__export(exports_modules, {
  FakeUserProfile: () => fakeUserProfile_default,
  FakeUser: () => fakeUser_default
});

// src/utils/index.ts
var { UserProfileStore, SelectedGuildStore, PresenceStore } = BetterDiscord.Webpack.Stores;
function getRevealedTextPerServer(userId, shouldInclude = "") {
  const guildId = SelectedGuildStore.getGuildId();
  if (guildId) {
    let userGuildProfile = UserProfileStore.getGuildMemberProfile(userId, guildId);
    if (userGuildProfile?.pronouns) {
      if (userGuildProfile.pronouns.includes(shouldInclude)) {
        let revealedText = secondsightifyRevealOnly(String(userGuildProfile.pronouns));
        if (revealedText != null && revealedText != "") {
          return revealedText;
        }
      }
    }
    if (userGuildProfile?.bio) {
      if (userGuildProfile.bio.includes(shouldInclude)) {
        let revealedText = secondsightifyRevealOnly(String(userGuildProfile.bio));
        if (revealedText != null && revealedText != "") {
          return revealedText;
        }
      }
    }
  }
}
function getRevealedText(userId, shouldInclude = "") {
  let revealedText = "";
  let perServer = getRevealedTextPerServer(userId, shouldInclude);
  if (perServer != null && perServer != "")
    return perServer;
  let userProfile = UserProfileStore.getUserProfile(userId);
  if (userProfile) {
    if (userProfile?.bio != null) {
      if (userProfile.bio.includes(shouldInclude)) {
        revealedText = secondsightifyRevealOnly(String(userProfile.bio));
        if (revealedText != null && revealedText != "") {
          return revealedText;
        }
      }
    }
  }
  let customStatusActivity;
  try {
    customStatusActivity = PresenceStore.getActivities(userId).find((e) => e.name == "Custom Status" || e.id == "custom");
  } catch (err) {
    BetterDiscord.Logger.error("Something went wrong getting custom status, oh god oh shit!", err);
  }
  if (customStatusActivity) {
    let customStatus = customStatusActivity.state;
    if (customStatus == undefined)
      return;
    if (customStatus.includes(shouldInclude)) {
      revealedText = secondsightifyRevealOnly(String(customStatus));
      return revealedText;
    }
  }
}
function secondsightifyRevealOnly(t) {
  if ([...t].some((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631)) {
    return ((t2) => [...t2].map((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631 ? String.fromCodePoint(x.codePointAt(0) - 917504) : x).join(""))(t);
  } else {
    return;
  }
}

// src/global/stores/SettingsStore.ts
var { Utils, Data } = BetterDiscord;
var defaultSettings = {
  emojiSize: 64,
  screenSharing: true,
  emojiBypass: true,
  emojiBypassType: 0,
  emojiBypassForValidEmoji: true,
  PNGemote: true,
  uploadStickers: false,
  CustomFPSEnabled: false,
  CustomFPS: 60,
  ResolutionEnabled: false,
  CustomResolution: 1440,
  CustomBitrateEnabled: false,
  minBitrate: -1,
  maxBitrate: -1,
  targetBitrate: -1,
  voiceBitrate: -1,
  ResolutionSwapper: true,
  stickerBypass: false,
  profileV2: false,
  forceStickersUnlocked: false,
  changePremiumType2: -1,
  videoCodec2: -1,
  clientThemes: true,
  lastGradientSettingStore: -1,
  fakeProfileThemes: true,
  removeProfileUpsell: false,
  removeScreenshareUpsell: true,
  fakeProfileBanners: true,
  fakeAvatarDecorations: true,
  unlockAppIcons: true,
  profileEffects: true,
  killProfileEffects: false,
  customPFPs: true,
  experiments: false,
  userPfpIntegration: true,
  userBgIntegration: true,
  useClipBypass: true,
  forceClip: false,
  checkForUpdates: true,
  fakeInlineVencordEmotes: true,
  soundmojiEnabled: false,
  useAudioClipBypass: true,
  forceAudioClip: false,
  zipClip: true,
  enableClipsExperiment: false,
  disableUserBadge: false,
  nameplatesEnabled: true,
  clipTimestamp: 2,
  removeNotStaffWarning: true,
  editMessageWithEmoji: true,
  extraContextMenus: true,
  userSharpenPreferences: {},
  sharpenStreams: false,
  displayNameStyles: true,
  customUserThemeSettings: {
    custom: false,
    theme: "dark"
  },
  appIcon: "AppIcon",
  voiceTileBannerBackground: false,
  advancedProfileCustomization: false
};
var SettingsStore_default = new class SettingsStore extends Utils.Store {
  settings = {
    ...defaultSettings,
    ...Data.load("settings") ?? {}
  };
  get(id) {
    return this.settings[id];
  }
  set(id, value) {
    this.settings = { ...this.settings, [id]: value };
    Data.save("settings", this.settings);
    this.emitChange();
  }
  del(id) {
    this.settings = { ...this.settings, [id]: defaultSettings[id] };
    Data.save("settings", this.settings);
    this.emitChange();
  }
  getAll() {
    return this.settings;
  }
};

// src/global/stores/BadgesStore.tsx
var specialThanks = [
  "122072911455453184",
  "760274365853335563",
  "482224256730791967",
  "1106012563835195412"
];
var Badges = {
  developers: {
    ids: ["359063827091816448", "917630027477159986"],
    badge: {
      id: "yabdp_developer",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi.gif",
      description: "YABDP4Nitro Developer!",
      link: "https://github.com/riolubruh/YABDP4Nitro#contributors"
    }
  },
  contributors: {
    ids: specialThanks,
    badge: {
      id: "yabdp_contributor",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi.gif",
      description: "YABDP4Nitro Contributor!",
      link: "https://github.com/riolubruh/YABDP4Nitro#contributors"
    }
  }
};
var BadgesStore_default = new class BadgesStore {
  foundUsers = [];
  add(id) {
    if (!this.foundUsers.includes(id)) {
      this.foundUsers.push(id);
    }
  }
  check(id) {
    return this.foundUsers.includes(id);
  }
  isImportant(id) {
    return [...Badges.developers.ids, ...Badges.contributors.ids].includes(id);
  }
  returnRespondingBadge(id) {
    const category = Object.values(Badges).find((x) => x.ids.includes(id));
    return category?.badge ?? {
      id: "yabdp_user",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png",
      description: "A fellow YABDP4Nitro user!",
      link: "https://github.com/riolubruh/YABDP4Nitro"
    };
  }
};

// src/patches/modules/fakeUserProfile.ts
var { UserProfileStore: UserProfileStore2 } = BetterDiscord.Webpack.Stores;
var REGEX_FX = /fx\d+/;
var fakeUserProfile_default = {
  name: "User Profile",
  description: "Performs fake profile stuffs.",
  ids: undefined,
  waitFor: [(x) => x.getUser],
  apply(finale, patcher) {
    patcher.after(UserProfileStore2, "getUserProfile", (_, [userId], ret) => {
      const killProfileEffects = SettingsStore_default.get("killProfileEffects");
      const shouldProfileV2 = SettingsStore_default.get("profileV2");
      const disableUserBadge = SettingsStore_default.get("disableUserBadge");
      BadgesStore_default.isImportant(userId) && BadgesStore_default.add(userId);
      shouldProfileV2 && (ret.premiumType = 2);
      const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);
      const userBio = ret?.bio;
      if (revealedSurrogate && revealedSurrogate.includes("fx") && !killProfileEffects) {
        BadgesStore_default.add(userId);
        let parsed = !revealedSurrogate ? secondsightifyRevealOnly(userBio) : revealedSurrogate;
        if (!parsed)
          return ret;
        if (parsed.includes("fx")) {
          const skuId = parsed.match(REGEX_FX)?.[0]?.slice(2);
          if (!skuId)
            return ret;
          ret.profileEffect = {
            skuId,
            expiresAt: undefined
          };
        }
      }
      if (killProfileEffects) {
        ret.profileEffect = {};
      }
      const foundBadge = !Object.values(ret?.badges ?? {}).find((x) => x.id.startsWith("yabdp"));
      if (!disableUserBadge && foundBadge && BadgesStore_default.check(ret?.userId)) {
        ret.badges.push(BadgesStore_default.returnRespondingBadge(ret.userId));
      }
      return ret;
    });
  }
};
// src/patches/modules/fakeUser.ts
var { UserStore } = BetterDiscord.Webpack.Stores;
var DNS_REGEX = /S\{[^}]*?\}/;
var DECOR_REGEX = /\/a\d+/;
var NAMEPLATE_REGEX = /n\{[^}]*?\}/;
function getStyleData(surrogate) {
  let fontId = Number(surrogate?.[0]);
  let effectId = Number(surrogate?.[1]);
  let color1 = Number(surrogate?.[2]);
  let color2;
  if (surrogate.length >= 4) {
    color2 = Number(surrogate?.[3]);
  }
  return {
    fontId,
    effectId,
    color1,
    color2,
    isNaN: [fontId, effectId, color1, color2].map((id) => Number.isNaN(id)).includes(true)
  };
}
var fakeUser_default = {
  name: "User Profile",
  description: "Performs fake profile stuffs.",
  ids: undefined,
  waitFor: [(x) => x.getUser],
  apply(finale, patcher) {
    patcher.after(UserStore, "getUser", (_, [userId], ret) => {
      const dnsEnabled = SettingsStore_default.get("displayNameStyles");
      const decorEnabled = SettingsStore_default.get("fakeAvatarDecorations");
      const nameplatesEnabled = SettingsStore_default.get("nameplatesEnabled");
      if (dnsEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC53\uDB40\uDC7B`);
        const match = revealedText?.match(DNS_REGEX)?.[0]?.slice(2, -1)?.split(",");
        if (match) {
          const styleData = getStyleData(match);
          styleData && Object.defineProperty(ret, "displayNameStyles", {
            value: {
              fontId: styleData.fontId,
              effectId: styleData.effectId,
              colors: [styleData.color1, styleData?.color2 ? styleData.color2 : null].filter(Boolean)
            },
            enumerable: true,
            writable: true,
            configurable: true
          });
        }
      }
      if (decorEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC2F\uDB40\uDC61`);
        const skuId = revealedText?.match(DECOR_REGEX)?.[0]?.slice(2);
        if (skuId) {
          ret.avatarDecorationData = {
            skuId
          };
        }
      }
      if (nameplatesEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC6E\uDB40\uDC7B`);
        const match = revealedText?.match(NAMEPLATE_REGEX)?.[0]?.slice(2, -1)?.split(",");
        if (match) {
          const [skuId, palette] = match;
          !ret.collectibles && (ret.collectibles = {});
          ret.collectibles.nameplate = {
            skuId,
            palette
          };
        }
      }
    });
  }
};
// src/patches/index.ts
var PatcherAPI = new BdApi("Patcher");
async function load() {
  const loaded = [];
  for (const [path, module2] of Object.entries(exports_modules)) {
    const Patch = module2;
    const finale = {};
    if (Array.isArray(Patch.ids)) {
      finale["ids"] = await Promise.all([Patch.ids.map((x) => BetterDiscord.Utils.forceLoad(x))]);
    }
    if (Array.isArray(Patch.waitFor)) {
      finale["modules"] = await Promise.all([Patch.waitFor.map((x) => BetterDiscord.Webpack.waitForModule(x))]);
    }
    Patch.apply(finale, PatcherAPI.Patcher);
  }
  return () => {
    for (const patch of loaded)
      patch.revert?.();
    PatcherAPI.Patcher.unpatchAll();
  };
}
// src/global/changelog/changelog.json
var changelog_default = {
  title: "Huge Revamp",
  subtitle: "Plugin improvements and entire revamp!",
  banner: "https://i.kym-cdn.com/photos/images/original/001/652/630/6e8.jpg",
  changes: [{
    title: "YABDP4Nitro",
    type: "improved",
    items: [
      "Fully rewritten internals from the ground up",
      "Improved performance and stability",
      "Cleaner, more maintainable codebase for future updates"
    ]
  }]
};

// src/global/changelog/index.tsx
function startChangelog() {
  console.log(changelog_default);
  BetterDiscord.UI.showChangelogModal(changelog_default);
}

// src/index.tsx
var { Components } = BetterDiscord;
var { React } = BetterDiscord;
var SettingTypes = {
  number: Components.NumberInput,
  bigint: Components.NumberInput,
  boolean: Components.SwitchInput,
  string: Components.TextInput
};

class Plugin {
  async start() {
    startChangelog();
    await load();
  }
  stop() {
    new BdApi("Patcher").Patcher.unpatchAll();
  }
  getSettingsPanel() {
    return () => {
      const settings = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => SettingsStore_default.getAll());
      return /* @__PURE__ */ React.createElement(Components.SettingGroup, {
        name: "Settings"
      }, Object.entries(settings).map(([key, value]) => {
        const CompType = SettingTypes[typeof value];
        return /* @__PURE__ */ React.createElement(Components.SettingItem, {
          key,
          note: key
        }, CompType ? /* @__PURE__ */ React.createElement(CompType, {
          onChange: (v) => SettingsStore_default.set(key, v),
          value
        }) : /* @__PURE__ */ React.createElement(Components.TextInput, {
          value: JSON.stringify(value),
          disabled: true
        }));
      }));
    };
  }
}
