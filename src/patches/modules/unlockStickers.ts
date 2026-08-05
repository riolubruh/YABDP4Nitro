import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const stickerSendability = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource("SENDABLE_WITH_BOOSTED_GUILD", 'canUseCustomStickersEverywhere'), {
    getStickerSendability: x=>x.toString().includes('canUseCustomStickersEverywhere'),
    isSendableSticker: x=>typeof x === "function" && !x.toString().includes('canUseCustomStickersEverywhere')
})

export default {
    name: "Unlock Stickers",
    description: "Fully unlocks stickers.",
    apply(finale, patcher) {
        const {stickerBypass, forceStickersUnlocked} = SettingsStore.getAll();
        if(!stickerBypass && !forceStickersUnlocked) return;

        patcher.instead(stickerSendability, "getStickerSendability", () => {return 0});
        patcher.instead(stickerSendability, "isSendableSticker", () => {return true});
    }
} as Patch;