import type { Patch } from "../../types/patches";
import SettingsStore from "../../global/stores/SettingsStore.ts";

export default {
  name: "getUserBannerURL",
  description: "Force animate the user banner URL",
  waitFor: [(x) => x.getEmojiURL],
  apply(finale: any, patcher: any) {
    const AvatarDefaults = finale.modules[0];

    patcher.before(AvatarDefaults, "getUserBannerURL", (_, args) => {
      if (!SettingsStore.get("fakeProfileBanners")) return;

      args[0].canAnimate = true;
    });
  },
} as Patch;
