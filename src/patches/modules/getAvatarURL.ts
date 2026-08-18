import type {Patch} from "../../types/patches";
import {wpGet} from "../../global/webpack";
import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import UserProfilePictureStore from "../../global/stores/UserProfilePictureStore.ts";
import {getRevealedText} from "@utils/*";
import suggondeeznutz from "../../global/shared/regexReveals.ts"

const UserClass = wpGet(x => x.prototype?.getAvatarURL, {searchExports: true})

export default {
    name: 'getAvatarURL',
    apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
        patcher.instead(UserClass.prototype, "getAvatarURL", (thisContext, args, originalFunction) => {
            if (!SettingsStore.get("customPFPs") || !SettingsStore.get("userPfpIntegration")) {
                return originalFunction.apply(thisContext, args);
            }

            const userPfp = UserProfilePictureStore.get(thisContext.id);
            if (userPfp) return userPfp;

            const foundPFP = getRevealedText(thisContext.id, `\uDB40\uDC50\uDB40\uDC7B`);
            if (!foundPFP) return originalFunction.apply(thisContext, args);

            const matches = foundPFP.match(suggondeeznutz.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
            if (!matches) return originalFunction.apply(thisContext, args);

            return `https://i.imgur.com/${matches}.gif`;
        });
    }
} as Patch