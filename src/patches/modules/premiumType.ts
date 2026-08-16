import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const {UserStore} = BetterDiscord.Webpack.Stores;

export default {
    name: "premiumType",
    description: "Makes sure the premium type is always what you want",
    apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
        const randomAssStore = BetterDiscord.Webpack.getStore("OverridePremiumTypeStore")
        patcher.instead(randomAssStore, "getPremiumTypeActual", (_,__,callback) => {
            const info = SettingsStore.get("changePremiumType2");
            if(info != -1) return info;
            else return callback();
        })
    }

} as Patch