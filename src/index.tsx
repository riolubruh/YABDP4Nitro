import {BetterDiscord} from "./global";
import {load} from "@patches/*";

export default class Plugin {
    async start() {
        await load();
    }

    stop() {
        // this.load();
        // this shit no workie.
        new BdApi("Patcher").Patcher.unpatchAll();
    }
}