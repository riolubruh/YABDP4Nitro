import os from "os";
import path from "path";
import * as fs from "node:fs";
import JSONMeta from "../package.json"

import { reactPolyfillPlugin } from "./plugins/react-polyfill";

const BANNER = `/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @authorLink https://github.com/riolubruh
 * @version ${JSONMeta.version}
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
`

const FOOTER = `/*@end@*/`;

const GLOBAL_NAME = 'YABDP4Nitro.plugin.js'

function getBetterDiscordPath() {
    const homeDir = os.homedir();

    switch (os.platform()) {
        case "win32":
            return path.join(homeDir, "AppData", "Roaming", "BetterDiscord", "plugins");
        case "darwin":
            return path.join(homeDir, "Library", "Application Support", "BetterDiscord", "plugins");
        case "linux":
            return path.join(process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config"), "BetterDiscord", "plugins");
        default:
            return path.join(homeDir, "AppData", "Roaming", "BetterDiscord", "plugins");
    }
}

await Bun.build({
    entrypoints: ['src/index.tsx'],
    outdir: './',
    banner: BANNER,
    footer: FOOTER,
    naming: GLOBAL_NAME,
    loader: {".js": "jsx", ".jsx": "jsx", ".ts": "tsx", ".tsx": "tsx", ".css": "text"},
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js"],
    jsxFactory: "BdApi.React.createElement",
    jsxFragment: "BdApi.React.Fragment",
    format: "cjs",
    target: "browser",
    plugins: [reactPolyfillPlugin],
});

const fileData = fs.readFileSync(path.join("./", GLOBAL_NAME), 'utf8');
fs.writeFileSync(path.join(getBetterDiscordPath(), GLOBAL_NAME), fileData);