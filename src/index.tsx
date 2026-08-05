import {BetterDiscord} from "@shared/";
import {loadContextMenus, loadPatches} from "@patches/*";
import SettingsStore from "./global/stores/SettingsStore.ts";
import {startChangelog} from "./global/changelog";
import UserBackgroundStore from "./global/stores/UserBackgroundStore.ts";
import {GlobalModules} from "@global/*";

const {Components} = BetterDiscord;
const {React} = BetterDiscord;

const SettingTypes = {
    "number": Components.NumberInput,
    "bigint": Components.NumberInput,
    "boolean": Components.SwitchInput,
    "string": Components.TextInput,
}

const SettingBlacklist = ["userSharpenPreferences", "customUserThemeSettings", "lastChangelogVersion", "appIcon", "lastGradientSettingStore"]

function normalizeVersion(v: string): string {
    const parts = v.split(".");
    while (parts.length < 3) parts.push("0");
    return parts.join(".");
}

export default class Plugin {
    private unpatch = loadContextMenus();

    async start() {
        startChangelog();
        await UserBackgroundStore.fetch();

        await loadPatches();

        GlobalModules.Dispatcher.dispatch({
            type: "APP_ICON_UPDATED",
            id: SettingsStore.get("appIcon")
        });
    }

    checkUpdate() {
        return;

        // const version = normalizeVersion(SettingsStore.get("lastChangelogVersion"))
        // const res =
    }

    stop() {
        // this.load();
        // this shit no workie.
        this.unpatch();
        new BdApi("Patcher").Patcher.unpatchAll();
    }

    getSettingsPanel() {
        return () => {
            const settings = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => {
                const all = SettingsStore.getAll();
                return Object.keys(all)
                    .filter(key => !SettingBlacklist.includes(key))
                    .reduce((acc, key) => {
                        acc[key] = all[key];
                        return acc;
                    }, {} as Record<string, any>);
            });

            return <Components.SettingGroup name={"Settings"}>
                {Object.entries(settings).map(([key, value]) => {
                    const CompType = SettingTypes[typeof value];

                    return <Components.SettingItem key={key} note={key}>
                        {CompType
                            ? <CompType onChange={(v: any) => SettingsStore.set(key as any, v)} value={value}/>
                            : <Components.TextInput value={JSON.stringify(value)} disabled/>}
                    </Components.SettingItem>;
                })}
            </Components.SettingGroup>;
        };
    }
}