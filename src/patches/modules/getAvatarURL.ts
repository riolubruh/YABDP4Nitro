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

            const userPicture = UserProfilePictureStore.get(thisContext.id);
            if (!userPicture) return originalFunction.apply(thisContext, args);

            const foundPFP = getRevealedText(thisContext.id, `\uDB40\uDC50\uDB40\uDC7B`);
            if (!foundPFP) return userPicture;

            const matches = foundPFP.match(suggondeeznutz.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
            if (!matches) return userPicture;

            return `https://i.imgur.com/${matches}`;
        });
    }
} as Patch