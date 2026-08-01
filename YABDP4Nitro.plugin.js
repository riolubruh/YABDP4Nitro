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
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= new WeakMap).get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  __moduleCache.set(from, entry);
  return entry;
};
var __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// src/index.tsx
var exports_src = {};
__export(exports_src, {
  default: () => Plugin
});
module.exports = __toCommonJS(exports_src);

// src/patches/modules/index.ts
var exports_modules = {};
__export(exports_modules, {
  FakeUserProfile: () => fakeUserProfile_default
});

// src/global/index.ts
var BetterDiscord = new BdApi("YABDP4Nitro");

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
function secondsightifyRevealOnly(t) {
  if ([...t].some((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631)) {
    return ((t2) => [...t2].map((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631 ? String.fromCodePoint(x.codePointAt(0) - 917504) : x).join(""))(t);
  } else {
    return;
  }
}

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
      const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);
      const userBio = ret?.bio;
      if (revealedSurrogate && revealedSurrogate.includes("fx")) {
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
      return ret;
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

// src/index.tsx
class Plugin {
  async start() {
    await load();
  }
  stop() {
    new BdApi("Patcher").Patcher.unpatchAll();
  }
}
