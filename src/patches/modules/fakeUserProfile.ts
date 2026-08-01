import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import {secondsightifyRevealOnly, getRevealedTextPerServer} from "@utils/*";

const { UserProfileStore } = BetterDiscord.Webpack.Stores

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: undefined, // filters to wait for.
    apply(patcher: typeof BdApi.Patcher) {
        patcher.after(UserProfileStore, "getUserProfile", (_: any, [userId]: string, ret: object) => {
            if(ret){
            // if(settings.killProfileEffects) {
            //     ret.profileEffect = undefined;
            // }else{
                let appliedFxServer = false;
                let appliedBannerServer = false;
                let perServerRevealedText = getRevealedTextPerServer(userId, `\uDB40`);
                if(perServerRevealedText && perServerRevealedText.includes("fx")) {
                    //did the thing
                    appliedFxServer = true;
                }
            // }
            return ret;
            }
        });
    },
} as Patch;