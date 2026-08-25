import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import { getRevealedText } from "@utils/*";
import {
  extractDisplayNameStyles,
  extractDecoration,
  extractNameplate,
} from "../../global/shared/regexHelpers.ts";

const { UserStore } = BetterDiscord.Webpack.Stores;

function getStyleData(surrogate: string[]) {
  let fontId = Number(surrogate?.[0]);
  let effectId = Number(surrogate?.[1]);
  let color1 = Number(surrogate?.[2]);
  let color2;
  if (surrogate.length >= 4) {
    color2 = Number(surrogate?.[3]);
  }

  return {
    fontId,
    effectId,
    color1,
    color2,
    isNaN: [fontId, effectId, color1, color2].map((id) => Number.isNaN(id)).includes(true),
  };
}

export default {
  name: "User Profile",
  description: "Performs fake profile stuffs.",
  ids: undefined,
  waitFor: [(x) => x.getUser],
  apply(finale, patcher) {
    patcher.after(UserStore, "getUser", (_: any, [userId]: string, ret: User) => {
      const dnsEnabled = SettingsStore.get("displayNameStyles");
      const decorEnabled = SettingsStore.get("fakeAvatarDecorations");
      const nameplatesEnabled = SettingsStore.get("nameplatesEnabled");

      if (dnsEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC53\uDB40\uDC7B`);
        const match = extractDisplayNameStyles(revealedText);
        if (match) {
          const styleData = getStyleData(match);

          styleData &&
            Object.defineProperty(ret, "displayNameStyles", {
              value: {
                fontId: styleData.fontId,
                effectId: styleData.effectId,
                colors: [styleData.color1, styleData?.color2].filter(Boolean),
              },
              enumerable: true,
              writable: true,
              configurable: true,
            });
        }
      }
      if (decorEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC2F\uDB40\uDC61`);
        const skuId = extractDecoration(revealedText);
        if (skuId) {
          ret.avatarDecorationData = {
            skuId: skuId,
          };
        }
      }
      if (nameplatesEnabled) {
        const revealedText = getRevealedText(userId, `\uDB40\uDC6E\uDB40\uDC7B`);
        const match = extractNameplate(revealedText);
        if (match) {
          const [skuId, palette] = match;
          !ret.collectibles && (ret.collectibles = {});
          ret.collectibles.nameplate = {
            skuId,
            palette,
          };
        }
      }
    });
  },
} as Patch;
