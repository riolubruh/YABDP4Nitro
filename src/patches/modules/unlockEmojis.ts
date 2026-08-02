import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/";

export default {
    name: "Unlock Emojis",
    description: "Fully unlocks emojis.",
    waitFor: [BetterDiscord.Webpack.Filters.byKeys("isEmojiFilteredOrLocked")],
    apply(finale, patcher) {
        ["isEmojiFilteredOrLocked", "isEmojiDisabled", "isEmojiFiltered", "isEmojiPremiumLocked"].map(x => patcher.instead(finale.modules[0], x, () => false))
        patcher.instead(finale.modules[0], "getEmojiUnavailableReason", () => {return});
    }
} as Patch;