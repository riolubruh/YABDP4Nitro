import os from "os";
import path from "path";
import * as fs from "node:fs";

const BANNER = `/**
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
`

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

const fileData = fs.readFileSync(path.join("./", GLOBAL_NAME), 'utf8');
fs.writeFileSync(path.join(getBetterDiscordPath(), GLOBAL_NAME), fileData);

await Bun.build({
    entrypoints: ['src/index.tsx'],
    outdir: './',
    banner: BANNER,
    naming: GLOBAL_NAME,
    format: "cjs",
    target: "node",
});