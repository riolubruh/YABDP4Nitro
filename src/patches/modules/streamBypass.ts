import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";

export default {
    name: 'streamBypass',
    description: 'Streams for stream',
    waitFor: [BetterDiscord.Webpack.Filters.byPrototypeKeys("updateVideoQuality")],
    apply(finale: any, patcher: any) {
        const _class = finale.modules[0]
        patcher.after(_class.prototype, "updateVideoQuality", (a) => {

        });
    }
} as Patch