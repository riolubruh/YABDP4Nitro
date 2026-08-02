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
var DefaultOptions = {
  options: {
    searchExports: true
  }
};
var GlobalModules = BetterDiscord.Webpack.getBulkKeyed({
  Typing: {
    filter: BetterDiscord.Webpack.Filters.byKeys("startTyping")
  },
  Endpoints: {
    filter: (x) => x.STORE_LAYOUT && x.USER_ACTIVITY_SUBSCRIBE,
    ...DefaultOptions
  },
  Dispatcher: {
    filter: BetterDiscord.Webpack.Filters.byStoreName("A"),
    ...DefaultOptions,
    options: {
      key: "_dispatcher"
    }
  },
  HTTP: {
    filter: (m) => typeof m === "object" && m.del && m.put,
    ...DefaultOptions
  },
  Gateway: {
    filter: BetterDiscord.Webpack.Filters.byStoreName("GatewayConnectionStore")
  },
  Flux: {
    filter: BetterDiscord.Webpack.Filters.bySource("OfflineCacheStore"),
    options: {
      key: "Ay"
    }
  },
  Intl: {
    filter: BetterDiscord.Webpack.Filters.byKeys("intl")
  },
  ModalModule: {
    filter: BetterDiscord.Webpack.Filters.byKeys("openModal")
  },
  SimpleMarkdownWrapper: {
    filter: (m) => m.reactParserFor
  },
  AssetModule: {
    filter: BetterDiscord.Webpack.Filters.bySource("ApplicationAssetUtils"),
    map: {
      getAssetImage: BetterDiscord.Webpack.Filters.byStrings(".TWITCH?null"),
      getAssetImageId: BetterDiscord.Webpack.Filters.byStrings(".serialize(t)"),
      fetchApplicationAssets: BetterDiscord.Webpack.Filters.byStrings("APPLICATION_ASSETS_UPDATE"),
      getAssetImages: BetterDiscord.Webpack.Filters.byStrings(`.startsWith("http:")`)
    }
  },
  Lodash: {
    filter: BetterDiscord.Webpack.Filters.bySource('="Expected a function",')
  }
});

// src/patches/modules/index.ts
var exports_modules = {};
__export(exports_modules, {
  streamBypass: () => streamBypass_default,
  UnlockEmojis: () => unlockEmojis_default,
  SendMessage: () => _sendMessage_default,
  FakeUserProfile: () => fakeUserProfile_default,
  FakeUser: () => fakeUser_default,
  FakeBanners: () => banners_default,
  AppIcons: () => appIcons_default,
  AnimatedUserBanner: () => getUserBannerURL_default,
  AllowClips: () => allowClips_default
});

// src/global/stores/CustomUserProfileStore.ts
var CustomUserProfileStore_default = new class CustomUserProfileStore {
  profiles = [];
  getMember(id, guildId) {
    return this.profiles.find((x) => x?.userId == id && x.guildId == guildId);
  }
  cacheMember(user) {
    this.profiles.push(user);
  }
};

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
  advancedProfileCustomization: false,
  lastChangelogVersion: "1.0.0"
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

// src/utils/index.ts
var { UserProfileStore, SelectedGuildStore, PresenceStore, ChannelStore } = BetterDiscord.Webpack.Stores;
function getRevealedTextPerServer(userId, shouldInclude = "") {
  const guildId = SelectedGuildStore.getGuildId();
  if (!guildId)
    return;
  const userGuildProfile = UserProfileStore.getGuildMemberProfile(userId, guildId);
  userGuildProfile && Object.defineProperty(userGuildProfile, "guildId", { value: guildId });
  userGuildProfile && CustomUserProfileStore_default.cacheMember(userGuildProfile);
  if (userGuildProfile?.pronouns && userGuildProfile.pronouns.includes(shouldInclude)) {
    return secondsightifyRevealOnly(String(userGuildProfile.pronouns));
  }
  if (userGuildProfile?.bio && userGuildProfile.bio.includes(shouldInclude)) {
    return secondsightifyRevealOnly(String(userGuildProfile.bio));
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
function shouldSkipEmojiBypass(emoji, currentChannelId) {
  const shouldAlwaysUseEmojiBypass = SettingsStore_default.get("emojiBypassForValidEmoji");
  return emoji.type === "UNICODE" || !emoji.guildId || !emoji.id || emoji.useSpriteSheet || shouldAlwaysUseEmojiBypass && (SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId && !emoji.animated && (ChannelStore.getChannel(currentChannelId.toString()).type <= 0 || ChannelStore.getChannel(currentChannelId.toString()).type == 11) && emoji.available || emoji.managed);
}
function getEmojiExtension(emoji) {
  const pngEmote = SettingsStore_default.get("PNGemote");
  return `${emoji.animated ? ".webp" : pngEmote ? ".png" : ".webp"}`;
}
function getEmojiUrl(emoji) {
  const emojiSize = SettingsStore_default.get("emojiSize");
  const EMOJI_PREFIX = "https://cdn.discordapp.com/emojis/";
  return `${EMOJI_PREFIX}${emoji.id}${getEmojiExtension(emoji)}?animated=${emoji.animated}&size=${emojiSize}&quality=lossless`;
}
function getEmojiString(emoji) {
  return `<${emoji.animated ? "a:" : ":"}${emoji.originalName ? emoji.originalName : emoji.name}:${emoji.id}>`;
}

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
var { UserProfileStore: UserProfileStore2, SelectedGuildStore: SelectedGuildStore2 } = BetterDiscord.Webpack.Stores;
var REGEX_FX = /fx\d+/;
function decodeProfileColors(string) {
  if (!string)
    return null;
  const colorString = string.match(/\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u);
  if (colorString == null)
    return null;
  let parsed = [...colorString[0]].map((c) => String.fromCodePoint(c.codePointAt(0) - 917504)).join("");
  let colors = parsed.substring(1, parsed.length - 1).split(",").map((x) => parseInt(x.replace("#", "0x"), 16));
  return colors;
}
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
      const profileThemesEnabled = SettingsStore_default.get("fakeProfileThemes");
      if (!ret)
        return;
      BadgesStore_default.isImportant(userId) && BadgesStore_default.add(userId);
      const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);
      const guildId = SelectedGuildStore2.getGuildId();
      (shouldProfileV2 || ret?.bio?.includes?.(`\uDB40\uDC42\uDB40\uDC7B`) || revealedSurrogate?.includes("B{")) && (ret.premiumType = 2);
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
      if (profileThemesEnabled) {
        const userGuildMemberCache = CustomUserProfileStore_default.getMember(userId, guildId);
        const colors = {
          serverPronouns: decodeProfileColors(userGuildMemberCache?.pronouns),
          serverBio: decodeProfileColors(userGuildMemberCache?.bio),
          global: decodeProfileColors(ret?.bio)
        };
        ret.themeColors = Object.values(colors).find(Boolean);
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
        const match = revealedText?.match(DNS_REGEX)?.[0]?.slice?.(2, -1)?.split?.(",");
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
        const skuId = revealedText?.match(DECOR_REGEX)?.[0]?.slice?.(2);
        if (skuId) {
          ret.avatarDecorationData = {
            skuId
          };
        }
      }
      if (nameplatesEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC6E\uDB40\uDC7B`);
        const match = revealedText?.match(NAMEPLATE_REGEX)?.[0]?.slice(2, -1)?.split?.(",");
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
// src/patches/modules/allowClips.ts
var { ClipsStore } = BetterDiscord.Webpack.Stores;
var GLOBAL_SOURCE = BetterDiscord.Webpack.Filters.bySource("useEnableClips");
var allowClips_default = {
  name: "allowClips",
  description: "Allow clips",
  waitFor: [GLOBAL_SOURCE],
  mangled: {
    useEnableClips: (x) => x.toString().includes('getConfig({location:"useEnableClips"'),
    areClipsEnabled: (x) => x.toString().includes("areClipsEnabled")
  },
  apply(finale, patcher) {
    Object.entries(finale.mangled).map(([key, value]) => {
      patcher.instead(finale.mangled, key, () => true);
    });
    ["isViewerClippingAllowedForUser", "isClipsEnabledForUser", "isVoiceRecordingAllowedForUse"].map((x) => patcher.instead(ClipsStore, x, () => true));
  }
};
// src/global/stores/UserBackgroundStore.ts
var USER_BG = "https://usrbg.is-hardly.online/users";
var UserBackgroundStore_default = new class UserBackgroundStore extends BetterDiscord.Utils.Store {
  users = {};
  meta = {};
  get(userId) {
    return this.users[userId];
  }
  format(userId) {
    const userHash = this.get(userId);
    return `https://usrbg.is-hardly.online/${this.meta.bucket}/${this.meta.prefix.slice(0, this.meta.prefix.length - 1)}/${userId}?${userHash}`;
  }
  async fetch() {
    const data = await BetterDiscord.Net.fetch(USER_BG);
    const response = await data.json();
    this.meta = { ...this.meta, ["bucket"]: response.bucket, ["prefix"]: response.prefix };
    this.users = response.users;
  }
};

// src/patches/modules/banners.tsx
var BANNER_REGEX = /B\{[^}]*?\}/;
var banners_default = {
  name: "fakeBanners",
  description: "3y3 banners",
  ids: undefined,
  waitFor: [BetterDiscord.Webpack.Filters.bySource('backgroundColor:"COMPLETE"===')],
  mangled: {
    renderBanner: (x) => x?.toString?.()?.includes?.("canUsePremiumProfileCustomization")
  },
  apply(finale, patcher) {
    patcher.after(finale.mangled, "renderBanner", (_, [props], ret) => {
      if (!SettingsStore_default.get("fakeProfileBanners"))
        return ret;
      const unpatch = patcher.after(ret, "type", (a, b, c) => {
        const parsed = getRevealedText(props.user.id);
        const match = parsed?.match(BANNER_REGEX)?.[0];
        const matched = match?.slice(2, -1);
        c.props.bannerSrc = matched ? `https://i.imgur.com/${matched}` : UserBackgroundStore_default.format(props.user.id);
        unpatch();
      });
      return ret;
    });
  }
};
// src/patches/modules/_sendMessage.ts
var { StickersStore } = BetterDiscord.Webpack.Stores;
var StickerTypeToExtension;
((StickerTypeToExtension2) => {
  StickerTypeToExtension2[StickerTypeToExtension2[".png"] = 1] = ".png";
  StickerTypeToExtension2[StickerTypeToExtension2[".png"] = 2] = ".png";
  StickerTypeToExtension2[StickerTypeToExtension2[".json"] = 3] = ".json";
  StickerTypeToExtension2[StickerTypeToExtension2[".gif"] = 4] = ".gif";
})(StickerTypeToExtension ||= {});
var CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", { searchExports: true });
async function downloadAndUploadUrls(filesToDownload, channelId, msg, extraData, send) {
  if (!filesToDownload.length)
    return;
  const preexisting = extraData.attachmentsToUpload ?? [];
  extraData.attachmentsToUpload = preexisting;
  const uploads = await Promise.all(filesToDownload.map(async (f) => {
    const blob = await BetterDiscord.Net.fetch(f.url).then((r) => r.blob());
    return new CloudUploader({ file: new File([blob], f.filename), isClip: false, isThumbnail: false, platform: 1, isImage: true }, channelId, false, 0);
  }));
  if (preexisting.length) {
    await send(channelId, msg, extraData);
  } else {
    extraData.attachmentsToUpload = [uploads.shift()];
    await send(channelId, msg, extraData);
  }
  extraData.attachmentsToUpload = [];
  msg.content = "";
  for (const upload of uploads) {
    await send(channelId, { content: "" }, { attachmentsToUpload: [upload] });
  }
}
var _sendMessage_default = {
  name: "Send Message",
  description: "Upload emoji, soundmoji, stickers, and insta-clips.",
  ids: undefined,
  waitFor: [(x) => x._sendMessage],
  apply(finale, patcher) {
    patcher.instead(finale.modules[0], "_sendMessage", async (_, [channelId, msg, extraData], send) => {
      const emojiBypassEnabled = SettingsStore_default.get("emojiBypass");
      const emojiBypassType = SettingsStore_default.get("emojiBypassType");
      const pngEmote = SettingsStore_default.get("PNGemote");
      const soundBoardEnabled = SettingsStore_default.get("soundmojiEnabled");
      const stickersEnabled = SettingsStore_default.get("stickerBypass");
      if (extraData.poll || extraData.activityAction || msg.location === "forwarding")
        return send(_, msg);
      let urlsToUpload = [];
      console.log(channelId);
      console.log(msg);
      console.log(extraData);
      for (const emoji of msg.validNonShortcutEmojis) {
        if (!emojiBypassEnabled && !(emojiBypassType === 0))
          break;
        if (shouldSkipEmojiBypass(emoji, channelId))
          continue;
        const emojiString = getEmojiString(emoji);
        if (msg.content.includes(`-${emojiString}`)) {
          msg.content = msg.content.replace("-" + emojiString, emojiString);
          continue;
        }
        const emojiUrl = getEmojiUrl(emoji);
        msg.content = msg.content.replace(emojiString, "");
        urlsToUpload.push({
          url: emojiUrl,
          filename: emoji.name + getEmojiExtension(emoji)
        });
      }
      if (extraData.stickerIds && stickersEnabled) {
        for (const stickerId of extraData.stickerIds) {
          const STICKER_PREFIX = "https://media.discordapp.net/stickers/";
          console.log(stickerId);
          console.log(StickersStore.getStickerById(stickerId));
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
      if (urlsToUpload.length > 0)
        downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send);
      else
        return send(channelId, msg, extraData);
    });
  }
};
// src/patches/modules/unlockEmojis.ts
var unlockEmojis_default = {
  name: "Unlock Emojis",
  description: "Fully unlocks emojis.",
  waitFor: [BetterDiscord.Webpack.Filters.byKeys("isEmojiFilteredOrLocked")],
  apply(finale, patcher) {
    ["isEmojiFilteredOrLocked", "isEmojiDisabled", "isEmojiFiltered", "isEmojiPremiumLocked"].map((x) => patcher.instead(finale.modules[0], x, () => false));
    patcher.instead(finale.modules[0], "getEmojiUnavailableReason", () => {
      return;
    });
  }
};
// src/patches/modules/getUserBannerURL.ts
var getUserBannerURL_default = {
  name: "getUserBannerURL",
  description: "Force animate the user banner URL",
  waitFor: [(x) => x.getEmojiURL],
  apply(finale, patcher) {
    const AvatarDefaults = finale.modules[0];
    patcher.before(AvatarDefaults, "getUserBannerURL", (_, args) => {
      args[0].canAnimate = true;
    });
  }
};
// src/patches/modules/appIcons.tsx
var { AppIconPersistedStoreState } = BetterDiscord.Webpack.Stores;
var bypassMap = {
  emojisEverywhere: "emojiBypass",
  animatedEmojis: "emojiBypass",
  appIcons: "unlockAppIcons",
  profilePremiumFeatures: "removeProfileUpsell",
  clientThemes: "clientThemes",
  soundboardEverywhere: "soundmojiEnabled"
};
var appIcons_default = {
  name: "appIcons",
  description: "Lets user select app icon",
  apply(finale, patcher) {
    GlobalModules.Dispatcher.dispatch({
      type: "APP_ICON_UPDATED",
      id: SettingsStore_default.get("appIcon")
    });
    const AppIcon = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("M19.73 4.87a18.2"), {
      render: (x) => x
    });
    const CustomAppIcon = BetterDiscord.Webpack.getByStrings(".iconSource,width:");
    const canUserUse = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource(".getFeatureValue(", "isPremium"), {
      canUserUse: (x) => typeof x === "function" && x.toString?.().includes?.(".getFeatureValue(")
    }, { mapDeclarations: true });
    patcher.instead(AppIcon, "render", (_, [args], callback) => {
      const desktopIcon = AppIconPersistedStoreState.getCurrentDesktopIcon();
      if (desktopIcon == "AppIcon") {
        return callback(args);
      } else {
        return /* @__PURE__ */ React.createElement(CustomAppIcon, {
          size: 40,
          id: SettingsStore_default.get("appIcon")
        });
      }
    });
    patcher.instead(canUserUse, "canUserUse", (_, [feature, user], originalFunction) => {
      console.log(feature);
      const settingKey = bypassMap[feature.name];
      if (settingKey && SettingsStore_default.get(settingKey))
        return true;
      return originalFunction(feature, user);
    });
  }
};
// src/patches/modules/streamBypass.ts
var LadderModule = BetterDiscord.Webpack.getByKeys("calculateLadder", { searchExports: true });
var streamBypass_default = {
  name: "streamBypass",
  description: "Custom Bitrates, FPS, Resolution",
  waitFor: [BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"), BetterDiscord.Webpack.Filters.bySource("preset)&&", "resolution&&", "fps&&")],
  apply(finale, patcher) {
    const _class = finale.modules[0];
    patcher.before(_class.prototype, "updateVideoQuality", (e) => {
      const customBitrateEnabled = SettingsStore_default.get("CustomBitrateEnabled");
      const minBitrate = SettingsStore_default.get("minBitrate") > 0 ? SettingsStore_default.get("minBitrate") * 1000 : 500000;
      const targetBitrate = SettingsStore_default.get("targetBitrate") > 0 ? SettingsStore_default.get("targetBitrate") * 1000 : 4500000;
      const maxBitrate = SettingsStore_default.get("maxBitrate") > 0 ? SettingsStore_default.get("maxBitrate") * 1000 : 9000000;
      const voiceBitrate = SettingsStore_default.get("voiceBitrate") * 1000;
      const vqm = e.videoQualityManager;
      const vqmOpt = vqm.options;
      if (customBitrateEnabled) {
        vqmOpt.desktopBitrate.min = minBitrate;
        vqmOpt.desktopBitrate.target = targetBitrate;
        vqmOpt.desktopBitrate.max = maxBitrate;
      }
      const maxVideoQuality = {
        width: e.videoStreamParameters[0].maxResolution.width,
        height: e.videoStreamParameters[0].maxResolution.height,
        framerate: e.videoStreamParameters[0].maxFrameRate,
        pixelCount: 0
      };
      maxVideoQuality.pixelCount = maxVideoQuality.width * maxVideoQuality.height;
      let videoCapture = {
        width: maxVideoQuality.width > 0 ? maxVideoQuality.width : screen.width,
        height: maxVideoQuality.height > 0 ? maxVideoQuality.height : screen.height,
        framerate: e.videoStreamParameters[0].maxFrameRate
      };
      voiceBitrate > 0 && (e.voiceBitrate = voiceBitrate);
      vqm.options.videoBudget = videoCapture;
      vqm.options.videoCapture = videoCapture;
      let pixelBudget = videoCapture.width * videoCapture.height;
      vqm.ladder.pixelBudget = pixelBudget;
      vqm.ladder.ladder = LadderModule.calculateLadder(pixelBudget);
      vqm.ladder.orderedLadder = LadderModule.calculateOrderedLadder(vqm.ladder.ladder);
    });
    patcher.instead(finale.modules[1], Object.keys(finale.modules[1]).find(Boolean), () => {
      return true;
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
      finale.ids = await Promise.all(Patch.ids.map((x) => BetterDiscord.Utils.forceLoad(x)));
    }
    if (Array.isArray(Patch.waitFor)) {
      finale.modules = await Promise.all(Patch.waitFor.map((x) => BetterDiscord.Webpack.waitForModule(x)));
    }
    if (Patch.mangled) {
      finale.mangled = BetterDiscord.Webpack.getMangled(Patch.waitFor[0], Patch.mangled);
    }
    Patch.apply(finale, PatcherAPI.Patcher);
    loaded.push(Patch);
  }
  return () => {
    for (const patch of loaded)
      patch.revert?.();
    PatcherAPI.Patcher.unpatchAll();
  };
}

// src/global/changelog/changelog.json
var changelog_default = {
  "7.0.0": [{
    banner: "https://i.kym-cdn.com/photos/images/original/001/652/630/6e8.jpg",
    changes: [{
      title: "YABDP4Nitro Huge Revamp",
      type: "improved",
      items: [
        "Fully rewritten internals from the ground up",
        "Improved performance and stability",
        "Cleaner, more maintainable codebase for future updates"
      ]
    }]
  }],
  "1.0.0": [{
    changes: [{
      title: "test",
      type: "improved",
      items: ["test"]
    }]
  }]
};
// package.json
var package_default = {
  name: "YABDP4Nitro",
  module: "src/index.tsx",
  type: "module",
  version: "7.0.0",
  private: true,
  devDependencies: {
    "@types/bun": "latest"
  },
  scripts: {
    prod: "bun run ./build/build.ts"
  },
  peerDependencies: {
    typescript: "^5"
  },
  resolve: {
    alias: {
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "react/jsx-runtime": "react/jsx-runtime.js"
    }
  },
  dependencies: {
    "@types/react": "^19.2.18",
    react: "^19.2.8"
  }
};

// src/global/changelog/index.tsx
var Meta = package_default;
function normalizeVersion(v) {
  const parts = v.split(".");
  while (parts.length < 3)
    parts.push("0");
  return parts.join(".");
}
function startChangelog() {
  const lastSeen = normalizeVersion(SettingsStore_default.get("lastChangelogVersion"));
  const currentVersion = normalizeVersion(Meta.version);
  if (BetterDiscord.Utils.semverCompare(currentVersion, lastSeen) >= 0)
    return;
  const entry = changelog_default?.[currentVersion]?.[0];
  if (!entry)
    return;
  BetterDiscord.UI.showChangelogModal({
    title: Meta.name,
    subtitle: `v${currentVersion}`,
    ...entry
  });
  SettingsStore_default.set("lastChangelogVersion", currentVersion);
}

// src/index.tsx
var { Components } = BetterDiscord;
var { React: React2 } = BetterDiscord;
var SettingTypes = {
  number: Components.NumberInput,
  bigint: Components.NumberInput,
  boolean: Components.SwitchInput,
  string: Components.TextInput
};

class Plugin {
  async start() {
    startChangelog();
    await UserBackgroundStore_default.fetch();
    await load();
  }
  stop() {
    new BdApi("Patcher").Patcher.unpatchAll();
  }
  getSettingsPanel() {
    return () => {
      const settings = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => SettingsStore_default.getAll());
      return /* @__PURE__ */ React2.createElement(Components.SettingGroup, {
        name: "Settings"
      }, Object.entries(settings).map(([key, value]) => {
        const CompType = SettingTypes[typeof value];
        return /* @__PURE__ */ React2.createElement(Components.SettingItem, {
          key,
          note: key
        }, CompType ? /* @__PURE__ */ React2.createElement(CompType, {
          onChange: (v) => SettingsStore_default.set(key, v),
          value
        }) : /* @__PURE__ */ React2.createElement(Components.TextInput, {
          value: JSON.stringify(value),
          disabled: true
        }));
      }));
    };
  }
}
