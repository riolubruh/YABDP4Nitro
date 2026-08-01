import {BetterDiscord} from "./global";
import {load} from "@patches/*";
import SettingsStore from "./global/stores/SettingsStore.ts";
import {startChangelog} from "./global/changelog";
import UserBackgroundStore from "./global/stores/UserBackgroundStore.ts";

const { Components } = BetterDiscord;
const { React } = BetterDiscord;

const SettingTypes = {
    "number": Components.NumberInput,
    "bigint": Components.NumberInput,
    "boolean": Components.SwitchInput,
    "string": Components.TextInput,
}

export default class Plugin {
    async start() {
        startChangelog();
        await UserBackgroundStore.fetch();

        await load();
    }

    stop() {
        // this.load();
        // this shit no workie.
        new BdApi("Patcher").Patcher.unpatchAll();
    }

    getSettingsPanel() {
        return () => {
            const settings = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => SettingsStore.getAll());

            return <Components.SettingGroup name={"Settings"}>
                {Object.entries(settings).map(([key, value]) => {
                    const CompType = SettingTypes[typeof value];

                    return <Components.SettingItem key={key} note={key}>
                        {CompType
                            ? <CompType onChange={(v: any) => SettingsStore.set(key as any, v)} value={value} />
                            : <Components.TextInput value={JSON.stringify(value)} disabled />}
                    </Components.SettingItem>;
                })}
            </Components.SettingGroup>;
        };
    }
}