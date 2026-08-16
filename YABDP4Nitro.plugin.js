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
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
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
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/process-nextick-args/index.js
var require_process_nextick_args = __commonJS((exports2, module2) => {
  if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
    module2.exports = { nextTick };
  } else {
    module2.exports = process;
  }
  function nextTick(fn, arg1, arg2, arg3) {
    if (typeof fn !== "function") {
      throw new TypeError('"callback" argument must be a function');
    }
    var len = arguments.length;
    var args, i;
    switch (len) {
      case 0:
      case 1:
        return process.nextTick(fn);
      case 2:
        return process.nextTick(function afterTickOne() {
          fn.call(null, arg1);
        });
      case 3:
        return process.nextTick(function afterTickTwo() {
          fn.call(null, arg1, arg2);
        });
      case 4:
        return process.nextTick(function afterTickThree() {
          fn.call(null, arg1, arg2, arg3);
        });
      default:
        args = new Array(len - 1);
        i = 0;
        while (i < args.length) {
          args[i++] = arguments[i];
        }
        return process.nextTick(function afterTick() {
          fn.apply(null, args);
        });
    }
  }
});

// node_modules/isarray/index.js
var require_isarray = __commonJS((exports2, module2) => {
  var toString = {}.toString;
  module2.exports = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
});

// node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS((exports2, module2) => {
  module2.exports = require("stream");
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS((exports2, module2) => {
  var buffer = require("buffer");
  var Buffer2 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module2.exports = buffer;
  } else {
    copyProps(buffer, exports2);
    exports2.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== undefined) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});

// node_modules/core-util-is/lib/util.js
var require_util = __commonJS((exports2) => {
  function isArray(arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return objectToString(arg) === "[object Array]";
  }
  exports2.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  exports2.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  exports2.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports2.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  exports2.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  exports2.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  exports2.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === undefined;
  }
  exports2.isUndefined = isUndefined;
  function isRegExp(re) {
    return objectToString(re) === "[object RegExp]";
  }
  exports2.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports2.isObject = isObject;
  function isDate(d) {
    return objectToString(d) === "[object Date]";
  }
  exports2.isDate = isDate;
  function isError(e) {
    return objectToString(e) === "[object Error]" || e instanceof Error;
  }
  exports2.isError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  exports2.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
  }
  exports2.isPrimitive = isPrimitive;
  exports2.isBuffer = require("buffer").Buffer.isBuffer;
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports2, module2) => {
  if (typeof Object.create === "function") {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor;
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports2, module2) => {
  try {
    util = require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module2.exports = util.inherits;
  } catch (e) {
    module2.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = __commonJS((exports2, module2) => {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Buffer2 = require_safe_buffer().Buffer;
  var util = require("util");
  function copyBuffer(src, target, offset) {
    src.copy(target, offset);
  }
  module2.exports = function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    BufferList.prototype.push = function push(v) {
      var entry = { data: v, next: null };
      if (this.length > 0)
        this.tail.next = entry;
      else
        this.head = entry;
      this.tail = entry;
      ++this.length;
    };
    BufferList.prototype.unshift = function unshift(v) {
      var entry = { data: v, next: this.head };
      if (this.length === 0)
        this.tail = entry;
      this.head = entry;
      ++this.length;
    };
    BufferList.prototype.shift = function shift() {
      if (this.length === 0)
        return;
      var ret = this.head.data;
      if (this.length === 1)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      --this.length;
      return ret;
    };
    BufferList.prototype.clear = function clear() {
      this.head = this.tail = null;
      this.length = 0;
    };
    BufferList.prototype.join = function join(s) {
      if (this.length === 0)
        return "";
      var p = this.head;
      var ret = "" + p.data;
      while (p = p.next) {
        ret += s + p.data;
      }
      return ret;
    };
    BufferList.prototype.concat = function concat(n) {
      if (this.length === 0)
        return Buffer2.alloc(0);
      var ret = Buffer2.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;
      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    };
    return BufferList;
  }();
  if (util && util.inspect && util.inspect.custom) {
    module2.exports.prototype[util.inspect.custom] = function() {
      var obj = util.inspect({ length: this.length });
      return this.constructor.name + " " + obj;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS((exports2, module2) => {
  var pna = require_process_nextick_args();
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          pna.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          pna.nextTick(emitErrorNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, _this, err2);
        }
      } else if (cb) {
        cb(err2);
      }
    });
    return this;
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  module2.exports = {
    destroy,
    undestroy
  };
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS((exports2, module2) => {
  module2.exports = require("util").deprecate;
});

// node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable = __commonJS((exports2, module2) => {
  var pna = require_process_nextick_args();
  module2.exports = Writable;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var asyncWrite = ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
  var Duplex;
  Writable.WritableState = WritableState;
  var util = Object.create(require_util());
  util.inherits = require_inherits();
  var internalUtil = {
    deprecate: require_node()
  };
  var Stream = require_stream();
  var Buffer2 = require_safe_buffer().Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = require_destroy();
  util.inherits(Writable, Stream);
  function nop() {}
  function WritableState(options, stream) {
    Duplex = Duplex || require__stream_duplex();
    options = options || {};
    var isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    var hwm = options.highWaterMark;
    var writableHwm = options.writableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (writableHwm || writableHwm === 0))
      this.highWaterMark = writableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003")
      });
    } catch (_) {}
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function(object) {
        if (realHasInstance.call(this, object))
          return true;
        if (this !== Writable)
          return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function(object) {
      return object instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require__stream_duplex();
    if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
      return new Writable(options);
    }
    this._writableState = new WritableState(options, this);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function writeAfterEnd(stream, cb) {
    var er = new Error("write after end");
    stream.emit("error", er);
    pna.nextTick(cb, er);
  }
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
      er = new TypeError("May not write null values to stream");
    } else if (typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    if (er) {
      stream.emit("error", er);
      pna.nextTick(cb, er);
      valid = false;
    }
    return valid;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state.ended)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    var state = this._writableState;
    state.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
        clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      pna.nextTick(cb, er);
      pna.nextTick(finishMaybe, stream, state);
      stream._writableState.errorEmitted = true;
      stream.emit("error", er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      stream.emit("error", er);
      finishMaybe(stream, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(state);
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }
      if (sync) {
        asyncWrite(afterWrite, stream, state, finished, cb);
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  }
  function afterWrite(stream, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite(stream, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error("_write() is not implemented"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== undefined)
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending)
      endWritable(this, state, cb);
  };
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream, state) {
    stream._final(function(err) {
      state.pendingcb--;
      if (err) {
        stream.emit("error", err);
      }
      state.prefinished = true;
      stream.emit("prefinish");
      finishMaybe(stream, state);
    });
  }
  function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream._final === "function") {
        state.pendingcb++;
        state.finalCalled = true;
        pna.nextTick(callFinal, stream, state);
      } else {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream.emit("finish");
      }
    }
    return need;
  }
  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished)
        pna.nextTick(cb);
      else
        stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    get: function() {
      if (this._writableState === undefined) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    this.end();
    cb(err);
  };
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = __commonJS((exports2, module2) => {
  var pna = require_process_nextick_args();
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj) {
      keys2.push(key);
    }
    return keys2;
  };
  module2.exports = Duplex;
  var util = Object.create(require_util());
  util.inherits = require_inherits();
  var Readable = require__stream_readable();
  var Writable = require__stream_writable();
  util.inherits(Duplex, Readable);
  {
    keys = objectKeys(Writable.prototype);
    for (v = 0;v < keys.length; v++) {
      method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  var keys;
  var method;
  var v;
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options && options.readable === false)
      this.readable = false;
    if (options && options.writable === false)
      this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false)
      this.allowHalfOpen = false;
    this.once("end", onend);
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function onend() {
    if (this.allowHalfOpen || this._writableState.ended)
      return;
    pna.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    get: function() {
      if (this._readableState === undefined || this._writableState === undefined) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(value) {
      if (this._readableState === undefined || this._writableState === undefined) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  Duplex.prototype._destroy = function(err, cb) {
    this.push(null);
    this.end();
    pna.nextTick(cb, err);
  };
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS((exports2) => {
  var Buffer2 = require_safe_buffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  exports2.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === undefined)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "�";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
});

// node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable = __commonJS((exports2, module2) => {
  var pna = require_process_nextick_args();
  module2.exports = Readable;
  var isArray = require_isarray();
  var Duplex;
  Readable.ReadableState = ReadableState;
  var EE = require("events").EventEmitter;
  var EElistenerCount = function(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = require_stream();
  var Buffer2 = require_safe_buffer().Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var util = Object.create(require_util());
  util.inherits = require_inherits();
  var debugUtil = require("util");
  var debug = undefined;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function() {};
  }
  var BufferList = require_BufferList();
  var destroyImpl = require_destroy();
  var StringDecoder;
  util.inherits(Readable, Stream);
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream) {
    Duplex = Duplex || require__stream_duplex();
    options = options || {};
    var isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    var hwm = options.highWaterMark;
    var readableHwm = options.readableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (readableHwm || readableHwm === 0))
      this.highWaterMark = readableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.buffer = new BufferList;
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require__stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    this._readableState = new ReadableState(options, this);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    get: function() {
      if (this._readableState === undefined) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    this.push(null);
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    var state = stream._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit("error", er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted)
            stream.emit("error", new Error("stream.unshift() after end event"));
          else
            addChunk(stream, state, chunk, true);
        } else if (state.ended) {
          stream.emit("error", new Error("stream.push() after EOF"));
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0)
              addChunk(stream, state, chunk, false);
            else
              maybeReadMore(stream, state);
          } else {
            addChunk(stream, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    }
    return needMoreData(state);
  }
  function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      stream.emit("data", chunk);
      stream.read(0);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream);
    }
    maybeReadMore(stream, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  }
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = require_string_decoder().StringDecoder;
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };
  var MAX_HWM = 8388608;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream, state) {
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream);
  }
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync)
        pna.nextTick(emitReadable_, stream);
      else
        emitReadable_(stream);
    }
  }
  function emitReadable_(stream) {
    debug("emit readable");
    stream.emit("readable");
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      pna.nextTick(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length)
        break;
      else
        len = state.length;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      pna.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug("onunpipe");
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    var increasedAwaitDrain = false;
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (ret === false && !increasedAwaitDrain) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state.awaitDrain);
          state.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        dest.emit("error", er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = { hasUnpiped: false };
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0;i < len; i++) {
        dests[i].emit("unpipe", this, { hasUnpiped: false });
      }
      return this;
    }
    var index = indexOf(state.pipes, dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    if (ev === "data") {
      if (this._readableState.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          pna.nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      pna.nextTick(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    if (!state.reading) {
      debug("resume read 0");
      stream.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    return this;
  };
  function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream.read() !== null) {}
  }
  Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === undefined))
        return;
      else if (!state.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === "function") {
        this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }
    for (var n = 0;n < kProxyEvents.length; n++) {
      stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._readableState.highWaterMark;
    }
  });
  Readable._fromList = fromList;
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.head.data;
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
  }
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      ret = list.shift();
    } else {
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length)
        ret += str;
      else
        ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next)
            list.head = p.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function copyFromBuffer(n, list) {
    var ret = Buffer2.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next)
            list.head = p.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function endReadable(stream) {
    var state = stream._readableState;
    if (state.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
      state.ended = true;
      pna.nextTick(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
    }
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length;i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
});

// node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = __commonJS((exports2, module2) => {
  module2.exports = Transform;
  var Duplex = require__stream_duplex();
  var util = Object.create(require_util());
  util.inherits = require_inherits();
  util.inherits(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb) {
      return this.emit("error", new Error("write callback called multiple times"));
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function") {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    throw new Error("_transform() is not implemented");
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err, cb) {
    var _this2 = this;
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
      _this2.emit("close");
    });
  };
  function done(stream, er, data) {
    if (er)
      return stream.emit("error", er);
    if (data != null)
      stream.push(data);
    if (stream._writableState.length)
      throw new Error("Calling transform done when ws.length != 0");
    if (stream._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return stream.push(null);
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = __commonJS((exports2, module2) => {
  module2.exports = PassThrough;
  var Transform = require__stream_transform();
  var util = Object.create(require_util());
  util.inherits = require_inherits();
  util.inherits(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
});

// node_modules/readable-stream/readable.js
var require_readable = __commonJS((exports2, module2) => {
  var Stream = require("stream");
  if (process.env.READABLE_STREAM === "disable" && Stream) {
    module2.exports = Stream;
    exports2 = module2.exports = Stream.Readable;
    exports2.Readable = Stream.Readable;
    exports2.Writable = Stream.Writable;
    exports2.Duplex = Stream.Duplex;
    exports2.Transform = Stream.Transform;
    exports2.PassThrough = Stream.PassThrough;
    exports2.Stream = Stream;
  } else {
    exports2 = module2.exports = require__stream_readable();
    exports2.Stream = Stream || exports2;
    exports2.Readable = exports2;
    exports2.Writable = require__stream_writable();
    exports2.Duplex = require__stream_duplex();
    exports2.Transform = require__stream_transform();
    exports2.PassThrough = require__stream_passthrough();
  }
});

// node_modules/jszip/lib/support.js
var require_support = __commonJS((exports2) => {
  exports2.base64 = true;
  exports2.array = true;
  exports2.string = true;
  exports2.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  exports2.nodebuffer = typeof Buffer !== "undefined";
  exports2.uint8array = typeof Uint8Array !== "undefined";
  if (typeof ArrayBuffer === "undefined") {
    exports2.blob = false;
  } else {
    buffer = new ArrayBuffer(0);
    try {
      exports2.blob = new Blob([buffer], {
        type: "application/zip"
      }).size === 0;
    } catch (e) {
      try {
        Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
        builder = new Builder;
        builder.append(buffer);
        exports2.blob = builder.getBlob("application/zip").size === 0;
      } catch (e2) {
        exports2.blob = false;
      }
    }
  }
  var buffer;
  var Builder;
  var builder;
  try {
    exports2.nodestream = !!require_readable().Readable;
  } catch (e) {
    exports2.nodestream = false;
  }
});

// node_modules/jszip/lib/base64.js
var require_base64 = __commonJS((exports2) => {
  var utils = require_utils();
  var support = require_support();
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  exports2.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;
    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
      remainingBytes = len - i;
      if (!isArray) {
        chr1 = input.charCodeAt(i++);
        chr2 = i < len ? input.charCodeAt(i++) : 0;
        chr3 = i < len ? input.charCodeAt(i++) : 0;
      } else {
        chr1 = input[i++];
        chr2 = i < len ? input[i++] : 0;
        chr3 = i < len ? input[i++] : 0;
      }
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
      enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
      output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
    }
    return output.join("");
  };
  exports2.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;
    var dataUrlPrefix = "data:";
    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
      throw new Error("Invalid base64 input, it looks like a data url.");
    }
    input = input.replace(/[^A-Za-z0-9+/=]/g, "");
    var totalLength = input.length * 3 / 4;
    if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (totalLength % 1 !== 0) {
      throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
      output = new Uint8Array(totalLength | 0);
    } else {
      output = new Array(totalLength | 0);
    }
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output[resultIndex++] = chr1;
      if (enc3 !== 64) {
        output[resultIndex++] = chr2;
      }
      if (enc4 !== 64) {
        output[resultIndex++] = chr3;
      }
    }
    return output;
  };
});

// node_modules/jszip/lib/nodejsUtils.js
var require_nodejsUtils = __commonJS((exports2, module2) => {
  module2.exports = {
    isNode: typeof Buffer !== "undefined",
    newBufferFrom: function(data, encoding) {
      if (Buffer.from && Buffer.from !== Uint8Array.from) {
        return Buffer.from(data, encoding);
      } else {
        if (typeof data === "number") {
          throw new Error('The "data" argument must not be a number');
        }
        return new Buffer(data, encoding);
      }
    },
    allocBuffer: function(size) {
      if (Buffer.alloc) {
        return Buffer.alloc(size);
      } else {
        var buf = new Buffer(size);
        buf.fill(0);
        return buf;
      }
    },
    isBuffer: function(b) {
      return Buffer.isBuffer(b);
    },
    isStream: function(obj) {
      return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
    }
  };
});

// node_modules/immediate/lib/index.js
var require_lib = __commonJS((exports2, module2) => {
  var Mutation = global.MutationObserver || global.WebKitMutationObserver;
  var scheduleDrain;
  if (false) {} else {
    scheduleDrain = function() {
      process.nextTick(nextTick);
    };
  }
  var called;
  var observer;
  var element;
  var channel;
  var draining;
  var queue = [];
  function nextTick() {
    draining = true;
    var i, oldQueue;
    var len = queue.length;
    while (len) {
      oldQueue = queue;
      queue = [];
      i = -1;
      while (++i < len) {
        oldQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  module2.exports = immediate;
  function immediate(task) {
    if (queue.push(task) === 1 && !draining) {
      scheduleDrain();
    }
  }
});

// node_modules/lie/lib/index.js
var require_lib2 = __commonJS((exports2, module2) => {
  var immediate = require_lib();
  function INTERNAL() {}
  var handlers = {};
  var REJECTED = ["REJECTED"];
  var FULFILLED = ["FULFILLED"];
  var PENDING = ["PENDING"];
  if (true) {
    UNHANDLED = ["UNHANDLED"];
  }
  var UNHANDLED;
  module2.exports = Promise2;
  function Promise2(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("resolver must be a function");
    }
    this.state = PENDING;
    this.queue = [];
    this.outcome = undefined;
    if (true) {
      this.handled = UNHANDLED;
    }
    if (resolver !== INTERNAL) {
      safelyResolveThenable(this, resolver);
    }
  }
  Promise2.prototype.finally = function(callback) {
    if (typeof callback !== "function") {
      return this;
    }
    var p = this.constructor;
    return this.then(resolve2, reject2);
    function resolve2(value) {
      function yes() {
        return value;
      }
      return p.resolve(callback()).then(yes);
    }
    function reject2(reason) {
      function no() {
        throw reason;
      }
      return p.resolve(callback()).then(no);
    }
  };
  Promise2.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
      return this;
    }
    var promise = new this.constructor(INTERNAL);
    if (true) {
      if (this.handled === UNHANDLED) {
        this.handled = null;
      }
    }
    if (this.state !== PENDING) {
      var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
      unwrap(promise, resolver, this.outcome);
    } else {
      this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
  };
  function QueueItem(promise, onFulfilled, onRejected) {
    this.promise = promise;
    if (typeof onFulfilled === "function") {
      this.onFulfilled = onFulfilled;
      this.callFulfilled = this.otherCallFulfilled;
    }
    if (typeof onRejected === "function") {
      this.onRejected = onRejected;
      this.callRejected = this.otherCallRejected;
    }
  }
  QueueItem.prototype.callFulfilled = function(value) {
    handlers.resolve(this.promise, value);
  };
  QueueItem.prototype.otherCallFulfilled = function(value) {
    unwrap(this.promise, this.onFulfilled, value);
  };
  QueueItem.prototype.callRejected = function(value) {
    handlers.reject(this.promise, value);
  };
  QueueItem.prototype.otherCallRejected = function(value) {
    unwrap(this.promise, this.onRejected, value);
  };
  function unwrap(promise, func, value) {
    immediate(function() {
      var returnValue;
      try {
        returnValue = func(value);
      } catch (e) {
        return handlers.reject(promise, e);
      }
      if (returnValue === promise) {
        handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
      } else {
        handlers.resolve(promise, returnValue);
      }
    });
  }
  handlers.resolve = function(self2, value) {
    var result = tryCatch(getThen, value);
    if (result.status === "error") {
      return handlers.reject(self2, result.value);
    }
    var thenable = result.value;
    if (thenable) {
      safelyResolveThenable(self2, thenable);
    } else {
      self2.state = FULFILLED;
      self2.outcome = value;
      var i = -1;
      var len = self2.queue.length;
      while (++i < len) {
        self2.queue[i].callFulfilled(value);
      }
    }
    return self2;
  };
  handlers.reject = function(self2, error) {
    self2.state = REJECTED;
    self2.outcome = error;
    if (true) {
      if (self2.handled === UNHANDLED) {
        immediate(function() {
          if (self2.handled === UNHANDLED) {
            process.emit("unhandledRejection", error, self2);
          }
        });
      }
    }
    var i = -1;
    var len = self2.queue.length;
    while (++i < len) {
      self2.queue[i].callRejected(error);
    }
    return self2;
  };
  function getThen(obj) {
    var then = obj && obj.then;
    if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
      return function appyThen() {
        then.apply(obj, arguments);
      };
    }
  }
  function safelyResolveThenable(self2, thenable) {
    var called = false;
    function onError(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.reject(self2, value);
    }
    function onSuccess(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.resolve(self2, value);
    }
    function tryToUnwrap() {
      thenable(onSuccess, onError);
    }
    var result = tryCatch(tryToUnwrap);
    if (result.status === "error") {
      onError(result.value);
    }
  }
  function tryCatch(func, value) {
    var out = {};
    try {
      out.value = func(value);
      out.status = "success";
    } catch (e) {
      out.status = "error";
      out.value = e;
    }
    return out;
  }
  Promise2.resolve = resolve;
  function resolve(value) {
    if (value instanceof this) {
      return value;
    }
    return handlers.resolve(new this(INTERNAL), value);
  }
  Promise2.reject = reject;
  function reject(reason) {
    var promise = new this(INTERNAL);
    return handlers.reject(promise, reason);
  }
  Promise2.all = all;
  function all(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var values = new Array(len);
    var resolved = 0;
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      allResolver(iterable[i], i);
    }
    return promise;
    function allResolver(value, i2) {
      self2.resolve(value).then(resolveFromAll, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
      function resolveFromAll(outValue) {
        values[i2] = outValue;
        if (++resolved === len && !called) {
          called = true;
          handlers.resolve(promise, values);
        }
      }
    }
  }
  Promise2.race = race;
  function race(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      resolver(iterable[i]);
    }
    return promise;
    function resolver(value) {
      self2.resolve(value).then(function(response) {
        if (!called) {
          called = true;
          handlers.resolve(promise, response);
        }
      }, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
    }
  }
});

// node_modules/jszip/lib/external.js
var require_external = __commonJS((exports2, module2) => {
  var ES6Promise = null;
  if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
  } else {
    ES6Promise = require_lib2();
  }
  module2.exports = {
    Promise: ES6Promise
  };
});

// node_modules/setimmediate/setImmediate.js
var require_setImmediate = __commonJS((exports2) => {
  (function(global2, undefined2) {
    if (global2.setImmediate) {
      return;
    }
    var nextHandle = 1;
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global2.document;
    var registerImmediate;
    function setImmediate2(callback) {
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      var args = new Array(arguments.length - 1);
      for (var i = 0;i < args.length; i++) {
        args[i] = arguments[i + 1];
      }
      var task = { callback, args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }
    function clearImmediate(handle) {
      delete tasksByHandle[handle];
    }
    function run(task) {
      var callback = task.callback;
      var args = task.args;
      switch (args.length) {
        case 0:
          callback();
          break;
        case 1:
          callback(args[0]);
          break;
        case 2:
          callback(args[0], args[1]);
          break;
        case 3:
          callback(args[0], args[1], args[2]);
          break;
        default:
          callback.apply(undefined2, args);
          break;
      }
    }
    function runIfPresent(handle) {
      if (currentlyRunningATask) {
        setTimeout(runIfPresent, 0, handle);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunningATask = true;
          try {
            run(task);
          } finally {
            clearImmediate(handle);
            currentlyRunningATask = false;
          }
        }
      }
    }
    function installNextTickImplementation() {
      registerImmediate = function(handle) {
        process.nextTick(function() {
          runIfPresent(handle);
        });
      };
    }
    function canUsePostMessage() {
      if (global2.postMessage && !global2.importScripts) {
        var postMessageIsAsynchronous = true;
        var oldOnMessage = global2.onmessage;
        global2.onmessage = function() {
          postMessageIsAsynchronous = false;
        };
        global2.postMessage("", "*");
        global2.onmessage = oldOnMessage;
        return postMessageIsAsynchronous;
      }
    }
    function installPostMessageImplementation() {
      var messagePrefix = "setImmediate$" + Math.random() + "$";
      var onGlobalMessage = function(event) {
        if (event.source === global2 && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
          runIfPresent(+event.data.slice(messagePrefix.length));
        }
      };
      if (global2.addEventListener) {
        global2.addEventListener("message", onGlobalMessage, false);
      } else {
        global2.attachEvent("onmessage", onGlobalMessage);
      }
      registerImmediate = function(handle) {
        global2.postMessage(messagePrefix + handle, "*");
      };
    }
    function installMessageChannelImplementation() {
      var channel = new MessageChannel;
      channel.port1.onmessage = function(event) {
        var handle = event.data;
        runIfPresent(handle);
      };
      registerImmediate = function(handle) {
        channel.port2.postMessage(handle);
      };
    }
    function installReadyStateChangeImplementation() {
      var html = doc.documentElement;
      registerImmediate = function(handle) {
        var script = doc.createElement("script");
        script.onreadystatechange = function() {
          runIfPresent(handle);
          script.onreadystatechange = null;
          html.removeChild(script);
          script = null;
        };
        html.appendChild(script);
      };
    }
    function installSetTimeoutImplementation() {
      registerImmediate = function(handle) {
        setTimeout(runIfPresent, 0, handle);
      };
    }
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global2);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global2;
    if ({}.toString.call(global2.process) === "[object process]") {
      installNextTickImplementation();
    } else if (canUsePostMessage()) {
      installPostMessageImplementation();
    } else if (global2.MessageChannel) {
      installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
      installReadyStateChangeImplementation();
    } else {
      installSetTimeoutImplementation();
    }
    attachTo.setImmediate = setImmediate2;
    attachTo.clearImmediate = clearImmediate;
  })(typeof self === "undefined" ? typeof global === "undefined" ? exports2 : global : self);
});

// node_modules/jszip/lib/utils.js
var require_utils = __commonJS((exports2) => {
  var support = require_support();
  var base64 = require_base64();
  var nodejsUtils = require_nodejsUtils();
  var external = require_external();
  require_setImmediate();
  function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
  }
  exports2.newBlob = function(part, type) {
    exports2.checkSupport("blob");
    try {
      return new Blob([part], {
        type
      });
    } catch (e) {
      try {
        var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
        var builder = new Builder;
        builder.append(part);
        return builder.getBlob(type);
      } catch (e2) {
        throw new Error("Bug : can't construct the Blob.");
      }
    }
  };
  function identity(input) {
    return input;
  }
  function stringToArrayLike(str, array) {
    for (var i = 0;i < str.length; ++i) {
      array[i] = str.charCodeAt(i) & 255;
    }
    return array;
  }
  var arrayToStringHelper = {
    stringifyByChunk: function(array, type, chunk) {
      var result = [], k = 0, len = array.length;
      if (len <= chunk) {
        return String.fromCharCode.apply(null, array);
      }
      while (k < len) {
        if (type === "array" || type === "nodebuffer") {
          result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
        } else {
          result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
        }
        k += chunk;
      }
      return result.join("");
    },
    stringifyByChar: function(array) {
      var resultStr = "";
      for (var i = 0;i < array.length; i++) {
        resultStr += String.fromCharCode(array[i]);
      }
      return resultStr;
    },
    applyCanBeUsed: {
      uint8array: function() {
        try {
          return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch (e) {
          return false;
        }
      }(),
      nodebuffer: function() {
        try {
          return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
        } catch (e) {
          return false;
        }
      }()
    }
  };
  function arrayLikeToString(array) {
    var chunk = 65536, type = exports2.getTypeOf(array), canUseApply = true;
    if (type === "uint8array") {
      canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
      canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }
    if (canUseApply) {
      while (chunk > 1) {
        try {
          return arrayToStringHelper.stringifyByChunk(array, type, chunk);
        } catch (e) {
          chunk = Math.floor(chunk / 2);
        }
      }
    }
    return arrayToStringHelper.stringifyByChar(array);
  }
  exports2.applyFromCharCode = arrayLikeToString;
  function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0;i < arrayFrom.length; i++) {
      arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
  }
  var transform = {};
  transform["string"] = {
    string: identity,
    array: function(input) {
      return stringToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return transform["string"]["uint8array"](input).buffer;
    },
    uint8array: function(input) {
      return stringToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: function(input) {
      return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
  };
  transform["array"] = {
    string: arrayLikeToString,
    array: identity,
    arraybuffer: function(input) {
      return new Uint8Array(input).buffer;
    },
    uint8array: function(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(input);
    }
  };
  transform["arraybuffer"] = {
    string: function(input) {
      return arrayLikeToString(new Uint8Array(input));
    },
    array: function(input) {
      return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    arraybuffer: identity,
    uint8array: function(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
  };
  transform["uint8array"] = {
    string: arrayLikeToString,
    array: function(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return input.buffer;
    },
    uint8array: identity,
    nodebuffer: function(input) {
      return nodejsUtils.newBufferFrom(input);
    }
  };
  transform["nodebuffer"] = {
    string: arrayLikeToString,
    array: function(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function(input) {
      return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    uint8array: function(input) {
      return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: identity
  };
  exports2.transformTo = function(outputType, input) {
    if (!input) {
      input = "";
    }
    if (!outputType) {
      return input;
    }
    exports2.checkSupport(outputType);
    var inputType = exports2.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
  };
  exports2.resolve = function(path) {
    var parts = path.split("/");
    var result = [];
    for (var index = 0;index < parts.length; index++) {
      var part = parts[index];
      if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
        continue;
      } else if (part === "..") {
        result.pop();
      } else {
        result.push(part);
      }
    }
    return result.join("/");
  };
  exports2.getTypeOf = function(input) {
    if (typeof input === "string") {
      return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
      return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
      return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
      return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
      return "arraybuffer";
    }
  };
  exports2.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
      throw new Error(type + " is not supported by this platform");
    }
  };
  exports2.MAX_VALUE_16BITS = 65535;
  exports2.MAX_VALUE_32BITS = -1;
  exports2.pretty = function(str) {
    var res = "", code, i;
    for (i = 0;i < (str || "").length; i++) {
      code = str.charCodeAt(i);
      res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
  };
  exports2.delay = function(callback, args, self2) {
    setImmediate(function() {
      callback.apply(self2 || null, args || []);
    });
  };
  exports2.inherits = function(ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj;
  };
  exports2.extend = function() {
    var result = {}, i, attr;
    for (i = 0;i < arguments.length; i++) {
      for (attr in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
          result[attr] = arguments[i][attr];
        }
      }
    }
    return result;
  };
  exports2.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
    var promise = external.Promise.resolve(inputData).then(function(data) {
      var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
      if (isBlob && typeof FileReader !== "undefined") {
        return new external.Promise(function(resolve, reject) {
          var reader = new FileReader;
          reader.onload = function(e) {
            resolve(e.target.result);
          };
          reader.onerror = function(e) {
            reject(e.target.error);
          };
          reader.readAsArrayBuffer(data);
        });
      } else {
        return data;
      }
    });
    return promise.then(function(data) {
      var dataType = exports2.getTypeOf(data);
      if (!dataType) {
        return external.Promise.reject(new Error("Can't read the data of '" + name + "'. Is it " + "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
      }
      if (dataType === "arraybuffer") {
        data = exports2.transformTo("uint8array", data);
      } else if (dataType === "string") {
        if (isBase64) {
          data = base64.decode(data);
        } else if (isBinary) {
          if (isOptimizedBinaryString !== true) {
            data = string2binary(data);
          }
        }
      }
      return data;
    });
  };
});

// node_modules/jszip/lib/stream/GenericWorker.js
var require_GenericWorker = __commonJS((exports2, module2) => {
  function GenericWorker(name) {
    this.name = name || "default";
    this.streamInfo = {};
    this.generatedError = null;
    this.extraStreamInfo = {};
    this.isPaused = true;
    this.isFinished = false;
    this.isLocked = false;
    this._listeners = {
      data: [],
      end: [],
      error: []
    };
    this.previous = null;
  }
  GenericWorker.prototype = {
    push: function(chunk) {
      this.emit("data", chunk);
    },
    end: function() {
      if (this.isFinished) {
        return false;
      }
      this.flush();
      try {
        this.emit("end");
        this.cleanUp();
        this.isFinished = true;
      } catch (e) {
        this.emit("error", e);
      }
      return true;
    },
    error: function(e) {
      if (this.isFinished) {
        return false;
      }
      if (this.isPaused) {
        this.generatedError = e;
      } else {
        this.isFinished = true;
        this.emit("error", e);
        if (this.previous) {
          this.previous.error(e);
        }
        this.cleanUp();
      }
      return true;
    },
    on: function(name, listener) {
      this._listeners[name].push(listener);
      return this;
    },
    cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null;
      this._listeners = [];
    },
    emit: function(name, arg) {
      if (this._listeners[name]) {
        for (var i = 0;i < this._listeners[name].length; i++) {
          this._listeners[name][i].call(this, arg);
        }
      }
    },
    pipe: function(next) {
      return next.registerPrevious(this);
    },
    registerPrevious: function(previous) {
      if (this.isLocked) {
        throw new Error("The stream '" + this + "' has already been used.");
      }
      this.streamInfo = previous.streamInfo;
      this.mergeStreamInfo();
      this.previous = previous;
      var self2 = this;
      previous.on("data", function(chunk) {
        self2.processChunk(chunk);
      });
      previous.on("end", function() {
        self2.end();
      });
      previous.on("error", function(e) {
        self2.error(e);
      });
      return this;
    },
    pause: function() {
      if (this.isPaused || this.isFinished) {
        return false;
      }
      this.isPaused = true;
      if (this.previous) {
        this.previous.pause();
      }
      return true;
    },
    resume: function() {
      if (!this.isPaused || this.isFinished) {
        return false;
      }
      this.isPaused = false;
      var withError = false;
      if (this.generatedError) {
        this.error(this.generatedError);
        withError = true;
      }
      if (this.previous) {
        this.previous.resume();
      }
      return !withError;
    },
    flush: function() {},
    processChunk: function(chunk) {
      this.push(chunk);
    },
    withStreamInfo: function(key, value) {
      this.extraStreamInfo[key] = value;
      this.mergeStreamInfo();
      return this;
    },
    mergeStreamInfo: function() {
      for (var key in this.extraStreamInfo) {
        if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {
          continue;
        }
        this.streamInfo[key] = this.extraStreamInfo[key];
      }
    },
    lock: function() {
      if (this.isLocked) {
        throw new Error("The stream '" + this + "' has already been used.");
      }
      this.isLocked = true;
      if (this.previous) {
        this.previous.lock();
      }
    },
    toString: function() {
      var me = "Worker " + this.name;
      if (this.previous) {
        return this.previous + " -> " + me;
      } else {
        return me;
      }
    }
  };
  module2.exports = GenericWorker;
});

// node_modules/jszip/lib/utf8.js
var require_utf8 = __commonJS((exports2) => {
  var utils = require_utils();
  var support = require_support();
  var nodejsUtils = require_nodejsUtils();
  var GenericWorker = require_GenericWorker();
  var _utf8len = new Array(256);
  for (i = 0;i < 256; i++) {
    _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  var i;
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = function(str) {
    var buf, c, c2, m_pos, i2, str_len = str.length, buf_len = 0;
    for (m_pos = 0;m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    if (support.uint8array) {
      buf = new Uint8Array(buf_len);
    } else {
      buf = new Array(buf_len);
    }
    for (i2 = 0, m_pos = 0;i2 < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i2++] = c;
      } else if (c < 2048) {
        buf[i2++] = 192 | c >>> 6;
        buf[i2++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i2++] = 224 | c >>> 12;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      } else {
        buf[i2++] = 240 | c >>> 18;
        buf[i2++] = 128 | c >>> 12 & 63;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      }
    }
    return buf;
  };
  var utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var buf2string = function(buf) {
    var i2, out, c, c_len;
    var len = buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i2 = 0;i2 < len; ) {
      c = buf[i2++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i2 += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i2 < len) {
        c = c << 6 | buf[i2++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    if (utf16buf.length !== out) {
      if (utf16buf.subarray) {
        utf16buf = utf16buf.subarray(0, out);
      } else {
        utf16buf.length = out;
      }
    }
    return utils.applyFromCharCode(utf16buf);
  };
  exports2.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
      return nodejsUtils.newBufferFrom(str, "utf-8");
    }
    return string2buf(str);
  };
  exports2.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
      return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }
    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
    return buf2string(buf);
  };
  function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    this.leftOver = null;
  }
  utils.inherits(Utf8DecodeWorker, GenericWorker);
  Utf8DecodeWorker.prototype.processChunk = function(chunk) {
    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
    if (this.leftOver && this.leftOver.length) {
      if (support.uint8array) {
        var previousData = data;
        data = new Uint8Array(previousData.length + this.leftOver.length);
        data.set(this.leftOver, 0);
        data.set(previousData, this.leftOver.length);
      } else {
        data = this.leftOver.concat(data);
      }
      this.leftOver = null;
    }
    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
      if (support.uint8array) {
        usableData = data.subarray(0, nextBoundary);
        this.leftOver = data.subarray(nextBoundary, data.length);
      } else {
        usableData = data.slice(0, nextBoundary);
        this.leftOver = data.slice(nextBoundary, data.length);
      }
    }
    this.push({
      data: exports2.utf8decode(usableData),
      meta: chunk.meta
    });
  };
  Utf8DecodeWorker.prototype.flush = function() {
    if (this.leftOver && this.leftOver.length) {
      this.push({
        data: exports2.utf8decode(this.leftOver),
        meta: {}
      });
      this.leftOver = null;
    }
  };
  exports2.Utf8DecodeWorker = Utf8DecodeWorker;
  function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
  }
  utils.inherits(Utf8EncodeWorker, GenericWorker);
  Utf8EncodeWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: exports2.utf8encode(chunk.data),
      meta: chunk.meta
    });
  };
  exports2.Utf8EncodeWorker = Utf8EncodeWorker;
});

// node_modules/jszip/lib/stream/ConvertWorker.js
var require_ConvertWorker = __commonJS((exports2, module2) => {
  var GenericWorker = require_GenericWorker();
  var utils = require_utils();
  function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
  }
  utils.inherits(ConvertWorker, GenericWorker);
  ConvertWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: utils.transformTo(this.destType, chunk.data),
      meta: chunk.meta
    });
  };
  module2.exports = ConvertWorker;
});

// node_modules/jszip/lib/nodejs/NodejsStreamOutputAdapter.js
var require_NodejsStreamOutputAdapter = __commonJS((exports2, module2) => {
  var Readable = require_readable().Readable;
  var utils = require_utils();
  utils.inherits(NodejsStreamOutputAdapter, Readable);
  function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;
    var self2 = this;
    helper.on("data", function(data, meta) {
      if (!self2.push(data)) {
        self2._helper.pause();
      }
      if (updateCb) {
        updateCb(meta);
      }
    }).on("error", function(e) {
      self2.emit("error", e);
    }).on("end", function() {
      self2.push(null);
    });
  }
  NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
  };
  module2.exports = NodejsStreamOutputAdapter;
});

// node_modules/jszip/lib/stream/StreamHelper.js
var require_StreamHelper = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var ConvertWorker = require_ConvertWorker();
  var GenericWorker = require_GenericWorker();
  var base64 = require_base64();
  var support = require_support();
  var external = require_external();
  var NodejsStreamOutputAdapter = null;
  if (support.nodestream) {
    try {
      NodejsStreamOutputAdapter = require_NodejsStreamOutputAdapter();
    } catch (e) {}
  }
  function transformZipOutput(type, content, mimeType) {
    switch (type) {
      case "blob":
        return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
      case "base64":
        return base64.encode(content);
      default:
        return utils.transformTo(type, content);
    }
  }
  function concat(type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for (i = 0;i < dataArray.length; i++) {
      totalLength += dataArray[i].length;
    }
    switch (type) {
      case "string":
        return dataArray.join("");
      case "array":
        return Array.prototype.concat.apply([], dataArray);
      case "uint8array":
        res = new Uint8Array(totalLength);
        for (i = 0;i < dataArray.length; i++) {
          res.set(dataArray[i], index);
          index += dataArray[i].length;
        }
        return res;
      case "nodebuffer":
        return Buffer.concat(dataArray);
      default:
        throw new Error("concat : unsupported type '" + type + "'");
    }
  }
  function accumulate(helper, updateCallback) {
    return new external.Promise(function(resolve, reject) {
      var dataArray = [];
      var { _internalType: chunkType, _outputType: resultType, _mimeType: mimeType } = helper;
      helper.on("data", function(data, meta) {
        dataArray.push(data);
        if (updateCallback) {
          updateCallback(meta);
        }
      }).on("error", function(err) {
        dataArray = [];
        reject(err);
      }).on("end", function() {
        try {
          var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
          resolve(result);
        } catch (e) {
          reject(e);
        }
        dataArray = [];
      }).resume();
    });
  }
  function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch (outputType) {
      case "blob":
      case "arraybuffer":
        internalType = "uint8array";
        break;
      case "base64":
        internalType = "string";
        break;
    }
    try {
      this._internalType = internalType;
      this._outputType = outputType;
      this._mimeType = mimeType;
      utils.checkSupport(internalType);
      this._worker = worker.pipe(new ConvertWorker(internalType));
      worker.lock();
    } catch (e) {
      this._worker = new GenericWorker("error");
      this._worker.error(e);
    }
  }
  StreamHelper.prototype = {
    accumulate: function(updateCb) {
      return accumulate(this, updateCb);
    },
    on: function(evt, fn) {
      var self2 = this;
      if (evt === "data") {
        this._worker.on(evt, function(chunk) {
          fn.call(self2, chunk.data, chunk.meta);
        });
      } else {
        this._worker.on(evt, function() {
          utils.delay(fn, arguments, self2);
        });
      }
      return this;
    },
    resume: function() {
      utils.delay(this._worker.resume, [], this._worker);
      return this;
    },
    pause: function() {
      this._worker.pause();
      return this;
    },
    toNodejsStream: function(updateCb) {
      utils.checkSupport("nodestream");
      if (this._outputType !== "nodebuffer") {
        throw new Error(this._outputType + " is not supported by this method");
      }
      return new NodejsStreamOutputAdapter(this, {
        objectMode: this._outputType !== "nodebuffer"
      }, updateCb);
    }
  };
  module2.exports = StreamHelper;
});

// node_modules/jszip/lib/defaults.js
var require_defaults = __commonJS((exports2) => {
  exports2.base64 = false;
  exports2.binary = false;
  exports2.dir = false;
  exports2.createFolders = true;
  exports2.date = null;
  exports2.compression = null;
  exports2.compressionOptions = null;
  exports2.comment = null;
  exports2.unixPermissions = null;
  exports2.dosPermissions = null;
});

// node_modules/jszip/lib/stream/DataWorker.js
var require_DataWorker = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var DEFAULT_BLOCK_SIZE = 16 * 1024;
  function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self2 = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";
    this._tickScheduled = false;
    dataP.then(function(data) {
      self2.dataIsReady = true;
      self2.data = data;
      self2.max = data && data.length || 0;
      self2.type = utils.getTypeOf(data);
      if (!self2.isPaused) {
        self2._tickAndRepeat();
      }
    }, function(e) {
      self2.error(e);
    });
  }
  utils.inherits(DataWorker, GenericWorker);
  DataWorker.prototype.cleanUp = function() {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
  };
  DataWorker.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (!this._tickScheduled && this.dataIsReady) {
      this._tickScheduled = true;
      utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
  };
  DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if (this.isPaused || this.isFinished) {
      return;
    }
    this._tick();
    if (!this.isFinished) {
      utils.delay(this._tickAndRepeat, [], this);
      this._tickScheduled = true;
    }
  };
  DataWorker.prototype._tick = function() {
    if (this.isPaused || this.isFinished) {
      return false;
    }
    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
      return this.end();
    } else {
      switch (this.type) {
        case "string":
          data = this.data.substring(this.index, nextIndex);
          break;
        case "uint8array":
          data = this.data.subarray(this.index, nextIndex);
          break;
        case "array":
        case "nodebuffer":
          data = this.data.slice(this.index, nextIndex);
          break;
      }
      this.index = nextIndex;
      return this.push({
        data,
        meta: {
          percent: this.max ? this.index / this.max * 100 : 0
        }
      });
    }
  };
  module2.exports = DataWorker;
});

// node_modules/jszip/lib/crc32.js
var require_crc32 = __commonJS((exports2, module2) => {
  var utils = require_utils();
  function makeTable() {
    var c, table = [];
    for (var n = 0;n < 256; n++) {
      c = n;
      for (var k = 0;k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc = crc ^ -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  }
  function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;
    crc = crc ^ -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
    }
    return crc ^ -1;
  }
  module2.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
      return 0;
    }
    var isArray = utils.getTypeOf(input) !== "string";
    if (isArray) {
      return crc32(crc | 0, input, input.length, 0);
    } else {
      return crc32str(crc | 0, input, input.length, 0);
    }
  };
});

// node_modules/jszip/lib/stream/Crc32Probe.js
var require_Crc32Probe = __commonJS((exports2, module2) => {
  var GenericWorker = require_GenericWorker();
  var crc32 = require_crc32();
  var utils = require_utils();
  function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
  }
  utils.inherits(Crc32Probe, GenericWorker);
  Crc32Probe.prototype.processChunk = function(chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
  };
  module2.exports = Crc32Probe;
});

// node_modules/jszip/lib/stream/DataLengthProbe.js
var require_DataLengthProbe = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
  }
  utils.inherits(DataLengthProbe, GenericWorker);
  DataLengthProbe.prototype.processChunk = function(chunk) {
    if (chunk) {
      var length = this.streamInfo[this.propName] || 0;
      this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
  };
  module2.exports = DataLengthProbe;
});

// node_modules/jszip/lib/compressedObject.js
var require_compressedObject = __commonJS((exports2, module2) => {
  var external = require_external();
  var DataWorker = require_DataWorker();
  var Crc32Probe = require_Crc32Probe();
  var DataLengthProbe = require_DataLengthProbe();
  function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
  }
  CompressedObject.prototype = {
    getContentWorker: function() {
      var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
      var that = this;
      worker.on("end", function() {
        if (this.streamInfo["data_length"] !== that.uncompressedSize) {
          throw new Error("Bug : uncompressed data size mismatch");
        }
      });
      return worker;
    },
    getCompressedWorker: function() {
      return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    }
  };
  CompressedObject.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker.pipe(new Crc32Probe).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
  };
  module2.exports = CompressedObject;
});

// node_modules/jszip/lib/zipObject.js
var require_zipObject = __commonJS((exports2, module2) => {
  var StreamHelper = require_StreamHelper();
  var DataWorker = require_DataWorker();
  var utf8 = require_utf8();
  var CompressedObject = require_compressedObject();
  var GenericWorker = require_GenericWorker();
  var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;
    this._data = data;
    this._dataBinary = options.binary;
    this.options = {
      compression: options.compression,
      compressionOptions: options.compressionOptions
    };
  };
  ZipObject.prototype = {
    internalStream: function(type) {
      var result = null, outputType = "string";
      try {
        if (!type) {
          throw new Error("No output type specified.");
        }
        outputType = type.toLowerCase();
        var askUnicodeString = outputType === "string" || outputType === "text";
        if (outputType === "binarystring" || outputType === "text") {
          outputType = "string";
        }
        result = this._decompressWorker();
        var isUnicodeString = !this._dataBinary;
        if (isUnicodeString && !askUnicodeString) {
          result = result.pipe(new utf8.Utf8EncodeWorker);
        }
        if (!isUnicodeString && askUnicodeString) {
          result = result.pipe(new utf8.Utf8DecodeWorker);
        }
      } catch (e) {
        result = new GenericWorker("error");
        result.error(e);
      }
      return new StreamHelper(result, outputType, "");
    },
    async: function(type, onUpdate) {
      return this.internalStream(type).accumulate(onUpdate);
    },
    nodeStream: function(type, onUpdate) {
      return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },
    _compressWorker: function(compression, compressionOptions) {
      if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) {
        return this._data.getCompressedWorker();
      } else {
        var result = this._decompressWorker();
        if (!this._dataBinary) {
          result = result.pipe(new utf8.Utf8EncodeWorker);
        }
        return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
      }
    },
    _decompressWorker: function() {
      if (this._data instanceof CompressedObject) {
        return this._data.getContentWorker();
      } else if (this._data instanceof GenericWorker) {
        return this._data;
      } else {
        return new DataWorker(this._data);
      }
    }
  };
  var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
  var removedFn = function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  };
  for (i = 0;i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
  }
  var i;
  module2.exports = ZipObject;
});

// node_modules/pako/lib/utils/common.js
var require_common = __commonJS((exports2) => {
  var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
  function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  exports2.assign = function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      var source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  exports2.shrinkBuf = function(buf, size) {
    if (buf.length === size) {
      return buf;
    }
    if (buf.subarray) {
      return buf.subarray(0, size);
    }
    buf.length = size;
    return buf;
  };
  var fnTyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      if (src.subarray && dest.subarray) {
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
        return;
      }
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      var i, l, len, pos, chunk, result;
      len = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        len += chunks[i].length;
      }
      result = new Uint8Array(len);
      pos = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    }
  };
  var fnUntyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      return [].concat.apply([], chunks);
    }
  };
  exports2.setTyped = function(on) {
    if (on) {
      exports2.Buf8 = Uint8Array;
      exports2.Buf16 = Uint16Array;
      exports2.Buf32 = Int32Array;
      exports2.assign(exports2, fnTyped);
    } else {
      exports2.Buf8 = Array;
      exports2.Buf16 = Array;
      exports2.Buf32 = Array;
      exports2.assign(exports2, fnUntyped);
    }
  };
  exports2.setTyped(TYPED_OK);
});

// node_modules/pako/lib/zlib/trees.js
var require_trees = __commonJS((exports2) => {
  var utils = require_common();
  var Z_FIXED = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN = 2;
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES + 2) * 2);
  zero(static_ltree);
  var static_dtree = new Array(D_CODES * 2);
  zero(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  var base_length = new Array(LENGTH_CODES);
  zero(base_length);
  var base_dist = new Array(D_CODES);
  zero(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }
  function put_short(s, w) {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  }
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  }
  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2], tree[c * 2 + 1]);
  }
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }
  function gen_bitlen(s, desc) {
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for (bits = 0;bits <= MAX_BITS; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1;h < HEAP_SIZE; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length;bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }
  function gen_codes(tree, max_code, bl_count) {
    var next_code = new Array(MAX_BITS + 1);
    var code = 0;
    var bits;
    var n;
    for (bits = 1;bits <= MAX_BITS; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    for (n = 0;n <= max_code; n++) {
      var len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  }
  function tr_static_init() {
    var n;
    var bits;
    var length;
    var code;
    var dist;
    var bl_count = new Array(MAX_BITS + 1);
    length = 0;
    for (code = 0;code < LENGTH_CODES - 1; code++) {
      base_length[code] = length;
      for (n = 0;n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0;code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0;n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (;code < D_CODES; code++) {
      base_dist[code] = dist << 7;
      for (n = 0;n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0;bits <= MAX_BITS; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES + 1, bl_count);
    for (n = 0;n < D_CODES; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
  }
  function init_block(s) {
    var n;
    for (n = 0;n < L_CODES; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0;n < D_CODES; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0;n < BL_CODES; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }
  function copy_block(s, buf, len, header) {
    bi_windup(s);
    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  }
  function pqdownheap(s, tree, k) {
    var v = s.heap[k];
    var j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  }
  function compress_block(s, ltree, dtree) {
    var dist;
    var lc;
    var lx = 0;
    var code;
    var extra;
    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (lx < s.last_lit);
    }
    send_code(s, END_BLOCK, ltree);
  }
  function build_tree(s, desc) {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m;
    var max_code = -1;
    var node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE;
    for (n = 0;n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1;n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[1];
      s.heap[1] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1);
      m = s.heap[1];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[1] = node++;
      pqdownheap(s, tree, 1);
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[1];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  }
  function scan_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function send_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function build_bl_tree(s) {
    var max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES - 1;max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }
  function send_all_trees(s, lcodes, dcodes, blcodes) {
    var rank;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank = 0;rank < blcodes; rank++) {
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  }
  function detect_data_type(s) {
    var black_mask = 4093624447;
    var n;
    for (n = 0;n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32;n < LITERALS; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  }
  var static_init_done = false;
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  }
  function _tr_stored_block(s, buf, stored_len, last) {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s, buf, stored_len, true);
  }
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }
  function _tr_flush_block(s, buf, stored_len, last) {
    var opt_lenb, static_lenb;
    var max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  }
  function _tr_tally(s, dist, lc) {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.last_lit === s.lit_bufsize - 1;
  }
  exports2._tr_init = _tr_init;
  exports2._tr_stored_block = _tr_stored_block;
  exports2._tr_flush_block = _tr_flush_block;
  exports2._tr_tally = _tr_tally;
  exports2._tr_align = _tr_align;
});

// node_modules/pako/lib/zlib/adler32.js
var require_adler32 = __commonJS((exports2, module2) => {
  function adler32(adler, buf, len, pos) {
    var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2000 ? 2000 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  }
  module2.exports = adler32;
});

// node_modules/pako/lib/zlib/crc32.js
var require_crc322 = __commonJS((exports2, module2) => {
  function makeTable() {
    var c, table = [];
    for (var n = 0;n < 256; n++) {
      c = n;
      for (var k = 0;k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc ^= -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  }
  module2.exports = crc32;
});

// node_modules/pako/lib/zlib/messages.js
var require_messages = __commonJS((exports2, module2) => {
  module2.exports = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
});

// node_modules/pako/lib/zlib/deflate.js
var require_deflate = __commonJS((exports2) => {
  var utils = require_common();
  var trees = require_trees();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var msg = require_messages();
  var Z_NO_FLUSH = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_BUF_ERROR = -5;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED = 8;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }
  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  function flush_pending(strm) {
    var s = strm.state;
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }
  function flush_block_only(s, last) {
    trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }
  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }
  function putShortMSB(s, b) {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  }
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    utils.arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  }
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    var scan = s.strstart;
    var match;
    var len;
    var best_len = s.prev_length;
    var nice_match = s.nice_match;
    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    var _win = s.window;
    var wmask = s.w_mask;
    var prev = s.prev;
    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
        while (s.insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  }
  function deflate_stored(s, flush) {
    var max_block_size = 65535;
    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    for (;; ) {
      if (s.lookahead <= 1) {
        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.strstart += s.lookahead;
      s.lookahead = 0;
      var max_start = s.block_start + max_block_size;
      if (s.strstart === 0 || s.strstart >= max_start) {
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.strstart > s.block_start) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  }
  function deflate_fast(s, flush) {
    var hash_head;
    var bflush;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
        }
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_slow(s, flush) {
    var hash_head;
    var bflush;
    var max_insert;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_rle(s, flush) {
    var bflush;
    var prev;
    var scan, strend;
    var _win = s.window;
    for (;; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_huff(s, flush) {
    var bflush;
    for (;; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table;
  configuration_table = [
    new Config(0, 0, 0, 0, deflate_stored),
    new Config(4, 4, 8, 4, deflate_fast),
    new Config(4, 5, 16, 8, deflate_fast),
    new Config(4, 6, 32, 32, deflate_fast),
    new Config(4, 4, 16, 16, deflate_slow),
    new Config(8, 16, 32, 32, deflate_slow),
    new Config(8, 16, 128, 128, deflate_slow),
    new Config(8, 32, 128, 256, deflate_slow),
    new Config(32, 128, 258, 1024, deflate_slow),
    new Config(32, 258, 258, 4096, deflate_slow)
  ];
  function lm_init(s) {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new utils.Buf16(MAX_BITS + 1);
    this.heap = new utils.Buf16(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new utils.Buf16(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function deflateResetKeep(strm) {
    var s;
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = Z_NO_FLUSH;
    trees._tr_init(s);
    return Z_OK;
  }
  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK) {
      lm_init(strm.state);
    }
    return ret;
  }
  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR;
    }
    strm.state.gzhead = head;
    return Z_OK;
  }
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    var wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    var s = new DeflateState;
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new utils.Buf8(s.w_size * 2);
    s.head = new utils.Buf16(s.hash_size);
    s.prev = new utils.Buf16(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new utils.Buf8(s.pending_buf_size);
    s.d_buf = 1 * s.lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  }
  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
  }
  function deflate(strm, flush) {
    var old_flush, s;
    var beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
    }
    s = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
    }
    s.strm = strm;
    old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        beg = s.pending;
        while (s.gzindex < (s.gzhead.extra.length & 65535)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 255);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
      return err(strm, Z_BUF_ERROR);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR);
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        } else if (flush !== Z_BLOCK) {
          trees._tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      }
    }
    if (flush !== Z_FINISH) {
      return Z_OK;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK : Z_STREAM_END;
  }
  function deflateEnd(strm) {
    var status;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
  }
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    s = strm.state;
    wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR;
    }
    if (wrap === 1) {
      strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      tmpDict = new utils.Buf8(s.w_size);
      utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK;
  }
  exports2.deflateInit = deflateInit;
  exports2.deflateInit2 = deflateInit2;
  exports2.deflateReset = deflateReset;
  exports2.deflateResetKeep = deflateResetKeep;
  exports2.deflateSetHeader = deflateSetHeader;
  exports2.deflate = deflate;
  exports2.deflateEnd = deflateEnd;
  exports2.deflateSetDictionary = deflateSetDictionary;
  exports2.deflateInfo = "pako deflate (from Nodeca project)";
});

// node_modules/pako/lib/utils/strings.js
var require_strings = __commonJS((exports2) => {
  var utils = require_common();
  var STR_APPLY_OK = true;
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (__) {
    STR_APPLY_OK = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new utils.Buf8(256);
  for (q = 0;q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  var q;
  _utf8len[254] = _utf8len[254] = 1;
  exports2.string2buf = function(str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0;m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new utils.Buf8(buf_len);
    for (i = 0, m_pos = 0;i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i++] = c;
      } else if (c < 2048) {
        buf[i++] = 192 | c >>> 6;
        buf[i++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i++] = 224 | c >>> 12;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      } else {
        buf[i++] = 240 | c >>> 18;
        buf[i++] = 128 | c >>> 12 & 63;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      }
    }
    return buf;
  };
  function buf2binstring(buf, len) {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
      }
    }
    var result = "";
    for (var i = 0;i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  }
  exports2.buf2binstring = function(buf) {
    return buf2binstring(buf, buf.length);
  };
  exports2.binstring2buf = function(str) {
    var buf = new utils.Buf8(str.length);
    for (var i = 0, len = buf.length;i < len; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  };
  exports2.buf2string = function(buf, max) {
    var i, out, c, c_len;
    var len = max || buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i = 0;i < len; ) {
      c = buf[i++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  exports2.utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
});

// node_modules/pako/lib/zlib/zstream.js
var require_zstream = __commonJS((exports2, module2) => {
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  module2.exports = ZStream;
});

// node_modules/pako/lib/deflate.js
var require_deflate2 = __commonJS((exports2) => {
  var zlib_deflate = require_deflate();
  var utils = require_common();
  var strings = require_strings();
  var msg = require_messages();
  var ZStream = require_zstream();
  var toString = Object.prototype.toString;
  var Z_NO_FLUSH = 0;
  var Z_FINISH = 4;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_SYNC_FLUSH = 2;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_DEFLATED = 8;
  function Deflate(options) {
    if (!(this instanceof Deflate))
      return new Deflate(options);
    this.options = utils.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }
    if (opt.header) {
      zlib_deflate.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      var dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = zlib_deflate.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var status, _mode;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_deflate.deflate(strm, _mode);
      if (status !== Z_STREAM_END && status !== Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
    if (_mode === Z_FINISH) {
      status = zlib_deflate.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK;
    }
    if (_mode === Z_SYNC_FLUSH) {
      this.onEnd(Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Deflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate(input, options) {
    var deflator = new Deflate(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || msg[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return deflate(input, options);
  }
  function gzip(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate(input, options);
  }
  exports2.Deflate = Deflate;
  exports2.deflate = deflate;
  exports2.deflateRaw = deflateRaw;
  exports2.gzip = gzip;
});

// node_modules/pako/lib/zlib/inffast.js
var require_inffast = __commonJS((exports2, module2) => {
  var BAD = 30;
  var TYPE = 12;
  module2.exports = function inflate_fast(strm, start) {
    var state;
    var _in;
    var last;
    var _out;
    var beg;
    var end;
    var dmax;
    var wsize;
    var whave;
    var wnext;
    var s_window;
    var hold;
    var bits;
    var lcode;
    var dcode;
    var lmask;
    var dmask;
    var here;
    var op;
    var len;
    var dist;
    var from;
    var from_source;
    var input, output;
    state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (;; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (;; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
});

// node_modules/pako/lib/zlib/inftrees.js
var require_inftrees = __commonJS((exports2, module2) => {
  var utils = require_common();
  var MAXBITS = 15;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var lbase = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];
  var lext = [
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];
  var dbase = [
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];
  var dext = [
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  module2.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    var len = 0;
    var sym = 0;
    var min = 0, max = 0;
    var root = 0;
    var curr = 0;
    var drop = 0;
    var left = 0;
    var used = 0;
    var huff = 0;
    var incr;
    var fill;
    var low;
    var mask;
    var next;
    var base = null;
    var base_index = 0;
    var end;
    var count = new utils.Buf16(MAXBITS + 1);
    var offs = new utils.Buf16(MAXBITS + 1);
    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    for (len = 0;len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0;sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS;max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1;min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1;len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1;len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0;sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES) {
      base = extra = work;
      end = 19;
    } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
      return 1;
    }
    for (;; ) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
});

// node_modules/pako/lib/zlib/inflate.js
var require_inflate = __commonJS((exports2) => {
  var utils = require_common();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var inflate_fast = require_inffast();
  var inflate_table = require_inftrees();
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var Z_DEFLATED = 8;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  function zswap32(q) {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  }
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new utils.Buf16(320);
    this.work = new utils.Buf16(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function inflateResetKeep(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK;
  }
  function inflateReset(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  }
  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }
  function inflateInit2(strm, windowBits) {
    var ret;
    var state;
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    state = new InflateState;
    strm.state = state;
    state.window = null;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK) {
      strm.state = null;
    }
    return ret;
  }
  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }
  var virgin = true;
  var lenfix;
  var distfix;
  function fixedtables(state) {
    if (virgin) {
      var sym;
      lenfix = new utils.Buf32(512);
      distfix = new utils.Buf32(32);
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new utils.Buf8(state.wsize);
    }
    if (copy >= state.wsize) {
      utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      utils.arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        utils.arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }
  function inflate(strm, flush) {
    var state;
    var input, output;
    var next;
    var put;
    var have, left;
    var hold;
    var bits;
    var _in, _out;
    var copy;
    var from;
    var from_source;
    var here = 0;
    var here_bits, here_op, here_val;
    var last_bits, last_op, last_val;
    var len;
    var ret;
    var hbuf = new utils.Buf8(4);
    var opts;
    var n;
    var order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK;
    inf_leave:
      for (;; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            state.flags = 0;
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            } else if (len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << len;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Array(state.head.extra_len);
                  }
                  utils.arraySet(state.head.extra, input, next, copy, len);
                }
                if (state.flags & 512) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              utils.arraySet(output, input, next, copy, put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = { bits: state.lenbits };
            ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (;; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = { bits: state.lenbits };
            ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inflate_fast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (;; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (;; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (_out) {
                strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
              }
              _out = left;
              if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
          default:
            return Z_STREAM_ERROR;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  }
  function inflateEnd(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK;
  }
  function inflateGetHeader(strm, head) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR;
    }
    state.head = head;
    head.done = false;
    return Z_OK;
  }
  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state;
    var dictid;
    var ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
    state.havedict = 1;
    return Z_OK;
  }
  exports2.inflateReset = inflateReset;
  exports2.inflateReset2 = inflateReset2;
  exports2.inflateResetKeep = inflateResetKeep;
  exports2.inflateInit = inflateInit;
  exports2.inflateInit2 = inflateInit2;
  exports2.inflate = inflate;
  exports2.inflateEnd = inflateEnd;
  exports2.inflateGetHeader = inflateGetHeader;
  exports2.inflateSetDictionary = inflateSetDictionary;
  exports2.inflateInfo = "pako inflate (from Nodeca project)";
});

// node_modules/pako/lib/zlib/constants.js
var require_constants = __commonJS((exports2, module2) => {
  module2.exports = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
});

// node_modules/pako/lib/zlib/gzheader.js
var require_gzheader = __commonJS((exports2, module2) => {
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  module2.exports = GZheader;
});

// node_modules/pako/lib/inflate.js
var require_inflate2 = __commonJS((exports2) => {
  var zlib_inflate = require_inflate();
  var utils = require_common();
  var strings = require_strings();
  var c = require_constants();
  var msg = require_messages();
  var ZStream = require_zstream();
  var GZheader = require_gzheader();
  var toString = Object.prototype.toString;
  function Inflate(options) {
    if (!(this instanceof Inflate))
      return new Inflate(options);
    this.options = utils.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
    if (status !== c.Z_OK) {
      throw new Error(msg[status]);
    }
    this.header = new GZheader;
    zlib_inflate.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
      }
    }
  }
  Inflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;
    var status, _mode;
    var next_out_utf8, tail, utf8str;
    var allowBufError = false;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.binstring2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
      if (status === c.Z_NEED_DICT && dictionary) {
        status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
      }
      if (status === c.Z_BUF_ERROR && allowBufError === true) {
        status = c.Z_OK;
        allowBufError = false;
      }
      if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
          if (this.options.to === "string") {
            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            tail = strm.next_out - next_out_utf8;
            utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) {
              utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
            }
            this.onData(utf8str);
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      }
      if (strm.avail_in === 0 && strm.avail_out === 0) {
        allowBufError = true;
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
    if (status === c.Z_STREAM_END) {
      _mode = c.Z_FINISH;
    }
    if (_mode === c.Z_FINISH) {
      status = zlib_inflate.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === c.Z_OK;
    }
    if (_mode === c.Z_SYNC_FLUSH) {
      this.onEnd(c.Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Inflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate.prototype.onEnd = function(status) {
    if (status === c.Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate(input, options) {
    var inflator = new Inflate(options);
    inflator.push(input, true);
    if (inflator.err) {
      throw inflator.msg || msg[inflator.err];
    }
    return inflator.result;
  }
  function inflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return inflate(input, options);
  }
  exports2.Inflate = Inflate;
  exports2.inflate = inflate;
  exports2.inflateRaw = inflateRaw;
  exports2.ungzip = inflate;
});

// node_modules/pako/index.js
var require_pako = __commonJS((exports2, module2) => {
  var assign = require_common().assign;
  var deflate = require_deflate2();
  var inflate = require_inflate2();
  var constants = require_constants();
  var pako = {};
  assign(pako, deflate, inflate, constants);
  module2.exports = pako;
});

// node_modules/jszip/lib/flate.js
var require_flate = __commonJS((exports2) => {
  var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
  var pako = require_pako();
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
  exports2.magic = "\b\x00";
  function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);
    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    this.meta = {};
  }
  utils.inherits(FlateWorker, GenericWorker);
  FlateWorker.prototype.processChunk = function(chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
  };
  FlateWorker.prototype.flush = function() {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push([], true);
  };
  FlateWorker.prototype.cleanUp = function() {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
  };
  FlateWorker.prototype._createPako = function() {
    this._pako = new pako[this._pakoAction]({
      raw: true,
      level: this._pakoOptions.level || -1
    });
    var self2 = this;
    this._pako.onData = function(data) {
      self2.push({
        data,
        meta: self2.meta
      });
    };
  };
  exports2.compressWorker = function(compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
  };
  exports2.uncompressWorker = function() {
    return new FlateWorker("Inflate", {});
  };
});

// node_modules/jszip/lib/compressions.js
var require_compressions = __commonJS((exports2) => {
  var GenericWorker = require_GenericWorker();
  exports2.STORE = {
    magic: "\x00\x00",
    compressWorker: function() {
      return new GenericWorker("STORE compression");
    },
    uncompressWorker: function() {
      return new GenericWorker("STORE decompression");
    }
  };
  exports2.DEFLATE = require_flate();
});

// node_modules/jszip/lib/signature.js
var require_signature = __commonJS((exports2) => {
  exports2.LOCAL_FILE_HEADER = "PK\x03\x04";
  exports2.CENTRAL_FILE_HEADER = "PK\x01\x02";
  exports2.CENTRAL_DIRECTORY_END = "PK\x05\x06";
  exports2.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
  exports2.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
  exports2.DATA_DESCRIPTOR = "PK\x07\b";
});

// node_modules/jszip/lib/generate/ZipFileWorker.js
var require_ZipFileWorker = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var utf8 = require_utf8();
  var crc32 = require_crc32();
  var signature = require_signature();
  var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0;i < bytes; i++) {
      hex += String.fromCharCode(dec & 255);
      dec = dec >>> 8;
    }
    return hex;
  };
  var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
    var result = unixPermissions;
    if (!unixPermissions) {
      result = isDir ? 16893 : 33204;
    }
    return (result & 65535) << 16;
  };
  var generateDosExternalFileAttr = function(dosPermissions) {
    return (dosPermissions || 0) & 63;
  };
  var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment, encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
    var dataInfo = {
      crc32: 0,
      compressedSize: 0,
      uncompressedSize: 0
    };
    if (!streamedContent || streamingEnded) {
      dataInfo.crc32 = streamInfo["crc32"];
      dataInfo.compressedSize = streamInfo["compressedSize"];
      dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
    }
    var bitflag = 0;
    if (streamedContent) {
      bitflag |= 8;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
      bitflag |= 2048;
    }
    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
      extFileAttr |= 16;
    }
    if (platform === "UNIX") {
      versionMadeBy = 798;
      extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else {
      versionMadeBy = 20;
      extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }
    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;
    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | date.getUTCMonth() + 1;
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();
    if (useUTF8ForFileName) {
      unicodePathExtraField = decToHex(1, 1) + decToHex(crc32(encodedFileName), 4) + utfEncodedFileName;
      extraFields += "up" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
    }
    if (useUTF8ForComment) {
      unicodeCommentExtraField = decToHex(1, 1) + decToHex(crc32(encodedComment), 4) + utfEncodedComment;
      extraFields += "uc" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
    }
    var header = "";
    header += `
\x00`;
    header += decToHex(bitflag, 2);
    header += compression.magic;
    header += decToHex(dosTime, 2);
    header += decToHex(dosDate, 2);
    header += decToHex(dataInfo.crc32, 4);
    header += decToHex(dataInfo.compressedSize, 4);
    header += decToHex(dataInfo.uncompressedSize, 4);
    header += decToHex(encodedFileName.length, 2);
    header += decToHex(extraFields.length, 2);
    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
    var dirRecord = signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\x00\x00" + "\x00\x00" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment;
    return {
      fileRecord,
      dirRecord
    };
  };
  var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));
    dirEnd = signature.CENTRAL_DIRECTORY_END + "\x00\x00" + "\x00\x00" + decToHex(entriesCount, 2) + decToHex(entriesCount, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
    return dirEnd;
  };
  var generateDataDescriptors = function(streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR + decToHex(streamInfo["crc32"], 4) + decToHex(streamInfo["compressedSize"], 4) + decToHex(streamInfo["uncompressedSize"], 4);
    return descriptor;
  };
  function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    this.bytesWritten = 0;
    this.zipComment = comment;
    this.zipPlatform = platform;
    this.encodeFileName = encodeFileName;
    this.streamFiles = streamFiles;
    this.accumulate = false;
    this.contentBuffer = [];
    this.dirRecords = [];
    this.currentSourceOffset = 0;
    this.entriesCount = 0;
    this.currentFile = null;
    this._sources = [];
  }
  utils.inherits(ZipFileWorker, GenericWorker);
  ZipFileWorker.prototype.push = function(chunk) {
    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;
    if (this.accumulate) {
      this.contentBuffer.push(chunk);
    } else {
      this.bytesWritten += chunk.data.length;
      GenericWorker.prototype.push.call(this, {
        data: chunk.data,
        meta: {
          currentFile: this.currentFile,
          percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
        }
      });
    }
  };
  ZipFileWorker.prototype.openedSource = function(streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo["file"].name;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    if (streamedContent) {
      var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
    } else {
      this.accumulate = true;
    }
  };
  ZipFileWorker.prototype.closedSource = function(streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.dirRecords.push(record.dirRecord);
    if (streamedContent) {
      this.push({
        data: generateDataDescriptors(streamInfo),
        meta: { percent: 100 }
      });
    } else {
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
      while (this.contentBuffer.length) {
        this.push(this.contentBuffer.shift());
      }
    }
    this.currentFile = null;
  };
  ZipFileWorker.prototype.flush = function() {
    var localDirLength = this.bytesWritten;
    for (var i = 0;i < this.dirRecords.length; i++) {
      this.push({
        data: this.dirRecords[i],
        meta: { percent: 100 }
      });
    }
    var centralDirLength = this.bytesWritten - localDirLength;
    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
    this.push({
      data: dirEnd,
      meta: { percent: 100 }
    });
  };
  ZipFileWorker.prototype.prepareNextSource = function() {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
      this.previous.pause();
    } else {
      this.previous.resume();
    }
  };
  ZipFileWorker.prototype.registerPrevious = function(previous) {
    this._sources.push(previous);
    var self2 = this;
    previous.on("data", function(chunk) {
      self2.processChunk(chunk);
    });
    previous.on("end", function() {
      self2.closedSource(self2.previous.streamInfo);
      if (self2._sources.length) {
        self2.prepareNextSource();
      } else {
        self2.end();
      }
    });
    previous.on("error", function(e) {
      self2.error(e);
    });
    return this;
  };
  ZipFileWorker.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (!this.previous && this._sources.length) {
      this.prepareNextSource();
      return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
      this.end();
      return true;
    }
  };
  ZipFileWorker.prototype.error = function(e) {
    var sources = this._sources;
    if (!GenericWorker.prototype.error.call(this, e)) {
      return false;
    }
    for (var i = 0;i < sources.length; i++) {
      try {
        sources[i].error(e);
      } catch (e2) {}
    }
    return true;
  };
  ZipFileWorker.prototype.lock = function() {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for (var i = 0;i < sources.length; i++) {
      sources[i].lock();
    }
  };
  module2.exports = ZipFileWorker;
});

// node_modules/jszip/lib/generate/index.js
var require_generate = __commonJS((exports2) => {
  var compressions = require_compressions();
  var ZipFileWorker = require_ZipFileWorker();
  var getCompression = function(fileCompression, zipCompression) {
    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
      throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
  };
  exports2.generateWorker = function(zip, options, comment) {
    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {
      zip.forEach(function(relativePath, file) {
        entriesCount++;
        var compression = getCompression(file.options.compression, options.compression);
        var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
        var { dir, date } = file;
        file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
          name: relativePath,
          dir,
          date,
          comment: file.comment || "",
          unixPermissions: file.unixPermissions,
          dosPermissions: file.dosPermissions
        }).pipe(zipFileWorker);
      });
      zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
      zipFileWorker.error(e);
    }
    return zipFileWorker;
  };
});

// node_modules/jszip/lib/nodejs/NodejsStreamInputAdapter.js
var require_NodejsStreamInputAdapter = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
  }
  utils.inherits(NodejsStreamInputAdapter, GenericWorker);
  NodejsStreamInputAdapter.prototype._bindStream = function(stream) {
    var self2 = this;
    this._stream = stream;
    stream.pause();
    stream.on("data", function(chunk) {
      self2.push({
        data: chunk,
        meta: {
          percent: 0
        }
      });
    }).on("error", function(e) {
      if (self2.isPaused) {
        this.generatedError = e;
      } else {
        self2.error(e);
      }
    }).on("end", function() {
      if (self2.isPaused) {
        self2._upstreamEnded = true;
      } else {
        self2.end();
      }
    });
  };
  NodejsStreamInputAdapter.prototype.pause = function() {
    if (!GenericWorker.prototype.pause.call(this)) {
      return false;
    }
    this._stream.pause();
    return true;
  };
  NodejsStreamInputAdapter.prototype.resume = function() {
    if (!GenericWorker.prototype.resume.call(this)) {
      return false;
    }
    if (this._upstreamEnded) {
      this.end();
    } else {
      this._stream.resume();
    }
    return true;
  };
  module2.exports = NodejsStreamInputAdapter;
});

// node_modules/jszip/lib/object.js
var require_object = __commonJS((exports2, module2) => {
  var utf8 = require_utf8();
  var utils = require_utils();
  var GenericWorker = require_GenericWorker();
  var StreamHelper = require_StreamHelper();
  var defaults = require_defaults();
  var CompressedObject = require_compressedObject();
  var ZipObject = require_zipObject();
  var generate = require_generate();
  var nodejsUtils = require_nodejsUtils();
  var NodejsStreamInputAdapter = require_NodejsStreamInputAdapter();
  var fileAdd = function(name, data, originalOptions) {
    var dataType = utils.getTypeOf(data), parent;
    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date;
    if (o.compression !== null) {
      o.compression = o.compression.toUpperCase();
    }
    if (typeof o.unixPermissions === "string") {
      o.unixPermissions = parseInt(o.unixPermissions, 8);
    }
    if (o.unixPermissions && o.unixPermissions & 16384) {
      o.dir = true;
    }
    if (o.dosPermissions && o.dosPermissions & 16) {
      o.dir = true;
    }
    if (o.dir) {
      name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
      folderAdd.call(this, parent, true);
    }
    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
      o.binary = !isUnicodeString;
    }
    var isCompressedEmpty = data instanceof CompressedObject && data.uncompressedSize === 0;
    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
      o.base64 = false;
      o.binary = true;
      data = "";
      o.compression = "STORE";
      dataType = "string";
    }
    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
      zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
      zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
      zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }
    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
  };
  var parentFolder = function(path) {
    if (path.slice(-1) === "/") {
      path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf("/");
    return lastSlash > 0 ? path.substring(0, lastSlash) : "";
  };
  var forceTrailingSlash = function(path) {
    if (path.slice(-1) !== "/") {
      path += "/";
    }
    return path;
  };
  var folderAdd = function(name, createFolders) {
    createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
    name = forceTrailingSlash(name);
    if (!this.files[name]) {
      fileAdd.call(this, name, null, {
        dir: true,
        createFolders
      });
    }
    return this.files[name];
  };
  function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
  }
  var out = {
    load: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },
    forEach: function(cb) {
      var filename, relativePath, file;
      for (filename in this.files) {
        file = this.files[filename];
        relativePath = filename.slice(this.root.length, filename.length);
        if (relativePath && filename.slice(0, this.root.length) === this.root) {
          cb(relativePath, file);
        }
      }
    },
    filter: function(search) {
      var result = [];
      this.forEach(function(relativePath, entry) {
        if (search(relativePath, entry)) {
          result.push(entry);
        }
      });
      return result;
    },
    file: function(name, data, o) {
      if (arguments.length === 1) {
        if (isRegExp(name)) {
          var regexp = name;
          return this.filter(function(relativePath, file) {
            return !file.dir && regexp.test(relativePath);
          });
        } else {
          var obj = this.files[this.root + name];
          if (obj && !obj.dir) {
            return obj;
          } else {
            return null;
          }
        }
      } else {
        name = this.root + name;
        fileAdd.call(this, name, data, o);
      }
      return this;
    },
    folder: function(arg) {
      if (!arg) {
        return this;
      }
      if (isRegExp(arg)) {
        return this.filter(function(relativePath, file) {
          return file.dir && arg.test(relativePath);
        });
      }
      var name = this.root + arg;
      var newFolder = folderAdd.call(this, name);
      var ret = this.clone();
      ret.root = newFolder.name;
      return ret;
    },
    remove: function(name) {
      name = this.root + name;
      var file = this.files[name];
      if (!file) {
        if (name.slice(-1) !== "/") {
          name += "/";
        }
        file = this.files[name];
      }
      if (file && !file.dir) {
        delete this.files[name];
      } else {
        var kids = this.filter(function(relativePath, file2) {
          return file2.name.slice(0, name.length) === name;
        });
        for (var i = 0;i < kids.length; i++) {
          delete this.files[kids[i].name];
        }
      }
      return this;
    },
    generate: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
        opts = utils.extend(options || {}, {
          streamFiles: false,
          compression: "STORE",
          compressionOptions: null,
          type: "",
          platform: "DOS",
          comment: null,
          mimeType: "application/zip",
          encodeFileName: utf8.utf8encode
        });
        opts.type = opts.type.toLowerCase();
        opts.compression = opts.compression.toUpperCase();
        if (opts.type === "binarystring") {
          opts.type = "string";
        }
        if (!opts.type) {
          throw new Error("No output type specified.");
        }
        utils.checkSupport(opts.type);
        if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
          opts.platform = "UNIX";
        }
        if (opts.platform === "win32") {
          opts.platform = "DOS";
        }
        var comment = opts.comment || this.comment || "";
        worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    generateAsync: function(options, onUpdate) {
      return this.generateInternalStream(options).accumulate(onUpdate);
    },
    generateNodeStream: function(options, onUpdate) {
      options = options || {};
      if (!options.type) {
        options.type = "nodebuffer";
      }
      return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
  };
  module2.exports = out;
});

// node_modules/jszip/lib/reader/DataReader.js
var require_DataReader = __commonJS((exports2, module2) => {
  var utils = require_utils();
  function DataReader(data) {
    this.data = data;
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
  }
  DataReader.prototype = {
    checkOffset: function(offset) {
      this.checkIndex(this.index + offset);
    },
    checkIndex: function(newIndex) {
      if (this.length < this.zero + newIndex || newIndex < 0) {
        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
      }
    },
    setIndex: function(newIndex) {
      this.checkIndex(newIndex);
      this.index = newIndex;
    },
    skip: function(n) {
      this.setIndex(this.index + n);
    },
    byteAt: function() {},
    readInt: function(size) {
      var result = 0, i;
      this.checkOffset(size);
      for (i = this.index + size - 1;i >= this.index; i--) {
        result = (result << 8) + this.byteAt(i);
      }
      this.index += size;
      return result;
    },
    readString: function(size) {
      return utils.transformTo("string", this.readData(size));
    },
    readData: function() {},
    lastIndexOfSignature: function() {},
    readAndCheckSignature: function() {},
    readDate: function() {
      var dostime = this.readInt(4);
      return new Date(Date.UTC((dostime >> 25 & 127) + 1980, (dostime >> 21 & 15) - 1, dostime >> 16 & 31, dostime >> 11 & 31, dostime >> 5 & 63, (dostime & 31) << 1));
    }
  };
  module2.exports = DataReader;
});

// node_modules/jszip/lib/reader/ArrayReader.js
var require_ArrayReader = __commonJS((exports2, module2) => {
  var DataReader = require_DataReader();
  var utils = require_utils();
  function ArrayReader(data) {
    DataReader.call(this, data);
    for (var i = 0;i < this.data.length; i++) {
      data[i] = data[i] & 255;
    }
  }
  utils.inherits(ArrayReader, DataReader);
  ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
  };
  ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4;i >= 0; --i) {
      if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
        return i - this.zero;
      }
    }
    return -1;
  };
  ArrayReader.prototype.readAndCheckSignature = function(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
  };
  ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module2.exports = ArrayReader;
});

// node_modules/jszip/lib/reader/StringReader.js
var require_StringReader = __commonJS((exports2, module2) => {
  var DataReader = require_DataReader();
  var utils = require_utils();
  function StringReader(data) {
    DataReader.call(this, data);
  }
  utils.inherits(StringReader, DataReader);
  StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
  };
  StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
  };
  StringReader.prototype.readAndCheckSignature = function(sig) {
    var data = this.readData(4);
    return sig === data;
  };
  StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module2.exports = StringReader;
});

// node_modules/jszip/lib/reader/Uint8ArrayReader.js
var require_Uint8ArrayReader = __commonJS((exports2, module2) => {
  var ArrayReader = require_ArrayReader();
  var utils = require_utils();
  function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
  }
  utils.inherits(Uint8ArrayReader, ArrayReader);
  Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module2.exports = Uint8ArrayReader;
});

// node_modules/jszip/lib/reader/NodeBufferReader.js
var require_NodeBufferReader = __commonJS((exports2, module2) => {
  var Uint8ArrayReader = require_Uint8ArrayReader();
  var utils = require_utils();
  function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
  }
  utils.inherits(NodeBufferReader, Uint8ArrayReader);
  NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module2.exports = NodeBufferReader;
});

// node_modules/jszip/lib/reader/readerFor.js
var require_readerFor = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var support = require_support();
  var ArrayReader = require_ArrayReader();
  var StringReader = require_StringReader();
  var NodeBufferReader = require_NodeBufferReader();
  var Uint8ArrayReader = require_Uint8ArrayReader();
  module2.exports = function(data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
      return new StringReader(data);
    }
    if (type === "nodebuffer") {
      return new NodeBufferReader(data);
    }
    if (support.uint8array) {
      return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
  };
});

// node_modules/jszip/lib/zipEntry.js
var require_zipEntry = __commonJS((exports2, module2) => {
  var readerFor = require_readerFor();
  var utils = require_utils();
  var CompressedObject = require_compressedObject();
  var crc32fn = require_crc32();
  var utf8 = require_utf8();
  var compressions = require_compressions();
  var support = require_support();
  var MADE_BY_DOS = 0;
  var MADE_BY_UNIX = 3;
  var findCompression = function(compressionMethod) {
    for (var method in compressions) {
      if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
        continue;
      }
      if (compressions[method].magic === compressionMethod) {
        return compressions[method];
      }
    }
    return null;
  };
  function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
  }
  ZipEntry.prototype = {
    isEncrypted: function() {
      return (this.bitFlag & 1) === 1;
    },
    useUTF8: function() {
      return (this.bitFlag & 2048) === 2048;
    },
    readLocalPart: function(reader) {
      var compression, localExtraFieldsLength;
      reader.skip(22);
      this.fileNameLength = reader.readInt(2);
      localExtraFieldsLength = reader.readInt(2);
      this.fileName = reader.readData(this.fileNameLength);
      reader.skip(localExtraFieldsLength);
      if (this.compressedSize === -1 || this.uncompressedSize === -1) {
        throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
      }
      compression = findCompression(this.compressionMethod);
      if (compression === null) {
        throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
      }
      this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },
    readCentralPart: function(reader) {
      this.versionMadeBy = reader.readInt(2);
      reader.skip(2);
      this.bitFlag = reader.readInt(2);
      this.compressionMethod = reader.readString(2);
      this.date = reader.readDate();
      this.crc32 = reader.readInt(4);
      this.compressedSize = reader.readInt(4);
      this.uncompressedSize = reader.readInt(4);
      var fileNameLength = reader.readInt(2);
      this.extraFieldsLength = reader.readInt(2);
      this.fileCommentLength = reader.readInt(2);
      this.diskNumberStart = reader.readInt(2);
      this.internalFileAttributes = reader.readInt(2);
      this.externalFileAttributes = reader.readInt(4);
      this.localHeaderOffset = reader.readInt(4);
      if (this.isEncrypted()) {
        throw new Error("Encrypted zip are not supported");
      }
      reader.skip(fileNameLength);
      this.readExtraFields(reader);
      this.parseZIP64ExtraField(reader);
      this.fileComment = reader.readData(this.fileCommentLength);
    },
    processAttributes: function() {
      this.unixPermissions = null;
      this.dosPermissions = null;
      var madeBy = this.versionMadeBy >> 8;
      this.dir = this.externalFileAttributes & 16 ? true : false;
      if (madeBy === MADE_BY_DOS) {
        this.dosPermissions = this.externalFileAttributes & 63;
      }
      if (madeBy === MADE_BY_UNIX) {
        this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
      }
      if (!this.dir && this.fileNameStr.slice(-1) === "/") {
        this.dir = true;
      }
    },
    parseZIP64ExtraField: function() {
      if (!this.extraFields[1]) {
        return;
      }
      var extraReader = readerFor(this.extraFields[1].value);
      if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
        this.uncompressedSize = extraReader.readInt(8);
      }
      if (this.compressedSize === utils.MAX_VALUE_32BITS) {
        this.compressedSize = extraReader.readInt(8);
      }
      if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
        this.localHeaderOffset = extraReader.readInt(8);
      }
      if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
        this.diskNumberStart = extraReader.readInt(4);
      }
    },
    readExtraFields: function(reader) {
      var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
      if (!this.extraFields) {
        this.extraFields = {};
      }
      while (reader.index + 4 < end) {
        extraFieldId = reader.readInt(2);
        extraFieldLength = reader.readInt(2);
        extraFieldValue = reader.readData(extraFieldLength);
        this.extraFields[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
      reader.setIndex(end);
    },
    handleUTF8: function() {
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      if (this.useUTF8()) {
        this.fileNameStr = utf8.utf8decode(this.fileName);
        this.fileCommentStr = utf8.utf8decode(this.fileComment);
      } else {
        var upath = this.findExtraFieldUnicodePath();
        if (upath !== null) {
          this.fileNameStr = upath;
        } else {
          var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
        }
        var ucomment = this.findExtraFieldUnicodeComment();
        if (ucomment !== null) {
          this.fileCommentStr = ucomment;
        } else {
          var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
        }
      }
    },
    findExtraFieldUnicodePath: function() {
      var upathField = this.extraFields[28789];
      if (upathField) {
        var extraReader = readerFor(upathField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
          return null;
        }
        return utf8.utf8decode(extraReader.readData(upathField.length - 5));
      }
      return null;
    },
    findExtraFieldUnicodeComment: function() {
      var ucommentField = this.extraFields[25461];
      if (ucommentField) {
        var extraReader = readerFor(ucommentField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
          return null;
        }
        return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
      }
      return null;
    }
  };
  module2.exports = ZipEntry;
});

// node_modules/jszip/lib/zipEntries.js
var require_zipEntries = __commonJS((exports2, module2) => {
  var readerFor = require_readerFor();
  var utils = require_utils();
  var sig = require_signature();
  var ZipEntry = require_zipEntry();
  var support = require_support();
  function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
  }
  ZipEntries.prototype = {
    checkSignature: function(expectedSignature) {
      if (!this.reader.readAndCheckSignature(expectedSignature)) {
        this.reader.index -= 4;
        var signature = this.reader.readString(4);
        throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
      }
    },
    isSignature: function(askedIndex, expectedSignature) {
      var currentIndex = this.reader.index;
      this.reader.setIndex(askedIndex);
      var signature = this.reader.readString(4);
      var result = signature === expectedSignature;
      this.reader.setIndex(currentIndex);
      return result;
    },
    readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2);
      this.diskWithCentralDirStart = this.reader.readInt(2);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
      this.centralDirRecords = this.reader.readInt(2);
      this.centralDirSize = this.reader.readInt(4);
      this.centralDirOffset = this.reader.readInt(4);
      this.zipCommentLength = this.reader.readInt(2);
      var zipComment = this.reader.readData(this.zipCommentLength);
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      var decodeContent = utils.transformTo(decodeParamType, zipComment);
      this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8);
      this.reader.skip(4);
      this.diskNumber = this.reader.readInt(4);
      this.diskWithCentralDirStart = this.reader.readInt(4);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
      this.centralDirRecords = this.reader.readInt(8);
      this.centralDirSize = this.reader.readInt(8);
      this.centralDirOffset = this.reader.readInt(8);
      this.zip64ExtensibleData = {};
      var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
      while (index < extraDataSize) {
        extraFieldId = this.reader.readInt(2);
        extraFieldLength = this.reader.readInt(4);
        extraFieldValue = this.reader.readData(extraFieldLength);
        this.zip64ExtensibleData[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
    },
    readBlockZip64EndOfCentralLocator: function() {
      this.diskWithZip64CentralDirStart = this.reader.readInt(4);
      this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
      this.disksCount = this.reader.readInt(4);
      if (this.disksCount > 1) {
        throw new Error("Multi-volumes zip are not supported");
      }
    },
    readLocalFiles: function() {
      var i, file;
      for (i = 0;i < this.files.length; i++) {
        file = this.files[i];
        this.reader.setIndex(file.localHeaderOffset);
        this.checkSignature(sig.LOCAL_FILE_HEADER);
        file.readLocalPart(this.reader);
        file.handleUTF8();
        file.processAttributes();
      }
    },
    readCentralDir: function() {
      var file;
      this.reader.setIndex(this.centralDirOffset);
      while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
        file = new ZipEntry({
          zip64: this.zip64
        }, this.loadOptions);
        file.readCentralPart(this.reader);
        this.files.push(file);
      }
      if (this.centralDirRecords !== this.files.length) {
        if (this.centralDirRecords !== 0 && this.files.length === 0) {
          throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        } else {}
      }
    },
    readEndOfCentral: function() {
      var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
      if (offset < 0) {
        var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
        if (isGarbage) {
          throw new Error("Can't find end of central directory : is this a zip file ? " + "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        } else {
          throw new Error("Corrupted zip: can't find end of central directory");
        }
      }
      this.reader.setIndex(offset);
      var endOfCentralDirOffset = offset;
      this.checkSignature(sig.CENTRAL_DIRECTORY_END);
      this.readBlockEndOfCentral();
      if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
        this.zip64 = true;
        offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        if (offset < 0) {
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        }
        this.reader.setIndex(offset);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        this.readBlockZip64EndOfCentralLocator();
        if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
          this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
          if (this.relativeOffsetEndOfZip64CentralDir < 0) {
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          }
        }
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
        this.readBlockZip64EndOfCentral();
      }
      var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
      if (this.zip64) {
        expectedEndOfCentralDirOffset += 20;
        expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
      }
      var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
      if (extraBytes > 0) {
        if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {} else {
          this.reader.zero = extraBytes;
        }
      } else if (extraBytes < 0) {
        throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
      }
    },
    prepareReader: function(data) {
      this.reader = readerFor(data);
    },
    load: function(data) {
      this.prepareReader(data);
      this.readEndOfCentral();
      this.readCentralDir();
      this.readLocalFiles();
    }
  };
  module2.exports = ZipEntries;
});

// node_modules/jszip/lib/load.js
var require_load = __commonJS((exports2, module2) => {
  var utils = require_utils();
  var external = require_external();
  var utf8 = require_utf8();
  var ZipEntries = require_zipEntries();
  var Crc32Probe = require_Crc32Probe();
  var nodejsUtils = require_nodejsUtils();
  function checkEntryCRC32(zipEntry) {
    return new external.Promise(function(resolve, reject) {
      var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe);
      worker.on("error", function(e) {
        reject(e);
      }).on("end", function() {
        if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
          reject(new Error("Corrupted zip : CRC32 mismatch"));
        } else {
          resolve();
        }
      }).resume();
    });
  }
  module2.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
      base64: false,
      checkCRC32: false,
      optimizedBinaryString: false,
      createFolders: false,
      decodeFileName: utf8.utf8decode
    });
    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
      return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }
    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
      var zipEntries = new ZipEntries(options);
      zipEntries.load(data2);
      return zipEntries;
    }).then(function checkCRC32(zipEntries) {
      var promises = [external.Promise.resolve(zipEntries)];
      var files = zipEntries.files;
      if (options.checkCRC32) {
        for (var i = 0;i < files.length; i++) {
          promises.push(checkEntryCRC32(files[i]));
        }
      }
      return external.Promise.all(promises);
    }).then(function addFiles(results) {
      var zipEntries = results.shift();
      var files = zipEntries.files;
      for (var i = 0;i < files.length; i++) {
        var input = files[i];
        var unsafeName = input.fileNameStr;
        var safeName = utils.resolve(input.fileNameStr);
        zip.file(safeName, input.decompressed, {
          binary: true,
          optimizedBinaryString: true,
          date: input.date,
          dir: input.dir,
          comment: input.fileCommentStr.length ? input.fileCommentStr : null,
          unixPermissions: input.unixPermissions,
          dosPermissions: input.dosPermissions,
          createFolders: options.createFolders
        });
        if (!input.dir) {
          zip.file(safeName).unsafeOriginalName = unsafeName;
        }
      }
      if (zipEntries.zipComment.length) {
        zip.comment = zipEntries.zipComment;
      }
      return zip;
    });
  };
});

// node_modules/jszip/lib/index.js
var require_lib3 = __commonJS((exports2, module2) => {
  function JSZip() {
    if (!(this instanceof JSZip)) {
      return new JSZip;
    }
    if (arguments.length) {
      throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }
    this.files = Object.create(null);
    this.comment = null;
    this.root = "";
    this.clone = function() {
      var newObj = new JSZip;
      for (var i in this) {
        if (typeof this[i] !== "function") {
          newObj[i] = this[i];
        }
      }
      return newObj;
    };
  }
  JSZip.prototype = require_object();
  JSZip.prototype.loadAsync = require_load();
  JSZip.support = require_support();
  JSZip.defaults = require_defaults();
  JSZip.version = "3.10.1";
  JSZip.loadAsync = function(content, options) {
    return new JSZip().loadAsync(content, options);
  };
  JSZip.external = require_external();
  module2.exports = JSZip;
});

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
    } catch (err) {
      throw new Error(`[varForcer] Failed to compile patched function: ${err.message}

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
    } catch (err) {
      throw new Error(`[varForcer] Failed to compile patched function: ${err.message}

Generated source:
${source}`);
    }
  }
  module2.exports = { forceFunctionVars, replaceFunctionLiteral, parseDestructuredVars, serializeValue, normalizeFunctionSource };
});

// src/index.tsx
var exports_src = {};
__export(exports_src, {
  default: () => Plugin
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
  CustomCameraPreview: () => cameraPreviewBypass_default,
  ClipsBypass: () => clipsBypass_default,
  ClientThemes: () => clientThemes_default,
  CanUserUse: () => canUserUse_default,
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
    this.profiles = null;
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
  customVideoFilterEnabled: false
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
    return this.users[userId];
  }
  format(userId) {
    const userHash = this.get(userId);
    return `https://usrbg.is-hardly.online/${this.meta.bucket}/${this.meta.prefix.slice(0, this.meta.prefix.length - 1)}/${userId}?${userHash}`;
  }
  hasHash(id) {
    return Boolean(this.users[id]);
  }
  async fetch() {
    const data = await BetterDiscord.Net.fetch(USER_BG);
    const response = await data.json();
    this.meta = { ...this.meta, ["bucket"]: response.bucket, ["prefix"]: response.prefix };
    this.users = response.users;
  }
  unload() {
    this.users = null;
    this.meta = null;
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
    if (revealed != "")
      BadgesStore_default.add(userId);
    return revealed;
  }
  if (userGuildProfile?.bio && userGuildProfile.bio.includes(shouldInclude)) {
    const revealed = secondsightifyRevealOnly(String(userGuildProfile.bio));
    if (revealed != "")
      BadgesStore_default.add(userId);
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
function findMangledName(module2, filter, debugInfo) {
  if (module2) {
    if (typeof filter === "string") {
      filter = (x) => x.toString?.().includes?.(filter);
    }
    let keys = Object.keys(module2);
    let values = Object.values(module2);
    let index = values.findIndex(filter);
    if (index >= 0)
      return keys[index];
    else {
      BetterDiscord.Logger.warn(`Couldn't find name from module for function ${debugInfo} because the filter returned no results.
Filter: `, filter, `
`, module2);
      return null;
    }
  } else {
    BetterDiscord.Logger.warn(`Couldn't find name from module for function ${debugInfo} because the module was undefined. This is not necessarily an error, it may be caused by lazy-loaded modules not being ready yet.`);
    return null;
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
  return matched ? `https://i.imgur.com/${matched}` : UserBackgroundStore_default.format(userId);
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
  PROFILE_FRAME: /pf\d+/
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
function containsProfileV2(revealedSurrogate) {
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
function decodeProfileColors(string) {
  if (!string)
    return null;
  const decoded = secondsightifyRevealOnly(string);
  if (!decoded)
    return null;
  const match = decoded.match(/\[#([a-fA-F0-9]+),#([a-fA-F0-9]+)\]/);
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
      const shouldProfileV2 = SettingsStore_default.get("profileV2");
      const disableUserBadge = SettingsStore_default.get("disableUserBadge");
      const profileThemesEnabled = SettingsStore_default.get("fakeProfileThemes");
      const profileFramesEnabled = SettingsStore_default.get("profileFrames");
      if (!ret)
        return;
      const perServer = getRevealedTextPerServer(userId, `\uDB40`);
      const revealedSurrogate = perServer ?? (ret?.bio ? secondsightifyRevealOnly(ret.bio) : undefined);
      const guildId = SelectedGuildStore2.getGuildId();
      (shouldProfileV2 || ret?.bio?.includes?.(`\uDB40`) || containsProfileV2(revealedSurrogate)) && (ret.premiumType = 2);
      const userBio = ret?.bio;
      if (containsProfileEffects(revealedSurrogate) && !killProfileEffects) {
        let parsed = !revealedSurrogate ? secondsightifyRevealOnly(userBio) : revealedSurrogate;
        if (!parsed)
          return ret;
        if (containsProfileEffects(parsed)) {
          const skuId = extractProfileEffects(parsed);
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
      if (containsProfileFrame(revealedSurrogate) && profileFramesEnabled) {
        const match = extractProfileFrame(revealedSurrogate);
        if (match)
          ret.profileFrame = { skuId: match, expiresAt: undefined };
      }
      return ret;
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
    ["isViewerClippingAllowedForUser", "isClipsEnabledForUser", "isVoiceRecordingAllowedForUse"].map((x) => patcher.instead(ClipsStore, x, (_, __, originalFunction) => {
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

// src/patches/modules/banners.tsx
var { UserStore: UserStore2 } = BetterDiscord.Webpack.Stores;
var TopLeft = styled.div({ zIndex: "100", position: "absolute", padding: "10px" });
var ModalModule = wpGetByKeys(["Modal"]);
function Debug({ user }) {
  const revealedText = getRevealedText(user.id);
  const decorationRevealed = getRevealedText(user.id, `\uDB40\uDC2F\uDB40\uDC61`);
  const nameplateRevealed = getRevealedText(user.id, `\uDB40\uDC6E\uDB40\uDC7B`);
  const pfpRevealed = getRevealedText(user.id, `\uDB40\uDC50\uDB40\uDC7B`);
  const dnsRevealed = getRevealedText(user.id, `\uDB40\uDC53\uDB40\uDC7B`);
  const data = {
    hasBanner: UserBackgroundStore_default.hasHash(user.id),
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
      profileV2: containsProfileV2(revealedText)
    },
    rawRevealedTexts: {
      dns3y3: dnsRevealed,
      decor3y3: decorationRevealed,
      nameplate3y3: nameplateRevealed,
      pfp3y3: pfpRevealed,
      general3y3: revealedText
    },
    badge: BadgesStore_default.check(user.id) ? BadgesStore_default.returnRespondingBadge(user.id).id : "not known user"
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
      const unpatch = patcher.after(ret, "type", (a, b, c) => {
        if (UserBackgroundStore_default.hasHash(props.user.id)) {
          c.props.bannerSrc = getBannerUrl(props.user.id);
        }
        unpatch();
      });
      return BadgesStore_default.isImportant(UserStore2.getCurrentUser().id) ? [/* @__PURE__ */ React.createElement(Debug, {
        user: props.user
      }), ret] : ret;
    });
  }
};
// src/global/stores/FFmpegStore.ts
var { Logger, Net, UI, DOM } = BetterDiscord;
var _path = () => require("path");
var fs = () => require("fs");
var BASE_URL = `https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg/`;
var FFmpegStore_default = new class FFmpegStore extends BetterDiscord.Utils.Store {
  ffmpeg;
  loaded = false;
  crcTable;
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
        let file = tryFetchFromDisk("ffmpeg.js", "text/javascript");
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
      UI.showToast("An error occured trying to load FFmpeg.wasm. Check console for details.", { type: "error", forceShow: true });
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
  calculateCrcTable() {
    this.crcTable = Array.from({ length: 256 }, (_, i) => Array.from({ length: 8 }, (_2, j) => j).reduce((crc) => crc & 1 ? crc >>> 1 ^ 3988292384 : crc >>> 1, i));
  }
  getCrcTable() {
    if (!this.crcTable)
      this.calculateCrcTable();
    return this.crcTable;
  }
  unload() {
    if (this.loaded) {
      this.ffmpeg.terminate();
      this.ffmpeg = undefined;
    }
    const ffmpegScript = document.getElementById("ffmpegScript");
    ffmpegScript && ffmpegScript.remove();
    this.crcTable = null;
    if (window.FFmpegWASM)
      delete window.FFmpegWASM;
    this.loaded = false;
  }
  getFFmpegInstance() {
    return this.ffmpeg;
  }
};

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
function createZip(name, data) {
  const nameBytes = new TextEncoder().encode(name);
  const dataBytes = new Uint8Array(data);
  const crcTable = FFmpegStore_default.getCrcTable();
  let crc = -1;
  const len = dataBytes.length;
  for (let i = 0;i < len; i++) {
    crc = crc >>> 8 ^ crcTable[(crc ^ dataBytes[i]) & 255];
  }
  crc = (crc ^ -1) >>> 0;
  const dataLength = dataBytes.length;
  const headerLength = 30 + nameBytes.length;
  const localHeader = new DataView(new ArrayBuffer(headerLength));
  localHeader.setUint32(0, 67324752, true);
  localHeader.setUint16(4, 2560, true);
  localHeader.setUint32(14, crc, true);
  localHeader.setUint32(18, dataLength, true);
  localHeader.setUint32(22, dataLength, true);
  localHeader.setUint16(26, nameBytes.length, true);
  new Uint8Array(localHeader.buffer).set(nameBytes, 30);
  const centralDir = new DataView(new ArrayBuffer(46 + nameBytes.length));
  centralDir.setUint32(0, 33639248, true);
  centralDir.setUint16(6, 2560, true);
  centralDir.setUint32(16, crc, true);
  centralDir.setUint32(20, dataLength, true);
  centralDir.setUint32(24, dataLength, true);
  centralDir.setUint16(28, nameBytes.length, true);
  new Uint8Array(centralDir.buffer).set(nameBytes, 46);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 101010256, true);
  end.setUint16(8, 1, true);
  end.setUint16(10, 1, true);
  end.setUint32(12, centralDir.buffer.byteLength, true);
  end.setUint32(16, headerLength + dataLength, true);
  const totalSize = localHeader.buffer.byteLength + dataBytes.length + centralDir.buffer.byteLength + end.buffer.byteLength;
  const result = new Uint8Array(totalSize);
  let offset = 0;
  [localHeader.buffer, dataBytes, centralDir.buffer, end.buffer].forEach((buf) => {
    result.set(new Uint8Array(buf), offset);
    offset += buf.byteLength || buf.length;
  });
  return result;
}
async function doClipsBypass(file) {
  const { useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp } = SettingsStore_default.getAll();
  const skippedFileTypes = ["video/3gp", "video/asf", "video/ivf", "video/mpeg", "audio/mid", "audio/basic", "audio/mpegurl", "audio/3gp"];
  if (skippedFileTypes.includes(file.file.type))
    return file;
  const movTypes = ["video/flv", "video/ogg", "video/wmv", "video/mov", "audio/wav", "audio/aiff", "audio/x-ms-wma", "audio/mpeg"];
  let outFileName = movTypes.includes(file.file.type) ? "output.mov" : "output.mp4";
  const clipData = {
    id: 0n,
    createdAt: 0,
    version: 3,
    applicationName: "",
    applicationId: "1301689862256066560",
    users: [
      UserStore3.getCurrentUser().id
    ],
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
    file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
    modifiedFile = true;
  } else if (useAudioClipBypass && (file.file.size > FREE_FILE_LIMIT || forceAudioClip) && (file.file.type.startsWith("audio/") && file.file.size <= CLIPS_FILE_LIMIT)) {
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
    file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
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
    const archiveMimeTypes = ["x-7z-compressed", "x-bzip", "x-bzip2", "x-rar-compressed", "x-tar", "gzip", "x-gzip", "zip", "x-zip-compressed"];
    const videoArrayBuffer = await ffmpegTransmux(undefined, "", clipMaFFmpegArgs, "output.mp4");
    const clipMaBuffer = concatArrayBuffers(videoArrayBuffer, udtaBuffer);
    if (!clipMaBuffer)
      return file;
    if (archiveMimeTypes.includes(file.file.type.replace("application/", ""))) {
      const arrayBuffer = await file.file.arrayBuffer();
      const newArrBuf = concatArrayBuffers(clipMaBuffer, arrayBuffer);
      file.file = new File([new Uint8Array(newArrBuf)], file.file.name + ".mp4", { type: "video/mp4" });
      clipData.name = file.file.name;
    } else {
      let fileExtension = file.file.name.substring(file.file.name.lastIndexOf(".") + 1);
      const arrayBuffer = await file.file.arrayBuffer();
      const zipFile = createZip(file.file.name, arrayBuffer).buffer;
      const zipArrayBuffer = concatArrayBuffers(clipMaBuffer, zipFile);
      clipData.name = fileExtension.match(/z?\d+/) ? file.file.name + ".zip" : clipData.name += ".zip";
      file.file = new File([new Uint8Array(zipArrayBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
    }
    modifiedFile = true;
  }
  modifiedFile && (file.clip = clipData);
  return file;
}
function genericErrorHandler(err, currentFile = undefined) {
  BetterDiscord.UI.showToast("Something went wrong. See console for details.", { type: "error", forceShow: true });
  BetterDiscord.Logger.error(err);
  if (currentFile) {
    BetterDiscord.Logger.info("Current file information for debugging:", currentFile);
    BetterDiscord.Logger.info(`File Type: "${currentFile?.file?.type}"`);
  }
}
var clipsBypass_default = {
  name: "Clips Bypass",
  description: "Modify files to be sendable as a clip, changing the file upload limit to 100MB.",
  ids: undefined,
  waitFor: [(x) => x.addFiles],
  apply(finale, patcher) {
    patcher.instead(finale.modules[0], "addFiles", async (_, [args], originalFunction) => {
      const { useClipBypass, useAudioClipBypass, zipClip } = SettingsStore_default.getAll();
      if (!args?.files?.length || !useClipBypass && !useAudioClipBypass && !zipClip)
        return originalFunction.apply(_, [args]);
      args.files = await Promise.all(args.files.map(async (currentFile) => {
        try {
          currentFile = await doClipsBypass(currentFile) ?? currentFile;
        } catch (err) {
          genericErrorHandler(err, currentFile);
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
var CloudUploader = BetterDiscord.Webpack.getByPrototypeKeys("uploadFileToCloud", { searchExports: true });
async function downloadAndUploadUrls(filesToDownload, channelId, msg, extraData, send2, numFilesInMessage = 1, alwaysSendInNewMessage = false) {
  if (!filesToDownload.length)
    return;
  const preexisting = extraData.attachmentsToUpload ?? [];
  extraData.attachmentsToUpload = preexisting;
  const uploads = await Promise.all(filesToDownload.map(async (f) => {
    const blob = await BetterDiscord.Net.fetch(f.url).then((r) => r.blob());
    return new CloudUploader({ file: new File([blob], f.filename), isClip: false, isThumbnail: false, platform: 1, isImage: true }, channelId, false, 0);
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
  waitFor: [(x) => x._sendMessage],
  apply(finale, patcher) {
    patcher.instead(finale.modules[0], "_sendMessage", async (_, [channelId, msg, extraData], send2) => {
      if (extraData.poll || extraData.activityAction || msg.location === "forwarding")
        return send2.apply(_, [channelId, msg, extraData]);
      const emojiBypassType = SettingsStore_default.get("emojiBypassType");
      const { zipClip, useClipBypass, useAudioClipBypass, stickerBypass, soundmojiEnabled, emojiBypass } = SettingsStore_default.getAll();
      let urlsToUpload = [];
      for (let i = 0;i < msg.validNonShortcutEmojis.length; i++) {
        const emoji = msg.validNonShortcutEmojis[i];
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
            msg.content = msg.content.replace(emojiString, `[${emoji.name}](${emojiUrl}&${i})`);
            break;
          case 2:
            msg.content = msg.content.replace(emojiString, `${emojiUrl}&${i}`);
            break;
        }
      }
      if (extraData.stickerIds && stickerBypass) {
        for (const stickerId of extraData.stickerIds) {
          const STICKER_PREFIX = "https://media.discordapp.net/stickers/";
          const sticker = StickersStore.getStickerById(stickerId);
          let extension = StickerTypeToExtension[sticker.format_type];
          urlsToUpload.push({
            url: `${STICKER_PREFIX + stickerId + extension}?size=4096&quality=lossless`,
            filename: `${sticker.name}${extension}`
          });
        }
        extraData.stickerIds = [];
      }
      let soundmojiUrls = [];
      if (soundmojiEnabled) {
        const SOUNDBOARD_PREFIX = "https://cdn.discordapp.com/soundboard-sounds/";
        const soundmojiStrings = msg.content.match(SOUNDMOJI_REGEX);
        const soundmojiObjects = soundmojiStrings?.map?.((x) => SoundboardStore.getSoundById(x?.split?.(":")?.[2]?.slice?.(0, -1)));
        soundmojiObjects?.forEach?.((x) => soundmojiUrls.push({
          url: SOUNDBOARD_PREFIX + x.soundId,
          filename: x.name + ".ogg"
        }));
        for (let i = 0;i < soundmojiObjects?.length; i++) {
          const sound = soundmojiObjects[i];
          if (!sound)
            continue;
          const soundmojiString = soundmojiStrings[i];
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
    ["isEmojiFilteredOrLocked", "isEmojiDisabled", "isEmojiFiltered", "isEmojiPremiumLocked"].map((x) => patcher.instead(finale.modules[0], x, (_, args, callback) => {
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
  waitFor: [(x) => x.getEmojiURL],
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
    if (!appIconsEnabled)
      return;
    appIconsEnabled && GlobalModules.Dispatcher.dispatch({
      type: "APP_ICON_UPDATED",
      id: SettingsStore_default.get("appIcon")
    });
    const AppIcon = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("M19.73 4.87a18.2"), {
      render: (x) => x
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
var LadderModule = BetterDiscord.Webpack.getByKeys("calculateLadder", { searchExports: true });
var streamBypass_default = {
  name: "streamBypass",
  description: "Custom Bitrates, FPS, Resolution",
  waitFor: [BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality"), BetterDiscord.Webpack.Filters.bySource("preset)&&", "resolution&&", "fps&&")],
  apply(finale, patcher) {
    const _class = finale.modules[0];
    patcher.before(_class.prototype, "updateVideoQuality", (e) => {
      const { CustomBitrateEnabled, minBitrate, targetBitrate, maxBitrate, voiceBitrate } = SettingsStore_default.getAll();
      const vqm = e.videoQualityManager;
      const vqmOpt = vqm.options;
      if (CustomBitrateEnabled) {
        vqmOpt.desktopBitrate.min = minBitrate > 0 ? minBitrate * 1000 : 500000;
        vqmOpt.desktopBitrate.target = targetBitrate > 0 ? targetBitrate * 1000 : 4500000;
        vqmOpt.desktopBitrate.max = maxBitrate > 0 ? maxBitrate * 1000 : 9000000;
      }
      const maxVideoQuality = {
        width: e.videoStreamParameters[0].maxResolution.width,
        height: e.videoStreamParameters[0].maxResolution.height
      };
      let videoCapture = {
        width: maxVideoQuality.width > 0 ? maxVideoQuality.width : screen.width,
        height: maxVideoQuality.height > 0 ? maxVideoQuality.height : screen.height,
        framerate: e.videoStreamParameters[0].maxFrameRate
      };
      voiceBitrate > 0 && (e.voiceBitrate = voiceBitrate * 1000);
      vqmOpt.videoBudget = videoCapture;
      vqmOpt.videoCapture = videoCapture;
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
// src/patches/modules/gifPickerContext.tsx
var GIFPickerRender = BetterDiscord.Webpack.getByPrototypeKeys("renderGIF", { searchExports: true });
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
  Connection: (x) => x?.prototype?.getCodecOptions
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
  getMaxFileSize: (x) => x.toString().includes("getUserMaxFileSize"),
  exceedsMessageSizeLimit: (x) => x.toString().includes("Array.from(", ".size>")
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
          setSize({ width: ResizeObserverEntry[0].contentRect.width, height: ResizeObserverEntry[0].contentRect.height });
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
  waitFor: [BetterDiscord.Webpack.Filters.bySource("VideoStream", "videoComponent"), BetterDiscord.Webpack.Filters.bySource("backgroundKey", "onForceIdle")],
  apply(finale, patcher) {
    const mod = Object.values(finale.modules[0]).find((x) => x.type);
    patcher.after(mod, "type", (_, [args], ret) => {
      if (!SettingsStore_default.get("sharpenStreams"))
        return;
      ret.props.children.push(/* @__PURE__ */ React2.createElement(Sharpener, {
        userId: args.userId
      }));
      ret?.props?.children?.[0] && (ret.props.children[0].props.style = { filter: `url(#yabd-svgSharpen-${args.userId})` });
    });
    patcher.after(finale.modules[1], findMangledName(finale.modules[1], (x) => x?.toString?.()?.includes?.("backgroundKey")), (_, [args], ret) => {
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
  getStickerSendability: (x) => x.toString().includes("canUseCustomStickersEverywhere"),
  isSendableSticker: (x) => typeof x === "function" && !x.toString().includes("canUseCustomStickersEverywhere")
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
      for (let i = 0;i < args.content.length; i++) {
        let contentItem = args.content[i];
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
        args.content[i] = emojiElem;
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
    renderEmbeds: (x) => x?.toString?.().includes?.("renderSuppressEmbeds")
  },
  apply(finale, patcher) {
    patcher.before(finale.mangled, "renderEmbeds", (_, [args]) => {
      if (!SettingsStore_default.get("fakeInlineVencordEmotes"))
        return;
      const message = args?.message;
      let embeds = message?.embeds;
      for (let i = 0;i < embeds?.length; i++) {
        const embed = embeds[i];
        if (!embed?.url || !embed?.url?.startsWith(EMOJI_PREFIX) || message.content.replace(EMOJI_HYPERLINK_REGEX, "").trim() == "" || !args.message.content.includes(`](${embed.url})`))
          continue;
        delete embeds[i];
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
  waitFor: [(x) => x._sendMessage],
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
      for (let i = 0;i < matches?.length; i++) {
        const emojiString = matches[i];
        let emojiId = emojiString.replace("<", "").replace(">", "").split(":")[2];
        const emoji = EmojiStore2.getCustomEmojiById(emojiId);
        if (shouldSkipEmojiBypass(emoji, channelId))
          continue;
        const emojiUrl = getEmojiUrl(emoji);
        switch (emojiBypassType) {
          case 0:
          case 1:
          case 3:
            msg.content = msg.content.replace(emojiString, `[${emoji.name}](${emojiUrl}&${i})`);
            break;
          case 2:
            msg.content = msg.content.replace(emojiString, `${emojiUrl}&${i}`);
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
  state: (x) => x?.setState
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
  waitFor: [BetterDiscord.Webpack.Filters.bySource("changes:{appearance:{settings:{clientThemeSettings:{")],
  mangled: {
    saveClientTheme: (x) => x?.toString?.()?.includes?.("SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE")
  },
  apply(finale, patcher) {
    if (SettingsStore_default.get("clientThemes"))
      applySavedClientTheme();
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
  waitFor: [BetterDiscord.Webpack.Filters.bySource("getSelectedParticipant", "CHANNEL_CALL_POPOUT", "avatarDecoration", "backgroundSrc", "getAvatarURL")],
  apply(finale, patcher) {
    patcher.after(finale.modules[0], findMangledName(finale.modules[0], (x) => x.toString?.().includes?.("getSelectedParticipant"), "UserCallTile"), (_, [args], ret) => {
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
// src/global/stores/GoLiveStore.ts
var GoLiveStore_default = new class GoLiveStore extends BetterDiscord.Utils.Store {
  getConfig() {
    const settings = SettingsStore_default.getAll();
    return {
      maxBitrate: settings.maxBitrate,
      minBitrate: settings.minBitrate,
      fps: settings.CustomFPS,
      targetBitrate: settings.targetBitrate,
      voiceBitrate: settings.voiceBitrate,
      videoCodec: settings.videoCodec2,
      resolution: settings.CustomResolution
    };
  }
  isEnabled() {
    const d = SettingsStore_default.getAll();
    return {
      isResolutionEnabled: d.ResolutionEnabled,
      isBitrateEnabled: d.CustomBitrateEnabled
    };
  }
};

// src/patches/modules/goLiveModal.tsx
var { React: React5, Components } = BetterDiscord;
var { ApplicationStreamingSettingsStore } = BetterDiscord.Webpack.Stores;
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
var TYPE_MAP = {
  CustomFPS: "set_fps",
  CustomResolution: "set_resolution",
  maxBitrate: "set_max_bitrate",
  minBitrate: "set_min_bitrate",
  targetBitrate: "set_target_bitrate",
  voiceBitrate: "set_voice_bitrate"
};
var FIELD_MAP = {
  CustomFPS: "fps",
  CustomResolution: "resolution",
  maxBitrate: "maxBitrate",
  minBitrate: "minBitrate",
  targetBitrate: "targetBitrate",
  voiceBitrate: "voiceBitrate"
};
var StreamingModule = wpGetProxy(wpFilter.bySource("GQgGHISKZ5aYqYeYhX9isDUHGw"), { raw: true });
function ConfigModal({ props, onClose, forceQuality }) {
  const data = BetterDiscord.Hooks.useStateFromStores([SettingsStore_default], () => SettingsStore_default.getAll());
  const [_, setData] = React5.useState(() => SettingsStore_default.getAll());
  const commit = (key, value) => {
    SettingsStore_default.set(key, value);
    setData((prev) => ({ ...prev, [key]: value }));
    const type = TYPE_MAP[key];
    const field = FIELD_MAP[key];
    if (!type || !field) {
      return;
    }
    forceQuality(type, { [field]: value });
  };
  const applyMode = (patch) => {
    Object.entries(patch).forEach(([key, value]) => SettingsStore_default.set(key, value));
    setData((prev) => ({ ...prev, ...patch }));
    if ("CustomResolution" in patch) {
      forceQuality("set_resolution", { resolution: patch.CustomResolution });
    }
    if ("CustomFPS" in patch) {
      forceQuality("set_fps", { fps: patch.CustomFPS });
    }
  };
  const fields = [
    { key: "CustomFPS", label: "FPS" },
    { key: "CustomResolution", label: "Resolution" },
    { key: "maxBitrate", label: "Max Bitrate" },
    { key: "minBitrate", label: "Min Bitrate" },
    { key: "targetBitrate", label: "Target Bitrate" },
    { key: "voiceBitrate", label: "Voice Bitrate" }
  ];
  return /* @__PURE__ */ React5.createElement(ModalModule2.Modal, {
    notice: { type: "warning", message: GlobalModules.SimpleMarkdownWrapper.parse("**Everything changed here will instantly apply. Not like anything here can crash you but be weary**") },
    ...props,
    onClose,
    title: "YABDP4Nitro Configuration"
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
  const [start, dispatch] = StreamingModule.declarations.eG();
  const forceQuality = (type, value) => {
    dispatch({ type, ...value });
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
    tooltip: "YABDP4Nitro Configuration",
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
  ids: [async () => await BetterDiscord.Webpack.waitForModule(BetterDiscord.Webpack.Filters.bySource("allowOneClickGoLive:"), { raw: true }).then((x) => x.id)],
  waitFor: [LIVE_FILTER],
  apply(finale, patcher) {
    this._removeInterceptor = GlobalModules.Dispatcher.addInterceptor((action) => {
      const config = GoLiveStore_default.getConfig();
      if (action?.type === "MEDIA_ENGINE_SET_GO_LIVE_SOURCE" && action.settings?.qualityOptions != null) {
        action.settings.qualityOptions.resolution = config.resolution;
        action.settings.qualityOptions.frameRate = config.fps;
      }
      if (action?.type === "STREAM_UPDATE_SETTINGS") {
        action.resolution = config.resolution;
        action.frameRate = config.fps;
      }
      return false;
    });
    const mod = getKey(validatorMod.declarations, BetterDiscord.Webpack.Filters.byStrings("canStreamWithSettings"));
    patcher.instead(mod?.module, mod?.key, () => true);
    patcher.after(finale.modules[0], "default", (_, [args], ret) => {
      const removeScreenshareUpsell = SettingsStore_default.get("removeScreenshareUpsell");
      const footer = BetterDiscord.Utils.findInTree(ret, (x) => String(x?.className).startsWith("footer"));
      if (!footer)
        return ret;
      const footerContent = BetterDiscord.Utils.findInTree(footer, (x) => String(x?.className).startsWith("footerContent"));
      if (!footerContent)
        return ret;
      if (removeScreenshareUpsell) {
        footer.children = footer.children.filter((x) => !x?.props?.className.startsWith("upsell"));
        footerContent.children[1].props.children = footerContent.children[1].props.children.filter((x) => !x?.type?.toString?.()?.includes("pill"));
      }
      if (SettingsStore_default.get("screenSharing")) {
        const doesExist = BetterDiscord.Utils.findInTree(footerContent, (x) => String(x?.key).includes("gay"));
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
var { UserProfileStore: UserProfileStore3, UserStore: UserStore4 } = BetterDiscord.Webpack.Stores;
var { React: React6, Components: Components2 } = BetterDiscord;
function AccentColors() {
  const CurrentUser = UserStore4.getCurrentUser();
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
      copyToClipboard(secondsightifyEncodeOnly(`[${primary},${accent}]`), "3y3 copied to clipboard!");
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
      width: "180px !important",
      maxWidth: "180px !important"
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
  return /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement(Components4.TextInput, {
    placeholder: "Banner Imgur URL",
    onChange: (e) => setUrl(e)
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
var { UserStore: UserStore5 } = BetterDiscord.Webpack.Stores;
var FONTS = [
  "GG Sans",
  "Tempo",
  "Sakura",
  "Jellybean",
  "Modern",
  "Medieval",
  "8Bit",
  "Vampyre",
  "Monkey Bars",
  "Mainframe",
  "Headbang",
  "Journal"
];
var EFFECTS = {
  Solid: [15724529],
  Gradient: [2797222, 16762000],
  Neon: [6888941],
  Toon: [15999128],
  Pop: [1036166]
};
function FontButton({ onClick, selected, fontFamily }) {
  return /* @__PURE__ */ React9.createElement(Components5.Button, {
    style: {
      fontFamily,
      color: "var(--text-default)",
      backgroundColor: "var(--control-secondary-background-default)",
      border: selected ? "1px solid white" : "none",
      margin: "0px 5px 5px 0px",
      display: "inline-block"
    },
    onClick
  }, fontFamily);
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
  const UserNameWithEffects = wpGet(BetterDiscord.Webpack.Filters.bySource("UserNameWithEffects"), { declaration: (x) => String(x.type).includes("UserNameWithEffects") });
  const [fontId, setFontId] = React9.useState(0);
  const [effectId, setEffectId] = React9.useState(0);
  const [colors, setColors] = React9.useState({
    primary: "#ffffff",
    accent: "#000000"
  });
  return /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("div", {
    style: { fontSize: "25px" }
  }, /* @__PURE__ */ React9.createElement(UserNameWithEffects, {
    userName: UserStore5.getCurrentUser().username,
    loop: true,
    shouldWrap: false,
    inProfile: true,
    effectDisplayType: 1,
    displayNameStyles: {
      colors: [colors.primary, colors.accent].filter(Boolean).map((x) => parseInt(x.replace("#", "0x"), 16)),
      effectId,
      fontId
    }
  })), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Font"), Object.values(FONTS).map((_fontId, index) => {
    return /* @__PURE__ */ React9.createElement(FontButton, {
      fontFamily: _fontId,
      selected: fontId == index,
      onClick: () => setFontId(index)
    });
  }), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Effect"), Object.entries(EFFECTS).map((effect, i) => {
    const data = {
      effectName: effect[0],
      effectColors: effect[1],
      effectId: i
    };
    return /* @__PURE__ */ React9.createElement(EffectButton, {
      onClick: () => setEffectId(i),
      selected: effectId === i,
      data,
      colors: data.effectColors
    }, data.effectName);
  }), /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Primary Color"), /* @__PURE__ */ React9.createElement(Components5.ColorInput, {
    value: colors.primary,
    onChange: (e) => {
      setColors({ primary: e, accent: colors.accent });
    }
  }), effectId === 1 ? /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Text, null, "Secondary Color"), /* @__PURE__ */ React9.createElement(Components5.ColorInput, {
    value: colors.accent,
    onChange: (e) => {
      setColors({ primary: colors.primary, accent: e });
    }
  })) : null, /* @__PURE__ */ React9.createElement("br", null), /* @__PURE__ */ React9.createElement(Components5.Button, {
    onClick: () => {
      const PRIMARY_COLOR_DECIMAL = parseInt(colors.primary.replace("#", ""), 16);
      const SECONDARY_COLOR_DECIMAL = parseInt(colors.accent.replace("#", ""), 16);
      const colorString = effectId === 1 ? `${PRIMARY_COLOR_DECIMAL},${SECONDARY_COLOR_DECIMAL}` : PRIMARY_COLOR_DECIMAL;
      copyToClipboard(secondsightifyEncodeOnly(`S{${fontId + 1},${effectId + 1},${colorString}}`), "3y3 copied to clipboard!");
    }
  }, "Copy 3y3"));
}
// src/global/quests/index.ts
var invalid = [{ sku_id: "7", name: "Misc Profile Frames", summary: "Some of these Profile Frames are test items and probably won't be released.", store_listing_id: "7", unpublished_at: null, updated_at: "2025-12-13T20:29:23.724931+00:00", assets: { id: {}, json: {}, url: { catalog_banner: "https://cdn.yapper.shop/assets/266.png", hero_banner: "https://cdn.discordapp.com/media/v1/collectibles-shop/7e888fbe66160078e326050782ef86357d0e45dba8c4d6a1e21f43a15df78de2", pdp_bg: "https://cdn.yapper.shop/assets/264.png" }, overrides: {} }, text_config: {}, limited: false, products: [{ sku_id: "1493976288711672008", product_id: "1493976409180209192", name: "[IGNORE - DUPLICATE] Lofi Skyline", summary: "Elevate and wrap your profile with a frame.", store_listing_id: "1493976288711672008", updated_at: "2026-07-10T16:05:51.809797+00:00", prices: { "0": { country_prices: { country_code: "NZ", prices: [{ amount: 599, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "NZ", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ inner_width: 1200, label: "A glowing neon cityscape in purple, pink, and blue stretches across the top of the profile against a dark night sky", layers: [{ anchor: "top", id: "1511883747903934664", order: "back", responsive: false, type: "staple" }], overflow_bottom: 0, overflow_horizontal: 0, overflow_top: 304, sku_id: "1493976288711672008", type: 3 }], type: 3, premium_type: 0, google_sku_ids: { "5": "1493976288711672008_1493977764582133880", "7": "1493976288711672008_1493977772954091640" }, badge_override: "New" }, { sku_id: "1491912717454540830", product_id: "1491963385636716587", name: "Do Not Use - Y2K", summary: "Elevate and wrap your profile with a frame.", store_listing_id: "1491912717454540830", updated_at: "2026-07-14T18:44:41.333873+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 599, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ inner_width: 1200, label: "A chromatic border wraps around your profile", layers: [{ anchor: "center", id: "1511909030375981056", order: "front", responsive: false, type: "border" }, { anchor: "top", id: "1511909034461102151", order: "front", responsive: false, type: "staple" }, { anchor: "bottom", id: "1511909040752431114", order: "front", responsive: false, type: "staple" }], overflow_bottom: 207, overflow_horizontal: 56, overflow_top: 209, sku_id: "1491912717454540830", type: 3 }], type: 3, premium_type: 0, google_sku_ids: {} }, { sku_id: "1491880600054005780", product_id: "1491963376925151272", name: "Shoujo", summary: "Frame your profile.", store_listing_id: "1491880600054005780", updated_at: "2026-06-15T20:01:40.498713+00:00", prices: { "0": { country_prices: { country_code: "NZ", prices: [{ amount: 599, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "NZ", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 3, sku_id: "1491880600054005780", label: "Anime-style character design and vibrant colors frame your profile like a shoujo manga panel", layers: [{ id: "1511887478381088778", type: "staple", order: "front", anchor: "top", responsive: false }, { id: "1511887481904300224", type: "staple", order: "front", anchor: "bottom", responsive: false }], inner_width: 1200, overflow_top: 126, overflow_bottom: 116, overflow_horizontal: 56 }], type: 3, premium_type: 0, google_sku_ids: {} }, { sku_id: "1489397732144844902", product_id: "1489441240297767072", name: "Do Not Use - Astrology", summary: "Frame your profile.", store_listing_id: "1489397732144844902", updated_at: "2026-07-14T21:18:39.821763+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 1299, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 999, currency: "usd", exponent: 2 }] } } }, items: [{ inner_width: 1200, label: "Astrological symbols and cosmic elements frame your profile like a zodiac chart", layers: [{ anchor: "center", id: "1511836597438648501", order: "front", responsive: false, type: "border" }, { anchor: "center", id: "1511836603969179879", order: "front", responsive: true, type: "rail" }, { anchor: "top", id: "1511836607232344277", order: "front", responsive: false, type: "staple" }, { anchor: "bottom", id: "1511836611158216865", order: "front", responsive: false, type: "staple" }], overflow_bottom: 127, overflow_horizontal: 56, overflow_top: 304, sku_id: "1489397732144844902", type: 3 }], type: 3, premium_type: 0, google_sku_ids: {} }, { sku_id: "1484726324592640052", product_id: "1486878382338871336", name: "Do Not Use - Fantasy Galaxy", summary: "Elevate and wrap your profile with a frame.", store_listing_id: "1484726324592640052", updated_at: "2026-07-14T18:40:39.195598+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 599, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ inner_width: 1200, label: "A swirl of stars and cosmic dust frames your profile like a pocket galaxy", layers: [{ anchor: "top", id: "1512141939426984117", order: "front", responsive: true, type: "rail" }, { anchor: "top", id: "1511907713653801031", order: "front", responsive: false, type: "staple" }, { anchor: "top", id: "1511907717302849676", order: "back", responsive: false, type: "staple" }], overflow_bottom: 0, overflow_horizontal: 56, overflow_top: 291, sku_id: "1484726324592640052", type: 3 }], type: 3, premium_type: 0, google_sku_ids: {} }] }, { sku_id: "1478820291382743227", name: "1478820291382743227", summary: null, store_listing_id: "1478820291382743227", unpublished_at: null, updated_at: "2026-04-03T17:06:45.222554+00:00", assets: { id: {}, json: {}, url: {}, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/260.png", hero_banner: "https://cdn.yapper.shop/assets/265.png" } }, text_config: {}, limited: true, products: [{ sku_id: "1478820329936650464", product_id: "1478820537928253501", name: "Nitro Control", summary: "Make your name stand out in servers and chats.", store_listing_id: "1478820329936650464", updated_at: "2026-04-02T17:36:12.547504+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1478820329936650464", asset: "nameplates/rocketship/1478820329936650464/", assets: { static_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1478820329936650464/static", animated_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1478820329936650464/animated", video_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1478820329936650464/video" }, label: "A chrome rocket ship sails through the galaxy.", palette: "cobalt" }], type: 2, premium_type: 2, google_sku_ids: {} }] }, { sku_id: "1464327525974151412", name: "OOSLA", summary: " ", store_listing_id: "1464327525974151412", unpublished_at: null, updated_at: "2026-04-03T17:05:21.724931+00:00", assets: { id: {}, json: {}, url: { pdp_bg: "https://cdn.discordapp.com/media/v1/collectibles-shop/ab752765ee8f6ef7476ec945daece35402d661524af4702eb854f50002b1ff99" }, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/258.png", hero_banner: "https://cdn.yapper.shop/assets/259.png" } }, text_config: {}, limited: true, products: [{ sku_id: "1464327740780974167", product_id: "1464327740780974166", name: "Unicorns are Awesome", summary: "Give your avatar a new look.", store_listing_id: "1464327740780974167", updated_at: "2026-06-04T15:26:24.487192+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 1299, currency: "usd", exponent: 2 }, { amount: 8900, currency: "discord_orb", exponent: 0 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 199, currency: "usd", exponent: 2 }, { amount: 8900, currency: "discord_orb", exponent: 0 }] } } }, items: [{ type: 0, sku_id: "1464327740780974167", asset: "a_921cb9bb7fa35700cb767dd47396ecf0", assets: { static_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1464327740780974167/static", animated_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1464327740780974167/animated" }, label: "labels are cool" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1487099062355361994", product_id: "1487099212544868372", name: "Bug Catcher Wumpus", summary: "Give your avatar a new look.", store_listing_id: "1487099062355361994", updated_at: "2026-03-27T14:41:21.263849+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1487099062355361994", asset: "a_bf2d3895c0832219237c057470a32eb1", assets: { static_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1487099062355361994/static", animated_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1487099062355361994/animated" }, label: "OOSLA Quest Deco" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1488553242555187391", product_id: "1488553474097418240", name: "Hakuna Bug-tata", summary: "Make your name stand out in servers and chats.", store_listing_id: "1488553242555187391", updated_at: "2026-03-31T15:00:04.226628+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1488553242555187391", asset: "nameplates/hakuna_bug-tata/1488553242555187391/", assets: { static_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1488553242555187391/static", animated_image_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1488553242555187391/animated", video_url: "https://cdn.discordapp.com/media/v1/collectibles-shop/1488553242555187391/video" }, label: "OOSLA Quest Deco", palette: "forest" }], type: 2, premium_type: 0, google_sku_ids: {} }] }, { sku_id: "1349486948942745691", name: "Holidays", summary: " ", store_listing_id: "1349486948942745691", unpublished_at: null, updated_at: "2026-04-03T17:03:05.317375+00:00", assets: { id: {}, json: {}, url: { logo: "https://cdn.discordapp.com/assets/content/13b75baaf783e20c7e4e510dcce87b64b2abb312a8d404b2b738f1c3360b75b4", pdp_bg: "https://cdn.discordapp.com/assets/content/4ccefbccb391438e21547b3429f3b03a4186eba90673e0406e63bb576ffac6b4" }, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/238.png", hero_banner: "https://cdn.yapper.shop/assets/239.png" } }, text_config: {}, limited: false, products: [] }, { sku_id: "1344802365307621427", name: "Nameplate Test", summary: "Some of these Nameplates are test items and probably won't be released.", store_listing_id: "1344802365307621427", unpublished_at: null, updated_at: "2026-04-03T17:05:21.724931+00:00", assets: { id: { banner: "1344802365328461864" }, json: {}, url: {}, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/235.png", hero_banner: "https://cdn.yapper.shop/assets/199.png" } }, text_config: {}, limited: true, products: [{ sku_id: "1344802364934062152", product_id: "1463960081245802569", name: "Angel", summary: "It's angel time", store_listing_id: "1344802364934062152", updated_at: "2026-04-03T17:02:50.723493+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802364934062152", asset: "nameplates/nameplatetest/angel/", label: "It's angel time", palette: "bubble_gum" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802364934062152_1346928214479605800", "7": "1344802364934062152_1346928240908042341" } }, { sku_id: "1344802364971946054", product_id: "1463960081740599346", name: "Aurora", summary: "It's aurora time", store_listing_id: "1344802364971946054", updated_at: "2026-04-03T17:02:51.067779+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802364971946054", asset: "nameplates/nameplatetest/aurora/", label: "It's aurora time", palette: "teal" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802364971946054_1346927871964352521", "7": "1344802364971946054_1346927898187141221" } }, { sku_id: "1344802364992782366", product_id: "1463960082810409186", name: "Cherry Blossom", summary: "It's cherry blossom time", store_listing_id: "1344802364992782366", updated_at: "2026-04-03T17:02:51.674951+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802364992782366", asset: "nameplates/nameplatetest/cherry_blossom/", label: "It's cherry blossom time", palette: "berry" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802364992782366_1346931900748533801", "7": "1344802364992782366_1346931928200253440" } }, { sku_id: "1344802365013753962", product_id: "1463960083527504036", name: "Dark Fantasy", summary: "It's dark fantasy time", store_listing_id: "1344802365013753962", updated_at: "2026-04-03T17:02:51.894352+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365013753962", asset: "nameplates/nameplatetest/dark_fantasy/", label: "It's dark fantasy time", palette: "violet" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365013753962_1346929552072638544", "7": "1344802365013753962_1346929577431404635" } }, { sku_id: "1344802365038919680", product_id: "1463960084638863626", name: "Dreamy", summary: "It's dreamy time", store_listing_id: "1344802365038919680", updated_at: "2026-04-03T17:02:52.296166+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365038919680", asset: "nameplates/nameplatetest/dreamy/", label: "It's dreamy time", palette: "bubble_gum" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365038919680_1346931012025843732", "7": "1344802365038919680_1346931039322378353" } }, { sku_id: "1344802365068279839", product_id: "1463960086631153821", name: "Fairy Dust", summary: "It's fairy dust time", store_listing_id: "1344802365068279839", updated_at: "2026-04-03T17:02:53.144213+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365068279839", asset: "nameplates/nameplatetest/fairy_dust/", label: "It's fairy dust time", palette: "bubble_gum" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365068279839_1346931351982575628", "7": "1344802365068279839_1346931379669303399" } }, { sku_id: "1344802365089251429", product_id: "1463960087109439589", name: "Galaxy", summary: "It's galaxy time", store_listing_id: "1344802365089251429", updated_at: "2026-04-03T17:02:53.344989+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365089251429", asset: "nameplates/nameplatetest/galaxy/", label: "It's galaxy time", palette: "cobalt" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365089251429_1346928533024542761", "7": "1344802365089251429_1346928565014233228" } }, { sku_id: "1344802365114417202", product_id: "1463960087604236547", name: "Glitch", summary: "It's glitch time", store_listing_id: "1344802365114417202", updated_at: "2026-04-03T17:02:53.483541+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365114417202", asset: "nameplates/nameplatetest/glitch/", label: "It's glitch time", palette: "cobalt" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365114417202_1346930308255191142", "7": "1344802365114417202_1346930331239841893" } }, { sku_id: "1344802365135524007", product_id: "1463960088644419725", name: "Heart Bloom", summary: "It's heart bloom time", store_listing_id: "1344802365135524007", updated_at: "2026-04-03T17:02:53.835061+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365135524007", asset: "nameplates/nameplatetest/heart_bloom/", label: "It's heart bloom time", palette: "bubble_gum" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365135524007_1346927816217722960", "7": "1344802365135524007_1346927847285063752" } }, { sku_id: "1344802365160689685", product_id: "1463960089508581705", name: "Kawaii Gaming", summary: "It's kawaii gaming time", store_listing_id: "1344802365160689685", updated_at: "2026-04-03T17:02:53.984663+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365160689685", asset: "nameplates/nameplatetest/kawaii_gaming/", label: "It's kawaii gaming time", palette: "sky" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365160689685_1346927855438926005", "7": "1344802365160689685_1346927883066540052" } }, { sku_id: "1344802365177331822", product_id: "1463960090808811531", name: "Kitsune", summary: "It's Kitsune time", store_listing_id: "1344802365177331822", updated_at: "2026-04-03T17:02:54.096300+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365177331822", asset: "nameplates/nameplatetest/kitsune/", label: "It's Kitsune time", palette: "cobalt" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365177331822_1346928678163976203", "7": "1344802365177331822_1346928692722532362" } }, { sku_id: "1344802365198303314", product_id: "1463960091270054067", name: "Koi Pond", summary: "It's koi pond time", store_listing_id: "1344802365198303314", updated_at: "2026-04-03T17:02:54.289884+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365198303314", asset: "nameplates/nameplatetest/koi_pond/", label: "It's koi pond time", palette: "sky" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365198303314_1346929032184336515", "7": "1344802365198303314_1346929057484505118" } }, { sku_id: "1344802365223469066", product_id: "1463960091748339908", name: "Lofi", summary: "It's lofi time", store_listing_id: "1344802365223469066", updated_at: "2026-04-03T17:02:54.492290+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365223469066", asset: "nameplates/nameplatetest/lofi/", label: "It's lofi time", palette: "berry" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365223469066_1346931597340971150", "7": "1344802365223469066_1346931612625010801" } }, { sku_id: "1344802365244440606", product_id: "1463960092226486547", name: "Lofi Cat", summary: "It's lofi cat time", store_listing_id: "1344802365244440606", updated_at: "2026-04-03T17:02:54.635906+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365244440606", asset: "nameplates/nameplatetest/lofi_cat/", label: "It's lofi cat time", palette: "berry" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365244440606_1346931552604524745", "7": "1344802365244440606_1346931579720695972" } }, { sku_id: "1344802365265412119", product_id: "1463960092843184221", name: "Moon and Sun", summary: "It's moon and sun time", store_listing_id: "1344802365265412119", updated_at: "2026-04-03T17:02:54.804565+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1344802365265412119", asset: "nameplates/nameplatetest/moon_and_sun/", label: "It's moon and sun time", palette: "cobalt" }], type: 2, premium_type: 0, google_sku_ids: { "5": "1344802365265412119_1346927772253032448", "7": "1344802365265412119_1346927806595989556" } }] }, { sku_id: "1309309974266118144", name: "Special Events 2", summary: " ", store_listing_id: "1309309974266118144", unpublished_at: "2024-11-21T12:00:00+00:00", updated_at: "2026-04-03T17:05:21.724931+00:00", assets: { id: { banner: "1309310034387271730" }, json: {}, url: {}, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/262.png", hero_banner: "https://cdn.yapper.shop/assets/264.png" } }, text_config: {}, limited: false, products: [{ sku_id: "1174459415924064376", product_id: "1463960114636521547", name: "New Year", summary: "Ringing in 2024!", store_listing_id: "1174459415924064376", updated_at: "2026-04-03T17:03:06.122834+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 499, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 399, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1174459415924064376", asset: "a_a46f14932ac02de32f64139d3b9057b8", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/101a130959e0d85f1dda7d3026df471b2da3f978d2951bda7c2af056025fc9fb", animated_image_url: "https://cdn.discordapp.com/assets/content/e216e4274c18b8a78f899ae94b34a67fec274e0fa38553807e8a6a41fb9329e9" }, label: "Cheers to 2023, and we hope you have a wonderful new year in 2024! Gold 2024 balloons sit ontop of the avatar." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1174459415924064376_1259923320434983003", "7": "1174459415924064376_1259923338281619536" } }, { sku_id: "1308169595055771749", product_id: "1463960112484843708", name: "Rift Butterfly", summary: "The Rift Butterfly is a type of sentient Rift that is shaped like a butterfly. This reward is exclusive to the Fortnite Quest.", store_listing_id: "1308169595055771749", updated_at: "2026-04-03T17:03:05.677291+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1308169595055771749", asset: "a_3131e3e1f48493f2ccea616ba686c15e", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/f8de87b45faa7113c394dd4525a05e6a3410e975ebee9dc8bc6c94df0607cd01", animated_image_url: "https://cdn.discordapp.com/assets/content/cb46bc76c53fd520ad126e04bb1223b6d178de54e8b6d0b94880a7b96b2c3654" }, label: "A rift butterfly shines in the center of the avatar, flutters its wings, and returns to the top of the avatar." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1309270800099971122", product_id: "1463960111394455793", name: "Batarang", summary: "The Batarang is Batman’s legendary throwing weapon, blending precision and versatility to instill fear in his enemies. This reward is exclusive to the Become the Knight Quest.", store_listing_id: "1309270800099971122", updated_at: "2026-04-03T17:03:05.518092+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1309270800099971122", asset: "a_e132d6014f2075d9fc2a8ece507ef5cf", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/314059c17a55efd748a599ce9b65bc42ba0d592f9922cee15958a4f49aa35a25", animated_image_url: "https://cdn.discordapp.com/assets/content/a2569c08318a9243271f3df8bbc6f92d66f2e91e2890dc8d474e3dab28312327" }, label: "A spinning, bat-shaped metallic projectile hurtles into and impacts the screen, leaving a massive crack." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1313309630851448833", product_id: "1463960113613246535", name: "Bush Camper", summary: "Exclusive to the Fortnite OG Quest for a limited time.", store_listing_id: "1313309630851448833", updated_at: "2026-04-03T17:03:05.810414+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1313309630851448833", asset: "a_1b4de195cb3d8a181aaacc6caf719749", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/88cca6d8a62c7d951a2f928415ceae3fd946d14423d5813aba53be13d66dce17", animated_image_url: "https://cdn.discordapp.com/assets/content/81bb7f6fd6f4c79e1d50838e201a193aad1432c2c8bf2cd80267c05fedf8271d" }, label: "A bush encircles the avatar, with leaves gently rustling and swaying in a circular motion." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1315750531330736211", product_id: "1463960114124947496", name: "Shield Potion", summary: "Exclusive to the Fortnite Ballistic Quest for a limited time.", store_listing_id: "1315750531330736211", updated_at: "2026-04-03T17:03:05.996741+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1315750531330736211", asset: "a_476a82ccf99363b2c2f83090f33bcdce", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/f98d344804ff0c9365a4b87ac9bcb31d47b5c5ad8da4bd089a729bae1ca9cbdc", animated_image_url: "https://cdn.discordapp.com/assets/content/ec9b52c5fbafd76ac1866d26ac9bd6cb7f4454e7d6da2508b1536a205404b163" }, label: "A potion bottle is uncorked, its contents emptied, and a pixelated aura swipes over the avatar from bottom to top." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1315853682235019326", product_id: "1463960115089641604", name: "TGA Controller", summary: "Exclusive to The Game Awards Quest for a limited time.", store_listing_id: "1315853682235019326", updated_at: "2026-04-03T17:03:06.270651+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1315853682235019326", asset: "a_a657b4509fd2b75f5bb12e3a0bb0a7a0", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/80208379709ebe70330ae7694cde3737b6aaf522a2790952ca5dec398d63d394", animated_image_url: "https://cdn.discordapp.com/assets/content/bb6da75e7ac94f73774471a27f26828924a859ddd28b635c1d09b7b28ddb70d3" }, label: "Two joysticks and keypads control a target that moves in all directions around the profile picture." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1316597786862419988", product_id: "1463960115567788102", name: "Shadow", summary: "Exclusive to The Sonic 3 Quest for a limited time.", store_listing_id: "1316597786862419988", updated_at: "2026-04-03T17:03:06.415248+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1316597786862419988", asset: "a_db05e7fc49cb1a078f6aec1e559e2891", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b30e2febb2c575e11c46065e3b13fc1e61f12765689af4f53355c1b5c95905b7", animated_image_url: "https://cdn.discordapp.com/assets/content/3a379bb42760351a681fca621c139eb5ccab955fc202b50c38ed94ce3319daf8" }, label: "Shadow teleports around multiple times, leaving a red and orange trail while striking various dynamic poses." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1319423712474435655", product_id: "1463960116020641934", name: "Rec Room Lightning", summary: "Exclusive to the Rec Room Quest for a limited time.", store_listing_id: "1319423712474435655", updated_at: "2026-04-03T17:03:06.547251+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1319423712474435655", asset: "a_c54442527d9d19bbb1695a41d090a379", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/70ae3948f54e71418f666da4991816e708507740ed91af309547e4694064327b", animated_image_url: "https://cdn.discordapp.com/assets/content/1bc0ccb2b1e228103f2c78e6ead701fa639231055395c829d54609355acb7d9d" }, label: "A streak of orange lightning surrounds the avatar." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1325880072972013670", product_id: "1463960116972884072", name: "WINGMAN'S GOT IT", summary: "Exclusive to the VALORANT GO GET EM WINGS Quest for a limited time.", store_listing_id: "1325880072972013670", updated_at: "2026-04-03T17:03:06.683190+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1325880072972013670", asset: "a_5589443a8c7a2c690394024d45a363a9", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/d4ad560a7231bf3d93ef0296e8d72c0e6f776eeefa237d8d625c119c9faf8104", animated_image_url: "https://cdn.discordapp.com/assets/content/0b2fc7ab38f66bf3a673addcbdebb608ee93af508ba5841a2608e58ef9a4202e" }, label: "VALORANT Agent Gekko's cute yellow creature happily bounces on top of your avatar" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1326347611069874277", product_id: "1463960120219140156", name: "Heart-to-Heart", summary: "Feel the love all around.", store_listing_id: "1326347611069874277", updated_at: "2026-04-03T17:03:07.612856+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1326347611069874277", asset: "a_89b499793e86bf459a8dd4f02ad416f4", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/0224df5897eaf669b29d9ec1eaa09197c83f72c457c423c288670e70d5971938", animated_image_url: "https://cdn.discordapp.com/assets/content/44ed98929be5e918b7249c14aa47db29f4f8d8e7aa8a4957c8abcccab3de0bd2" }, label: "A flurry of pink and red hearts surround around your avatar, swirling with a gentle touch before settling into a snug, cheek-to-cheek cuddle." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1326718812279799809", product_id: "1463960117404766413", name: "Jeff the Land Shark", summary: "Exclusive to the Marvel Rivals Quest for a limited time.", store_listing_id: "1326718812279799809", updated_at: "2026-04-03T17:03:06.847346+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1326718812279799809", asset: "a_093fc2027134584d49f40e6f63619623", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/3096e93af7ee92aee1616215553a8e09079539b931dc26dbc2350821d9189646", animated_image_url: "https://cdn.discordapp.com/assets/content/3a67fd12356d4d520357086ce1b0032251518b1ead4132ba627a9a2412f18514" }, label: "Jeff the Land Shark is an absolutely adorable, chonky cartoon shark who looks like it just discovered its love for snacks and hugs. It’s rocking a stylish pink collar with a shiny gold tag, like it’s ready to be your best aquatic buddy. Its big toothy grin says, “I’m cute, but I could still chomp if needed!”." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1329309467619229797", product_id: "1463960120680648704", name: "Fuchsia Agent", summary: "Exclusive to the Strinova Fuchsia Quest for a limited time.", store_listing_id: "1329309467619229797", updated_at: "2026-04-03T17:03:07.734355+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1329309467619229797", asset: "a_656d8fd0b54767e784e0463a85d04b60", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/0e03a3d4118c6e8d12412fa3ba9034a99ea7eda507ad5f5103ce0aaefcd0b1d8", animated_image_url: "https://cdn.discordapp.com/assets/content/ec6483ef1d82be48b200129e00b903b2346b5486efb757252c72472d3cec7f75" }, label: "A Fuchsia Agent character with a red shark swimming around the character's gray headband." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1334270711790833776", product_id: "1463960121137824004", name: "Fortnite Boogie Bomb", summary: "Exclusive to the Fortnite OG S2 Quest for a limited time.", store_listing_id: "1334270711790833776", updated_at: "2026-04-03T17:03:07.881905+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1334270711790833776", asset: "a_786b0867026fcf4ecded83fd5da34f19", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/a962f0a77c97f456e5336efc23d6e07e15d26d0aaa1b71ad9d392e1049686f7a", animated_image_url: "https://cdn.discordapp.com/assets/content/675c76ad0ee2650e00b04c976d9c100ed7658180063112367f0422f50b920d91" }, label: "A Boogie Bomb explodes, lowering a disco ball causing a festive disco light show" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1336439189041975316", product_id: "1463960122559561748", name: "Scout", summary: "Exclusive to the Sid Meier's Civilization VII Quest for a limited time.", store_listing_id: "1336439189041975316", updated_at: "2026-04-03T17:03:08.015692+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1336439189041975316", asset: "a_b3d5743ff7a2cda95d28fd984f82a5f8", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/698dac0ba4d4aa53607022676b018da1d5f97c6c438ce67fe147d91c5378df61", animated_image_url: "https://cdn.discordapp.com/assets/content/243f7ee962f51bdf558fb91eb8512552cd9bd15fe89156ba417fe862de8cbea6" }, label: "An older man wearing a green cape and gray feathered hat holds a wooden staff and looks into the distance while shielding his eyes to scout ahead. Next to him, his sitting dog companion stands up and looks in the same direction." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1336506386296864839", product_id: "1463960123050557572", name: "Hoppy Day", summary: "Brb, out frolicking.", store_listing_id: "1336506386296864839", updated_at: "2026-04-03T17:03:08.150421+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1336506386296864839", asset: "a_f8d05a51a9ca29f473dcd52e2ce5507a", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/68aff16f8c449058c0c0ff2a46808ad5ee5c139eb12a3d23978cc75dc56bebbf", animated_image_url: "https://cdn.discordapp.com/assets/content/0b76bdeec7f2dc447844a98d799c24c4106a3a2ccdcde01adc267cbf28e85e27" }, label: "Your avatar has found a friend in the shape of a little brown bunny. It hops in delight when it sees you." }], type: 0, premium_type: 2, google_sku_ids: {} }, { sku_id: "1336506386296864842", product_id: "1463960123524382883", name: "Afternoon Breeze", summary: "A calm rest in the meadow.", store_listing_id: "1336506386296864842", updated_at: "2026-04-03T17:03:08.272658+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1336506386296864842", asset: "a_9c79b63d5a5703645ae6136b8bf018bf", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/e245dbc54dd86b839d23494ba907b1eb1fe1315495e672c6079a2207d2f92beb", animated_image_url: "https://cdn.discordapp.com/assets/content/c095cf3150941171b6e58c34401de39e1b237809d5ef5e979375a4a961d6ccbf" }, label: "Your avatar stands in a dreamy meadow, where pink and orange flowers sway to nature’s rhythm, sending petals twirling through the soft breeze." }], type: 0, premium_type: 2, google_sku_ids: {} }, { sku_id: "1336506386296864845", product_id: "1463960124010791105", name: "Shower Stroll", summary: "Chasing rainbows after the storm.", store_listing_id: "1336506386296864845", updated_at: "2026-04-03T17:03:08.409741+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1336506386296864845", asset: "a_d65bc28befbf0923324d5e4b72339ea7", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/5ee1ee7e9cc586a1b4469b3ba5779bda712477bde4127eb02184775b551b999c", animated_image_url: "https://cdn.discordapp.com/assets/content/2fc60e6acd7fc73c750b68e27fab7cf5a759fbaae6b799233a7f7242cbe503a7" }, label: "A soft rain drapes over your avatar, leaving a shimmering rainbow glow that whispers a touch of magic into the misty air." }], type: 0, premium_type: 2, google_sku_ids: {} }, { sku_id: "1338927497860878466", product_id: "1463960124870758575", name: "Exoborne", summary: "Exclusive to the Exoborne Wishlist Quest for a limited time.", store_listing_id: "1338927497860878466", updated_at: "2026-04-03T17:03:08.734240+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1338927497860878466", asset: "a_1307226c0fbaee9a3def12b88ee2bfcc", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/2c08e8ca6eab899223bfb5e6847f18c7bc88831ca564ace8a851806a17d69763", animated_image_url: "https://cdn.discordapp.com/assets/content/87af10c17405ee80912d71986c1fc439a262501e4daf45d9fe4b81a8c80ff7f1" }, label: "Metallic armor surrounds the avatar with pieces shifting into place and yellow indicator lights turning on." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1341522018197311519", product_id: "1463960125315350558", name: "Big Dill Chain", summary: "Exclusive to the Fortnite Quest for a limited time.", store_listing_id: "1341522018197311519", updated_at: "2026-04-03T17:03:08.849891+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1341522018197311519", asset: "a_2f8ce70f2bc31b9ac6c27477019ebaaa", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/1661e5c43786761ece6516a00edbd002746b3857513844a24aa8b05b35d7c4dc", animated_image_url: "https://cdn.discordapp.com/assets/content/be0ed680469ad4cc564b11f61414d23b29bcea03d518c1b2f96b3ce04ee2e0d0" }, label: "A gold chain holding a gold medallion with a D that has two vertical slashes through it surrounds a green cap." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1346915187243876474", product_id: "1463960117975453770", name: "Pathojen", summary: "Exclusive to the FragPunk Launch Quest for a limited time.", store_listing_id: "1346915187243876474", updated_at: "2026-04-03T17:03:07.075421+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1346915187243876474", asset: "a_c0b9de0a45a84d30d4535849fc53e0aa", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/a72e2b9f0b79d0f6281a820b68ac698f66285a7a8ed5e4c24169d6b0bf24bae8", animated_image_url: "https://cdn.discordapp.com/assets/content/8668f443b3e5e1fcb46b1010be6f6884d26d5c1994b5ddcc94046087bc83547d" }, label: "This avatar decoration features a vibrant, neon-colored circular flame effect with an energetic, cartoonish character at the bottom left." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1346987105028407307", product_id: "1463960118474444965", name: "Split Avatar Decoration", summary: "Exclusive to the Split Fiction Quest for a limited time.", store_listing_id: "1346987105028407307", updated_at: "2026-04-03T17:03:07.270098+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1346987105028407307", asset: "a_6fb2e33e9721f0c5d3ac4eef3f572e9f", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/107f3763092cc04e3c7aaf82437dac9b5971b70e01577cee981fff912484aa69", animated_image_url: "https://cdn.discordapp.com/assets/content/399b9be89c9cdd7afb7b86de1b925ef6bdb3675e9911cc23f8f222bc3b82551b" }, label: "A circular energy effect split in two: the left side glows purple, the right golden-orange. A diagonal crystal-like fracture runs across it, with shimmering shards and sparks, creating a high-tech, futuristic, battle-worn look." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1347624589571788951", product_id: "1463960118948397109", name: "Khazan Avatar Decoration", summary: "Exclusive to the Khazan Quest for a limited time.", store_listing_id: "1347624589571788951", updated_at: "2026-04-03T17:03:07.429221+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1347624589571788951", asset: "a_291f95e35311551eddc4ad6fc9423dca", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/5b3d7fdd7a0fec0b86af6a98ffba7b685290c78c5ae3c82e070d39fa1f5099ec", animated_image_url: "https://cdn.discordapp.com/assets/content/ee5e67fd0f4750f538860ddb25aa37cd4f258bac9c67d3f9a1ec419b8636a7ce" }, label: "This Discord avatar decoration features a menacing, metallic circular frame composed of jagged, dark gray spikes with glowing blue crystal-like accents embedded throughout. The design gives off a sharp, armored aesthetic, reminiscent of a magical or futuristic battle-worn artifact." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1349045865188294719", product_id: "1463960125784981780", name: "Gallica Avatar Decoration", summary: "Exclusive to Metaphor Rank Up Quest for a limited time.", store_listing_id: "1349045865188294719", updated_at: "2026-04-03T17:03:08.982766+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1349045865188294719", asset: "a_ef68723fd999e1bc40324b97fb8854e1", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/bf23e3a77efc5712ae7f13b1cd3e2807a5688547d1ccccb97f446efc896cfdf5", animated_image_url: "https://cdn.discordapp.com/assets/content/0f5de664561a869a77e01c2163e29fd1102d23be25c12f49623f78ca5033c38c" }, label: "A fairy is floating while flipping through pages in a book" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1352347590917882008", product_id: "1463960126418456670", name: "Supply Llama", summary: "Exclusive to the Fortnite Quest for a limited time.", store_listing_id: "1352347590917882008", updated_at: "2026-04-03T17:03:09.055521+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1352347590917882008", asset: "a_ef68b35d47c97085213caf2adf57b9b7", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b476d89f4782efcf9f733212e6ff0fefb940b4c396f4331978ce1c36433ee51b", animated_image_url: "https://cdn.discordapp.com/assets/content/0b2a8e1ae8585a8a9da356b41af586110ffb95c368d00640fb38b5589c476cf3" }, label: "A purple and blue llama body surrounds the frame, with a llama head on the top left." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1357852406079291593", product_id: "1463960127035015434", name: "Clicker Avatar Decoration", summary: "Exclusive to The Last of Us Season 2 Quest for a limited time.", store_listing_id: "1357852406079291593", updated_at: "2026-04-03T17:03:09.181777+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1357852406079291593", asset: "a_8d2ef2fcd26fb58d5edbd5efb7d60bab", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/fdb3a688ab08157417d2839602d7de170434e60702f2aab20c208e9873c5a2b9", animated_image_url: "https://cdn.discordapp.com/assets/content/6dc4a2d0f847e6fa696a9797f9282ee0a166ee23feb2693ce1b8a41fa71d3e40" }, label: "Mushroom-shaped elements in orange-red and mint green colors surround the user's avatar. The organic, flowing fungal shapes have a natural, slightly oceanic aesthetic with a hand-drawn illustration style." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1359328540104986636", product_id: "1463960127525617788", name: "Face of Corruption Avatar Decoration", summary: "Exclusive to the Path of Exile 2 Quest for a limited time.", store_listing_id: "1359328540104986636", updated_at: "2026-04-03T17:03:09.312952+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1359328540104986636", asset: "a_0384e205589728fd90524b4345392e91", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/407cc6cbd2974edf83d49c8a7e6230ecf1143fa5d85a2856b9fbe149934e9eb8", animated_image_url: "https://cdn.discordapp.com/assets/content/7ee76f862f1b9e2ab99bfa976f9f47e7d4398fff2967abb84a9d3e24edf0dcd8" }, label: "This avatar decoration features two intense, screaming red stone faces split dramatically down the middle." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1359953429778137322", product_id: "1463960128033263699", name: "Emma Frost Avatar Decoration", summary: "Exclusive to the Marvel Rivals S2 Quest for a limited time.", store_listing_id: "1359953429778137322", updated_at: "2026-04-03T17:03:09.463056+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1359953429778137322", asset: "a_3a980dcf922317f38df5a82a5b0d0679", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/782c7bcc6426689b1ecdfa6325b6224d2c07a884052ceb33954a485128e2e179", animated_image_url: "https://cdn.discordapp.com/assets/content/3173ee5d5d9bbafd42a00c9c5f6db036a1e00f7b948e46403aaa10c9b0c07703" }, label: "This avatar decoration features a confident, stylishly armored woman standing tall with a shimmering crystal levitating above her hand. The transparent center lets your avatar shine while being blessed by the aura of power, elegance, and just a dash of sass." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1360316550313283748", product_id: "1463960128486244589", name: "Signal from Tau Ceti Avatar Decoration", summary: "Exclusive to the Marathon Reveal Quest for a limited time.", store_listing_id: "1360316550313283748", updated_at: "2026-04-03T17:03:09.607051+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1360316550313283748", asset: "a_5a906ee07eb34ee406c4f56d13156836", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/230f6f2cd253c96f3160b825aceb1182ba34ec28c94781dbb737222a4ca4f09b", animated_image_url: "https://cdn.discordapp.com/assets/content/a744eb49d6a4af7d1e9d523c7430041603ba77b85191ff4350365b1da198e3ce" }, label: "Neon yellow-green overlays surround the user's avatar. The animated overlays show hazard stripes, exclamation marks, directional arrows, and letters and numbers that flicker." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1360353397865447707", product_id: "1463960129547272275", name: "Slurp Barrel Avatar Decoration", summary: "Exclusive to the Fortnite Reload Quest for a limited time.", store_listing_id: "1360353397865447707", updated_at: "2026-04-03T17:03:09.746812+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1360353397865447707", asset: "a_977ce6672eddc9c2953108b4f11a67f3", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/a2d9cc281b4bac81c737275ba991d00d4c7218109c9214fc4c191f7c348939a4", animated_image_url: "https://cdn.discordapp.com/assets/content/952e23c6c33161338afe47fc8809fa8d59757172f01d0b3a4db9679a4cc5ee62" }, label: "A metallic barrel with the label 'Slurp co.' expands on top of the user's avatar and explodes into blue and white liquid." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1362863977222115430", product_id: "1463960130046529587", name: "Hackclaw", summary: "Exclusive to the Delta Force Quest for a limited time.", store_listing_id: "1362863977222115430", updated_at: "2026-04-03T17:03:09.873845+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1362863977222115430", asset: "a_0d218bae0b10012713c5027d06ac90dc", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/9910411a14f7074067828021817e12f94406539658b6438a52a4ee9918eb298e", animated_image_url: "https://cdn.discordapp.com/assets/content/6238715a7614f485683caf27fe1ee64129ec8571e913e347b4d5866f055994af" }, label: "Stylized avatar showing a white-haired character with turquoise highlights, with only the hair and hands visible. The hands appear to be wearing dark gloves with pink highlights, positioned on a keyboard." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1366429159961919569", product_id: "1463960131120136233", name: "Friend of Dex", summary: "Exclusive to the Fragpunk Season 1 Chapter 2 Quest for a limited time.", store_listing_id: "1366429159961919569", updated_at: "2026-04-03T17:03:10.284158+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1366429159961919569", asset: "a_f2f674f57c8b89b163c50c17cf1e1398", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/7af86ad5d4b5d58e2eef86bbd97739f19e0beecceffe6c8ad1b8bccd9c4c2f9e", animated_image_url: "https://cdn.discordapp.com/assets/content/94d701865278db6a125d77f5056d48147c92b4febfa4eb376e4f76a116122e20" }, label: "A vibrant yellow fox energetically frames a circular pink energy border." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1362863977222115433", product_id: "1463960130650505337", name: "Shield Saw", summary: "Exclusive to the Doom Quest for a limited time.", store_listing_id: "1362863977222115433", updated_at: "2026-04-03T17:03:10.147871+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1362863977222115433", asset: "a_9293053e9e450b9f53e98f71a80e9ece", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/484604a5cc6380d7d2f028c386f499af74c1c022d38244c9001f37fbc6b8029b", animated_image_url: "https://cdn.discordapp.com/assets/content/4b63bc703560b2af577998f1188c832a88b5058cdff4f53de9a646297f505327" }, label: "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1369388182927442022", product_id: "1463960131611005091", name: "Fortnite Galactic Battle", summary: "Exclusive to the Fortnite Galactic Battle Quest for a limited time.", store_listing_id: "1369388182927442022", updated_at: "2026-04-03T17:03:10.418370+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1369388182927442022", asset: "a_d64e7cbab0cabc48de3cebe400bd5505", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/45735ed3b6db8c6967246767f602fd8c617b65676cb0047791246561910f4b05", animated_image_url: "https://cdn.discordapp.com/assets/content/d0e86de22f911e368cfeecfc56666e3de0ec5611b22802d8ddbb2d07eef09242" }, label: "Circular frame with two curved lines framing where a user's avatar would appear. The top curve is blue with a small circular emblem, while the bottom curve is red with a wheel-like symbol." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1369404111484751873", product_id: "1463960132089151710", name: "Freshly Picked", summary: "Now where’s my blender?", store_listing_id: "1369404111484751873", updated_at: "2026-04-03T17:03:10.529282+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1369404111484751873", asset: "a_ef2d848fad34c418e155aeccf04051aa", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/f3b158b5097b6401c2d94b52777a69f0ad9885e91eeb6e631a5f33ecc6aa49e1", animated_image_url: "https://cdn.discordapp.com/assets/content/6c4753c6092fbaa6d06074738a64a68bada33ac43d12108f527ddb5c23b708e2" }, label: "Beautiful, juicy strawberries, blueberries, and oranges, still wet from being washed, circle the outside of your avatar and remind you that summer is here." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1371943141321609357", product_id: "1463960132583948400", name: "Shield Saw", summary: "Exclusive to the DOOM: The Dark Ages Quest for a limited time.", store_listing_id: "1371943141321609357", updated_at: "2026-04-03T17:03:10.570644+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1371943141321609357", asset: "a_9293053e9e450b9f53e98f71a80e9ece", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/484604a5cc6380d7d2f028c386f499af74c1c022d38244c9001f37fbc6b8029b", animated_image_url: "https://cdn.discordapp.com/assets/content/4b63bc703560b2af577998f1188c832a88b5058cdff4f53de9a646297f505327" }, label: "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1371949732066234571", product_id: "1463960133678796825", name: "The Bad Guys 2 Trailer", summary: "Exclusive to the Bad Guys 2 Trailer Quest for a limited time.", store_listing_id: "1371949732066234571", updated_at: "2026-04-03T17:03:10.742264+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1371949732066234571", asset: "a_c5dbb475f7766708d9b1b4e685379cec", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/7505e69d229933b931aa66a16189c31c22c7ba2416445836f2610e6d70f3ddaf", animated_image_url: "https://cdn.discordapp.com/assets/content/8450345f44827792e6958719f1eefcb557a22227e5eb0c4169d04f261060e82d" }, label: "A bright, orange comet-like streak curves around the top-left of the frame, fading into sparks and glowing embers. The effect gives the avatar a sense of fiery motion." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1373682603621744720", product_id: "1463960134639288412", name: "Mission: Impossible", summary: "Exclusive to Mission: Impossible Quest for a limited time.", store_listing_id: "1373682603621744720", updated_at: "2026-04-03T17:03:10.858499+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1373682603621744720", asset: "a_a38d6d97dee5cfe11245dc84586bf56f", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/c947f72bd272800e0e666160c28a3197373bfa8203c7bc182f3c569f20499d65", animated_image_url: "https://cdn.discordapp.com/assets/content/29505cb4105ed79a8987e0a03af59078c8631051a6fb3457b02a8e221998c5e1" }, label: "Person running around in circles upside down" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1374170804769652797", product_id: "1463960135159250986", name: "Jurassic World Rebirth Trailer", summary: "Exclusive to Jurassic World Rebirth Trailer Quest for a limited time.", store_listing_id: "1374170804769652797", updated_at: "2026-04-03T17:03:10.999584+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1374170804769652797", asset: "a_93fbb81bf1e15730d2f6f2fd4e39c38d", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/d106cbd16285e9a76d2b0abaa8d8e5e824db0f554835d2b2f915ded0e97e35d5", animated_image_url: "https://cdn.discordapp.com/assets/content/addf5efa348d609fb6011259f1d0ad32c003b0803e83962cc12aa67c8dc2b865" }, label: "Dinosaur roaring then fading away into the Jurassic World logo" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1374394443997642803", product_id: "1463960135629148253", name: "Open Beta", summary: "Exclusive to the Open Beta Quest for a limited time.", store_listing_id: "1374394443997642803", updated_at: "2026-04-03T17:03:11.155501+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1374394443997642803", asset: "a_e574b8ba0f477f7cac8d24d6797abf65", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/8c555b06c5f667e57a70c7e7a33420eb85ea76f78e84968220e182fa187cb425", animated_image_url: "https://cdn.discordapp.com/assets/content/f01a0e71423ad0d47a3562cec743fa7922ec51e4d07b3271ed83298266ccb27f" }, label: "A circular cyan-blue ring with a faint light blue design in the center that resembles a stylized logo or emblem." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1377740268366991562", product_id: "1463960136086196359", name: "Ballerina", summary: "Exclusive to the Ballerina Trailer Quest for a limited time.", store_listing_id: "1377740268366991562", updated_at: "2026-04-03T17:03:11.318769+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1377740268366991562", asset: "a_62186692bee86a0ad06c05b863914934", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/c22f6c70075534735d9aa3ade6275a4be6b909ccc8ebd3e7fcf94c9ed2e6d230", animated_image_url: "https://cdn.discordapp.com/assets/content/8b403368809188680a7535b56a034f9e256b942b19922f0f026bcb94543900c4" }, label: "Pink rays emit from the center of the decoration like a halo and two blue fluffy ends of a fur coat show on the sides." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1377856108282253333", product_id: "1463960137021521931", name: "Ultron", summary: "Exclusive to the Marvel Rivals S2.5 Quest for a limited time.", store_listing_id: "1377856108282253333", updated_at: "2026-04-03T17:03:11.444602+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1377856108282253333", asset: "a_791bc9d1f97c17b8ab08814fbd2315a4", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/524b9098f7ba080d503648b18f0b45c62de52e6ffb765ca7883fb1c18695fc6a", animated_image_url: "https://cdn.discordapp.com/assets/content/33c333e0a8c8836abd487a0da659fbe3cef9bc56ab5e68fa5f1ed8e0db750295" }, label: "Metallic claws drag open a red swirling portal. The metallic claws disappear and Ultron appears through the portal." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1379222146274033798", product_id: "1463960137520779397", name: "Marvel Snap Venom", summary: "Exclusive to the Symbiote Spider-Man Quest for a limited time.", store_listing_id: "1379222146274033798", updated_at: "2026-04-03T17:03:11.718007+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1379222146274033798", asset: "a_3700e799d39895e502f4e9be46ceb325", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/4b918488b4430633c3f34d87bc73004ebe62c17f702e501498a85f9b5e495984", animated_image_url: "https://cdn.discordapp.com/assets/content/e6c095e0ea6563f748c0cad1efb78f7a0ff0af1d08dfbf981b584fe01dadb169" }, label: "A glowing cube in the bottom left becomes enveloped by black organic material and disappears. The organic material circulates around the avatar and transforms into Venom's face. The face takes a large bite and transforms back into a large glowing cube." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1379879504629207180", product_id: "1463960138527408417", name: "How to Train Your Dragon", summary: "Exclusive to the How to Train Your Dragon Quest for a limited time.", store_listing_id: "1379879504629207180", updated_at: "2026-04-03T17:03:11.886953+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1379879504629207180", asset: "a_0dfaf63ed00bb0ee36ad1097fa99e18a", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/ea655561915a24e0d2d2e5b406a652eae4010ba2cccf486299199dcdba565424", animated_image_url: "https://cdn.discordapp.com/assets/content/50a6ac1a2707a96594d5a5a6a0c03e6e348e842c702992b1daa1c428232f6e78" }, label: "Ornate circular frame with a Dragon and a weathered metallic finish" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1380276497209622529", product_id: "1463960140230164530", name: "Starlight Revolver", summary: "Exclusive to the Starlight Revolver Quest for a limited time.", store_listing_id: "1380276497209622529", updated_at: "2026-04-03T17:03:12.048378+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1380276497209622529", asset: "a_fd249cab5b215c72178386729102a84d", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/ef45b491944dce9686ea8f5993fb61f854054b0584eeb24746b674a50ddf6f42", animated_image_url: "https://cdn.discordapp.com/assets/content/b15a68d8c9ddcdb11c05d8cd4ebec50030477245ca90de7f021f390e4611e77b" }, label: "A circular purple gradient border with decorative four-pointed stars in pink, cyan, purple, and orange scattered around the outside edge." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1380688086941302906", product_id: "1463960141580992639", name: "R6 Siege X Avatar", summary: "Exclusive to the R6 Siege X Avatar Quest for a limited time.", store_listing_id: "1380688086941302906", updated_at: "2026-04-03T17:03:12.179247+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1380688086941302906", asset: "a_b9005611f96e6ae6602ace56a5453f63", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/2f924fdc9a49e7de54070e276fcff935bcda5e8576bae7587c0763413181985d", animated_image_url: "https://cdn.discordapp.com/assets/content/8b585197c927fbe55171a99210b3190a6a7520e073399d51a2b7f6b361e3f040" }, label: "A metallic sledge hammer twirls before smashing a wooden panel with a large green X painted on the center of it." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1382044334890680442", product_id: "1463960142067400795", name: "Towerborne Play", summary: "Exclusive to the Towerborne Play Quest for a limited time.", store_listing_id: "1382044334890680442", updated_at: "2026-04-03T17:03:12.308439+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1382044334890680442", asset: "a_678090e31b1209173b925a7fa8f7e014", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/405891aedee0c55d5f842f32c2c25aa23017796f9626ef106d16e5cbadeaf94d", animated_image_url: "https://cdn.discordapp.com/assets/content/84a26054bcf32c5f8d6124bcb26109d974551b1a583b4641dedcbe04775501b7" }, label: "A white and red fox mask turns to face the viewer. Streams of light emanate from its eyes before it returns to the upper left portion of the frame." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1383123340142841949", product_id: "1463960143522693226", name: "28 Years Later", summary: "Exclusive to the 28 Years Later Quest for a limited time.", store_listing_id: "1383123340142841949", updated_at: "2026-04-03T17:03:12.449194+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1383123340142841949", asset: "a_61cecdd5a6bbc76929447d702c6654a8", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/a96e89ffde30fde83429e615b4a76a58f6063bad1945082f5aca1e3bc824eb09", animated_image_url: "https://cdn.discordapp.com/assets/content/58f55edfb6941b4736c5100fceeac3b6eb3e539c0c17b4254f6c0b475ddf7700" }, label: "Animated avatar decoration depicting a pile of skulls stacked on the ground in the bottom left corner, with dark, jagged bones or spikes protruding from the back." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1383136910435811430", product_id: "1463960143996911741", name: "M3GAN 2.0", summary: "Exclusive to the M3GAN 2.0 Quest for a limited time.", store_listing_id: "1383136910435811430", updated_at: "2026-04-03T17:03:12.587125+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1383136910435811430", asset: "a_2ac2ff720c831e70518622800c24be86", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/5bd94bcc8951475254af84834a99ef44b8cc167f4846bae993fca671fd6e986a", animated_image_url: "https://cdn.discordapp.com/assets/content/c409c5388ededf2383a0521ba2efb12555cebb65a10cd1438a39397a4a33ac41" }, label: "Animated M3GAN avatar frame with a dark spinning ring and M3GAN standing in a tan dress." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1384216812488757359", product_id: "1463960144885973037", name: "LEGO® Fortnite", summary: "Exclusive to the LEGO® Fortnite Quest for a limited time.", store_listing_id: "1384216812488757359", updated_at: "2026-04-03T17:03:12.771137+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1384216812488757359", asset: "a_cb4313eb95e843e161a925b196c68500", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/15294aeec10a95350afc24410b37e1e7f155ccf15f4f703eb8b9977fbb653951", animated_image_url: "https://cdn.discordapp.com/assets/content/eba7a568553873c3144678c42fa99187994f457d1885cbccf1ce58006e2e6e71" }, label: "Circular LEGO® Fortnite avatar frame with fire, ice, and tech-themed emblems in red, blue, and green." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1384247972107386911", product_id: "1463960145607262208", name: "I Love R.E.P.O.", summary: "Exclusive to the R.E.P.O. Quest for a limited time.", store_listing_id: "1384247972107386911", updated_at: "2026-04-03T17:03:12.934993+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1384247972107386911", asset: "a_40222dd9e7bb6e2949cd8f4bd857fe8b", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/4194f7c698f5fd6789bd4a6cded1bbf69c552b7834da5a4c037c2a6feaf02dbc", animated_image_url: "https://cdn.discordapp.com/assets/content/051a2e6ba4c38ab049dc80777469301d165bd2b8ccb42293077bb6579700116a" }, label: "A goofy yellow head with large, wide-set cartoon eyes and a huge open mouth, forming a playful ring around the avatar." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1385015130466680995", product_id: "1463960146395926608", name: "SuperCell", summary: "Exclusive to the SuperCell Quest for a limited time.", store_listing_id: "1385015130466680995", updated_at: "2026-04-03T17:03:13.045645+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1385015130466680995", asset: "a_fdfc12b31565ba9f4b54926a01a188d9", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/eb73b09ea6cd7b4de63490c16dcb8445f7c5452044c036db9c6a668782641c4c", animated_image_url: "https://cdn.discordapp.com/assets/content/dce01a3dca8af0274f523ccbc16392953972d19bbde04cc1a04b2fb9432bcd97" }, label: "Animated green cactus character with red flowers waving next to a decorative circular frame with small leaves" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1386849676875141292", product_id: "1463960149445050398", name: "Palia", summary: "Exclusive to the Palia Play Quest for a limited time.", store_listing_id: "1386849676875141292", updated_at: "2026-04-03T17:03:13.399546+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1386849676875141292", asset: "a_2a1b840bb86581cea41005faa75355a3", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/f9603324cf20d9f57495f36fee35a1aabebf640224a5b5d97a702aa13c06b9bc", animated_image_url: "https://cdn.discordapp.com/assets/content/95219667221e30ef0cc4885e37d3cb84188b848e2131c52251b214d734aa9cd7" }, label: "Animated cute fox peeking out from a circular woodland frame decorated with branches, green leaves, and small white flowers." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1386838941801382010", product_id: "1463960147482247262", name: "VALORANT Summer Kickoff", summary: "Exclusive to the VALORANT Summer Kickoff Quest for a limited time.", store_listing_id: "1386838941801382010", updated_at: "2026-04-03T17:03:13.184497+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1386838941801382010", asset: "a_d46413a636a00a26d53a6ebd670dbe06", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/92f315f2c82070975e85a8d645db62f7a1bb97fa4a8f09a0b61f44efff6ec733", animated_image_url: "https://cdn.discordapp.com/assets/content/c849d656fb8fbeb0508c7378a1940388c689b1928fd2fded56bbbd21644c20e3" }, label: "Animated carnival mask with colorful feathers and ribbons in purple, blue, and yellow." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1388206477491175517", product_id: "1463960150359539875", name: "Dilophosaurus", summary: "Exclusive to the Jurassic World Rebirth Quest for a limited time.", store_listing_id: "1388206477491175517", updated_at: "2026-04-03T17:03:13.772186+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1388206477491175517", asset: "a_93fbb81bf1e15730d2f6f2fd4e39c38d", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/d106cbd16285e9a76d2b0abaa8d8e5e824db0f554835d2b2f915ded0e97e35d5", animated_image_url: "https://cdn.discordapp.com/assets/content/addf5efa348d609fb6011259f1d0ad32c003b0803e83962cc12aa67c8dc2b865" }, label: "Circular frame with gold and black border featuring an animated Dilophosaurus that emerges from the left side. The Dilophosaurus moves its head around the frame edge, and as the animation concludes, its colorful neck frill extends to partially cover the circular white space designed for a profile picture." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1387485784419995649", product_id: "1463960149906686052", name: "Moomoo Hood", summary: "Exclusive to the Milk Cup Quest for a limited time.", store_listing_id: "1387485784419995649", updated_at: "2026-04-03T17:03:13.680924+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1387485784419995649", asset: "a_d0883d32943794c418977878e91aed8a", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/e9b7a20aa991ee6c2555e3190ba7e2ecdd6904e41f57a4a560c7a7dfd47c9c2e", animated_image_url: "https://cdn.discordapp.com/assets/content/a7f7581224e0483095b2cc1374472aae7b682c7a28b87a04d302956e4c956012" }, label: "Cartoon cow frame with pink ears, black spots on white fur, and gold bell at bottom. Circular opening centers where user's profile picture appears." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1390436532988674091", product_id: "1463960151483482241", name: "Mecha BREAK", summary: "Exclusive to the Mecha BREAK Quest for a limited time.", store_listing_id: "1390436532988674091", updated_at: "2026-04-03T17:03:13.933039+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1390436532988674091", asset: "a_5bda831ef9d78db54429b06e2ea268fa", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/c0391ca3d91a1a45858a33f01ce1688ac2e7a5806f1f752c07ace68db45f147d", animated_image_url: "https://cdn.discordapp.com/assets/content/f43f401d8ed9c50d912e7b91cdaf0e5229e1fec4b307268f82ec331c26b10335" }, label: "A futuristic metallic helmet encloses the avatar. The eyes shine with a blue light before the helmet opens up again." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1391785327613706301", product_id: "1463960152435724288", name: "THPS Half Pipe", summary: "Exclusive to the THPS 3+4 Quest for a limited time.", store_listing_id: "1391785327613706301", updated_at: "2026-04-03T17:03:14.179858+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1391785327613706301", asset: "a_f37b13213a05d82f2125bc262f61180a", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/2e0c0d2126a1bfe46620e9a728dad3ed8208f355958dc35d0f856274ee99db9c", animated_image_url: "https://cdn.discordapp.com/assets/content/7b4c83c42f1b1706f49d140774e3de54677a58bf8d2c14fc386939dae30a8790" }, label: "An aeriel view of a retro style half pipe with graffiti art flanks the frame. An orange skateboard drops in and performs a spinning trick, then returns to the bottom left of the frame." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1409978159255785652", product_id: "1463960153572376627", name: "Jet Ring", summary: "Surround your avatar with a pulse of Nitro energy.", store_listing_id: "1409978159255785652", updated_at: "2026-04-03T17:03:14.373468+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1409978159255785652", asset: "a_d1e5d3aabccb3d38f21b5ac8a33fcf4d", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b37a12e05d582ae5573e857d783e87ee7dd6c75455c9b55f195b844534edb615", animated_image_url: "https://cdn.discordapp.com/assets/content/3195e992b8be7317d6f4414808b048266b8be7acbc7a4f68c6456d2d38d22787" }, label: "Give your avatar a new look." }], type: 0, premium_type: 2, google_sku_ids: {} }, { sku_id: "1409978969670815795", product_id: "1463960154025230489", name: "Blast Off", summary: "Light up your profile with a jet-fueled burst of motion.", store_listing_id: "1409978969670815795", updated_at: "2026-04-03T17:03:14.680352+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 1, sku_id: "1409978969670815795", title: "Blast Off", description: "Show this effect when others view your profile.", accessibilityLabel: "Show this effect when others view your profile.", animationType: 1, staticFrameSrc: "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1", thumbnailPreviewSrc: "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00", reducedMotionSrc: "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198", effects: [{ src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186", loop: false, height: 880, width: 450, duration: 2000, start: 0, loopDelay: 0, position: { x: 0, y: 0 }, zIndex: 100, randomizedSources: [] }, { src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532", loop: true, height: 880, width: 450, duration: 3000, start: 2000, loopDelay: 0, position: { x: 0, y: 0 }, zIndex: 101, randomizedSources: [] }] }], type: 1, premium_type: 2, google_sku_ids: {} }, { sku_id: "1409983105577783410", product_id: "1463960154491060336", name: "Jet Stream", summary: "A slick nameplate that leaves a trail of Nitro-powered heat.", store_listing_id: "1409983105577783410", updated_at: "2026-04-03T17:03:14.807237+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1409983105577783410", asset: "nameplates/special_events_2/nitro_rocketfuel_nameplate/", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/de5f570f9385bf8d54029d48aea399161bb1ea1c51ad31bd168f62cc60cdfb17", animated_image_url: "https://cdn.discordapp.com/assets/content/aba0a323ed34c82024a43cec711e4dc4fd436191095894fb5da981e4d0185cc8", video_url: "https://cdn.discordapp.com/assets/content/a96b8042ef86e006fe5383759811dab7b036479d9556ed3459ef01293af9ed4f" }, label: "Make your name stand out in servers and chats.", palette: "violet" }], type: 2, premium_type: 2, google_sku_ids: {} }, { sku_id: "1410030846337093672", product_id: "1463960154952302735", name: "Nitro Jet Fuel", summary: "Celebrate Nitro’s glow-up with this limited-edition, high-octane cosmetic bundle.", store_listing_id: "1410030846337093672", updated_at: "2026-04-03T17:03:14.906847+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1409978159255785652", asset: "a_d1e5d3aabccb3d38f21b5ac8a33fcf4d", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b37a12e05d582ae5573e857d783e87ee7dd6c75455c9b55f195b844534edb615", animated_image_url: "https://cdn.discordapp.com/assets/content/3195e992b8be7317d6f4414808b048266b8be7acbc7a4f68c6456d2d38d22787" }, label: "Give your avatar a new look." }, { type: 1, sku_id: "1409978969670815795", title: "Blast Off", description: "Show this effect when others view your profile.", accessibilityLabel: "Show this effect when others view your profile.", animationType: 1, staticFrameSrc: "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1", thumbnailPreviewSrc: "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00", reducedMotionSrc: "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198", effects: [{ src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186", loop: false, height: 880, width: 450, duration: 2000, start: 0, loopDelay: 0, position: { x: 0, y: 0 }, zIndex: 100, randomizedSources: [] }, { src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532", loop: true, height: 880, width: 450, duration: 3000, start: 2000, loopDelay: 0, position: { x: 0, y: 0 }, zIndex: 101, randomizedSources: [] }] }, { type: 2, sku_id: "1409983105577783410", asset: "nameplates/special_events_2/nitro_rocketfuel_nameplate/", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/de5f570f9385bf8d54029d48aea399161bb1ea1c51ad31bd168f62cc60cdfb17", animated_image_url: "https://cdn.discordapp.com/assets/content/aba0a323ed34c82024a43cec711e4dc4fd436191095894fb5da981e4d0185cc8", video_url: "https://cdn.discordapp.com/assets/content/a96b8042ef86e006fe5383759811dab7b036479d9556ed3459ef01293af9ed4f" }, label: "Make your name stand out in servers and chats.", palette: "violet" }], bundled_products: [{ sku_id: "1409978159255785652", name: "Jet Ring", summary: "Surround your avatar with a pulse of Nitro energy.", type: 0, premium_type: 2 }, { sku_id: "1409978969670815795", name: "Blast Off", summary: "Light up your profile with a jet-fueled burst of motion.", type: 1, premium_type: 2 }, { sku_id: "1409983105577783410", name: "Jet Stream", summary: "A slick nameplate that leaves a trail of Nitro-powered heat.", type: 2, premium_type: 2 }], type: 1000, premium_type: 2, google_sku_ids: {} }, { sku_id: "1440174638930853949", product_id: "1463960155438710926", name: "Bonsai - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853949", updated_at: "2026-04-03T17:03:15.028042+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853949", asset: "a_0714c0941f1229da2b489de6b202efad", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/45987e30375d316181c57096973e8f8b3a00b1b1b44c7713fbae46ad224695c2", animated_image_url: "https://cdn.discordapp.com/assets/content/bfca438fa70ca54183c950a080b5723796b44bcc42acdba0ba8a2faebbbcd523" }, label: "A bonsai avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853950", product_id: "1463960156013465721", name: "Donut - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853950", updated_at: "2026-04-03T17:03:15.330329+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853950", asset: "a_82442053e3da77f379586817b2709365", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/233bebfd750161d8eba620c02a64b6aeee72a7e35384fc652f00a61128e1e0a6", animated_image_url: "https://cdn.discordapp.com/assets/content/9e7b6be5b613ce346ff732792dc70e67a7e17ff4149774504c681fb96d3a2ae2" }, label: "A donut avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853951", product_id: "1463960156487418120", name: "Capybara - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853951", updated_at: "2026-04-03T17:03:15.431122+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853951", asset: "a_8384f035d67eb209be18aaadf191f25e", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/72e7b4cf218fb255db22c85faa774ea70ece0d4c63bb23572d9f7c6e935d7c37", animated_image_url: "https://cdn.discordapp.com/assets/content/655a8081eb30ed659a7391ffd67ab44cd4fc030b8d441e97e64900efb87f06db" }, label: "A capybara avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853952", product_id: "1463960156986409102", name: "Disco - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853952", updated_at: "2026-04-03T17:03:15.546883+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853952", asset: "a_9b11f84bb1750adb9229d528cce682c4", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/e3e0bf26a28ba5cc277124314643400ff2135f28bd877de079803ff7fcaf37eb", animated_image_url: "https://cdn.discordapp.com/assets/content/3390eddddf858ce581d034e2f62b3add985f7acbeb1c09d87d1b871b240ebb3b" }, label: "A disco ball avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853953", product_id: "1463960157464694834", name: "Origami - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853953", updated_at: "2026-04-03T17:03:15.642130+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853953", asset: "a_f507d774257b88d47b3531e8afa46259", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/0073c2d631f7d99f4cc168f67f19df0ac0f4b4b4f0ab66b277eabd4f66de5fae", animated_image_url: "https://cdn.discordapp.com/assets/content/f4f3a50d2aeb7e6ccb67a0e85c31b2a2d4d74e11af9916f64efe5563b233e25d" }, label: "An origami avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853954", product_id: "1463960157917675725", name: "Snail - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853954", updated_at: "2026-04-03T17:03:15.748601+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853954", asset: "a_523d7733d1b88cfbad5b082d062defc4", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/0a5c302e0a0e20ee64754723466ab8cc740b304901697cf9ede00211bda6e138", animated_image_url: "https://cdn.discordapp.com/assets/content/d8a4a1544816b6034e28b06a52c2c0489677c6626c977671959a9e9f68915670" }, label: "A snail avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853955", product_id: "1463960158395695181", name: "Duck - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853955", updated_at: "2026-04-03T17:03:15.878534+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853955", asset: "a_14a0f06f28d6de3dfd63d463223d814f", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/ca9a81542616afed54d9dc1d195562cf5f35cf0ce92572957d1019be146a9b05", animated_image_url: "https://cdn.discordapp.com/assets/content/bcb26ba775d3df8dcac588adcb94951a146fae64dbf96ae85d07d588c184c56c" }, label: "A duck avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853956", product_id: "1463960158857203852", name: "Banana - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853956", updated_at: "2026-04-03T17:03:16.016922+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853956", asset: "a_c12a5c953352c20bd6e63576e2cce3a0", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/cfeefdf99b2111a29f5426bb0e22061167ff9c670509c17c15ebecacfc93cd85", animated_image_url: "https://cdn.discordapp.com/assets/content/23f46512ab29719fd23ffc684f939fe84c0b2b7865dab5505acf0f4a46dab5c9" }, label: "A banana avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853957", product_id: "1463960159314251972", name: "Cat - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853957", updated_at: "2026-04-03T17:03:16.345210+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853957", asset: "a_3c8525a96d0272550c2f95bc8b594da5", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/719924540a81a0550f82a74f24a9afcb21c64a3132d9b3888c8021d2543c4cf2", animated_image_url: "https://cdn.discordapp.com/assets/content/da9578e8f1a4c2f193df3498ee444e68befdda6ae6cac7d0a0e1f30e136ac6de" }, label: "A cat avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1440174638930853958", product_id: "1463960160039862500", name: "Cassette - Checkpoint 2025", summary: "Thanks for checking out your checkpoint!", store_listing_id: "1440174638930853958", updated_at: "2026-04-03T17:03:17.543898+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1440174638930853958", asset: "a_23c2c404b0e73ac40e74e304d2471ed2", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/a0aaab454f8181d4fa751984d7908ddb84e33ccd110735de73c25c41f9208390", animated_image_url: "https://cdn.discordapp.com/assets/content/3677f386b11856fbfb3e00373cb31f4ffb89abb4ac8d468db867acec966f1852" }, label: "A cassette avatar decoration." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1464006538304684063", product_id: "1464374112393625875", name: "Full HP", summary: "Valentine’s Day Perk: Health will recharge when out of combat.", store_listing_id: "1464006538304684063", updated_at: "2026-04-03T17:03:17.707084+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1464006538304684063", asset: "a_bb90a5709c9fb3594f8cfc7a1884b433", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/2d4dbe33c521a3d97ebf280ff8ac72ee8841f38b11cfab239d3070da5e13f277", animated_image_url: "https://cdn.discordapp.com/assets/content/b91fc82888c895f458d4c192943087429de5c82cc4fbf1e8b3232d26d9b9aff2" }, label: "Three pixel-style red hearts appear above the user’s avatar. Each heart gradually fills from empty to full in a loop, mimicking a video game health bar animation." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1464017397081047081", product_id: "1464374113102729426", name: "Full Heart", summary: "You’re maxed out, emotionally and aesthetically.", store_listing_id: "1464017397081047081", updated_at: "2026-04-03T17:03:17.874879+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 2, sku_id: "1464017397081047081", asset: "nameplates/special_events/full_heart/", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/30462d948aef752b4c57096a39eb3080aacf50aba7e5ebc9614cad04d558de7e", animated_image_url: "https://cdn.discordapp.com/assets/content/d2207167e998aac4f4175c00f1d3a9b4af5456574982e38a247db90b92fb7d86", video_url: "https://cdn.discordapp.com/assets/content/50e5abb552788c1a3e55ca00dedc33ce12e5dd46ca53424959a69b179b26eb36" }, label: "A red pixel-style heart is displayed to the right of the user’s name. The heart slowly fills from empty to full in a repeating animation.", palette: "crimson" }], type: 2, premium_type: 0, google_sku_ids: {} }] }, { sku_id: "1217175518781243583", name: "Special Events", summary: " ", store_listing_id: "1217175518781243583", unpublished_at: "2024-03-12T12:00:00+00:00", updated_at: "2026-04-03T17:06:45.222554+00:00", assets: { id: { banner: "1217260346872430592", logo: "1217260340887158784" }, json: {}, url: {}, overrides: { catalog_banner: "https://cdn.yapper.shop/assets/261.png", hero_banner: "https://cdn.yapper.shop/assets/264.png" } }, text_config: {}, limited: true, products: [{ sku_id: "1157411685687115858", product_id: "1463960093866332200", name: "Ghosts", summary: "Look at them just spinning and grinning all day...", store_listing_id: "1157411685687115858", updated_at: "2026-04-03T17:02:55.181337+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 799, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 549, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1157411685687115858", asset: "a_b9a64088e30fd3a6f2456c2e0f44f173", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/0f170a3c8c6933afbeb3cbbd83f1ac042dcf1c810d556a4e1796f803bb8e81f1", animated_image_url: "https://cdn.discordapp.com/assets/content/ba124dcb35544dbe9592a60b956cd1b51501471076fcf36fdc6d66fca1feaa95" }, label: "You notice two spooky ghosts twirling around each other in an eternal dance. Are they friend or foe?" }], type: 0, premium_type: 0, google_sku_ids: { "5": "1157411685687115858_1259923583447076915", "7": "1157411685687115858_1259923596415995955" } }, { sku_id: "1157411984371880118", product_id: "1463960093392634070", name: "Graveyard Cat", summary: "Just a cat on graveyard duty.", store_listing_id: "1157411984371880118", updated_at: "2026-04-03T17:02:55.043477+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 799, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 549, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1157411984371880118", asset: "a_ad4e2cad924bbb3a2fddf5c527370479", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/33324c0614de266a6a6fbc855ef441f556ba285ce0750e2698bd2f492ac35eee", animated_image_url: "https://cdn.discordapp.com/assets/content/690f9235d327b9b5b77170d189f64f98ac10d5c662c35256d8d01db2963c0bbc" }, label: "Bathed in the glow of a full moon, a mysterious black cat is perched upon a tombstone, playfully pawing the tomb's exterior." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1157411984371880118_1259923550580641802", "7": "1157411984371880118_1259923572919500871" } }, { sku_id: "1157412388509864068", product_id: "1463960094780821524", name: "Jack-o'-lantern", summary: "You can practically hear its eerie cackle...", store_listing_id: "1157412388509864068", updated_at: "2026-04-03T17:02:55.414585+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 799, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 549, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1157412388509864068", asset: "a_50939e8f95b0ddfa596809480b0eb3e1", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b26e4a6152e06c488951def32f74602dc54b3f0acfabd4cb132bc44270392048", animated_image_url: "https://cdn.discordapp.com/assets/content/623d21174f4dcf6eb88d7cfb17f1ec8f108a0171caab816ecaba13da55ff6dc8" }, label: "A gleeful jack-o'-lantern cackles atop a dark, twisted branch, with bats swirling above to join in on the spooky shenanigans." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1157412388509864068_1259923625524592690", "7": "1157412388509864068_1259923635389464758" } }, { sku_id: "1157412779335090267", product_id: "1463960094319579252", name: "Minions", summary: "Name a more iconic duo.", store_listing_id: "1157412779335090267", updated_at: "2026-04-03T17:02:55.297852+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 799, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 549, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1157412779335090267", asset: "a_f979ba5f9c2ba83db3149cc02f489f7c", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/42d0a48a9f30612fb07ab6c8ade2d850f19afd03e6e7906b4ffa56b4f2825593", animated_image_url: "https://cdn.discordapp.com/assets/content/9274ef35ebf229545160ea942d55b64ecca1a79834e2c8f79b8725718357f8ca" }, label: "A one-eyed magic cauldron hovers in the air, bubbling with a strange, green brew. Its winged jack-o'-lantern companion flaps nearby. What mischief are they brewing?" }], type: 0, premium_type: 0, google_sku_ids: { "5": "1157412779335090267_1259923605937061950", "7": "1157412779335090267_1259923615483170846" } }, { sku_id: "1216908559548289084", product_id: "1463960166989824051", name: "I'm a Clown", summary: "I opened a bunch of Loot Boxes and all I got was this stupid clown decoration. Available to use until May 2024.", store_listing_id: "1216908559548289084", updated_at: "2026-04-03T17:03:19.825657+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1216908559548289084", asset: "a_5e1210779d99ece1c0b4f438a5bc6e72", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/9cd51bf4f87686d032ef1d016e1871f3305a139f86a8538c86a5af7dd347a938", animated_image_url: "https://cdn.discordapp.com/assets/content/1fd3c63746c6637930c70d45cbf8bef5ae20a80247dcaeacbd64d12bb381bc13" }, label: "An avatar wears a vibrant ensemble of colorful clown hair, bowtie, and a striking red nose that balloons and pops." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1216908559548289084_1259921467806584832" } }, { sku_id: "1225876188074082374", product_id: "1463960168017563670", name: "Gyoiko Sakura", summary: "A rare blossom only seen by a fortunate few.", store_listing_id: "1225876188074082374", updated_at: "2026-04-03T17:03:20.274843+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1225876188074082374", asset: "a_d6760c807d460b45e06427c09ab61390", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/7538f12d024537e8af56e619f3771d62b14c20aca934ea5bb693c627da8672d7", animated_image_url: "https://cdn.discordapp.com/assets/content/5a28a04e2a6a5172a06ec297db837fcc8bb776e75f7cf9184b5453a7206aef5f" }, label: "The petals of three lovely, green cherry blossoms drift softly across the avatar." }], type: 0, premium_type: 2, google_sku_ids: { "5": "1225876188074082374_1259921478934331463" } }, { sku_id: "1226939756617793606", product_id: "1463960169263268037", name: "Mokoko", summary: "An affectionate Mokoko wants to give you plenty of hugs! Exclusive to Mokoko Quest 2024 for a limited time.", store_listing_id: "1226939756617793606", updated_at: "2026-04-03T17:03:20.455025+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1226939756617793606", asset: "a_89cd445201a0c6c64d46876503d0e90e", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/07c25eee136df71992cb8fff49db95ccda56f357b4e7b9a5c8878598bb2c1e65", animated_image_url: "https://cdn.discordapp.com/assets/content/6c23e5adc03b6afc8eddac37427b9188f89a8935b3f81dc92d1f19ec1347fa0c" }, label: "An affectionate Mokoko hugs the avatar then slides down and climbs back up to hug the avatar again." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1226939756617793606_1259921488589492404" } }, { sku_id: "1251324401459265537", product_id: "1463960174053032161", name: "Warp Helmet", summary: "Traveling at the speed of light. Available to use until September 9, 2024.", store_listing_id: "1251324401459265537", updated_at: "2026-04-03T17:03:21.831676+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1251324401459265537", asset: "a_bb31faaec1be1ef5ff32dcdc5f37efbf", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/c8756ccde8178007956c2440a638202c4a043fdfa354fdc0cba6197294b9d66c", animated_image_url: "https://cdn.discordapp.com/assets/content/240fee6edb34dd7d6f7c827c93e27e304a343dbc8bdab191e565ade345af134c" }, label: "Futuristic Helmet, Blue with Green Warp Speed Light, Animated" }], type: 0, premium_type: 0, google_sku_ids: { "5": "1251324401459265537_1259921507694411866" } }, { sku_id: "1252353273256480818", product_id: "1463960169749942373", name: "Fortnite Victory Crown", summary: "A sparkly crown!", store_listing_id: "1252353273256480818", updated_at: "2026-04-03T17:03:20.704688+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1252353273256480818", asset: "a_65db91cee351e36150a2b506b26eba71", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/4a91285355f995da20e6c959a437803984f3f2fb8ea054e98681f5dbd0ed3c43", animated_image_url: "https://cdn.discordapp.com/assets/content/58f5da651b27cfa8a29562aa9761fe586ffb4267ede19d8be930092693397f7f" }, label: "A gold, sparkly crown with a llama adornment tilts up and down. The avatar sparkles and glows with a golden aura." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1252353273256480818_1259921498232328313" } }, { sku_id: "1262457693965258874", product_id: "1463960170886467768", name: "Freezer Bunny Lovebug", summary: "A Sim's coolest companion!", store_listing_id: "1262457693965258874", updated_at: "2026-04-03T17:03:20.834825+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1262457693965258874", asset: "a_4946d58f2f74d54703a7aa26b494f62b", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/57d5e70a59feaa9e42ee5ce9f699b23eac6db72c21a5d10fefd65b5f2e4d8a1b", animated_image_url: "https://cdn.discordapp.com/assets/content/8fc71bb996017252cfdebe47a76ba579b53390a0b2198997851ad5771c0335e9" }, label: "An adorable Freezer Bunny. It bounces upward into frame and throws hearts into the sky around the avatar." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1262457693965258874_1262873203785732268" } }, { sku_id: "1262473048876122112", product_id: "1463960175378567332", name: "Wingman Boba", summary: "Your trusty VALORANT buddy, with a refreshing bubbly twist. Available to use until October 6, 2024.", store_listing_id: "1262473048876122112", updated_at: "2026-04-03T17:03:21.986536+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1262473048876122112", asset: "a_71b359795488ef63c5c39a46bb8f2e54", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b7f8afc4eb28b96c01cc31e90e7ccac9e52604b000c93e498d55bd908e7cec85", animated_image_url: "https://cdn.discordapp.com/assets/content/c72cc9621a5a523edb3ce8344d64a310892ff6c1857496eaa1e44a68d14f6ed2" }, label: "VALORANT Agent Gekko's cute yellow creature presents you with a boba tea and happily floats beside your avatar, creating a delightful and playful atmosphere." }], type: 0, premium_type: 0, google_sku_ids: { "5": "1262473048876122112_1262819212146114640" } }, { sku_id: "1262518692248420434", product_id: "1463960171339448433", name: "Los Santos", summary: "Available until October 16, 2024", store_listing_id: "1262518692248420434", updated_at: "2026-04-03T17:03:21.017625+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1262518692248420434", asset: "a_aa2dc0f4bfa22bd81ea3990c52d29a96", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/3dfbc92aa685fd938a49d8f817d7759316485fc1df8a8e14aa2992fc2461c92b", animated_image_url: "https://cdn.discordapp.com/assets/content/f720b7d8ef61430967621774bfde793bb01bedd43f02a01c7cd4799dfe5930e3" }, label: 'Reads "City of Los Santos, Founded 1781", and shows a helicopter with a searchlight flying into the frame.' }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1272728337848074271", product_id: "1463960177152622810", name: "Test Collectible Quest Reward", summary: "This is a test Collectible Quest Reward.", store_listing_id: "1272728337848074271", updated_at: "2026-04-03T17:03:22.389809+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 39999, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1272728337848074271", asset: "a_d6760c807d460b45e06427c09ab61390", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/7538f12d024537e8af56e619f3771d62b14c20aca934ea5bb693c627da8672d7", animated_image_url: "https://cdn.discordapp.com/assets/content/5a28a04e2a6a5172a06ec297db837fcc8bb776e75f7cf9184b5453a7206aef5f" }, label: "The petals of three lovely, green cherry blossoms drift softly across the avatar." }], type: 0, premium_type: 0, google_sku_ids: { "7": "1272728337848074271_1328837330622218431" } }, { sku_id: "1278392092258734091", product_id: "1463960173054922832", name: "Hailey", summary: "Worn by the legendary sniper in The First Descendant", store_listing_id: "1278392092258734091", updated_at: "2026-04-03T17:03:21.586054+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1278392092258734091", asset: "a_5b45aae315729f18693436892dc18f45", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/1d1620646cce360c2c02caa44b68798172869a7858ecc61f62c264b80b385776", animated_image_url: "https://cdn.discordapp.com/assets/content/a59915bc0650b1e428c7f3e5be5f0b296b7ae0f22be1fdba366e69e36d232b91" }, label: "A white fur coat hood that pulls a cover over the mouth as snow falls around the decoration" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1280648686736638003", product_id: "1463960178171969741", name: "Torgal Puppy", summary: "Torgal the puppy is here to keep you company! This reward is exclusive to the FFXVI Quest.", store_listing_id: "1280648686736638003", updated_at: "2026-04-03T17:03:24.456721+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1280648686736638003", asset: "a_d7428e37c943872da271573c87d90279", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/3462089a32197bdc7573b7de348a9dc8d2bf134c28fc427fea8a5e4c648c7de2", animated_image_url: "https://cdn.discordapp.com/assets/content/ff6207b91d09522414a71e761b739bd90003672cd1c117355b907518ba38b332" }, label: "Torgal the Puppy chasing a firefly but not catching it." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1280648686749352003", product_id: "1463960171968463053", name: "Street Fighter 6 Battle Field Avatar Decoration", summary: "Avatar Decoration for the Award winning Street Fighter 6. Exclusive to Street Fighter 6 Quest for a limited time.", store_listing_id: "1280648686749352003", updated_at: "2026-04-03T17:03:21.216930+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1280648686749352003", asset: "a_02b093ffabbd814ff310dd32c05063e5", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/f323f78703477d98e0bb941f1d2ad3d9d4c8713553381ee259cf0f2c55d19218", animated_image_url: "https://cdn.discordapp.com/assets/content/cbd2d992286cc45e1922e5497c9bdac0887bfb01e2c78e9ef1088459172da797" }, label: "Shows two health bars, a timer, fireballs moving between the two health bars, and the word FIGHT!" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1280648686749352007", product_id: "1463960173558235339", name: "Bunny", summary: "Worn by Albion's speedster, Bunny, in The First Descendant.", store_listing_id: "1280648686749352007", updated_at: "2026-04-03T17:03:21.718878+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1280648686749352007", asset: "a_fa5e1b99f7a3fbd1ae3be43075d36167", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/48725ffdcec823e7957e9e0d4e8347e3d62fd1dc56131726865495434ee0a057", animated_image_url: "https://cdn.discordapp.com/assets/content/cd43600760c4987023a6c57455ca0df3e2fd8b3f7dddaab67f3bb19c81947f33" }, label: "A futuristic headpiece with glowing ears that crackle with electric energy." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1286046055498252319", product_id: "1463960178675155180", name: "Wolf Morph", summary: "Your Morph can take on many unique forms and help you move throughout the world in THRONE AND LIBERTY.", store_listing_id: "1286046055498252319", updated_at: "2026-04-03T17:03:25.050545+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1286046055498252319", asset: "a_e493810a0ac505c6584c422e80eed664", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/ac040fd5f35a3fd8003b6f20cbb527013c73a352daed83287c822cd45b9902b5", animated_image_url: "https://cdn.discordapp.com/assets/content/d5973059672e0c1d69bf7632fef169478d0dcf76a71810dc10876a3c433bf4b3" }, label: "Wolf Morph appears, shakes their head, then disappears" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1301993378484850769", product_id: "1463960183469244513", name: "2025 Balloons", summary: "Cheers to 2025!!", store_listing_id: "1301993378484850769", updated_at: "2026-04-03T17:03:25.612345+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1301993378484850769", asset: "a_b1da12c72766c550c1759bf5c9dc6c7a", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/b56b7ce664dd8fbd09ab8a1c9f9990a4aa1180bf15d461af1195783a819c759a", animated_image_url: "https://cdn.discordapp.com/assets/content/4fb0f7b3cb3eee6882a1ce5531e7627efc34106a4f98a8c1f3cafd2239dd0d2a" }, label: "Gold, metallic, balloon-style numbers arranged to spell 2025." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1301993378484850771", product_id: "1463960183939141929", name: "Holiday Cat Ears", summary: "o<≽^ᴖ ωᴖ^≼", store_listing_id: "1301993378484850771", updated_at: "2026-04-03T17:03:25.786248+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1301993378484850771", asset: "a_643e26a948548adb435b1078f273c426", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/95c0584fc407fcf5cd0625428675458608877d611468831a5b234de673f33f35", animated_image_url: "https://cdn.discordapp.com/assets/content/abd0d15db44b749f8d41f1642ae62162291c4f4871d7c98826731a3dddd91d6d" }, label: "A Santa hat with a red, pointed top and fluffy white trim, designed with two prominent cat ears that stick up on either side" }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1301993378484850773", product_id: "1463960185415532585", name: "Snowfall", summary: "From chill to chilly.", store_listing_id: "1301993378484850773", updated_at: "2026-04-03T17:03:25.961680+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1301993378484850773", asset: "a_65cce62b814c5d0c17ee2be00e5f2f77", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/9f5e26c59c924f801593f74a00a989d995ebbf6618ccec53953c605cd480433f", animated_image_url: "https://cdn.discordapp.com/assets/content/a4317b8d678278d56faea55ff216485675176cf46c7cc1f281aefb20f6b284ea" }, label: "Snowflakes fall gently around the avatar, creating a winter wonderland." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1304519765917696011", product_id: "1463960181808435251", name: "Gear Spin", summary: "Spinning at the speed of sound", store_listing_id: "1304519765917696011", updated_at: "2026-04-03T17:03:25.299501+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1304519765917696011", asset: "a_9cd7e573f48859a995266a0a8345f336", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/ed335e8a845e2e3289dd199f3999e531d0b8ec31821559f11049570bd5ca5245", animated_image_url: "https://cdn.discordapp.com/assets/content/433dbc768763953670ca581a6a6a60c19d4cb01f7ffd11de923edc4d31830abd" }, label: "A pink and purple gear spins rapidly around your avatar, putting off neon green sparks. Careful with that." }], type: 0, premium_type: 0, google_sku_ids: {} }, { sku_id: "1305905202578325535", product_id: "1463960182978641930", name: "Wallach IX Spaceport", summary: "The Wallach IX Spaceport is a dynamic port for space travel on the planet Wallach IX. This reward is exclusive to the Dune: Prophecy Quest.", store_listing_id: "1305905202578325535", updated_at: "2026-04-03T17:03:25.475646+00:00", prices: { "0": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } }, "4": { country_prices: { country_code: "US", prices: [{ amount: 0, currency: "usd", exponent: 2 }] } } }, items: [{ type: 0, sku_id: "1305905202578325535", asset: "a_7f1a6455d390697420e8b3af663143b3", assets: { static_image_url: "https://cdn.discordapp.com/assets/content/c22e6b44defa2dd864b9dfa455ab90408f3a5ce8774f5b4dadcac2425e892d12", animated_image_url: "https://cdn.discordapp.com/assets/content/a75aa00f6ad84a6696ce61a95c2674e443907f50d2948700a6bf15d4b29885dc" }, label: "A spacecraft flies by two pillars at the Wallach IX Spaceport past a glowing crescent ring and disappears." }], type: 0, premium_type: 0, google_sku_ids: {} }] }];

// src/global/stores/ShopCollectiblesStore.tsx
function itemsByType(collection, type) {
  if (!collection)
    return null;
  const items = collection.products.flatMap((p) => p.items.filter((i) => i.type === type).map((i) => ({ ...i, productName: p.name })));
  return [...new Map(items.map((i) => [i.sku_id, i])).values()];
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
    return this.collections.flatMap((c) => c.products.flatMap((p) => p.items.map((i) => ({ ...i, productName: p.name }))));
  }
  getShopItemBySkuId(skuId) {
    return this.getAllShopItems().find((i) => i.sku_id === skuId);
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
    return this.getAllQuestRewards().map((r) => this.getShopItemBySkuId(r.sku_id)).filter((i) => i !== undefined);
  }
  getQuestAvatarDecorations() {
    return this.getAllResolvedQuestItems().filter((i) => i.type === 3);
  }
  unload() {
    this.collections = null;
    this.quests = null;
    this._invalid = null;
  }
};

// src/ui/ProfileEffects.tsx
var { Components: Components6, React: React10 } = BetterDiscord;
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
function ProfileEffect({ product }) {
  const skuId = product.sku_id;
  const src = product.thumbnailPreviewSrc;
  const title = product.title;
  function copyProfileEffect3y3(skuId2) {
    copyToClipboard(" " + secondsightifyEncodeOnly("fx" + skuId2), "3y3 copied to clipboard!");
  }
  return /* @__PURE__ */ React10.createElement("img", {
    onClick: () => copyProfileEffect3y3(skuId),
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
function Category({ skuId, query }) {
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
  }, category?.name) : null, filteredProducts?.map((x) => /* @__PURE__ */ React10.createElement(ProfileEffect, {
    product: x
  })));
}
function ProfileEffects() {
  const [query, setQuery] = useState("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  return /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement(Components6.SearchInput, {
    value: query,
    placeholder: "Search...",
    onChange: (e) => setQuery(e.target.value),
    style: {
      backgroundColor: `var(--control-secondary-background-default)`
    }
  }), Collections.map((id) => {
    return /* @__PURE__ */ React10.createElement(Category, {
      skuId: id,
      query
    });
  }));
}
// src/ui/AvatarDecorations.tsx
var { Components: Components7, React: React11, Webpack: Webpack2 } = BetterDiscord;
var { UserStore: UserStore6 } = Webpack2.Stores;
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
function copyProfileEffect3y3(skuId) {
  copyToClipboard(" " + secondsightifyEncodeOnly("/a" + skuId), "3y3 copied to clipboard!");
}
function AvatarDecoration({ product }) {
  const [hovered, setHovered] = useState(false);
  const skuId = product.sku_id;
  const decorationItem = { ...product, skuId: product.sku_id };
  return /* @__PURE__ */ React11.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => copyProfileEffect3y3(skuId),
    title: product.productName,
    style: { cursor: "pointer" }
  }, /* @__PURE__ */ React11.createElement(ProductDisplayer, {
    isHighlighted: hovered,
    item: decorationItem,
    user: UserStore6.getCurrentUser(),
    avatarSize: "SIZE_72"
  }));
}
function InvalidProductDisplay({ product }) {
  const [hovered, setHovered] = useState(false);
  const skuId = product.sku_id;
  const decorationItem = { ...product, skuId: product.sku_id };
  return /* @__PURE__ */ React11.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => copyProfileEffect3y3(skuId),
    title: product.name,
    style: { cursor: "pointer" }
  }, /* @__PURE__ */ React11.createElement(ProductDisplayer, {
    avatarSize: "SIZE_72",
    isHighlighted: hovered,
    item: decorationItem,
    user: UserStore6.getCurrentUser()
  }));
}
function Category2({ skuId, query }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  const products = ShopCollectiblesStore_default.getAvatarDecorations(skuId);
  const filteredProducts = useMemo(() => {
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
  }, filteredProducts.map((x) => /* @__PURE__ */ React11.createElement(AvatarDecoration, {
    key: x.sku_id,
    product: x
  }))));
}
function QuestCategory({ questDecorations, query }) {
  const filteredProducts = useMemo(() => {
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
  }, filteredProducts.map((x) => /* @__PURE__ */ React11.createElement(AvatarDecoration, {
    key: x.sku_id,
    product: x
  }))));
}
function InvalidCategory({ category, query }) {
  const filteredProducts = useMemo(() => {
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
    product
  }))));
}
function Invalid({ query }) {
  const categories = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getInvalids().map((x) => ShopCollectiblesStore_default.getInvalid(x)).filter(Boolean));
  if (!categories?.length)
    return null;
  return /* @__PURE__ */ React11.createElement("div", null, categories.map((x) => /* @__PURE__ */ React11.createElement(InvalidCategory, {
    key: x.id,
    category: x,
    query
  })));
}
function AvatarDecorations() {
  const [query, setQuery] = useState("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  const questDecorations = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getQuestAvatarDecorations());
  return /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement(Components7.SearchInput, {
    value: query,
    placeholder: "Search decorations...",
    onChange: (e) => setQuery(e.target.value),
    style: {
      backgroundColor: "var(--control-secondary-background-default)"
    }
  }), Collections?.map((id) => /* @__PURE__ */ React11.createElement(Category2, {
    key: id,
    skuId: id,
    query
  })), /* @__PURE__ */ React11.createElement(QuestCategory, {
    query,
    questDecorations
  }), /* @__PURE__ */ React11.createElement(Invalid, {
    query
  }));
}
// src/ui/Nameplates.tsx
var { React: React12, Components: Components8 } = BetterDiscord;
var ModalModule6 = wpGetByKeys(["Modal"]);
var Nameplate = React12.lazy(async () => ({ default: await wpWait(BetterDiscord.Webpack.Filters.bySource(".x5CoXR),className:"), { declaration: (x) => String(x).includes(".x5CoXR),className:") }) }));
var { UserStore: UserStore7 } = BetterDiscord.Webpack.Stores;
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
function Nameplate3y3({ product }) {
  const [hovered, setHovered] = React12.useState(false);
  return /* @__PURE__ */ React12.createElement("div", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => copyNameplate3y3({ skuId: product.sku_id, palette: product.palette }),
    style: {
      marginBottom: "10px"
    },
    title: product.productName
  }, /* @__PURE__ */ React12.createElement(Nameplate, {
    section: "purchase",
    currentUser: UserStore7.getCurrentUser(),
    nameplate: { skuId: product.sku_id, asset: product.asset, label: product.label, palette: product.palette },
    canUsePremiumCollectibles: true,
    isSelected: hovered
  }));
}
function NameplateCategory({ skuId, query }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  if (!category)
    return null;
  const products = ShopCollectiblesStore_default.getNameplates(skuId);
  const filteredProducts = useMemo(() => {
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
  }, filteredProducts.length ? /* @__PURE__ */ React12.createElement(Components8.Text, null, category.name) : null, filteredProducts.map((x) => /* @__PURE__ */ React12.createElement(Nameplate3y3, {
    product: x
  }))) : null;
}
function Nameplates() {
  const [query, setQuery] = useState("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  return /* @__PURE__ */ React12.createElement("div", null, /* @__PURE__ */ React12.createElement(Components8.SearchInput, {
    placeholder: "Search nameplates...",
    value: query,
    onChange: (e) => setQuery(e.target.value)
  }), Collections.map((x) => /* @__PURE__ */ React12.createElement(NameplateCategory, {
    skuId: x,
    query
  })));
}
// src/ui/ProfileFrames.tsx
var { React: React13, Components: Components9 } = BetterDiscord;
var ModalModule7 = wpGetByKeys(["Modal"]);
var ProfileFrameElem = React13.lazy(async () => ({ default: await wpWait(BetterDiscord.Webpack.Filters.bySource("let{profileFrame:"), { declaration: (x) => String(x).includes("let{profileFrame:") }) }));
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
function ProfileFrame({ product }) {
  const [hovered, setHovered] = React13.useState(false);
  return /* @__PURE__ */ React13.createElement("div", {
    onMouseOver: () => setHovered(true),
    onMouseOut: () => setHovered(false),
    onClick: () => copyProfileFrame3y3({ skuId: product.sku_id }),
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
function ProfileFrameCategory({ skuId, query }) {
  const category = ShopCollectiblesStore_default.getCategory(skuId);
  if (!category)
    return null;
  const products = ShopCollectiblesStore_default.getProfileFrames(skuId);
  const filteredProducts = useMemo(() => {
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
  }, filteredProducts.map((x) => /* @__PURE__ */ React13.createElement(ProfileFrame, {
    product: x
  })))) : null;
}
function ProfileFrames() {
  const [query, setQuery] = useState("");
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore_default], () => ShopCollectiblesStore_default.getCategories());
  return /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement(Components9.SearchInput, {
    placeholder: "Search nameplates...",
    value: query,
    onChange: (e) => setQuery(e.target.value)
  }), Collections.map((x) => /* @__PURE__ */ React13.createElement(ProfileFrameCategory, {
    skuId: x,
    query
  })));
}
// src/patches/modules/UserProfileV2.tsx
var { React: React14, Components: Components10 } = BetterDiscord;
var { UserStore: UserStore8 } = BetterDiscord.Webpack.Stores;
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
  const isDeveloper = BadgesStore_default.isImportant(UserStore8.getCurrentUser().id);
  const [devText, setDevText] = React14.useState("");
  return /* @__PURE__ */ React14.createElement(Scroller, null, /* @__PURE__ */ React14.createElement(Grid, null, /* @__PURE__ */ React14.createElement(CardTop, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Theme Colors"), /* @__PURE__ */ React14.createElement(AccentColors, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Custom PFP"), /* @__PURE__ */ React14.createElement(CustomPFP, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Custom Banner"), /* @__PURE__ */ React14.createElement(CustomBanner, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Display Name Style"), /* @__PURE__ */ React14.createElement(OpenDisplayNameStyleModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Profile Effect"), /* @__PURE__ */ React14.createElement(OpenProfileEffectModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Avatar Decoration"), /* @__PURE__ */ React14.createElement(OpenAvatarDecorationModalButton, null)), /* @__PURE__ */ React14.createElement(Card, null, /* @__PURE__ */ React14.createElement(CardLabel, null, "Nameplate"), /* @__PURE__ */ React14.createElement(OpenNameplateModalButton, null)), /* @__PURE__ */ React14.createElement(Card, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Profile Frame"), /* @__PURE__ */ React14.createElement(OpenProfileFramesModalButton, null)), isDeveloper ? /* @__PURE__ */ React14.createElement(Card, {
    style: { gridColumn: "span 2" }
  }, /* @__PURE__ */ React14.createElement(CardLabel, null, "Developer"), /* @__PURE__ */ React14.createElement("div", {
    style: { display: "flex", gap: "8px", width: "100%" }
  }, /* @__PURE__ */ React14.createElement(Components10.TextInput, {
    value: devText,
    onChange: setDevText,
    style: { flex: 1 }
  }), /* @__PURE__ */ React14.createElement(Components10.Button, {
    onClick: () => {
      copyToClipboard(secondsightifyEncodeOnly(devText), "[DEV] Copied uwu!");
    }
  }, "Encode"))) : null));
}
var UserProfileV2_default = {
  name: "User Profile V2",
  description: "skibidi toilet",
  ids: [
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource("speakingWhilePTTInactive"), { raw: true }).then((x) => x.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource("StageChannelCall"), { raw: true }).then((x) => x.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource(/initialSelectedNameplate:.,stackingBehavior/), { raw: true }).then((x) => x.id),
    async () => await wpWait(BetterDiscord.Webpack.Filters.bySource(/initialSelectedProfileFrame:.,stackingBehavior:.,returnRef/), { raw: true }).then((x) => x.id)
  ],
  priority: 1,
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
      if (args?.displayProfile?.userId != UserStore8.getCurrentUser().id)
        return res;
      if (args?.items && args.items.find((x) => x.text.includes("YABD")))
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
// src/global/stores/UserProfilePictureStore.ts
var USER_BG2 = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";
var UserProfilePictureStore_default = new class UserProfilePictureStore extends BetterDiscord.Utils.Store {
  users = {};
  constructor() {
    super();
    this.fetch();
  }
  get(userId) {
    return this.users[userId];
  }
  hasHash(id) {
    return Boolean(this.users[id]);
  }
  async fetch() {
    const data = await BetterDiscord.Net.fetch(USER_BG2);
    const response = await data.json();
    this.users = response.avatars;
  }
  unload() {
    this.users = {};
  }
};

// src/patches/modules/getAvatarURL.ts
var UserClass = wpGet((x) => x.prototype?.getAvatarURL, { searchExports: true });
var getAvatarURL_default = {
  name: "getAvatarURL",
  apply(finale, patcher) {
    patcher.instead(UserClass.prototype, "getAvatarURL", (_, [args], callback) => {
      if (!SettingsStore_default.get("customPFPs") || !SettingsStore_default.get("userPfpIntegration"))
        return callback(args);
      const userPicture = UserProfilePictureStore_default.get(_.id);
      if (!userPicture)
        return callback(args);
      const foundPFP = getRevealedText(_.id, `\uDB40\uDC50\uDB40\uDC7B`);
      if (!foundPFP)
        return userPicture;
      const matches = foundPFP.match(regexReveals_default.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
      if (!matches)
        return userPicture;
      return `https://i.imgur.com/${matches}`;
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
  canUserUse: (x) => typeof x === "function" && x.toString?.().includes?.(".getFeatureValue(")
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
  state: (x) => x?.setState
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
        const ShareThemeButton = wpGet(BetterDiscord.Webpack.Filters.bySource(`custom_themes_editor_footer`), { declaration: BetterDiscord.Webpack.Filters.byStrings("CustomThemesShareModalWrapper"), raw: true });
        const onSaveTheme = BetterDiscord.Utils.findInTree(ret, (x) => x?.onSaveTheme).onSaveTheme;
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
var { UserStore: UserStore9 } = BetterDiscord.Webpack.Stores;
var premiumType_default = {
  name: "premiumType",
  description: "Makes sure the premium type is always what you want",
  apply(finale, patcher) {
    const randomAssStore = BetterDiscord.Webpack.getStore("OverridePremiumTypeStore");
    patcher.instead(randomAssStore, "getPremiumTypeActual", (_, __, callback) => {
      const info = SettingsStore_default.get("changePremiumType2");
      if (info != -1)
        return info;
      else
        return callback();
    });
  }
};
// src/global/shared/steamExploit.ts
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

// src/patches/modules/cameraPreviewBypass.ts
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
var cameraPreviewBypass_default = {
  name: "cameraPreviewBypass",
  apply(finale, patcher) {
    patcher.after(PresetModule, "A", (thisObj, args, result) => {
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
      const user = args[0].message.author;
      if (!res.props.badges.find((x) => x.key.includes("yabd")) && (BadgesStore_default.check(user.id) || BadgesStore_default.isImportant(user.id))) {
        res.props.badges.push(/* @__PURE__ */ React16.createElement("img", {
          key: "yabd-badge",
          height: "16px",
          width: "16px",
          src: BadgesStore_default.returnRespondingBadge(user.id).iconSrc
        }));
      }
      return res;
    });
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
var import_jszip = __toESM(require_lib3(), 1);
var { React: React17 } = BetterDiscord;
var yourFlyIsShowing = new import_jszip.default;
var DiscordNativeModule = BetterDiscord.Webpack.getByKeys("purgeMemory");
var message_default = {
  id: "message",
  callback(res, props) {
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
        blob: await (await BetterDiscord.Net.fetch(attachment.url)).blob(),
        fileName: attachment.filename.replace(".zip.mp4", ".zip").replace(".7z.mp4", ".7z")
      })));
      for (const file of files) {
        yourFlyIsShowing.file(file.fileName, file.blob);
        DiscordNativeModule.purgeMemory();
      }
      const zipBlob = await yourFlyIsShowing.generateAsync({ type: "blob" });
      files = [];
      const url = URL.createObjectURL(zipBlob);
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
var Slider = BetterDiscord.Webpack.getByStrings("initialValue", "label", "sortedMarkers", { searchExports: true });
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
      SettingsStore_default.set("userSharpenPreferences", { ...SettingsStore_default.get("userSharpenPreferences"), [streamingUserId]: percentSharpness });
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
  return Promise.all(entries.map(async (entry) => {
    const id = typeof entry === "function" ? await entry() : entry;
    const cacheKey = id.toString();
    if (idCache.has(cacheKey)) {
      return idCache.get(cacheKey);
    }
    const resolvedId = await BetterDiscord.Utils.forceLoad(id);
    idCache.set(cacheKey, resolvedId);
    return resolvedId;
  }));
}
function withTimeout(p, ms, label) {
  return Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout waiting for ${label}`)), ms))
  ]);
}
async function getCachedModule(filter, patchName) {
  const cacheKey = typeof filter === "function" ? filter.toString() : JSON.stringify(filter);
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
    ...Array.isArray(patch.waitFor) ? patch.waitFor.map(async (x, i) => {
      try {
        const module2 = await getCachedModule(x, patch.name);
        if (!finale.modules)
          finale.modules = [];
        finale.modules[i] = module2;
      } catch (e) {
        BetterDiscord.Logger.warn(`[Patcher] Failed to load module ${i} for ${patch.name}`, e);
      }
    }) : [],
    ...patch.mangled && patch.waitFor ? [getCachedModule(patch.waitFor[0], patch.name).then(() => {
      finale.mangled = BetterDiscord.Webpack.getMangled(patch.waitFor[0], patch.mangled);
    }).catch((e) => BetterDiscord.Logger.warn(`[Patcher] Failed to load mangled for ${patch.name}`, e))] : []
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
            "Improved UI locations to be more convenient."
          ]
        },
        {
          title: "Known Bugs/Issues",
          type: "progress",
          items: [
            "Downloading large attachments can cause a memory leak due to `Buffer` handling if DevTools is open.",
            "Disabling and re-enabling the plugin may cause features to patch in slower than usual — this is intentional, for stability.",
            '**"Someones banner background is flickering"** — We know. Our code is silly sometimes.',
            '**"Opening the `Nameplates` and `Avatar Decorations` lags!"**, We know. That\'s because **Discord:tm:** loves money. Theres a lot of decorations...',
            `When streaming, right clicking and changing quality and FPS will NOT work. This is because of Discord:tm: having the most complex and confusing code internally. I will work on a fix soon after release... 

Its not easy.`
          ]
        },
        {
          title: "Extra",
          type: "added",
          items: [
            "New Profile Frames added to the 3y3 encode bypass list.",
            "You can now set a custom camera preview 🥳🎉🎉🎉!!",
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
    "@iconify/react": "^6.0.2",
    "@types/react": "^19.2.18",
    jszip: "^3.10.1",
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
var { UserStore: UserStore12, ApexExperimentStore } = BetterDiscord.Webpack.Stores;
var SettingsSchema = [
  {
    key: "screenSharing",
    label: "High Quality Screensharing",
    note: "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options.",
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
    key: "ResolutionSwapper",
    label: "Stream Settings Quick Swapper",
    note: "Lets you change your custom resolution and FPS quickly in the stream settings modal!",
    category: "Screen Share Features",
    type: "boolean"
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
    note: `The maximum bitrate (in kbps). If this is set to a negative number, the default for your quality choices is used. 
                    The default max bitrate for free quality options is 3500kbps, and for Nitro quality options (higher than 720p or higher than 30fps) it is 9000kbps as of April 2025. 
                    There is also a strange bug(?) where setting your max bitrate will cause issues with your stream's preview. 
                    If you want to avoid these issues, please disable this option.`,
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
    key: "uploadStickers",
    label: "Upload Stickers",
    note: "Upload stickers in the same way as emotes.",
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
    note: 'Unlocks soundmojis and allows you to "send" them by automatically replacing them with an OGG upload and some text representing the soundmoji. Please note that this will enable Experiments.',
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
    note: "Whether or not Clips-related experiments should be enabled. This doesn't disable on the fly, you will have to reload your client to get rid of the Experiments buttons in settings.",
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
  { key: "unlockAppIcons", label: "App Icons", note: "Unlocks app icons.", category: "Miscellaneous", type: "boolean" },
  {
    key: "extraContextMenus",
    label: "Extra Context Menus and Options",
    note: "Adds a Copy URL and Open URL buttons to the context menu that appears when you right-click an Emoji or Sticker in the Expression Picker, a context menu that will appear with Copy Link and Open Link options when you right-click a GIF in the GIF picker, a context menu that will appear when right-clicking on user avatars where a context menu wouldn't normally open (ex: blocked/ignored list), and a context menu on messages with attachments that lets you download all attachments.",
    category: "Miscellaneous",
    type: "boolean"
  },
  {
    key: "experiments",
    label: "Experiments",
    note: "Unlocks experiments. Soundmoji and Enable Clips Experiments have to be disabled to turn this off. Use at your own risk.",
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
    label: "Custom Background Source",
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
var _path2 = () => require("path");
var fs2 = () => require("fs");
var unpatchDevMode = null;
function startSet() {
  const { declarations: decls } = BetterDiscord.Webpack.getBySource("discord_dev_testing", { raw: true });
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
    this.checkChangelog();
    startSet();
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
              const path = _path2().join(bd_path, "BetterDiscord", "plugins", "YABDP4Nitro.plugin.js");
              fs2().writeFile(path, this.source, (err) => {
                if (err) {
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
    UserBackgroundStore_default.unload();
    UserProfilePictureStore_default.unload();
    ShopCollectiblesStore_default.unload();
    CustomUserProfileStore_default.unload();
    BadgesStore_default.unload();
  }
  renderControl(def, value) {
    const onChange = (v) => {
      SettingsStore_default.set(def.key, v);
      if (def.key == "changePremiumType2")
        UserStore12.getCurrentUser().premiumType = v;
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
      }, this.renderControl(def, values[def.key]))))));
    };
  }
}

/*@end@*/
