import { BetterDiscord } from "@shared/";
import type { Patch } from "../../types/patches";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import { GlobalModules } from "@global/*";

const { AppIconPersistedStoreState, SelectedGuildStore } = BetterDiscord.Webpack.Stores;

export default {
  name: "appIcons",
  description: "Lets user select app icon",
  apply(finale: any, patcher: any) {
    const appIconsEnabled = SettingsStore.get("unlockAppIcons");
    appIconsEnabled &&
      GlobalModules.Dispatcher.dispatch({
        //restore app icon on start
        type: "APP_ICON_UPDATED",
        id: SettingsStore.get("appIcon"),
      });

    const AppIcon = BetterDiscord.Webpack.getMangled(
      BetterDiscord.Webpack.Filters.bySource("M19.73 4.87a18.2"),
      {
        //RegularAppIcon
        render: (x) => x,
      }
    );
    const CustomAppIcon = BetterDiscord.Webpack.getByStrings(".iconSource,width:");

    patcher.instead(AppIcon, "render", (_, [args], callback) => {
      const appIconsEnabled = SettingsStore.get("unlockAppIcons");
      if (!appIconsEnabled) return callback(args);

      const desktopIcon = AppIconPersistedStoreState.getCurrentDesktopIcon();
      if (desktopIcon == "AppIcon" || SelectedGuildStore.getGuildId() == undefined) {
        // funny bug with dms
        return callback(args);
      } else {
        return <CustomAppIcon size={40} id={SettingsStore.get("appIcon")} />;
      }
    });
  },
} as Patch;
