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

// src/patches/modules/index.ts
var exports_modules = {};
__export(exports_modules, {
  FakeUserProfile: () => fakeUserProfile_default
});

// src/global/index.ts
var BetterDiscord = new BdApi("YABDP4Nitro");

// src/patches/modules/fakeUserProfile.ts
var { UserProfileStore } = BetterDiscord.Webpack.Stores;
var fakeUserProfile_default = {
  name: "User Profile",
  description: "Performs fake profile stuffs.",
  ids: undefined,
  waitFor: undefined,
  apply(patcher) {
    patcher.after(UserProfileStore, "getUserProfile", (_, [userId], ret) => {
      if (settings.killProfileEffects) {
        ret && (ret.profileEffect = undefined);
      } else {}
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
    if (Array.isArray(Patch.ids)) {
      await Promise.all([Patch.ids.map((x) => BetterDiscord.Utils.forceLoad(x))]);
    }
    if (Array.isArray(Patch.waitFor)) {
      await Promise.all([Patch.waitFor.map((x) => BetterDiscord.Webpack.waitForModule(x))]);
    }
    Patch.apply(PatcherAPI.Patcher);
  }
  return () => {
    for (const patch of loaded)
      patch.revert?.();
    PatcherAPI.Patcher.unpatchAll();
  };
}

// src/index.tsx
class Plugin {
  load;
  async start() {
    this.load = load();
  }
  stop() {}
}
