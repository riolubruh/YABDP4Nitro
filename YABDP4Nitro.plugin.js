/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @authorLink https://github.com/riolubruh
 * @version 7.0.0
 * @invite HfFxUbgsBc
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @donate https://github.com/riolubruh/YABDP4Nitro?tab=readme-ov-file#donate
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/YABDP4Nitro.plugin.js
 * @description Unlock all screensharing modes, use cross-server & GIF emotes, and more!
 */
 /*@cc_on
@if(@_jscript)
    WScript.Quit();
@else@*/

/*    ***** ATTRIBUTION NOTICE *****
 *
 * YABDP4Nitro is a free BetterDiscord plugin that bypasses and unlocks Nitro-locked features in the Discord client.
 *
 * Copyright (c) 2025 Riolubruh and contributors
 *
 * Licensed under the Open Software License version 3.0 (OSL-3.0).
 * You may use, distribute, and modify this code under the terms of this license.
 *
 * Derivative works must be licensed under OSL-3.0.
 *
 * Removal or modification of this notice in the source code of any Derivative Work
 * of this software violates the terms of the license.
 *
 * This software is provided on an "AS IS" BASIS and WITHOUT WARRANTY, either express or implied,
 * including, without limitation, the warranties of non-infringement, merchantability or fitness for a particular purpose.
 * THE ENTIRE RISK AS TO THE QUALITY OF THIS SOFTWARE IS WITH YOU.
 *
 * You should have received a copy of the license agreement alongside this file.
 * If not, please visit https://opensource.org/license/osl-3-0-php
 *
*/
 
const React = window.BdApi.React
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
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
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
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
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// src/global/shared/varforcer/index.ts
var require_varforcer = __commonJS((exports2, module2) => {
  function normalizeFunctionSource(str) {
    const trimmed = str.trimStart();
    if (/^function\b/.test(trimmed))
      return str;
    const arrowIdx = str.indexOf("=>");
    const braceIdx = str.indexOf("{");
    if (arrowIdx !== -1 && (braceIdx === -1 || arrowIdx < braceIdx))
      return str;
    let rest = trimmed;
    let isAsync = false;
    let isGenerator = false;
    if (rest.startsWith("async")) {
      isAsync = true;
      rest = rest.slice(5).trimStart();
    }
    if (rest.startsWith("*")) {
      isGenerator = true;
      rest = rest.slice(1).trimStart();
    }
    const parenIdx = rest.indexOf("(");
    if (parenIdx === -1)
      throw new Error("[varForcer] Could not normalize function source (no `(` found).");
    rest = rest.slice(parenIdx);
    return `${isAsync ? "async " : ""}function${isGenerator ? "*" : ""} ${rest}`;
  }
  function parseDestructuredVars(fnStr) {
    const letIndex = fnStr.indexOf("let{");
    if (letIndex === -1) {
      throw new Error("[varForcer] Could not find a `let{...}` destructure in the given function.");
    }
    const openBrace = letIndex + 4;
    const closeBrace = fnStr.indexOf("}", openBrace);
    if (closeBrace === -1) {
      throw new Error("[varForcer] Found `let{` but no matching closing `}`.");
    }
    const body = fnStr.slice(openBrace, closeBrace);
    const entries = body.split(",").map((chunk) => chunk.trim()).filter(Boolean).map((chunk) => {
      const [remote, local] = chunk.split(":").map((s) => s.trim());
      return [remote, local || remote];
    });
    return Object.fromEntries(entries);
  }
  function serializeValue(value) {
    if (typeof value === "string")
      return JSON.stringify(value);
    if (value === undefined)
      return "undefined";
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return String(value);
  }
  function forceFunctionVars(fn, declarations, options) {
    const { after, offset = 0, sets, throwIfMissingAnchor = true } = options;
    if (!after)
      throw new Error("[varForcer] `options.after` (anchor string) is required.");
    if (!sets || Object.keys(sets).length === 0)
      throw new Error("[varForcer] `options.sets` must have at least one entry.");
    const str = normalizeFunctionSource(fn.toString());
    const vars = parseDestructuredVars(str);
    const missing = Object.keys(sets).filter((name) => !vars[name]);
    if (missing.length) {
      throw new Error(`[varForcer] Could not resolve destructured var(s): ${missing.join(", ")}. Found: ${Object.keys(vars).join(", ")}`);
    }
    const anchorIndex = str.indexOf(after);
    if (anchorIndex === -1) {
      if (throwIfMissingAnchor)
        throw new Error(`[varForcer] Could not find anchor string: "${after}"`);
      return null;
    }
    const insertAt = anchorIndex + after.length + offset;
    const before = str.slice(0, insertAt);
    const rest = str.slice(insertAt);
    const assignments = Object.entries(sets).map(([name, value]) => `${vars[name]}=${serializeValue(value)};`).join("");
    const source = `with (__DECLARATIONS__) return (${before}${assignments}${rest});`;
    try {
      return new Function("__DECLARATIONS__", source)(declarations);
    } catch (err2) {
      throw new Error(`[varForcer] Failed to compile patched function: ${err2.message}

Generated source:
${source}`);
    }
  }
  function replaceFunctionLiteral(fn, declarations, options) {
    const { find, replace, throwIfMissing = true } = options;
    const str = normalizeFunctionSource(fn.toString());
    const found = typeof find === "string" ? str.includes(find) : find.test(str);
    if (!found && throwIfMissing)
      throw new Error(`[varForcer] Pattern not found: ${find}`);
    const patched = str.replace(find, replace);
    const source = `with (__DECLARATIONS__) return (${patched});`;
    try {
      return new Function("__DECLARATIONS__", source)(declarations);
    } catch (err2) {
      throw new Error(`[varForcer] Failed to compile patched function: ${err2.message}

Generated source:
${source}`);
    }
  }
  module2.exports = {
    forceFunctionVars,
    replaceFunctionLiteral,
    parseDestructuredVars,
    serializeValue,
    normalizeFunctionSource
  };
});

// node:path
var exports_path = {};
__export(exports_path, {
  sep: () => sep,
  resolve: () => resolve,
  relative: () => relative,
  posix: () => posix,
  parse: () => parse,
  normalize: () => normalize,
  join: () => join,
  isAbsolute: () => isAbsolute,
  format: () => format,
  extname: () => extname,
  dirname: () => dirname,
  delimiter: () => delimiter,
  default: () => path_default,
  basename: () => basename,
  _makeLong: () => _makeLong
});
function assertPath(path) {
  if (typeof path !== "string")
    throw TypeError("Path must be a string. Received " + JSON.stringify(path));
}
function normalizeStringPosix(path, allowAboveRoot) {
  var res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code;
  for (var i2 = 0;i2 <= path.length; ++i2) {
    if (i2 < path.length)
      code = path.charCodeAt(i2);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i2 - 1 || dots === 1)
        ;
      else if (lastSlash !== i2 - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1)
                res = "", lastSegmentLength = 0;
              else
                res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              lastSlash = i2, dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "", lastSegmentLength = 0, lastSlash = i2, dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i2);
        else
          res = path.slice(lastSlash + 1, i2);
        lastSegmentLength = i2 - lastSlash - 1;
      }
      lastSlash = i2, dots = 0;
    } else if (code === 46 && dots !== -1)
      ++dots;
    else
      dots = -1;
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root, base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir)
    return base;
  if (dir === pathObject.root)
    return dir + base;
  return dir + sep + base;
}
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false, cwd;
  for (var i2 = arguments.length - 1;i2 >= -1 && !resolvedAbsolute; i2--) {
    var path;
    if (i2 >= 0)
      path = arguments[i2];
    else {
      if (cwd === undefined)
        cwd = process.cwd();
      path = cwd;
    }
    if (assertPath(path), path.length === 0)
      continue;
    resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = path.charCodeAt(0) === 47;
  }
  if (resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute), resolvedAbsolute)
    if (resolvedPath.length > 0)
      return "/" + resolvedPath;
    else
      return "/";
  else if (resolvedPath.length > 0)
    return resolvedPath;
  else
    return ".";
}
function normalize(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var isAbsolute = path.charCodeAt(0) === 47, trailingSeparator = path.charCodeAt(path.length - 1) === 47;
  if (path = normalizeStringPosix(path, !isAbsolute), path.length === 0 && !isAbsolute)
    path = ".";
  if (path.length > 0 && trailingSeparator)
    path += "/";
  if (isAbsolute)
    return "/" + path;
  return path;
}
function isAbsolute(path) {
  return assertPath(path), path.length > 0 && path.charCodeAt(0) === 47;
}
function join() {
  if (arguments.length === 0)
    return ".";
  var joined;
  for (var i2 = 0;i2 < arguments.length; ++i2) {
    var arg = arguments[i2];
    if (assertPath(arg), arg.length > 0)
      if (joined === undefined)
        joined = arg;
      else
        joined += "/" + arg;
  }
  if (joined === undefined)
    return ".";
  return normalize(joined);
}
function relative(from, to) {
  if (assertPath(from), assertPath(to), from === to)
    return "";
  if (from = resolve(from), to = resolve(to), from === to)
    return "";
  var fromStart = 1;
  for (;fromStart < from.length; ++fromStart)
    if (from.charCodeAt(fromStart) !== 47)
      break;
  var fromEnd = from.length, fromLen = fromEnd - fromStart, toStart = 1;
  for (;toStart < to.length; ++toStart)
    if (to.charCodeAt(toStart) !== 47)
      break;
  var toEnd = to.length, toLen = toEnd - toStart, length = fromLen < toLen ? fromLen : toLen, lastCommonSep = -1, i2 = 0;
  for (;i2 <= length; ++i2) {
    if (i2 === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i2) === 47)
          return to.slice(toStart + i2 + 1);
        else if (i2 === 0)
          return to.slice(toStart + i2);
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i2) === 47)
          lastCommonSep = i2;
        else if (i2 === 0)
          lastCommonSep = 0;
      }
      break;
    }
    var fromCode = from.charCodeAt(fromStart + i2), toCode = to.charCodeAt(toStart + i2);
    if (fromCode !== toCode)
      break;
    else if (fromCode === 47)
      lastCommonSep = i2;
  }
  var out = "";
  for (i2 = fromStart + lastCommonSep + 1;i2 <= fromEnd; ++i2)
    if (i2 === fromEnd || from.charCodeAt(i2) === 47)
      if (out.length === 0)
        out += "..";
      else
        out += "/..";
  if (out.length > 0)
    return out + to.slice(toStart + lastCommonSep);
  else {
    if (toStart += lastCommonSep, to.charCodeAt(toStart) === 47)
      ++toStart;
    return to.slice(toStart);
  }
}
function _makeLong(path) {
  return path;
}
function dirname(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var code = path.charCodeAt(0), hasRoot = code === 47, end = -1, matchedSlash = true;
  for (var i2 = path.length - 1;i2 >= 1; --i2)
    if (code = path.charCodeAt(i2), code === 47) {
      if (!matchedSlash) {
        end = i2;
        break;
      }
    } else
      matchedSlash = false;
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function basename(path, ext) {
  if (ext !== undefined && typeof ext !== "string")
    throw TypeError('"ext" argument must be a string');
  assertPath(path);
  var start = 0, end = -1, matchedSlash = true, i2;
  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext.length === path.length && ext === path)
      return "";
    var extIdx = ext.length - 1, firstNonSlashEnd = -1;
    for (i2 = path.length - 1;i2 >= 0; --i2) {
      var code = path.charCodeAt(i2);
      if (code === 47) {
        if (!matchedSlash) {
          start = i2 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1)
          matchedSlash = false, firstNonSlashEnd = i2 + 1;
        if (extIdx >= 0)
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1)
              end = i2;
          } else
            extIdx = -1, end = firstNonSlashEnd;
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path.length;
    return path.slice(start, end);
  } else {
    for (i2 = path.length - 1;i2 >= 0; --i2)
      if (path.charCodeAt(i2) === 47) {
        if (!matchedSlash) {
          start = i2 + 1;
          break;
        }
      } else if (end === -1)
        matchedSlash = false, end = i2 + 1;
    if (end === -1)
      return "";
    return path.slice(start, end);
  }
}
function extname(path) {
  assertPath(path);
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, preDotState = 0;
  for (var i2 = path.length - 1;i2 >= 0; --i2) {
    var code = path.charCodeAt(i2);
    if (code === 47) {
      if (!matchedSlash) {
        startPart = i2 + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i2 + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i2;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    return "";
  return path.slice(startDot, end);
}
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== "object")
    throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
  return _format("/", pathObject);
}
function parse(path) {
  assertPath(path);
  var ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0)
    return ret;
  var code = path.charCodeAt(0), isAbsolute2 = code === 47, start;
  if (isAbsolute2)
    ret.root = "/", start = 1;
  else
    start = 0;
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, i2 = path.length - 1, preDotState = 0;
  for (;i2 >= start; --i2) {
    if (code = path.charCodeAt(i2), code === 47) {
      if (!matchedSlash) {
        startPart = i2 + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i2 + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i2;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1)
      if (startPart === 0 && isAbsolute2)
        ret.base = ret.name = path.slice(1, end);
      else
        ret.base = ret.name = path.slice(startPart, end);
  } else {
    if (startPart === 0 && isAbsolute2)
      ret.name = path.slice(1, startDot), ret.base = path.slice(1, end);
    else
      ret.name = path.slice(startPart, startDot), ret.base = path.slice(startPart, end);
    ret.ext = path.slice(startDot, end);
  }
  if (startPart > 0)
    ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute2)
    ret.dir = "/";
  return ret;
}
var sep = "/", delimiter = ":", posix, path_default;
var init_path = __esm(() => {
  posix = ((p) => (p.posix = p, p))({ resolve, normalize, isAbsolute, join, relative, _makeLong, dirname, basename, extname, format, parse, sep, delimiter, win32: null, posix: null });
  path_default = posix;
});

// src/index.tsx
var exports_src = {};
__export(exports_src, {
  fs: () => fs,
  default: () => Plugin,
  _path: () => _path
});
module.exports = __toCommonJS(exports_src);

// src/global/shared/index.tsx
var BetterDiscord = new BdApi("YABDP4Nitro");

// src/patches/modules/index.ts
var exports_modules = {};
__export(exports_modules, {
  VideoCodec: () => videoCodecs_default,
  UserProfileV2: () => UserProfileV2_default,
  UserBgCallTile: () => userCallTileBg_default,
  UnlockStickers: () => unlockStickers_default,
  UnlockEmojis: () => unlockEmojis_default,
  StreamBypass: () => streamBypass_default,
  SharpenStreams: () => sharpenStreams_default,
  SendMessage: () => _sendMessage_default,
  RenderMessageEmbeds: () => renderMessageEmbeds_default,
  RenderMessage: () => renderMessage_default,
  PremiumType: () => premiumType_default,
  MaxFileSize: () => maxFileSize_default,
  GoLiveModal: () => goLiveModal_default,
  GifPickerContext: () => gifPickerContext_default,
  GetAvatarURL: () => getAvatarURL_default,
  FakeUserProfile: () => fakeUserProfile_default,
  FakeUser: () => fakeUser_default,
  FakeBanners: () => banners_default,
  EditMessage: () => editMessage_default,
  DEV: () => dev_default,
  CustomThemeApply: () => customClientThemes_default,
  CustomCameraPreview: () => customCameraBackground_default,
  ClipsBypass: () => clipsBypass_default,
  ClientThemes: () => clientThemes_default,
  CanUserUse: () => canUserUse_default,
  BlockedUserContext: () => blockedUserContext_default,
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
  unload() {
    this.profiles = [];
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
  CustomFPS: 60,
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
  removeProfileUpsell: true,
  removeScreenshareUpsell: true,
  fakeProfileBanners: true,
  fakeAvatarDecorations: true,
  unlockAppIcons: true,
  profileEffects: true,
  profileFrames: true,
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
  lastChangelogVersion: "6.10.7",
  installedVersion: "6.10.7",
  customVideoFilter: {
    link: "https://cdn.discordapp.com/attachments/1334347004935147551/1538395403047673866/medic_balling.mov?ex=6a8285de&is=6a81345e&hm=f9f1f3be500425c255a95606ebf6f8d05eed06477f0f048906cfe9170c842070&",
    type: "mp4"
  },
  customVideoFilterEnabled: false,
  dontUpdate: false
};
var SettingsStore_default = new class SettingsStore extends Utils.Store {
  settings = {
    ...defaultSettings,
    ...Data.load("settings") ?? {}
  };
  listeners = new Map;
  get(id) {
    return this.settings[id];
  }
  set(id, value) {
    this.settings = { ...this.settings, [id]: value };
    Data.save("settings", this.settings);
    this.emitChange();
    this.notify(id, value);
  }
  del(id) {
    this.settings = { ...this.settings, [id]: defaultSettings[id] };
    Data.save("settings", this.settings);
    this.emitChange();
    this.notify(id, this.settings[id]);
  }
  getAll() {
    return this.settings;
  }
  subscribe(id, callback) {
    if (!this.listeners.has(id)) {
      this.listeners.set(id, new Set);
    }
    this.listeners.get(id).add(callback);
    return () => {
      this.listeners.get(id)?.delete(callback);
    };
  }
  notify(id, value) {
    this.listeners.get(id)?.forEach((cb) => cb(value));
  }
};

// src/global/stores/UserBackgroundStore.ts
var USER_BG = "https://usrbg.is-hardly.online/users";
var UserBackgroundStore_default = new class UserBackgroundStore extends BetterDiscord.Utils.Store {
  users = {};
  meta = {};
  get(userId) {
    const enabled = SettingsStore_default.get("userBgIntegration");
    if (!enabled)
      return null;
    return this.users[userId];
  }
  format(userId) {
    const userHash = this.get(userId);
    return `https://usrbg.is-hardly.online/${this.meta.bucket}/${this.meta.prefix.slice(0, this.meta.prefix.length - 1)}/${userId}?${userHash}`;
  }
  hasHash(id) {
    const enabled = SettingsStore_default.get("userBgIntegration");
    if (!enabled)
      return false;
    return Boolean(this.users[id]);
  }
  async fetch() {
    const data = await BetterDiscord.Net.fetch(USER_BG);
    const response = await data.json();
    this.meta = { ...this.meta, ["bucket"]: response.bucket, ["prefix"]: response.prefix };
    this.users = response.users;
  }
  unload() {
    this.users = {};
    this.meta = {};
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
  silly: {
    ids: ["917630027477159986"],
    badge: {
      id: "yabdp_silly",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/refs/heads/main/img/yabdp_silly.png",
      description: "Honk."
    }
  },
  sera: {
    ids: ["1323433010858557523"],
    badge: {
      id: "yabdp_sera",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/refs/heads/main/img/yabdp_sera.gif",
      description: "sera so silly ;3"
    }
  },
  contributors: {
    ids: specialThanks,
    badge: {
      id: "yabdp_contributor",
      iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi_red.gif",
      description: "YABDP4Nitro Contributor!",
      link: "https://github.com/riolubruh/YABDP4Nitro#contributors"
    }
  }
};
var defaultBadge = {
  id: "yabdp_user",
  iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png",
  description: "A fellow YABDP4Nitro user!",
  link: "https://github.com/riolubruh/YABDP4Nitro"
};
var BadgesStore_default = new class BadgesStore {
  foundUsers = [];
  add(id) {
    if (!this.foundUsers.includes(id)) {
      this.foundUsers.push(id);
    }
  }
  check(id) {
    return this.foundUsers.includes(id) || this.isImportant(id);
  }
  isImportant(id) {
    return Object.values(Badges).some((category) => category.ids.includes(id));
  }
  findBadgesForUser(id) {
    return Object.values(Badges).filter((category) => category.ids.includes(id)).map((category) => category.badge);
  }
  returnRespondingBadges(id) {
    const categories = Object.values(Badges).filter((x) => x.ids.includes(id));
    return categories.length ? categories.map((x) => x.badge) : [defaultBadge];
  }
  unload() {
    this.foundUsers = [];
  }
};

// src/utils/index.tsx
var { UserProfileStore, SelectedGuildStore, PresenceStore, ChannelStore } = BetterDiscord.Webpack.Stores;
var DiscordCopyToClipboardFn = BetterDiscord.Webpack.getByStrings("await window.navigator.clipboard.writeText", { searchExports: true });
function getRevealedTextPerServer(userId, shouldInclude = "") {
  const guildId = SelectedGuildStore.getGuildId();
  if (!guildId)
    return;
  const userGuildProfile = UserProfileStore.getGuildMemberProfile(userId, guildId);
  userGuildProfile && Object.defineProperty(userGuildProfile, "guildId", { value: guildId });
  userGuildProfile && CustomUserProfileStore_default.cacheMember(userGuildProfile);
  if (userGuildProfile?.pronouns && userGuildProfile.pronouns.includes(shouldInclude)) {
    const revealed = secondsightifyRevealOnly(String(userGuildProfile.pronouns));
    revealed && BadgesStore_default.add(userId);
    return revealed;
  }
  if (userGuildProfile?.bio && userGuildProfile.bio.includes(shouldInclude)) {
    const revealed = secondsightifyRevealOnly(String(userGuildProfile.bio));
    revealed && BadgesStore_default.add(userId);
    return revealed;
  }
}
function getRevealedText(userId, shouldInclude = "") {
  const perServer = getRevealedTextPerServer(userId, shouldInclude);
  if (perServer)
    return perServer;
  const bioText = getRevealedTextFromBio(userId, shouldInclude);
  if (bioText) {
    BadgesStore_default.add(userId);
    return bioText;
  }
  const statusText = getRevealedTextFromCustomStatus(userId, shouldInclude);
  if (statusText) {
    BadgesStore_default.add(userId);
    return statusText;
  }
  return;
}
function getRevealedTextFromBio(userId, shouldInclude) {
  const userProfile = UserProfileStore.getUserProfile(userId);
  if (!userProfile?.bio?.includes(shouldInclude))
    return;
  const revealedText = secondsightifyRevealOnly(userProfile.bio);
  return revealedText || undefined;
}
function getRevealedTextFromCustomStatus(userId, shouldInclude) {
  let customStatusActivity;
  try {
    customStatusActivity = PresenceStore.getActivities(userId).find((activity) => activity.name === "Custom Status" || activity.id === "custom");
  } catch (err) {
    BetterDiscord.Logger.error("Something went wrong getting custom status, oh god oh shit!", err);
    return;
  }
  if (!customStatusActivity?.state?.includes(shouldInclude))
    return;
  const revealedText = secondsightifyRevealOnly(customStatusActivity.state);
  return revealedText || undefined;
}
function secondsightifyRevealOnly(t) {
  if ([...t].some((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631)) {
    return ((t2) => [...t2].map((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631 ? String.fromCodePoint(x.codePointAt(0) - 917504) : x).join(""))(t);
  } else {
    return;
  }
}
function secondsightifyEncodeOnly(t) {
  if ([...t].some((x) => 917504 < x.codePointAt(0) && x.codePointAt(0) < 917631)) {
    return;
  } else {
    return ((t2) => [...t2].map((x) => 0 < x.codePointAt(0) && x.codePointAt(0) < 127 ? String.fromCodePoint(x.codePointAt(0) + 917504) : x).join(""))(t);
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
var EMOJI_PREFIX = "https://cdn.discordapp.com/emojis/";
function getEmojiUrl(emoji, emojiSize = SettingsStore_default.get("emojiSize")) {
  return `${EMOJI_PREFIX}${emoji.id}${getEmojiExtension(emoji)}?animated=${emoji.animated}&size=${emojiSize}&quality=lossless`;
}
function getEmojiString(emoji) {
  return `<${emoji.animated ? "a:" : ":"}${emoji.originalName ?? emoji.name}:${emoji.id}>`;
}
var styled = new Proxy(styledBase, {
  get(target, p) {
    return (cssOrFn) => target(p, cssOrFn);
  }
});
function styledBase(tag, cssOrFn) {
  return (props) => {
    const style = typeof cssOrFn === "function" ? cssOrFn(props) : cssOrFn;
    return React.createElement(tag, { ...props, style: { ...style, ...props.style } });
  };
}
var ContextMenuWrapper = styled.div({
  display: "flex",
  flexDirection: "column"
});
var ContextMenuLabel = () => /* @__PURE__ */ React.createElement("span", {
  style: { fontSize: "14px", opacity: 0.6 }
}, "YABDP4Nitro");
function copyToClipboard(string, successMessage = undefined, errorMessage = "Failed to copy to clipboard!") {
  try {
    DiscordCopyToClipboardFn(string);
    if (successMessage)
      BetterDiscord.UI.showToast(successMessage, { type: "info" });
  } catch (err) {
    BetterDiscord.UI.showToast(errorMessage, { type: "error", forceShow: true });
    BetterDiscord.Logger.error(err);
  }
}
var EMOJI_ID_FROM_URL_REGEX = /(?<=emojis\/)(\d+?)(?=\.(png|webp|gif|avif|jpg|jpeg))/g;
var EMOJI_STRING_REGEX = /<a?:.+?:\d+>/g;
var HYPERLINK_EMOJI_REGEX = /\[.+?\]\(https:\/\/cdn\.discordapp\.com\/emojis\/.+?\)/gi;
var BANNER_REGEX = /B\{[^}]*?\}/;
var IMGUR_URL_REGEX = /https?:\/\/i\.imgur\.com\/(\w+)\.(?:jpe?g|png|gif|webp)/;
function getBannerUrl(userId) {
  const parsed = getRevealedText(userId, `\uDB40\uDC42\uDB40\uDC7B`);
  const match = parsed?.match(BANNER_REGEX)?.[0];
  const matched = match?.slice(2, -1);
  return matched ? `https://i.imgur.com/${matched}.gif` : UserBackgroundStore_default.hasHash(userId) ? UserBackgroundStore_default.format(userId) : null;
}
async function getDirectImgurHash(url) {
  if (url.match(IMGUR_URL_REGEX)?.[1])
    return url.match(IMGUR_URL_REGEX)?.[1];
  const res = await (await BetterDiscord.Net.fetch(url)).text();
  return res.match(IMGUR_URL_REGEX)?.[1];
}

// src/global/shared/regexReveals.ts
var regexReveals_default = {
  PROFILE_EFFECTS: /fx\d+/,
  DISPLAY_NAME_STYLES: /S\{[^}]*?\}/,
  DECORATION: /\/a\d+/,
  NAMEPLATE: /n\{[^}]*?\}/,
  PROFILE_PICTURE: /P\{[^}]*?\}/,
  PROFILE_FRAME: /pf\d+/,
  PROFILE_COLORS: /\[#([a-fA-F0-9]+),#([a-fA-F0-9]+)\]/
};

// src/global/shared/regexHelpers.ts
function extractDisplayNameStyles(revealedText) {
  if (!revealedText)
    return null;
  const match = revealedText.match(regexReveals_default.DISPLAY_NAME_STYLES)?.[0]?.slice?.(2, -1)?.split?.(",");
  return match || null;
}
function extractDecoration(revealedText) {
  if (!revealedText)
    return null;
  const skuId = revealedText.match(regexReveals_default.DECORATION)?.[0]?.slice?.(2);
  return skuId || null;
}
function extractNameplate(revealedText) {
  if (!revealedText)
    return null;
  const match = revealedText.match(regexReveals_default.NAMEPLATE)?.[0]?.slice(2, -1)?.split?.(",");
  return match || null;
}
function extractProfileEffects(parsedText) {
  if (!parsedText)
    return null;
  const skuId = parsedText.match(regexReveals_default.PROFILE_EFFECTS)?.[0]?.slice(2);
  return skuId || null;
}
function extractProfileFrame(revealedText) {
  if (!revealedText)
    return null;
  const match = revealedText.match(regexReveals_default.PROFILE_FRAME)?.[0]?.substring(2);
  return match || null;
}
function extractProfilePicture(revealedText) {
  if (!revealedText)
    return null;
  const matches = revealedText.match(regexReveals_default.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
  return matches || null;
}
function containsBanner(revealedSurrogate) {
  return revealedSurrogate?.includes("B{") || false;
}
function containsProfileEffects(revealedSurrogate) {
  return revealedSurrogate?.includes("fx") || false;
}
function containsProfileFrame(revealedSurrogate) {
  return revealedSurrogate?.includes("pf") || false;
}

// src/patches/modules/fakeUserProfile.ts
var { UserProfileStore: UserProfileStore2, SelectedGuildStore: SelectedGuildStore2 } = BetterDiscord.Webpack.Stores;
function extractProfileColors(string) {
  if (!string)
    return null;
  const match = string.match(regexReveals_default.PROFILE_COLORS);
  if (!match)
    return null;
  return [match[1], match[2]].map((x) => parseInt(x, 16));
}
var fakeUserProfile_default = {
  name: "User Profile",
  description: "Performs fake profile stuffs.",
  ids: undefined,
  waitFor: [(x) => x.getUser],
  apply(finale, patcher) {
    patcher.after(UserProfileStore2, "getUserProfile", (_, [userId], ret) => {
      const killProfileEffects = SettingsStore_default.get("killProfileEffects");
      const profileEffectsEnabled = SettingsStore_default.get("profileEffects");
      const shouldProfileV2 = SettingsStore_default.get("profileV2");
      const disableUserBadge = SettingsStore_default.get("disableUserBadge");
      const profileThemesEnabled = SettingsStore_default.get("fakeProfileThemes");
      const profileFramesEnabled = SettingsStore_default.get("profileFrames");
      if (!ret)
        return;
      const userBio = ret.bio;
      (shouldProfileV2 || userBio?.includes?.(`\uDB40`) || getRevealedTextPerServer(userId, `\uDB40`)) && (ret.premiumType = 2);
      const revealedGlobalBio = secondsightifyRevealOnly(userBio);
      if (!killProfileEffects && profileEffectsEnabled) {
        const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC66\uDB40\uDC78`);
        const parsed = perServer ?? (userBio?.includes?.(`\uDB40\uDC66\uDB40\uDC78`) ? revealedGlobalBio : null);
        if (parsed && containsProfileEffects(parsed)) {
          const skuId = extractProfileEffects(parsed);
          skuId && (ret.profileEffect = {
            skuId,
            expiresAt: undefined
          });
        }
      }
      if (killProfileEffects) {
        ret.profileEffect = {};
      }
      if (profileThemesEnabled) {
        const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC5B\uDB40\uDC23`);
        const match = perServer ? extractProfileColors(perServer) : extractProfileColors(revealedGlobalBio);
        match && (ret.themeColors = match);
      }
      if (profileFramesEnabled) {
        const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC70\uDB40\uDC66`);
        const revealedSurrogate = perServer ?? (userBio?.includes?.(`\uDB40\uDC70\uDB40\uDC66`) ? revealedGlobalBio : null);
        const match = extractProfileFrame(revealedSurrogate);
        match && (ret.profileFrame = { skuId: match, expiresAt: undefined });
      }
      const noBadgeFound = !Object.values(ret?.badges ?? {}).find((x) => x?.id?.startsWith("yabdp"));
      if (!disableUserBadge && noBadgeFound && BadgesStore_default.check(ret?.userId)) {
        if (!ret.badges)
          ret.badges = [];
        ret.badges.push(...BadgesStore_default.findBadgesForUser(ret.userId));
      }
    });
  }
};
// src/patches/modules/fakeUser.ts
var { UserStore } = BetterDiscord.Webpack.Stores;
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
        const match = extractDisplayNameStyles(revealedText);
        if (match) {
          const styleData = getStyleData(match);
          styleData && Object.defineProperty(ret, "displayNameStyles", {
            value: {
              fontId: styleData.fontId,
              effectId: styleData.effectId,
              colors: [styleData.color1, styleData?.color2].filter(Boolean)
            },
            enumerable: true,
            writable: true,
            configurable: true
          });
        }
      }
      if (decorEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC2F\uDB40\uDC61`);
        const skuId = extractDecoration(revealedText);
        if (skuId) {
          ret.avatarDecorationData = {
            skuId
          };
        }
      }
      if (nameplatesEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC6E\uDB40\uDC7B`);
        const match = extractNameplate(revealedText);
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
    areClipsEnabled: (x) => x.toString().includes("areClipsEnabled")
  },
  apply(finale, patcher) {
    Object.entries(finale.mangled).map(([key, value]) => {
      patcher.instead(finale.mangled, key, (_, __, originalFunction) => {
        const { useClipBypass, useAudioClipBypass, zipClip } = SettingsStore_default.getAll();
        if (useClipBypass || useAudioClipBypass || zipClip)
          return true;
        else
          return originalFunction();
      });
    });
    [
      "isViewerClippingAllowedForUser",
      "isClipsEnabledForUser",
      "isVoiceRecordingAllowedForUse"
    ].map((x) => patcher.instead(ClipsStore, x, (_, __, originalFunction) => {
      const { useClipBypass, useAudioClipBypass, zipClip } = SettingsStore_default.getAll();
      if (useClipBypass || useAudioClipBypass || zipClip)
        return true;
      else
        return originalFunction();
    }));
  }
};
// bdapi-react-shim:react
var Children = BdApi.React["Children"];
var Component = BdApi.React["Component"];
var Fragment = BdApi.React["Fragment"];
var Profiler = BdApi.React["Profiler"];
var PureComponent = BdApi.React["PureComponent"];
var StrictMode = BdApi.React["StrictMode"];
var Suspense = BdApi.React["Suspense"];
var cloneElement = BdApi.React["cloneElement"];
var createContext = BdApi.React["createContext"];
var createElement = BdApi.React["createElement"];
var createFactory = BdApi.React["createFactory"];
var createRef = BdApi.React["createRef"];
var forwardRef = BdApi.React["forwardRef"];
var isValidElement = BdApi.React["isValidElement"];
var lazy = BdApi.React["lazy"];
var memo = BdApi.React["memo"];
var startTransition = BdApi.React["startTransition"];
var unstable_act = BdApi.React["unstable_act"];
var useCallback = BdApi.React["useCallback"];
var useContext = BdApi.React["useContext"];
var useDebugValue = BdApi.React["useDebugValue"];
var useDeferredValue = BdApi.React["useDeferredValue"];
var useEffect = BdApi.React["useEffect"];
var useId = BdApi.React["useId"];
var useImperativeHandle = BdApi.React["useImperativeHandle"];
var useInsertionEffect = BdApi.React["useInsertionEffect"];
var useLayoutEffect = BdApi.React["useLayoutEffect"];
var useMemo = BdApi.React["useMemo"];
var useReducer = BdApi.React["useReducer"];
var useRef = BdApi.React["useRef"];
var useState = BdApi.React["useState"];
var useSyncExternalStore = BdApi.React["useSyncExternalStore"];
var useTransition = BdApi.React["useTransition"];
var version = BdApi.React["version"];
var react_default = BdApi.React;

// node_modules/@iconify/react/dist/iconify.js
"use client";
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || Object.create(null);
  const resolved = Object.create(null);
  function resolve(name) {
    if (icons[name])
      return resolved[name] = [];
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value)
        resolved[name] = [parent].concat(value);
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
var defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip)
    result.hFlip = true;
  if (!obj1.vFlip !== !obj2.vFlip)
    result.vFlip = true;
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate)
    result.rotate = rotate;
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps)
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result))
        result[key] = defaultIconTransformations[key];
    } else if (key in child)
      result[key] = child[key];
    else if (key in parent)
      result[key] = parent[key];
  return result;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || Object.create(null);
  let currentProps = {};
  function parse(name$1) {
    currentProps = mergeIconData(icons[name$1] || aliases[name$1], currentProps);
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object")
    return names;
  if (data.not_found instanceof Array)
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults)
    if (prop in item && typeof item[prop] !== typeof defaults[prop])
      return false;
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null)
    return null;
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object")
    return null;
  if (!checkOptionalProps(obj, optionalPropertyDefaults))
    return null;
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps))
      return null;
  }
  const aliases = data.aliases || Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps))
      return null;
  }
  return data;
}
var dataStorage = Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: Object.create(null),
    missing: /* @__PURE__ */ new Set
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage, data) {
  if (!quicklyValidateIconSet(data))
    return [];
  return parseIconSet(data, (name, icon) => {
    if (icon)
      storage.icons[name] = icon;
    else
      storage.missing.add(name);
  });
}
function addIconToStorage(storage, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {}
  return false;
}
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3)
      return null;
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length)
    return null;
  if (colonSeparated.length > 1) {
    const name$1 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name$1
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon)
    return false;
  return !!((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean")
    simpleNames = allow;
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage.icons[iconName] || (storage.missing.has(iconName) ? null : undefined);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon)
    return false;
  const storage = getStorage(icon.provider, icon.prefix);
  if (data)
    return addIconToStorage(storage, icon.name, data);
  else {
    storage.missing.add(icon.name);
    return true;
  }
}
function addCollection(data, provider) {
  if (typeof data !== "object")
    return false;
  if (typeof provider !== "string")
    provider = data.provider || "";
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (addIcon(name, icon))
          added = true;
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    prefix,
    name: "a"
  }))
    return false;
  const storage = getStorage(provider, prefix);
  return !!addIconSet(storage, data);
}
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  ...defaultIconSizeCustomisations,
  ...defaultIconTransformations
});
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1)
    return size;
  precision = precision || 100;
  if (typeof size === "number")
    return Math.ceil(size * ratio * precision) / precision;
  if (typeof size !== "string")
    return size;
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length)
    return size;
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num))
        newParts.push(code);
      else
        newParts.push(Math.ceil(num * ratio * precision) / precision);
    } else
      newParts.push(code);
    code = oldParts.shift();
    if (code === undefined)
      return newParts.join("");
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1)
      break;
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1)
      break;
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip)
      if (vFlip)
        rotation += 2;
      else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0)
      rotation -= Math.floor(rotation / 4) * 4;
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length)
      body = wrapSVGContent(body, '<g transform="' + transformations.join(" ") + '">', "</g>");
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value))
      attributes[prop] = value.toString();
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [
    box.left,
    box.top,
    boxWidth,
    boxHeight
  ];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
var regex = /\sid="(\S+)"/g;
var randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
var counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body))
    ids.push(match[1]);
  if (!ids.length)
    return body;
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + suffix + "$3");
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
var storage = Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string")
    resources = [source.resources];
  else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length)
      return null;
  }
  const result = {
    resources,
    path: source.path || "/",
    maxURL: source.maxURL || 500,
    rotate: source.rotate || 750,
    timeout: source.timeout || 5000,
    random: source.random === true,
    index: source.index || 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
var configStorage = Object.create(null);
var fallBackAPISources = ["https://api.simplesvg.com", "https://api.unisvg.com"];
var fallBackAPI = [];
while (fallBackAPISources.length > 0)
  if (fallBackAPISources.length === 1)
    fallBackAPI.push(fallBackAPISources.shift());
  else if (Math.random() > 0.5)
    fallBackAPI.push(fallBackAPISources.shift());
  else
    fallBackAPI.push(fallBackAPISources.pop());
configStorage[""] = createAPIConfig({ resources: ["https://api.iconify.design"].concat(fallBackAPI) });
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null)
    return false;
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
var detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function")
      return callback;
  } catch (err) {}
};
var fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config)
    return 0;
  let result;
  if (!config.maxURL)
    result = 0;
  else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config)
      return config.path;
  }
  return "/";
}
var send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({ icons: iconsList });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404)
          callback("abort", data);
        else
          callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items)
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length)
        return;
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix)
            return true;
          const name = icon.name;
          if (storage2.icons[name])
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          else if (storage2.missing.has(name))
            icons.missing.push({
              provider,
              prefix,
              name
            });
          else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending)
            removeCallback([storage2], item.id);
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length)
    return abort;
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider)
      return a.provider.localeCompare(b.provider);
    if (a.prefix !== b.prefix)
      return a.prefix.localeCompare(b.prefix);
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider)
      return;
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons)
      list = result.loaded;
    else if (prefix === "" || localStorage.missing.has(name))
      list = result.missing;
    else
      list = result.pending;
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon)
      result.push(icon);
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2000,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function")
    doneCallbacks.push(done);
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending")
      status = "aborted";
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending")
        item.status = "aborted";
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite)
      doneCallbacks = [];
    if (typeof callback === "function")
      doneCallbacks.push(callback);
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(undefined, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending")
        item.status = "aborted";
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length)
        if (!resources.length)
          failQuery();
        else
          execNext();
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index)
        config.index = index;
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending")
      return;
    resetTimer();
    const resource = resources.shift();
    if (resource === undefined) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status$1, data) => {
        moduleResponse(item, status$1, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query$1 = sendQuery(config, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback)
        doneCallback(data, error);
    });
    queries.push(query$1);
    return query$1;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {}
var redundancyCache = Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config)
      return;
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(undefined, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached)
      redundancy = cached.redundancy;
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api)
        send2 = api.send;
    }
  }
  if (!redundancy || !send2) {
    callback(undefined, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage2, icons, data) {
  function checkMissing() {
    const pending = storage2.pendingIcons;
    icons.forEach((name) => {
      if (pending)
        pending.delete(name);
      if (!storage2.icons[name])
        storage2.missing.add(name);
    });
  }
  if (data && typeof data === "object")
    try {
      const parsed = addIconSet(storage2, data);
      if (!parsed.length) {
        checkMissing();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  checkMissing();
  loadedNewIcons(storage2);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise)
    response.then((data) => {
      callback(data);
    }).catch(() => {
      callback(null);
    });
  else
    callback(response);
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad)
    storage2.iconsToLoad = icons;
  else
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons$1 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      if (!icons$1 || !icons$1.length)
        return;
      const customIconLoader = storage2.loadIcon;
      if (storage2.loadIcons && (icons$1.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(storage2.loadIcons(icons$1, prefix, provider), (data) => {
          parseLoaderResponse(storage2, icons$1, data);
        });
        return;
      }
      if (customIconLoader) {
        icons$1.forEach((name) => {
          const response = customIconLoader(name, prefix, provider);
          parsePossiblyAsyncResponse(response, (data) => {
            const iconSet = data ? {
              prefix,
              icons: { [name]: data }
            } : null;
            parseLoaderResponse(storage2, [name], iconSet);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons$1);
      if (invalid.length)
        parseLoaderResponse(storage2, invalid, null);
      if (!valid.length)
        return;
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage2, valid, null);
        return;
      }
      const params = api.prepare(provider, prefix, valid);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage2, item.icons, data);
        });
      });
    });
  }
}
var loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback)
      setTimeout(() => {
        if (callCallback)
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
      });
    return () => {
      callCallback = false;
    };
  }
  const newIcons = Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider)
      return;
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = Object.create(null));
    if (!providerNewIcons[prefix])
      providerNewIcons[prefix] = [];
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set);
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const list = newIcons[storage2.provider][storage2.prefix];
    if (list.length)
      loadNewIcons(storage2, list);
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
  const result = { ...defaults };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number"))
        result[key] = value;
    } else if (valueType === typeof result[key])
      result[key] = key === "rotate" ? value % 4 : value;
  }
  return result;
}
var separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value$1) {
    while (value$1 < 0)
      value$1 += 4;
    return value$1 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num))
        return 0;
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes)
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
var policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", { createHTML: (s) => s });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === undefined)
    createPolicy();
  return policy ? policy.createHTML(html) : html;
}
var defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
var svgDefaults = {
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  role: "img"
};
var commonProps = {
  display: "inline-block"
};
var monotoneProps = {
  backgroundColor: "currentColor"
};
var coloredProps = {
  backgroundColor: "transparent"
};
var propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
var propsToAddTo = {
  WebkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
var inlineDefaults = {
  ...defaultExtendedIconCustomisations,
  inline: true
};
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
var render = (icon, props, name) => {
  const defaultProps = props.inline ? inlineDefaults : defaultExtendedIconCustomisations;
  const customisations = mergeCustomisations(defaultProps, props);
  const mode = props.mode || "svg";
  const style = {};
  const customStyle = props.style || {};
  const componentProps = {
    ...mode === "svg" ? svgDefaults : {}
  };
  if (name) {
    const iconName = stringToIcon(name, false, true);
    if (iconName) {
      const classNames = ["iconify"];
      const props2 = [
        "provider",
        "prefix"
      ];
      for (const prop of props2) {
        if (iconName[prop]) {
          classNames.push("iconify--" + iconName[prop]);
        }
      }
      componentProps.className = classNames.join(" ");
    }
  }
  for (let key in props) {
    const value = props[key];
    if (value === undefined) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "children":
      case "onLoad":
      case "mode":
      case "ssr":
      case "fallback":
        break;
      case "_ref":
        componentProps.ref = value;
        break;
      case "className":
        componentProps[key] = (componentProps[key] ? componentProps[key] + " " : "") + value;
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style.color = value;
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (defaultProps[key] === undefined) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    componentProps.dangerouslySetInnerHTML = {
      __html: cleanUpInnerHTML(replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyReact"))
    };
    return createElement("svg", componentProps);
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL(html),
    width: fixSize(renderAttribs.width),
    height: fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return createElement("span", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  const _window = window;
  if (_window.IconifyPreload !== undefined) {
    const preload = _window.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window.IconifyProviders !== undefined) {
    const providers = _window.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === undefined) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function IconComponent(props) {
  const [mounted, setMounted] = useState(!!props.ssr);
  const [abort, setAbort] = useState({});
  function getInitialState(mounted2) {
    if (mounted2) {
      const name2 = props.icon;
      if (typeof name2 === "object") {
        return {
          name: "",
          data: name2
        };
      }
      const data2 = getIconData(name2);
      if (data2) {
        return {
          name: name2,
          data: data2
        };
      }
    }
    return {
      name: ""
    };
  }
  const [state, setState] = useState(getInitialState(!!props.ssr));
  function cleanup() {
    const callback = abort.callback;
    if (callback) {
      callback();
      setAbort({});
    }
  }
  function changeState(newState) {
    if (JSON.stringify(state) !== JSON.stringify(newState)) {
      cleanup();
      setState(newState);
      return true;
    }
  }
  function updateState() {
    var _a;
    const name2 = props.icon;
    if (typeof name2 === "object") {
      changeState({
        name: "",
        data: name2
      });
      return;
    }
    const data2 = getIconData(name2);
    if (changeState({
      name: name2,
      data: data2
    })) {
      if (data2 === undefined) {
        const callback = loadIcons([name2], updateState);
        setAbort({
          callback
        });
      } else if (data2) {
        (_a = props.onLoad) === null || _a === undefined || _a.call(props, name2);
      }
    }
  }
  useEffect(() => {
    setMounted(true);
    return cleanup;
  }, []);
  useEffect(() => {
    if (mounted) {
      updateState();
    }
  }, [props.icon, mounted]);
  const { name, data } = state;
  if (!data) {
    return props.children ? props.children : props.fallback ? props.fallback : createElement("span", {});
  }
  return render({
    ...defaultIconProps,
    ...data
  }, props, name);
}
var Icon = forwardRef((props, ref) => IconComponent({
  ...props,
  _ref: ref
}));
var InlineIcon = forwardRef((props, ref) => IconComponent({
  inline: true,
  ...props,
  _ref: ref
}));

// src/global/webpack/index.ts
var { Webpack } = BdApi;
function queryToFilter(query) {
  if ("filter" in query)
    return query.filter;
  if ("keys" in query)
    return Webpack.Filters.byKeys(...query.keys);
  if ("prototypeKeys" in query)
    return Webpack.Filters.byPrototypeKeys(...query.prototypeKeys);
  if ("strings" in query)
    return Webpack.Filters.byStrings(...query.strings);
  if ("source" in query)
    return Webpack.Filters.bySource(...query.source);
  if ("regex" in query)
    return Webpack.Filters.byRegex(query.regex);
  if ("displayName" in query)
    return Webpack.Filters.byDisplayName(query.displayName);
  return Webpack.Filters.byStoreName(query.storeName);
}
function resolveModule(filter, options) {
  const opts = options ?? {};
  if (opts.declaration) {
    const { declaration, key, raw, ...rest } = opts;
    const result = Webpack.getMangled(filter, { __value: declaration }, {
      ...rest,
      mapDeclarations: true
    });
    return result?.__value ?? null;
  }
  const mod = Webpack.getModule(filter, opts);
  if (mod == null)
    return null;
  return opts.key ? mod[opts.key] : mod;
}
async function resolveModuleAsync(filter, options) {
  const opts = options ?? {};
  if (opts.declaration) {
    const { declaration, raw, ...rest } = opts;
    await Webpack.waitForModule(filter, rest);
    return resolveModule(filter, opts);
  }
  return await Webpack.waitForModule(filter, opts) ?? null;
}
function resolveQuery(query) {
  if ("map" in query) {
    const q = query;
    const newModule = {};
    const foundModule = Webpack.getModule(q.filter);
    if (foundModule) {
      const remaining = new Map(Object.entries(q.map));
      for (const value of Object.values(foundModule)) {
        for (const [queryKey, queryValue] of remaining) {
          if (queryValue(value)) {
            newModule[queryKey] = value;
            remaining.delete(queryKey);
            break;
          }
        }
        if (remaining.size === 0)
          break;
      }
    }
    return newModule;
  }
  return resolveModule(queryToFilter(query), query.options);
}
var wpFilter = {
  byKeys: (...keys) => Webpack.Filters.byKeys(...keys),
  byPrototypeKeys: (...keys) => Webpack.Filters.byPrototypeKeys(...keys),
  byStrings: (...strings) => Webpack.Filters.byStrings(...strings),
  bySource: (...source) => Webpack.Filters.bySource(...source),
  byRegex: (regex2) => Webpack.Filters.byRegex(regex2),
  byDisplayName: (name) => Webpack.Filters.byDisplayName(name),
  byStoreName: (name) => Webpack.Filters.byStoreName(name),
  combine: (...filters) => Webpack.Filters.combine(...filters),
  not: (filter) => Webpack.Filters.not(filter)
};
function wpGet(filter, options) {
  return resolveModule(filter, options);
}
function wpGetByKeys(keys, options) {
  return resolveModule(Webpack.Filters.byKeys(...keys), options);
}
function wpGetBulkKeyed(queries) {
  return Object.fromEntries(Object.entries(queries).map(([key, query]) => [key, resolveQuery(query)]));
}
async function wpWait(filter, options) {
  return resolveModuleAsync(filter, options);
}
async function wpWaitWithTimeout(filter, { timeout = 1e4, ...options } = {}) {
  return Promise.race([
    resolveModuleAsync(filter, options),
    new Promise((resolve) => setTimeout(() => resolve(null), timeout))
  ]);
}
var PASSTHROUGH_PROPS = new Set([
  "then",
  "toJSON",
  "valueOf",
  "toString",
  Symbol.toPrimitive,
  Symbol.toStringTag,
  Symbol.iterator
]);
var IDENTITY_PROPS = new Set([
  "prototype",
  "contextType",
  "defaultProps",
  "$$typeof"
]);
function resolveLive(filter, options, path) {
  let current = resolveModule(filter, options);
  for (const seg of path) {
    if (current == null)
      return;
    current = current[seg];
  }
  return current;
}
function createLiveProxy(filter, options, path) {
  const target = function wpGetProxyTarget() {};
  return new Proxy(target, {
    get(_t, prop) {
      if (PASSTHROUGH_PROPS.has(prop) || IDENTITY_PROPS.has(prop)) {
        const val = resolveLive(filter, options, path);
        if (val == null)
          return;
        const member = val[prop];
        return typeof member === "function" ? member.bind(val) : member;
      }
      return createLiveProxy(filter, options, [...path, prop]);
    },
    apply(_t, thisArg, args) {
      const fn = resolveLive(filter, options, path);
      const parent = resolveLive(filter, options, path.slice(0, -1));
      return fn.apply(parent ?? thisArg, args);
    },
    construct(_t, args, _newTarget) {
      const ctor = resolveLive(filter, options, path);
      if (typeof ctor !== "function") {
        throw new TypeError(`${String(path[path.length - 1] ?? "target")} is not a constructor`);
      }
      return Reflect.construct(ctor, args, ctor);
    },
    set(_t, prop, value) {
      const val = resolveLive(filter, options, path);
      if (val == null)
        return false;
      val[prop] = value;
      return true;
    },
    has(_t, prop) {
      const val = resolveLive(filter, options, path);
      return val != null && prop in Object(val);
    },
    ownKeys(_t) {
      const val = resolveLive(filter, options, path);
      const keys = val ? Reflect.ownKeys(val) : [];
      if (!keys.includes("prototype"))
        keys.push("prototype");
      return keys;
    },
    getOwnPropertyDescriptor(_t, prop) {
      if (prop === "prototype") {
        return Reflect.getOwnPropertyDescriptor(_t, prop);
      }
      const val = resolveLive(filter, options, path);
      if (val == null)
        return;
      return Object.getOwnPropertyDescriptor(val, prop) ?? {
        enumerable: true,
        configurable: true,
        value: val[prop]
      };
    }
  });
}
function wpGetProxy(filter, options) {
  return createLiveProxy(filter, options, []);
}
function getKey(module2, fn) {
  for (const key in module2) {
    if (fn(module2[key]))
      return { key, module: module2 };
  }
}

// src/global/index.ts
var DefaultOptions = {
  options: {
    searchExports: true
  }
};
var GlobalModules = wpGetBulkKeyed({
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
function CloseAllContextMenus() {
  GlobalModules.Dispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" });
}

// src/global/stores/UserProfilePictureStore.ts
var USER_PFP = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";
var UserProfilePictureStore_default = new class UserProfilePictureStore extends BetterDiscord.Utils.Store {
  users = {};
  constructor() {
    super();
    this.fetch();
  }
  get(userId) {
    const enabled = SettingsStore_default.get("userPfpIntegration");
    if (!enabled)
      return null;
    return this.users[userId];
  }
  hasHash(id) {
    const enabled = SettingsStore_default.get("userPfpIntegration");
    if (!enabled)
      return false;
    return Boolean(this.users[id]);
  }
  async fetch() {
    const data = await BetterDiscord.Net.fetch(USER_PFP);
    const response = await data.json();
    this.users = response.avatars;
  }
  unload() {
    this.users = {};
  }
};

// src/patches/modules/banners.tsx
var { UserStore: UserStore2 } = BetterDiscord.Webpack.Stores;
var TopLeft = styled.div({ zIndex: "100", position: "absolute", padding: "10px" });
var ModalModule = wpGetByKeys(["Modal"]);
var NodePatcher = BetterDiscord.ReactUtils.createNodePatcher();
function Debug({ user }) {
  const revealedText = getRevealedText(user.id);
  const decorationRevealed = getRevealedText(user.id, `\uDB40\uDC2F\uDB40\uDC61`);
  const nameplateRevealed = getRevealedText(user.id, `\uDB40\uDC6E\uDB40\uDC7B`);
  const pfpRevealed = getRevealedText(user.id, `\uDB40\uDC50\uDB40\uDC7B`);
  const dnsRevealed = getRevealedText(user.id, `\uDB40\uDC53\uDB40\uDC7B`);
  const data = {
    pfp: UserProfilePictureStore_default.get(user.id),
    url: UserBackgroundStore_default.get(user.id),
    isImportant: BadgesStore_default.isImportant(user.id),
    revealedText,
    regexMatches: {
      displayNameStyles: extractDisplayNameStyles(dnsRevealed),
      decoration: extractDecoration(decorationRevealed),
      nameplate: extractNameplate(nameplateRevealed),
      profilePicture: extractProfilePicture(pfpRevealed),
      profileEffects: containsProfileEffects(revealedText) ? extractProfileEffects(revealedText) : null,
      profileFrame: containsProfileFrame(revealedText) ? extractProfileFrame(revealedText) : null,
      profileV2: containsBanner(revealedText)
    },
    badges: BadgesStore_default.check(user.id) ? BadgesStore_default.returnRespondingBadges(user.id).map((x) => String(x.id)).join(", ") : "none"
  };
  function OpenModal() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React.createElement(ModalModule.Modal, {
        size: "lg",
        title: "Debug",
        ...props
      }, /* @__PURE__ */ React.createElement("pre", {
        style: {
          color: "#d4d4d4",
          padding: "16px",
          borderRadius: "8px",
          overflow: "auto",
          maxHeight: "70vh",
          fontSize: "24px",
          lineHeight: "1.5",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }
      }, JSON.stringify(data, null, 2)));
    });
  }
  return /* @__PURE__ */ React.createElement(TopLeft, null, /* @__PURE__ */ React.createElement(Icon, {
    icon: "mdi:bug",
    width: "24px",
    color: "white",
    onClick: OpenModal
  }));
}
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
      const newRet = BetterDiscord.Utils.findInTree(ret, (x) => x?.props?.displayProfile, {
        walkable: ["props", "children"]
      });
      try {
        NodePatcher.patch(newRet ?? ret, (props2, res) => {
          const bannerUrl = getBannerUrl(props2.user.id);
          bannerUrl && (res.props.bannerSrc = bannerUrl);
        });
      } catch (e) {
        BetterDiscord.Logger.error("Opened profile was not a valid user profile banner");
      }
      return BadgesStore_default.isImportant(UserStore2.getCurrentUser().id) ? [/* @__PURE__ */ React.createElement(Debug, {
        user: props.user
      }), ret] : ret;
    });
  }
};
// src/global/stores/FFmpegStore.ts
var { Logger, Net, UI } = BetterDiscord;
var BASE_URL = `https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg/`;
var FFmpegStore_default = new class FFmpegStore extends BetterDiscord.Utils.Store {
  ffmpeg;
  loaded = false;
  constructor() {
    super();
  }
  async ensureFFmpeg() {
    if (this.loaded)
      return;
    const defineTemp = window.global.define;
    let ffmpegScript = document.getElementById("ffmpegScript");
    if (ffmpegScript) {
      ffmpegScript.remove();
    }
    delete window.FFmpegWASM;
    function tryFetchFromDisk(filename, encoding) {
      const basepath = _path().join(BdApi.Plugins.folder, "ffmpeg");
      let filepath = _path().join(basepath, filename);
      try {
        if (fs().existsSync(filepath)) {
          let file = fs().readFileSync(filepath, encoding);
          Logger.info(`Fetch from disk for file ${filename} succeeded.`);
          return file;
        } else
          return false;
      } catch (err) {
        Logger.warn("Tried to read " + filename + " from disk but an error occurred.");
        Logger.warn(err);
      }
    }
    async function fetchFFmpeg(filename) {
      const res = await Net.fetch(BASE_URL + filename, { timeout: 1e5 });
      if (res.ok && res.status == 200) {
        return res;
      } else {
        Logger.error(res);
        throw new Error(filename + " failed to fetch.");
      }
    }
    async function fetchBlobUrl(filename) {
      try {
        let blobUrl;
        let file = tryFetchFromDisk(filename, "");
        if (file)
          blobUrl = URL.createObjectURL(new Blob([file]));
        else
          blobUrl = URL.createObjectURL(await (await fetchFFmpeg(filename)).blob());
        return blobUrl;
      } catch (err) {
        Logger.error("An error occurred while fetching " + filename);
        throw err;
      }
    }
    let ffmpegWorkerURL, ffmpegCoreURL, ffmpegURL, ffmpegCoreWasmURL;
    try {
      ffmpegWorkerURL = await fetchBlobUrl("814.ffmpeg.js");
      let ffmpegSrc;
      try {
        let file = tryFetchFromDisk("ffmpeg.js", "utf8");
        if (file)
          ffmpegSrc = file;
        else
          ffmpegSrc = await (await fetchFFmpeg("ffmpeg.js")).text();
      } catch (err) {
        Logger.error("An error occurred while fetching ffmpeg.js");
        throw err;
      }
      ffmpegSrc = ffmpegSrc.replace(`new URL(e.p+e.u(814),e.b)`, `"${ffmpegWorkerURL.toString()}"`);
      ffmpegURL = URL.createObjectURL(new Blob([ffmpegSrc]));
      window.global.define = undefined;
      await new Promise((load, err) => {
        const ffmpegScriptElem = document.createElement("script");
        ffmpegScriptElem.id = "ffmpegScript";
        ffmpegScriptElem.src = ffmpegURL;
        ffmpegScriptElem.onload = load;
        ffmpegScriptElem.onerror = err;
        document.head.appendChild(ffmpegScriptElem);
      });
      window.global.define = defineTemp;
      ffmpegCoreURL = await fetchBlobUrl("ffmpeg-core.js");
      ffmpegCoreWasmURL = await fetchBlobUrl("ffmpeg-core.wasm");
      if (window.FFmpegWASM && ffmpegCoreURL && ffmpegCoreWasmURL && ffmpegWorkerURL) {
        this.ffmpeg = new window.FFmpegWASM.FFmpeg;
        await this.ffmpeg.load({
          coreURL: ffmpegCoreURL,
          wasmURL: ffmpegCoreWasmURL
        });
        Logger.info("FFmpeg load success!");
        this.loaded = true;
        this.ffmpeg.on("log", ({ message }) => {
          console.log(message);
        });
      } else {
        Logger.info("FFmpegWASM", window.FFmpegWASM);
        Logger.info("ffmpegCoreURL", ffmpegCoreURL);
        Logger.info("ffmpegCoreWasmURL", ffmpegCoreWasmURL);
        Logger.info("ffmpegWorkerURL", ffmpegWorkerURL);
        throw new Error("One or more of the necessary components failed to load.");
      }
    } catch (err) {
      UI.showToast("An error occured trying to load FFmpeg.wasm. Check console for details.", {
        type: "error",
        forceShow: true
      });
      Logger.info("FFmpeg failed to load. The clips bypass will not work without this unless the file is already the correct format! Include above and below error messages (if they exist) when reporting!");
      Logger.error(err);
    } finally {
      window.global.define = defineTemp;
      if (ffmpegURL)
        URL.revokeObjectURL(ffmpegURL);
      if (ffmpegCoreURL)
        URL.revokeObjectURL(ffmpegCoreURL);
      if (ffmpegCoreWasmURL)
        URL.revokeObjectURL(ffmpegCoreWasmURL);
      if (ffmpegWorkerURL)
        URL.revokeObjectURL(ffmpegWorkerURL);
    }
  }
  unload() {
    if (this.loaded) {
      this.ffmpeg.terminate();
      this.ffmpeg = undefined;
    }
    const ffmpegScript = document.getElementById("ffmpegScript");
    ffmpegScript && ffmpegScript.remove();
    if (window.FFmpegWASM)
      delete window.FFmpegWASM;
    this.loaded = false;
  }
  getFFmpegInstance() {
    return this.ffmpeg;
  }
};

// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0;i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1;i < 30; ++i) {
    for (var j = b[i];j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0;i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i2 = 0;
  var l = new u16(mb);
  for (;i2 < s; ++i2) {
    if (cd[i2])
      ++l[cd[i2] - 1];
  }
  var le = new u16(mb);
  for (i2 = 1;i2 < mb; ++i2) {
    le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0;i2 < s; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v = le[cd[i2] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1;v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i2 = 0;i2 < s; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0;i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144;i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256;i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280;i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0;i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i2 = 0;i2 < d.length; ++i2) {
    if (d[i2])
      t.push({ s: i2, f: d[i2] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i22].f ? i0++ : i22++];
    r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i2 = 1;i2 < s; ++i2) {
    if (t2[i2].s > maxSym)
      maxSym = t2[i2].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i2 = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (;i2 < s; ++i2) {
      var i2_1 = t2[i2].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i2].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i2;
    }
    for (;i2 >= 0 && dt; --i2) {
      var i2_3 = t2[i2].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i2 = 1;i2 <= s; ++i2) {
    if (c[i2] == cln && i2 != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (;cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (;cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i2];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i2 = 0;i2 < cl.length; ++i2)
    l += cf[i2] * cl[i2];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i2 = 0;i2 < s; ++i2)
    out[o + i2 + 4] = dat[i2];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i2 = 0;i2 < lclt.length; ++i2)
    ++lcfreq[lclt[i2] & 31];
  for (var i2 = 0;i2 < lcdt.length; ++i2)
    ++lcfreq[lcdt[i2] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (;nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i2 = 0;i2 < nlcc; ++i2)
      wbits(out, p + 3 * i2, lct[clim[i2]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0;it < 2; ++it) {
      var clct = lcts[it];
      for (var i2 = 0;i2 < clct.length; ++i2) {
        var len = clct[i2] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i2 = 0;i2 < li; ++i2) {
    var sym = syms[i2];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i3) {
      return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25000);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (;i2 + 2 < s; ++i2) {
      var hv = hsh(i2);
      var imod = i2 & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i2) {
        var rem = s - i2;
        if ((lc_1 > 7000 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
          li = lc_1 = eb = 0, bs = i2;
          for (var j = 0;j < 286; ++j)
            lf[j] = 0;
          for (var j = 0;j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i2 - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i2);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i2 + l] == dat[i2 + l - dif]) {
              var nl = 0;
              for (;nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0;j < mmd; ++j) {
                  var ti = i2 - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i2 + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
      }
    }
    for (i2 = Math.max(i2, wi);i2 < s; ++i2) {
      syms[li++] = dat[i2];
      ++lf[dat[i2]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i2, st.w = wi;
    }
  } else {
    for (var i2 = st.w || 0;i2 < s + lst; i2 += 65535) {
      var e = i2 + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i2, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i2 = 0;i2 < 256; ++i2) {
    var c = i2, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i2] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i2 = 0;i2 < d.length; ++i2)
        cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wbytes = function(d, b, v) {
  for (;v; ++b)
    d[b] = v, v >>>= 8;
};
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (ArrayBuffer.isView(val))
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder;
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder;
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i2 = 0;i2 < str.length; ++i2)
      ar_1[i2] = str.charCodeAt(i2);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i2 = 0;i2 < l; ++i2) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i2 << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i2);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i2 = 0;i2 < files.length; ++i2) {
    var f = files[i2];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}

// src/patches/modules/clipsBypass.ts
var { UserStore: UserStore3 } = BetterDiscord.Webpack.Stores;
async function ffmpegTransmux(arrayBuffer, inFileName = "input.mp4", ffmpegArguments, outFileName = "output.mp4") {
  await FFmpegStore_default.ensureFFmpeg();
  const ffmpeg = FFmpegStore_default.getFFmpegInstance();
  if (!ffmpeg)
    throw new Error(`Can't mux/encode: ffmpeg is not loaded!`);
  inFileName == outFileName && (inFileName = "in_" + inFileName);
  arrayBuffer && await ffmpeg.writeFile(inFileName, new Uint8Array(arrayBuffer));
  BetterDiscord.Logger.log("Approximately equivalent ffmpeg command:");
  BetterDiscord.Logger.log("ffmpeg " + ffmpegArguments.join(" "));
  await ffmpeg.exec(ffmpegArguments);
  const data = await ffmpeg.readFile(outFileName);
  inFileName && ffmpeg.deleteFile(inFileName);
  ffmpeg.deleteFile(outFileName);
  if (data.length == 0)
    throw new Error("An error occurred during muxing/encoding: Output file ended up empty or doesn't exist, " + "likely due to an FFmpeg error. Please check the FFmpeg logs above. " + "If you need assistance, please use the support channel in the Discord server.");
  return data.buffer;
}
function concatArrayBuffers(buf1, buf2) {
  let newArray = new Uint8Array(buf1.byteLength + buf2.byteLength);
  newArray.set(new Uint8Array(buf1), 0);
  newArray.set(new Uint8Array(buf2), buf1.byteLength);
  return newArray.buffer;
}
var udtaBuffer = Uint8Array.fromBase64("AAAuLnV1aWShyFKZM0ZNuIjwg/V6daXv").buffer;
var FREE_FILE_LIMIT = 20971520;
var CLIPS_FILE_LIMIT = 104857600;
async function doClipsBypass(file) {
  const { useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp } = SettingsStore_default.getAll();
  const skippedFileTypes = [
    "video/3gp",
    "video/asf",
    "video/ivf",
    "video/mpeg",
    "audio/mid",
    "audio/basic",
    "audio/mpegurl",
    "audio/3gp"
  ];
  if (skippedFileTypes.includes(file.file.type))
    return file;
  const movTypes = [
    "video/flv",
    "video/ogg",
    "video/wmv",
    "video/mov",
    "audio/wav",
    "audio/aiff",
    "audio/x-ms-wma",
    "audio/mpeg"
  ];
  let outFileName = movTypes.includes(file.file.type) ? "output.mov" : "output.mp4";
  const clipData = {
    id: 0n,
    createdAt: 0,
    version: 3,
    applicationName: "",
    applicationId: "1301689862256066560",
    users: [UserStore3.getCurrentUser().id],
    clipMethod: "manual",
    length: file.file.size,
    thumbnail: "",
    filepath: "",
    name: file.file.name.substring(0, file.file.name.lastIndexOf("."))
  };
  switch (clipTimestamp) {
    default:
    case 0:
      clipData.id = 0n;
      clipData.createdAt = 1420070400000;
      break;
    case 1:
      clipData.id = BigInt(Date.now()) - 1420070400000n << 22n;
      clipData.createdAt = Date.now();
      break;
    case 2:
      clipData.id = BigInt(file.file.lastModified) - 1420070400000n << 22n;
      clipData.createdAt = file.file.lastModified;
      break;
  }
  let modifiedFile = false;
  if ((file.file.size > FREE_FILE_LIMIT || forceClip) && useClipBypass && file.file.type.startsWith("video/") && !skippedFileTypes.includes(file.file.type) && file.file.size <= CLIPS_FILE_LIMIT) {
    const ffmpegVideoClipArgs = [
      "-i",
      file.file.name,
      "-c:v",
      "copy",
      "-c:a",
      "copy",
      "-c:s",
      "mov_text",
      "-dn",
      "-brand",
      "isom/avc1",
      "-movflags",
      "+faststart",
      "-map",
      "0",
      "-map_metadata",
      "-1",
      "-map_chapters",
      "-1",
      "-map",
      "-0:t",
      "-strict",
      "-2",
      outFileName
    ];
    const arrayBuffer = await file.file.arrayBuffer();
    const videoBuffer = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegVideoClipArgs, outFileName), udtaBuffer);
    file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", {
      type: "video/mp4"
    });
    modifiedFile = true;
  } else if (useAudioClipBypass && (file.file.size > FREE_FILE_LIMIT || forceAudioClip) && file.file.type.startsWith("audio/") && file.file.size <= CLIPS_FILE_LIMIT) {
    const ffmpegAudioClipArgs = [
      "-i",
      file.file.name,
      "-f",
      "lavfi",
      "-i",
      "color=c=black:s=300x100",
      "-shortest",
      "-fflags",
      "+shortest",
      "-map",
      "0:v?",
      "-map",
      "1:v",
      "-map",
      "0:a",
      "-disposition:v",
      "default",
      "-brand",
      "isom/avc1",
      "-movflags",
      "+faststart",
      "-map_metadata",
      "-1",
      "-dn",
      "-map_chapters",
      "-1",
      "-preset",
      "ultrafast",
      "-c:v",
      "libx264",
      "-c:a",
      "copy",
      "-strict",
      "-2",
      "-tune",
      "stillimage",
      "-r",
      "5",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "crop=trunc(iw/2)*2:trunc(ih/2)*2",
      "-max_interleave_delta",
      "1",
      outFileName
    ];
    const arrayBuffer = await file.file.arrayBuffer();
    const videoBuffer = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegAudioClipArgs, outFileName), udtaBuffer);
    file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", {
      type: "video/mp4"
    });
    modifiedFile = true;
  } else if (file.file.size >= FREE_FILE_LIMIT && file.file.size <= CLIPS_FILE_LIMIT && zipClip) {
    const clipMaFFmpegArgs = [
      "-f",
      "lavfi",
      "-i",
      "color=c=black:s=128x96:duration=1",
      "-f",
      "lavfi",
      "-i",
      "anullsrc=r=44100:cl=mono",
      "-shortest",
      "-fflags",
      "+shortest",
      "-brand",
      "isom/avc1",
      "-movflags",
      "+faststart",
      "-map_metadata",
      "-1",
      "-preset",
      "ultrafast",
      "-vframes",
      "5",
      "-c:v",
      "mjpeg",
      "output.mp4"
    ];
    const archiveMimeTypes = [
      "x-7z-compressed",
      "x-bzip",
      "x-bzip2",
      "x-rar-compressed",
      "x-tar",
      "gzip",
      "x-gzip",
      "zip",
      "x-zip-compressed"
    ];
    const videoArrayBuffer = await ffmpegTransmux(undefined, "", clipMaFFmpegArgs, "output.mp4");
    const clipMaBuffer = concatArrayBuffers(videoArrayBuffer, udtaBuffer);
    if (!clipMaBuffer)
      return file;
    if (archiveMimeTypes.includes(file.file.type.replace("application/", ""))) {
      const arrayBuffer = await file.file.arrayBuffer();
      const newArrBuf = concatArrayBuffers(clipMaBuffer, arrayBuffer);
      file.file = new File([new Uint8Array(newArrBuf)], file.file.name + ".mp4", {
        type: "video/mp4"
      });
      clipData.name = file.file.name;
    } else {
      let fileExtension = file.file.name.substring(file.file.name.lastIndexOf(".") + 1);
      let fileToZip = {};
      fileToZip[file.file.name] = await file.file.bytes();
      const zipFile = zipSync(fileToZip, { level: 6 }).buffer;
      const zipClipArrayBuffer = concatArrayBuffers(clipMaBuffer, zipFile);
      clipData.name = fileExtension.match(/z?\d+/) ? file.file.name + ".zip" : clipData.name += ".zip";
      file.file = new File([new Uint8Array(zipClipArrayBuffer)], clipData.name + ".mp4", {
        type: "video/mp4"
      });
    }
    modifiedFile = true;
  }
  modifiedFile && (file.clip = clipData);
  return file;
}
function genericErrorHandler(err2, currentFile = undefined) {
  BetterDiscord.UI.showToast("Something went wrong. See console for details.", {
    type: "error",
    forceShow: true
  });
  BetterDiscord.Logger.error(err2);
  if (currentFile) {
    BetterDiscord.Logger.info("Current file information for debugging:", currentFile);
    BetterDiscord.Logger.info(`File Type: "${currentFile?.file?.type}"`);
  }
}
var clipsBypass_default = {
  name: "Clips Bypass",
  description: "Modify files to be sendable as a clip, changing the file upload limit to 100MB.",
  ids: undefined,
  waitFor: [(x2) => x2.addFiles],
  apply(finale, patcher) {
    patcher.instead(finale.modules[0], "addFiles", async (_, [args], originalFunction) => {
      const { useClipBypass, useAudioClipBypass, zipClip } = SettingsStore_default.getAll();
      if (!args?.files?.length || !useClipBypass && !useAudioClipBypass && !zipClip)
        return originalFunction.apply(_, [args]);
      args.files = await Promise.all(args.files.map(async (currentFile) => {
        try {
          currentFile = await doClipsBypass(currentFile) ?? currentFile;
        } catch (err2) {
          genericErrorHandler(err2, currentFile);
        }
        return currentFile;
      }));
      return originalFunction.apply(_, [args]);
    });
  }
};

// src/patches/modules/_sendMessage.ts
var { StickersStore, SoundboardStore, EmojiStore } = BetterDiscord.Webpack.Stores;
var StickerTypeToExtension;
((StickerTypeToExtension2) => {
  StickerTypeToExtension2[StickerTypeToExtension2[".png"] = 1] = ".png";
  StickerTypeToExtension2[StickerTypeToExtension2[".png"] = 2] = ".png";
  StickerTypeToExtension2[StickerTypeToExtension2[".json"] = 3] = ".json";
  StickerTypeToExtension2[StickerTypeToExtension2[".gif"] = 4] = ".gif";
})(StickerTypeToExtension ||= {});
var CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", {
  searchExports: true
});
async function downloadAndUploadUrls(filesToDownload, channelId, msg, extraData, send2, numFilesInMessage = 1, alwaysSendInNewMessage = false) {
  if (!filesToDownload.length)
    return;
  const preexisting = extraData.attachmentsToUpload ?? [];
  extraData.attachmentsToUpload = preexisting;
  const uploads = await Promise.all(filesToDownload.map(async (f) => {
    const blob = await BetterDiscord.Net.fetch(f.url).then((r) => r.blob());
    return new CloudUploader({
      file: new File([blob], f.filename),
      isClip: false,
      isThumbnail: false,
      platform: 1,
      isImage: true
    }, channelId, false, 0);
  }));
  if (preexisting.length || alwaysSendInNewMessage) {
    await send2(channelId, msg, extraData);
  } else {
    extraData.attachmentsToUpload = uploads.splice(0, numFilesInMessage);
    await send2(channelId, msg, extraData);
  }
  extraData.attachmentsToUpload = [];
  msg.content = "";
  while (uploads.length) {
    await send2(channelId, { content: "" }, { attachmentsToUpload: uploads.splice(0, numFilesInMessage) });
  }
}
var SOUNDMOJI_REGEX = /<sound:\d+:\d+>/g;
var _sendMessage_default = {
  name: "Send Message",
  description: "Upload emoji, soundmoji, stickers, and insta-clips.",
  ids: undefined,
  waitFor: [(x2) => x2._sendMessage],
  apply(finale, patcher) {
    patcher.instead(finale.modules[0], "_sendMessage", async (_, [channelId, msg, extraData], send2) => {
      if (extraData.poll || extraData.activityAction || msg.location === "forwarding")
        return send2.apply(_, [channelId, msg, extraData]);
      const emojiBypassType = SettingsStore_default.get("emojiBypassType");
      const {
        zipClip,
        useClipBypass,
        useAudioClipBypass,
        stickerBypass,
        soundmojiEnabled,
        emojiBypass
      } = SettingsStore_default.getAll();
      let urlsToUpload = [];
      for (let i2 = 0;i2 < msg.validNonShortcutEmojis.length; i2++) {
        const emoji = msg.validNonShortcutEmojis[i2];
        if (!emojiBypass)
          break;
        if (shouldSkipEmojiBypass(emoji, channelId))
          continue;
        const emojiString = getEmojiString(emoji);
        if (msg.content.includes(`-${emojiString}`)) {
          msg.content = msg.content.replace("-" + emojiString, emojiString);
          continue;
        }
        const emojiUrl = getEmojiUrl(emoji);
        switch (emojiBypassType) {
          case 0:
            msg.content = msg.content.replace(emojiString, "");
            urlsToUpload.push({
              url: emojiUrl,
              filename: emoji.name + getEmojiExtension(emoji)
            });
            break;
          case 1:
          case 3:
            msg.content = msg.content.replace(emojiString, `[${emoji.name}](${emojiUrl}&${i2})`);
            break;
          case 2:
            msg.content = msg.content.replace(emojiString, `${emojiUrl}&${i2}`);
            break;
        }
      }
      if (extraData.stickerIds && stickerBypass) {
        extraData.stickerIds = extraData.stickerIds.map((stickerId, index) => {
          const STICKER_PREFIX = "https://media.discordapp.net/stickers/";
          const sticker = StickersStore.getStickerById(stickerId);
          if (sticker.format_type == 3)
            return stickerId;
          let extension = StickerTypeToExtension[sticker.format_type];
          urlsToUpload.push({
            url: `${STICKER_PREFIX + stickerId + extension}?size=4096&quality=lossless`,
            filename: `${sticker.name}${extension}`
          });
          return null;
        });
        extraData.stickerIds = extraData.stickerIds.filter(Boolean);
      }
      let soundmojiUrls = [];
      if (soundmojiEnabled) {
        const SOUNDBOARD_PREFIX = "https://cdn.discordapp.com/soundboard-sounds/";
        const soundmojiStrings = msg.content.match(SOUNDMOJI_REGEX);
        const soundmojiObjects = soundmojiStrings?.map?.((x2) => SoundboardStore.getSoundById(x2?.split?.(":")?.[2]?.slice?.(0, -1)));
        soundmojiObjects?.forEach?.((x2) => soundmojiUrls.push({
          url: SOUNDBOARD_PREFIX + x2.soundId,
          filename: x2.name + ".ogg"
        }));
        for (let i2 = 0;i2 < soundmojiObjects?.length; i2++) {
          const sound = soundmojiObjects[i2];
          if (!sound)
            continue;
          const soundmojiString = soundmojiStrings[i2];
          !sound.emojiId && sound.emojiName && (msg.content = msg.content.replace(soundmojiString, `( ${sound.emojiName} ${sound.name} )`));
          if (sound?.emojiId) {
            let emoji = EmojiStore.getCustomEmojiById(sound.emojiId);
            msg.content = msg.content.replace(soundmojiString, `( [${emoji?.name ?? "someCustomEmoji"}](${EMOJI_PREFIX + sound.emojiId}.${emoji?.animated ? "webp" : "png"}?size=32&animated=true) ${sound.name} ) `);
          }
          !sound.emojiId && !sound.emojiName && (msg.content = msg.content.replace(soundmojiString, `( ${sound.name} ) `));
        }
      }
      if (extraData?.location === "instant_upload" && (zipClip || useClipBypass || useAudioClipBypass)) {
        await Promise.all(extraData.attachmentsToUpload.map(async (attachment) => {
          attachment.item = await doClipsBypass(attachment.item);
          attachment.filename = attachment.item.file.name;
          attachment.clip = attachment.item.clip;
          return attachment;
        }));
      }
      if (urlsToUpload?.length > 0)
        downloadAndUploadUrls(urlsToUpload, channelId, msg, extraData, send2, 1, false);
      if (soundmojiUrls?.length > 0)
        downloadAndUploadUrls(soundmojiUrls, channelId, msg, extraData, send2, 10, true);
      if (!urlsToUpload.length && !soundmojiUrls.length)
        send2(channelId, msg, extraData);
    });
  }
};
// src/patches/modules/unlockEmojis.ts
var unlockEmojis_default = {
  name: "Unlock Emojis",
  description: "Fully unlocks emojis.",
  waitFor: [BetterDiscord.Webpack.Filters.byKeys("isEmojiFilteredOrLocked")],
  apply(finale, patcher) {
    ["isEmojiFilteredOrLocked", "isEmojiDisabled", "isEmojiFiltered", "isEmojiPremiumLocked"].map((x2) => patcher.instead(finale.modules[0], x2, (_, args, callback) => {
      const emojiBypassEnabled = SettingsStore_default.get("emojiBypass");
      if (emojiBypassEnabled)
        return false;
      else
        return callback.apply(_, args);
    }));
    patcher.instead(finale.modules[0], "getEmojiUnavailableReason", (_, args, callback) => {
      const emojiBypassEnabled = SettingsStore_default.get("emojiBypass");
      if (emojiBypassEnabled)
        return;
      else
        return callback.apply(_, args);
    });
  }
};
// src/patches/modules/getUserBannerURL.ts
var getUserBannerURL_default = {
  name: "getUserBannerURL",
  description: "Force animate the user banner URL",
  waitFor: [(x2) => x2.getEmojiURL],
  apply(finale, patcher) {
    const AvatarDefaults = finale.modules[0];
    patcher.before(AvatarDefaults, "getUserBannerURL", (_, args) => {
      if (!SettingsStore_default.get("fakeProfileBanners"))
        return;
      args[0].canAnimate = true;
    });
  }
};
// src/patches/modules/appIcons.tsx
var { AppIconPersistedStoreState, SelectedGuildStore: SelectedGuildStore3 } = BetterDiscord.Webpack.Stores;
var appIcons_default = {
  name: "appIcons",
  description: "Lets user select app icon",
  apply(finale, patcher) {
    const appIconsEnabled = SettingsStore_default.get("unlockAppIcons");
    appIconsEnabled && GlobalModules.Dispatcher.dispatch({
      type: "APP_ICON_UPDATED",
      id: SettingsStore_default.get("appIcon")
    });
    const AppIcon = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("M19.73 4.87a18.2"), {
      render: (x2) => x2
    });
    const CustomAppIcon = BetterDiscord.Webpack.getByStrings(".iconSource,width:");
    patcher.instead(AppIcon, "render", (_, [args], callback) => {
      const appIconsEnabled2 = SettingsStore_default.get("unlockAppIcons");
      if (!appIconsEnabled2)
        return callback(args);
      const desktopIcon = AppIconPersistedStoreState.getCurrentDesktopIcon();
      if (desktopIcon == "AppIcon" || SelectedGuildStore3.getGuildId() == undefined) {
        return callback(args);
      } else {
        return /* @__PURE__ */ React.createElement(CustomAppIcon, {
          size: 40,
          id: SettingsStore_default.get("appIcon")
        });
      }
    });
  }
};
// src/patches/modules/streamBypass.ts
var streamBypass_default = {
  name: "streamBypass",
  description: "Custom Bitrates, FPS, Resolution",
  waitFor: [
    BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"),
    BetterDiscord.Webpack.Filters.bySource("preset)&&", "resolution&&", "fps&&")
  ],
  apply(finale, patcher) {
    const _class = finale.modules[0];
    patcher.before(_class.prototype, "updateVideoQuality", (e) => {
      const { CustomBitrateEnabled, minBitrate, targetBitrate, maxBitrate, voiceBitrate } = SettingsStore_default.getAll();
      const vqm = e.videoQualityManager;
      const vqmOpt = vqm.options;
      voiceBitrate >= 0 && e.setVoiceBitRate(voiceBitrate * 1000);
      let quality = {
        bitrateMax: CustomBitrateEnabled && maxBitrate > 0 ? maxBitrate * 1000 : null,
        bitrateMin: CustomBitrateEnabled && minBitrate >= 0 ? minBitrate * 1000 : null,
        bitrateTarget: CustomBitrateEnabled && targetBitrate >= 0 ? targetBitrate * 1000 : null
      };
      vqmOpt.videoBitrateFloor = CustomBitrateEnabled && minBitrate > 0 ? minBitrate * 1000 : 150000;
      vqm.setGoliveQuality(quality);
      e.context == "default" && vqm.setQualityOverwrite({
        ...quality
      });
    });
    patcher.instead(finale.modules[1], Object.keys(finale.modules[1]).find(Boolean), (e, args, originalFunction) => {
      return SettingsStore_default.get("screenSharing") ?? originalFunction.apply(e, args);
    });
  }
};
// src/patches/modules/gifPickerContext.tsx
var GIFPickerRender = BetterDiscord.Webpack.getByPrototypeKeys("renderGIF", {
  searchExports: true
});
var gifPickerContext_default = {
  name: "GIF Picker Context Menu",
  description: "Adds copy/open url context menu to GIFs in GIF Picker.",
  ids: undefined,
  waitFor: [],
  apply(finale, patcher) {
    patcher.after(GIFPickerRender.prototype, "render", (instance, __, ret) => {
      if (!SettingsStore_default.get("extraContextMenus"))
        return;
      ret.props.onContextMenu = (event) => {
        let url = instance?.props?.item?.url ? instance.props.item.url : instance.props.src;
        url.startsWith("//") && (url = "https:" + url);
        function copyUrl() {
          copyToClipboard(url);
        }
        function openUrl() {
          window.open(url);
        }
        const Menu = /* @__PURE__ */ React.createElement(BetterDiscord.ContextMenu.Menu, {
          onClose: CloseAllContextMenus
        }, /* @__PURE__ */ React.createElement(BetterDiscord.ContextMenu.Item, {
          leadingAccessory: {
            type: "icon",
            icon: () => /* @__PURE__ */ React.createElement(Icon, {
              width: "22",
              icon: "mdi:content-copy"
            })
          },
          label: /* @__PURE__ */ React.createElement(ContextMenuWrapper, null, /* @__PURE__ */ React.createElement(ContextMenuLabel, null), /* @__PURE__ */ React.createElement("span", null, "Copy GIF URL")),
          id: "yabd-copy-url-gif-picker",
          action: copyUrl
        }), /* @__PURE__ */ React.createElement(BetterDiscord.ContextMenu.Item, {
          leadingAccessory: {
            type: "icon",
            icon: () => /* @__PURE__ */ React.createElement(Icon, {
              width: "22",
              icon: "mdi:open-in-browser"
            })
          },
          label: /* @__PURE__ */ React.createElement(ContextMenuWrapper, null, /* @__PURE__ */ React.createElement(ContextMenuLabel, null), /* @__PURE__ */ React.createElement("span", null, "Open GIF URL")),
          id: "yabd-open-url-gif-picker",
          action: openUrl
        }));
        BetterDiscord.ContextMenu.open(event, () => Menu);
      };
    });
  }
};
// src/patches/modules/videoCodecs.ts
var streamSettingsMod = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("getCodecOptions"), {
  Connection: (x2) => x2?.prototype?.getCodecOptions
}, { mapDeclarations: true });
var videoCodecs_default = {
  name: "Video Codec",
  description: "Applies chosen video codec.",
  ids: undefined,
  apply(finale, patcher) {
    patcher.after(streamSettingsMod?.Connection?.prototype, "getCodecOptions", (_, __, ret) => {
      const videoCodec = SettingsStore_default.get("videoCodec2");
      videoCodec >= 0 && (ret.videoEncoder = ret.videoDecoders[videoCodec]);
    });
  }
};
// src/patches/modules/maxFileSize.ts
var MaxFileSizeMod = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource('klass:"photoshop"'), {
  getMaxFileSize: (x2) => x2.toString().includes("getUserMaxFileSize"),
  exceedsMessageSizeLimit: (x2) => x2.toString().includes("Array.from(", ".size>")
});
var maxFileSize_default = {
  name: "File Size",
  description: "Disables the max file size popup (used for clips).",
  ids: undefined,
  apply(finale, patcher) {
    patcher.instead(MaxFileSizeMod, "getMaxFileSize", (_, [guildId], originalFunction) => {
      const videoClipsEnabled = SettingsStore_default.get("useClipBypass");
      const audioClipsEnabled = SettingsStore_default.get("useAudioClipBypass");
      const zipClipsEnabled = SettingsStore_default.get("zipClip");
      let normal = originalFunction(guildId);
      if (videoClipsEnabled || audioClipsEnabled || zipClipsEnabled)
        return Math.max(100 * 1024 * 1024, normal);
      else
        return normal;
    });
    patcher.instead(MaxFileSizeMod, "exceedsMessageSizeLimit", () => {
      return false;
    });
  }
};
// src/patches/modules/sharpenStreams.tsx
var { React: React2 } = BetterDiscord;
function Sharpener({ userId }) {
  let ref = BetterDiscord.React.useRef(null);
  const sharpnessSetting = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => SettingsStore_default.get("userSharpenPreferences")[userId] ?? 0);
  const sharpness = sharpnessSetting / 100;
  const [size, setSize] = BetterDiscord.React.useState({
    width: 1980,
    height: 1980
  });
  let filterIntensityFactoringScreen = size.height / screen.height * 1.5;
  filterIntensityFactoringScreen > 1 && (filterIntensityFactoringScreen = 1);
  BetterDiscord.React.useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((ResizeObserverEntry) => {
        if (ResizeObserverEntry?.[0]) {
          setSize({
            width: ResizeObserverEntry[0].contentRect.width,
            height: ResizeObserverEntry[0].contentRect.height
          });
        }
      });
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  return /* @__PURE__ */ React2.createElement("svg", {
    ref,
    style: { width: "100%", height: "100%" }
  }, /* @__PURE__ */ React2.createElement("filter", {
    id: "yabd-svgSharpen-" + userId,
    colorInterpolationFilters: "sRGB"
  }, /* @__PURE__ */ React2.createElement("feConvolveMatrix", {
    order: "3",
    kernelMatrix: "0 -1 0 -1 5 -1 0 -1 0",
    result: "sharpen"
  }), /* @__PURE__ */ React2.createElement("feComposite", {
    in: "SourceGraphic",
    in2: "sharpen",
    operator: "arithmetic",
    result: "userPreference",
    k1: "0",
    k2: 1 - sharpness,
    k3: sharpness,
    k4: "0"
  }), /* @__PURE__ */ React2.createElement("feComposite", {
    id: `yabd-svgSharpen-${userId}-size`,
    in: "SourceGraphic",
    in2: "userPreference",
    operator: "arithmetic",
    k1: "0",
    k2: 1 - filterIntensityFactoringScreen,
    k3: filterIntensityFactoringScreen,
    k4: "0"
  })));
}
var sharpenStreams_default = {
  name: "Stream Sharpener",
  description: "Sharpens streams.",
  ids: undefined,
  waitFor: [
    BetterDiscord.Webpack.Filters.bySource("VideoStream", "videoComponent"),
    BetterDiscord.Webpack.Filters.bySource("backgroundKey", "onForceIdle")
  ],
  apply(finale, patcher) {
    const mod = Object.values(finale.modules[0]).find((x2) => x2.type);
    patcher.after(mod, "type", (_, [args], ret) => {
      if (!SettingsStore_default.get("sharpenStreams"))
        return;
      ret.props.children.push(/* @__PURE__ */ React2.createElement(Sharpener, {
        userId: args.userId
      }));
      ret?.props?.children?.[0] && (ret.props.children[0].props.style = { filter: `url(#yabd-svgSharpen-${args.userId})` });
    });
    const pipPlayerMod = getKey(finale.modules[1], (x2) => x2?.toString?.()?.includes?.("backgroundKey"));
    patcher.after(pipPlayerMod?.module, pipPlayerMod?.key, (_, [args], ret) => {
      if (!SettingsStore_default.get("sharpenStreams"))
        return;
      const userId = args?.backgroundKey?.split?.(":")?.[3];
      if (!userId)
        return;
      ret.props.children.push(/* @__PURE__ */ React2.createElement(Sharpener, {
        userId
      }));
      ret.props.style = { filter: `url(#yabd-svgSharpen-${userId})` };
    });
  }
};
// src/patches/modules/unlockStickers.ts
var stickerSendability = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("SENDABLE_WITH_BOOSTED_GUILD", "canUseCustomStickersEverywhere"), {
  getStickerSendability: (x2) => x2.toString().includes("canUseCustomStickersEverywhere"),
  isSendableSticker: (x2) => typeof x2 === "function" && !x2.toString().includes("canUseCustomStickersEverywhere")
});
var unlockStickers_default = {
  name: "Unlock Stickers",
  description: "Fully unlocks stickers.",
  apply(finale, patcher) {
    patcher.instead(stickerSendability, "getStickerSendability", (_, args, callback) => {
      const { stickerBypass, forceStickersUnlocked } = SettingsStore_default.getAll();
      if (!stickerBypass && !forceStickersUnlocked)
        return callback.apply(_, args);
      return 0;
    });
    patcher.instead(stickerSendability, "isSendableSticker", (_, args, callback) => {
      const { stickerBypass, forceStickersUnlocked } = SettingsStore_default.getAll();
      if (!stickerBypass && !forceStickersUnlocked)
        return callback.apply(_, args);
      return true;
    });
  }
};
// src/patches/modules/renderMessage.tsx
var { React: React3 } = BetterDiscord;
var MessageEmoji = BetterDiscord.Webpack.getByStrings(",nudgeAlignIntoViewport:!0,position:", "jumboable?", { searchExports: true });
var renderMessage_default = {
  name: "Render Message",
  description: "Replaces hyperlinked emojis with fakemoji.",
  ids: undefined,
  waitFor: [BetterDiscord.Webpack.Filters.bySource(".SEND_FAILED,")],
  apply(finale, patcher) {
    const mod = Object.values(finale.modules[0]).find((o) => typeof o === "object");
    patcher.before(mod, "type", (_, [args]) => {
      if (!SettingsStore_default.get("fakeInlineVencordEmotes"))
        return;
      for (let i2 = 0;i2 < args.content.length; i2++) {
        let contentItem = args.content[i2];
        if (!contentItem?.props?.title || !contentItem?.props?.href?.startsWith(EMOJI_PREFIX) || contentItem?.props?.href === contentItem?.props?.title)
          continue;
        const emojiName = contentItem.props?.children[0]?.props?.children ? contentItem.props?.children[0]?.props?.children : "unknownEmoji";
        const emojiElem = /* @__PURE__ */ React3.createElement(MessageEmoji, {
          node: {
            name: `:${emojiName}:`,
            src: contentItem.props.href,
            type: "emoji",
            emojiId: contentItem.props.href.match(EMOJI_ID_FROM_URL_REGEX).find(Boolean),
            animated: true,
            jumboable: false
          },
          channelId: args.message.channel_id,
          messageId: args.message.id,
          enableClick: true
        });
        args.content[i2] = emojiElem;
      }
    });
  }
};
// src/patches/modules/renderMessageEmbeds.ts
var EMOJI_HYPERLINK_REGEX = /\[.*?\]\(https:\/\/cdn\.discordapp\.com\/emojis\/\d+\.(png|webp|gif|avif|jpg|jpeg).*?\)/;
var renderMessageEmbeds_default = {
  name: "Render Message Embeds",
  description: "Removes emoji link embeds for inline fakemoji.",
  ids: undefined,
  waitFor: [BetterDiscord.Webpack.Filters.bySource("renderEmbeds", "renderSuppressEmbeds")],
  mangled: {
    renderEmbeds: (x2) => x2?.toString?.().includes?.("renderSuppressEmbeds")
  },
  apply(finale, patcher) {
    patcher.before(finale.mangled, "renderEmbeds", (_, [args]) => {
      if (!SettingsStore_default.get("fakeInlineVencordEmotes"))
        return;
      const message = args?.message;
      let embeds = message?.embeds;
      for (let i2 = 0;i2 < embeds?.length; i2++) {
        const embed = embeds[i2];
        if (!embed?.url || !embed?.url?.startsWith(EMOJI_PREFIX) || message.content.replace(EMOJI_HYPERLINK_REGEX, "").trim() == "" || !args.message.content.includes(`](${embed.url})`))
          continue;
        delete embeds[i2];
      }
      message.embeds = embeds.filter(Boolean);
    });
  }
};
// src/patches/modules/editMessage.ts
var { EmojiStore: EmojiStore2 } = BetterDiscord.Webpack.Stores;
var editMessage_default = {
  name: "Edit Message",
  description: "Replaces emoji URLs and hyperlinks with emoji string when starting editing, and performs emoji bypass when finished editing.",
  ids: undefined,
  waitFor: [(x2) => x2._sendMessage],
  apply(finale, patcher) {
    patcher.before(finale.modules[0], "editMessage", (_, [channelId, msgId, msg]) => {
      const emojiBypassEnabled = SettingsStore_default.get("emojiBypass");
      if (!emojiBypassEnabled)
        return;
      const emojiBypassType = SettingsStore_default.get("emojiBypassType");
      const editMessageWithEmoji = SettingsStore_default.get("editMessageWithEmoji");
      if (!editMessageWithEmoji)
        return;
      let matches = msg.content.match(EMOJI_STRING_REGEX);
      for (let i2 = 0;i2 < matches?.length; i2++) {
        const emojiString = matches[i2];
        let emojiId = emojiString.replace("<", "").replace(">", "").split(":")[2];
        const emoji = EmojiStore2.getCustomEmojiById(emojiId);
        if (shouldSkipEmojiBypass(emoji, channelId))
          continue;
        const emojiUrl = getEmojiUrl(emoji);
        switch (emojiBypassType) {
          default:
          case 0:
          case 1:
          case 3:
            msg.content = msg.content.replace(emojiString, `[${emoji.name}](${emojiUrl}&${i2})`);
            break;
          case 2:
            msg.content = msg.content.replace(emojiString, `${emojiUrl}&${i2}`);
            break;
        }
      }
    });
    patcher.before(finale.modules[0], "startEditMessageRecord", (_, [channelId, msg]) => {
      const editMessageWithEmoji = SettingsStore_default.get("editMessageWithEmoji");
      if (!msg?.content || !editMessageWithEmoji)
        return;
      function replaceMatchWithEmojiString(match) {
        const emoji = EmojiStore2.getCustomEmojiById(match.match(EMOJI_ID_FROM_URL_REGEX));
        const emojiString = getEmojiString(emoji);
        msg.content = msg.content.replace(match, emojiString);
      }
      let hyperlinkMatches = msg.content.match(HYPERLINK_EMOJI_REGEX);
      hyperlinkMatches?.forEach?.((match) => replaceMatchWithEmojiString(match));
    });
  }
};
// src/patches/modules/clientThemes.tsx
var CustomUserThemeState = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("setColors", "setChassisMixAmount", "setGradientAngle", "setAll", "colors:[],"), {
  state: (x2) => x2?.setState
});
function applySavedClientTheme() {
  const customUserThemeSettings = SettingsStore_default.get("customUserThemeSettings");
  const gradientPresetId = SettingsStore_default.get("lastGradientSettingStore");
  if (customUserThemeSettings.custom) {
    CustomUserThemeState.state.getState().setAll({
      colors: customUserThemeSettings.custom?.colors,
      chassisMixAmount: customUserThemeSettings.custom?.baseMix,
      gradientAngle: customUserThemeSettings.custom?.gradientAngle
    });
  } else {
    CustomUserThemeState.state.setState(CustomUserThemeState.state.getInitialState());
  }
  GlobalModules.Dispatcher.dispatch({
    type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
    changes: {
      appearance: {
        shouldSync: false,
        settings: {
          clientThemeSettings: customUserThemeSettings.custom ? customUserThemeSettings.custom : gradientPresetId > -1 ? { backgroundGradientPresetId: gradientPresetId } : null,
          theme: customUserThemeSettings.theme,
          developerMode: true
        }
      }
    }
  });
  if (gradientPresetId >= 0) {
    GlobalModules.Dispatcher.dispatch({
      type: "UPDATE_BACKGROUND_GRADIENT_PRESET",
      presetId: gradientPresetId
    });
  }
}
var clientThemes_default = {
  name: "clientThemes",
  description: "Saves and applies gradient client themes.",
  waitFor: [
    BetterDiscord.Webpack.Filters.bySource("changes:{appearance:{settings:{clientThemeSettings:{")
  ],
  mangled: {
    saveClientTheme: (x2) => x2?.toString?.()?.includes?.("SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE")
  },
  apply(finale, patcher) {
    SettingsStore_default.get("clientThemes") && applySavedClientTheme();
    patcher.instead(finale.mangled, "saveClientTheme", (_, [args], originalFunction) => {
      if (!SettingsStore_default.get("clientThemes"))
        return originalFunction.apply(_, [args]);
      SettingsStore_default.set("customUserThemeSettings", {
        custom: args.customUserThemeSettings ? args.customUserThemeSettings : false,
        theme: args.theme
      });
      SettingsStore_default.set("lastGradientSettingStore", args.backgroundGradientPresetId >= 0 ? args.backgroundGradientPresetId : -1);
      applySavedClientTheme();
    });
  }
};
// src/patches/modules/userCallTileBg.ts
var { React: React4 } = BetterDiscord;
var userCallTileBg_default = {
  name: "fakeBanners",
  description: "3y3 banners",
  ids: undefined,
  waitFor: [
    BetterDiscord.Webpack.Filters.bySource("getSelectedParticipant", "CHANNEL_CALL_POPOUT", "avatarDecoration", "backgroundSrc", "getAvatarURL")
  ],
  apply(finale, patcher) {
    const mod = getKey(finale.modules[0], (x2) => x2.toString?.().includes?.("getSelectedParticipant"));
    patcher.after(mod?.module, mod?.key, (_, [args], ret) => {
      const bannerUrl = getBannerUrl(args.participant.id);
      const callTileBackgroundEnabled = SettingsStore_default.get("voiceTileBannerBackground");
      if (!bannerUrl || !callTileBackgroundEnabled || !ret)
        return;
      ret.props.children && (ret.props.children = React4.cloneElement(ret.props.children, {
        style: {
          backgroundImage: `url('${bannerUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }
      }));
    });
  }
};
// src/patches/modules/goLiveModal.tsx
var { React: React5, Components } = BetterDiscord;
var { ApplicationStreamingSettingsStore, MediaEngineStore, UserStore: UserStore4 } = BetterDiscord.Webpack.Stores;
var FooterColumn = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%"
});
var FooterRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%"
});
var ModalBody = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  padding: "16px"
});
var FieldWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "4px"
});
var FieldLabel = styled.label({
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--text-muted)",
  textTransform: "uppercase"
});
var ModeRow = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  padding: "0 16px 16px 16px"
});
var ToggleRow = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  padding: "0 16px 16px 16px"
});
var AdminIcon = () => /* @__PURE__ */ React5.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "22px",
  height: "22px",
  viewBox: "0 0 24 24"
}, /* @__PURE__ */ React5.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /* @__PURE__ */ React5.createElement("path", {
  fill: "currentColor",
  d: "M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z"
}));
var IconModule = wpGetByKeys(["Icon", "ChannelIcon"]);
var ModalModule2 = wpGetByKeys(["Modal"]);
var MODES = [
  {
    label: "4K Mode",
    patch: { CustomResolution: 2160, CustomFPS: 60 }
  },
  {
    label: "2K Mode",
    patch: { CustomResolution: 1440, CustomFPS: 60 }
  },
  {
    label: "Deez Nutz Mode",
    patch: { CustomResolution: 20, CustomFPS: 60 }
  },
  {
    label: "Screen Reader Mode",
    patch: { CustomResolution: 1440, CustomFPS: 15 }
  }
];
function ConfigModal({ props, onClose, forceQuality }) {
  const [data, setData] = React5.useState(() => SettingsStore_default.getAll());
  const commit = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const applyMode = (patch) => {
    setData((prev) => ({ ...prev, ...patch }));
  };
  const fields = [
    { key: "CustomFPS", label: "FPS" },
    { key: "CustomResolution", label: "Resolution" },
    { key: "maxBitrate", label: "Max Bitrate" },
    { key: "minBitrate", label: "Min Bitrate" },
    { key: "targetBitrate", label: "Target Bitrate" },
    { key: "voiceBitrate", label: "Voice Bitrate" }
  ];
  function onApply() {
    forceQuality("set_resolution", { resolution: data.CustomResolution });
    forceQuality("set_fps", { fps: data.CustomFPS });
    forceQuality("set_min_bitrate", { minBitrate: data.minBitrate });
    forceQuality("set_target_bitrate", { targetBitrate: data.targetBitrate });
    forceQuality("set_max_bitrate", { maxBitrate: data.maxBitrate });
    Object.entries(data).forEach(([key, value]) => SettingsStore_default.set(key, value));
    const connections = Array.from(MediaEngineStore.getMediaEngine()?.connections?.values?.());
    const streamConnection = connections.filter?.((x2) => x2?.streamUserId == UserStore4.getCurrentUser().id && x2?.context == "stream").find(Boolean);
    streamConnection && streamConnection?.updateVideoQuality?.apply?.(streamConnection, []);
    const audioConnection = connections.filter?.((x2) => x2?.userId == UserStore4.getCurrentUser().id && x2?.context == "default" && !x2?.streamUserId).find(Boolean);
    audioConnection && audioConnection?.updateVideoQuality?.apply?.(audioConnection, []);
    onClose();
  }
  return /* @__PURE__ */ React5.createElement(ModalModule2.Modal, {
    actions: [
      { text: "Cancel", onClick: onClose, variant: "secondary" },
      { text: "Apply", onClick: onApply }
    ],
    notice: {
      type: "warning",
      message: GlobalModules.SimpleMarkdownWrapper.parse("**Bitrate options will instantly apply to your stream upon hitting Apply if you have a stream currently active.**")
    },
    ...props,
    onClose,
    title: "Stream Settings Configuration"
  }, /* @__PURE__ */ React5.createElement(ModeRow, null, MODES.map(({ label, patch }) => /* @__PURE__ */ React5.createElement(Components.Button, {
    key: label,
    onClick: () => applyMode(patch)
  }, label))), /* @__PURE__ */ React5.createElement(ModalBody, null, fields.map(({ key, label }) => /* @__PURE__ */ React5.createElement(FieldWrapper, {
    key
  }, /* @__PURE__ */ React5.createElement(FieldLabel, {
    htmlFor: `yabd-${key}`
  }, label), /* @__PURE__ */ React5.createElement(Components.NumberInput, {
    id: `yabd-${key}`,
    initalValue: data[key],
    value: data[key],
    min: -1,
    onChange: (val) => commit(key, val)
  })))));
}
function openConfigModal(forceQuality) {
  GlobalModules.ModalModule.openModal((props) => /* @__PURE__ */ React5.createElement(ConfigModal, {
    forceQuality,
    props,
    onClose: props.onClose
  }));
}
function CustomFooter() {
  const StreamingModule = wpGet(wpFilter.bySource("GQgGHISKZ5aYqYeYhX9isDUHGw"), { raw: true });
  const module2 = getKey(StreamingModule.declarations, BetterDiscord.Webpack.Filters.byStrings(".useContext"));
  const [start, dispatch] = module2.module[module2.key]();
  const forceQuality = (type, value) => {
    dispatch({ type, ...value });
    const currentState = ApplicationStreamingSettingsStore.getState();
    ApplicationStreamingSettingsStore.initialize({
      resolution: type == "set_resolution" ? value.resolution : currentState.resolution,
      fps: type == "set_fps" ? value.fps : currentState.fps,
      preset: 3,
      soundshareEnabled: currentState.soundshareEnabled
    });
  };
  return /* @__PURE__ */ React5.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-sm)",
      backgroundColor: "var(--control-secondary-background-default)",
      borderColor: "var(--control-secondary-border-default)",
      minHeight: "38px",
      minWidth: "38px"
    }
  }, /* @__PURE__ */ React5.createElement(IconModule.Icon, {
    tooltip: "Configure Stream Settings",
    tooltipPosition: "top",
    onClick: () => openConfigModal(forceQuality),
    key: "balls-2",
    icon: () => /* @__PURE__ */ React5.createElement(AdminIcon, null)
  }));
}
var LIVE_FILTER = BetterDiscord.Webpack.Filters.bySource("GO_LIVE_MODAL_V2", "getUseSystemScreensharePicker", "canStreamQuality");
var validatorMod = BetterDiscord.Webpack.getBySource("canStreamWithSettings", { raw: true });
var goLiveModal_default = {
  name: "goLiveModal",
  description: "Streaming modal customization.",
  ids: [
    async () => await BetterDiscord.Webpack.waitForModule(BetterDiscord.Webpack.Filters.bySource("allowOneClickGoLive:"), { raw: true }).then((x2) => x2.id)
  ],
  waitFor: [LIVE_FILTER],
  apply(finale, patcher) {
    const mod = getKey(validatorMod.declarations, BetterDiscord.Webpack.Filters.byStrings("canStreamWithSettings"));
    patcher.instead(mod?.module, mod?.key, () => true);
    patcher.after(finale.modules[0], "default", (_, [args], ret) => {
      const removeScreenshareUpsell = SettingsStore_default.get("removeScreenshareUpsell");
      const footer = BetterDiscord.Utils.findInTree(ret, (x2) => String(x2?.className).startsWith("footer"));
      if (!footer)
        return ret;
      const footerContent = BetterDiscord.Utils.findInTree(footer, (x2) => String(x2?.className).startsWith("footerContent"));
      if (!footerContent)
        return ret;
      if (removeScreenshareUpsell) {
        footer.children = footer.children.filter((x2) => !x2?.props?.className.startsWith("upsell"));
        footerContent.children[1].props.children = footerContent.children[1].props.children.filter((x2) => !x2?.type?.toString?.()?.includes("pill"));
      }
      if (SettingsStore_default.get("ResolutionSwapper")) {
        const doesExist = BetterDiscord.Utils.findInTree(footerContent, (x2) => String(x2?.key).includes("gay"));
        if (!doesExist)
          footerContent.children[1].props.children.push(/* @__PURE__ */ React5.createElement(CustomFooter, {
            key: "yabd-is-gay"
          }));
        const originalChildren = footerContent.children;
        footerContent.children = /* @__PURE__ */ React5.createElement(FooterColumn, null, /* @__PURE__ */ React5.createElement(FooterRow, null, originalChildren));
      }
      return ret;
    });
  }
};
// src/ui/AccentColors.tsx
var { UserProfileStore: UserProfileStore3, UserStore: UserStore5 } = BetterDiscord.Webpack.Stores;
var { React: React6, Components: Components2 } = BetterDiscord;
function AccentColors() {
  const CurrentUser = UserStore5.getCurrentUser();
  const currentUserProfile = UserProfileStore3.getUserProfile(CurrentUser.id);
  const [primary, setPrimary] = React6.useState(currentUserProfile.themeColors ? `#${currentUserProfile.themeColors[0].toString(16).padStart(6, "0")}` : "#FFCFF8");
  const [accent, setAccent] = React6.useState(currentUserProfile.themeColors ? `#${currentUserProfile.themeColors[1].toString(16).padStart(6, "0")}` : "#FFCFF8");
  return /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement(Components2.Text, {
    style: {
      fontSize: "14px",
      fontWeight: "var(--font-weight-bold)"
    }
  }, "Primary"), /* @__PURE__ */ React6.createElement(Components2.ColorInput, {
    value: primary,
    defaultValue: primary,
    disabled: false,
    onChange: (e) => setPrimary(e)
  }), /* @__PURE__ */ React6.createElement("br", null), /* @__PURE__ */ React6.createElement(Components2.Text, {
    style: {
      fontSize: "14px",
      fontWeight: "var(--font-weight-bold)"
    }
  }, "Accent"), /* @__PURE__ */ React6.createElement(Components2.ColorInput, {
    value: accent,
    defaultValue: accent,
    disabled: false,
    onChange: (e) => setAccent(e)
  }), /* @__PURE__ */ React6.createElement("br", null), /* @__PURE__ */ React6.createElement(Components2.Button, {
    className: "yabd-generic-button",
    style: {
      height: "32px",
      width: "auto",
      marginTop: "10px"
    },
    onClick: () => {
      copyToClipboard(" " + secondsightifyEncodeOnly(`[${primary},${accent}]`), "3y3 copied to clipboard!");
    }
  }, "Copy Colors 3y3"));
}
// src/ui/CustomPFP.tsx
var { React: React7, Components: Components3 } = BetterDiscord;
function CustomPFP() {
  const [url, setUrl] = React7.useState("");
  async function handleClick() {
    if (!url.includes("imgur.com")) {
      BetterDiscord.UI.showToast("Please use Imgur!", { type: "warning" });
      return;
    }
    let hash = await getDirectImgurHash(url);
    copyToClipboard(secondsightifyEncodeOnly(`P{${hash}}`), "3y3 copied to clipboard!");
  }
  return /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("input", {
    className: "bd-text-input",
    placeholder: "PFP Imgur URL",
    onChange: (e) => setUrl(e.target.value),
    style: {
      minWidth: "180px",
      width: "180px",
      maxWidth: "180px"
    }
  }), /* @__PURE__ */ React7.createElement(Components3.Button, {
    onClick: handleClick,
    disabled: url == "",
    style: {
      marginTop: "10px"
    }
  }, "Copy PFP 3y3"));
}
// src/ui/CustomBanner.tsx
var { React: React8, Components: Components4 } = BetterDiscord;
function CustomBanner() {
  const [url, setUrl] = React8.useState("");
  async function handleClick() {
    if (!url.includes("imgur.com")) {
      BetterDiscord.UI.showToast("Please use Imgur!", { type: "warning" });
      return;
    }
    let hash = await getDirectImgurHash(url);
    copyToClipboard(secondsightifyEncodeOnly(`B{${hash}}`), "3y3 copied to clipboard!");
  }
  return /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("input", {
    className: "bd-text-input",
    placeholder: "Banner Imgur URL",
    onChange: (e) => setUrl(e.target.value),
    style: {
      minWidth: "180px",
      width: "180px",
      maxWidth: "180px"
    }
  }), /* @__PURE__ */ React8.createElement(Components4.Button, {
    onClick: handleClick,
    disabled: url == "",
    style: {
      marginTop: "10px"
    }
  }, "Copy Banner 3y3"));
}
// src/ui/DisplayNameStyle.tsx
var { React: React9, Components: Components5 } = BetterDiscord;
var EffectText = BetterDiscord.Webpack.getBySource("UserNameWithEffects").A;
var { UserStore: UserStore6 } = BetterDiscord.Webpack.Stores;
var FONTS = [
  { name: "GG Sans", id: 11 },
  { name: "Tempo", id: 12 },
  { name: "Sakura", id: 3 },
  { name: "Jellybean", id: 4 },
  { name: "Modern", id: 6 },
  { name: "Medieval", id: 7 },
  { name: "8Bit", id: 8 },
  { name: "Vampyre", id: 10 },
  { name: "Monkey Bars", id: 13 },
  { name: "Mainframe", id: 14 },
  { name: "Headbang", id: 15 },
  { name: "Journal", id: 16 }
];
var EFFECTS = {
  Solid: [15724529],
  Gradient: [2797222, 16762000],
  Neon: [6888941],
  Toon: [15999128],
  Pop: [1036166]
};
function FontButton({ onClick, selected, fontFamily: font }) {
  return /* @__PURE__ */ React9.createElement(Components5.Button, {
    style: {
      fontFamily: font.name,
      color: "var(--text-default)",
      backgroundColor: "var(--control-secondary-background-default)",
      border: selected ? "1px solid white" : "none",
      margin: "0px 5px 5px 0px",
      display: "inline-block"
    },
    onClick
  }, font.name);
}
function EffectButton({ onClick, selected, children, data, colors }) {
  return /* @__PURE__ */ React9.createElement(Components5.Button, {
    style: {
      backgroundColor: "var(--control-secondary-background-default)",
      color: "var(--text-default)",
      border: selected ? "1px solid white" : "none",
      margin: "0px 5px 5px 0px",
      display: "inline-block"
    },
    onClick
  }, /* @__PURE__ */ React9.createElement(EffectText, {
    displayNameStyles: { colors: data.effectColors, fontId: 1, effectId: data.effectId + 1 },
    effectDisplayType: data.effectId + 1,
    inProfile: true,
    loop: true,
    userName: data.effectName
  }));
}
var ModalModule3 = wpGetByKeys(["Modal"]);
function OpenDisplayNameStyleModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React9.createElement(ModalModule3.Modal, {
        notice: {
          type: "warning",
          message: GlobalModules.SimpleMarkdownWrapper.parse("`Prism` and `Gummy` are both in rollout, we have implemented `Monkey Brace`, `Mainframe`, `Headbang` and `Journal`. We will slowly implement the new effects as time flies.")
        },
        title: "Change Display Name Style",
        ...props
      }, /* @__PURE__ */ React9.createElement(DisplayNameStyle, null));
    });
  }
  return /* @__PURE__ */ React9.createElement(Components5.Button, {
    onClick: handleClick
  }, "Change");
}
function DisplayNameStyle() {
  const UserNameWithEffects = wpGet(BetterDiscord.Webpack.Filters.bySource("UserNameWithEffects"), {
    declaration: (x2) => String(x2.type).includes("UserNameWithEffects")
  });
  const [fontId, setFontId] = React9.useState(11);
  const [effectId, setEffectId] = React9.useState(0);
  const [colors, setColors] = React9.useState({
    primary: "#ffffff",
    accent: "#000000"
  });
  return /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("div", {
    style: { fontSize: "25px", marginBottom: "10px" }
  }, /* @__PURE__ */ React9.createElement(UserNameWithEffects, {
    userName: UserStore6.getCurrentUser().globalName,
    loop: true,
    shouldWrap: false,
    inProfile: true,
    effectDisplayType: 2,
    displayNameStyles: {
      colors: [colors.primary, colors.accent].filter(Boolean).map((x2) => parseInt(x2.replace("#", "0x"), 16)),
      effectId: effectId + 1,
      fontId
    }
  })), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Font"), Object.values(FONTS).map((font) => {
    return /* @__PURE__ */ React9.createElement(FontButton, {
      fontFamily: font,
      selected: fontId == font.id,
      onClick: () => setFontId(font.id)
    });
  }), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Effect"), Object.entries(EFFECTS).map((effect, i2) => {
    const data = {
      effectName: effect[0],
      effectColors: effect[1],
      effectId: i2
    };
    return /* @__PURE__ */ React9.createElement(EffectButton, {
      onClick: () => setEffectId(i2),
      selected: effectId === i2,
      data,
      colors: data.effectColors
    }, data.effectName);
  }), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Primary Color"), /* @__PURE__ */ React9.createElement(Components5.ColorInput, {
    defaultValue: colors.primary,
    onChange: (e) => {
      setColors({ primary: e, accent: colors.accent });
    }
  }), effectId === 1 ? /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Secondary Color"), /* @__PURE__ */ React9.createElement(Components5.ColorInput, {
    defaultValue: colors.accent,
    onChange: (e) => {
      setColors({ primary: colors.primary, accent: e });
    }
  })) : null, /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Button, {
    onClick: () => {
      const PRIMARY_COLOR_DECIMAL = parseInt(colors.primary.replace("#", ""), 16);
      const SECONDARY_COLOR_DECIMAL = parseInt(colors.accent.replace("#", ""), 16);
      const colorString = effectId === 1 ? `${PRIMARY_COLOR_DECIMAL},${SECONDARY_COLOR_DECIMAL}` : PRIMARY_COLOR_DECIMAL;
      copyToClipboard(secondsightifyEncodeOnly(`S{${fontId},${effectId + 1},${colorString}}`), "3y3 copied to clipboard!");
    }
  }, "Copy 3y3"));
}
// src/global/quests/index.ts
var invalid = [
  {
    name: "Uncategorized",
    sku_id: "8",
    products: [
      {
        name: "[Test] Cedric Collectible",
        items: [{ label: "A collectible test by Cedric", sku_id: "1491545171232559376", type: 0 }],
        sku_id: "1491545171232559376",
        type: 0
      },
      {
        name: "[TEST] Pls ignore",
        items: [{ label: "test", sku_id: "1491545387268571177", type: 0 }],
        sku_id: "1491545387268571177",
        type: 0
      },
      {
        name: "[TEST] Kevin McCollectible2",
        items: [
          { label: "This is a test collectible label2", sku_id: "1491544502937059340", type: 0 }
        ],
        sku_id: "1491544502937059340",
        type: 0
      }
    ]
  },
  {
    name: "Misc Profile Frames",
    sku_id: "7",
    products: [
      {
        name: "[IGNORE - DUPLICATE] Lofi Skyline",
        items: [
          {
            inner_width: 1200,
            label: "A glowing neon cityscape in purple, pink, and blue stretches across the top of the profile against a dark night sky",
            layers: [
              {
                anchor: "top",
                id: "1511883747903934664",
                order: "back",
                responsive: false,
                type: "staple"
              }
            ],
            overflow_bottom: 0,
            overflow_horizontal: 0,
            overflow_top: 304,
            sku_id: "1493976288711672008",
            type: 3
          }
        ],
        sku_id: "1493976288711672008",
        type: 3
      },
      {
        name: "Do Not Use - Y2K",
        items: [
          {
            inner_width: 1200,
            label: "A chromatic border wraps around your profile",
            layers: [
              {
                anchor: "center",
                id: "1511909030375981056",
                order: "front",
                responsive: false,
                type: "border"
              },
              {
                anchor: "top",
                id: "1511909034461102151",
                order: "front",
                responsive: false,
                type: "staple"
              },
              {
                anchor: "bottom",
                id: "1511909040752431114",
                order: "front",
                responsive: false,
                type: "staple"
              }
            ],
            overflow_bottom: 207,
            overflow_horizontal: 56,
            overflow_top: 209,
            sku_id: "1491912717454540830",
            type: 3
          }
        ],
        sku_id: "1491912717454540830",
        type: 3
      },
      {
        name: "Shoujo",
        items: [
          {
            type: 3,
            sku_id: "1491880600054005780",
            label: "Anime-style character design and vibrant colors frame your profile like a shoujo manga panel",
            layers: [
              {
                id: "1511887478381088778",
                type: "staple",
                order: "front",
                anchor: "top",
                responsive: false
              },
              {
                id: "1511887481904300224",
                type: "staple",
                order: "front",
                anchor: "bottom",
                responsive: false
              }
            ],
            inner_width: 1200,
            overflow_top: 126,
            overflow_bottom: 116,
            overflow_horizontal: 56
          }
        ],
        sku_id: "1491880600054005780",
        type: 3
      },
      {
        name: "Do Not Use - Astrology",
        items: [
          {
            inner_width: 1200,
            label: "Astrological symbols and cosmic elements frame your profile like a zodiac chart",
            layers: [
              {
                anchor: "center",
                id: "1511836597438648501",
                order: "front",
                responsive: false,
                type: "border"
              },
              {
                anchor: "center",
                id: "1511836603969179879",
                order: "front",
                responsive: true,
                type: "rail"
              },
              {
                anchor: "top",
                id: "1511836607232344277",
                order: "front",
                responsive: false,
                type: "staple"
              },
              {
                anchor: "bottom",
                id: "1511836611158216865",
                order: "front",
                responsive: false,
                type: "staple"
              }
            ],
            overflow_bottom: 127,
            overflow_horizontal: 56,
            overflow_top: 304,
            sku_id: "1489397732144844902",
            type: 3
          }
        ],
        sku_id: "1489397732144844902",
        type: 3
      },
      {
        name: "Do Not Use - Fantasy Galaxy",
        items: [
          {
            inner_width: 1200,
            label: "A swirl of stars and cosmic dust frames your profile like a pocket galaxy",
            layers: [
              {
                anchor: "top",
                id: "1512141939426984117",
                order: "front",
                responsive: true,
                type: "rail"
              },
              {
                anchor: "top",
                id: "1511907713653801031",
                order: "front",
                responsive: false,
                type: "staple"
              },
              {
                anchor: "top",
                id: "1511907717302849676",
                order: "back",
                responsive: false,
                type: "staple"
              }
            ],
            overflow_bottom: 0,
            overflow_horizontal: 56,
            overflow_top: 291,
            sku_id: "1484726324592640052",
            type: 3
          }
        ],
        sku_id: "1484726324592640052",
        type: 3
      }
    ]
  },
  {
    name: "1478820291382743227",
    sku_id: "1478820291382743227",
    products: [
      {
        name: "Nitro Control",
        items: [
          {
            type: 2,
            sku_id: "1478820329936650464",
            label: "A chrome rocket ship sails through the galaxy.",
            palette: "cobalt"
          }
        ],
        sku_id: "1478820329936650464",
        type: 2
      }
    ]
  },
  {
    name: "OOSLA",
    sku_id: "1464327525974151412",
    products: [
      {
        name: "Unicorns are Awesome",
        items: [{ type: 0, sku_id: "1464327740780974167", label: "labels are cool" }],
        sku_id: "1464327740780974167",
        type: 0
      },
      {
        name: "Bug Catcher Wumpus",
        items: [{ type: 0, sku_id: "1487099062355361994", label: "OOSLA Quest Deco" }],
        sku_id: "1487099062355361994",
        type: 0
      },
      {
        name: "Hakuna Bug-tata",
        items: [
          { type: 2, sku_id: "1488553242555187391", label: "OOSLA Quest Deco", palette: "forest" }
        ],
        sku_id: "1488553242555187391",
        type: 2
      }
    ]
  },
  { name: "Holidays", sku_id: "1349486948942745691", products: [] },
  {
    name: "Nameplate Test",
    sku_id: "1344802365307621427",
    products: [
      {
        name: "Angel",
        items: [
          {
            type: 2,
            sku_id: "1344802364934062152",
            label: "It's angel time",
            palette: "bubble_gum"
          }
        ],
        sku_id: "1344802364934062152",
        type: 2
      },
      {
        name: "Aurora",
        items: [
          { type: 2, sku_id: "1344802364971946054", label: "It's aurora time", palette: "teal" }
        ],
        sku_id: "1344802364971946054",
        type: 2
      },
      {
        name: "Cherry Blossom",
        items: [
          {
            type: 2,
            sku_id: "1344802364992782366",
            label: "It's cherry blossom time",
            palette: "berry"
          }
        ],
        sku_id: "1344802364992782366",
        type: 2
      },
      {
        name: "Dark Fantasy",
        items: [
          {
            type: 2,
            sku_id: "1344802365013753962",
            label: "It's dark fantasy time",
            palette: "violet"
          }
        ],
        sku_id: "1344802365013753962",
        type: 2
      },
      {
        name: "Dreamy",
        items: [
          {
            type: 2,
            sku_id: "1344802365038919680",
            label: "It's dreamy time",
            palette: "bubble_gum"
          }
        ],
        sku_id: "1344802365038919680",
        type: 2
      },
      {
        name: "Fairy Dust",
        items: [
          {
            type: 2,
            sku_id: "1344802365068279839",
            label: "It's fairy dust time",
            palette: "bubble_gum"
          }
        ],
        sku_id: "1344802365068279839",
        type: 2
      },
      {
        name: "Galaxy",
        items: [
          { type: 2, sku_id: "1344802365089251429", label: "It's galaxy time", palette: "cobalt" }
        ],
        sku_id: "1344802365089251429",
        type: 2
      },
      {
        name: "Glitch",
        items: [
          { type: 2, sku_id: "1344802365114417202", label: "It's glitch time", palette: "cobalt" }
        ],
        sku_id: "1344802365114417202",
        type: 2
      },
      {
        name: "Heart Bloom",
        items: [
          {
            type: 2,
            sku_id: "1344802365135524007",
            label: "It's heart bloom time",
            palette: "bubble_gum"
          }
        ],
        sku_id: "1344802365135524007",
        type: 2
      },
      {
        name: "Kawaii Gaming",
        items: [
          {
            type: 2,
            sku_id: "1344802365160689685",
            label: "It's kawaii gaming time",
            palette: "sky"
          }
        ],
        sku_id: "1344802365160689685",
        type: 2
      },
      {
        name: "Kitsune",
        items: [
          { type: 2, sku_id: "1344802365177331822", label: "It's Kitsune time", palette: "cobalt" }
        ],
        sku_id: "1344802365177331822",
        type: 2
      },
      {
        name: "Koi Pond",
        items: [
          { type: 2, sku_id: "1344802365198303314", label: "It's koi pond time", palette: "sky" }
        ],
        sku_id: "1344802365198303314",
        type: 2
      },
      {
        name: "Lofi",
        items: [
          { type: 2, sku_id: "1344802365223469066", label: "It's lofi time", palette: "berry" }
        ],
        sku_id: "1344802365223469066",
        type: 2
      },
      {
        name: "Lofi Cat",
        items: [
          { type: 2, sku_id: "1344802365244440606", label: "It's lofi cat time", palette: "berry" }
        ],
        sku_id: "1344802365244440606",
        type: 2
      },
      {
        name: "Moon and Sun",
        items: [
          {
            type: 2,
            sku_id: "1344802365265412119",
            label: "It's moon and sun time",
            palette: "cobalt"
          }
        ],
        sku_id: "1344802365265412119",
        type: 2
      }
    ]
  },
  {
    name: "Special Events 2",
    sku_id: "1309309974266118144",
    products: [
      {
        name: "New Year",
        items: [
          {
            type: 0,
            sku_id: "1174459415924064376",
            label: "Cheers to 2023, and we hope you have a wonderful new year in 2024! Gold 2024 balloons sit ontop of the avatar."
          }
        ],
        sku_id: "1174459415924064376",
        type: 0
      },
      {
        name: "Rift Butterfly",
        items: [
          {
            type: 0,
            sku_id: "1308169595055771749",
            label: "A rift butterfly shines in the center of the avatar, flutters its wings, and returns to the top of the avatar."
          }
        ],
        sku_id: "1308169595055771749",
        type: 0
      },
      {
        name: "Batarang",
        items: [
          {
            type: 0,
            sku_id: "1309270800099971122",
            label: "A spinning, bat-shaped metallic projectile hurtles into and impacts the screen, leaving a massive crack."
          }
        ],
        sku_id: "1309270800099971122",
        type: 0
      },
      {
        name: "Bush Camper",
        items: [
          {
            type: 0,
            sku_id: "1313309630851448833",
            label: "A bush encircles the avatar, with leaves gently rustling and swaying in a circular motion."
          }
        ],
        sku_id: "1313309630851448833",
        type: 0
      },
      {
        name: "Shield Potion",
        items: [
          {
            type: 0,
            sku_id: "1315750531330736211",
            label: "A potion bottle is uncorked, its contents emptied, and a pixelated aura swipes over the avatar from bottom to top."
          }
        ],
        sku_id: "1315750531330736211",
        type: 0
      },
      {
        name: "TGA Controller",
        items: [
          {
            type: 0,
            sku_id: "1315853682235019326",
            label: "Two joysticks and keypads control a target that moves in all directions around the profile picture."
          }
        ],
        sku_id: "1315853682235019326",
        type: 0
      },
      {
        name: "Shadow",
        items: [
          {
            type: 0,
            sku_id: "1316597786862419988",
            label: "Shadow teleports around multiple times, leaving a red and orange trail while striking various dynamic poses."
          }
        ],
        sku_id: "1316597786862419988",
        type: 0
      },
      {
        name: "Rec Room Lightning",
        items: [
          {
            type: 0,
            sku_id: "1319423712474435655",
            label: "A streak of orange lightning surrounds the avatar."
          }
        ],
        sku_id: "1319423712474435655",
        type: 0
      },
      {
        name: "WINGMAN'S GOT IT",
        items: [
          {
            type: 0,
            sku_id: "1325880072972013670",
            label: "VALORANT Agent Gekko's cute yellow creature happily bounces on top of your avatar"
          }
        ],
        sku_id: "1325880072972013670",
        type: 0
      },
      {
        name: "Heart-to-Heart",
        items: [
          {
            type: 0,
            sku_id: "1326347611069874277",
            label: "A flurry of pink and red hearts surround around your avatar, swirling with a gentle touch before settling into a snug, cheek-to-cheek cuddle."
          }
        ],
        sku_id: "1326347611069874277",
        type: 0
      },
      {
        name: "Jeff the Land Shark",
        items: [
          {
            type: 0,
            sku_id: "1326718812279799809",
            label: "Jeff the Land Shark is an absolutely adorable, chonky cartoon shark who looks like it just discovered its love for snacks and hugs. It’s rocking a stylish pink collar with a shiny gold tag, like it’s ready to be your best aquatic buddy. Its big toothy grin says, “I’m cute, but I could still chomp if needed!”."
          }
        ],
        sku_id: "1326718812279799809",
        type: 0
      },
      {
        name: "Fuchsia Agent",
        items: [
          {
            type: 0,
            sku_id: "1329309467619229797",
            label: "A Fuchsia Agent character with a red shark swimming around the character's gray headband."
          }
        ],
        sku_id: "1329309467619229797",
        type: 0
      },
      {
        name: "Fortnite Boogie Bomb",
        items: [
          {
            type: 0,
            sku_id: "1334270711790833776",
            label: "A Boogie Bomb explodes, lowering a disco ball causing a festive disco light show"
          }
        ],
        sku_id: "1334270711790833776",
        type: 0
      },
      {
        name: "Scout",
        items: [
          {
            type: 0,
            sku_id: "1336439189041975316",
            label: "An older man wearing a green cape and gray feathered hat holds a wooden staff and looks into the distance while shielding his eyes to scout ahead. Next to him, his sitting dog companion stands up and looks in the same direction."
          }
        ],
        sku_id: "1336439189041975316",
        type: 0
      },
      {
        name: "Hoppy Day",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864839",
            label: "Your avatar has found a friend in the shape of a little brown bunny. It hops in delight when it sees you."
          }
        ],
        sku_id: "1336506386296864839",
        type: 0
      },
      {
        name: "Afternoon Breeze",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864842",
            label: "Your avatar stands in a dreamy meadow, where pink and orange flowers sway to nature’s rhythm, sending petals twirling through the soft breeze."
          }
        ],
        sku_id: "1336506386296864842",
        type: 0
      },
      {
        name: "Shower Stroll",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864845",
            label: "A soft rain drapes over your avatar, leaving a shimmering rainbow glow that whispers a touch of magic into the misty air."
          }
        ],
        sku_id: "1336506386296864845",
        type: 0
      },
      {
        name: "Exoborne",
        items: [
          {
            type: 0,
            sku_id: "1338927497860878466",
            label: "Metallic armor surrounds the avatar with pieces shifting into place and yellow indicator lights turning on."
          }
        ],
        sku_id: "1338927497860878466",
        type: 0
      },
      {
        name: "Big Dill Chain",
        items: [
          {
            type: 0,
            sku_id: "1341522018197311519",
            label: "A gold chain holding a gold medallion with a D that has two vertical slashes through it surrounds a green cap."
          }
        ],
        sku_id: "1341522018197311519",
        type: 0
      },
      {
        name: "Pathojen",
        items: [
          {
            type: 0,
            sku_id: "1346915187243876474",
            label: "This avatar decoration features a vibrant, neon-colored circular flame effect with an energetic, cartoonish character at the bottom left."
          }
        ],
        sku_id: "1346915187243876474",
        type: 0
      },
      {
        name: "Split Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1346987105028407307",
            label: "A circular energy effect split in two: the left side glows purple, the right golden-orange. A diagonal crystal-like fracture runs across it, with shimmering shards and sparks, creating a high-tech, futuristic, battle-worn look."
          }
        ],
        sku_id: "1346987105028407307",
        type: 0
      },
      {
        name: "Khazan Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1347624589571788951",
            label: "This Discord avatar decoration features a menacing, metallic circular frame composed of jagged, dark gray spikes with glowing blue crystal-like accents embedded throughout. The design gives off a sharp, armored aesthetic, reminiscent of a magical or futuristic battle-worn artifact."
          }
        ],
        sku_id: "1347624589571788951",
        type: 0
      },
      {
        name: "Gallica Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1349045865188294719",
            label: "A fairy is floating while flipping through pages in a book"
          }
        ],
        sku_id: "1349045865188294719",
        type: 0
      },
      {
        name: "Supply Llama",
        items: [
          {
            type: 0,
            sku_id: "1352347590917882008",
            label: "A purple and blue llama body surrounds the frame, with a llama head on the top left."
          }
        ],
        sku_id: "1352347590917882008",
        type: 0
      },
      {
        name: "Clicker Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1357852406079291593",
            label: "Mushroom-shaped elements in orange-red and mint green colors surround the user's avatar. The organic, flowing fungal shapes have a natural, slightly oceanic aesthetic with a hand-drawn illustration style."
          }
        ],
        sku_id: "1357852406079291593",
        type: 0
      },
      {
        name: "Face of Corruption Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1359328540104986636",
            label: "This avatar decoration features two intense, screaming red stone faces split dramatically down the middle."
          }
        ],
        sku_id: "1359328540104986636",
        type: 0
      },
      {
        name: "Emma Frost Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1359953429778137322",
            label: "This avatar decoration features a confident, stylishly armored woman standing tall with a shimmering crystal levitating above her hand. The transparent center lets your avatar shine while being blessed by the aura of power, elegance, and just a dash of sass."
          }
        ],
        sku_id: "1359953429778137322",
        type: 0
      },
      {
        name: "Signal from Tau Ceti Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1360316550313283748",
            label: "Neon yellow-green overlays surround the user's avatar. The animated overlays show hazard stripes, exclamation marks, directional arrows, and letters and numbers that flicker."
          }
        ],
        sku_id: "1360316550313283748",
        type: 0
      },
      {
        name: "Slurp Barrel Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1360353397865447707",
            label: "A metallic barrel with the label 'Slurp co.' expands on top of the user's avatar and explodes into blue and white liquid."
          }
        ],
        sku_id: "1360353397865447707",
        type: 0
      },
      {
        name: "Hackclaw",
        items: [
          {
            type: 0,
            sku_id: "1362863977222115430",
            label: "Stylized avatar showing a white-haired character with turquoise highlights, with only the hair and hands visible. The hands appear to be wearing dark gloves with pink highlights, positioned on a keyboard."
          }
        ],
        sku_id: "1362863977222115430",
        type: 0
      },
      {
        name: "Friend of Dex",
        items: [
          {
            type: 0,
            sku_id: "1366429159961919569",
            label: "A vibrant yellow fox energetically frames a circular pink energy border."
          }
        ],
        sku_id: "1366429159961919569",
        type: 0
      },
      {
        name: "Shield Saw",
        items: [
          {
            type: 0,
            sku_id: "1362863977222115433",
            label: "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element."
          }
        ],
        sku_id: "1362863977222115433",
        type: 0
      },
      {
        name: "Fortnite Galactic Battle",
        items: [
          {
            type: 0,
            sku_id: "1369388182927442022",
            label: "Circular frame with two curved lines framing where a user's avatar would appear. The top curve is blue with a small circular emblem, while the bottom curve is red with a wheel-like symbol."
          }
        ],
        sku_id: "1369388182927442022",
        type: 0
      },
      {
        name: "Freshly Picked",
        items: [
          {
            type: 0,
            sku_id: "1369404111484751873",
            label: "Beautiful, juicy strawberries, blueberries, and oranges, still wet from being washed, circle the outside of your avatar and remind you that summer is here."
          }
        ],
        sku_id: "1369404111484751873",
        type: 0
      },
      {
        name: "Shield Saw",
        items: [
          {
            type: 0,
            sku_id: "1371943141321609357",
            label: "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element."
          }
        ],
        sku_id: "1371943141321609357",
        type: 0
      },
      {
        name: "The Bad Guys 2 Trailer",
        items: [
          {
            type: 0,
            sku_id: "1371949732066234571",
            label: "A bright, orange comet-like streak curves around the top-left of the frame, fading into sparks and glowing embers. The effect gives the avatar a sense of fiery motion."
          }
        ],
        sku_id: "1371949732066234571",
        type: 0
      },
      {
        name: "Mission: Impossible",
        items: [
          {
            type: 0,
            sku_id: "1373682603621744720",
            label: "Person running around in circles upside down"
          }
        ],
        sku_id: "1373682603621744720",
        type: 0
      },
      {
        name: "Jurassic World Rebirth Trailer",
        items: [
          {
            type: 0,
            sku_id: "1374170804769652797",
            label: "Dinosaur roaring then fading away into the Jurassic World logo"
          }
        ],
        sku_id: "1374170804769652797",
        type: 0
      },
      {
        name: "Open Beta",
        items: [
          {
            type: 0,
            sku_id: "1374394443997642803",
            label: "A circular cyan-blue ring with a faint light blue design in the center that resembles a stylized logo or emblem."
          }
        ],
        sku_id: "1374394443997642803",
        type: 0
      },
      {
        name: "Ballerina",
        items: [
          {
            type: 0,
            sku_id: "1377740268366991562",
            label: "Pink rays emit from the center of the decoration like a halo and two blue fluffy ends of a fur coat show on the sides."
          }
        ],
        sku_id: "1377740268366991562",
        type: 0
      },
      {
        name: "Ultron",
        items: [
          {
            type: 0,
            sku_id: "1377856108282253333",
            label: "Metallic claws drag open a red swirling portal. The metallic claws disappear and Ultron appears through the portal."
          }
        ],
        sku_id: "1377856108282253333",
        type: 0
      },
      {
        name: "Marvel Snap Venom",
        items: [
          {
            type: 0,
            sku_id: "1379222146274033798",
            label: "A glowing cube in the bottom left becomes enveloped by black organic material and disappears. The organic material circulates around the avatar and transforms into Venom's face. The face takes a large bite and transforms back into a large glowing cube."
          }
        ],
        sku_id: "1379222146274033798",
        type: 0
      },
      {
        name: "How to Train Your Dragon",
        items: [
          {
            type: 0,
            sku_id: "1379879504629207180",
            label: "Ornate circular frame with a Dragon and a weathered metallic finish"
          }
        ],
        sku_id: "1379879504629207180",
        type: 0
      },
      {
        name: "Starlight Revolver",
        items: [
          {
            type: 0,
            sku_id: "1380276497209622529",
            label: "A circular purple gradient border with decorative four-pointed stars in pink, cyan, purple, and orange scattered around the outside edge."
          }
        ],
        sku_id: "1380276497209622529",
        type: 0
      },
      {
        name: "R6 Siege X Avatar",
        items: [
          {
            type: 0,
            sku_id: "1380688086941302906",
            label: "A metallic sledge hammer twirls before smashing a wooden panel with a large green X painted on the center of it."
          }
        ],
        sku_id: "1380688086941302906",
        type: 0
      },
      {
        name: "Towerborne Play",
        items: [
          {
            type: 0,
            sku_id: "1382044334890680442",
            label: "A white and red fox mask turns to face the viewer. Streams of light emanate from its eyes before it returns to the upper left portion of the frame."
          }
        ],
        sku_id: "1382044334890680442",
        type: 0
      },
      {
        name: "28 Years Later",
        items: [
          {
            type: 0,
            sku_id: "1383123340142841949",
            label: "Animated avatar decoration depicting a pile of skulls stacked on the ground in the bottom left corner, with dark, jagged bones or spikes protruding from the back."
          }
        ],
        sku_id: "1383123340142841949",
        type: 0
      },
      {
        name: "M3GAN 2.0",
        items: [
          {
            type: 0,
            sku_id: "1383136910435811430",
            label: "Animated M3GAN avatar frame with a dark spinning ring and M3GAN standing in a tan dress."
          }
        ],
        sku_id: "1383136910435811430",
        type: 0
      },
      {
        name: "LEGO® Fortnite",
        items: [
          {
            type: 0,
            sku_id: "1384216812488757359",
            label: "Circular LEGO® Fortnite avatar frame with fire, ice, and tech-themed emblems in red, blue, and green."
          }
        ],
        sku_id: "1384216812488757359",
        type: 0
      },
      {
        name: "I Love R.E.P.O.",
        items: [
          {
            type: 0,
            sku_id: "1384247972107386911",
            label: "A goofy yellow head with large, wide-set cartoon eyes and a huge open mouth, forming a playful ring around the avatar."
          }
        ],
        sku_id: "1384247972107386911",
        type: 0
      },
      {
        name: "SuperCell",
        items: [
          {
            type: 0,
            sku_id: "1385015130466680995",
            label: "Animated green cactus character with red flowers waving next to a decorative circular frame with small leaves"
          }
        ],
        sku_id: "1385015130466680995",
        type: 0
      },
      {
        name: "Palia",
        items: [
          {
            type: 0,
            sku_id: "1386849676875141292",
            label: "Animated cute fox peeking out from a circular woodland frame decorated with branches, green leaves, and small white flowers."
          }
        ],
        sku_id: "1386849676875141292",
        type: 0
      },
      {
        name: "VALORANT Summer Kickoff",
        items: [
          {
            type: 0,
            sku_id: "1386838941801382010",
            label: "Animated carnival mask with colorful feathers and ribbons in purple, blue, and yellow."
          }
        ],
        sku_id: "1386838941801382010",
        type: 0
      },
      {
        name: "Dilophosaurus",
        items: [
          {
            type: 0,
            sku_id: "1388206477491175517",
            label: "Circular frame with gold and black border featuring an animated Dilophosaurus that emerges from the left side. The Dilophosaurus moves its head around the frame edge, and as the animation concludes, its colorful neck frill extends to partially cover the circular white space designed for a profile picture."
          }
        ],
        sku_id: "1388206477491175517",
        type: 0
      },
      {
        name: "Moomoo Hood",
        items: [
          {
            type: 0,
            sku_id: "1387485784419995649",
            label: "Cartoon cow frame with pink ears, black spots on white fur, and gold bell at bottom. Circular opening centers where user's profile picture appears."
          }
        ],
        sku_id: "1387485784419995649",
        type: 0
      },
      {
        name: "Mecha BREAK",
        items: [
          {
            type: 0,
            sku_id: "1390436532988674091",
            label: "A futuristic metallic helmet encloses the avatar. The eyes shine with a blue light before the helmet opens up again."
          }
        ],
        sku_id: "1390436532988674091",
        type: 0
      },
      {
        name: "THPS Half Pipe",
        items: [
          {
            type: 0,
            sku_id: "1391785327613706301",
            label: "An aeriel view of a retro style half pipe with graffiti art flanks the frame. An orange skateboard drops in and performs a spinning trick, then returns to the bottom left of the frame."
          }
        ],
        sku_id: "1391785327613706301",
        type: 0
      },
      {
        name: "Jet Ring",
        items: [{ type: 0, sku_id: "1409978159255785652", label: "Give your avatar a new look." }],
        sku_id: "1409978159255785652",
        type: 0
      },
      {
        name: "Blast Off",
        items: [
          {
            type: 1,
            sku_id: "1409978969670815795",
            title: "Blast Off",
            description: "Show this effect when others view your profile.",
            accessibilityLabel: "Show this effect when others view your profile.",
            animationType: 1,
            staticFrameSrc: "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1",
            thumbnailPreviewSrc: "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00",
            reducedMotionSrc: "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198",
            effects: [
              {
                src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186",
                loop: false,
                height: 880,
                width: 450,
                duration: 2000,
                start: 0,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 100,
                randomizedSources: []
              },
              {
                src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532",
                loop: true,
                height: 880,
                width: 450,
                duration: 3000,
                start: 2000,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 101,
                randomizedSources: []
              }
            ]
          }
        ],
        sku_id: "1409978969670815795",
        type: 1
      },
      {
        name: "Jet Stream",
        items: [
          {
            type: 2,
            sku_id: "1409983105577783410",
            label: "Make your name stand out in servers and chats.",
            palette: "violet"
          }
        ],
        sku_id: "1409983105577783410",
        type: 2
      },
      {
        name: "Nitro Jet Fuel",
        items: [
          { type: 0, sku_id: "1409978159255785652", label: "Give your avatar a new look." },
          {
            type: 1,
            sku_id: "1409978969670815795",
            title: "Blast Off",
            description: "Show this effect when others view your profile.",
            accessibilityLabel: "Show this effect when others view your profile.",
            animationType: 1,
            staticFrameSrc: "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1",
            thumbnailPreviewSrc: "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00",
            reducedMotionSrc: "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198",
            effects: [
              {
                src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186",
                loop: false,
                height: 880,
                width: 450,
                duration: 2000,
                start: 0,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 100,
                randomizedSources: []
              },
              {
                src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532",
                loop: true,
                height: 880,
                width: 450,
                duration: 3000,
                start: 2000,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 101,
                randomizedSources: []
              }
            ]
          },
          {
            type: 2,
            sku_id: "1409983105577783410",
            label: "Make your name stand out in servers and chats.",
            palette: "violet"
          }
        ],
        sku_id: "1410030846337093672",
        type: 1000
      },
      {
        name: "Bonsai - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853949", label: "A bonsai avatar decoration." }],
        sku_id: "1440174638930853949",
        type: 0
      },
      {
        name: "Donut - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853950", label: "A donut avatar decoration." }],
        sku_id: "1440174638930853950",
        type: 0
      },
      {
        name: "Capybara - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853951", label: "A capybara avatar decoration." }],
        sku_id: "1440174638930853951",
        type: 0
      },
      {
        name: "Disco - Checkpoint 2025",
        items: [
          { type: 0, sku_id: "1440174638930853952", label: "A disco ball avatar decoration." }
        ],
        sku_id: "1440174638930853952",
        type: 0
      },
      {
        name: "Origami - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853953", label: "An origami avatar decoration." }],
        sku_id: "1440174638930853953",
        type: 0
      },
      {
        name: "Snail - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853954", label: "A snail avatar decoration." }],
        sku_id: "1440174638930853954",
        type: 0
      },
      {
        name: "Duck - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853955", label: "A duck avatar decoration." }],
        sku_id: "1440174638930853955",
        type: 0
      },
      {
        name: "Banana - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853956", label: "A banana avatar decoration." }],
        sku_id: "1440174638930853956",
        type: 0
      },
      {
        name: "Cat - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853957", label: "A cat avatar decoration." }],
        sku_id: "1440174638930853957",
        type: 0
      },
      {
        name: "Cassette - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853958", label: "A cassette avatar decoration." }],
        sku_id: "1440174638930853958",
        type: 0
      },
      {
        name: "Full HP",
        items: [
          {
            type: 0,
            sku_id: "1464006538304684063",
            label: "Three pixel-style red hearts appear above the user’s avatar. Each heart gradually fills from empty to full in a loop, mimicking a video game health bar animation."
          }
        ],
        sku_id: "1464006538304684063",
        type: 0
      },
      {
        name: "Full Heart",
        items: [
          {
            type: 2,
            sku_id: "1464017397081047081",
            label: "A red pixel-style heart is displayed to the right of the user’s name. The heart slowly fills from empty to full in a repeating animation.",
            palette: "crimson"
          }
        ],
        sku_id: "1464017397081047081",
        type: 2
      }
    ]
  },
  {
    name: "Special Events",
    sku_id: "1217175518781243583",
    products: [
      {
        name: "Ghosts",
        items: [
          {
            type: 0,
            sku_id: "1157411685687115858",
            label: "You notice two spooky ghosts twirling around each other in an eternal dance. Are they friend or foe?"
          }
        ],
        sku_id: "1157411685687115858",
        type: 0
      },
      {
        name: "Graveyard Cat",
        items: [
          {
            type: 0,
            sku_id: "1157411984371880118",
            label: "Bathed in the glow of a full moon, a mysterious black cat is perched upon a tombstone, playfully pawing the tomb's exterior."
          }
        ],
        sku_id: "1157411984371880118",
        type: 0
      },
      {
        name: "Jack-o'-lantern",
        items: [
          {
            type: 0,
            sku_id: "1157412388509864068",
            label: "A gleeful jack-o'-lantern cackles atop a dark, twisted branch, with bats swirling above to join in on the spooky shenanigans."
          }
        ],
        sku_id: "1157412388509864068",
        type: 0
      },
      {
        name: "Minions",
        items: [
          {
            type: 0,
            sku_id: "1157412779335090267",
            label: "A one-eyed magic cauldron hovers in the air, bubbling with a strange, green brew. Its winged jack-o'-lantern companion flaps nearby. What mischief are they brewing?"
          }
        ],
        sku_id: "1157412779335090267",
        type: 0
      },
      {
        name: "I'm a Clown",
        items: [
          {
            type: 0,
            sku_id: "1216908559548289084",
            label: "An avatar wears a vibrant ensemble of colorful clown hair, bowtie, and a striking red nose that balloons and pops."
          }
        ],
        sku_id: "1216908559548289084",
        type: 0
      },
      {
        name: "Gyoiko Sakura",
        items: [
          {
            type: 0,
            sku_id: "1225876188074082374",
            label: "The petals of three lovely, green cherry blossoms drift softly across the avatar."
          }
        ],
        sku_id: "1225876188074082374",
        type: 0
      },
      {
        name: "Mokoko",
        items: [
          {
            type: 0,
            sku_id: "1226939756617793606",
            label: "An affectionate Mokoko hugs the avatar then slides down and climbs back up to hug the avatar again."
          }
        ],
        sku_id: "1226939756617793606",
        type: 0
      },
      {
        name: "Warp Helmet",
        items: [
          {
            type: 0,
            sku_id: "1251324401459265537",
            label: "Futuristic Helmet, Blue with Green Warp Speed Light, Animated"
          }
        ],
        sku_id: "1251324401459265537",
        type: 0
      },
      {
        name: "Fortnite Victory Crown",
        items: [
          {
            type: 0,
            sku_id: "1252353273256480818",
            label: "A gold, sparkly crown with a llama adornment tilts up and down. The avatar sparkles and glows with a golden aura."
          }
        ],
        sku_id: "1252353273256480818",
        type: 0
      },
      {
        name: "Freezer Bunny Lovebug",
        items: [
          {
            type: 0,
            sku_id: "1262457693965258874",
            label: "An adorable Freezer Bunny. It bounces upward into frame and throws hearts into the sky around the avatar."
          }
        ],
        sku_id: "1262457693965258874",
        type: 0
      },
      {
        name: "Wingman Boba",
        items: [
          {
            type: 0,
            sku_id: "1262473048876122112",
            label: "VALORANT Agent Gekko's cute yellow creature presents you with a boba tea and happily floats beside your avatar, creating a delightful and playful atmosphere."
          }
        ],
        sku_id: "1262473048876122112",
        type: 0
      },
      {
        name: "Los Santos",
        items: [
          {
            type: 0,
            sku_id: "1262518692248420434",
            label: 'Reads "City of Los Santos, Founded 1781", and shows a helicopter with a searchlight flying into the frame.'
          }
        ],
        sku_id: "1262518692248420434",
        type: 0
      },
      {
        name: "Test Collectible Quest Reward",
        items: [
          {
            type: 0,
            sku_id: "1272728337848074271",
            label: "The petals of three lovely, green cherry blossoms drift softly across the avatar."
          }
        ],
        sku_id: "1272728337848074271",
        type: 0
      },
      {
        name: "Hailey",
        items: [
          {
            type: 0,
            sku_id: "1278392092258734091",
            label: "A white fur coat hood that pulls a cover over the mouth as snow falls around the decoration"
          }
        ],
        sku_id: "1278392092258734091",
        type: 0
      },
      {
        name: "Torgal Puppy",
        items: [
          {
            type: 0,
            sku_id: "1280648686736638003",
            label: "Torgal the Puppy chasing a firefly but not catching it."
          }
        ],
        sku_id: "1280648686736638003",
        type: 0
      },
      {
        name: "Street Fighter 6 Battle Field Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1280648686749352003",
            label: "Shows two health bars, a timer, fireballs moving between the two health bars, and the word FIGHT!"
          }
        ],
        sku_id: "1280648686749352003",
        type: 0
      },
      {
        name: "Bunny",
        items: [
          {
            type: 0,
            sku_id: "1280648686749352007",
            label: "A futuristic headpiece with glowing ears that crackle with electric energy."
          }
        ],
        sku_id: "1280648686749352007",
        type: 0
      },
      {
        name: "Wolf Morph",
        items: [
          {
            type: 0,
            sku_id: "1286046055498252319",
            label: "Wolf Morph appears, shakes their head, then disappears"
          }
        ],
        sku_id: "1286046055498252319",
        type: 0
      },
      {
        name: "2025 Balloons",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850769",
            label: "Gold, metallic, balloon-style numbers arranged to spell 2025."
          }
        ],
        sku_id: "1301993378484850769",
        type: 0
      },
      {
        name: "Holiday Cat Ears",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850771",
            label: "A Santa hat with a red, pointed top and fluffy white trim, designed with two prominent cat ears that stick up on either side"
          }
        ],
        sku_id: "1301993378484850771",
        type: 0
      },
      {
        name: "Snowfall",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850773",
            label: "Snowflakes fall gently around the avatar, creating a winter wonderland."
          }
        ],
        sku_id: "1301993378484850773",
        type: 0
      },
      {
        name: "Gear Spin",
        items: [
          {
            type: 0,
            sku_id: "1304519765917696011",
            label: "A pink and purple gear spins rapidly around your avatar, putting off neon green sparks. Careful with that."
          }
        ],
        sku_id: "1304519765917696011",
        type: 0
      },
      {
        name: "Wallach IX Spaceport",
        items: [
          {
            type: 0,
            sku_id: "1305905202578325535",
            label: "A spacecraft flies by two pillars at the Wallach IX Spaceport past a glowing crescent ring and disappears."
          }
        ],
        sku_id: "1305905202578325535",
        type: 0
      }
    ]
  },
  {
    name: "Breakfast",
    sku_id: "1144054000099012659",
    products: [
      {
        name: "Toast",
        items: [
          {
            type: 0,
            id: "1144056139584127059",
            sku_id: "1144056139584127058",
            label: "Toast Being Eaten, Animated"
          }
        ],
        sku_id: "1144056139584127058"
      },
      {
        name: "Morning Coffee",
        items: [
          {
            type: 0,
            id: "1144056631374647459",
            sku_id: "1144056631374647458",
            label: "Coffee with Milk Steaming from Blue Mug with Smiley Face, Animated"
          }
        ],
        sku_id: "1144056631374647458"
      },
      {
        name: "Fried Egg",
        items: [
          {
            type: 0,
            id: "1144057023726628946",
            sku_id: "1144057023726628945",
            label: "Runny Egg Yolk, Animated"
          }
        ],
        sku_id: "1144057023726628945"
      },
      {
        name: "Blueberry Jam",
        items: [
          {
            type: 0,
            id: "1144057249392771146",
            sku_id: "1144057249392771145",
            label: "Blueberry Jam Spelling the Letters ‘mmmm’, Animated"
          }
        ],
        sku_id: "1144057249392771145"
      },
      {
        name: "Doughnut",
        items: [
          {
            type: 0,
            id: "1144057486203158561",
            sku_id: "1144057486203158560",
            label: "Doughnut with Pink Glaze and Sprinkles, Animated"
          }
        ],
        sku_id: "1144057486203158560"
      },
      {
        name: "Pancakes",
        items: [
          {
            type: 0,
            id: "1144057737475534890",
            sku_id: "1144057737475534889",
            label: "Stack of Pancakes with Butter and Syrup, Animated"
          }
        ],
        sku_id: "1144057737475534889"
      }
    ]
  }
];

// src/global/stores/ShopCollectiblesStore.tsx
function itemsByType(collection, type) {
  if (!collection)
    return null;
  const items = collection.products.flatMap((p) => p.items.filter((i2) => i2.type === type).map((i2) => ({ ...i2, productName: p.name })));
  return [...new Map(items.map((i2) => [i2.sku_id, i2])).values()];
}
var ShopCollectiblesStore_default = new class ShopCollectiblesStore extends BetterDiscord.Utils.Store {
  collections = [];
  quests = [];
  _invalid = [];
  constructor() {
    super();
    this.fetch();
  }
  async fetch() {
    const [collections, quests] = await Promise.all([
      BetterDiscord.Net.fetch("https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/collectibles.json").then((r) => r.json()),
      BetterDiscord.Net.fetch("https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/quests.json").then((r) => r.json())
    ]);
    this.collections = collections;
    this.quests = quests;
    this._invalid = invalid;
    this.emitChange();
  }
  set(data) {
    this.collections = data.categories.categories;
    this.emitChange();
  }
  getCategories() {
    return this.collections.map((c) => c.sku_id);
  }
  getInvalids() {
    return this._invalid.map((c) => c.sku_id);
  }
  getInvalid(id) {
    return this._invalid.find((c) => c.sku_id === id);
  }
  getCategory(skuId) {
    return this.collections.find((c) => c.sku_id === skuId);
  }
  getInvalidCategory(skuId) {
    return this._invalid.find((c) => c.sku_id === skuId);
  }
  getItemsFromCategory(skuId) {
    const category = this.getCategory(skuId);
    return category ? category.products.filter((p) => p.type !== 1000) : null;
  }
  getAvatarDecorations(skuId) {
    return itemsByType(this.getCategory(skuId), 0 /* AvatarDecoration */);
  }
  getNameplates(skuId) {
    return itemsByType(this.getCategory(skuId), 2 /* Nameplate */);
  }
  getProfileEffects(skuId) {
    return itemsByType(this.getCategory(skuId), 1 /* ProfileEffect */);
  }
  getProfileFrames(skuId) {
    return itemsByType(this.getCategory(skuId), 3 /* ProfileFrame */);
  }
  getInvalidByType(skuId, type) {
    return itemsByType(this.getInvalidCategory(skuId), type);
  }
  getAllShopItems() {
    return this.collections.flatMap((c) => c.products.flatMap((p) => p.items.map((i2) => ({ ...i2, productName: p.name }))));
  }
  getShopItemBySkuId(skuId) {
    return this.getAllShopItems().find((i2) => i2.sku_id === skuId);
  }
  getQuests() {
    return this.quests;
  }
  getQuest(id) {
    return this.quests.find((q) => q.id === id);
  }
  getAllQuestRewards() {
    return this.quests.flatMap((q) => q?.config?.rewards_config?.rewards ?? []);
  }
  getProduct(skuId) {
    return this.getAllQuestRewards().find((r) => r.sku_id === skuId);
  }
  getQuestCollectible(skuId) {
    return this.getAllQuestRewards().find((r) => r.sku_id === skuId);
  }
  getAllResolvedQuestItems() {
    return this.getAllQuestRewards().map((r) => this.getShopItemBySkuId(r.sku_id)).filter((i2) => i2 !== undefined);
  }
  getQuestAvatarDecorations() {
    return this.getAllResolvedQuestItems().filter((i2) => i2.type === 3);
  }
  unload() {
    this.collections = [];
    this.quests = [];
    this._invalid = [];
  }
};

// src/ui/ProfileEffects.tsx
var { Components: Components6, React: React10 } = BetterDiscord;
var { useState: useState2 } = React10;
var ModalModule4 = wpGetByKeys(["Modal"]);
function OpenProfileEffectModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React10.createElement(ModalModule4.Modal, {
        title: "Change Profile Effect",
        ...props
      }, /* @__PURE__ */ React10.createElement(ProfileEffects, null));
    });
  }
  return /* @__PURE__ */ React10.createElement(Components6.Button, {
    onClick: handleClick
  }, "Change");
}
function CustomSkuTextInput({ skuId, setSkuId }) {
  const [customSkuTextBox, setCustomSkuTextBox] = useState2("");
  function onChange(e) {
    setCustomSkuTextBox(e);
  }
  function onKeyDown(e) {
    if (e.keyCode == 13 || e.key == "Enter")
      return copyProfileEffect3y3(skuId ?? customSkuTextBox);
    else {
      setCustomSkuTextBox(skuId ?? customSkuTextBox);
      setSkuId(null);
    }
  }
  return /* @__PURE__ */ React10.createElement("div", {
    style: { marginBottom: "8px" }
  }, /* @__PURE__ */ React10.createElement(Components6.TextInput, {
    placeholder: "Custom SKU ID... (enter to copy)",
    defaultValue: skuId ?? customSkuTextBox,
    value: skuId ?? customSkuTextBox,
    onKeyDown,
    onChange
  }));
}
function copyProfileEffect3y3(skuId) {
  copyToClipboard(" " + secondsightifyEncodeOnly("fx" + skuId), "3y3 copied to clipboard!");
}
function ProfileEffect({ product, setSkuId }) {
  const skuId = product.sku_id;
  const src = product.thumbnailPreviewSrc;
  const title = product.title;
  return /* @__PURE__ */ React10.createElement("img", {
    onClick: () => {
      setSkuId(skuId);
      copyProfileEffect3y3(skuId);
    },
    src,
    title,
    style: {
      width: "22.5%",
      cursor: "pointer",
      marginBottom: "0.5em",
      marginLeft: "0.5em",
      backgroundColor: "var(--background-base-lower)",
      display: "inline-block"
    }
  });
}
function Category({ skuId, query, setSkuId }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  const products = ShopCollectiblesStore_default.getProfileEffects(skuId);
  const filteredProducts = products?.filter?.((product) => product?.title?.toLowerCase?.()?.includes?.(query.toLowerCase()) || product?.accessibilityLabel?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  return /* @__PURE__ */ React10.createElement("div", {
    style: {
      display: "inline-block",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px"
    }
  }, filteredProducts?.length ? /* @__PURE__ */ React10.createElement(Components6.Text, {
    style: { fontSize: "16px", fontWeight: "bold", margin: "10px 8px" }
  }, category?.name) : null, filteredProducts?.map((x2) => /* @__PURE__ */ React10.createElement(ProfileEffect, {
    product: x2,
    setSkuId
  })));
}
function ProfileEffects() {
  const [query, setQuery] = useState2("");
  const [skuId, setSkuId] = useState2("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  const advancedProfileCustomization = SettingsStore_default.get("advancedProfileCustomization");
  return /* @__PURE__ */ React10.createElement("div", null, advancedProfileCustomization ? /* @__PURE__ */ React10.createElement(CustomSkuTextInput, {
    setSkuId,
    skuId
  }) : null, /* @__PURE__ */ React10.createElement(Components6.SearchInput, {
    defaultValue: query,
    placeholder: "Search...",
    onChange: (e) => setQuery(e),
    style: {
      backgroundColor: `var(--control-secondary-background-default)`
    }
  }), Collections.map((id) => {
    return /* @__PURE__ */ React10.createElement(Category, {
      skuId: id,
      query,
      setSkuId
    });
  }));
}
// src/ui/AvatarDecorations.tsx
var { Components: Components7, React: React11, Webpack: Webpack2 } = BetterDiscord;
var { useState: useState3, useMemo: useMemo2, useCallback: useCallback2 } = React11;
var { UserStore: UserStore7 } = Webpack2.Stores;
var ModalModule5 = wpGetByKeys(["Modal"]);
var ProductDisplayer = wpGetProxy(Webpack2.Filters.byStrings("),{avatarDecorationSrc:", ",avatarSrcOverride:"), { searchExports: true });
function OpenAvatarDecorationModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React11.createElement(ModalModule5.Modal, {
        title: "Change Avatar Decorations",
        ...props
      }, /* @__PURE__ */ React11.createElement(AvatarDecorations, null));
    });
  }
  return /* @__PURE__ */ React11.createElement(Components7.Button, {
    onClick: handleClick
  }, "Change");
}
function copyAvatarDecoration3y3(skuId) {
  copyToClipboard(" " + secondsightifyEncodeOnly("/a" + skuId), "3y3 copied to clipboard!");
}
function AvatarDecoration({ product, setSkuId }) {
  const [hovered, setHovered] = useState3(false);
  const skuId = product.sku_id;
  const decorationItem = { ...product, skuId: product.sku_id };
  function handleClick() {
    setSkuId(skuId);
    copyAvatarDecoration3y3(skuId);
  }
  return /* @__PURE__ */ React11.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: handleClick,
    title: product.productName,
    style: { cursor: "pointer" }
  }, /* @__PURE__ */ React11.createElement(ProductDisplayer, {
    isHighlighted: hovered,
    item: decorationItem,
    user: UserStore7.getCurrentUser(),
    avatarSize: "SIZE_72"
  }));
}
function InvalidProductDisplay({ product, setSkuId }) {
  const [hovered, setHovered] = useState3(false);
  const skuId = product.sku_id;
  const decorationItem = { ...product, skuId: product.sku_id };
  return /* @__PURE__ */ React11.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => copyAvatarDecoration3y3(skuId),
    title: product.name,
    style: { cursor: "pointer" }
  }, /* @__PURE__ */ React11.createElement(ProductDisplayer, {
    avatarSize: "SIZE_72",
    isHighlighted: hovered,
    item: decorationItem,
    user: UserStore7.getCurrentUser()
  }));
}
function Category2({
  skuId,
  query,
  setSkuId
}) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  const products = ShopCollectiblesStore_default.getAvatarDecorations(skuId);
  const filteredProducts = useMemo2(() => {
    if (!products?.length)
      return [];
    if (!query.trim())
      return products;
    return products.filter((product) => product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  }, [products, query]);
  if (!filteredProducts.length)
    return null;
  return /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px",
      padding: "8px"
    }
  }, /* @__PURE__ */ React11.createElement(Components7.Text, {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    }
  }, category?.name), /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
      gap: "8px"
    }
  }, filteredProducts.map((x2) => /* @__PURE__ */ React11.createElement(AvatarDecoration, {
    key: x2.sku_id,
    product: x2,
    setSkuId
  }))));
}
function QuestCategory({
  questDecorations,
  query,
  setSkuId
}) {
  const filteredProducts = useMemo2(() => {
    if (!questDecorations?.length)
      return [];
    if (!query.trim())
      return questDecorations;
    return questDecorations.filter((product) => product?.messages?.name?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  }, [questDecorations, query]);
  if (!filteredProducts.length)
    return null;
  return /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px",
      padding: "8px"
    }
  }, /* @__PURE__ */ React11.createElement(Components7.Text, {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    }
  }, "Quests"), /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
      gap: "8px"
    }
  }, filteredProducts.map((x2) => /* @__PURE__ */ React11.createElement(AvatarDecoration, {
    key: x2.sku_id,
    product: x2,
    setSkuId
  }))));
}
function InvalidCategory({
  category,
  query,
  setSkuId
}) {
  const filteredProducts = useMemo2(() => {
    if (!category?.products?.length)
      return [];
    if (!query.trim())
      return category.products;
    return category.products.filter((product) => product?.name?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  }, [category, query]);
  if (!filteredProducts.length)
    return null;
  return /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px",
      padding: "8px"
    }
  }, /* @__PURE__ */ React11.createElement(Components7.Text, {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    }
  }, category?.name, " (Offsale)"), /* @__PURE__ */ React11.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
      gap: "8px"
    }
  }, filteredProducts.map((product) => /* @__PURE__ */ React11.createElement(InvalidProductDisplay, {
    key: product.sku_id,
    product,
    setSkuId
  }))));
}
function Invalid({ query, setSkuId }) {
  const categories = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getInvalids().map((x2) => ShopCollectiblesStore_default.getInvalid(x2)).filter(Boolean));
  if (!categories?.length)
    return null;
  return /* @__PURE__ */ React11.createElement("div", null, categories.map((x2) => /* @__PURE__ */ React11.createElement(InvalidCategory, {
    key: x2.id,
    category: x2,
    query,
    setSkuId
  })));
}
function CustomSkuTextInput2({ skuId, setSkuId }) {
  const [customSkuTextBox, setCustomSkuTextBox] = useState3("");
  function onChange(e) {
    setCustomSkuTextBox(e);
  }
  function onKeyDown(e) {
    if (e.keyCode == 13 || e.key == "Enter")
      return copyAvatarDecoration3y3(skuId ?? customSkuTextBox);
    else {
      setCustomSkuTextBox(skuId ?? customSkuTextBox);
      setSkuId(null);
    }
  }
  return /* @__PURE__ */ React11.createElement("div", {
    style: { marginBottom: "8px" }
  }, /* @__PURE__ */ React11.createElement(Components7.TextInput, {
    placeholder: "Custom SKU ID... (enter to copy)",
    defaultValue: skuId ?? customSkuTextBox,
    value: skuId ?? customSkuTextBox,
    onKeyDown,
    onChange
  }));
}
function AvatarDecorations() {
  const [query, setQuery] = useState3("");
  const [skuId, setSkuId] = useState3("");
  const advancedProfileCustomization = SettingsStore_default.get("advancedProfileCustomization");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  const questDecorations = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getQuestAvatarDecorations());
  return /* @__PURE__ */ React11.createElement("div", null, advancedProfileCustomization ? /* @__PURE__ */ React11.createElement(CustomSkuTextInput2, {
    skuId,
    setSkuId
  }) : null, /* @__PURE__ */ React11.createElement(Components7.SearchInput, {
    value: query,
    defaultValue: "",
    placeholder: "Search decorations...",
    onChange: (e) => setQuery(e),
    style: {
      backgroundColor: "var(--control-secondary-background-default)"
    }
  }), Collections?.map((id) => /* @__PURE__ */ React11.createElement(Category2, {
    key: id,
    skuId: id,
    query,
    setSkuId
  })), /* @__PURE__ */ React11.createElement(QuestCategory, {
    query,
    questDecorations,
    setSkuId
  }), /* @__PURE__ */ React11.createElement(Invalid, {
    query,
    setSkuId
  }));
}
// src/ui/Nameplates.tsx
var { React: React12, Components: Components8 } = BetterDiscord;
var { Suspense: Suspense2 } = React12;
var { useMemo: useMemo3, useState: useState4 } = React12;
var ModalModule6 = wpGetByKeys(["Modal"]);
var Nameplate = React12.lazy(async () => ({
  default: await wpWaitWithTimeout(BetterDiscord.Webpack.Filters.bySource(".x5CoXR),className:"), {
    timeout: 1e4,
    declaration: (x2) => String(x2).includes(".x5CoXR),className:")
  })
}));
var { UserStore: UserStore8 } = BetterDiscord.Webpack.Stores;
function OpenNameplateModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React12.createElement(ModalModule6.Modal, {
        title: "Change Nameplate",
        ...props
      }, /* @__PURE__ */ React12.createElement(Nameplates, null));
    });
  }
  return /* @__PURE__ */ React12.createElement(Components8.Button, {
    onClick: handleClick
  }, "Change");
}
function copyNameplate3y3({ skuId, palette }) {
  copyToClipboard(" " + secondsightifyEncodeOnly(`n{${skuId},${palette}}`), "3y3 copied to clipboard!");
}
function AdvancedNameplateTextInput({ skuId, setSkuId, palette, setPalette }) {
  const [customSkuTextBox, setCustomSkuTextBox] = useState4("");
  const [customPaletteTextBox, setCustomPaletteTextBox] = useState4("");
  function onKeyDown(e) {
    if (e.keyCode == 13 || e.key == "Enter")
      return copyNameplate3y3({
        skuId: skuId ?? customSkuTextBox,
        palette: palette ?? customPaletteTextBox
      });
    else {
      setCustomSkuTextBox(skuId ?? customSkuTextBox);
      setCustomPaletteTextBox(palette ?? customPaletteTextBox);
      setSkuId(null);
      setPalette(null);
    }
  }
  return /* @__PURE__ */ React12.createElement("div", {
    style: { marginBottom: "8px" }
  }, /* @__PURE__ */ React12.createElement(Components8.TextInput, {
    placeholder: "Custom SKU ID... (enter to copy)",
    defaultValue: skuId ?? customSkuTextBox,
    value: skuId ?? customSkuTextBox,
    onKeyDown,
    onChange: (e) => setCustomSkuTextBox(e)
  }), /* @__PURE__ */ React12.createElement(Components8.TextInput, {
    placeholder: "Palette... (enter to copy)",
    defaultValue: palette ?? customPaletteTextBox,
    value: palette ?? customPaletteTextBox,
    onKeyDown,
    onChange: (e) => setCustomPaletteTextBox(e)
  }));
}
function Nameplate3y3({ product, setPalette, setSkuId }) {
  const [hovered, setHovered] = React12.useState(false);
  return /* @__PURE__ */ React12.createElement("div", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => {
      setPalette(product.palette);
      setSkuId(product.sku_id);
      copyNameplate3y3({ skuId: product.sku_id, palette: product.palette });
    },
    style: {
      marginBottom: "10px"
    },
    title: product.productName
  }, /* @__PURE__ */ React12.createElement(Nameplate, {
    section: "purchase",
    currentUser: UserStore8.getCurrentUser(),
    nameplate: {
      skuId: product.sku_id,
      asset: product.asset,
      label: product.label,
      palette: product.palette
    },
    canUsePremiumCollectibles: true,
    isSelected: hovered
  }));
}
function NameplateCategory({ skuId, query, setSkuId, setPalette }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  if (!category)
    return null;
  const products = ShopCollectiblesStore_default.getNameplates(skuId);
  const filteredProducts = useMemo3(() => {
    if (!products?.length)
      return [];
    if (!query.trim())
      return products;
    return products.filter((product) => product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  }, [products, query]);
  return filteredProducts.length ? /* @__PURE__ */ React12.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px",
      padding: "8px"
    }
  }, filteredProducts.length ? /* @__PURE__ */ React12.createElement(Components8.Text, null, category.name) : null, filteredProducts.map((x2) => /* @__PURE__ */ React12.createElement(Nameplate3y3, {
    product: x2,
    setSkuId,
    setPalette
  }))) : null;
}
function Nameplates() {
  const [query, setQuery] = useState4("");
  const [skuId, setSkuId] = useState4("");
  const [palette, setPalette] = useState4("");
  const advancedProfileCustomization = SettingsStore_default.get("advancedProfileCustomization");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  return /* @__PURE__ */ React12.createElement(Suspense2, {
    fallback: /* @__PURE__ */ React12.createElement("div", null, "This could be infinite loading situation, Please load the normal nameplates button")
  }, advancedProfileCustomization ? /* @__PURE__ */ React12.createElement(AdvancedNameplateTextInput, {
    palette,
    setPalette,
    skuId,
    setSkuId
  }) : null, /* @__PURE__ */ React12.createElement(Components8.SearchInput, {
    placeholder: "Search nameplates...",
    defaultValue: query,
    onChange: (e) => setQuery(e)
  }), Collections.map((x2) => /* @__PURE__ */ React12.createElement(NameplateCategory, {
    skuId: x2,
    query,
    setSkuId,
    setPalette
  })));
}
// src/ui/ProfileFrames.tsx
var { React: React13, Components: Components9 } = BetterDiscord;
var { Suspense: Suspense3 } = React13;
var { useMemo: useMemo4, useState: useState5 } = React13;
var ModalModule7 = wpGetByKeys(["Modal"]);
var ProfileFrameElem = React13.lazy(async () => ({
  default: await wpWaitWithTimeout(BetterDiscord.Webpack.Filters.bySource("let{profileFrame:"), {
    timeout: 1e4,
    declaration: (x2) => String(x2).includes("let{profileFrame:")
  })
}));
function OpenProfileFramesModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return /* @__PURE__ */ React13.createElement(ModalModule7.Modal, {
        title: "Change Profile Frame",
        size: "lg",
        ...props
      }, /* @__PURE__ */ React13.createElement(ProfileFrames, null));
    });
  }
  return /* @__PURE__ */ React13.createElement(Components9.Button, {
    onClick: handleClick
  }, "Change");
}
function copyProfileFrame3y3({ skuId }) {
  copyToClipboard(" " + secondsightifyEncodeOnly(`pf${skuId}`), "3y3 copied to clipboard!");
}
function CustomSkuTextInput3({ skuId, setSkuId }) {
  const [customSkuTextBox, setCustomSkuTextBox] = useState5("");
  function onChange(e) {
    setCustomSkuTextBox(e);
  }
  function onKeyDown(e) {
    if (e.keyCode == 13 || e.key == "Enter")
      return copyProfileFrame3y3({ skuId: skuId ?? customSkuTextBox });
    else {
      setCustomSkuTextBox(skuId ?? customSkuTextBox);
      setSkuId(null);
    }
  }
  return /* @__PURE__ */ React13.createElement("div", {
    style: { marginBottom: "8px" }
  }, /* @__PURE__ */ React13.createElement(Components9.TextInput, {
    placeholder: "Custom SKU ID... (enter to copy)",
    defaultValue: skuId ?? customSkuTextBox,
    value: skuId ?? customSkuTextBox,
    onKeyDown,
    onChange
  }));
}
function ProfileFrame({ product, setSkuId }) {
  const [hovered, setHovered] = React13.useState(false);
  return /* @__PURE__ */ React13.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseOut: () => setHovered(false),
    onClick: () => {
      copyProfileFrame3y3({ skuId: product.sku_id });
      setSkuId(product.sku_id);
    },
    title: product.productName
  }, /* @__PURE__ */ React13.createElement(ProfileFrameElem, {
    profileFrame: {
      ...product,
      overflowBottom: product.overflow_bottom,
      overflowTop: product.overflow_top,
      overflowHorizontal: product.overflow_horizontal,
      innerWidth: product.inner_width,
      skuId: product.sku_id
    },
    section: "purchase",
    isSelected: hovered,
    canUsePremiumCollectibles: true,
    style: {
      height: "175px",
      width: "175px",
      cursor: "pointer"
    }
  }));
}
function ProfileFrameCategory({ skuId, query, setSkuId }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  if (!category)
    return null;
  const products = ShopCollectiblesStore_default.getProfileFrames(skuId);
  const filteredProducts = useMemo4(() => {
    if (!products?.length)
      return [];
    if (!query.trim())
      return products;
    return products.filter((product) => product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase()));
  }, [products, query]);
  return filteredProducts.length ? /* @__PURE__ */ React13.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-base-lower)",
      borderRadius: "10px",
      margin: "5px 0px",
      padding: "8px"
    }
  }, filteredProducts.length ? /* @__PURE__ */ React13.createElement(Components9.Text, null, category.name) : null, /* @__PURE__ */ React13.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
      gap: "8px"
    }
  }, filteredProducts.map((x2) => /* @__PURE__ */ React13.createElement(ProfileFrame, {
    product: x2,
    setSkuId
  })))) : null;
}
function ProfileFrames() {
  const [query, setQuery] = useState5("");
  const [skuId, setSkuId] = useState5("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  const advancedProfileCustomization = SettingsStore_default.get("advancedProfileCustomization");
  return /* @__PURE__ */ React13.createElement(Suspense3, {
    fallback: /* @__PURE__ */ React13.createElement("div", null, "This could be infinite loading situation, Please load the normal profile effects button")
  }, advancedProfileCustomization ? /* @__PURE__ */ React13.createElement(CustomSkuTextInput3, {
    setSkuId,
    skuId
  }) : null, /* @__PURE__ */ React13.createElement(Components9.SearchInput, {
    placeholder: "Search nameplates...",
    defaultValue: query,
    onChange: (e) => setQuery(e)
  }), Collections.map((x2) => /* @__PURE__ */ React13.createElement(ProfileFrameCategory, {
    skuId: x2,
    query,
    setSkuId
  })));
}
// src/patches/modules/UserProfileV2.tsx
var { React: React14, Components: Components10 } = BetterDiscord;
var { UserStore: UserStore9 } = BetterDiscord.Webpack.Stores;
var GLOBAL_FILTER = BetterDiscord.Webpack.Filters.bySource(".RP.ACTIVITY?(0,");
var Scroller = styled.div({
  overflowY: "scroll",
  scrollbarWidth: "none",
  maxWidth: "400px"
});
var Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px"
});
var Card = styled.div({
  padding: "12px 12px 12px 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "8px",
  minWidth: 0,
  overflow: "hidden"
});
var CardTop = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minWidth: 0,
  overflow: "hidden",
  marginTop: "8px"
});
var CardLabel = styled.div({
  fontSize: "12px",
  fontWeight: "var(--font-weight-bold)",
  color: "var(--text-default)",
  textTransform: "uppercase",
  letterSpacing: "0.02em"
});
function CustomSettingsTab() {
  const isDeveloper = BadgesStore_default.isImportant(UserStore9.getCurrentUser().id);
  const advancedProfileCustomization = SettingsStore_default.get("advancedProfileCustomization");
  const [devText, setDevText] = React14.useState("");
  return /* @__PURE__ */ React14.createElement(Scroller, null, /* @__PURE__ */ React14.createElement(Grid, null, /* @__PURE__ */ React14.createElement(CardTop, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Theme Colors"), /* @__PURE__ */ React14.createElement(AccentColors, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Custom PFP"), /* @__PURE__ */ React14.createElement(CustomPFP, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Custom Banner"), /* @__PURE__ */ React14.createElement(CustomBanner, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Display Name Style"), /* @__PURE__ */ React14.createElement(OpenDisplayNameStyleModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Profile Effect"), /* @__PURE__ */ React14.createElement(OpenProfileEffectModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Avatar Decoration"), /* @__PURE__ */ React14.createElement(OpenAvatarDecorationModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Nameplate"), /* @__PURE__ */ React14.createElement(OpenNameplateModalButton, null)), /* @__PURE__ */ React14.createElement(Card, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Profile Frame"), /* @__PURE__ */ React14.createElement(OpenProfileFramesModalButton, null)), isDeveloper || advancedProfileCustomization ? /* @__PURE__ */ React14.createElement(Card, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Developer"), /* @__PURE__ */ React14.createElement("div", {
    style: { display: "flex", gap: "8px", width: "100%" }
  }, /* @__PURE__ */ React14.createElement(Components10.TextInput, {
    value: devText,
    onChange: setDevText,
    style: { flex: 1 }
  }), /* @__PURE__ */ React14.createElement(Components10.Button, {
    onClick: () => {
      copyToClipboard(secondsightifyEncodeOnly(devText), "Copied encoded text to clipboard!");
    }
  }, "Encode"))) : null));
}
var UserProfileV2_default = {
  name: "User Profile V2",
  description: "skibidi toilet",
  ids: [
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource("speakingWhilePTTInactive"), {
      raw: true
    }).then((x2) => x2.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource("StageChannelCall"), { raw: true }).then((x2) => x2.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource(/initialSelectedNameplate:.,stackingBehavior/), { raw: true }).then((x2) => x2.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource(/initialSelectedProfileFrame:.,stackingBehavior:.,returnRef/), { raw: true }).then((x2) => x2.id)
  ],
  priority: 10,
  waitFor: [GLOBAL_FILTER],
  apply(finale, patcher) {
    const TabBarInjectLocation = wpGet(GLOBAL_FILTER, { raw: true }).declarations;
    const module2 = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".RP.ACTIVITY?(0,"));
    const tabSectionReturn = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".section==="));
    const GoLiveModalV2UpsellMod = BetterDiscord.Webpack.getBySource("profile-editing-nameplate-error", { raw: true });
    const upsell = getKey(GoLiveModalV2UpsellMod.declarations, BetterDiscord.Webpack.Filters.byStrings("nitro-pink"));
    patcher.after(module2.module, module2.key, (a, [args], callback) => {
      if (args.section == "YABDP4Nitro") {
        return /* @__PURE__ */ React14.createElement(CustomSettingsTab, null);
      }
      return callback;
    });
    patcher.before(tabSectionReturn.module, tabSectionReturn.key, (a, [args], res) => {
      if (args?.displayProfile?.userId != UserStore9.getCurrentUser().id)
        return res;
      if (args?.items && args.items.find((x2) => x2.text.includes("YABD")))
        return;
      args.items.push({
        text: "YABDP4Nitro",
        section: "YABDP4Nitro"
      });
    });
    patcher.instead(upsell.module, upsell.key, (_, args, originalFunction) => {
      const upsellRemovalEnabled = SettingsStore_default.get("removeProfileUpsell");
      if (upsellRemovalEnabled)
        return null;
      return originalFunction.apply(args);
    });
    return;
  }
};
// src/patches/modules/getAvatarURL.ts
var UserClass = wpGet((x2) => x2.prototype?.getAvatarURL, { searchExports: true });
var getAvatarURL_default = {
  name: "getAvatarURL",
  apply(finale, patcher) {
    patcher.instead(UserClass.prototype, "getAvatarURL", (thisContext, args, originalFunction) => {
      if (!SettingsStore_default.get("customPFPs") || !SettingsStore_default.get("userPfpIntegration")) {
        return originalFunction.apply(thisContext, args);
      }
      const userPfp = UserProfilePictureStore_default.get(thisContext.id);
      if (userPfp)
        return userPfp;
      const foundPFP = getRevealedText(thisContext.id, `\uDB40\uDC50\uDB40\uDC7B`);
      if (!foundPFP)
        return originalFunction.apply(thisContext, args);
      const matches = foundPFP.match(regexReveals_default.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
      if (!matches)
        return originalFunction.apply(thisContext, args);
      return `https://i.imgur.com/${matches}.gif`;
    });
  }
};
// src/patches/modules/canUserUse.ts
var bypassMap = {
  emojisEverywhere: "emojiBypass",
  animatedEmojis: "emojiBypass",
  appIcons: "unlockAppIcons",
  clientThemes: "clientThemes",
  soundboardEverywhere: "soundmojiEnabled"
};
var canUserUse = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource(".getFeatureValue(", "isPremium"), {
  canUserUse: (x2) => typeof x2 === "function" && x2.toString?.().includes?.(".getFeatureValue(")
}, { mapDeclarations: true });
var canUserUse_default = {
  name: "canUserUse",
  description: "Unlocks nitro-locked features based on settings.",
  apply(finale, patcher) {
    patcher.instead(canUserUse, "canUserUse", (_, [feature, user], originalFunction) => {
      const settingKey = bypassMap[feature.name];
      if (settingKey && SettingsStore_default.get(settingKey))
        return true;
      return originalFunction(feature, user);
    });
  }
};
// src/patches/modules/customClientThemes.tsx
var { React: React15, Components: Components11 } = BetterDiscord;
var CustomClientThemePanelState = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("CLIENT_THEMES_EDITOR", "activePanel", "SHARE_MESSAGE"), {
  state: (x2) => x2?.setState
});
var customClientThemes_default = {
  name: "customClientThemes",
  description: "Adds an apply button to the custom client theme panel.",
  waitFor: [BetterDiscord.Webpack.Filters.byKeys("openUserSettings")],
  apply(finale, patcher) {
    wpWait(BetterDiscord.Webpack.Filters.bySource("onSaveTheme", "CUSTOM_THEMES_EDITOR", "CUSTOM_THEME_COACHMARK")).then((mod) => {
      patcher.after(mod, "default", (_, [args], ret) => {
        const clientThemesEnabled = SettingsStore_default.get("clientThemes");
        if (!clientThemesEnabled)
          return;
        const ShareThemeButton = wpGet(BetterDiscord.Webpack.Filters.bySource(`custom_themes_editor_footer`), {
          declaration: BetterDiscord.Webpack.Filters.byStrings("CustomThemesShareModalWrapper"),
          raw: true
        });
        const onSaveTheme = BetterDiscord.Utils.findInTree(ret, (x2) => x2?.onSaveTheme).onSaveTheme;
        ret.props.children[1] = /* @__PURE__ */ React15.createElement("div", {
          style: {
            display: "flex",
            gap: "10px",
            padding: "16px 15px",
            borderTop: "1px solid var(--border-subtle)"
          }
        }, /* @__PURE__ */ React15.createElement(ShareThemeButton, null), /* @__PURE__ */ React15.createElement(Components11.Button, {
          onClick: (e) => {
            CustomClientThemePanelState.state.setState(CustomClientThemePanelState.state.getInitialState());
            finale.modules[0].openUserSettings("appearance_panel");
          },
          style: {
            backgroundColor: "var(--control-secondary-background-default)"
          }
        }, /* @__PURE__ */ React15.createElement(Components11.Text, {
          style: {
            fontSize: "16px",
            fontWeight: "500"
          }
        }, "Back")), /* @__PURE__ */ React15.createElement(Components11.Button, {
          onClick: (e) => onSaveTheme(e)
        }, /* @__PURE__ */ React15.createElement(Components11.Text, {
          style: {
            fontSize: "16px",
            fontWeight: "500"
          }
        }, "Apply")));
      });
    });
  }
};
// src/patches/modules/premiumType.ts
var { OverridePremiumTypeStore } = BetterDiscord.Webpack.Stores;
var premiumType_default = {
  name: "premiumType",
  description: "Makes sure the premium type is always what you want",
  apply(finale, patcher) {
    patcher.instead(OverridePremiumTypeStore, "getPremiumTypeActual", (_, __, callback) => {
      const info = SettingsStore_default.get("changePremiumType2");
      if (info == -1)
        return callback();
      return info;
    });
  }
};
// src/global/shared/cameraBackground.ts
var MediaFilterModule = BetterDiscord.Webpack.getModule((m) => typeof m.wq === "function" && typeof m.Oo === "function")?.wq ? BetterDiscord.Webpack.getModule((m) => typeof m.wq === "function" && typeof m.Oo === "function") : null;
var BackgroundEnums = BetterDiscord.Webpack.getModule((m) => m.Tr?.CAMERA_BACKGROUND_LIVE && m.gO?.BACKGROUND_REPLACEMENT && m.Qo?.INPUT_DEVICE);
var PresetModule = BetterDiscord.Webpack.getBySource("52f91129995158682c465310f61e64cd61fbf227f0dc6b43313c5e8226818661");
var Enums = {
  filterType: {
    LIVE: BackgroundEnums.Tr.CAMERA_BACKGROUND_LIVE,
    PREVIEW: BackgroundEnums.Tr.CAMERA_BACKGROUND_PREVIEW
  },
  graph: {
    NONE: BackgroundEnums.gO.NONE,
    BLUR: BackgroundEnums.gO.BACKGROUND_BLUR,
    REPLACEMENT: BackgroundEnums.gO.BACKGROUND_REPLACEMENT
  },
  targetType: {
    INPUT_DEVICE: BackgroundEnums.Qo.INPUT_DEVICE,
    STREAM: BackgroundEnums.Qo.STREAM
  }
};

// src/patches/modules/customCameraBackground.ts
var CUSTOM_ID = 69;
var TARGET_WIDTH = 1280;
var TARGET_HEIGHT = 720;
async function fetchAsBytes(link) {
  const res = await BetterDiscord.Net.fetch(link);
  const buf = await res.arrayBuffer();
  return new Uint8ClampedArray(buf);
}
async function fetchAsImageData(link) {
  const bytes = await fetchAsBytes(link);
  const blobUrl = URL.createObjectURL(new Blob([bytes]));
  const img = new Image;
  await new Promise((res, rej) => {
    img.onload = () => res();
    img.onerror = rej;
    img.src = blobUrl;
  });
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_WIDTH;
  canvas.height = TARGET_HEIGHT;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
  const { data } = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
  URL.revokeObjectURL(blobUrl);
  return { data, width: TARGET_WIDTH, height: TARGET_HEIGHT, pixelFormat: "rgba" };
}
var customCameraBackground_default = {
  name: "cameraPreviewBypass",
  apply(finale, patcher) {
    patcher.after(PresetModule, "A", (thisObj, args, result) => {
      const enabled = SettingsStore_default.get("customVideoFilterEnabled");
      if (!enabled)
        return;
      const filter = SettingsStore_default.get("customVideoFilter");
      if (filter?.link) {
        result[CUSTOM_ID] = {
          id: CUSTOM_ID,
          name: "My Custom Background",
          source: filter.link,
          isVideo: filter.type === "mp4"
        };
      }
      return result;
    });
    const mod = BetterDiscord.Webpack.getBySource(".gO.BACKGROUND_BLUR);if", { raw: true });
    const { declarations } = mod;
    const [, pKey] = BetterDiscord.Webpack.getWithKey(BetterDiscord.Webpack.Filters.byStrings("BACKGROUND_REPLACEMENT"), { target: declarations });
    patcher.instead(declarations, pKey, (thisObj, args, original) => {
      const enabled = SettingsStore_default.get("customVideoFilterEnabled");
      if (!enabled)
        return original.apply(thisObj, args);
      const [type, target, option] = args;
      if (option !== CUSTOM_ID)
        return original.apply(thisObj, args);
      const filter = SettingsStore_default.get("customVideoFilter");
      if (!filter?.link)
        return original.apply(thisObj, args);
      const isVideo = filter.type === "mp4";
      const apply = async () => {
        const payload = isVideo ? { blob: await fetchAsBytes(filter.link) } : { image: await fetchAsImageData(filter.link) };
        MediaFilterModule.wq({
          [type]: {
            graph: Enums.graph.REPLACEMENT,
            target,
            ...payload
          }
        });
      };
      return apply();
    });
  }
};
// src/patches/modules/blockedUserContext.tsx
var { SelectedChannelStore, ChannelStore: ChannelStore2 } = BetterDiscord.Webpack.Stores;
var USER_SETTINGS_FILTER = BetterDiscord.Webpack.Filters.bySource("unblockUser", "USER_SETTINGS");
var blockedUserContext_default = {
  name: "Blocked/Ignored User Context Menu",
  description: "Allows opening a user context menu in the blocked/ignored user list.",
  ids: undefined,
  waitFor: [
    USER_SETTINGS_FILTER,
    BetterDiscord.Webpack.Filters.bySource("isGroupDM", "targetIsUser")
  ],
  apply(finale, patcher) {
    const SettingsModule = BetterDiscord.Webpack.getModule(USER_SETTINGS_FILTER, { raw: true });
    const mod = getKey(SettingsModule.declarations, BdApi.Webpack.Filters.byStrings("unblockUser", "USER_SETTINGS"));
    const mod2 = getKey(finale.modules[1], (x2) => x2?.toString?.().includes?.("targetIsUser", "showMute"));
    const openUserContextMenu = mod2?.module[mod2?.key];
    patcher.after(mod?.module, mod?.key, (_, [args], ret) => {
      const pfp = BetterDiscord.Utils.findInTree(ret, (x2) => x2?.size, {
        walkable: ["props", "children"]
      });
      const channel = SelectedChannelStore.getLastSelectedChannelId() ? ChannelStore2.getChannel(SelectedChannelStore.getLastSelectedChannelId()) : ChannelStore2.getSortedPrivateChannels()?.[0];
      if (!pfp || !pfp?.user || !channel)
        return;
      pfp.onContextMenu = (e) => {
        openUserContextMenu(e, pfp.user, channel);
      };
    });
  }
};
// src/patches/modules/dev.tsx
var React16 = BetterDiscord.React;
var { UserStore: UserStore10 } = BetterDiscord.Webpack.Stores;
var dev_default = {
  name: "dev",
  apply(finale, patcher) {
    const module2 = BetterDiscord.Webpack.getBySource(".SENT_BY_SOCIAL_LAYER_INTEGRATION)?");
    patcher.after(module2.Ay, "type", (_, args, res) => {
      if (!BadgesStore_default.isImportant(UserStore10.getCurrentUser().id))
        return res;
      const user = args[0]?.message?.author;
      if (!user)
        return res;
      if (!res.props.badges.find((x2) => x2.key.includes("yabd")) && (BadgesStore_default.check(user.id) || BadgesStore_default.isImportant(user.id))) {
        const badges = BadgesStore_default.findBadgesForUser(user.id);
        res.props.badges.push(...badges.map((x2) => /* @__PURE__ */ React16.createElement("img", {
          key: `yabd-${x2.id}`,
          height: "16px",
          width: "16px",
          src: x2.iconSrc
        })));
      }
      return res;
    });
    const title = getKey(BetterDiscord.Webpack.getBySource(".NOT_STAFF_WARNING})", { raw: true }).declarations, (x2) => String(x2).includes(".NOT_STAFF_WARNING})"));
    patcher.instead(title.module, title.key, () => null);
  }
};
// src/patches/contextMenus/index.ts
var exports_contextMenus = {};
__export(exports_contextMenus, {
  StreamContextMenu: () => streamContext_default,
  MessageContextMenu: () => message_default,
  ExpressionPickerContextMenu: () => expressionPicker_default
});

// src/patches/contextMenus/message.tsx
var { React: React17 } = BetterDiscord;
var DiscordNativeModule = BetterDiscord.Webpack.getByKeys("purgeMemory");
var message_default = {
  id: "message",
  callback(res, props) {
    const enabled = SettingsStore_default.get("extraContextMenus");
    if (!enabled)
      return;
    const attachmentsLmao = [
      ...props.message.attachments,
      ...props?.message?.messageSnapshots?.[0]?.message?.attachments ?? []
    ];
    async function startDownload() {
      BetterDiscord.UI.showToast("Downloading attachments...");
      const attachments = attachmentsLmao.filter(Boolean);
      if (!attachments.length) {
        BetterDiscord.UI.showToast("No attachments found?");
        return;
      }
      let files = await Promise.all(attachments.map(async (attachment) => ({
        blob: await (await BetterDiscord.Net.fetch(attachment.url)).arrayBuffer(),
        fileName: attachment.filename.replace(".zip.mp4", ".zip").replace(".7z.mp4", ".7z")
      })));
      const zipped = {};
      for (const file of files) {
        zipped[file.fileName] = new Uint8Array(file.blob);
      }
      const zippedInt = zipSync(zipped, { level: 6 });
      const blob = new Blob([zippedInt], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = `${props.message.id}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        DiscordNativeModule.purgeMemory();
      }, 1000);
    }
    const Menu = /* @__PURE__ */ React17.createElement(BetterDiscord.ContextMenu.Item, {
      onClose: CloseAllContextMenus,
      action: startDownload,
      leadingAccessory: {
        type: "icon",
        icon: () => /* @__PURE__ */ React17.createElement(Icon, {
          width: "22",
          icon: "mdi:download"
        })
      },
      label: /* @__PURE__ */ React17.createElement(ContextMenuWrapper, null, /* @__PURE__ */ React17.createElement(ContextMenuLabel, null), /* @__PURE__ */ React17.createElement("span", null, "Download Attachment(s)")),
      id: "yabdp4nitro-download-attachments"
    });
    const Sep = /* @__PURE__ */ React17.createElement(BetterDiscord.ContextMenu.Separator, null);
    attachmentsLmao.length > 0 && res.props.children.props.children.push(Sep, Menu);
  }
};
// src/patches/contextMenus/expressionPicker.tsx
var { EmojiStore: EmojiStore3 } = BetterDiscord.Webpack.Stores;
var expressionPicker_default = {
  id: "expression-picker",
  callback(res, props) {
    const enabled = SettingsStore_default.get("extraContextMenus");
    if (!enabled)
      return;
    let src = props?.target?.src ?? props?.target?.firstChild?.src;
    if (!src)
      return;
    let emojiId = src.match(EMOJI_ID_FROM_URL_REGEX)?.find?.(Boolean);
    if (emojiId) {
      let emoji = EmojiStore3.getCustomEmojiById(emojiId);
      emoji && (src = getEmojiUrl(emoji, 4096));
    } else {
      let url = new URL(src);
      url.searchParams.set("size", 4096);
      src = url.toString();
    }
    function openUrl() {
      window.open(src);
    }
    const MenuItem = /* @__PURE__ */ React.createElement(BetterDiscord.ContextMenu.Item, {
      onClose: CloseAllContextMenus,
      leadingAccessory: {
        type: "icon",
        icon: () => /* @__PURE__ */ React.createElement(Icon, {
          width: "22",
          icon: "mdi:external-link"
        })
      },
      label: /* @__PURE__ */ React.createElement(ContextMenuWrapper, null, /* @__PURE__ */ React.createElement(ContextMenuLabel, null), /* @__PURE__ */ React.createElement("span", null, "Open ", emojiId ? "Emoji" : "Sticker", " URL")),
      id: "yabd-open-url-expression-picker",
      action: openUrl
    });
    res.props.children.props.children.push(MenuItem);
  }
};
// src/patches/contextMenus/streamContext.tsx
var { UserStore: UserStore11 } = BetterDiscord.Webpack.Stores;
var Slider = BetterDiscord.Webpack.getByStrings("initialValue", "label", "sortedMarkers", {
  searchExports: true
});
var streamContext_default = {
  id: "stream-context",
  callback(res, props) {
    const sharpenStreamsEnabled = SettingsStore_default.get("sharpenStreams");
    const currentUserId = UserStore11.getCurrentUser().id;
    const streamingUserId = props?.stream?.ownerId;
    const userSharpnessPreferences = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => SettingsStore_default.get("userSharpenPreferences"));
    const streamSharpnessPreference = userSharpnessPreferences?.[streamingUserId] ?? 0;
    if (!sharpenStreamsEnabled || !props?.stream?.ownerId || props?.stream?.ownerId == currentUserId)
      return;
    function handleChange(percentSharpness) {
      SettingsStore_default.set("userSharpenPreferences", {
        ...SettingsStore_default.get("userSharpenPreferences"),
        [streamingUserId]: percentSharpness
      });
    }
    const ContextMenuSlider = /* @__PURE__ */ React.createElement(BetterDiscord.ContextMenu.Item, {
      onClose: CloseAllContextMenus,
      id: "yabd-sharpness-slider",
      label: /* @__PURE__ */ React.createElement(Slider, {
        initialValue: streamSharpnessPreference,
        label: /* @__PURE__ */ React.createElement(ContextMenuWrapper, null, /* @__PURE__ */ React.createElement(ContextMenuLabel, null), /* @__PURE__ */ React.createElement(BetterDiscord.Components.Text, {
          style: {
            fontSize: "14px",
            fontWeight: "var(--font-weight-medium)"
          }
        }, "Sharpness", `                                     `)),
        mini: true,
        handleSize: 16,
        keyboardStep: 1,
        onValueChange: handleChange,
        asValueChanges: handleChange
      })
    });
    res.props.children.props.children.splice(2, 0, ContextMenuSlider);
  }
};
// src/patches/index.ts
var PatcherAPI = new BdApi("Patcher");
var moduleCache = new Map;
var idCache = new Map;
async function resolveIds(ids) {
  if (!ids)
    return [];
  const entries = typeof ids === "function" ? await ids() : ids;
  const results = await Promise.allSettled(entries.map(async (entry) => {
    const id = typeof entry === "function" ? await entry() : entry;
    const cacheKey = id.toString();
    if (idCache.has(cacheKey)) {
      return idCache.get(cacheKey);
    }
    const resolvedId = await BdApi.Utils.forceLoad(id);
    idCache.set(cacheKey, resolvedId);
    return resolvedId;
  }));
  const resolved = [];
  results.forEach((r, i2) => {
    if (r.status === "fulfilled") {
      resolved.push(r.value);
    } else {
      BetterDiscord.Logger.warn(`[Patcher] Failed to resolve id at index ${i2}`, r.reason);
    }
  });
  return resolved;
}
function withTimeout(p, ms, label) {
  return Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout waiting for ${label}`)), ms))
  ]);
}
async function getCachedModule(filter, patchName) {
  const cacheKey = typeof filter === "function" ? filter : JSON.stringify(filter);
  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey);
  }
  const module2 = await withTimeout(BetterDiscord.Webpack.waitForModule(filter), 1e4, patchName);
  moduleCache.set(cacheKey, module2);
  return module2;
}
async function loadPatch(patch) {
  const finale = {};
  const operations = [
    resolveIds(patch.ids).then((ids) => {
      if (ids.length)
        finale.ids = ids;
    }).catch((e) => BetterDiscord.Logger.warn(`[Patcher] Failed to load IDs for ${patch.name}`, e)),
    ...Array.isArray(patch.waitFor) ? patch.waitFor.map(async (x2, i2) => {
      try {
        const module2 = await getCachedModule(x2, patch.name);
        if (!finale.modules)
          finale.modules = [];
        finale.modules[i2] = module2;
      } catch (e) {
        BetterDiscord.Logger.warn(`[Patcher] Failed to load module ${i2} for ${patch.name}`, e);
      }
    }) : [],
    ...patch.mangled && patch.waitFor ? [
      getCachedModule(patch.waitFor[0], patch.name).then(() => {
        finale.mangled = BetterDiscord.Webpack.getMangled(patch.waitFor[0], patch.mangled);
      }).catch((e) => BetterDiscord.Logger.warn(`[Patcher] Failed to load mangled for ${patch.name}`, e))
    ] : []
  ];
  await Promise.allSettled(operations);
  return finale;
}
function loadPatches() {
  const patches = Object.values(exports_modules);
  const loaded = [];
  let isCleanedUp = false;
  const cleanup = () => {
    if (isCleanedUp)
      return;
    isCleanedUp = true;
    for (const patch of loaded)
      patch.revert?.();
    PatcherAPI.Patcher.unpatchAll();
    moduleCache.clear();
    idCache.clear();
  };
  const sortedPatches = patches.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  sortedPatches.forEach(async (patch) => {
    if (isCleanedUp)
      return;
    try {
      const finale = await loadPatch(patch);
      if (isCleanedUp)
        return;
      patch.apply(finale, PatcherAPI.Patcher);
      loaded.push(patch);
    } catch (e) {
      BetterDiscord.Logger.error(`[Patcher] "${patch.name}" failed`, e);
    }
  });
  return cleanup;
}
function loadContextMenus() {
  const loaded = [];
  let isCleanedUp = false;
  const cleanup = () => {
    if (isCleanedUp)
      return;
    isCleanedUp = true;
    for (const patch of loaded)
      patch?.();
    loaded.length = 0;
  };
  for (const module2 of Object.values(exports_contextMenus)) {
    if (isCleanedUp)
      break;
    const patch = BetterDiscord.ContextMenu.patch(module2.id, (res, props) => module2.callback(res, props));
    loaded.push(patch);
  }
  return cleanup;
}

// src/global/changelog/changelog.json
var changelog_default = {
  "7.0.0": [
    {
      banner: "https://i.kym-cdn.com/photos/images/original/001/652/630/6e8.jpg",
      changes: [
        {
          title: "YABDP4Nitro Huge Revamp",
          type: "improved",
          items: [
            "Fully rewritten internals from the ground up.",
            "Improved performance and stability.",
            "Cleaner, more maintainable codebase for future updates.",
            "Improved UI.",
            "Moved 3y3 profile editing to a YABDP4Nitro tab in the profile editor.",
            "Removed some redundant/unnecessary settings.",
            "Removed data json - you can now delete it.",
            "Limited edition, quest-only, and off-sale collectibles are now consistently included in the 3y3 UI.",
            "Download All Attachments button now zips the files before downloading.",
            "Experiment override options (Clips, Soundmoji experiments) no longer put you into staff mode.",
            "You no longer need to refresh to remove staff/experiments.",
            "Changing min, target, max, or audio bitrate in the Quick Swapper now applies to the active stream / audio connection instantly upon pressing Apply.",
            "Contributor badge is now red instead of being identical to the developer badge.",
            "Fixed a bug with the Audio Clips bypass where the audio could sometimes end too early or too late by up to 10 seconds.",
            "All kinds of Imgur URLs should now work."
          ]
        },
        {
          title: "Known Bugs/Issues",
          type: "progress",
          items: [
            "Disabling and re-enabling the plugin may cause features to patch in slower than usual — this is intentional, for stability.",
            "Disabling and re-enabling the plugin too quickly can break the UI. Refresh to fix it.",
            '**"Opening the `Nameplates` and `Avatar Decorations` lags!"**, We know. That\'s because **Discord:tm:** loves money. Theres a lot of decorations...'
          ]
        },
        {
          title: "Extra",
          type: "added",
          items: [
            "Added 3y3 Profile Frames.",
            "You can now set a custom camera background 🥳🎉🎉🎉!!",
            "<@917630027477159986> joins the team for future development of the plugin!"
          ]
        }
      ]
    }
  ]
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
    prod: "npx prettier . --write && bun run ./build/build.ts"
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
    "@eslint/js": "^10.0.1",
    "@iconify/react": "^6.0.2",
    "@types/react": "^19.2.18",
    eslint: "^10.9.1",
    fflate: "^0.8.3",
    prettier: "^3.9.6"
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
function startChangelog(sourceVersion) {
  const lastSeen = normalizeVersion(SettingsStore_default.get("lastChangelogVersion") ?? "0.0.0");
  const currentVersion = sourceVersion ?? normalizeVersion(Meta.version);
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
var import_varforcer = __toESM(require_varforcer(), 1);
var { Components: Components12 } = BetterDiscord;
var { React: React18 } = BetterDiscord;
var { UserStore: UserStore12, ApexExperimentStore, OverridePremiumTypeStore: OverridePremiumTypeStore2 } = BetterDiscord.Webpack.Stores;
var SettingsSchema = [
  {
    key: "screenSharing",
    label: "High Quality Screensharing",
    note: "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options.",
    category: "Screen Share Features",
    type: "boolean"
  },
  {
    key: "ResolutionSwapper",
    label: "Custom Stream Settings & Settings Quick Swapper",
    note: "Lets you customize your resolution and FPS, and change it quickly in the stream settings modal!",
    category: "Screen Share Features",
    type: "boolean"
  },
  {
    key: "CustomResolution",
    label: "Resolution",
    note: "The custom resolution you want (in pixels)",
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "CustomFPS",
    label: "FPS",
    note: "The custom FPS you want to stream at.",
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "CustomBitrateEnabled",
    label: "Custom Bitrate",
    note: "Choose the bitrate for your streams!",
    category: "Screen Share Features",
    type: "boolean"
  },
  {
    key: "minBitrate",
    label: "Minimum Bitrate",
    note: "The minimum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.",
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "targetBitrate",
    label: "Target Bitrate",
    note: "The target bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used.",
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "maxBitrate",
    label: "Maximum Bitrate",
    note: `The maximum bitrate (in kbps). If this is set to zero or a negative number, the default for your quality choices is used. 
                    The default max bitrate for free quality options is 3500kbps, and for Nitro quality options (higher than 720p or higher than 30fps) it is 9000kbps as of April 2025.`,
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "voiceBitrate",
    label: "Voice Audio Bitrate",
    note: `
                    Allows you to change the voice bitrate to whatever you want. 
                    Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. 
                    Bitrate in kbps. Disabled if this is set to -1.`,
    category: "Screen Share Features",
    type: "number"
  },
  {
    key: "sharpenStreams",
    label: "Stream Sharpness",
    note: "Adds a slider to the right-click / context menu of streams that allows you to adjust the sharpness of screen shares. Saves and applies your sharpness amount per user, similar to stream volume. MAKE SURE HARDWARE ACCELERATION IS ENABLED UNDER DISCORD'S ADVANCED SETTINGS OR PERFORMANCE WILL SUFFER!!",
    category: "Screen Share Features",
    type: "boolean"
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
      { label: "Default (recommended, automatic)", value: -1 },
      { label: "AV1", value: 0 },
      { label: "H265", value: 1 },
      { label: "H264", value: 2 },
      { label: "VP8", value: 3 }
    ]
  },
  {
    key: "emojiBypass",
    label: "Nitro Emotes Bypass",
    note: "Enable or disable using the emoji bypass.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "emojiSize",
    label: "Size",
    note: "The size of the emoji in pixels.",
    category: "Emojis",
    type: "select",
    options: [
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
    key: "emojiBypassType",
    label: "Emoji Bypass Method",
    note: "The method of bypass to use.",
    category: "Emojis",
    type: "select",
    options: [
      { label: "Upload Emojis", value: 0 },
      { label: "Hyperlink/Vencord-Like Mode", value: 3 },
      { label: "Classic Mode", value: 2 }
    ]
  },
  {
    key: "editMessageWithEmoji",
    label: "Replace Fakemoji When Editing Message",
    note: "Replaces text-based fakemoji with their emoji when editing a message.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "emojiBypassForValidEmoji",
    label: "Don't Use Emote Bypass if Emote is Unlocked",
    note: "Disable to use emoji bypass even if bypass is not required for that emoji.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "PNGemote",
    label: "Use PNG instead of WEBP",
    note: "Use the PNG version of static emoji for higher quality!",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "stickerBypass",
    label: "Sticker Bypass",
    note: "Enable or disable using the sticker bypass. I recommend using my fork of DiscordFreeStickers over this. Animated APNG/Lottie Stickers WILL NOT animate.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "forceStickersUnlocked",
    label: "Force Stickers Unlocked",
    note: "Enable to cause Stickers to be unlocked.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "fakeInlineVencordEmotes",
    label: "Fake Inline Hyperlink Emotes",
    note: "Makes hyperlinked emojis appear as if they were real emojis, inlined in the message, similar to Vencord FakeNitro emotes.",
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "soundmojiEnabled",
    label: "Soundmoji Bypass",
    note: 'Unlocks soundmojis and allows you to "send" them by automatically replacing them with an OGG upload and some text representing the soundmoji.',
    category: "Emojis",
    type: "boolean"
  },
  {
    key: "profileV2",
    label: "Profile Accents",
    note: "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "fakeProfileThemes",
    label: "Fake Profile Themes",
    note: "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "fakeProfileBanners",
    label: "Fake Profile Banners",
    note: "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "userBgIntegration",
    label: "UsrBG Integration",
    note: "Downloads and parses the UsrBG JSON database so that UsrBG banners will appear for you.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "voiceTileBannerBackground",
    label: "Call Tile Background",
    note: "Uses fake banners as the background for call tiles.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "fakeAvatarDecorations",
    label: "Fake Avatar Decorations",
    note: "Uses invisible 3y3 encoding to allow setting avatar decorations by hiding information in your bio and/or your custom status.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "profileEffects",
    label: "Fake Profile Effects",
    note: "Uses invisible 3y3 encoding to allow setting profile effects by hiding information in your bio.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "killProfileEffects",
    label: "Kill Profile Effects",
    note: "Hate profile effects? Enable this and they'll be gone. All of them. Overrides all profile effects.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "customPFPs",
    label: "Fake Profile Pictures",
    note: "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL IN YOUR CUSTOM STATUS. Only supports Imgur URLs for security reasons.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "userPfpIntegration",
    label: "UserPFP Integration",
    note: "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture. There's little reason to disable this.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "disableUserBadge",
    label: "Disable User Badge",
    note: "Disables the YABDP4Nitro User Badge which appears on any user that uses Profile Customization. (client side)",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "nameplatesEnabled",
    label: "Fake Nameplates",
    note: "Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio. Please paste the 3y3 in one or both of those areas.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "displayNameStyles",
    label: "Fake Display Name Styles",
    note: "Uses invisible 3y3 encoding to allow setting fake display name styles by hiding the information in your bio. Please paste the 3y3 information in your bio.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "profileFrames",
    label: "Fake Profile Frames",
    note: "Uses invisible 3y3 encoding to allow setting fake profile frames by hiding the information in your bio. Please paste the 3y3 information in your bio.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "advancedProfileCustomization",
    label: "Advanced Profile Editing",
    note: "Allows you to use custom SKU IDs when editing Profile Effects, and Decorations, and the ID/Palette combo with Nameplates. Allows you to use effects/decorations/nameplates that are not possible otherwise.",
    category: "Profile",
    type: "boolean"
  },
  {
    key: "useClipBypass",
    label: "Use Clips Bypass",
    note: "Enabling this will effectively set your file upload limit for video files to 100MB. Disable this if you have a file upload limit larger than 100MB.",
    category: "Clips",
    type: "boolean"
  },
  {
    key: "clipTimestamp",
    label: "Timestamp",
    note: "This option lets you choose how the plugin determines the timestamp to put on the generated clip.",
    category: "Clips",
    type: "select",
    options: [
      { label: "Zero (January 1st, 2015)", value: 0 },
      { label: "Current Date/Time", value: 1 },
      { label: "Last Modified Date/Time of File", value: 2 }
    ]
  },
  {
    key: "forceClip",
    label: "Force Clip",
    note: "Always send video files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.",
    category: "Clips",
    type: "boolean"
  },
  {
    key: "useAudioClipBypass",
    label: "Audio Clips Bypass",
    note: "Identical to the Clips Bypass for videos, except it works with audio files.",
    category: "Clips",
    type: "boolean"
  },
  {
    key: "forceAudioClip",
    label: "Force Audio Clip",
    note: "Always send audio files as a clip, even if the size is below 10MB. I recommend that you leave this option disabled.",
    category: "Clips",
    type: "boolean"
  },
  {
    key: "zipClip",
    label: "ZipClip",
    note: `Upload any file with the 100MB file upload limit by making your files into polyglot video+zip files that can be opened as a zip file. In 7-Zip, you will have to either: Rename the file to remove the .mp4 extension and then right-click and go 7-Zip > Open Archive > and then manually choose the file format (usually zip or 7z), or: Open the containing folder, right click the file and hit "Open Inside", then choose the zip. In WinRAR you don't need to do this, just rename if necessary, open, and it works. Windows' File Explorer's zip integration won't be able to open these, sorry. If you upload a file that is already an archive, the plugin will just append the file so the contents of your uploaded archive will appear rather than having your archive in a new zip.`,
    category: "Clips",
    type: "boolean"
  },
  {
    key: "enableClipsExperiment",
    label: "Enable Clips Experiments",
    note: "Whether or not Clips-related experiments should be enabled.",
    category: "Clips",
    type: "boolean"
  },
  {
    key: "changePremiumType2",
    label: "Change Premium Type",
    note: "This option will set your user to different Premium Types on the client-side, unlocking (or locking) certain things. Options unlocked by this may or may not work. If you don't know what you're doing, IT'S BEST TO LEAVE THIS OPTION DISABLED.",
    category: "Miscellaneous",
    type: "select",
    options: [
      { label: "Disabled (Actual Nitro Status)", value: -1 },
      { label: "Free User", value: null },
      { label: "Nitro Basic", value: 3 },
      { label: "Nitro Classic", value: 1 },
      { label: "Nitro", value: 2 }
    ]
  },
  {
    key: "clientThemes",
    label: "Gradient Client Themes",
    note: "Allows you to use Nitro-exclusive Client Themes.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "removeProfileUpsell",
    label: "Remove Profile Customization Upsell",
    note: 'Removes the "Get Nitro" upsell in the profile editing modal.',
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "removeScreenshareUpsell",
    label: "Remove Screen Share Nitro Upsell",
    note: "Removes the Nitro upsell in the Go Live modal screen.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "unlockAppIcons",
    label: "App Icons",
    note: "Unlocks app icons.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "extraContextMenus",
    label: "Extra Context Menus and Options",
    note: "Adds a Copy URL and Open URL buttons to the context menu that appears when you right-click an Emoji or Sticker in the Expression Picker, a context menu that will appear with Copy Link and Open Link options when you right-click a GIF in the GIF picker, a context menu that will appear when right-clicking on user avatars in the blocked/ignored list, and a context menu on messages with attachments that lets you download all attachments.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "experiments",
    label: "Experiments",
    note: "Unlocks experiments.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "checkForUpdates",
    label: "Check for Updates",
    note: "Should the plugin check for updates on startup?",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "customVideoFilterEnabled",
    label: "Video Filter",
    note: "Allows you to use a Custom Video preset background.",
    type: "boolean",
    category: "Miscellaneous"
  },
  {
    key: "customVideoFilter",
    label: "Custom Camera Background Source",
    note: "Set a direct link to an image or video (CDN link recommended) to use as your camera background preset.",
    type: "custom",
    category: "Miscellaneous",
    Custom: ({ value, onChange }) => {
      const link = value?.link ?? "";
      const type = value?.type ?? "png";
      const update = (patch) => {
        onChange({ link, type, ...patch });
      };
      return /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement(Components12.TextInput, {
        value: link,
        placeholder: "https://cdn.discordapp.com/attachments/...",
        onChange: (v) => update({ link: v })
      }), /* @__PURE__ */ React18.createElement(Components12.DropdownInput, {
        value: type,
        options: [
          { label: "Image", value: "png" },
          { label: "Video (MP4)", value: "mp4" }
        ],
        onChange: (v) => update({ type: v })
      }));
    }
  }
];
function normalizeVersion2(v) {
  const parts = v.split(".");
  while (parts.length < 3)
    parts.push("0");
  return parts.join(".");
}
var Electron = () => eval('require("electron")');
var _path = () => (init_path(), __toCommonJS(exports_path));
var fs = () => eval('require("fs")');
var unpatchDevMode = null;
function startSet() {
  const { declarations: decls } = BetterDiscord.Webpack.getBySource("discord_dev_testing", {
    raw: true
  });
  const [, key] = BetterDiscord.Webpack.getWithKey(BetterDiscord.Webpack.Filters.byStrings("getCurrentUser"), { target: decls });
  decls.c = SettingsStore_default.get("experiments");
  if (unpatchDevMode)
    return;
  unpatchDevMode = BetterDiscord.Patcher.instead(decls, key, () => {
    decls.c = SettingsStore_default.get("experiments");
  });
}
function overrideVariant(experimentName, variantId) {
  ApexExperimentStore.createOverride(experimentName, variantId);
  ApexExperimentStore.emitChange();
}

class Plugin {
  unpatch = loadContextMenus();
  source = "";
  async start() {
    const version2 = BetterDiscord.Utils.semverCompare(normalizeVersion2(BdApi.version), "1.14.0") <= 0;
    if (!version2 && !SettingsStore_default.get("dontUpdate"))
      return BetterDiscord.UI.showNotification({
        title: "Cannot start YABD4Nitro",
        type: "error",
        content: `You need to be on BetterDiscord version 1.14.0 to have the smoothest experience. Please update. If you dont wish to update, then click "I dont care".

This will reload the plugin and you can use it normally.`,
        duration: Infinity,
        actions: [
          {
            label: "I dont care",
            onClick: () => {
              SettingsStore_default.set("dontUpdate", true);
              this.start();
            }
          }
        ]
      });
    this.checkChangelog();
    startSet();
    const soundmojiEnabled = SettingsStore_default.get("soundmojiEnabled");
    overrideVariant("2026-03-soundmoji-rendering", soundmojiEnabled ? 1 : 0);
    overrideVariant("2026-03-soundmoji-sending", soundmojiEnabled ? 2 : 0);
    const checkForUpdatesEnabled = SettingsStore_default.get("checkForUpdates");
    checkForUpdatesEnabled && await this.checkUpdate();
    GlobalModules.Dispatcher.subscribe("APP_ICON_UPDATED", ({ id }) => SettingsStore_default.set("appIcon", id));
    if (BadgesStore_default.isImportant(UserStore12.getCurrentUser().id)) {
      BetterDiscord.Logger.log("Welcome back, Developer.");
      window.YABD_DEBUG = {
        ShopCollectiblesStore: ShopCollectiblesStore_default,
        BadgesStore: BadgesStore_default,
        getRevealedText,
        secondsightifyRevealOnly,
        SettingsStore: SettingsStore_default,
        varForcer: import_varforcer.default
      };
    }
    await UserBackgroundStore_default.fetch();
    await loadPatches();
  }
  exposed = {
    YABDNitroPanel: CustomSettingsTab
  };
  async checkUpdate() {
    const res = await BetterDiscord.Net.fetch("https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/YABDP4Nitro.plugin.js");
    this.source = await res.text();
    const sourceVersion = this.source.match(/@version\s+(\d+\.\d+\.\d+)/)?.[1];
    const installedVersion = SettingsStore_default.get("installedVersion") ?? package_default.version ?? "0.0.0";
    if (!sourceVersion)
      return;
    if (BetterDiscord.Utils.semverCompare(sourceVersion, installedVersion) < 0) {
      BetterDiscord.Logger.log("New update version found!");
      this.notification = BetterDiscord.UI.showNotification({
        title: "YABDP4Nitro Update Available",
        icon: () => /* @__PURE__ */ React18.createElement(Icon, {
          icon: "mdi:update",
          width: "20"
        }),
        content: `Update ${sourceVersion} is now downloadable, Would you like to update?`,
        duration: Infinity,
        actions: [
          {
            label: "Update",
            onClick: () => {
              const bd_path = Electron().ipcRenderer.sendSync("bd-get-path", "appData");
              const path = _path().join(bd_path, "BetterDiscord", "plugins", "YABDP4Nitro.plugin.js");
              fs().writeFile(path, this.source, (err2) => {
                if (err2) {
                  BetterDiscord.UI.showToast("Failed to update, Please update manually.");
                } else {
                  BetterDiscord.UI.showToast("Update was successful!");
                  SettingsStore_default.set("installedVersion", sourceVersion);
                  startChangelog(sourceVersion);
                }
              });
            }
          },
          {
            label: "Hell Nah",
            onClick: () => {
              this.notification.close();
            }
          }
        ]
      });
    }
    return;
  }
  checkChangelog() {
    const currentVersion = package_default.version;
    const lastSeenVersion = SettingsStore_default.get("installedVersion");
    if (lastSeenVersion && lastSeenVersion !== currentVersion) {
      startChangelog(currentVersion);
    }
    if (lastSeenVersion !== currentVersion) {
      SettingsStore_default.set("installedVersion", currentVersion);
    }
  }
  stop() {
    this.unpatch();
    new BdApi("Patcher").Patcher.unpatchAll();
    FFmpegStore_default.unload();
    UserStore12.getCurrentUser().premiumType = OverridePremiumTypeStore2.getPremiumTypeActual();
  }
  renderControl(def, value) {
    const onChange = (v) => {
      SettingsStore_default.set(def.key, v);
      if (def.key == "changePremiumType2" && v != -1)
        UserStore12.getCurrentUser().premiumType = OverridePremiumTypeStore2.getPremiumTypeActual();
      if (def.key == "experiments")
        startSet();
      if (def.key == "enableClipsExperiment") {
        SettingsStore_default.set("enableClipsExperiment", v);
        overrideVariant("2026-03-clips-experiment", v ? 2 : 0);
      }
      if (def.key == "soundmojiEnabled") {
        overrideVariant("2026-03-soundmoji-rendering", v ? 1 : 0);
        overrideVariant("2026-03-soundmoji-sending", v ? 2 : 0);
      }
    };
    switch (def.type) {
      case "custom":
        return /* @__PURE__ */ React18.createElement(def.Custom, {
          value,
          options: def.options,
          onChange
        });
      case "boolean":
        return /* @__PURE__ */ React18.createElement(Components12.SwitchInput, {
          value,
          onChange
        });
      case "number":
        return /* @__PURE__ */ React18.createElement(Components12.NumberInput, {
          value,
          onChange
        });
      case "string":
        return /* @__PURE__ */ React18.createElement(Components12.TextInput, {
          value,
          onChange
        });
      case "select":
        return /* @__PURE__ */ React18.createElement(Components12.DropdownInput, {
          value,
          options: def.options,
          onChange
        });
    }
  }
  getSettingsPanel() {
    return () => {
      const values = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => {
        const all = SettingsStore_default.getAll();
        return SettingsSchema.reduce((acc, def) => {
          acc[def.key] = def.key in all ? all[def.key] : defaultSettings[def.key];
          return acc;
        }, {});
      });
      const grouped = SettingsSchema.reduce((acc, def) => {
        (acc[def.category] ??= []).push(def);
        return acc;
      }, {});
      return /* @__PURE__ */ React18.createElement(React18.Fragment, null, Object.entries(grouped).map(([category, defs]) => /* @__PURE__ */ React18.createElement(Components12.SettingGroup, {
        key: category,
        name: category,
        collapsible: true,
        shown: false
      }, defs.map((def) => /* @__PURE__ */ React18.createElement(Components12.SettingItem, {
        key: def.key,
        name: def.label,
        note: def.note
      }, this.renderControl(def, values[def.key]))))), /* @__PURE__ */ React18.createElement("div", {
        style: { padding: "5px", justifyContent: "space-between" }
      }, /* @__PURE__ */ React18.createElement("div", {
        style: { width: "24px" }
      }, /* @__PURE__ */ React18.createElement(Components12.Tooltip, {
        text: "Check recent changelog"
      }, (props) => {
        return /* @__PURE__ */ React18.createElement("div", {
          ...props
        }, /* @__PURE__ */ React18.createElement(Icon, {
          onClick: () => {
            const entry = changelog_default?.[package_default.version];
            if (!entry)
              return;
            BetterDiscord.UI.showChangelogModal({
              title: package_default.name,
              subtitle: `v${package_default.version}`,
              ...entry[0]
            });
          },
          width: 24,
          icon: "material-symbols:update"
        }));
      }))));
    };
  }
}

/*@end@*/
