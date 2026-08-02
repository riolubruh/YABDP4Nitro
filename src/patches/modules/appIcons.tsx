import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const {AppIconPersistedStoreState} = BetterDiscord.Webpack.Stores

const bypassMap: Record<string, string> = {
    emojisEverywhere: "emojiBypass",
    animatedEmojis: "emojiBypass",
    appIcons: "unlockAppIcons",
    profilePremiumFeatures: "removeProfileUpsell",
    clientThemes: "clientThemes",
    soundboardEverywhere: "soundmojiEnabled"
};

export default {
    name: "appIcons",
    description: "Lets user select app icon",
    waitFor: [x => x.RegularAppIcon],
    mangled: {
        render: x => x
    },
    apply(finale: any, patcher: any) {
        const AppIcon = finale.mangled

        const CustomAppIcon = BetterDiscord.Webpack.getByStrings('.iconSource,width:')
        const canUserUse = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource(".getFeatureValue(", "isPremium"), {
            canUserUse: x => typeof x === "function" && x.toString?.().includes?.('.getFeatureValue(')
        })

        patcher.instead(AppIcon, "render", (_, [args], callback) => {
            const desktopIcon = AppIconPersistedStoreState.getCurrentDesktopIcon();
            desktopIcon == "AppIcon" ? callback(args) : <CustomAppIcon size={40} id={SettingsStore.get("appIcon")}/>
        })

        patcher.instead(canUserUse, "canUserUse", (_, [feature, user], originalFunction) => {
            const settingKey = bypassMap[feature.name];
            if (settingKey && SettingsStore.get(settingKey)) return true;
            return originalFunction(feature, user);
        });
    }
} as Patch