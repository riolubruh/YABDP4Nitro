/**
 * @name ZeresPluginLibrary
 * @version 2.0.2
 * @authorLink https://twitter.com/IAmZerebos
 * @website https://github.com/rauenzi/BDPluginLibrary
 * @source https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js
 */

/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/settings.css":
/*!*********************************!*\
  !*** ./src/styles/settings.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".plugin-input-group {\r\n    margin-top: 5px;\r\n}\r\n\r\n.plugin-input-group .button-collapse {\r\n    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItOTUwIDUzMiAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtOTUwIDUzMiAxOCAxODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6bm9uZTt9DQoJLnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQo8L3N0eWxlPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTS05MzIsNTMydjE4aC0xOHYtMThILTkzMnoiLz4NCjxwb2x5bGluZSBjbGFzcz0ic3QxIiBwb2ludHM9Ii05MzYuNiw1MzguOCAtOTQxLDU0My4yIC05NDUuNCw1MzguOCAiLz4NCjwvc3ZnPg0K);\r\n    height: 16px;\r\n    width: 16px;\r\n    display: inline-block;\r\n    vertical-align: bottom;\r\n    transition: transform .3s ease;\r\n    transform: rotate(0);\r\n}\r\n\r\n.plugin-input-group .button-collapse.collapsed {\r\n    transition: transform .3s ease;\r\n    transform: rotate(-90deg);\r\n}\r\n\r\n.plugin-input-group h2 {\r\n    font-size: 14px;\r\n}\r\n\r\n.plugin-input-group .plugin-input-group h2 {\r\n    margin-left: 16px;\r\n}\r\n\r\n.plugin-inputs {\r\n    height: auto;\r\n    overflow: hidden;\r\n    transition: height 300ms cubic-bezier(0.47, 0, 0.745, 0.715);\r\n}\r\n\r\n.plugin-inputs.collapsed {\r\n    height: 0px;\r\n}\r\n\r\n.file-input {\r\n\r\n}\r\n\r\n.file-input::-webkit-file-upload-button {\r\n    color: white;\r\n    background: #7289DA;\r\n    outline: 0;\r\n    border: 0;\r\n    padding: 10px;\r\n    vertical-align: top;\r\n    margin-top: -10px;\r\n    margin-left: -10px;\r\n    border-radius: 3px 0 0 3px;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;\r\n    cursor: pointer;\r\n}\r\n\r\n.color-input {\r\n    background: none;\r\n    padding: 0;\r\n    border: none;\r\n}\r\n\r\n.color-input:hover {\r\n    opacity: 0.8;\r\n}\r\n");

/***/ }),

/***/ "./src/styles/toasts.css":
/*!*******************************!*\
  !*** ./src/styles/toasts.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".toasts {\r\n    position: fixed;\r\n    display: flex;\r\n    top: 0;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n    pointer-events: none;\r\n    z-index: 4000;\r\n}\r\n\r\n@keyframes toast-up {\r\n    from {\r\n        transform: translateY(0);\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n.toast {\r\n    animation: toast-up 300ms ease;\r\n    transform: translateY(-10px);\r\n    background: #36393F;\r\n    padding: 10px;\r\n    border-radius: 5px;\r\n    box-shadow: 0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2);\r\n    font-weight: 500;\r\n    color: #fff;\r\n    user-select: text;\r\n    font-size: 14px;\r\n    opacity: 1;\r\n    margin-top: 10px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n@keyframes toast-down {\r\n    to {\r\n        transform: translateY(0px);\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n.toast.closing {\r\n    animation: toast-down 200ms ease;\r\n    animation-fill-mode: forwards;\r\n    opacity: 1;\r\n    transform: translateY(-10px);\r\n}\r\n\r\n.toast.toast-info {\r\n    background-color: #4a90e2;\r\n}\r\n\r\n.toast.toast-success {\r\n    background-color: #43b581;\r\n}\r\n\r\n.toast.toast-danger,\r\n.toast.toast-error {\r\n    background-color: #f04747;\r\n}\r\n\r\n.toast.toast-warning,\r\n.toast.toast-warn {\r\n    background-color: #FFA600;\r\n}\r\n\r\n.toast-icon {\r\n    margin-right: 5px;\r\n    fill: white;\r\n    border-radius: 50%;\r\n    overflow: hidden;\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.toast-text {\r\n    line-height: 20px;\r\n}");

/***/ }),

/***/ "./src/styles/updates.css":
/*!********************************!*\
  !*** ./src/styles/updates.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#pluginNotice {\r\n    -webkit-app-region: drag;\r\n    border-radius: 0;\r\n    overflow: hidden;\r\n    height: 36px;\r\n    animation: open-updates 400ms ease;\r\n}\r\n\r\n@keyframes open-updates {\r\n    from { height: 0; }\r\n}\r\n\r\n#pluginNotice.closing {\r\n    transition: height 400ms ease;\r\n    height: 0;\r\n}\r\n\r\n#outdatedPlugins {\r\n    font-weight: 700;\r\n}\r\n\r\n#outdatedPlugins>span {\r\n    -webkit-app-region: no-drag;\r\n    color: #fff;\r\n    cursor: pointer;\r\n}\r\n\r\n#outdatedPlugins>span:hover {\r\n    text-decoration: underline;\r\n}");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {

module.exports = {
    info: {
        name: "ZeresPluginLibrary",
        authors: [{
            name: "Zerebos",
            discord_id: "249746236008169473",
            github_username: "rauenzi",
            twitter_username: "IAmZerebos"
        }],
        version: "2.0.2",
        description: "Gives other plugins utility functions and the ability to emulate v2.",
        github: "https://github.com/rauenzi/BDPluginLibrary",
        github_raw: "https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
    },
    changelog: [
        {title: "What's Fixed?", type: "improved", items: ["Fixed an issue causing crashes.", "Fixed an issue where popouts got placed incorrectly.", "File picker does not overlay the entire settings panel", "Fixed an issue with color picker."]},
    ],
    main: "plugin.js"
};


/***/ }),

/***/ "./src/modules/colorconverter.js":
/*!***************************************!*\
  !*** ./src/modules/colorconverter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorConverter)
/* harmony export */ });
/* harmony import */ var _webpackmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webpackmodules */ "./src/modules/webpackmodules.js");
/**
 * Helpful utilities for dealing with colors.
 * @module ColorConverter
 */



const DiscordColorUtils = _webpackmodules__WEBPACK_IMPORTED_MODULE_0__["default"].getByProps("getDarkness", "isValidHex");

class ColorConverter {

    static getDarkness(color) {
        return DiscordColorUtils.getDarkness(color);
    }

    static hex2int(color) {return DiscordColorUtils.hex2int(color);}

    static hex2rgb(color) {return DiscordColorUtils.hex2rgb(color);}
    
    static int2hex(color) {return DiscordColorUtils.int2hex(color);}

    static int2rgba(color, alpha) {return DiscordColorUtils.int2rgba(color, alpha);}

    static isValidHex(color) {return DiscordColorUtils.isValidHex(color);}

    /**
     * Will get the red green and blue values of any color string.
     * @param {string} color - the color to obtain the red, green and blue values of. Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @returns {array} - array containing the red, green, and blue values
     */
    static getRGB(color) {
        let result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
        if (result) return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

        result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*\)/.exec(color);
        if (result) return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];

        result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
        if (result) return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        
        result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color);
        if (result) return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
    }

    /**
     * Will get the darken the color by a certain percent
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} percent - percent to darken the color by (0-100)
     * @returns {string} - new color in rgb format
     */
    static darkenColor(color, percent) {
        const rgb = this.getRGB(color);
        for (let i = 0; i < rgb.length; i++) rgb[i] = Math.round(Math.max(0, rgb[i] - rgb[i] * (percent / 100)));
        return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }

    /**
     * Will get the lighten the color by a certain percent
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} percent - percent to lighten the color by (0-100)
     * @returns {string} - new color in rgb format
     */
    static lightenColor(color, percent) {
        const rgb = this.getRGB(color);
        for (let i = 0; i < rgb.length; i++) rgb[i] = Math.round(Math.min(255, rgb[i] + rgb[i] * (percent / 100)));
        return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }

    /**
     * Converts a color to rgba format string
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} alpha - alpha level for the new color
     * @returns {string} - new color in rgb format
     */
    static rgbToAlpha(color, alpha) {
        const rgb = this.getRGB(color);
        return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
    }

}

/***/ }),

/***/ "./src/modules/discordclasses.js":
/*!***************************************!*\
  !*** ./src/modules/discordclasses.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _discordclassmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discordclassmodules */ "./src/modules/discordclassmodules.js");
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");



const getRaw = function(prop) {
    if (!this.hasOwnProperty(prop)) return "";
    return this[prop];
};

const getClass = function(prop) {
    if (!this.hasOwnProperty(prop)) return "";
    return this[prop].split(" ")[0];
};

/**
 * Proxy for all the class packages, allows us to safely attempt
 * to retrieve nested things without error. Also wraps the class in
 * {@link module:DOMTools.ClassName} which adds features but can still
 * be used in native function.
 * 
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 * 
 * @see module:DiscordClassModules
 * @module DiscordClasses
 */
const DiscordModules = new Proxy(_discordclassmodules__WEBPACK_IMPORTED_MODULE_0__["default"], {
    get: function(list, item) {
        if (item == "getRaw" || item == "getClass") return (module, prop) => DiscordModules[module][item]([prop]);
        if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
        return new Proxy(list[item], {
            get: function(obj, prop) {
                if (prop == "getRaw") return getRaw.bind(obj);
                if (prop == "getClass") return getClass.bind(obj);
                if (!obj.hasOwnProperty(prop)) return "";
                return new _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].ClassName(obj[prop]);
            }
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiscordModules);

/***/ }),

/***/ "./src/modules/discordclassmodules.js":
/*!********************************************!*\
  !*** ./src/modules/discordclassmodules.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/* harmony import */ var _webpackmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webpackmodules */ "./src/modules/webpackmodules.js");



/**
 * A large list of known and labelled classes in discord.
 * Click the source link down below to view more info. Otherwise, if you
 * have the library installed or have a plugin using this library,
 * do `Object.keys(ZLibrary.DiscordClassModules)` in console for a list of modules.
 * 
 * You can use this directly, however the preferred way of doing this is to use {@link module:DiscordClasses} or {@link module:DiscordSelectors}
 * 
 * @see module:DiscordClasses
 * @see module:DiscordSelectors
 * @module DiscordClassModules
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_utilities__WEBPACK_IMPORTED_MODULE_0__["default"].memoizeObject({
    get ContextMenu() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("menu", "item");},
    get Scrollers() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("scrollerWrap", "scrollerThemed", "scrollerTrack");},
    get AccountDetails() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("container", "avatar", "hasBuildOverride");},
    get Typing() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("typing", "text");},
    get UserPopout() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("userPopout");},
    get PopoutRoles() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("roleCircle");},
    get UserModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("profileBadge");},
    get Textarea() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("channelTextArea", "textArea");},
    get Popouts() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("popouts", "popout");}, // broken, popouts element has been removed.
    get App() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("app", "mobileApp");},
    get Titles() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("defaultMarginh5");},
    get Notices() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("notice", "colorInfo");},
    get Backdrop() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("backdrop");},
    get Modals() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.modal && m.inner && !m.header);},
    get AuditLog() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("userHook");},
    get ChannelList() {return Object.assign({}, _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("containerDefault"), _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("name", "unread"), _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("sidebar", "hasNotice"));},
    get MemberList() {return Object.assign({}, _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("member", "memberInner"), _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("members", "membersWrap"));},
    get TitleWrap() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("titleWrapper");},
    get Titlebar() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("titleBar");},
    get Embeds() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("embed", "embedAuthor");},
    get Layers() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("layers", "layer");},
    get TooltipLayers() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("layerContainer", "layer");},
    get Margins() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => !m.title && m.marginBottom40 && m.marginTop40);},
    get Dividers() {return Object.assign({}, _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("dividerDefault"), _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => Object.keys(m).length == 1 && m.divider));},
    get Changelog() {return Object.assign({}, _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("container", "added"), _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("content", "modal", "size"));},
    get BasicInputs() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("inputDefault", "copyInput");},
    get Messages() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("message", "containerCozy");},
    get Guilds() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("guildsWrapper");},
    get EmojiPicker() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("emojiPicker", "emojiItem");},
    get Reactions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("reaction", "reactionInner");},
    get Checkbox() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("checkbox", "checkboxInner");},
    get Tooltips() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("tooltip", "tooltipBlack");}
}));



/***/ }),

/***/ "./src/modules/discordmodules.js":
/*!***************************************!*\
  !*** ./src/modules/discordmodules.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/* harmony import */ var _webpackmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webpackmodules */ "./src/modules/webpackmodules.js");
/**
 * A large list of known and useful webpack modules internal to Discord.
 * Click the source link down below to view more info. Otherwise, if you
 * have the library installed or have a plugin using this library,
 * do `Object.keys(ZLibrary.DiscordModules)` in console for a list of modules.
 * @module DiscordModules
 */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_utilities__WEBPACK_IMPORTED_MODULE_0__["default"].memoizeObject({
    get React() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("createElement", "cloneElement");},
    get ReactDOM() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("render", "findDOMNode");},
    get Events() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByPrototypes("setMaxListeners", "emit");},

    /* Guild Info, Stores, and Utilities */
    get GuildStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getGuild");},
    get SortedGuildStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getSortedGuilds");},
    get SelectedGuildStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getLastSelectedGuildId");},
    get GuildSync() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getSyncedGuilds");},
    get GuildInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getAcronym");},
    get GuildChannelsStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getChannels", "getDefaultChannel");},
    get GuildMemberStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getMember");},
    get MemberCountStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getMemberCounts");},
    get GuildEmojiStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getEmojis");},
    get GuildActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("requestMembers");},
    get GuildPermissions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getGuildPermissions");},

    /* Channel Store & Actions */
    get ChannelStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getChannel", "getDMFromUserId");},
    get SelectedChannelStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getLastSelectedChannelId");},
    get ChannelActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("selectChannel");},
    get PrivateChannelActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("openPrivateChannel");},

    /* Current User Info, State and Settings */
    get UserInfoStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getSessionId");},
    get UserSettingsStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("guildPositions");},
    get StreamerModeStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("hidePersonalInformation");},
    get UserSettingsUpdater() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("updateRemoteSettings");},
    get OnlineWatcher() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isOnline");},
    get CurrentUserIdle() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isIdle");},
    get RelationshipStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isBlocked", "getFriendIDs");},
    get RelationshipManager() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("addRelationship");},
    get MentionStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getMentions");},

    /* User Stores and Utils */
    get UserStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getCurrentUser", "getUser");},
    get UserStatusStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getStatus", "getState");},
    get UserTypingStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isTyping");},
    get UserActivityStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getActivity");},
    get UserNameResolver() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getName");},
    get UserNoteStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getNote");},
    get UserNoteActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("updateNote");},

    /* Emoji Store and Utils */
    get EmojiInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isEmojiDisabled");},
    get EmojiUtils() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getGuildEmoji");},
    get EmojiStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getByCategory", "EMOJI_NAME_RE");},

    /* Invite Store and Utils */
    get InviteStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getInvites");},
    get InviteResolver() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("resolveInvite");},
    get InviteActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("acceptInvite");},

    /* Discord Objects & Utils */
    get DiscordConstants() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Permissions", "ActivityTypes", "StatusTypes");},
    get DiscordPermissions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Permissions", "ActivityTypes", "StatusTypes").Permissions;},
    get Permissions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("computePermissions");},
    get ColorConverter() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("hex2int");},
    get ColorShader() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("darken");},
    get TinyColor() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByPrototypes("toRgb");},
    get ClassResolver() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getClass");},
    get ButtonData() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("ButtonSizes");},
    get NavigationUtils() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("transitionTo", "replaceWith", "getHistory");},

    /* Discord Messages */
    get MessageStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getMessage", "getMessages");},
    get ReactionsStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getReactions", "_dispatcher");},
    get MessageActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("jumpToMessage", "_sendMessage");},
    get MessageQueue() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("enqueue");},
    get MessageParser() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => Object.keys(m).length && Object.keys(m).every(k => k === "parse" || k === "unparse"));},

    /* Experiments */
    get ExperimentStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getExperimentOverrides");},
    get ExperimentsManager() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isDeveloper");},
    get CurrentExperiment() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getExperimentId");},

    /* Streams */
    get StreamStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getAllActiveStreams", "getStreamForUser");},
    get StreamPreviewStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getIsPreviewLoading", "getPreviewURL");},

    /* Images, Avatars and Utils */
    get ImageResolver() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getUserAvatarURL", "getGuildIconURL");},
    get ImageUtils() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getSizedImageSrc");},
    get AvatarDefaults() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getUserAvatarURL", "DEFAULT_AVATARS");},

    /* Drag & Drop */
    get DNDSources() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("addTarget");},
    get DNDObjects() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("DragSource");},

    /* Electron & Other Internals with Utils*/
    get ElectronModule() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("setBadge");},
    get Flux() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Store", "connectStores");},
    get Dispatcher() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("dirtyDispatch");},
    get PathUtils() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("hasBasename");},
    get NotificationModule() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("showNotification");},
    get RouterModule() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Router");},
    get APIModule() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getAPIBaseURL");},
    get AnalyticEvents() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("AnalyticEventConfigs");},
    get KeyGenerator() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByRegex(/"binary"/);},
    get Buffers() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Buffer", "kMaxLength");},
    get DeviceStore() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getDevices");},
    get SoftwareInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("os");},
    get i18n() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Messages", "languages");},

    /* Media Stuff (Audio/Video) */
    get MediaDeviceInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Codecs", "MediaEngineContextTypes");},
    get MediaInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getOutputVolume");},
    get MediaEngineInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("determineMediaEngine");},
    get VoiceInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getEchoCancellation");},
    get SoundModule() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("playSound");},

    /* Window, DOM, HTML */
    get WindowInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("isFocused", "windowSize");},
    get DOMInfo() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("canUseDOM");},

    /* Locale/Location and Time */
    get LocaleManager() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.Messages && Object.keys(m.Messages).length);},
    get Moment() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("parseZone");},
    get LocationManager() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("createLocation");},
    get Timestamps() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("fromTimestamp");},

    /* Strings and Utils */
    get Strings() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.Messages && Object.keys(m.Messages).length);},
    get StringFormats() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("a", "z");},
    get StringUtils() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("toASCII");},

    /* URLs and Utils */
    get URLParser() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Url", "parse");},
    get ExtraURLs() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("getArticleURL");},

    /* Text Processing */
    get hljs() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("highlight", "highlightBlock");},
    get SimpleMarkdown() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("parseBlock", "parseInline", "defaultOutput");},

    /* DOM/React Components */
    /* ==================== */
    get LayerManager() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("popLayer", "pushLayer");},
    get UserSettingsWindow() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "updateAccount");},
    get ChannelSettingsWindow() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "updateChannel");},
    get GuildSettingsWindow() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "updateGuild");},

    /* Modals */
    get ModalActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("openModal", "updateModal");},
    get ModalStack() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("push", "update", "pop", "popWithKey");},
    get UserProfileModals() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("fetchMutualFriends", "setSection");},
    get AlertModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByPrototypes("handleCancel", "handleSubmit");},
    get ConfirmationModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].findByDisplayName("ConfirmModal");},
    get ChangeNicknameModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "changeNickname");},
    get CreateChannelModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "createChannel");},
    get PruneMembersModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "prune");},
    get NotificationSettingsModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "updateNotificationSettings");},
    get PrivacySettingsModal() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.open && m.open.toString().includes("PRIVACY_SETTINGS_MODAL"));},
    get Changelog() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule((m => m.defaultProps && m.defaultProps.selectable == false));},

    /* Popouts */
    get PopoutStack() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("open", "close", "closeAll");},
    get PopoutOpener() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("openPopout");},
    get UserPopout() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.type.displayName === "UserPopoutContainer");},

    /* Context Menus */
    get ContextMenuActions() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("openContextMenu");},
    get ContextMenuItemsGroup() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByRegex(/itemGroup/);},
    get ContextMenuItem() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByRegex(/\.label\b.*\.hint\b.*\.action\b/);},

    /* Misc */
    get ExternalLink() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByRegex(/trusted/);},
    get TextElement() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("Text");},
    get Anchor() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("Anchor");},
    get Flex() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("Flex");},
    get FlexChild() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Child");},
    get Clickable() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("Clickable");},
    get Titles() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("Tags", "default");},
    get HeaderBar() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("HeaderBar");},
    get TabBar() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("TabBar");},
    get Tooltip() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("TooltipContainer").TooltipContainer;},
    get Spinner() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("Spinner");},

    /* Forms */
    get FormTitle() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("FormTitle");},
    get FormSection() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("FormSection");},
    get FormNotice() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("FormNotice");},

    /* Scrollers */
    get ScrollerThin() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("ScrollerThin").ScrollerThin;},
    get ScrollerAuto() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("ScrollerAuto").ScrollerAuto;},
    get AdvancedScrollerThin() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("AdvancedScrollerThin").AdvancedScrollerThin;},
    get AdvancedScrollerAuto() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("AdvancedScrollerAuto").AdvancedScrollerAuto;},
    get AdvancedScrollerNone() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("AdvancedScrollerNone").AdvancedScrollerNone;},

    /* Settings */
    get SettingsWrapper() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("FormItem");},
    get SettingsNote() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("FormText");},
    get SettingsDivider() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => !m.defaultProps && m.prototype && m.prototype.render && m.prototype.render.toString().includes("default.divider"));},

    get ColorPicker() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.displayName === "ColorPicker" && m.defaultProps);},
    get Dropdown() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("SingleSelect").SingleSelect;},
    get Keybind() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByPrototypes("handleComboChange");},
    get RadioGroup() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("RadioGroup");},
    get Slider() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByPrototypes("renderMark");},
    get SwitchRow() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByDisplayName("SwitchItem");},
    get Textbox() {return _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.defaultProps && m.defaultProps.type == "text");},
}));


/***/ }),

/***/ "./src/modules/discordselectors.js":
/*!*****************************************!*\
  !*** ./src/modules/discordselectors.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _discordclassmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discordclassmodules */ "./src/modules/discordclassmodules.js");
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");



const getSelectorAll = function(prop) {
    if (!this.hasOwnProperty(prop)) return "";
    return `.${this[prop].split(" ").join(".")}`;
};

const getSelector = function(prop) {
    if (!this.hasOwnProperty(prop)) return "";
    return `.${this[prop].split(" ")[0]}`;
};

/**
 * Gives us a way to retrieve the internal classes as selectors without
 * needing to concatenate strings or use string templates. Wraps the
 * selector in {@link module:DOMTools.Selector} which adds features but can 
 * still be used in native function.
 * 
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 * 
 * @see module:DiscordClassModules
 * @module DiscordSelectors
 */
const DiscordSelectors = new Proxy(_discordclassmodules__WEBPACK_IMPORTED_MODULE_0__["default"], {
    get: function(list, item) {
        if (item == "getSelectorAll" || item == "getSelector") return (module, prop) => DiscordSelectors[module][item]([prop]);
        if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
        return new Proxy(list[item], {
            get: function(obj, prop) {
                if (prop == "getSelectorAll") return getSelectorAll.bind(obj);
                if (prop == "getSelector") return getSelector.bind(obj);
                if (!obj.hasOwnProperty(prop)) return "";
                return new _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].Selector(obj[prop]);
            }
        });
    }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiscordSelectors);

/***/ }),

/***/ "./src/modules/domtools.js":
/*!*********************************!*\
  !*** ./src/modules/domtools.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DOMTools)
/* harmony export */ });
/* harmony import */ var structs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs */ "./src/structs/structs.js");
/**
 * Helpful utilities for dealing with DOM operations.
 * 
 * This module also extends `HTMLElement` to add a set of utility functions,
 * the same as the ones available in the module itself, but with the `element`
 * parameter bound to `this`.
 * @module DOMTools
 */



/**
 * @interface
 * @name Offset
 * @property {number} top - Top offset of the target element.
 * @property {number} right - Right offset of the target element.
 * @property {number} bottom - Bottom offset of the target element.
 * @property {number} left - Left offset of the target element.
 * @property {number} height - Outer height of the target element.
 * @property {number} width - Outer width of the target element.
 */

 /**
 * Function that automatically removes added listener.
 * @callback module:DOMTools~CancelListener
 */
 
class DOMTools {

    static get Selector() {return structs__WEBPACK_IMPORTED_MODULE_0__.Selector;}
    static get ClassName() {return structs__WEBPACK_IMPORTED_MODULE_0__.ClassName;}
    static get DOMObserver() {return structs__WEBPACK_IMPORTED_MODULE_0__.DOMObserver;}

    /**
     * Default DOMObserver for global usage.
     * 
     * @see DOMObserver
     */
    static get observer() {
        return this._observer || (this._observer = new structs__WEBPACK_IMPORTED_MODULE_0__.DOMObserver());
    }

    /** Document/window width */
    static get screenWidth() {return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);}

    /** Document/window height */
    static get screenHeight() {return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);}

    static animate({timing = _ => _, update, duration}) {
        // https://javascript.info/js-animation
        const start = performance.now();

        requestAnimationFrame(function renderFrame(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            const progress = timing(timeFraction);

            update(progress); // draw it

            if (timeFraction < 1) requestAnimationFrame(renderFrame);
        });
    }

    /**
     * Adds a style to the document.
     * @param {string} id - identifier to use as the element id
     * @param {string} css - css to add to the document
     */
    static addStyle(id, css) {
        document.head.append(DOMTools.createElement(`<style id="${id}">${css}</style>`));
    }

    /**
     * Removes a style from the document.
     * @param {string} id - original identifier used
     */
    static removeStyle(id) {
        const element = document.getElementById(id);
        if (element && element.tagName === "STYLE") element.remove();
    }

    /**
     * Adds/requires a remote script to be loaded
     * @param {string} id - identifier to use for this script
     * @param {string} url - url from which to load the script
     * @returns {Promise} promise that resolves when the script is loaded
     */
    static addScript(id, url) {
        return new Promise(resolve => {
            const script = document.createElement("script");
            script.id = id;
            script.src = url;
            script.type = "text/javascript";
            script.onload = resolve;
            document.head.append(script);
        });
    }

    /**
     * Removes a remote script from the document.
     * @param {string} id - original identifier used
     */
    static removeScript(id) {
        const element = document.getElementById(id);
        if (element && element.tagName === "SCRIPT") element.remove();
    }

    /**
     * This is my shit version of not having to use `$` from jQuery. Meaning
     * that you can pass a selector and it will automatically run {@link module:DOMTools.query}.
     * It also means that you can pass a string of html and it will perform and return `parseHTML`.
     * @see module:DOMTools.parseHTML
     * @see module:DOMTools.query
     * @param {string} selector - Selector to query or HTML to parse
     * @returns {(DocumentFragment|NodeList|HTMLElement)} - Either the result of `parseHTML` or `query`
     */
    static Q(selector) {
        const element = this.parseHTML(selector);
        const isHTML = element instanceof NodeList ? Array.from(element).some(n => n.nodeType === 1) : element.nodeType === 1;
        if (isHTML) return element;
        return this.query(selector);
    }

    /**
     * Essentially a shorthand for `document.querySelector`. If the `baseElement` is not provided
     * `document` is used by default.
     * @param {string} selector - Selector to query
     * @param {Element} [baseElement] - Element to base the query from
     * @returns {(Element|null)} - The found element or null if not found
     */
    static query(selector, baseElement) {
        if (!baseElement) baseElement = document;
        return baseElement.querySelector(selector);
    }

    /**
     * Essentially a shorthand for `document.querySelectorAll`. If the `baseElement` is not provided
     * `document` is used by default.
     * @param {string} selector - Selector to query
     * @param {Element} [baseElement] - Element to base the query from
     * @returns {Array<Element>} - Array of all found elements
     */
    static queryAll(selector, baseElement) {
        if (!baseElement) baseElement = document;
        return baseElement.querySelectorAll(selector);
    }

    /**
     * Parses a string of HTML and returns the results. If the second parameter is true,
     * the parsed HTML will be returned as a document fragment {@see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment}.
     * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
     * 
     * If the second parameter is false, then the return value will be the list of parsed
     * nodes and there were multiple top level nodes, otherwise the single node is returned.
     * @param {string} html - HTML to be parsed
     * @param {boolean} [fragment=false] - Whether or not the return should be the raw `DocumentFragment`
     * @returns {(DocumentFragment|NodeList|HTMLElement)} - The result of HTML parsing
     */
    static parseHTML(html, fragment = false) {
        const template = document.createElement("template");
        template.innerHTML = html;
        const node = template.content.cloneNode(true);
        if (fragment) return node;
        return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
    }

    /** Alternate name for {@link module:DOMTools.parseHTML} */
    static createElement(html, fragment = false) {return this.parseHTML(html, fragment);}
    
    /**
     * Takes a string of html and escapes it using the brower's own escaping mechanism.
     * @param {String} html - html to be escaped
     */
    static escapeHTML(html) {
        const textNode = document.createTextNode("");
        const spanElement = document.createElement("span");
        spanElement.append(textNode);
        textNode.nodeValue = html;
        return spanElement.innerHTML;
    }

    /**
     * Takes a string and escapes it for use as a DOM id.
     * @param {String} id - string to be escaped
     */
    static escapeID(id) {
        return id.replace(/^[^a-z]+|[^\w-]+/gi, "-");
    }

    /**
     * Adds a list of classes from the target element.
     * @param {Element} element - Element to edit classes of
     * @param {...string} classes - Names of classes to add
     * @returns {Element} - `element` to allow for chaining
     */
    static addClass(element, ...classes) {
        classes = classes.flat().filter(c => c);
        for (let c = 0; c < classes.length; c++) classes[c] = classes[c].toString().split(" ");
        classes = classes.flat().filter(c => c);
        element.classList.add(...classes);
        return element;
    }

    /**
     * Removes a list of classes from the target element.
     * @param {Element} element - Element to edit classes of
     * @param {...string} classes - Names of classes to remove
     * @returns {Element} - `element` to allow for chaining
     */
    static removeClass(element, ...classes) {
        for (let c = 0; c < classes.length; c++) classes[c] = classes[c].toString().split(" ");
        classes = classes.flat().filter(c => c);
        element.classList.remove(...classes);
        return element;
    }

    /**
     * When only one argument is present: Toggle class value;
     * i.e., if class exists then remove it and return false, if not, then add it and return true.
     * When a second argument is present:
     * If the second argument evaluates to true, add specified class value, and if it evaluates to false, remove it.
     * @param {Element} element - Element to edit classes of
     * @param {string} classname - Name of class to toggle
     * @param {boolean} [indicator] - Optional indicator for if the class should be toggled
     * @returns {Element} - `element` to allow for chaining
     */
    static toggleClass(element, classname, indicator) {
        classname = classname.toString().split(" ").filter(c => c);
        if (typeof(indicator) !== "undefined") classname.forEach(c => element.classList.toggle(c, indicator));
        else classname.forEach(c => element.classList.toggle(c));
        return element;
    }

    /**
     * Checks if an element has a specific class
     * @param {Element} element - Element to edit classes of
     * @param {string} classname - Name of class to check
     * @returns {boolean} - `true` if the element has the class, `false` otherwise.
     */
    static hasClass(element, classname) {
        return classname.toString().split(" ").filter(c => c).every(c => element.classList.contains(c));
    }

    /**
     * Replaces one class with another
     * @param {Element} element - Element to edit classes of
     * @param {string} oldName - Name of class to replace
     * @param {string} newName - New name for the class
     * @returns {Element} - `element` to allow for chaining
     */
    static replaceClass(element, oldName, newName) {
        element.classList.replace(oldName, newName);
        return element;
    }

    /**
     * Appends `thisNode` to `thatNode`
     * @param {Node} thisNode - Node to be appended to another node
     * @param {Node} thatNode - Node for `thisNode` to be appended to
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static appendTo(thisNode, thatNode) {
        if (typeof(thatNode) == "string") thatNode = this.query(thatNode);
        if (!thatNode) return null;
        thatNode.append(thisNode);
        return thisNode;
    }

    /**
     * Prepends `thisNode` to `thatNode`
     * @param {Node} thisNode - Node to be prepended to another node
     * @param {Node} thatNode - Node for `thisNode` to be prepended to
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static prependTo(thisNode, thatNode) {
        if (typeof(thatNode) == "string") thatNode = this.query(thatNode);
        if (!thatNode) return null;
        thatNode.prepend(thisNode);
        return thisNode;
    }

    /**
     * Insert after a specific element, similar to jQuery's `thisElement.insertAfter(otherElement)`.
     * @param {Node} thisNode - The node to insert
     * @param {Node} targetNode - Node to insert after in the tree
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static insertAfter(thisNode, targetNode) {
        targetNode.parentNode.insertBefore(thisNode, targetNode.nextSibling);
        return thisNode;
    }

    /**
     * Insert after a specific element, similar to jQuery's `thisElement.after(newElement)`.
     * @param {Node} thisNode - The node to insert
     * @param {Node} newNode - Node to insert after in the tree
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static after(thisNode, newNode) {
        thisNode.parentNode.insertBefore(newNode, thisNode.nextSibling);
        return thisNode;
    }

    /**
     * Gets the next sibling element that matches the selector.
     * @param {Element} element - Element to get the next sibling of
     * @param {string} [selector=""] - Optional selector
     * @returns {Element} - The sibling element
     */
    static next(element, selector = "") {
        return selector ? element.querySelector("+ " + selector) : element.nextElementSibling;
    }

    /**
     * Gets all subsequent siblings.
     * @param {Element} element - Element to get next siblings of
     * @returns {NodeList} - The list of siblings
     */
    static nextAll(element) {
        return element.querySelectorAll("~ *");
    }

    /**
     * Gets the subsequent siblings until an element matches the selector.
     * @param {Element} element - Element to get the following siblings of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of siblings
     */
    static nextUntil(element, selector) {
        const next = []; 
        while (element.nextElementSibling && !element.nextElementSibling.matches(selector)) next.push(element = element.nextElementSibling);
        return next;
    }

    /**
     * Gets the previous sibling element that matches the selector.
     * @param {Element} element - Element to get the previous sibling of
     * @param {string} [selector=""] - Optional selector
     * @returns {Element} - The sibling element
     */
    static previous(element, selector = "") {
        const previous = element.previousElementSibling;
        if (selector) return previous && previous.matches(selector) ? previous : null;
        return previous;
    }

    /**
     * Gets all preceeding siblings.
     * @param {Element} element - Element to get preceeding siblings of
     * @returns {NodeList} - The list of siblings
     */
    static previousAll(element) {
        const previous = [];
        while (element.previousElementSibling) previous.push(element = element.previousElementSibling);
        return previous;
    }

    /**
     * Gets the preceeding siblings until an element matches the selector.
     * @param {Element} element - Element to get the preceeding siblings of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of siblings
     */
    static previousUntil(element, selector) {
        const previous = []; 
        while (element.previousElementSibling && !element.previousElementSibling.matches(selector)) previous.push(element = element.previousElementSibling);
        return previous;
    }

    /**
     * Find which index in children a certain node is. Similar to jQuery's `$.index()`
     * @param {HTMLElement} node - The node to find its index in parent
     * @returns {number} Index of the node
     */
    static indexInParent(node) {
        const children = node.parentNode.childNodes;
        let num = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i] == node) return num;
            if (children[i].nodeType == 1) num++;
        }
        return -1;
    }

    /** Shorthand for {@link module:DOMTools.indexInParent} */
    static index(node) {return this.indexInParent(node);}

    /**
     * Gets the parent of the element if it matches the selector,
     * otherwise returns null.
     * @param {Element} element - Element to get parent of
     * @param {string} [selector=""] - Selector to match parent
     * @returns {(Element|null)} - The sibling element or null
     */
    static parent(element, selector = "") {
        return !selector || element.parentElement.matches(selector) ? element.parentElement : null;
    }

    /**
     * Gets all children of Element that match the selector if provided.
     * @param {Element} element - Element to get all children of
     * @param {string} selector - Selector to match the children to
     * @returns {Array<Element>} - The list of children
     */
    static findChild(element, selector) {
        return element.querySelector(":scope > " + selector);
    }

    /**
     * Gets all children of Element that match the selector if provided.
     * @param {Element} element - Element to get all children of
     * @param {string} selector - Selector to match the children to
     * @returns {Array<Element>} - The list of children
     */
    static findChildren(element, selector) {
        return element.querySelectorAll(":scope > " + selector);
    }

    /**
     * Gets all ancestors of Element that match the selector if provided.
     * @param {Element} element - Element to get all parents of
     * @param {string} [selector=""] - Selector to match the parents to
     * @returns {Array<Element>} - The list of parents
     */
    static parents(element, selector = "") {
        const parents = [];
        if (selector) while (element.parentElement && element.parentElement.closest(selector)) parents.push(element = element.parentElement.closest(selector));
        else while (element.parentElement) parents.push(element = element.parentElement);
        return parents;
    }

    /**
     * Gets the ancestors until an element matches the selector.
     * @param {Element} element - Element to get the ancestors of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of parents
     */
    static parentsUntil(element, selector) {
        const parents = [];
        while (element.parentElement && !element.parentElement.matches(selector)) parents.push(element = element.parentElement);
        return parents;
    }

    /**
     * Gets all siblings of the element that match the selector.
     * @param {Element} element - Element to get all siblings of
     * @param {string} [selector="*"] - Selector to match the siblings to
     * @returns {Array<Element>} - The list of siblings
     */
    static siblings(element, selector = "*") {
        return Array.from(element.parentElement.children).filter(e => e != element && e.matches(selector));
    }

    /**
     * Sets or gets css styles for a specific element. If `value` is provided
     * then it sets the style and returns the element to allow for chaining,
     * otherwise returns the style.  
     * @param {Element} element - Element to set the CSS of
     * @param {string} attribute - Attribute to get or set
     * @param {string} [value] - Value to set for attribute
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static css(element, attribute, value) {
        if (typeof(value) == "undefined") return global.getComputedStyle(element)[attribute];
        element.style[attribute] = value;
        return element;
    }

    /**
     * Sets or gets the width for a specific element. If `value` is provided
     * then it sets the width and returns the element to allow for chaining,
     * otherwise returns the width.  
     * @param {Element} element - Element to set the CSS of
     * @param {string} [value] - Width to set
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static width(element, value) {
        if (typeof(value) == "undefined") return parseInt(getComputedStyle(element).width);
        element.style.width = value;
        return element;
    }

    /**
     * Sets or gets the height for a specific element. If `value` is provided
     * then it sets the height and returns the element to allow for chaining,
     * otherwise returns the height.  
     * @param {Element} element - Element to set the CSS of
     * @param {string} [value] - Height to set
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static height(element, value) {
        if (typeof(value) == "undefined") return parseInt(getComputedStyle(element).height);
        element.style.height = value;
        return element;
    }

    /**
     * Sets the inner text of an element if given a value, otherwise returns it.
     * @param {Element} element - Element to set the text of
     * @param {string} [text] - Content to set
     * @returns {string} - Either the string set by this call or the current text content of the node.
     */
    static text(element, text) {
        if (typeof(text) == "undefined") return element.textContent;
        return element.textContent = text;
    }

    /**
     * Returns the innerWidth of the element.
     * @param {Element} element - Element to retrieve inner width of
     * @return {number} - The inner width of the element.
     */
    static innerWidth(element) {
        return element.clientWidth;
    }

    /**
     * Returns the innerHeight of the element.
     * @param {Element} element - Element to retrieve inner height of
     * @return {number} - The inner height of the element.
     */
    static innerHeight(element) {
        return element.clientHeight;
    }

    /**
     * Returns the outerWidth of the element.
     * @param {Element} element - Element to retrieve outer width of
     * @return {number} - The outer width of the element.
     */
    static outerWidth(element) {
        return element.offsetWidth;
    }

    /**
     * Returns the outerHeight of the element.
     * @param {Element} element - Element to retrieve outer height of
     * @return {number} - The outer height of the element.
     */
    static outerHeight(element) {
        return element.offsetHeight;
    }

    /**
     * Gets the offset of the element in the page.
     * @param {Element} element - Element to get offset of
     * @return {Offset} - The offset of the element
     */
    static offset(element) {
        return element.getBoundingClientRect();
    }

    static get listeners() {return this._listeners || (this._listeners = {});}

    /**
     * This is similar to jQuery's `on` function and can *hopefully* be used in the same way.
     * 
     * Rather than attempt to explain, I'll show some example usages.
     * 
     * The following will add a click listener (in the `myPlugin` namespace) to `element`.
     * `DOMTools.on(element, "click.myPlugin", () => {console.log("clicked!");});`
     * 
     * The following will add a click listener (in the `myPlugin` namespace) to `element` that only fires when the target is a `.block` element.
     * `DOMTools.on(element, "click.myPlugin", ".block", () => {console.log("clicked!");});`
     * 
     * The following will add a click listener (without namespace) to `element`.
     * `DOMTools.on(element, "click", () => {console.log("clicked!");});`
     * 
     * The following will add a click listener (without namespace) to `element` that only fires once.
     * `const cancel = DOMTools.on(element, "click", () => {console.log("fired!"); cancel();});`
     * 
     * @param {Element} element - Element to add listener to
     * @param {string} event - Event to listen to with option namespace (e.g. "event.namespace")
     * @param {(string|callable)} delegate - Selector to run on element to listen to
     * @param {callable} [callback] - Function to fire on event
     * @returns {module:DOMTools~CancelListener} - A function that will undo the listener
     */
    static on(element, event, delegate, callback) {
        const [type, namespace] = event.split(".");
        const hasDelegate = delegate && callback;
        if (!callback) callback = delegate;
        const eventFunc = !hasDelegate ? callback : function(ev) {
            if (ev.target.matches(delegate)) {
                callback(ev);
            }
        };

        element.addEventListener(type, eventFunc);
        const cancel = () => {
            element.removeEventListener(type, eventFunc);
        };
        if (namespace) {
            if (!this.listeners[namespace]) this.listeners[namespace] = [];
            const newCancel = () => {
                cancel();
                this.listeners[namespace].splice(this.listeners[namespace].findIndex(l => l.event == type && l.element == element), 1);
            };
            this.listeners[namespace].push({
                event: type,
                element: element,
                cancel: newCancel
            });
            return newCancel;
        }
        return cancel;
    }

    /**
     * Functionality for this method matches {@link module:DOMTools.on} but automatically cancels itself
     * and removes the listener upon the first firing of the desired event.
     * 
     * @param {Element} element - Element to add listener to
     * @param {string} event - Event to listen to with option namespace (e.g. "event.namespace")
     * @param {(string|callable)} delegate - Selector to run on element to listen to
     * @param {callable} [callback] - Function to fire on event
     * @returns {module:DOMTools~CancelListener} - A function that will undo the listener
     */
    static once(element, event, delegate, callback) {
        const [type, namespace] = event.split(".");
        const hasDelegate = delegate && callback;
        if (!callback) callback = delegate;
        const eventFunc = !hasDelegate ? function(ev) {
            callback(ev);
            element.removeEventListener(type, eventFunc);
        } : function(ev) {
            if (!ev.target.matches(delegate)) return;
            callback(ev);
            element.removeEventListener(type, eventFunc);
        };

        element.addEventListener(type, eventFunc);
        const cancel = () => {
            element.removeEventListener(type, eventFunc);
        };
        if (namespace) {
            if (!this.listeners[namespace]) this.listeners[namespace] = [];
            const newCancel = () => {
                cancel();
                this.listeners[namespace].splice(this.listeners[namespace].findIndex(l => l.event == type && l.element == element), 1);
            };
            this.listeners[namespace].push({
                event: type,
                element: element,
                cancel: newCancel
            });
            return newCancel;
        }
        return cancel;
    }

    static __offAll(event, element) {
        const [type, namespace] = event.split(".");
        let matchFilter = listener => listener.event == type, defaultFilter = _ => _;
        if (element) {
            matchFilter = l => l.event == type && l.element == element;
            defaultFilter = l => l.element == element;
        }
        const listeners = this.listeners[namespace] || [];
        const list = type ? listeners.filter(matchFilter) : listeners.filter(defaultFilter);
        for (let c = 0; c < list.length; c++) list[c].cancel();
    }
    
    /**
     * This is similar to jQuery's `off` function and can *hopefully* be used in the same way.
     * 
     * Rather than attempt to explain, I'll show some example usages.
     * 
     * The following will remove a click listener called `onClick` (in the `myPlugin` namespace) from `element`.
     * `DOMTools.off(element, "click.myPlugin", onClick);`
     * 
     * The following will remove a click listener called `onClick` (in the `myPlugin` namespace) from `element` that only fired when the target is a `.block` element.
     * `DOMTools.off(element, "click.myPlugin", ".block", onClick);`
     * 
     * The following will remove a click listener (without namespace) from `element`.
     * `DOMTools.off(element, "click", onClick);`
     * 
     * The following will remove all listeners in namespace `myPlugin` from `element`.
     * `DOMTools.off(element, ".myPlugin");`
     * 
     * The following will remove all click listeners in namespace `myPlugin` from *all elements*.
     * `DOMTools.off("click.myPlugin");`
     * 
     * The following will remove all listeners in namespace `myPlugin` from *all elements*.
     * `DOMTools.off(".myPlugin");`
     * 
     * @param {(Element|string)} element - Element to remove listener from
     * @param {string} [event] - Event to listen to with option namespace (e.g. "event.namespace")
     * @param {(string|callable)} [delegate] - Selector to run on element to listen to
     * @param {callable} [callback] - Function to fire on event
     * @returns {Element} - The original element to allow for chaining
     */
    static off(element, event, delegate, callback) {
        if (typeof(element) == "string") return this.__offAll(element);
        const [type, namespace] = event.split(".");
        if (namespace) return this.__offAll(event, element);

        const hasDelegate = delegate && callback;
        if (!callback) callback = delegate;
        const eventFunc = !hasDelegate ? callback : function(ev) {
            if (ev.target.matches(delegate)) {
                callback(ev);
            }
        };

        element.removeEventListener(type, eventFunc);
        return element;
    }

    /**
     * Adds a listener for when the node is added/removed from the document body.
     * The listener is automatically removed upon firing.
     * @param {HTMLElement} node - node to wait for
     * @param {callable} callback - function to be performed on event
     * @param {boolean} onMount - determines if it should fire on Mount or on Unmount
     */
    static onMountChange(node, callback, onMount = true) {
        const wrappedCallback = () => {
            this.observer.unsubscribe(wrappedCallback);
            callback();
        };
        this.observer.subscribe(wrappedCallback, mutation => {
            const nodes = Array.from(onMount ? mutation.addedNodes : mutation.removedNodes);
            const directMatch = nodes.indexOf(node) > -1;
            const parentMatch = nodes.some(parent => parent.contains(node));
            return directMatch || parentMatch;
        });
        return node;
    }

    /** Shorthand for {@link module:DOMTools.onMountChange} with third parameter `true` */
    static onMount(node, callback) {return this.onMountChange(node, callback);}

    /** Shorthand for {@link module:DOMTools.onMountChange} with third parameter `false` */
    static onUnmount(node, callback) {return this.onMountChange(node, callback, false);}

    /** Alias for {@link module:DOMTools.onMount} */
    static onAdded(node, callback) {return this.onMount(node, callback);}

    /** Alias for {@link module:DOMTools.onUnmount} */
    static onRemoved(node, callback) {return this.onUnmount(node, callback, false);}

    /**
     * Helper function which combines multiple elements into one parent element
     * @param {Array<HTMLElement>} elements - array of elements to put into a single parent
     */
    static wrap(elements) {
        const domWrapper = this.parseHTML(`<div class="dom-wrapper"></div>`);
        for (let e = 0; e < elements.length; e++) domWrapper.appendChild(elements[e]);
        return domWrapper;
    }

    /**
     * Resolves the node to an HTMLElement. This is mainly used by library modules.
     * @param {(jQuery|Element)} node - node to resolve
     */
    static resolveElement(node) {
        try {
            if (!(node instanceof window.jQuery) && !(node instanceof Element)) return undefined;
            return node instanceof window.jQuery ? node[0] : node;
        }
        catch {
            return node;
        }
    }
}

/***/ }),

/***/ "./src/modules/logger.js":
/*!*******************************!*\
  !*** ./src/modules/logger.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogTypes": () => (/* binding */ LogTypes),
/* harmony export */   "default": () => (/* binding */ Logger)
/* harmony export */ });
/** 
 * Simple logger for the lib and plugins.
 * 
 * @module Logger
 */

/* eslint-disable no-console */

/**
 * List of logging types.
 */
const LogTypes = {
    /** Alias for error */
    err: "error",
    error: "error",
    /** Alias for debug */
    dbg: "debug",
    debug: "debug",
    log: "log",
    warn: "warn",
    info: "info"
};

class Logger {

    /**
     * Logs an error using a collapsed error group with stacktrace.
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message or error to have logged.
     * @param {Error} error - Error object to log with the message.
     */
    static stacktrace(module, message, error) {
        console.error(`%c[${module}]%c ${message}\n\n%c`, "color: #3a71c1; font-weight: 700;", "color: red; font-weight: 700;", "color: red;", error);
    }

    /**
     * Logs using error formatting. For logging an actual error object consider {@link module:Logger.stacktrace}
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Messages to have logged.
     */
    static err(module, ...message) {Logger._log(module, message, "error");}

    /**
     * Logs a warning message.
     * 
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static warn(module, ...message) {Logger._log(module, message, "warn");}

    /**
     * Logs an informational message.
     * 
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static info(module, ...message) {Logger._log(module, message, "info");}

    /**
     * Logs used for debugging purposes.
     * 
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static debug(module, ...message) {Logger._log(module, message, "debug");}
    
    /**
     * Logs used for basic loggin.
     * 
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static log(module, ...message) {Logger._log(module, message);}

    /**
     * Logs strings using different console levels and a module label.
     * 
     * @param {string} module - Name of the calling module.
     * @param {any|Array<any>} message - Messages to have logged.
     * @param {module:Logger.LogTypes} type - Type of log to use in console.
     */
    static _log(module, message, type = "log") {
        type = Logger.parseType(type);
        if (!Array.isArray(message)) message = [message];
        console[type](`%c[${module}]%c`, "color: #3a71c1; font-weight: 700;", "", ...message);
    }

    static parseType(type) {
        return LogTypes.hasOwnProperty(type) ? LogTypes[type] : "log";
    }

}

/***/ }),

/***/ "./src/modules/modules.js":
/*!********************************!*\
  !*** ./src/modules/modules.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utilities": () => (/* reexport safe */ _utilities__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "WebpackModules": () => (/* reexport safe */ _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Filters": () => (/* reexport safe */ _webpackmodules__WEBPACK_IMPORTED_MODULE_1__.Filters),
/* harmony export */   "DiscordModules": () => (/* reexport safe */ _discordmodules__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "ColorConverter": () => (/* reexport safe */ _colorconverter__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "DOMTools": () => (/* reexport safe */ _domtools__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "DiscordClasses": () => (/* reexport safe */ _discordclasses__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "DiscordSelectors": () => (/* reexport safe */ _discordselectors__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "ReactTools": () => (/* reexport safe */ _reacttools__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "ReactComponents": () => (/* reexport safe */ _reactcomponents__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Logger": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "Patcher": () => (/* reexport safe */ _patcher__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "PluginUpdater": () => (/* reexport safe */ _pluginupdater__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "PluginUtilities": () => (/* reexport safe */ _pluginutilities__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "DiscordClassModules": () => (/* reexport safe */ _discordclassmodules__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "Structs": () => (/* reexport module object */ structs__WEBPACK_IMPORTED_MODULE_14__)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/* harmony import */ var _webpackmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webpackmodules */ "./src/modules/webpackmodules.js");
/* harmony import */ var _discordmodules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _colorconverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorconverter */ "./src/modules/colorconverter.js");
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");
/* harmony import */ var _discordclasses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discordclasses */ "./src/modules/discordclasses.js");
/* harmony import */ var _discordselectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./discordselectors */ "./src/modules/discordselectors.js");
/* harmony import */ var _reacttools__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reacttools */ "./src/modules/reacttools.js");
/* harmony import */ var _reactcomponents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reactcomponents */ "./src/modules/reactcomponents.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logger */ "./src/modules/logger.js");
/* harmony import */ var _patcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./patcher */ "./src/modules/patcher.js");
/* harmony import */ var _pluginupdater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pluginupdater */ "./src/modules/pluginupdater.js");
/* harmony import */ var _pluginutilities__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pluginutilities */ "./src/modules/pluginutilities.js");
/* harmony import */ var _discordclassmodules__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./discordclassmodules */ "./src/modules/discordclassmodules.js");
/* harmony import */ var structs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! structs */ "./src/structs/structs.js");




















/***/ }),

/***/ "./src/modules/patcher.js":
/*!********************************!*\
  !*** ./src/modules/patcher.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Patcher)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./src/modules/logger.js");
/* harmony import */ var _discordmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _webpackmodules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webpackmodules */ "./src/modules/webpackmodules.js");
/**
 * Patcher that can patch other functions allowing you to run code before, after or
 * instead of the original function. Can also alter arguments and return values.
 *
 * This is a modified version of what we have been working on in BDv2. {@link https://github.com/JsSucks/BetterDiscordApp/blob/master/client/src/modules/patcher.js}
 *
 * @module Patcher
 */





class Patcher {

    // Use window._patches instead of local variables in case something tries to whack the lib
    static get patches() {return window._patches || (window._patches = []);}

    /**
     * Returns all the patches done by a specific caller
     * @param {string} name - Name of the patch caller
     * @method
     */
    static getPatchesByCaller(name) {
        if (!name) return [];
        const patches = [];
        for (const patch of this.patches) {
            for (const childPatch of patch.children) {
                if (childPatch.caller === name) patches.push(childPatch);
            }
        }
        return patches;
    }

    /**
     * Unpatches all patches passed, or when a string is passed unpatches all
     * patches done by that specific caller.
     * @param {Array|string} patches - Either an array of patches to unpatch or a caller name
     */
    static unpatchAll(patches) {
        if (typeof patches === "string") patches = this.getPatchesByCaller(patches);

        for (const patch of patches) {
            patch.unpatch();
        }
    }

    static resolveModule(module) {
        if (!module || typeof(module) === "function" || (typeof(module) === "object" && !Array.isArray(module))) return module;
        if (typeof module === "string") return _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"][module];
        if (Array.isArray(module)) return _webpackmodules__WEBPACK_IMPORTED_MODULE_2__["default"].findByUniqueProperties(module);
        return null;
    }

    static makeOverride(patch) {
        return function () {
            let returnValue;
            if (!patch.children || !patch.children.length) return patch.originalFunction.apply(this, arguments);
            for (const superPatch of patch.children.filter(c => c.type === "before")) {
                try {
                    superPatch.callback(this, arguments);
                }
                catch (err) {
                    _logger__WEBPACK_IMPORTED_MODULE_0__["default"].err("Patcher", `Could not fire before callback of ${patch.functionName} for ${superPatch.caller}`, err);
                }
            }

            const insteads = patch.children.filter(c => c.type === "instead");
            if (!insteads.length) {returnValue = patch.originalFunction.apply(this, arguments);}
            else {
                for (const insteadPatch of insteads) {
                    try {
                        const tempReturn = insteadPatch.callback(this, arguments, patch.originalFunction.bind(this));
                        if (typeof(tempReturn) !== "undefined") returnValue = tempReturn;
                    }
                    catch (err) {
                        _logger__WEBPACK_IMPORTED_MODULE_0__["default"].err("Patcher", `Could not fire instead callback of ${patch.functionName} for ${insteadPatch.caller}`, err);
                    }
                }
            }

            for (const slavePatch of patch.children.filter(c => c.type === "after")) {
                try {
                    const tempReturn = slavePatch.callback(this, arguments, returnValue);
                    if (typeof(tempReturn) !== "undefined") returnValue = tempReturn;
                }
                catch (err) {
                    _logger__WEBPACK_IMPORTED_MODULE_0__["default"].err("Patcher", `Could not fire after callback of ${patch.functionName} for ${slavePatch.caller}`, err);
                }
            }
            return returnValue;
        };
    }

    static rePatch(patch) {
        patch.proxyFunction = patch.module[patch.functionName] = this.makeOverride(patch);
    }

    static makePatch(module, functionName, name) {
        const patch = {
            name,
            module,
            functionName,
            originalFunction: module[functionName],
            proxyFunction: null,
            revert: () => { // Calling revert will destroy any patches added to the same module after this
                patch.module[patch.functionName] = patch.originalFunction;
                patch.proxyFunction = null;
                patch.children = [];
            },
            counter: 0,
            children: []
        };
        patch.proxyFunction = module[functionName] = this.makeOverride(patch);
        Object.assign(module[functionName], patch.originalFunction);
        module[functionName].__originalFunction = patch.originalFunction;
        module[functionName].toString = () => patch.originalFunction.toString();
        this.patches.push(patch);
        return patch;
    }

    /**
     * Function with no arguments and no return value that may be called to revert changes made by {@link module:Patcher}, restoring (unpatching) original method.
     * @callback module:Patcher~unpatch
     */

    /**
     * A callback that modifies method logic. This callback is called on each call of the original method and is provided all data about original call. Any of the data can be modified if necessary, but do so wisely.
     *
     * The third argument for the callback will be `undefined` for `before` patches. `originalFunction` for `instead` patches and `returnValue` for `after` patches.
     *
     * @callback module:Patcher~patchCallback
     * @param {object} thisObject - `this` in the context of the original function.
     * @param {arguments} arguments - The original arguments of the original function.
     * @param {(function|*)} extraValue - For `instead` patches, this is the original function from the module. For `after` patches, this is the return value of the function.
     * @return {*} Makes sense only when using an `instead` or `after` patch. If something other than `undefined` is returned, the returned value replaces the value of `returnValue`. If used for `before` the return value is ignored.
     */

    /**
     * This method patches onto another function, allowing your code to run beforehand.
     * Using this, you are also able to modify the incoming arguments before the original method is run.
     *
     * @param {string} caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link module:Patcher.unpatchAll}. Use `""` if you don't care.
     * @param {object} moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
     * @param {string} functionName - Name of the method to be patched
     * @param {module:Patcher~patchCallback} callback - Function to run before the original method
     * @param {object} options - Object used to pass additional options.
     * @param {string} [options.displayName] You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
     * @param {boolean} [options.forcePatch=true] Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
     * @return {module:Patcher~unpatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    static before(caller, moduleToPatch, functionName, callback, options = {}) {return this.pushChildPatch(caller, moduleToPatch, functionName, callback, Object.assign(options, {type: "before"}));}

    /**
     * This method patches onto another function, allowing your code to run after.
     * Using this, you are also able to modify the return value, using the return of your code instead.
     *
     * @param {string} caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link module:Patcher.unpatchAll}. Use `""` if you don't care.
     * @param {object} moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
     * @param {string} functionName - Name of the method to be patched
     * @param {module:Patcher~patchCallback} callback - Function to run instead of the original method
     * @param {object} options - Object used to pass additional options.
     * @param {string} [options.displayName] You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
     * @param {boolean} [options.forcePatch=true] Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
     * @return {module:Patcher~unpatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    static after(caller, moduleToPatch, functionName, callback, options = {}) {return this.pushChildPatch(caller, moduleToPatch, functionName, callback, Object.assign(options, {type: "after"}));}

    /**
     * This method patches onto another function, allowing your code to run instead.
     * Using this, you are also able to modify the return value, using the return of your code instead.
     *
     * @param {string} caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link module:Patcher.unpatchAll}. Use `""` if you don't care.
     * @param {object} moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
     * @param {string} functionName - Name of the method to be patched
     * @param {module:Patcher~patchCallback} callback - Function to run after the original method
     * @param {object} options - Object used to pass additional options.
     * @param {string} [options.displayName] You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
     * @param {boolean} [options.forcePatch=true] Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
     * @return {module:Patcher~unpatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    static instead(caller, moduleToPatch, functionName, callback, options = {}) {return this.pushChildPatch(caller, moduleToPatch, functionName, callback, Object.assign(options, {type: "instead"}));}

    /**
     * This method patches onto another function, allowing your code to run before, instead or after the original function.
     * Using this you are able to modify the incoming arguments before the original function is run as well as the return
     * value before the original function actually returns.
     *
     * @param {string} caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link module:Patcher.unpatchAll}. Use `""` if you don't care.
     * @param {object} moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
     * @param {string} functionName - Name of the method to be patched
     * @param {module:Patcher~patchCallback} callback - Function to run after the original method
     * @param {object} options - Object used to pass additional options.
     * @param {string} [options.type=after] - Determines whether to run the function `before`, `instead`, or `after` the original.
     * @param {string} [options.displayName] You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
     * @param {boolean} [options.forcePatch=true] Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
     * @return {module:Patcher~unpatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    static pushChildPatch(caller, moduleToPatch, functionName, callback, options = {}) {
        const {type = "after", forcePatch = true} = options;
        const module = this.resolveModule(moduleToPatch);
        if (!module) return null;
        if (!module[functionName] && forcePatch) module[functionName] = function() {};
        if (!(module[functionName] instanceof Function)) return null;

        if (typeof moduleToPatch === "string") options.displayName = moduleToPatch;
        const displayName = options.displayName || module.displayName || module.name || module.constructor.displayName || module.constructor.name;

        const patchId = `${displayName}.${functionName}`;
        const patch = this.patches.find(p => p.module == module && p.functionName == functionName) || this.makePatch(module, functionName, patchId);
        if (!patch.proxyFunction) this.rePatch(patch);
        const child = {
            caller,
            type,
            id: patch.counter,
            callback,
            unpatch: () => {
                patch.children.splice(patch.children.findIndex(cpatch => cpatch.id === child.id && cpatch.type === type), 1);
                if (patch.children.length <= 0) {
                    const patchNum = this.patches.findIndex(p => p.module == module && p.functionName == functionName);
                    if (patchNum < 0) return;
                    this.patches[patchNum].revert();
                    this.patches.splice(patchNum, 1);
                }
            }
        };
        patch.children.push(child);
        patch.counter++;
        return child.unpatch;
    }

}

/***/ }),

/***/ "./src/modules/pluginupdater.js":
/*!**************************************!*\
  !*** ./src/modules/pluginupdater.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PluginUpdater)
/* harmony export */ });
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/modules/logger.js");
/* harmony import */ var _discordclasses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discordclasses */ "./src/modules/discordclasses.js");
/* harmony import */ var ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui */ "./src/ui/ui.js");
/* harmony import */ var _styles_updates_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/updates.css */ "./src/styles/updates.css");
/**
 * Functions that check for and update existing plugins.
 * @module PluginUpdater
 */








/**
 * Function that gets the remote version from the file contents.
 * @param {string} fileContent - the content of the remote file
 * @returns {string} - remote version
 * @callback module:PluginUpdater~versioner
 */

/**
 * Comparator that takes the current version and the remote version,
 * then compares them returning `true` if there is an update and `false` otherwise.
 * @param {string} currentVersion - the current version of the plugin
 * @param {string} remoteVersion - the remote version of the plugin
 * @returns {boolean} - whether the plugin has an update or not
 * @callback module:PluginUpdater~comparator
 */

class PluginUpdater {

    static get CSS() {return _styles_updates_css__WEBPACK_IMPORTED_MODULE_4__["default"];}

    /**
     * Checks for updates for the specified plugin at the specified link. The final
     * parameter should link to the raw text of the plugin and will compare semantic
     * versions.
     * @param {string} pluginName - name of the plugin
     * @param {string} currentVersion - current version (semantic versioning only)
     * @param {string} updateURL - url to check for update
     * @param {module:PluginUpdater~versioner} [versioner] - versioner that finds the remote version. If not provided uses {@link module:PluginUpdater.defaultVersioner}.
     * @param {module:PluginUpdater~comparator} [comparator] - comparator that determines if there is an update. If not provided uses {@link module:PluginUpdater.defaultComparator}.
     */
    static checkForUpdate(pluginName, currentVersion, updateURL, versioner, comparator) {
        let updateLink = "https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/" + pluginName + "/" + pluginName + ".plugin.js";
        if (updateURL) updateLink = updateURL;
        if (typeof(versioner) != "function") versioner = this.defaultVersioner;
        if (typeof(comparator) != "function") comparator = this.defaultComparator;

        if (typeof window.PluginUpdates === "undefined") {
            window.PluginUpdates = {
                plugins: {},
                checkAll: async function() {
                    for (const key in this.plugins) {
                        const plugin = this.plugins[key];
                        if (!plugin.versioner) plugin.versioner = PluginUpdater.defaultVersioner;
                        if (!plugin.comparator) plugin.comparator = PluginUpdater.defaultComparator;
                        await PluginUpdater.processUpdateCheck(plugin.name, plugin.raw);
                    }
                },
                interval: setInterval(() => {
                    window.PluginUpdates.checkAll();
                }, 7200000)
            };
            this.patchPluginList();
        }

        window.PluginUpdates.plugins[updateLink] = {name: pluginName, raw: updateLink, version: currentVersion, versioner: versioner, comparator: comparator};
        PluginUpdater.processUpdateCheck(pluginName, updateLink);
    }

    /**
     * Will check for updates and automatically show or remove the update notice
     * bar based on the internal result. Better not to call this directly and to
     * instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin to check
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static async processUpdateCheck(pluginName, updateLink) {
        return new Promise(resolve => {
            const request = require("request");
            request(updateLink, (error, response, result) => {
                if (error || response.statusCode !== 200) return resolve();
                const remoteVersion = window.PluginUpdates.plugins[updateLink].versioner(result);
                const hasUpdate = window.PluginUpdates.plugins[updateLink].comparator(window.PluginUpdates.plugins[updateLink].version, remoteVersion);
                if (hasUpdate) resolve(this.showUpdateNotice(pluginName, updateLink));
                else resolve(this.removeUpdateNotice(pluginName));
            });
        });
    }

    /**
     * The default versioner used as {@link module:PluginUpdater~versioner} for {@link module:PluginUpdater.checkForUpdate}.
     * This works on basic semantic versioning e.g. "1.0.0". You do not need to provide this as a versioner if your plugin adheres
     * to this style as this will be used as default.
     * @param {string} currentVersion
     * @param {string} content
     */
    static defaultVersioner(content) {
        const remoteVersion = content.match(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/i);
        if (!remoteVersion) return "0.0.0";
        return remoteVersion.toString().replace(/['"]/g, "");
    }

    /**
     * The default comparator used as {@link module:PluginUpdater~comparator} for {@link module:PluginUpdater.checkForUpdate}.
     * This works on basic semantic versioning e.g. "1.0.0". You do not need to provide this as a comparator if your plugin adheres
     * to this style as this will be used as default.
     * @param {string} currentVersion
     * @param {string} content
     */
    static defaultComparator(currentVersion, remoteVersion) {
        currentVersion = currentVersion.split(".").map((e) => {return parseInt(e);});
        remoteVersion = remoteVersion.split(".").map((e) => {return parseInt(e);});

        if (remoteVersion[0] > currentVersion[0]) return true;
        else if (remoteVersion[0] == currentVersion[0] && remoteVersion[1] > currentVersion[1]) return true;
        else if (remoteVersion[0] == currentVersion[0] && remoteVersion[1] == currentVersion[1] && remoteVersion[2] > currentVersion[2]) return true;
        return false;
    }

    static patchPluginList() {
        _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].observer.subscribeToQuerySelector(mutation => {
            if (!mutation.addedNodes || !mutation.addedNodes.length) return;
            const button = document.getElementsByClassName("bd-pfbtn")[0];
            if (!button || !button.textContent.toLowerCase().includes("plugin") || button.nextElementSibling.classList.contains("bd-updatebtn")) return;
            button.after(PluginUpdater.createUpdateButton());
        }, "#bd-settingspane-container");
    }

    /**
     * Creates the update button found in the plugins page of BetterDiscord
     * settings. Returned button will already have listeners to create the tooltip.
     * @returns {HTMLElement} check for update button
     */
    static createUpdateButton() {
        const updateButton = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].parseHTML(`<button class="bd-pfbtn bd-updatebtn" style="left: 220px;">Check for Updates</button>`);
        updateButton.onclick = function () {
            ui__WEBPACK_IMPORTED_MODULE_3__.Toasts.info("Plugin update check in progress.");
            window.PluginUpdates.checkAll().then(() => {ui__WEBPACK_IMPORTED_MODULE_3__.Toasts.success("Plugin update check complete.");});
        };
        const tooltip = new ui__WEBPACK_IMPORTED_MODULE_3__.Tooltip(updateButton, "Checks for updates of plugins that support this feature. Right-click for a list.");
        updateButton.oncontextmenu = function () {
            if (!window.PluginUpdates || !window.PluginUpdates.plugins) return;
            tooltip.label = Object.values(window.PluginUpdates.plugins).map(p => p.name).join(", ");
            tooltip.side = "bottom";
            tooltip.show();
            updateButton.onmouseout = function() {
                tooltip.label = "Checks for updates of plugins that support this feature. Right-click for a list.";
                tooltip.side = "top";
            };
        };
        return updateButton;
    }

    /**
     * Will download the latest version and replace the the old plugin version.
     * Will also update the button in the update bar depending on if the user
     * is using RestartNoMore plugin by square {@link https://github.com/Inve1951/BetterDiscordStuff/blob/master/plugins/restartNoMore.plugin.js}
     * @param {string} pluginName - name of the plugin to download
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static downloadPlugin(pluginName, updateLink) {
        const request = require("request");
        const fileSystem = require("fs");
        const path = require("path");
        request(updateLink, async (error, response, body) => {
            if (error) return _logger__WEBPACK_IMPORTED_MODULE_1__["default"].warn("PluginUpdates", "Unable to get update for " + pluginName);
            const remoteVersion = window.PluginUpdates.plugins[updateLink].versioner(body);
            let filename = updateLink.split("/");
            filename = filename[filename.length - 1];
            const file = path.join(BdApi.Plugins.folder, filename);
            await new Promise(r => fileSystem.writeFile(file, body, r));
            ui__WEBPACK_IMPORTED_MODULE_3__.Toasts.success(`${pluginName} ${window.PluginUpdates.plugins[updateLink].version} has been replaced by ${pluginName} ${remoteVersion}`);
            this.removeUpdateNotice(pluginName);

            if (BdApi.isSettingEnabled("fork-ps-5")) return;
            if (!window.PluginUpdates.downloaded) {
                window.PluginUpdates.downloaded = [];
                const button = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].parseHTML(`<button class="btn btn-reload ${_discordclasses__WEBPACK_IMPORTED_MODULE_2__["default"].Notices.buttonMinor} ${_discordclasses__WEBPACK_IMPORTED_MODULE_2__["default"].Notices.button}">Reload</button>`);
                const tooltip = new ui__WEBPACK_IMPORTED_MODULE_3__.Tooltip(button, window.PluginUpdates.downloaded.join(", "), {side: "top"});
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.location.reload(false);
                });
                button.addEventListener("mouseenter", () => {
                    tooltip.label = window.PluginUpdates.downloaded.join(", ");
                });
                document.getElementById("pluginNotice").append(button);
            }
            window.PluginUpdates.plugins[updateLink].version = remoteVersion;
            window.PluginUpdates.downloaded.push(pluginName);
        });
    }

    /**
     * Will show the update notice top bar seen in Discord. Better not to call
     * this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static showUpdateNotice(pluginName, updateLink) {
        if (!document.getElementById("pluginNotice")) {
            const noticeElement = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].parseHTML(`<div class="${_discordclasses__WEBPACK_IMPORTED_MODULE_2__["default"].Notices.notice} ${_discordclasses__WEBPACK_IMPORTED_MODULE_2__["default"].Notices.colorInfo}" id="pluginNotice">
                                                        <div class="${_discordclasses__WEBPACK_IMPORTED_MODULE_2__["default"].Notices.closeButton}" id="pluginNoticeDismiss"></div>
                                                        <span class="notice-message">The following plugins have updates:</span>&nbsp;&nbsp;<strong id="outdatedPlugins"></strong>
                                                    </div>`);
            _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].query("[class*='app-'] > [class*='app-']").prepend(noticeElement);
            noticeElement.querySelector("#pluginNoticeDismiss").addEventListener("click", async () => {
                noticeElement.classList.add("closing");
                await new Promise(resolve => setTimeout(resolve, 400));
                noticeElement.remove();
            });
        }
        const pluginNoticeID = pluginName + "-notice";
        if (document.getElementById(pluginNoticeID)) return;
        const pluginNoticeElement = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].parseHTML(`<span id="${pluginNoticeID}">${pluginName}</span>`);
        pluginNoticeElement.addEventListener("click", () => {
            this.downloadPlugin(pluginName, updateLink);
        });
        if (document.getElementById("outdatedPlugins").querySelectorAll("span").length) document.getElementById("outdatedPlugins").append(_domtools__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("<span class='separator'>, </span>"));
        document.getElementById("outdatedPlugins").append(pluginNoticeElement);

        const tooltip = new ui__WEBPACK_IMPORTED_MODULE_3__.Tooltip(pluginNoticeElement, "Click To Update!", {side: "bottom"});

        // If this is the first one added, show the tooltip immediately.
        if (document.getElementById("outdatedPlugins").querySelectorAll("span").length === 1) tooltip.show();
    }

    /**
     * Will remove the plugin from the update notice top bar seen in Discord.
     * Better not to call this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     */
    static removeUpdateNotice(pluginName) {
        if (!document.getElementById("outdatedPlugins")) return;
        const notice = document.getElementById(pluginName + "-notice");
        if (notice) {
            if (notice.nextElementSibling && notice.nextElementSibling.matches(".separator")) notice.nextElementSibling.remove();
            else if (notice.previousElementSibling && notice.previousElementSibling.matches(".separator")) notice.previousElementSibling.remove();
            notice.remove();
        }

        if (!document.getElementById("outdatedPlugins").querySelectorAll("span").length) {
            if (document.querySelector("#pluginNotice .btn-reload")) document.querySelector("#pluginNotice .notice-message").textContent = "To finish updating you need to reload.";
            else document.getElementById("pluginNoticeDismiss").click();
        }
    }
}


/***/ }),

/***/ "./src/modules/pluginutilities.js":
/*!****************************************!*\
  !*** ./src/modules/pluginutilities.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PluginUtilities)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");



/**
 * A series of useful functions for BetterDiscord plugins.
 * @module PluginUtilities
 * @deprecated 1/21/22 Use Alternatives
 */


 class PluginUtilities {

    /**
     * Loads data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data is saved under
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default data
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static loadData(name, key, defaultData) {return _utilities__WEBPACK_IMPORTED_MODULE_0__["default"].loadData(name, key, defaultData);}

    /**
     * Saves data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data should be saved under
     * @param {object} data - data to save
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static saveData(name, key, data) {return _utilities__WEBPACK_IMPORTED_MODULE_0__["default"].saveData(name, key, data);}

    /**
     * Loads settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default settings
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static loadSettings(name, defaultSettings) {return _utilities__WEBPACK_IMPORTED_MODULE_0__["default"].loadSettings(name, defaultSettings);}

    /**
     * Saves settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} data - settings to save
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static saveSettings(name, data) {return _utilities__WEBPACK_IMPORTED_MODULE_0__["default"].saveSettings(name, data);}

    /**
     * Get the full path to the BetterDiscord folder.
     * @returns {string} full path to the BetterDiscord folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getBDFolder(subtarget = "") {
        const process = require("process");
        const path = require("path");
        if (process.env.injDir) return path.resolve(process.env.injDir, subtarget);
        switch (process.platform) {
            case "win32":
                return path.resolve(process.env.APPDATA, "BetterDiscord/", subtarget);
            case "darwin":
                return path.resolve(process.env.HOME, "Library/Application Support/", "BetterDiscord/", subtarget);
            default:
                return path.resolve(process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config", "BetterDiscord/", subtarget);
        }
    }

    /**
     * Get the full path to the plugins folder.
     * @returns {string} full path to the plugins folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getPluginsFolder() {return BdApi.Plugins.folder;}

    /**
     * Get the full path to the themes folder.
     * @returns {string} full path to the themes folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getThemesFolder() {return BdApi.Themes.folder;}

    /**
     * Adds a callback to a set of listeners for onSwitch.
     * @param {callable} callback - basic callback to happen on channel switch
     * @deprecated 1/21/22 Use onSwitch
     */
    static addOnSwitchListener() {}

    /**
     * Removes the listener added by {@link InternalUtilities.addOnSwitchListener}.
     * @param {callable} callback - callback to remove from the listener list
     * @deprecated 1/21/22 Use onSwitch
     */
    static removeOnSwitchListener() {}

    /**
     * Adds a style to the document.
     * @param {string} id - identifier to use as the element id
     * @param {string} css - css to add to the document
     * @deprecated 1/21/22 Use DOMTools
     */
    static addStyle(id, css) {return _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].addStyle(id, css);}

    /**
     * Removes a style from the document.
     * @param {string} id - original identifier used
     * @deprecated 1/21/22 Use DOMTools
     */
    static removeStyle(id) {return _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].removeStyle(id);}

    /**
     * Adds/requires a remote script to be loaded
     * @param {string} id - identifier to use for this script
     * @param {string} url - url from which to load the script
     * @returns {Promise} promise that resolves when the script is loaded
     * @deprecated 1/21/22 Use DOMTools
     */
    static addScript(id, url) {return _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].addScript(id, url);}

    /**
     * Removes a remote script from the document.
     * @param {string} id - original identifier used
     * @deprecated 1/21/22 Use DOMTools
     */
    static removeScript(id) {return _domtools__WEBPACK_IMPORTED_MODULE_1__["default"].removeScript(id);}
}




/***/ }),

/***/ "./src/modules/reactcomponents.js":
/*!****************************************!*\
  !*** ./src/modules/reactcomponents.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReactComponents)
/* harmony export */ });
/* harmony import */ var _patcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patcher */ "./src/modules/patcher.js");
/* harmony import */ var _discordmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");
/* harmony import */ var _reacttools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reacttools */ "./src/modules/reacttools.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/**
 * BetterDiscord React Component Manipulations
 * Original concept and some code by samogot - https://github.com/samogot / https://github.com/samogot/betterdiscord-plugins/tree/master/v2/1Lib%20Discord%20Internals
 *
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/







class ReactComponent {
    constructor(id, component, selector, filter) {
        this.id = id;
        this.component = component;
        this.selector = selector;
        this.filter = filter;
    }

    forceUpdateAll() {
        if (!this.selector) return;
        for (const e of document.querySelectorAll(this.selector)) {
            const stateNode = _utilities__WEBPACK_IMPORTED_MODULE_4__["default"].findInTree(_reacttools__WEBPACK_IMPORTED_MODULE_3__["default"].getReactInstance(e), m => m && m.forceUpdate, {walkable: ["return", "stateNode"]});
            if (!stateNode) continue;
            stateNode.forceUpdate();
        }
    }
}

/**
 * Methods for obtaining and interacting with react components.
 * @module ReactComponents
 */
class ReactComponents {
    static get components() {return this._components || (this._components = new Map());}
    static get unknownComponents() {return this._unknownComponents || (this._unknownComponents = new Set());}
    static get listeners() {return this._listeners || (this._listeners = new Map());}
    static get nameSetters() {return this._nameSetters || (this._nameSetters = new Set());}

    static get ReactComponent() {return ReactComponent;}

    static initialize() {
        ReactAutoPatcher.autoUnpatch();
        ReactAutoPatcher.autoPatch();
        ReactAutoPatcher.processAll();
    }

    static push(component, selector, filter) {
        if (typeof(component) !== "function") return null;
        const {displayName} = component;
        if (!displayName) return this.processUnknown(component);

        const have = this.components.get(displayName);
        if (have) {
            if (!have.selector) have.selector = selector;
            if (!have.filter) have.filter = filter;
            return component;
        }

        const c = new ReactComponent(displayName, component, selector, filter);
        this.components.set(c.id, c);

        const listener = this.listeners.get(displayName);
        if (listener) {
            for (const l of listener.children) l(c);
            this.listeners.delete(listener);
        }

        return c;
    }

    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @return {Promise<ReactComponent>}
     */
    static async getComponentByName(name, selector) {
        return this.getComponent(name, selector, m => m.displayName == name);
    }

    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @param {Function} filter A function to filter components if a single element is rendered by multiple components
     * @return {Promise<ReactComponent>}
     */
    static async getComponent(name, selector, filter) {
        const have = this.components.get(name);
        if (have) {
            if (!have.selector) have.selector = selector;
            if (!have.filter) have.filter = filter;
            return have;
        }

        if (selector) {
            const callback = () => {
                if (this.components.get(name)) {
                    _domtools__WEBPACK_IMPORTED_MODULE_2__["default"].observer.unsubscribe(observerSubscription);
                    return;
                }

                const elements = document.querySelectorAll(selector);
                if (!elements.length) return;

                let component;
                for (const element of elements) {
                    const componentsFound = _reacttools__WEBPACK_IMPORTED_MODULE_3__["default"].getComponents(element);
                    component = filter ? componentsFound.find(filter) : componentsFound[0];
                    if (component) break;
                }

                if (!component && filter) return;

                _domtools__WEBPACK_IMPORTED_MODULE_2__["default"].observer.unsubscribe(observerSubscription);

                if (!component) return;

                if (!component.displayName) component.displayName = name;

                this.push(component, selector, filter);
            };

            const observerSubscription = _domtools__WEBPACK_IMPORTED_MODULE_2__["default"].observer.subscribeToQuerySelector(callback, selector, null, true);
            setTimeout(callback, 0);
        }

        let listener = this.listeners.get(name);
        if (!listener) {
            listener = {
                id: name,
                children: [],
                filter
            };
            this.listeners.set(name, listener);
        }


        return new Promise(resolve => {
            listener.children.push(resolve);
        });
    }

    static setName(name, filter) {
        const have = this.components.get(name);
        if (have) return have;

        for (const component of this.unknownComponents.entries()) {
            if (!filter(component)) continue;
            component.displayName = name;
            this.unknownComponents.delete(component);
            return this.push(component);
        }
        return this.nameSetters.add({name, filter});
    }

    static processUnknown(component) {
        const have = this.unknownComponents.has(component);
        for (const setter of this.nameSetters.entries()) {
            if (setter.filter.filter(component)) {
                component.displayName = setter.name;
                this.nameSetters.delete(setter);
                return this.push(component);
            }
        }
        if (have) return have;
        this.unknownComponents.add(component);
        return component;
    }

    static *recursiveComponents(internalInstance = _reacttools__WEBPACK_IMPORTED_MODULE_3__["default"].rootInstance) {
        if (internalInstance.stateNode) yield internalInstance.stateNode;
        if (internalInstance.sibling) yield* this.recursiveComponents(internalInstance.sibling);
        if (internalInstance.child) yield* this.recursiveComponents(internalInstance.child);
    }
}

class ReactAutoPatcher {
    /**
     * Wait for React to be loaded and patch it's createElement to store all unknown components.
     * Also patches some known components.
     */
    static async autoPatch() {
        this.autoUnpatch();
        _patcher__WEBPACK_IMPORTED_MODULE_0__["default"].before("ReactComponents", _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React, "createElement", (react, [component]) => ReactComponents.push(component));
        _patcher__WEBPACK_IMPORTED_MODULE_0__["default"].instead("ReactComponents", _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React.Component.prototype, "UNSAFE_componentWillMount", (component) => ReactComponents.push(component));
        _patcher__WEBPACK_IMPORTED_MODULE_0__["default"].instead("ReactComponents", _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React.Component.prototype, "componentWillMount", (component) => ReactComponents.push(component));
    }

    static async autoUnpatch() {
        _patcher__WEBPACK_IMPORTED_MODULE_0__["default"].unpatchAll("ReactComponents");
    }

    /**
     * Finds and processes all currently available react components.
     */
    static processAll() {
        for (const component of ReactComponents.recursiveComponents()) {
            ReactComponents.push(component.constructor);
        }
    }
}


/***/ }),

/***/ "./src/modules/reacttools.js":
/*!***********************************!*\
  !*** ./src/modules/reacttools.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReactTools)
/* harmony export */ });
/* harmony import */ var _domtools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domtools */ "./src/modules/domtools.js");
/* harmony import */ var _discordmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");
/**
 * Helpful utilities for dealing with getting react information from DOM objects.
 * @module ReactTools
 */





class ReactTools {

    static get rootInstance() {return document.getElementById("app-mount")._reactRootContainer._internalRoot.current;}

    /**
     * Grabs the react internal instance of a specific node.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @return {object} the internal react instance
     */
    static getReactInstance(node) {
        const domNode = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].resolveElement(node);
        if (!(domNode instanceof Element)) return undefined;
        return domNode[Object.keys(domNode).find((key) => key.startsWith("__reactInternalInstance") || key.startsWith("__reactFiber"))];
    }

    /**
     * Grabs a value from the react internal instance. Allows you to grab
     * long depth values safely without accessing no longer valid properties.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @param {string} path - path to the requested value
     * @return {(*|undefined)} the value requested or undefined if not found.
     */
    static getReactProperty(node, path) {
        return _utilities__WEBPACK_IMPORTED_MODULE_2__["default"].getNestedProp(this.getReactInstance(node), path);
    }

    /**
     * Grabs a value from the react internal instance. Allows you to grab
     * long depth values safely without accessing no longer valid properties.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @param {object} options - options for the search
     * @param {array} [options.include] - list of items to include from the search
     * @param {array} [options.exclude=["Popout", "Tooltip", "Scroller", "BackgroundFlash"]] - list of items to exclude from the search
     * @param {callable} [options.filter=_=>_] - filter to check the current instance with (should return a boolean)
     * @return {(*|null)} the owner instance or undefined if not found.
     */
    static getOwnerInstance(node, {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"], filter = _ => _} = {}) {
        if (node === undefined) return undefined;
        const excluding = include === undefined;
        const nameFilter = excluding ? exclude : include;
        function getDisplayName(owner) {
            const type = owner.type;
            if (!type) return null;
            return type.displayName || type.name || null;
        }
        function classFilter(owner) {
            const name = getDisplayName(owner);
            return (name !== null && !!(nameFilter.includes(name) ^ excluding));
        }
        
        let curr = this.getReactInstance(node);
        for (curr = curr && curr.return; !_utilities__WEBPACK_IMPORTED_MODULE_2__["default"].isNil(curr); curr = curr.return) {
            if (_utilities__WEBPACK_IMPORTED_MODULE_2__["default"].isNil(curr)) continue;
            const owner = curr.stateNode;
            if (!_utilities__WEBPACK_IMPORTED_MODULE_2__["default"].isNil(owner) && !(owner instanceof HTMLElement) && classFilter(curr) && filter(owner)) return owner;
        }
        
        return null;
    }

    /**
     * Grabs the react internal state node trees of a specific node.
     * @param {(HTMLElement|jQuery)} node - node to obtain state nodes of
     * @return {Array<Function>} list of found state nodes
     */
    static getStateNodes(node) {
        const instance = this.getReactInstance(node);
        const stateNodes = [];
        let lastInstance = instance;
        while (lastInstance && lastInstance.return) {
            if (lastInstance.return.stateNode instanceof HTMLElement) break;
            if (lastInstance.return.stateNode) stateNodes.push(lastInstance.return.stateNode);
            lastInstance = lastInstance.return;
        }
        return stateNodes;
    }
    
    /**
     * Grabs the react internal component tree of a specific node.
     * @param {(HTMLElement|jQuery)} node - node to obtain react components of
     * @return {Array<Function>} list of found react components
     */
    static getComponents(node) {
        const instance = this.getReactInstance(node);
        const components = [];
        let lastInstance = instance;
        while (lastInstance && lastInstance.return) {
            if (typeof lastInstance.return.type === "string") break;
            if (lastInstance.return.type) components.push(lastInstance.return.type);
            lastInstance = lastInstance.return;
        }
        return components;
    }

    /**
     * Creates and renders a react element that wraps dom elements.
     * @param {(HTMLElement|Array<HTMLElement>)} element - element or array of elements to wrap into a react element
     * @returns {object} - rendered react element
     */
    static createWrappedElement(element) {
        if (Array.isArray(element)) element = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].wrap(element);
        return _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React.createElement(this.wrapElement(element));
    }

    /**
     * Creates an unrendered react component that wraps dom elements.
     * @param {(HTMLElement|Array<HTMLElement>)} element - element or array of elements to wrap into a react component
     * @returns {object} - unrendered react component
     */
    static wrapElement(element) {
        if (Array.isArray(element)) element = _domtools__WEBPACK_IMPORTED_MODULE_0__["default"].wrap(element);
        return class ReactWrapper extends _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React.Component {
            constructor(props) {
                super(props);
                this.element = element;
            }
    
            componentDidMount() {this.refs.element.appendChild(this.element);}
            render() {return _discordmodules__WEBPACK_IMPORTED_MODULE_1__["default"].React.createElement("div", {className: "react-wrapper", ref: "element"});}
        };
    }
}

/***/ }),

/***/ "./src/modules/utilities.js":
/*!**********************************!*\
  !*** ./src/modules/utilities.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Utilities)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./src/modules/logger.js");
/**
 * Random set of utilities that didn't fit elsewhere.
 * @module Utilities
 */



class Utilities {

    /**
     * Stably sorts arrays since `.sort()` has issues.
     * @param {Array} list - array to sort
     * @param {function} comparator - comparator to sort by
     */
    static stableSort(list, comparator) {
        const entries = Array(list.length);

        // wrap values with initial indices
        for (let index = 0; index < list.length; index++) {
            entries[index] = [index, list[index]];
        }

        // sort with fallback based on initial indices
        entries.sort(function (a, b) {
            const comparison = Number(this(a[1], b[1]));
            return comparison || a[0] - b[0];
        }.bind(comparator));

        // re-map original array to stable sorted values
        for (let index = 0; index < list.length; index++) {
            list[index] = entries[index][1];
        }
    }

    /**
     * Generates an automatically memoizing version of an object.
     * @param {Object} object - object to memoize
     * @returns {Proxy} the proxy to the object that memoizes properties
     */
    static memoizeObject(object) {
        const proxy = new Proxy(object, {
            get: function(obj, mod) {
                if (!obj.hasOwnProperty(mod)) return undefined;
                if (Object.getOwnPropertyDescriptor(obj, mod).get) {
                    const value = obj[mod];
                    delete obj[mod];
                    obj[mod] = value;
                }
                return obj[mod];
            },
            set: function(obj, mod, value) {
                if (obj.hasOwnProperty(mod)) return _logger__WEBPACK_IMPORTED_MODULE_0__["default"].err("MemoizedObject", "Trying to overwrite existing property");
                obj[mod] = value;
                return obj[mod];
            }
        });

        Object.defineProperty(proxy, "hasOwnProperty", {value: function(prop) {
            return this[prop] !== undefined;
        }});

        return proxy;
    }

    /**
     * Wraps the method in a `try..catch` block.
     * @param {callable} method - method to wrap
     * @param {string} description - description of method
     * @returns {callable} wrapped version of method
     */
    static suppressErrors(method, description) {
        return (...params) => {
            try {return method(...params);}
            catch (e) {_logger__WEBPACK_IMPORTED_MODULE_0__["default"].err("Suppression", "Error occurred in " + description, e);}
        };
    }

    /**
     * This only exists because Samo relied on lodash being there... fuck lodash.
     * @param {*} anything - whatever you want
     */
    static isNil(anything) {
        return anything == null;
    }

    /**
     * Format template strings with placeholders (`${placeholder}`) into full strings.
     * Quick example: `Utilities.formatString("Hello, ${user}", {user: "Zerebos"})`
     * would return "Hello, Zerebos".
     * @param {string} string - string to format
     * @param {object} values - object literal of placeholders to replacements
     * @returns {string} the properly formatted string
     */
    static formatTString(string, values) {
        for (const val in values) {
            let replacement = values[val];
            if (Array.isArray(replacement)) replacement = JSON.stringify(replacement);
            if (typeof(replacement) === "object" && replacement !== null) replacement = replacement.toString();
            string = string.replace(new RegExp(`\\$\\{${val}\\}`, "g"), replacement);
        }
        return string;
    }

    /**
     * Format strings with placeholders (`{{placeholder}}`) into full strings.
     * Quick example: `Utilities.formatString("Hello, {{user}}", {user: "Zerebos"})`
     * would return "Hello, Zerebos".
     * @param {string} string - string to format
     * @param {object} values - object literal of placeholders to replacements
     * @returns {string} the properly formatted string
     */
    static formatString(string, values) {
        for (const val in values) {
            let replacement = values[val];
            if (Array.isArray(replacement)) replacement = JSON.stringify(replacement);
            if (typeof(replacement) === "object" && replacement !== null) replacement = replacement.toString();
            string = string.replace(new RegExp(`{{${val}}}`, "g"), replacement);
        }
        return string;
    }

    /**
     * Finds a value, subobject, or array from a tree that matches a specific filter. Great for patching render functions.
     * @param {object} tree React tree to look through. Can be a rendered object or an internal instance.
     * @param {callable} searchFilter Filter function to check subobjects against.
     */
    static findInReactTree(tree, searchFilter) {
        return this.findInTree(tree, searchFilter, {walkable: ["props", "children", "child", "sibling"]});
    }

    /**
     * Finds a value, subobject, or array from a tree that matches a specific filter.
     * @param {object} tree Tree that should be walked
     * @param {callable} searchFilter Filter to check against each object and subobject
     * @param {object} options Additional options to customize the search
     * @param {Array<string>|null} [options.walkable=null] Array of strings to use as keys that are allowed to be walked on. Null value indicates all keys are walkable
     * @param {Array<string>} [options.ignore=[]] Array of strings to use as keys to exclude from the search, most helpful when `walkable = null`.
     */
    static findInTree(tree, searchFilter, {walkable = null, ignore = []} = {}) {
        if (typeof searchFilter === "string") {
            if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
        }
        else if (searchFilter(tree)) {
            return tree;
        }

        if (typeof tree !== "object" || tree == null) return undefined;

        let tempReturn;
        if (Array.isArray(tree)) {
            for (const value of tree) {
                tempReturn = this.findInTree(value, searchFilter, {walkable, ignore});
                if (typeof tempReturn != "undefined") return tempReturn;
            }
        }
        else {
            const toWalk = walkable == null ? Object.keys(tree) : walkable;
            for (const key of toWalk) {
                if (!tree.hasOwnProperty(key) || ignore.includes(key)) continue;
                tempReturn = this.findInTree(tree[key], searchFilter, {walkable, ignore});
                if (typeof tempReturn != "undefined") return tempReturn;
            }
        }
        return tempReturn;
    }

    /**
     * Gets a nested property (if it exists) safely. Path should be something like `prop.prop2.prop3`.
     * Numbers can be used for arrays as well like `prop.prop2.array.0.id`.
     * @param {Object} obj - object to get nested property of
     * @param {string} path - representation of the property to obtain
     */
    static getNestedProp(obj, path) {
        return path.split(".").reduce(function(ob, prop) {
            return ob && ob[prop];
        }, obj);
    }

    /**
     * Builds a classname string from any number of arguments. This includes arrays and objects.
     * When given an array all values from the array are added to the list.
     * When given an object they keys are added as the classnames if the value is truthy.
     * Copyright (c) 2018 Jed Watson https://github.com/JedWatson/classnames MIT License
     * @param {...Any} argument - anything that should be used to add classnames.
     */
    static className() {
        const classes = [];
        const hasOwn = {}.hasOwnProperty;

        for (let i = 0; i < arguments.length; i++) {
            const arg = arguments[i];
            if (!arg) continue;

            const argType = typeof arg;

            if (argType === "string" || argType === "number") {
                classes.push(arg);
            }
            else if (Array.isArray(arg) && arg.length) {
                const inner = this.classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
            else if (argType === "object") {
                for (const key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }

        return classes.join(" ");
    }

    /**
     * Safely adds to the prototype of an existing object by checking if the
     * property exists on the prototype.
     * @param {object} object - Object whose prototype to extend
     * @param {string} prop - Name of the prototype property to add
     * @param {callable} func - Function to run
     */
    static addToPrototype(object, prop, func) {
        if (!object.prototype) return;
        if (object.prototype[prop]) return;
        return object.prototype[prop] = func;
    }

    /**
     * Deep extends an object with a set of other objects. Objects later in the list
     * of `extenders` have priority, that is to say if one sets a key to be a primitive,
     * it will be overwritten with the next one with the same key. If it is an object, 
     * and the keys match, the object is extended. This happens recursively.
     * @param {object} extendee - Object to be extended
     * @param {...object} extenders - Objects to extend with
     * @returns {object} - A reference to `extendee`
     */
    static extend(extendee, ...extenders) {
        for (let i = 0; i < extenders.length; i++) {
            for (const key in extenders[i]) {
                if (extenders[i].hasOwnProperty(key)) {
                    if (Array.isArray(extendee[key]) && Array.isArray(extenders[i][key])) this.extend(extendee[key], extenders[i][key]);
                    else if (typeof extendee[key] === "object" && typeof extenders[i][key] === "object") this.extend(extendee[key], extenders[i][key]);
                    else if (Array.isArray(extenders[i][key])) extendee[key] = [], this.extend(extendee[key], extenders[i][key]); // eslint-disable-line no-sequences
                    else if (typeof extenders[i][key] === "object") extendee[key] = {}, this.extend(extendee[key], extenders[i][key]); // eslint-disable-line no-sequences
                    else extendee[key] = extenders[i][key];
                }
            }
        }
        return extendee;
    }

    /* Code below comes from our work on BDv2:
     * https://github.com/JsSucks/BetterDiscordApp/blob/master/common/modules/utils.js
     */

    /**
     * Clones an object and all it's properties.
     * @param {Any} value The value to clone
     * @return {Any} The cloned value
     */
    static deepclone(value) {
        if (typeof value === "object") {
            if (Array.isArray(value)) return value.map(i => this.deepclone(i));

            const clone = Object.assign({}, value);

            for (const key in clone) {
                clone[key] = this.deepclone(clone[key]);
            }

            return clone;
        }

        return value;
    }

    /**
     * Freezes an object and all it's properties.
     * @param {Any} object The object to freeze
     * @param {Function} exclude A function to filter object that shouldn't be frozen
     */
    static deepfreeze(object, exclude) {
        if (exclude && exclude(object)) return;

        if (typeof object === "object" && object !== null) {
            const properties = Object.getOwnPropertyNames(object);

            for (const property of properties) {
                this.deepfreeze(object[property], exclude);
            }

            Object.freeze(object);
        }

        return object;
    }

    /**
     * Removes an item from an array. This differs from Array.prototype.filter as it mutates the original array instead of creating a new one.
     * @param {Array} array The array to filter
     * @param {Any} item The item to remove from the array
     * @return {Array}
     */
    static removeFromArray(array, item, filter) {
        let index;
        while ((index = filter ? array.findIndex(item) : array.indexOf(item)) > -1) array.splice(index, 1);
        return array;
    }

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds.
     * 
     * Adapted from the version by David Walsh (https://davidwalsh.name/javascript-debounce-function)
     * 
     * @param {function} executor 
     * @param {number} delay 
     */
    static debounce(executor, delay) {
        let timeout;
        return function(...args) {
            const callback = () => {
                timeout = null;
                Reflect.apply(executor, null, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(callback, delay);
        };
    }

    /**
     * Loads data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data is saved under
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default data
    */
     static loadData(name, key, defaultData) {
        const defaults = this.deepclone(defaultData);
        try {return this.extend(defaults ? defaults : {}, BdApi.getData(name, key));}
        catch (err) {_logger__WEBPACK_IMPORTED_MODULE_0__["default"].err(name, "Unable to load data: ", err);}
        return defaults;
    }

    /**
     * Saves data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data should be saved under
     * @param {object} data - data to save
    */
    static saveData(name, key, data) {
        try {BdApi.setData(name, key, data);}
        catch (err) {_logger__WEBPACK_IMPORTED_MODULE_0__["default"].err(name, "Unable to save data: ", err);}
    }

    /**
     * Loads settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default settings
    */
    static loadSettings(name, defaultSettings) {
        return this.loadData(name, "settings", defaultSettings);
    }

    /**
     * Saves settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} data - settings to save
    */
    static saveSettings(name, data) {
        this.saveData(name, "settings", data);
    }

}

/***/ }),

/***/ "./src/modules/webpackmodules.js":
/*!***************************************!*\
  !*** ./src/modules/webpackmodules.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Filters": () => (/* binding */ Filters),
/* harmony export */   "default": () => (/* binding */ WebpackModules)
/* harmony export */ });
/* harmony import */ var _discordmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/modules/logger.js");
/**
 * Random set of utilities that didn't fit elsewhere.
 * @module WebpackModules
 */



 /**
 * Checks if a given module matches a set of parameters.
 * @callback module:WebpackModules.Filters~filter
 * @param {*} module - module to check
 * @returns {boolean} - True if the module matches the filter, false otherwise
 */

/**
 * Filters for use with {@link module:WebpackModules} but may prove useful elsewhere.
 */
class Filters {
    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties.
     * @param {Array<string>} props - Array of property names
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byProperties(props, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            for (let p = 0; p < props.length; p++) {
                if (module[props[p]] === undefined) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties on the object's prototype.
     * @param {Array<string>} fields - Array of property names
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties on the object's prototype
     */
    static byPrototypeFields(fields, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            if (!component.prototype) return false;
            for (let f = 0; f < fields.length; f++) {
                if (module.prototype[fields[f]] === undefined) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a regex.
     * @param {RegExp} search - A RegExp to check on the module
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byCode(search, filter = m => m) {
        return module => {
            const method = filter(module);
            if (!method) return false;
            let methodString = "";
            try {methodString = method.toString([]);}
            catch (err) {methodString = method.toString();}
            return methodString.search(search) !== -1;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by strings.
     * @param {...String} search - A RegExp to check on the module
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of strings
     */
    static byString(...strings) {
        return module => {
            let moduleString = "";
            try {moduleString = module.toString([]);}
            catch (err) {moduleString = module.toString();}
            for (const s of strings) {
                if (!moduleString.includes(s)) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties.
     * @param {string} name - Name the module should have
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byDisplayName(name) {
        return module => {
            return module && module.displayName === name;
        };
    }

    /**
     * Generates a combined {@link module:WebpackModules.Filters~filter} from a list of filters.
     * @param {...module:WebpackModules.Filters~filter} filters - A list of filters
     * @returns {module:WebpackModules.Filters~filter} - Combinatory filter of all arguments
     */
    static combine(...filters) {
        return module => {
            return filters.every(filter => filter(module));
        };
    }
}

class WebpackModules {

    static find(filter, first = true) {return this.getModule(filter, first);}
    static findAll(filter) {return this.getModule(filter, false);}
    static findByUniqueProperties(props, first = true) {return first ? this.getByProps(...props) : this.getAllByProps(...props);}
    static findByDisplayName(name) {return this.getByDisplayName(name);}

    /**
     * Finds a module using a filter function.
     * @param {Function} filter A function to use to filter modules
     * @param {Boolean} first Whether to return only the first matching module
     * @return {Any}
     */
    static getModule(filter, first = true) {
        const wrappedFilter = (m) => {
            try {return filter(m);}
            catch (err) {return false;}
        };
        const modules = this.getAllModules();
        const rm = [];
        for (const index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const {exports} = module;
            let foundModule = null;

            if (!exports) continue;
            if (exports.__esModule && exports.default && wrappedFilter(exports.default)) foundModule = exports.default;
            if (wrappedFilter(exports)) foundModule = exports;
            if (!foundModule) continue;
            if (first) return foundModule;
            rm.push(foundModule);
        }
        return first || rm.length == 0 ? undefined : rm;
    }

    /**
     * Gets the index in the webpack require cache of a specific
     * module using a filter.
     * @param {Function} filter A function to use to filter modules
     * @return {Number|null}
     */
    static getIndex(filter) {
        const wrappedFilter = (m) => {
            try {return filter(m);}
            catch (err) {return false;}
        };
        const modules = this.getAllModules();
        for (const index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const exports = module.exports;
            let foundModule = null;

            if (!exports) continue;
            if (exports.__esModule && exports.default && wrappedFilter(exports.default)) foundModule = exports.default;
            if (wrappedFilter(exports)) foundModule = exports;
            if (!foundModule) continue;
            return index;
        }
        return null;
    }

    /**
     * Gets the index in the webpack require cache of a specific
     * module that was already found.
     * @param {Any} module An already acquired module
     * @return {Number|null}
     */
    static getIndexByModule(module) {
        return this.getIndex(m => m == module);
    }

    /**
     * Finds all modules matching a filter function.
     * @param {Function} filter A function to use to filter modules
     */
    static getModules(filter) {return this.getModule(filter, false);}

    /**
     * Finds a module by its name.
     * @param {String} name The name of the module
     * @param {Function} fallback A function to use to filter modules if not finding a known module
     * @return {Any}
     */
    static getModuleByName(name, fallback) {
        if (_discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProperty(name)) return _discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"][name];
        if (!fallback) return undefined;
        const module = this.getModule(fallback, true);
        return module ? _discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"][name] = module : undefined;
    }

    /**
     * Finds a module by its display name.
     * @param {String} name The display name of the module
     * @return {Any}
     */
    static getByDisplayName(name) {
        return this.getModule(Filters.byDisplayName(name), true);
    }

    /**
     * Finds a module using its code.
     * @param {RegEx} regex A regular expression to use to filter modules
     * @param {Boolean} first Whether to return the only the first matching module
     * @return {Any}
     */
    static getByRegex(regex, first = true) {
        return this.getModule(Filters.byCode(regex), first);
    }

    /**
     * Finds a single module using properties on its prototype.
     * @param {...string} prototypes Properties to use to filter modules
     * @return {Any}
     */
    static getByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes), true);
    }

    /**
     * Finds all modules with a set of properties of its prototype.
     * @param {...string} prototypes Properties to use to filter modules
     * @return {Any}
     */
    static getAllByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes), false);
    }

    /**
     * Finds a single module using its own properties.
     * @param {...string} props Properties to use to filter modules
     * @return {Any}
     */
    static getByProps(...props) {
        return this.getModule(Filters.byProperties(props), true);
    }

    /**
     * Finds all modules with a set of properties.
     * @param {...string} props Properties to use to filter modules
     * @return {Any}
     */
    static getAllByProps(...props) {
        return this.getModule(Filters.byProperties(props), false);
    }

    /**
     * Finds a single module using a set of strings.
     * @param {...String} props Strings to use to filter modules
     * @return {Any}
     */
    static getByString(...strings) {
        return this.getModule(Filters.byString(...strings), true);
    }

    /**
     * Finds all modules with a set of strings.
     * @param {...String} strings Strings to use to filter modules
     * @return {Any}
     */
    static getAllByString(...strings) {
        return this.getModule(Filters.byString(...strings), false);
    }

    /**
     * Gets a specific module by index of the webpack require cache.
     * Best used in combination with getIndex in order to patch a
     * specific function.
     *
     * Note: this gives the **raw** module, meaning the actual module
     * is in returnValue.exports. This is done in order to be able
     * to patch modules which export a single function directly.
     * @param {Number} index Index into the webpack require cache
     * @return {Any}
     */
    static getByIndex(index) {
        return WebpackModules.require.c[index].exports;
    }

    /**
     * Discord's __webpack_require__ function.
     */
    static get require() {
        if (this._require) return this._require;
        const id = "zl-webpackmodules";
        const __nested_webpack_require_11118__ = window.webpackJsonp.push([[], {
            [id]: (module, exports, req) => module.exports = req
        }, [[id]]]);
        delete __nested_webpack_require_11118__.m[id];
        delete __nested_webpack_require_11118__.c[id];
        return this._require = __nested_webpack_require_11118__;
    }

    /**
     * Returns all loaded modules.
     * @return {Array}
     */
    static getAllModules() {
        return this.require.c;
    }



    // Webpack Chunk Observing
    static get chunkName() {return "webpackChunkdiscord_app";}

    static initialize() {
        this.handlePush = this.handlePush.bind(this);
        this.listeners = new Set();
        
        this.__ORIGINAL_PUSH__ = window[this.chunkName].push;
        Object.defineProperty(window[this.chunkName], "push", {
            configurable: true,
            get: () => this.handlePush,
            set: (newPush) => {
                this.__ORIGINAL_PUSH__ = newPush;

                Object.defineProperty(window[this.chunkName], "push", {
                    value: this.handlePush,
                    configurable: true,
                    writable: true
                });
            }
        });
    }    

    /**
     * Adds a listener for when discord loaded a chunk. Useful for subscribing to lazy loaded modules.
     * @param {Function} listener - Function to subscribe for chunks
     * @returns {Function} A cancelling function
     */
     static addListener(listener) {
        this.listeners.add(listener);
        return this.removeListener.bind(this, listener);
    }

    /**
     * Removes a listener for when discord loaded a chunk.
     * @param {Function} listener
     * @returns {boolean}
     */
    static removeListener(listener) {return this.listeners.delete(listener);}

    static handlePush(chunk) {
        const [, modules] = chunk;

        for (const moduleId in modules) {
            const originalModule = modules[moduleId];

            modules[moduleId] = (module, exports, require) => {
                try {
                    Reflect.apply(originalModule, null, [module, exports, require]);

                    const listeners = [...this.listeners];
                    for (let i = 0; i < listeners.length; i++) {
                        try {listeners[i](exports, originalModule, moduleId);}
                        catch (error) {
                            _logger__WEBPACK_IMPORTED_MODULE_1__["default"].err("WebpackModules", "Could not fire callback listener:", error);
                        }
                    }
                }
                catch (error) {
                    _logger__WEBPACK_IMPORTED_MODULE_1__["default"].stacktrace("WebpackModules", "Error patching chunked module push", error);
                }
            };

            Object.assign(modules[moduleId], originalModule, {
                toString: () => originalModule.toString()
            });
        }

        return Reflect.apply(this.__ORIGINAL_PUSH__, window[this.chunkName], [chunk]);
    }

}

WebpackModules.initialize();

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((BasePlugin, Library) => {
    const {PluginUpdater, Patcher, Logger, Settings, Toasts, DOMTools, ReactComponents, DCM, Popouts} = Library;
    const PluginLibrary = class PluginLibrary extends BasePlugin {
        get Library() {return Library;}
        
        load() {
            super.load();
            const wasLibLoaded = !!document.getElementById("ZLibraryCSS");
            const isBBDLoading = document.getElementsByClassName("bd-loaderv2").length;
            DOMTools.removeStyle("ZLibraryCSS");
            DOMTools.addStyle("ZLibraryCSS", Settings.CSS + Toasts.CSS + PluginUpdater.CSS);
            ReactComponents.initialize();
            DCM.initialize();
            Popouts.initialize();
            
            /**
             * Checking if this is the library first being loaded during init
             * This means that subsequent loads will cause dependents to reload
             * This also means first load when installing for the first time 
             * will automatically reload the dependent plugins. This is needed
             * for those plugins that prompt to download and install the lib.
             */

            if (!wasLibLoaded && isBBDLoading) return; // If the this is the lib's first load AND this is BD's initialization

            /**
             * Now we can go ahead and reload any dependent plugins by checking
             * for any with instance._config. Both plugins using buildPlugin()
             * and plugin skeletons that prompt for download should have this
             * instance property.
             */

            // development vs master
            const id = BdApi.version ? ["settings", "general", "showToasts"] : ["fork-ps-2"];
            const wasEnabled = BdApi.isSettingEnabled(...id);
            if (wasEnabled) BdApi.disableSetting(...id);
            this._reloadPlugins();
            if (wasEnabled) BdApi.enableSetting(...id);
        }

        _reloadPlugins() {
            const list = BdApi.Plugins.getAll().reduce((acc, val) => {
                if (!val.instance || !val.instance._config) return acc;
                const name = val.name || val.instance.getName();
                if (name === "ZeresPluginLibrary") return acc;
                acc.push(name);
                return acc;
            }, []);
            for (let p = 0; p < list.length; p++) BdApi.Plugins.reload(list[p]);
        }

        static buildPlugin(config) {
            const name = config.info.name;
            const BoundAPI = {
                Logger: {
                    stacktrace: (message, error) => Logger.stacktrace(name, message, error),
                    log: (...message) => Logger.log(name, ...message),
                    error: (...message) => Logger.err(name, ...message),
                    err: (...message) => Logger.err(name, ...message),
                    warn: (...message) => Logger.warn(name, ...message),
                    info: (...message) => Logger.info(name, ...message),
                    debug: (...message) => Logger.debug(name, ...message)
                },
                Patcher: {
                    getPatchesByCaller: () => {return Patcher.getPatchesByCaller(name);},
                    unpatchAll: () => {return Patcher.unpatchAll(name);},
                    before: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.before(name, moduleToPatch, functionName, callback, options);},
                    instead: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.instead(name, moduleToPatch, functionName, callback, options);},
                    after: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.after(name, moduleToPatch, functionName, callback, options);}
                }
            };
            const BoundLib = Object.assign({}, Library);
            BoundLib.Logger = BoundAPI.Logger;
            BoundLib.Patcher = BoundAPI.Patcher;
            return [Library.Structs.Plugin(config), BoundLib]; // eslint-disable-line new-cap
        }
    };

    Object.assign(PluginLibrary, Library);
    Library.buildPlugin = PluginLibrary.buildPlugin;
    window.ZLibrary = Library;
    window.ZLibraryPromise = new Promise(r => setImmediate(r));
    window.ZeresPluginLibrary = PluginLibrary;
    return PluginLibrary;
});

/***/ }),

/***/ "./src/structs/dom/classname.js":
/*!**************************************!*\
  !*** ./src/structs/dom/classname.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selector */ "./src/structs/dom/selector.js");


/** 
 * Representation of a Class Name
 * @memberof module:DOMTools
 **/
class ClassName {
    /**
     * 
     * @param {string} name - name of the class to represent
     */
    constructor(name) {
        this.value = name;
    }
    
    /**
     * Concatenates new class names to the current one using spaces.
     * @param {string} classNames - list of class names to add to this class name
     * @returns {ClassName} returns self to allow chaining
     */
    add(...classNames) {
        for (let i = 0; i < classNames.length; i++) this.value += " " + classNames[i];
        return this;
    }
    
    /**
     * Returns the raw class name, this is how native function get the value.
     * @returns {string} raw class name.
     */
    toString() {
        return this.value;
    }
    
    /**
     * Returns the raw class name, this is how native function get the value.
     * @returns {string} raw class name.
     */
    valueOf() {
        return this.value;
    }
    
    /**
     * Returns the classname represented as {@link module:DOMTools.Selector}.
     * @returns {Selector} selector representation of this class name.
     */
    get selector() {
        return new _selector__WEBPACK_IMPORTED_MODULE_0__["default"](this.value);
    }

    get single() {
        return this.value.split(" ")[0];
    }

    get first() {
        return this.value.split(" ")[0];
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClassName);

/***/ }),

/***/ "./src/structs/dom/observer.js":
/*!*************************************!*\
  !*** ./src/structs/dom/observer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/**
 * BetterDiscord Client DOM Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/



/* eslint-disable operator-linebreak */

/** 
 * Representation of a MutationObserver but with helpful utilities.
 * @memberof module:DOMTools
 **/
class DOMObserver {
    constructor(root, options) {
        this.observe = this.observe.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.observerCallback = this.observerCallback.bind(this);

        this.active = false;
        this.root = root || document.getElementById("app-mount");
        this.options = options || {attributes: true, childList: true, subtree: true};

        this.observer = new MutationObserver(this.observerCallback);
        this.observe();
    }

    observerCallback(mutations) {
        for (const sub of Array.from(this.subscriptions)) {
            try {
                const filteredMutations = sub.filter ? mutations.filter(sub.filter) : mutations;

                if (sub.group) {
                    if (!filteredMutations.length) continue;
                    sub.callback.call(sub.bind || sub, filteredMutations);
                }
                else {
                    for (const mutation of filteredMutations) sub.callback.call(sub.bind || sub, mutation);
                }
            }
            catch (err) {
                modules__WEBPACK_IMPORTED_MODULE_0__.Logger.stacktrace("DOMObserver", "Error in observer callback", err);
            }
        }
    }

    /**
     * Starts observing the element. This will be called when attaching a callback.
     * You don't need to call this manually.
     */
    observe() {
        if (this.active) return;
        this.observer.observe(this.root, this.options);
        this.active = true;
    }

    /**
     * Disconnects this observer. This stops callbacks being called, but does not unbind them.
     * You probably want to use observer.unsubscribeAll instead.
     */
    disconnect() {
        if (!this.active) return;
        this.observer.disconnect();
        this.active = false;
    }

    reconnect() {
        if (this.active) {
            this.disconnect();
            this.observe();
        }
    }

    get root() {return this._root;}
    set root(root) {this._root = root; this.reconnect();}

    get options() {return this._options;}
    set options(options) {this._options = options; this.reconnect();}

    get subscriptions() {
        return this._subscriptions || (this._subscriptions = []);
    }

    /**
     * Subscribes to mutations.
     * @param {Function} callback A function to call when on a mutation
     * @param {Function} filter A function to call to filter mutations
     * @param {Any} bind Something to bind the callback to
     * @param {Boolean} group Whether to call the callback with an array of mutations instead of a single mutation
     * @return {Object}
     */
    subscribe(callback, filter, bind, group) {
        const subscription = {callback, filter, bind, group};
        this.subscriptions.push(subscription);
        this.observe();
        return subscription;
    }

    /**
     * Removes a subscription and disconnect if there are none left.
     * @param {Object} subscription A subscription object returned by observer.subscribe
     */
    unsubscribe(subscription) {
        if (!this.subscriptions.includes(subscription)) subscription = this.subscriptions.find(s => s.callback === subscription);
        modules__WEBPACK_IMPORTED_MODULE_0__.Utilities.removeFromArray(this.subscriptions, subscription);
        if (!this.subscriptions.length) this.disconnect();
    }

    unsubscribeAll() {
        this.subscriptions.splice(0, this.subscriptions.length);
        this.disconnect();
    }

    /**
     * Subscribes to mutations that affect an element matching a selector.
     * @param {Function} callback A function to call when on a mutation
     * @param {Function} filter A function to call to filter mutations
     * @param {Any} bind Something to bind the callback to
     * @param {Boolean} group Whether to call the callback with an array of mutations instead of a single mutation
     * @return {Object}
     */
    subscribeToQuerySelector(callback, selector, bind, group) {
        return this.subscribe(callback, mutation => {
            return mutation.target.matches(selector) // If the target matches the selector
                || Array.from(mutation.addedNodes).concat(Array.from(mutation.removedNodes)) // Or if either an added or removed node
                    .find(n => n instanceof Element && (n.matches(selector) || n.querySelector(selector))); // match or contain an element matching the selector
        }, bind, group);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMObserver);

/***/ }),

/***/ "./src/structs/dom/selector.js":
/*!*************************************!*\
  !*** ./src/structs/dom/selector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** 
 * Representation of a Selector
 * @memberof module:DOMTools
 **/
class Selector {
    /**
     * 
     * @param {string} classname - class to create selector for
     */
    constructor(className) {
        this.value = " ." + className.split(" ").join(".");
    }
    
    /**
     * Returns the raw selector, this is how native function get the value.
     * @returns {string} raw selector.
     */
    toString() {
        return this.value;
    }
    
    /**
     * Returns the raw selector, this is how native function get the value.
     * @returns {string} raw selector.
     */
    valueOf() {
        return this.value;
    }
    
    selector(symbol, other) {
        this.value = `${this.toString()} ${symbol} ${other.toString()}`;
        return this;
    }
    
    /**
     * Adds another selector as a direct child `>` to this one.
     * @param {string|DOMTools.Selector} other - Selector to add as child
     * @returns {DOMTools.Selector} returns self to allow chaining
     */
    child(other) {
        return this.selector(">", other);
    }
    
    /**
     * Adds another selector as a adjacent sibling `+` to this one.
     * @param {string|DOMTools.Selector} other - Selector to add as adjacent sibling
     * @returns {DOMTools.Selector} returns self to allow chaining
     */
    adjacent(other) {
        return this.selector("+", other);
    }
    
    /**
     * Adds another selector as a general sibling `~` to this one.
     * @param {string|DOMTools.Selector} other - Selector to add as sibling
     * @returns {DOMTools.Selector} returns self to allow chaining
     */
    sibling(other) {
        return this.selector("~", other);
    }
    
    /**
     * Adds another selector as a descendent `(space)` to this one.
     * @param {string|DOMTools.Selector} other - Selector to add as descendent
     * @returns {DOMTools.Selector} returns self to allow chaining
     */
    descend(other) {
        return this.selector(" ", other);
    }

    /**
     * Adds another selector to this one via `,`.
     * @param {string|DOMTools.Selector} other - Selector to add
     * @returns {DOMTools.Selector} returns self to allow chaining
     */
    and(other) {
        return this.selector(",", other);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Selector);

/***/ }),

/***/ "./src/structs/listenable.js":
/*!***********************************!*\
  !*** ./src/structs/listenable.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Acts as an interface for anything that should be listenable.
 */
class Listenable {

    constructor() {
        this.listeners = [];
    }

    /**
     * Adds a listener to the current object.
     * @param {callable} callback - callback for when the event occurs
     * @returns {callable} - a way to cancel the listener without needing to call `removeListener`
     */
    addListener(callback) {
        if (typeof(callback) !== "function") return;
        this.listeners.push(callback);
        return () => {
            this.listeners.splice(this.listeners.indexOf(callback), 1);
        };
    }

    /**
     * Removes a listener from the current object.
     * @param {callable} callback - callback that was originally registered
     */
    removeListener(callback) {
        if (typeof(callback) !== "function") return;
        this.listeners.splice(this.listeners.indexOf(callback), 1);
    }
    
    /**
     * Alerts the listeners that an event occurred. Data passed is optional
     * @param {*} [...data] - Any data desired to be passed to listeners 
     */
    alertListeners(...data) {
        for (let l = 0; l < this.listeners.length; l++) this.listeners[l](...data);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Listenable);

/***/ }),

/***/ "./src/structs/plugin.js":
/*!*******************************!*\
  !*** ./src/structs/plugin.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_pluginupdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/pluginupdater */ "./src/modules/pluginupdater.js");
/* harmony import */ var _modules_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/logger */ "./src/modules/logger.js");
/* harmony import */ var _modules_reacttools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/reacttools */ "./src/modules/reacttools.js");
/* harmony import */ var _ui_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/modals */ "./src/ui/modals.js");
/* harmony import */ var _modules_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/utilities */ "./src/modules/utilities.js");
/* harmony import */ var _modules_discordmodules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _ui_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/settings */ "./src/ui/settings/index.js");








/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(meta) {
    return class Plugin {
        constructor() {
            this._config = meta;
            this._enabled = false;
            if (typeof(meta.defaultConfig) != "undefined") {
                this.defaultSettings = {};
                for (let s = 0; s < meta.defaultConfig.length; s++) {
                    const current = meta.defaultConfig[s];
                    if (current.type != "category") {this.defaultSettings[current.id] = current.value;}
                    else {
                        this.defaultSettings[current.id] = {};
                        for (let si = 0; si < current.settings.length; si++) {
                            const subCurrent = current.settings[si];
                            this.defaultSettings[current.id][subCurrent.id] = subCurrent.value;
                        }
                    }
                }
                this._hasConfig = true;
                this.settings = _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].deepclone(this.defaultSettings);
            }
        }
        getName() {return this._config.info.name.replace(" ", "");}
        getDescription() {return this._config.info.description;}
        getVersion() {return this._config.info.version;}
        getAuthor() {return this._config.info.authors.map(a => a.name).join(", ");}
        load() {
            const currentVersionInfo = _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].loadData(this.getName(), "currentVersionInfo", {version: this.getVersion(), hasShownChangelog: false});
            if (currentVersionInfo.version != this.getVersion() || !currentVersionInfo.hasShownChangelog) {
                this.showChangelog();
                _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].saveData(this.getName(), "currentVersionInfo", {version: this.getVersion(), hasShownChangelog: true});
            }
            _modules_pluginupdater__WEBPACK_IMPORTED_MODULE_0__["default"].checkForUpdate(this.getName(), this.getVersion(), this._config.info.github_raw);
        }
        async start() {
            _modules_logger__WEBPACK_IMPORTED_MODULE_1__["default"].info(this.getName(), `version ${this.getVersion()} has started.`);
            if (this.defaultSettings) this.settings = this.loadSettings();
            this._enabled = true;
            if (typeof(this.onStart) == "function") this.onStart();
        }
        stop() {
            _modules_logger__WEBPACK_IMPORTED_MODULE_1__["default"].info(this.getName(), `version ${this.getVersion()} has stopped.`);
            this._enabled = false;
            if (typeof(this.onStop) == "function") this.onStop();
        }

        get isEnabled() {return this._enabled;}
        get strings() {
            if (!this._config.strings) return {};
            const locale = _modules_discordmodules__WEBPACK_IMPORTED_MODULE_5__["default"].UserSettingsStore.locale.split("-")[0];
            if (this._config.strings.hasOwnProperty(locale)) return this._config.strings[locale];
            if (this._config.strings.hasOwnProperty("en")) return this._config.strings.en;
            return this._config.strings;
        }
        
        set strings(strings) {
            this._config.strings = strings;
        }

        showSettingsModal() {
            if (typeof(this.getSettingsPanel) != "function") return;
            _ui_modals__WEBPACK_IMPORTED_MODULE_3__["default"].showModal(this.getName() + " Settings", _modules_reacttools__WEBPACK_IMPORTED_MODULE_2__["default"].createWrappedElement(this.getSettingsPanel()), {
                cancelText: "",
                confirmText: "Done",
                size: _ui_modals__WEBPACK_IMPORTED_MODULE_3__["default"].ModalSizes.MEDIUM
            });
        }

        showChangelog(footer) {
            if (typeof(this._config.changelog) == "undefined") return;
            _ui_modals__WEBPACK_IMPORTED_MODULE_3__["default"].showChangelogModal(this.getName() + " Changelog", this.getVersion(), this._config.changelog, footer);
        }

        saveSettings(settings) {
            _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].saveSettings(this.getName(), this.settings ? this.settings : settings);
        }

        loadSettings(defaultSettings) {
            // loadSettings -> loadData -> defaultSettings gets deep cloned
            return _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].loadSettings(this.getName(), this.defaultSettings ? this.defaultSettings : defaultSettings);
        }

        buildSetting(data) {
            const {name, note, type, value, onChange, id} = data;
            let setting = null;
            if (type == "color") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.ColorPicker(name, note, value, onChange, {disabled: data.disabled, presetColors: data.presetColors});
            else if (type == "dropdown") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.Dropdown(name, note, value, data.options, onChange);
            else if (type == "file") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.FilePicker(name, note, onChange);
            else if (type == "keybind") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.Keybind(name, note, value, onChange);
            else if (type == "radio") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.RadioGroup(name, note, value, data.options, onChange, {disabled: data.disabled});
            else if (type == "slider") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.Slider(name, note, data.min, data.max, value, onChange, data);
            else if (type == "switch") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.Switch(name, note, value, onChange, {disabled: data.disabled});
            else if (type == "textbox") setting = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.Textbox(name, note, value, onChange, {placeholder: data.placeholder || ""});
            if (id) setting.id = id;
            return setting;
        }

        buildSettingsPanel() {
            const config = this._config.defaultConfig;
            const buildGroup = (group) => {
                const {name, id, collapsible, shown, settings} = group;
                // this.settings[id] = {};

                const list = [];
                for (let s = 0; s < settings.length; s++) {
                    const current = Object.assign({}, settings[s]);
                    current.value = this.settings[id][current.id];
                    current.onChange = (value) => {
                        this.settings[id][current.id] = value;
                    };
                    if (Object.keys(this.strings).length && this.strings.settings && this.strings.settings[id] && this.strings.settings[id][current.id]) {
                        const {settingName = name, note} = this.strings.settings[id][current.id];
                        current.name = settingName;
                        current.note = note;
                    }
                    list.push(this.buildSetting(current));
                }
                
                const settingGroup = new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.SettingGroup(name, {shown, collapsible}).append(...list);
                settingGroup.id = id;
                return settingGroup;
            };
            const list = [];
            for (let s = 0; s < config.length; s++) {
                const current = Object.assign({}, config[s]);
                if (current.type != "category") {
                    current.value = this.settings[current.id];
                    current.onChange = (value) => {
                        this.settings[current.id] = value;
                    };
                    if (Object.keys(this.strings).length && this.strings.settings && this.strings.settings[current.id]) {
                        const {name, note} = this.strings.settings[current.id];
                        current.name = name;
                        current.note = note;
                    }
                    list.push(this.buildSetting(current));
                }
                else {
                    list.push(buildGroup(current));
                }
            }

            return new _ui_settings__WEBPACK_IMPORTED_MODULE_6__.SettingPanel(this.saveSettings.bind(this), ...list);
        }
    };
}

/***/ }),

/***/ "./src/structs/screen.js":
/*!*******************************!*\
  !*** ./src/structs/screen.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Representation of the screen such as width and height.
 * @deprecated 1/21/22 Use DOMTools
 */
class Screen {
    /** Document/window width */
    static get width() {return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);}
    /** Document/window height */
    static get height() {return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Screen);

/***/ }),

/***/ "./src/structs/structs.js":
/*!********************************!*\
  !*** ./src/structs/structs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Screen": () => (/* reexport safe */ _screen__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Selector": () => (/* reexport safe */ _dom_selector__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "ClassName": () => (/* reexport safe */ _dom_classname__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "DOMObserver": () => (/* reexport safe */ _dom_observer__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Listenable": () => (/* reexport safe */ _listenable__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Plugin": () => (/* reexport safe */ _plugin__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen */ "./src/structs/screen.js");
/* harmony import */ var _dom_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/selector */ "./src/structs/dom/selector.js");
/* harmony import */ var _dom_classname__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/classname */ "./src/structs/dom/classname.js");
/* harmony import */ var _dom_observer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/observer */ "./src/structs/dom/observer.js");
/* harmony import */ var _listenable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listenable */ "./src/structs/listenable.js");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plugin */ "./src/structs/plugin.js");








/***/ }),

/***/ "./src/ui/colorpicker.js":
/*!*******************************!*\
  !*** ./src/ui/colorpicker.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorPicker)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");


const React = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.React;

const Popout = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByDisplayName("Popout");
const ColorPickerComponents = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("CustomColorPicker");
const Swatch = ColorPickerComponents?.CustomColorButton.prototype.render.call({props: {}}).type;
const {default: Tooltip, TooltipPositions} = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("TooltipContainer");
const LocaleManager = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.LocaleManager;

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || 0
        };

        this.onChange = this.onChange.bind(this);
        this.swatchRef = React.createRef();
    }
    
    get canCustom() {return this.props.acceptsCustom || true;}

    onChange(value) {
        this.setState({value: value}, () => {
            if (typeof(this.props.onChange) === "function") this.props.onChange(this.state.value); 
        });
    }

    render() {
        const renderPopout = () => {
            return React.createElement(ColorPickerComponents.CustomColorPicker, {
                value: this.state.value,
                onChange: this.onChange,
            });
        };

        return React.createElement(ColorPickerComponents.default, {
            value: this.state.value,
            onChange: this.onChange,
            colors: this.props.colors,
            renderDefaultButton: props => React.createElement(Tooltip, {
                position: TooltipPositions.BOTTOM,
                text: LocaleManager.Messages.DEFAULT
            }, tooltipProps => React.createElement("div", Object.assign(tooltipProps, {
                className: "defaultButtonWrapper",
            }), React.createElement(ColorPickerComponents.DefaultColorButton, Object.assign(props, {color: this.props.defaultColor})))),
            renderCustomButton: () => React.createElement(Popout, {
                renderPopout: renderPopout,
                animation: Popout.Animation.TRANSLATE,
                align: Popout.Align.CENTER,
                position: Popout.Positions.BOTTOM
            }, props => React.createElement(Tooltip, {
                position: TooltipPositions.BOTTOM,
                text: LocaleManager.Messages.PICK_A_COLOR
            }, tooltipProps => React.createElement("div", Object.assign({}, tooltipProps, props, {
                className: "colorPickerButtonWrapper"
            }), React.createElement(Swatch, {
                isCustom: true,
                color: this.state.value,
                isSelected: !this.props.colors.includes(this.state.value) && this.props.defaultColor !== this.state.value,
                disabled: !this.canCustom
            }))))
        });
    }
}

/***/ }),

/***/ "./src/ui/discordcontextmenu.js":
/*!**************************************!*\
  !*** ./src/ui/discordcontextmenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DiscordContextMenu)
/* harmony export */ });
/* harmony import */ var _modules_discordmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/discordmodules */ "./src/modules/discordmodules.js");
/* harmony import */ var _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/webpackmodules */ "./src/modules/webpackmodules.js");
/* harmony import */ var _modules_reacttools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/reacttools */ "./src/modules/reacttools.js");
/* harmony import */ var _modules_patcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/patcher */ "./src/modules/patcher.js");
/* harmony import */ var _modules_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/utilities */ "./src/modules/utilities.js");
/* harmony import */ var _modules_discordclasses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/discordclasses */ "./src/modules/discordclasses.js");
/* harmony import */ var _modules_domtools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/domtools */ "./src/modules/domtools.js");








// d = e.label,
// f = e.icon,
// h = e.imageUrl,
// v = e.hint,
// m = e.subtext,
// g = e.hasSubmenu,
// y = e.disabled,
// E = e.isFocused,
// S = e.menuItemProps,
// T = e.action,
// b = e.onClose,


const React = _modules_discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"].React;
const ContextMenuActions = _modules_discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"].ContextMenuActions;

const ce = React.createElement;
const ContextMenu = _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getByProps("MenuRadioItem", "MenuItem");

/**
 * Fires when the item is clicked.
 * @param {MouseEvent} event - The event generated on click
 * @callback module:DiscordContextMenu~MenuItemOnClick
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuItem
 * @description
 * This is the generic context menu item component. It is very extensible and will adapt
 * it's type depending on the props.
 * 
 * Note: The item ID should be unique to this item across the entire menu. If no `id` is 
 * provided, the system will use the `label`. Plugins should ensure there are no `label`
 * conflicts if they do not wish to provide `id`. `label` conflicts (when not using
 * unique `id`s) can cause multiple items to be hovered at once.
 * 
 * @param {object} props - props to pass to the react renderer
 * @param {string} props.label - label to show on the menu item
 * @param {string} [props.id] - specific id used for this item
 * @param {string} [props.hint] - hint to show on the right hand side (usually keyboard combo)
 * @param {string} [props.subtext] - description to show underneath
 * @param {string} [props.image] - link to image to show on the side
 * @param {function} [props.icon] - react component to render on the side
 * @param {function} [props.render] - render function for custom rendering the menu item
 * @param {module:DiscordContextMenu~MenuItemOnClick} [props.action] - function to perform on click
 * @param {module:DiscordContextMenu~MenuItemOnClick} [props.onClick] - function to perform on click (alias of `action`)
 * @param {function} [props.onClose] - function to run when this is closed
 * @param {boolean} [props.danger=false] - should the item show as danger (red)
 * @param {boolean} [props.disabled=false] - should the item be disabled/unclickable
 * 
 * @param {object} [props.style] - allows you to add custom styles
 * @param {boolean} [props.closeOnClick] - allows you to prevent closing on click
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuToggleItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating checkboxes in menus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * 
 * @param {boolean} [props.checked=false] - should the checkbox be checked
 * @param {boolean} [props.active=false] - alias of `checked`
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuRadioItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating radio selections in menus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * Note: for the `forceUpdate` option... Without this enabled, you will manually need to 
 * manage the state for the functional component. If you do not the toggle will appear
 * to not update. @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 * 
 * @param {boolean} [props.checked=false] - should the checkbox be checked
 * @param {boolean} [props.active=false] - alias of `checked`
 * @param {boolean} [props.forceUpdate=true] - should the menu be force-updated after click
 */

/**
 * @interface
 * @name module:DiscordContextMenu~SubMenuItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating nested submenus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * @param {Array<object>} [props.render] - array of items to render in the submenu
 * @param {Array<object>} [props.items] - alias of `render`
 * @param {Array<object>} [props.children] - Already rendered elements
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuControlItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for adding custom controls like sliders to the context menu.
 * Properties shown here are additional to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * @param {function} [props.control] - control function that renders the component
 */


/**
 * A utility for building and rendering Discord's own menus.
 * @module DiscordContextMenu
 */
class DiscordContextMenu {

    /**
     * Builds a single menu item. The only prop shown here is the type, the rest should
     * match the actual component being built. View those to see what options exist
     * for each, they often have less in common than you might think. See {@link module:DiscordContextMenu.MenuItem}
     * for the majority of props commonly available. Check the documentation for the
     * rest of the components.
     * 
     * @param {object} props - props used to build the item
     * @param {string} [props.type="text"] - type of the item, options: text, submenu, toggle, radio, custom, separator
     * @returns {object} the created component
     * 
     * @see {@link module:DiscordContextMenu~MenuItem}
     * @see {@link module:DiscordContextMenu~MenuToggleItem}
     * @see {@link module:DiscordContextMenu~MenuRadioItem}
     * @see {@link module:DiscordContextMenu~SubMenuItem}
     * @see {@link module:DiscordContextMenu~MenuControlItem}
     * 
     * @example
     * // Creates a single menu item that prints "MENU ITEM" on click
     * DiscordContextMenu.buildMenuItem({
     *      label: "Menu Item",
     *      action: () => {console.log("MENU ITEM");}
     * });
     * 
     * @example
     * // Creates a single toggle item that starts unchecked
     * // and print the new value on every toggle
     * DiscordContextMenu.buildMenuItem({
     *      type: "toggle",
     *      label: "Item Toggle",
     *      checked: false,
     *      action: (newValue) => {console.log(newValue);}
     * });
     */
    static buildMenuItem(props) {
        const {type} = props;
        if (type === "separator") return ce(ContextMenu.MenuSeparator);

        let Component = ContextMenu.MenuItem;
        if (type === "submenu") {
            if (!props.children) props.children = this.buildMenuChildren(props.render || props.items);
        }
        else if (type === "toggle" || type === "radio") {
            Component = type === "toggle" ? ContextMenu.MenuCheckboxItem : ContextMenu.MenuRadioItem;
            if (props.active) props.checked = props.active;
        }
        else if (type === "control") {
            Component = ContextMenu.MenuControlItem;
        }
        if (!props.id) props.id = `${_modules_domtools__WEBPACK_IMPORTED_MODULE_6__["default"].escapeID(props.label)}`;
        if (props.danger) props.color = "colorDanger";
        if (props.onClick && !props.action) props.action = props.onClick;
        props.extended = true;
        return ce(Component, props);
    }

    /**
     * Creates the all the items **and groups** of a context menu recursively.
     * There is no hard limit to the number of groups within groups or number
     * of items in a menu.
     * @param {Array<object>} setup - array of item props used to build items. See {@link module:DiscordContextMenu.buildMenuItem}
     * @returns {Array<object>} array of the created component
     * 
     * @example
     * // Creates a single item group item with a toggle item
     * DiscordContextMenu.buildMenuChildren([{
     *      type: "group",
     *      items: [{
     *          type: "toggle",
     *          label: "Item Toggle",
     *          active: false,
     *          action: (newValue) => {console.log(newValue);}
     *      }]
     * }]);
     * 
     * @example
     * // Creates two item groups with a single toggle item each
     * DiscordContextMenu.buildMenuChildren([{
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }, {
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }]);
     */
    static buildMenuChildren(setup) {
        const mapper = s => {
            if (s.type === "group") return buildGroup(s);
            return this.buildMenuItem(s);
        };
        const buildGroup = function(group) {
            const items = group.items.map(mapper).filter(i => i);
            return ce(ContextMenu.MenuGroup, null, items);
        };
        return setup.map(mapper).filter(i => i);
    }

    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.
     * Calls {@link module:DiscordContextMenu.buildMenuChildren} under the covers.
     * Used to call in combination with {@link module:DiscordContextMenu.openContextMenu}.
     * @param {Array<object>} setup - array of item props used to build items. See {@link module:DiscordContextMenu.buildMenuChildren}
     * @returns {function} the unique context menu component
     */
    static buildMenu(setup) {
        return (props) => {return ce(ContextMenu.default, props, this.buildMenuChildren(setup));};
    }

    /**
     * 
     * @param {MouseEvent} event - The context menu event. This can be emulated, requires target, and all X, Y locations.
     * @param {function} menuComponent - Component to render. This can be any react component or output of {@link module:DiscordContextMenu.buildMenu}
     * @param {object} config - configuration/props for the context menu
     * @param {string} [config.position="right"] - default position for the menu, options: "left", "right"
     * @param {string} [config.align="top"] - default alignment for the menu, options: "bottom", "top"
     * @param {function} [config.onClose] - function to run when the menu is closed
     * @param {boolean} [config.noBlurEvent=false] - No clue
     */
    static openContextMenu(event, menuComponent, config) {
        return ContextMenuActions.openContextMenu(event, function(e) {
            return ce(menuComponent, Object.assign({}, e, {onClose: ContextMenuActions.closeContextMenu}));
        }, config);
    }

    /**
     * Attempts to find and return a specific context menu type's module. Useful
     * when patching the render of these menus.
     * @param {string | Function} nameOrFilter - name of the context menu type
     * @returns {Promise<object>} the webpack module the menu was found in
     */
    static getDiscordMenu(nameOrFilter) {
        if (typeof(nameOrFilter) !== "function") {
            const displayName = nameOrFilter;
            nameOrFilter = (m) => m && m.displayName === displayName;
        }

        const directMatch = _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.default && nameOrFilter(m.default));
        if (directMatch) return Promise.resolve(directMatch);

        return new Promise(resolve => {
            const cancel = _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].addListener(module => {
                if (!module.default || !nameOrFilter(module.default)) return;
                resolve(module);
                cancel();
            });
        });
    }

    /**
     * Calls `forceUpdate()` on all context menus it can find. Useful for
     * after patching a menu.
     */
    static forceUpdateMenus() {
        const menus = document.querySelectorAll(`.${_modules_discordclasses__WEBPACK_IMPORTED_MODULE_5__["default"].ContextMenu.menu.first}`);
        for (const menu of menus) {
            const stateNode = _modules_utilities__WEBPACK_IMPORTED_MODULE_4__["default"].findInTree(_modules_reacttools__WEBPACK_IMPORTED_MODULE_2__["default"].getReactInstance(menu), m=>m && m.forceUpdate && m.updatePosition, {walkable: ["return", "stateNode"]});
            if (!stateNode) continue;
            stateNode.forceUpdate();
            stateNode.updatePosition();
        }
    }

    static initialize() {
        _modules_patcher__WEBPACK_IMPORTED_MODULE_3__["default"].unpatchAll("DCM");
        this.patchMenuItem();
        this.patchToggleItem();
    }

    static patchMenuItem() {
        const MenuItem = _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.default && m.default.displayName == "MenuItem");
        if (!MenuItem || !MenuItem.default) return;
        _modules_patcher__WEBPACK_IMPORTED_MODULE_3__["default"].after("DCM", MenuItem, "default", (_, args, ret) => {
            if (!args || !args[0] || !args[0].extended) return;
            const [props] = args;
            if (props.style) ret.props.style = props.style;
            if (props.closeOnClick !== false || !props.action) return;
            ret.props.onClick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                return props.action(...arguments);
            };
        });
    }

    static patchToggleItem() {
        const MenuToggleItem = _modules_webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => m.default && m.default.displayName == "MenuCheckboxItem");
        if (!MenuToggleItem || !MenuToggleItem.default) return;
        _modules_patcher__WEBPACK_IMPORTED_MODULE_3__["default"].before("DCM", MenuToggleItem, "default", (_, args) => {
            if (!args || !args[0] || !args[0].extended) return;
            const [props] = args;
            const [active, doToggle] = React.useState(props.checked || false);
            props.checked = active;
            const originalAction = props.action;
            props.action = function(ev) {
                originalAction(ev);
                doToggle(!active);
            };
        });
    }
}

/***/ }),

/***/ "./src/ui/errorboundary.js":
/*!*********************************!*\
  !*** ./src/ui/errorboundary.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorBoundary),
/* harmony export */   "WrapBoundary": () => (/* binding */ WrapBoundary)
/* harmony export */ });
/* harmony import */ var _modules_discordmodules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/discordmodules */ "./src/modules/discordmodules.js");


const React = _modules_discordmodules__WEBPACK_IMPORTED_MODULE_0__["default"].React;
const ce = React.createElement;

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hasError: false};
    }
  
    componentDidCatch() {
      this.setState({hasError: true});
    }
  
    render() {
      if (this.state.hasError) return this.props.errorChildren ? this.props.errorChildren : ce("div", {className: "error"}, "Component Error");  
      return this.props.children; 
    }
}

function WrapBoundary(Original) {
  return class ErrorBoundaryWrapper extends React.Component {
      render() {
          return ce(ErrorBoundary, null, ce(Original, this.props));
      }
  };
}

/***/ }),

/***/ "./src/ui/icons.js":
/*!*************************!*\
  !*** ./src/ui/icons.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconError": () => (/* reexport safe */ _icons_error__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "IconInfo": () => (/* reexport safe */ _icons_info__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "IconSuccess": () => (/* reexport safe */ _icons_success__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "IconWarning": () => (/* reexport safe */ _icons_warning__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _icons_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/error */ "./src/ui/icons/error.js");
/* harmony import */ var _icons_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/info */ "./src/ui/icons/info.js");
/* harmony import */ var _icons_success__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/success */ "./src/ui/icons/success.js");
/* harmony import */ var _icons_warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/warning */ "./src/ui/icons/warning.js");





/***/ }),

/***/ "./src/ui/icons/error.js":
/*!*******************************!*\
  !*** ./src/ui/icons/error.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Error Icon
 * @param {number} size - Size of the icon.
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(size) {
    return `<svg width="${size || 24}" height="${size || 24}" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>`;
}

/***/ }),

/***/ "./src/ui/icons/info.js":
/*!******************************!*\
  !*** ./src/ui/icons/info.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Info Icon
 * @param {number} size - Size of the icon.
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(size) {
    return `<svg width="${size || 24}" height="${size || 24}" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>`;
}

/***/ }),

/***/ "./src/ui/icons/success.js":
/*!*********************************!*\
  !*** ./src/ui/icons/success.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Success Icon
 * @param {number} size - Size of the icon.
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(size) {
    return `<svg width="${size || 24}" height="${size || 24}" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>`;
}

/***/ }),

/***/ "./src/ui/icons/warning.js":
/*!*********************************!*\
  !*** ./src/ui/icons/warning.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Warning Icon
 * @param {number} size - Size of the icon.
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(size) {
    return `<svg width="${size || 24}" height="${size || 24}" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>`;
}

/***/ }),

/***/ "./src/ui/modals.js":
/*!**************************!*\
  !*** ./src/ui/modals.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modals)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/**
 * Allows an easy way to create and show modals.
 * @module Modals
 */



const React = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.React;
const ce = React.createElement;
const Markdown = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getModule(m => m.displayName == "Markdown" && m.rules);

class Modals {

    /** Sizes of modals. */
    static get ModalSizes() {return {};}

    /**
     * Shows the user profile modal for a given user.
     * @param {string} userId - id of the user to show profile for
     */
    static showUserProfile(userId) {
        return modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.UserProfileModal.open(userId);
    }

    /**
     * Acts as a wrapper for {@link module:Modals.showModal} where the `children` is a text element.
     * @param {string} title - title of the modal
     * @param {string} content - text to show inside the modal. Can be markdown.
     * @param {object} [options] - see {@link module:Modals.showModal}
     * @see module:Modals.showModal
     */
    static showConfirmationModal(title, content, options = {}) {
        this.showModal(title, ce(Markdown, null, content), options);
    }

    /**
     * Shows a very simple alert modal that has title, content and an okay button.
     * @param {string} title - title of the modal
     * @param {string} body - text to show inside the modal
     */
    static showAlertModal(title, body) {
        this.showConfirmationModal(title, body, {cancelText: null});
    }

    /**
     * Shows a generic but very customizable modal.
     * @param {string} title - title of the modal
     * @param {(ReactElement|Array<ReactElement>)} children - a single or array of rendered react elements to act as children
     * @param {object} [options] - options to modify the modal
     * @param {boolean} [options.danger=false] - whether the main button should be red or not
     * @param {string} [options.confirmText=Okay] - text for the confirmation/submit button
     * @param {string} [options.cancelText=Cancel] - text for the cancel button
     * @param {callable} [options.onConfirm=NOOP] - callback to occur when clicking the submit button
     * @param {callable} [options.onCancel=NOOP] - callback to occur when clicking the cancel button
     */
    static showModal(title, children, options = {}) {
        const {danger = false, confirmText = "Okay", cancelText = "Cancel", onConfirm = () => {}, onCancel = () => {}} = options;
        return modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.ModalActions.openModal(props => {
            return React.createElement(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.ConfirmationModal, Object.assign({
                header: title,
                confirmButtonColor: danger ? modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.ButtonData.ButtonColors.RED : modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.ButtonData.ButtonColors.BRAND,
                confirmText: confirmText,
                cancelText: cancelText,
                onConfirm: onConfirm,
                onCancel: onCancel
            }, props), children);
        });
    }

    /**
     * @interface
     * @name module:Modals~Changelog
     * @property {string} title - title of the changelog section
     * @property {string} [type=added] - type information of the section. Options: added, improved, fixed, progress.
     * @property {Array<string>} items - itemized list of items to show in that section. Can use markdown.
     */

    /**
     * Shows a changelog modal based on changelog data.
     * @param {string} title - title of the modal
     * @param {string} version - subtitle (usually version or date) of the modal
     * @param {module:Modals~Changelog} changelog - changelog to show inside the modal
     * @param {string} footer - either an html element or text to show in the footer of the modal. Can use markdown.
     */
    static showChangelogModal(title, version, changelog, footer) {
        const TextElement = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.TextElement;
        const changelogItems = [];
        for (let c = 0; c < changelog.length; c++) {
            const entry = changelog[c];
            const type = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog[entry.type] ? modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog[entry.type] : modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog.added;
            const margin = c == 0 ? modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog.marginTop : "";
            changelogItems.push(ce("h1", {className: `${type} ${margin}`,}, entry.title));
            const list = ce("ul", null, entry.items.map(i => ce("li", null, ce(Markdown, null, i))));
            changelogItems.push(list);
        }
        const renderHeader = function() {
            return ce(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.FlexChild.Child, {grow: 1, shrink: 1},
                ce(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.Titles["default"], {tag: modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.Titles.Tags.H4}, title),
                ce(TextElement,
                    {size: TextElement.Sizes.SMALL, color: TextElement.Colors.PRIMARY, className: modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog.date.toString()},
                    "Version " + version
                )
            );
        };
        const renderFooter = footer ? function() {
            return ce(Markdown, null, footer);
        } : null;

        return modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.ModalActions.openModal(props => {
            return ce(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.Changelog, Object.assign({
                className: modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Changelog.container.toString(),
                selectable: true,
                onScroll: _ => _,
                onClose: _ => _,
                renderHeader: renderHeader,
                renderFooter: renderFooter,
            }, props), changelogItems);
        });
    }
}

/***/ }),

/***/ "./src/ui/popouts.js":
/*!***************************!*\
  !*** ./src/ui/popouts.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popouts)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/**
 * Allows an easy way to create and show popouts.
 * @module Popouts
 */



const {React, ReactDOM} = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules;
const {useReducer, useEffect, useRef} = React;
const AccessibilityProvider = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("AccessibilityPreferencesContext").AccessibilityPreferencesContext.Provider;
const Layers = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("AppReferencePositionLayer");
const PopoutCSSAnimator = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByDisplayName("PopoutCSSAnimator");
const LayerProvider = Layers.AppLayerProvider().props.layerContext.Provider; // eslint-disable-line new-cap
const LayerModule = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("LayerClassName");
const {ComponentDispatch} = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("ComponentDispatch");
const {ComponentActions} = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("ComponentActions");
const AnalyticsTrackContext = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.find(m => m._currentValue && m._currentValue.toString && m._currentValue.toString().includes("AnalyticsTrackImpressionContext function unimplemented"));
const AnalyticsTracker = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.find(m => m.toString && m.toString().includes("setDebugTrackedData"));
const Popout = modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByDisplayName("Popout");

const createStore = state => {
    const listeners = new Set();

    const setState = function (getter = _ => _) {
        const partial = getter(state);
        if (partial === state) return;

        state = partial;
        
        [...listeners].forEach(e => e());
    };

    setState.getState = () => state;

    function storeListener(getter = _ => _) {
        const [, forceUpdate] = useReducer(n => !n, true);

        useEffect(() => {
            const dispatch = () => {forceUpdate();};

            listeners.add(dispatch);

            return () => {listeners.delete(dispatch);};
        });

        return getter(state);
    }

    return [
        setState,
        storeListener
    ];
};

const [setPopouts, usePopouts] = createStore([]);

const AnimationTypes = {FADE: 3, SCALE: 2, TRANSLATE: 1};

class Popouts {

    static get AnimationTypes() {return AnimationTypes;}

    static initialize() {
        this.dispose();
        this.popouts = 0;

        this.container = Object.assign(document.createElement("div"), {
            className: "ZeresPluginLibraryPopoutsRenderer",
            style: "display: none;"
        });
    
        this.layerContainer = Object.assign(document.createElement("div"), {
            id: "ZeresPluginLibraryPopouts",
            className: LayerModule.LayerClassName
        });

        document.body.append(this.container, this.layerContainer);
        ReactDOM.render(React.createElement(PopoutsContainer), this.container);

        modules__WEBPACK_IMPORTED_MODULE_0__.Patcher.before("Popouts", LayerModule, "getParentLayerContainer", (_, [element]) => {
            if (element.parentElement === this.layerContainer) return this.layerContainer;
        });
    }

    /**
     * Shows the user popout for a user relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} user - Discord User object for the user to show
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.guild="currentGuildId"] - Id of the guild  (uses current if not specified)
     * @param {string} [options.channel="currentChannelId"] - Id of the channel (uses current if not specified)
     * @param {string} [options.position="right"] - Positioning relative to element
     * @param {string} [options.align="top"] - Positioning relative to element
     */
    static showUserPopout(target, user, options = {}) {
        const {position = "right", align = "top", guild = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.SelectedGuildStore.getGuildId(), channel = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.SelectedChannelStore.getChannelId()} = options;
        target = modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.resolveElement(target);
        // if (target.getBoundingClientRect().right + 250 >= DOMTools.screenWidth && options.autoInvert) position = "left";
        // if (target.getBoundingClientRect().bottom + 400 >= DOMTools.screenHeight && options.autoInvert) align = "bottom";
        // if (target.getBoundingClientRect().top - 400 >= DOMTools.screenHeight && options.autoInvert) align = "top";
        this.openPopout(target, {
            position: position,
            align: align,
            animation: options.animation || Popouts.AnimationTypes.TRANSLATE,
            autoInvert: options.autoInvert,
            nudgeAlignIntoViewport: options.nudgeAlignIntoViewport,
            spacing: options.spacing,
            render: (props) => {
                return modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.React.createElement(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordModules.UserPopout, Object.assign({}, props, {
                    userId: user.id,
                    guildId: guild,
                    channelId: channel
                }));
            }
        });
    }

    /**
     * Shows a react popout relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.position="right"] - General position relative to element
     * @param {string} [options.align="top"] - Alignment relative to element
     * @param {Popouts.AnimationTypes} [options.animation=Popouts.AnimationTypes.TRANSLATE] - Animation type to use
     * @param {boolean} [options.autoInvert=true] - Try to automatically adjust the position if it overflows the screen
     * @param {boolean} [options.nudgeAlignIntoViewport=true] - Try to automatically adjust the alignment if it overflows the screen
     * @param {number} [options.spacing=8] - Spacing between target and popout
     */
    static openPopout(target, options) {
        const id = this.popouts++;

        setPopouts(popouts => popouts.concat({
            id: id,
            element: React.createElement(PopoutWrapper, Object.assign({}, Popout.defaultProps, {
                reference: {current: target},
                popoutId: id,
                key: "popout_" + id,
                spacing: 50
            }, options))
        }));

        return id;
    }

    static closePopout(id) {
        const popout = setPopouts.getState().find(e => e.id === id);

        if (!popout) return null;

        setPopouts(popouts => {
            const clone = [...popouts];
            clone.splice(clone.indexOf(popout), 1);
            return clone;
        });
    }

    static dispose() {
        modules__WEBPACK_IMPORTED_MODULE_0__.Patcher.unpatchAll("Popouts");
        const container = document.querySelector(".ZeresPluginLibraryPopoutsRenderer");
        const layerContainer = document.querySelector("#ZeresPluginLibraryPopouts");
        if (container) ReactDOM.unmountComponentAtNode(container);
        if (container) container.remove();
        if (layerContainer) layerContainer.remove();
    }
}

function DiscordProviders({children, container}) {
    return React.createElement(AccessibilityProvider, {
        value: {
            reducedMotion: {enabled: false, rawValue: "auto"}
        }
    }, React.createElement(LayerProvider, {
        value: [container]
    }, React.createElement(AnalyticsTrackContext.Provider, {
        value: AnalyticsTracker
    }, children)));
}

function PopoutsContainer() {
    const popouts = usePopouts();

    return React.createElement(DiscordProviders,
        {container: Popouts.layerContainer},
        popouts.map((popout) => popout.element)
    );
}

function PopoutWrapper({render, animation, popoutId, ...props}) {
    const popoutRef = useRef();

    useEffect(() => {
        if (!popoutRef.current) return;

        const node = ReactDOM.findDOMNode(popoutRef.current);

        const handleClick = ({target}) => {
            if (target === node || node.contains(target)) return;

            Popouts.closePopout(popoutId);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [popoutRef]);

    switch (animation) {
        case PopoutCSSAnimator.Types.FADE:
        case PopoutCSSAnimator.Types.SCALE:
        case PopoutCSSAnimator.Types.TRANSLATE: {
            const renderPopout = render;
            render = (renderProps) => {
                return React.createElement(PopoutCSSAnimator, {
                    position: renderProps.position,
                    type: animation
                }, renderPopout(renderProps));
            };
        }
    }

    return React.createElement(Layers.AppReferencePositionLayer, Object.assign(props, {
        ref: popoutRef,
        positionKey: "0",
        autoInvert: true,
        id: "popout_" + popoutId,
        onMount() {
            ComponentDispatch.dispatch(ComponentActions.POPOUT_SHOW);
        },
        onUnmount() {
            ComponentDispatch.dispatch(ComponentActions.POPOUT_HIDE);
        },
        children: render
    }));
}




/***/ }),

/***/ "./src/ui/settings/index.js":
/*!**********************************!*\
  !*** ./src/ui/settings/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSS": () => (/* reexport safe */ _styles_settings_css__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "ReactSetting": () => (/* reexport safe */ _settingfield__WEBPACK_IMPORTED_MODULE_1__.ReactSetting),
/* harmony export */   "SettingField": () => (/* reexport safe */ _settingfield__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "SettingGroup": () => (/* reexport safe */ _settinggroup__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "SettingPanel": () => (/* reexport safe */ _settingpanel__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Textbox": () => (/* reexport safe */ _types_textbox__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "ColorPicker": () => (/* reexport safe */ _types_color__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "FilePicker": () => (/* reexport safe */ _types_file__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Slider": () => (/* reexport safe */ _types_slider__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Switch": () => (/* reexport safe */ _types_switch__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Dropdown": () => (/* reexport safe */ _types_dropdown__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "Keybind": () => (/* reexport safe */ _types_keybind__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "RadioGroup": () => (/* reexport safe */ _types_radiogroup__WEBPACK_IMPORTED_MODULE_11__["default"])
/* harmony export */ });
/* harmony import */ var _styles_settings_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/settings.css */ "./src/styles/settings.css");
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var _settinggroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settinggroup */ "./src/ui/settings/settinggroup.js");
/* harmony import */ var _settingpanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settingpanel */ "./src/ui/settings/settingpanel.js");
/* harmony import */ var _types_textbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types/textbox */ "./src/ui/settings/types/textbox.js");
/* harmony import */ var _types_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types/color */ "./src/ui/settings/types/color.js");
/* harmony import */ var _types_file__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types/file */ "./src/ui/settings/types/file.js");
/* harmony import */ var _types_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types/slider */ "./src/ui/settings/types/slider.js");
/* harmony import */ var _types_switch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./types/switch */ "./src/ui/settings/types/switch.js");
/* harmony import */ var _types_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./types/dropdown */ "./src/ui/settings/types/dropdown.js");
/* harmony import */ var _types_keybind__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types/keybind */ "./src/ui/settings/types/keybind.js");
/* harmony import */ var _types_radiogroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./types/radiogroup */ "./src/ui/settings/types/radiogroup.js");
/**
 * An object that makes generating settings panel 10x easier.
 * @module Settings
 */
















/***/ }),

/***/ "./src/ui/settings/settingfield.js":
/*!*****************************************!*\
  !*** ./src/ui/settings/settingfield.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ReactSetting": () => (/* binding */ ReactSetting)
/* harmony export */ });
/* harmony import */ var _structs_listenable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../structs/listenable */ "./src/structs/listenable.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



const AccessibilityProvider = modules__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps("AccessibilityPreferencesContext").AccessibilityPreferencesContext.Provider;
const LayerProvider = modules__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps("AppReferencePositionLayer").AppLayerProvider().props.layerContext.Provider; // eslint-disable-line new-cap

/** 
 * Setting field to extend to create new settings
 * @memberof module:Settings
 */
class SettingField extends _structs_listenable__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {callable} onChange - callback to perform on setting change
     * @param {(ReactComponent|HTMLElement)} settingtype - actual setting to render 
     * @param {object} [props] - object of props to give to the setting and the settingtype
     * @param {boolean} [props.noteOnTop=false] - determines if the note should be shown above the element or not.
     */
    constructor(name, note, onChange, settingtype, props = {}) {
        super();
        this.name = name;
        this.note = note;
        if (typeof(onChange) == "function") this.addListener(onChange);
        this.inputWrapper = modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.parseHTML(`<div class="plugin-input-container"></div>`);
        this.type = typeof(settingtype) == "function" ? settingtype : modules__WEBPACK_IMPORTED_MODULE_1__.ReactTools.wrapElement(settingtype);
        this.props = props;
        modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.onAdded(this.getElement(), () => {this.onAdded();});
        modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.onRemoved(this.getElement(), () => {this.onRemoved();});
    }

    /** @returns {HTMLElement} - root element for setting */
    getElement() {return this.inputWrapper;}

    /** Fires onchange to listeners */
    onChange() {
        this.alertListeners(...arguments);
    }

    /** Fired when root node added to DOM */
    onAdded() {
        const reactElement = modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.ReactDOM.render(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement(ReactSetting, Object.assign({
            title: this.name,
            type: this.type,
            note: this.note,
        }, this.props)), this.getElement());

        if (this.props.onChange) reactElement.props.onChange = this.props.onChange(reactElement);
        reactElement.forceUpdate();
    }

    /** Fired when root node removed from DOM */
    onRemoved() {
        modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.ReactDOM.unmountComponentAtNode(this.getElement());
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingField);

class ReactSetting extends modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.Component {
    get noteElement() {
        const className = this.props.noteOnTop ? modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Margins.marginBottom8 : modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Margins.marginTop8;
        return modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.SettingsNote, {children: this.props.note, type: "description", className: className.toString()});
    }

    get dividerElement() {return modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement("div", {className: modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Dividers.divider.add(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Dividers.dividerDefault).toString()});}

    render() {
        const ce = modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement;
        const SettingElement = ce(this.props.type, this.props);
        const Context = ce(AccessibilityProvider, {value: {reducedMotion: {enabled: false, rawValue: "no-preference"}}}, ce(LayerProvider, {value: [document.querySelector("#app-mount > .layerContainer-2v_Sit")]}, SettingElement));
        if (this.props.inline) {
            const Flex = modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.FlexChild;
            const titleDefault = modules__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps("titleDefault") ? modules__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps("titleDefault").title : "titleDefault-a8-ZSr title-31JmR4 da-titleDefault da-title";
            return ce(Flex, {direction: Flex.Direction.VERTICAL},
            ce(Flex, {align: Flex.Align.START}, 
                ce(Flex.Child, {wrap: !0},
                    ce("div", {className: titleDefault}, this.props.title)
                ),
                ce(Flex.Child, {grow: 0, shrink: 0}, Context)
            ),
            this.noteElement,
            this.dividerElement
            );
        }
        
        return ce(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.SettingsWrapper, {
            className: modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Margins.marginBottom20.toString(),
            title: this.props.title,
            children: [
                this.props.noteOnTop ? this.noteElement : Context,
                this.props.noteOnTop ? Context : this.noteElement,
                this.dividerElement
            ]
        });
    }
}



/***/ }),

/***/ "./src/ui/settings/settinggroup.js":
/*!*****************************************!*\
  !*** ./src/ui/settings/settinggroup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_listenable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../structs/listenable */ "./src/structs/listenable.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingfield */ "./src/ui/settings/settingfield.js");




/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 */
class SettingGroup extends _structs_listenable__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} groupName - title for the group of settings
     * @param {object} [options] - additional options for the group
     * @param {callback} [options.callback] - callback called on settings changed
     * @param {boolean} [options.collapsible=true] - determines if the group should be collapsible
     * @param {boolean} [options.shown=false] - determines if the group should be expanded by default
     */
    constructor(groupName, options = {}) {
        super();
        const {collapsible = true, shown = false, callback = () => {}} = options;
        this.addListener(callback);
        this.onChange = this.onChange.bind(this);

        const collapsed = shown || !collapsible ? "" : "collapsed";
        const group = modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.parseHTML(`<div class="plugin-input-group">
                                            <h2 class="${modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Titles.h5} ${modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Titles.defaultMarginh5} ${modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.Titles.defaultColor}">
                                            <span class="button-collapse ${collapsed}"></span> ${groupName}
                                            </h2>
                                            <div class="plugin-inputs collapsible ${collapsed}"></div>
                                            </div>`);
        const label = group.querySelector("h2");
        const controls = group.querySelector(".plugin-inputs");

        this.group = group;
        this.label = label;
        this.controls = controls;

        if (!collapsible) return;
        label.addEventListener("click", async () => {
            const button = label.querySelector(".button-collapse");
            const wasCollapsed = button.classList.contains("collapsed");
            group.parentElement.querySelectorAll(":scope > .plugin-input-group > .collapsible:not(.collapsed)").forEach((element) => {
                element.style.setProperty("height", element.scrollHeight + "px");
                element.classList.add("collapsed");
                setImmediate(() => {element.style.setProperty("height", "");});
            });
            group.parentElement.querySelectorAll(":scope > .plugin-input-group > h2 > .button-collapse").forEach(e => e.classList.add("collapsed"));
            if (!wasCollapsed) return;
            controls.style.setProperty("height", controls.scrollHeight + "px");
            controls.classList.remove("collapsed");
            button.classList.remove("collapsed");
            await new Promise(resolve => setTimeout(resolve, 300));
            controls.style.setProperty("height", "");
        });
    }
    
    /** @returns {HTMLElement} - root node for the group. */
    getElement() {return this.group;}
    
    /**
     * Adds multiple nodes to this group.
     * @param {(...HTMLElement|...jQuery|...module:Settings.SettingField|...module:Settings.SettingGroup)} nodes - list of nodes to add to the group container 
     * @returns {module:Settings.SettingGroup} - returns self for chaining
     */
    append(...nodes) {
        for (let i = 0; i < nodes.length; i++) {
            if (modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.resolveElement(nodes[i]) instanceof Element) this.controls.append(nodes[i]);
            else if (nodes[i] instanceof _settingfield__WEBPACK_IMPORTED_MODULE_2__["default"] || nodes[i] instanceof SettingGroup) this.controls.append(nodes[i].getElement());
            if (nodes[i] instanceof _settingfield__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                nodes[i].addListener(((node) => (value) => {
                    this.onChange(node.id || node.name, value);
                })(nodes[i]));
            }
            else if (nodes[i] instanceof SettingGroup) {
                nodes[i].addListener(((node) => (settingId, value) => {
                    this.onChange(node.id || node.name, settingId, value);
                })(nodes[i]));
            }
        }
        return this;
    }
    
    /**
     * Appends this node to another
     * @param {HTMLElement} node - node to attach the group to.
     * @returns {module:Settings.SettingGroup} - returns self for chaining
     */
    appendTo(node) {
        node.append(this.group);
        return this;
    }

    /** Fires onchange to listeners */
    onChange() {
        this.alertListeners(...arguments);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingGroup);

/***/ }),

/***/ "./src/ui/settings/settingpanel.js":
/*!*****************************************!*\
  !*** ./src/ui/settings/settingpanel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_listenable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../structs/listenable */ "./src/structs/listenable.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var _settinggroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settinggroup */ "./src/ui/settings/settinggroup.js");





/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 */
class SettingPanel extends _structs_listenable__WEBPACK_IMPORTED_MODULE_0__["default"] {

    /**
     * Creates a new settings panel
     * @param {callable} onChange - callback to fire when settings change
     * @param {(...HTMLElement|...jQuery|...module:Settings.SettingField|...module:Settings.SettingGroup)} nodes  - list of nodes to add to the panel container 
     */
    constructor(onChange, ...nodes) {
        super();
        this.element = modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.parseHTML(`<div class="plugin-form-container"></div>`);
        if (typeof(onChange) == "function") this.addListener(onChange);
        this.onChange = this.onChange.bind(this);
        this.append(...nodes);
    }
    
    /**
     * Creates a new settings panel
     * @param {callable} onChange - callback to fire when settings change
     * @param {(...HTMLElement|...jQuery|...module:Settings.SettingField|...module:Settings.SettingGroup)} nodes  - list of nodes to add to the panel container 
     * @returns {HTMLElement} - root node for the panel.
     */
    static build(onChange, ...nodes) {
        return (new SettingPanel(onChange, ...nodes)).getElement();
    }
    
    /** @returns {HTMLElement} - root node for the panel. */
    getElement() {return this.element;}

    /**
     * Adds multiple nodes to this panel.
     * @param {(...HTMLElement|...jQuery|...SettingField|...SettingGroup)} nodes - list of nodes to add to the panel container 
     * @returns {module:Settings.SettingPanel} - returns self for chaining
     */
    append(...nodes) {
        for (let i = 0; i < nodes.length; i++) {
            if (modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.resolveElement(nodes[i]) instanceof Element) this.element.append(nodes[i]);
            else if (nodes[i] instanceof _settingfield__WEBPACK_IMPORTED_MODULE_2__["default"] || nodes[i] instanceof _settinggroup__WEBPACK_IMPORTED_MODULE_3__["default"]) this.element.append(nodes[i].getElement());
            if (nodes[i] instanceof _settingfield__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                nodes[i].addListener(((node) => (value) => {
                    this.onChange(node.id || node.name, value);
                })(nodes[i]));
            }
            else if (nodes[i] instanceof _settinggroup__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                nodes[i].addListener(((node) => (settingId, value) => {
                    this.onChange(node.id || node.name, settingId, value);
                })(nodes[i]));
            }
        }
        return this;
    }

    /** Fires onchange to listeners */
    onChange() {
        this.alertListeners(...arguments);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingPanel);

/***/ }),

/***/ "./src/ui/settings/types/color.js":
/*!****************************************!*\
  !*** ./src/ui/settings/types/color.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/* harmony import */ var _colorpicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../colorpicker */ "./src/ui/colorpicker.js");






const presetColors = [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];

/** 
 * Creates a color picker using Discord's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class ColorPicker extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {string} value - current hex color
     * @param {callable} onChange - callback to perform on setting change, callback receives hex string
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     * @param {string} [options.defaultColor] - default color to show as large option
     * @param {Array<number>} [options.colors] - preset colors to show in swatch
     */
    constructor(name, note, value, onChange, options = {}) {
        const ColorPickerComponents = modules__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps("CustomColorPicker");
        if (ColorPickerComponents) {
            const defaultColor = options.defaultColor;
            super(name, note, onChange, _colorpicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
                disabled: !!options.disabled,
                onChange: reactElement => color => {
                    reactElement.props.value = color;
                    reactElement.forceUpdate();
                    this.onChange(modules__WEBPACK_IMPORTED_MODULE_1__.ColorConverter.int2hex(color));
                },
                colors: Array.isArray(options.colors) ? options.colors : presetColors,
                defaultColor: defaultColor && typeof(defaultColor) !== "number" ? modules__WEBPACK_IMPORTED_MODULE_1__.ColorConverter.hex2int(defaultColor) : defaultColor,
                value: typeof(value) == "number" ? value : modules__WEBPACK_IMPORTED_MODULE_1__.ColorConverter.hex2int(value),
                customPickerPosition: "right"
            });
        }
        else {
            const classes = ["color-input"];
            if (options.disabled) classes.push(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.BasicInputs.disabled);
            const ReactColorPicker = modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.parseHTML(`<input type="color" class="${classes.join(" ")}">`);
            if (options.disabled) ReactColorPicker.setAttribute("disabled", "");
            if (value) ReactColorPicker.setAttribute("value", value);
            ReactColorPicker.addEventListener("change", (event) => {
                this.onChange(event.target.value);
            });
            super(name, note, onChange, ReactColorPicker, {inline: true});
        }
    }

    /** Default colors for ColorPicker */
    static get presetColors() {return presetColors;}
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPicker);

/***/ }),

/***/ "./src/ui/settings/types/dropdown.js":
/*!*******************************************!*\
  !*** ./src/ui/settings/types/dropdown.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/**
 * @interface
 * @name module:Settings~DropdownItem
 * @property {string} label - label to show in the dropdown
 * @property {*} value - actual value represented by label (this is passed via onChange)
 */

/** 
 * Creates a dropdown using discord's built in dropdown.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Dropdown extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {*} defaultValue - currently selected value
     * @param {Array<module:Settings~DropdownItem>} values - array of all options available
     * @param {callable} onChange - callback to perform on setting change, callback item value
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.clearable=false] - should be able to empty the field value
     * @param {boolean} [options.searchable=false] - should user be able to search the dropdown
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, defaultValue, values, onChange, options = {}) {
        const {clearable = false, searchable = false, disabled = false} = options;
        super(name, note, onChange, modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.Dropdown, {
            clearable: clearable,
            searchable: searchable,
            disabled: disabled,
            options: values,
            onChange: dropdown => value => {
                dropdown.props.value = value;
                dropdown.forceUpdate();
                this.onChange(value);
            },
            value: defaultValue
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

/***/ }),

/***/ "./src/ui/settings/types/file.js":
/*!***************************************!*\
  !*** ./src/ui/settings/types/file.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/** 
 * Creates a file picker using chromium's default.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class FilePicker extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {callable} onChange - callback to perform on setting change, callback receives File object
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     * @param {Array<string>|string} [options.accept] - what file types should be accepted
     * @param {boolean} [options.multiple=false] - should multiple files be accepted
     */
    constructor(name, note, onChange, options = {}) {
        const classes = modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.BasicInputs.inputDefault.add("file-input");
        if (options.disabled) classes.add(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordClasses.BasicInputs.disabled);
        const ReactFilePicker = modules__WEBPACK_IMPORTED_MODULE_1__.DOMTools.parseHTML(`<input type="file" class="${classes}">`);
        if (options.disabled) ReactFilePicker.setAttribute("disabled", "");
        if (options.multiple) ReactFilePicker.setAttribute("multiple", "");
        if (options.accept) ReactFilePicker.setAttribute("accept", Array.isArray(options.accept) ? options.accept.join(",") : options.accept);
        ReactFilePicker.addEventListener("change", (event) => {
            this.onChange(event.target.files[0]);
        });
        super(name, note, onChange, ReactFilePicker);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilePicker);

/***/ }),

/***/ "./src/ui/settings/types/keybind.js":
/*!******************************************!*\
  !*** ./src/ui/settings/types/keybind.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/** 
 * Creates a keybind setting using discord's built in keybind recorder.
 * @memberof module:Settings=
 * @extends module:Settings.SettingField
 */
class Keybind extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {Array<number>} value - array of keycodes
     * @param {callable} onChange - callback to perform on setting change, callback receives array of keycodes
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */    
    constructor(label, help, value, onChange, options = {}) {
        const {disabled = false} = options;
        super(label, help, onChange, modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.Keybind, {
            disabled: disabled,
            defaultValue: value.map(a => [0, a || 0, 1]),
            onChange: element => val => {
                if (!Array.isArray(val)) return;
                element.props.value = val;
                this.onChange(val.map(a => a[1]));
            }
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keybind);

/***/ }),

/***/ "./src/ui/settings/types/radiogroup.js":
/*!*********************************************!*\
  !*** ./src/ui/settings/types/radiogroup.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/**
 * @interface
 * @name module:Settings~RadioItem
 * @property {string} name - label to show in the dropdown
 * @property {*} value - actual value represented by label (this is passed via onChange)
 * @property {string} desc - description/help text to show below name
 * @property {string} color - hex string to color the item
 */

/** 
 * Creates a radio group using discord's built in radios.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class RadioGroup extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {*} defaultValue - currently selected value
     * @param {Array<module:Settings~RadioItem>} values - array of all options available
     * @param {callable} onChange - callback to perform on setting change, callback item value
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, defaultValue, values, onChange, options = {}) {
        super(name, note, onChange, modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.RadioGroup, {
            noteOnTop: true,
            disabled: !!options.disabled,
            options: values,
            onChange: reactElement => option => {
                reactElement.props.value = option.value;
                reactElement.forceUpdate();
                this.onChange(option.value);
            },
            value: defaultValue
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioGroup);



/***/ }),

/***/ "./src/ui/settings/types/slider.js":
/*!*****************************************!*\
  !*** ./src/ui/settings/types/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/**
 * Used to render the marker.
 * @param {Number} value - The value to render
 * @returns {string} the text to show in the marker
 * @callback module:Settings~SliderMarkerValue
 */

/**
 * Used to render the grabber tooltip.
 * @param {Number} value - The value to render
 * @returns {string} the text to show in the tooltip
 * @callback module:Settings~SliderRenderValue
 */

/** 
 * Creates a slider/range using discord's built in slider.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Slider extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
   /**
    * 
    * @param {string} name - name label of the setting 
    * @param {string} note - help/note to show underneath or above the setting
    * @param {number} min - minimum value allowed
    * @param {number} max - maximum value allowed
    * @param {number} value - currently selected value
    * @param {callable} onChange - callback to fire when setting is changed, callback receives number
    * @param {object} [options] - object of options to give to the setting
    * @param {boolean} [options.disabled=false] - should the setting be disabled
    * @param {object} [options.fillStyles] - object of css styles to add to active slider
    * @param {number} [options.defaultValue] - value highlighted as default
    * @param {number} [options.keyboardStep] - step moved when using arrow keys
    * @param {Array<number>} [options.markers] - array of vertical markers to show on the slider
    * @param {boolean} [options.stickToMarkers] - should the slider be forced to use markers
    * @param {boolean} [options.equidistant] - should the markers be scaled to be equidistant
    * @param {module:Settings~SliderMarkerValue} [options.onMarkerRender] - function to call to render the value in the marker
    * @param {module:Settings~SliderMarkerValue} [options.renderMarker] - alias of `onMarkerRender`
    * @param {module:Settings~SliderRenderValue} [options.onValueRender] - function to call to render the value in the tooltip
    * @param {module:Settings~SliderRenderValue} [options.renderValue] - alias of `onValueRender`
    * @param {string} [options.units] - can be used in place of `onValueRender` will use this string and render Math.round(value) + units
    */
    constructor(name, note, min, max, value, onChange, options = {}) {
        const props = {
            onChange: _ => _,
            initialValue: value,
            disabled: !!options.disabled,
            minValue: min,
            maxValue: max,
            handleSize: 10
        };
        if (options.fillStyles) props.fillStyles = options.fillStyles;
        if (typeof(options.defaultValue) !== "undefined") props.defaultValue = options.defaultValue;
        if (options.keyboardStep) props.keyboardStep = options.keyboardStep;
        if (options.markers) props.markers = options.markers;
        if (options.stickToMarkers) props.stickToMarkers = options.stickToMarkers;
        if (typeof(options.equidistant) != "undefined") props.equidistant = options.equidistant;
        if (options.units) {
            const renderValueLabel = (val) => `${Math.round(val)}${options.units}`;
            props.onMarkerRender = renderValueLabel;
            props.onValueRender = renderValueLabel;
        }
        if (options.onMarkerRender || options.renderMarker) props.onMarkerRender = options.onMarkerRender || options.renderMarker;
        if (options.onValueRender || options.renderValue) props.onValueRender = options.onValueRender || options.renderValue;
        super(name, note, onChange, modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.Slider, Object.assign(props, {onValueChange: v => this.onChange(v)}));
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./src/ui/settings/types/switch.js":
/*!*****************************************!*\
  !*** ./src/ui/settings/types/switch.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



class SwitchWrapper extends modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.Component {
    constructor(props) {
        super(props);
        this.state = {enabled: this.props.value};
    }

    render() {
        return modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.SwitchRow, Object.assign({}, this.props, {
            value: this.state.enabled,
            onChange: e => {
                this.props.onChange(e);
                this.setState({enabled: e});
            }
        }));
    }
}

/** 
 * Creates a switch using discord's built in switch.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Switch extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {boolean} isChecked - should switch be checked
     * @param {callable} onChange - callback to perform on setting change, callback receives boolean
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, isChecked, onChange, options = {}) {
        super(name, note, onChange);
        this.disabled = !!options.disabled;
        this.value = !!isChecked;
    }

    onAdded() {
        modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.ReactDOM.render(modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.React.createElement(SwitchWrapper, {
            children: this.name,
            note: this.note,
            disabled: this.disabled,
            hideBorder: false,
            value: this.value,
            onChange: (e) => {this.onChange(e);}
        }), this.getElement());
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Switch);


/***/ }),

/***/ "./src/ui/settings/types/textbox.js":
/*!******************************************!*\
  !*** ./src/ui/settings/types/textbox.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settingfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingfield */ "./src/ui/settings/settingfield.js");
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");



/** 
 * Creates a textbox using discord's built in textbox.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Textbox extends _settingfield__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {string} value - current text in box
     * @param {callable} onChange - callback to perform on setting change, callback receives text
     * @param {object} [options] - object of options to give to the setting
     * @param {string} [options.placeholder=""] - placeholder for when textbox is empty
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, value, onChange, options = {}) {
        const {placeholder = "", disabled = false} = options;
        super(name, note, onChange, modules__WEBPACK_IMPORTED_MODULE_1__.DiscordModules.Textbox, {
            onChange: textbox => val => {
                textbox.props.value = val;
                textbox.forceUpdate();
                this.onChange(val);
            },
            value: value,
            disabled: disabled,
            placeholder: placeholder || ""
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Textbox);

/***/ }),

/***/ "./src/ui/toasts.js":
/*!**************************!*\
  !*** ./src/ui/toasts.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/* harmony import */ var ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui */ "./src/ui/ui.js");
/* harmony import */ var _styles_toasts_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/toasts.css */ "./src/styles/toasts.css");
/** 
 * Toast maker similar to Android.
 * 
 * @module Toasts
 */





class Toast {

    static get CSS() {return _styles_toasts_css__WEBPACK_IMPORTED_MODULE_2__["default"];}

    /** Shorthand for `type = "success"` for {@link module:Toasts.show} */
    static async success(content, options = {}) {return this.show(content, Object.assign(options, {type: "success"}));}

    /** Shorthand for `type = "info"` for {@link module:Toasts.show} */
    static async info(content, options = {}) {return this.show(content, Object.assign(options, {type: "info"}));}

    /** Shorthand for `type = "warning"` for {@link module:Toasts.show} */
    static async warning(content, options = {}) {return this.show(content, Object.assign(options, {type: "warning"}));}

    /** Shorthand for `type = "error"` for {@link module:Toasts.show} */
    static async error(content, options = {}) {return this.show(content, Object.assign(options, {type: "error"}));}

    /** Shorthand for `type = "default"` for {@link module:Toasts.show} */
    static async default(content, options = {}) {return this.show(content, Object.assign(options, {type: "default"}));}


    /**
     * Shows a simple toast, similar to Android, centered over 
     * the textarea if it exists, and center screen otherwise.
     * Vertically it shows towards the bottom like in Android.
     * @param {string} content - The string to show in the toast.
     * @param {object} options - additional options for the toast
     * @param {string} [options.type] - Changes the type of the toast stylistically and semantically. {@link module:Toasts.ToastTypes}
     * @param {string} [options.icon] - URL to an optional icon
     * @param {number} [options.timeout=3000] - Adjusts the time (in ms) the toast should be shown for before disappearing automatically
     * @returns {Promise} - Promise that resolves when the toast is removed from the DOM
     */
    static async show(content, options = {}) {
        const {type = "", icon = "", timeout = 3000} = options;
        this.ensureContainer();
        const toast = modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.parseHTML(this.buildToast(content, this.parseType(type), icon));
        document.querySelector(".toasts").appendChild(toast);
        await new Promise(resolve => setTimeout(resolve, timeout));
        toast.classList.add("closing");
        await new Promise(resolve => setTimeout(resolve, 300));
        toast.remove();
        if (!document.querySelectorAll(".toasts .toast").length) document.querySelector(".toasts").remove();
    }

    static buildToast(message, type, icon) {
        const hasIcon = type || icon;
        const className = `toast ${hasIcon ? "toast-has-icon" : ""} ${type && type != "default" ? `toast-${type}` : ""}`;
        if (!icon && type) icon = type;
        return modules__WEBPACK_IMPORTED_MODULE_0__.Utilities.formatString(`<div class="{{className}}">{{icon}}<div class="toast-text">{{message}}</div></div>`, {
            className: className,
            icon: hasIcon ? this.getIcon(icon) : "",
            message: message
        });
    }

    static getIcon(icon) {
        let iconInner = `<img src="${icon}" width="20" height="20" />`;
        switch (icon) {
            case "success": iconInner = ui__WEBPACK_IMPORTED_MODULE_1__.Icons.IconSuccess(20); break; // eslint-disable-line new-cap
            case "warning": iconInner = ui__WEBPACK_IMPORTED_MODULE_1__.Icons.IconWarning(20); break; // eslint-disable-line new-cap
            case "info": iconInner = ui__WEBPACK_IMPORTED_MODULE_1__.Icons.IconInfo(20); break; // eslint-disable-line new-cap
            case "error": iconInner = ui__WEBPACK_IMPORTED_MODULE_1__.Icons.IconError(20); // eslint-disable-line new-cap
        }
        return modules__WEBPACK_IMPORTED_MODULE_0__.Utilities.formatString(`<div class="toast-icon">{{icon}}</div>`, {icon: iconInner});
    }

    static ensureContainer() {
        if (document.querySelector(".toasts")) return;
        const channelClass = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordSelectors.ChannelList.sidebar;
        const container = channelClass ? document.querySelector(`${channelClass} ~ div:not([style])`) : null;
        const memberlist = container ? container.querySelector(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordSelectors.MemberList.membersWrap) : null;
        const form = container ? container.querySelector("form") : null;
        const left = container ? container.getBoundingClientRect().left : 310;
        const right = memberlist ? memberlist.getBoundingClientRect().left : 0;
        const width = right ? right - container.getBoundingClientRect().left : container.offsetWidth;
        const bottom = form ? form.offsetHeight : 80;
        const toastWrapper = document.createElement("div");
        toastWrapper.classList.add("toasts");
        toastWrapper.style.setProperty("left", left + "px");
        toastWrapper.style.setProperty("width", width + "px");
        toastWrapper.style.setProperty("bottom", bottom + "px");
        document.querySelector("#app-mount").appendChild(toastWrapper);
    }

    static parseType(type) {
        return this.ToastTypes.hasOwnProperty(type) ? this.ToastTypes[type] : "";
    }

    /**
     * Enumeration of accepted types.
     */
    static get ToastTypes() {
        return {
            "default": "",
            "error": "error",
            "success": "success",
            "warning": "warning",
            "info": "info"
        };
    }
}

/***/ }),

/***/ "./src/ui/tooltip.js":
/*!***************************!*\
  !*** ./src/ui/tooltip.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/**
 * Tooltip that automatically show and hide themselves on mouseenter and mouseleave events.
 * Will also remove themselves if the node to watch is removed from DOM through
 * a MutationObserver.
 *
 * Note this is not using Discord's internals but normal DOM manipulation and emulates
 * Discord's own tooltips as closely as possible.
 *
 * @module Tooltip
 */



const getClass = function(sideOrColor) {
    const upperCase = sideOrColor[0].toUpperCase() + sideOrColor.slice(1);
    const tooltipClass = modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips[`tooltip${upperCase}`];
    if (tooltipClass) return tooltipClass.value;
    return null;
};

const classExists = function(sideOrColor) {
    return !!getClass(sideOrColor);
};

const toPx = function(value) {
    return `${value}px`;
};

/* <div class="layer-v9HyYc da-layer" style="left: 234.5px; bottom: 51px;">
    <div class="tooltip-2QfLtc da-tooltip tooltipTop-XDDSxx tooltipBlack-PPG47z">
        <div class="tooltipPointer-3ZfirK da-tooltipPointer"></div>
        User Settings
    </div>
</div> */

class Tooltip {
    /**
     *
     * @constructor
     * @param {(HTMLElement|jQuery)} node - DOM node to monitor and show the tooltip on
     * @param {string} tip - string to show in the tooltip
     * @param {object} options - additional options for the tooltip
     * @param {string} [options.style=black] - correlates to the discord styling/colors (black, brand, green, grey, red, yellow)
     * @param {string} [options.side=top] - can be any of top, right, bottom, left
     * @param {boolean} [options.preventFlip=false] - prevents moving the tooltip to the opposite side if it is too big or goes offscreen
     * @param {boolean} [options.isTimestamp=false] - adds the timestampTooltip class (disables text wrapping)
     * @param {boolean} [options.disablePointerEvents=false] - disables pointer events
     * @param {boolean} [options.disabled=false] - whether the tooltip should be disabled from showing on hover
     */
    constructor(node, text, options = {}) {
        const {style = "black", side = "top", preventFlip = false, isTimestamp = false, disablePointerEvents = false, disabled = false} = options;
        this.node = modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.resolveElement(node);
        this.label = text;
        this.style = style.toLowerCase();
        this.side = side.toLowerCase();
        this.preventFlip = preventFlip;
        this.isTimestamp = isTimestamp;
        this.disablePointerEvents = disablePointerEvents;
        this.disabled = disabled;
        this.active = false;

        if (!classExists(this.side)) return modules__WEBPACK_IMPORTED_MODULE_0__.Logger.err("Tooltip", `Side ${this.side} does not exist.`);
        if (!classExists(this.style)) return modules__WEBPACK_IMPORTED_MODULE_0__.Logger.err("Tooltip", `Style ${this.style} does not exist.`);

        this.element = modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.createElement(`<div class="${modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.TooltipLayers.layer}">`);
        this.tooltipElement = modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.createElement(`<div class="${modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltip} ${getClass(this.style)}"><div class="${modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltipPointer}"></div><div class="${modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltipContent}">${this.label}</div></div>`);
        this.labelElement = this.tooltipElement.childNodes[1];
        this.element.append(this.tooltipElement);

        if (this.disablePointerEvents) {
            this.element.classList.add(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.TooltipLayers.disabledPointerEvents);
            this.tooltipElement.classList.add(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltipDisablePointerEvents);
        }
        if (this.isTimestamp) this.tooltipElement.classList.add(modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("timestampTooltip").timestampTooltip);


        this.node.addEventListener("mouseenter", () => {
            if (this.disabled) return;
            this.show();
        });

        this.node.addEventListener("mouseleave", () => {
            this.hide();
        });
    }

    /** Alias for the constructor */
    static create(node, text, options = {}) {return new Tooltip(node, text, options);}

    /** Container where the tooltip will be appended. */
    get container() {return document.querySelector(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordSelectors.App.app.sibling(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordSelectors.TooltipLayers.layerContainer));}
    /** Boolean representing if the tooltip will fit on screen above the element */
    get canShowAbove() {return this.node.getBoundingClientRect().top - this.element.offsetHeight >= 0;}
    /** Boolean representing if the tooltip will fit on screen below the element */
    get canShowBelow() {return this.node.getBoundingClientRect().top + this.node.offsetHeight + this.element.offsetHeight <= modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.screenHeight;}
    /** Boolean representing if the tooltip will fit on screen to the left of the element */
    get canShowLeft() {return this.node.getBoundingClientRect().left - this.element.offsetWidth >= 0;}
    /** Boolean representing if the tooltip will fit on screen to the right of the element */
    get canShowRight() {return this.node.getBoundingClientRect().left + this.node.offsetWidth + this.element.offsetWidth <= modules__WEBPACK_IMPORTED_MODULE_0__.DOMTools.screenWidth;}

    /** Hides the tooltip. Automatically called on mouseleave. */
    hide() {
        /** Don't rehide if already inactive */
        if (!this.active) return;
        this.active = false;
        this.element.remove();
        this.tooltipElement.className = this._className;
    }

    /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
    show() {
        /** Don't reshow if already active */
        if (this.active) return;
        this.active = true;
        this.tooltipElement.className = `${modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltip} ${getClass(this.style)}`;
        if (this.disablePointerEvents) this.tooltipElement.classList.add(modules__WEBPACK_IMPORTED_MODULE_0__.DiscordClasses.Tooltips.tooltipDisablePointerEvents);
        if (this.isTimestamp) this.tooltipElement.classList.add(modules__WEBPACK_IMPORTED_MODULE_0__.WebpackModules.getByProps("timestampTooltip").timestampTooltip);
        this.labelElement.textContent = this.label;
        this.container.append(this.element);

        if (this.side == "top") {
            if (this.canShowAbove || (!this.canShowAbove && this.preventFlip)) this.showAbove();
            else this.showBelow();
        }

        if (this.side == "bottom") {
            if (this.canShowBelow || (!this.canShowBelow && this.preventFlip)) this.showBelow();
            else this.showAbove();
        }

        if (this.side == "left") {
            if (this.canShowLeft || (!this.canShowLeft && this.preventFlip)) this.showLeft();
            else this.showRight();
        }

        if (this.side == "right") {
            if (this.canShowRight || (!this.canShowRight && this.preventFlip)) this.showRight();
            else this.showLeft();
        }

        /** Do not create a new observer each time if one already exists! */
        if (this.observer) return;
        /** Use an observer in show otherwise you'll cause unclosable tooltips */
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const nodes = Array.from(mutation.removedNodes);
                const directMatch = nodes.indexOf(this.node) > -1;
                const parentMatch = nodes.some(parent => parent.contains(this.node));
                if (directMatch || parentMatch) {
                    this.hide();
                    this.observer.disconnect();
                }
            });
        });

        this.observer.observe(document.body, {subtree: true, childList: true});
    }

    /** Force showing the tooltip above the node. */
    showAbove() {
        this.tooltipElement.classList.add(getClass("top"));
        this.element.style.setProperty("top", toPx(this.node.getBoundingClientRect().top - this.element.offsetHeight - 10));
        this.centerHorizontally();
    }

    /** Force showing the tooltip below the node. */
    showBelow() {
        this.tooltipElement.classList.add(getClass("bottom"));
        this.element.style.setProperty("top", toPx(this.node.getBoundingClientRect().top + this.node.offsetHeight + 10));
        this.centerHorizontally();
    }

    /** Force showing the tooltip to the left of the node. */
    showLeft() {
        this.tooltipElement.classList.add(getClass("left"));
        this.element.style.setProperty("left", toPx(this.node.getBoundingClientRect().left - this.element.offsetWidth - 10));
        this.centerVertically();
    }

    /** Force showing the tooltip to the right of the node. */
    showRight() {
        this.tooltipElement.classList.add(getClass("right"));
        this.element.style.setProperty("left", toPx(this.node.getBoundingClientRect().left + this.node.offsetWidth + 10));
        this.centerVertically();
    }

    centerHorizontally() {
        const nodecenter = this.node.getBoundingClientRect().left + (this.node.offsetWidth / 2);
        this.element.style.setProperty("left", toPx(nodecenter - (this.element.offsetWidth / 2)));
    }

    centerVertically() {
        const nodecenter = this.node.getBoundingClientRect().top + (this.node.offsetHeight / 2);
        this.element.style.setProperty("top", toPx(nodecenter - (this.element.offsetHeight / 2)));
    }
}

/***/ }),

/***/ "./src/ui/ui.js":
/*!**********************!*\
  !*** ./src/ui/ui.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* reexport safe */ _tooltip__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Toasts": () => (/* reexport safe */ _toasts__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Popouts": () => (/* reexport safe */ _popouts__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Modals": () => (/* reexport safe */ _modals__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "DiscordContextMenu": () => (/* reexport safe */ _discordcontextmenu__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "ErrorBoundary": () => (/* reexport safe */ _errorboundary__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "ColorPicker": () => (/* reexport safe */ _colorpicker__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Settings": () => (/* reexport module object */ _settings__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "Icons": () => (/* reexport module object */ _icons__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/ui/settings/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons */ "./src/ui/icons.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip */ "./src/ui/tooltip.js");
/* harmony import */ var _toasts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toasts */ "./src/ui/toasts.js");
/* harmony import */ var _popouts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popouts */ "./src/ui/popouts.js");
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals */ "./src/ui/modals.js");
/* harmony import */ var _discordcontextmenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./discordcontextmenu */ "./src/ui/discordcontextmenu.js");
/* harmony import */ var _errorboundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./errorboundary */ "./src/ui/errorboundary.js");
/* harmony import */ var _colorpicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./colorpicker */ "./src/ui/colorpicker.js");












/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules */ "./src/modules/modules.js");
/* harmony import */ var ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui */ "./src/ui/ui.js");



const Library = {};
Library.DCM = ui__WEBPACK_IMPORTED_MODULE_1__.DiscordContextMenu;
Library.ContextMenu = ui__WEBPACK_IMPORTED_MODULE_1__.DiscordContextMenu;
Library.Tooltip = ui__WEBPACK_IMPORTED_MODULE_1__.Tooltip;
Library.Toasts = ui__WEBPACK_IMPORTED_MODULE_1__.Toasts;
Library.Settings = ui__WEBPACK_IMPORTED_MODULE_1__.Settings;
Library.Popouts = ui__WEBPACK_IMPORTED_MODULE_1__.Popouts;
Library.Modals = ui__WEBPACK_IMPORTED_MODULE_1__.Modals;
for (const mod in modules__WEBPACK_IMPORTED_MODULE_0__) Library[mod] = modules__WEBPACK_IMPORTED_MODULE_0__[mod];

Library.Components = {ErrorBoundary: ui__WEBPACK_IMPORTED_MODULE_1__.ErrorBoundary, ColorPicker: ui__WEBPACK_IMPORTED_MODULE_1__.ColorPicker};

const config = __webpack_require__(/*! ./src/config.js */ "./src/config.js");
const baseModule = __webpack_require__(/*! ./src/plugin.js */ "./src/plugin.js");
const pluginFunction = baseModule.default ? baseModule.default : baseModule;

const getBoundLibrary = () => {
    const name = config.info.name;
    const BoundAPI = {
        Logger: {
            stacktrace: (message, error) => Library.Logger.stacktrace(name, message, error),
            log: (...message) => Library.Logger.log(name, ...message),
            error: (...message) => Library.Logger.err(name, ...message),
            err: (...message) => Library.Logger.err(name, ...message),
            warn: (...message) => Library.Logger.warn(name, ...message),
            info: (...message) => Library.Logger.info(name, ...message),
            debug: (...message) => Library.Logger.debug(name, ...message)
        },
        Patcher: {
            getPatchesByCaller: () => {return Library.Patcher.getPatchesByCaller(name);},
            unpatchAll: () => {return Library.Patcher.unpatchAll(name);},
            before: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.before(name, moduleToPatch, functionName, callback, options);},
            instead: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.instead(name, moduleToPatch, functionName, callback, options);},
            after: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.after(name, moduleToPatch, functionName, callback, options);}
        }
    };

    const BoundLib = Object.assign({}, Library);
    BoundLib.Logger = BoundAPI.Logger;
    BoundLib.Patcher = BoundAPI.Patcher;
    return BoundLib;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pluginFunction(Library.Structs.Plugin(config),  false ? 0 : Library)); // eslint-disable-line new-cap
})();

module.exports.ZeresPluginLibrary = __webpack_exports__["default"];
/******/ })()
;
/*@end@*/