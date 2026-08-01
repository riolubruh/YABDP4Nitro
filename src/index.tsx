import {BetterDiscord} from "./global";
import {load} from "@patches/*";

export default class Plugin {
    private load;

    async start() {
        this.load = load();

    }

    stop() {
        // this.load();
        // this shit no workie.
    }
}