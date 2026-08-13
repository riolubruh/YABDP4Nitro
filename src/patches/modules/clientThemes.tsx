import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import {GlobalModules} from "@global/*";

const CustomUserThemeState = BetterDiscord.Webpack.getMangled(BetterDiscord.Webpack.Filters.bySource('setColors', 'setChassisMixAmount', 'setGradientAngle', 'setAll', 'colors:[],'), { //CustomUserThemeState
    state: x => x?.setState
});

// const {ClientThemesBackgroundStore} = BetterDiscord.Webpack.Stores;

function applySavedClientTheme(){
    const customUserThemeSettings: any = SettingsStore.get("customUserThemeSettings");
    const gradientPresetId: number = SettingsStore.get("lastGradientSettingStore");

    if(customUserThemeSettings.custom){
        CustomUserThemeState.state.getState().setAll({
            colors: customUserThemeSettings.custom?.colors,
            chassisMixAmount: customUserThemeSettings.custom?.baseMix,
            gradientAngle: customUserThemeSettings.custom?.gradientAngle
        });
    }else{
        CustomUserThemeState.state.setState(CustomUserThemeState.state.getInitialState());
    }

    GlobalModules.Dispatcher.dispatch({
        type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
        changes: {
            appearance: {
                shouldSync: false,
                settings: {
                    clientThemeSettings: customUserThemeSettings.custom ? customUserThemeSettings.custom : gradientPresetId > -1 ? {backgroundGradientPresetId: gradientPresetId} : null,
                    theme: customUserThemeSettings.theme,
                    developerMode: true
                }
            }
        }
    });

    if(gradientPresetId >= 0){
        GlobalModules.Dispatcher.dispatch({
            type: "UPDATE_BACKGROUND_GRADIENT_PRESET",
            presetId: gradientPresetId
        });
    }
}

export default {
    name: "clientThemes",
    description: "Saves and applies gradient client themes.",
    waitFor:[BetterDiscord.Webpack.Filters.bySource("changes:{appearance:{settings:{clientThemeSettings:{")],
    mangled: {
        saveClientTheme: x=>x?.toString?.()?.includes?.('SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE')
    },
    apply(finale: any, patcher: any) {
        if(!SettingsStore.get("clientThemes")) return;
        applySavedClientTheme();

        patcher.instead(finale.mangled, 'saveClientTheme', (_: any, [args]: any) => {
            SettingsStore.set("customUserThemeSettings", {
                custom: args.customUserThemeSettings ? args.customUserThemeSettings : false,
                theme: args.theme
            });
            SettingsStore.set("lastGradientSettingStore", args.backgroundGradientPresetId >= 0 ? args.backgroundGradientPresetId : -1);

            applySavedClientTheme();
        });
    }
}