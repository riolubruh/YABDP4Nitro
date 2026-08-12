import {BetterDiscord} from "@shared/"
import type {Patch} from "../../types/patches";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import {GlobalModules} from "@global/*";

const {AppIconPersistedStoreState, SelectedGuildStore} = BetterDiscord.Webpack.Stores

const bypassMap: Record<string, string> = {
    emojisEverywhere: "emojiBypass",
    animatedEmojis: "emojiBypass",
    appIcons: "unlockAppIcons",
    clientThemes: "clientThemes",
    soundboardEverywhere: "soundmojiEnabled"
};

export default {
    name: "appIcons",
    description: "Lets user select app icon",
    apply(finale: any, patcher: any) {

        //restore app icon on start
        GlobalModules.Dispatcher.dispatch({
            type: "APP_ICON_UPDATED",
            id: SettingsStore.get("appIcon")
        });

        const AppIcon = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource('M19.73 4.87a18.2'), { //RegularAppIcon
            render: x => x
        })
        const CustomAppIcon = BetterDiscord.Webpack.getByStrings('.iconSource,width:')
        const canUserUse = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource(".getFeatureValue(", "isPremium"), {
            canUserUse: x => typeof x === "function" && x.toString?.().includes?.('.getFeatureValue(')
        }, {mapDeclarations: true})

        patcher.instead(AppIcon, "render", (_, [args], callback) => {
            const desktopIcon = AppIconPersistedStoreState.getCurrentDesktopIcon();
            if (desktopIcon == "AppIcon" || SelectedGuildStore.getGuildId() == undefined) {
                // funny bug with dms
                return callback(args)
            } else {
                return <CustomAppIcon size={40} id={SettingsStore.get("appIcon")}/>
            }
        })

        patcher.instead(canUserUse, "canUserUse", (_, [feature, user], originalFunction) => {
            const settingKey = bypassMap[feature.name];
            if (settingKey && SettingsStore.get(settingKey)) return true;
            return originalFunction(feature, user);
        });
    }
} as Patch