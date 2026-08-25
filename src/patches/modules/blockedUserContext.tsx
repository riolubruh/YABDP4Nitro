import { BetterDiscord } from "@shared/*";
import { getKey, wpWait } from "../../global/webpack";
const { SelectedChannelStore, ChannelStore } = BetterDiscord.Webpack.Stores;

const USER_SETTINGS_FILTER = BetterDiscord.Webpack.Filters.bySource("unblockUser", "USER_SETTINGS");

export default {
  name: "Blocked/Ignored User Context Menu",
  description: "Allows opening a user context menu in the blocked/ignored user list.",
  ids: undefined,
  waitFor: [
    USER_SETTINGS_FILTER,
    BetterDiscord.Webpack.Filters.bySource("isGroupDM", "targetIsUser"),
  ], // filters to wait for.
  apply(finale, patcher) {
    const SettingsModule = BetterDiscord.Webpack.getModule(USER_SETTINGS_FILTER, { raw: true });
    const mod = getKey(
      SettingsModule.declarations,
      BdApi.Webpack.Filters.byStrings("unblockUser", "USER_SETTINGS")
    );

    const mod2 = getKey(finale.modules[1], (x) =>
      x?.toString?.().includes?.("targetIsUser", "showMute")
    );
    const openUserContextMenu = mod2?.module[mod2?.key];

    patcher.after(mod?.module, mod?.key, (_, [args], ret) => {
      const pfp = BetterDiscord.Utils.findInTree(ret, (x) => x?.size, {
        walkable: ["props", "children"],
      });
      //find a channel, any fucking channel!
      const channel = SelectedChannelStore.getLastSelectedChannelId()
        ? ChannelStore.getChannel(SelectedChannelStore.getLastSelectedChannelId())
        : ChannelStore.getSortedPrivateChannels()?.[0];
      if (!pfp || !pfp?.user || !channel) return;

      pfp.onContextMenu = (e) => {
        openUserContextMenu(e, pfp.user, channel);
      };
    });
  },
};
