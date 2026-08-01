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
  KillFX: () => killFX_default
});

// src/global/index.ts
var BetterDiscord = new BdApi("YABDP4Nitro");

// src/patches/modules/killFX.ts
var { UserProfileStore } = BetterDiscord.Webpack.Stores;
var killFX_default = {
  name: "Profile FX",
  description: "Kills all FX on Profiles",
  ids: undefined,
  waitFor: undefined,
  apply(patcher) {
    patcher.after(UserProfileStore, "getUserProfile", (_, [userId], ret) => {
      ret && (ret.profileEffect = undefined);
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
