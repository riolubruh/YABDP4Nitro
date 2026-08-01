import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";

const { UserProfileStore } = BetterDiscord.Webpack.Stores

export default {
    name: "Profile FX",
    description: "Kills all FX on Profiles",
    ids: undefined, // array of entry ids
    waitFor: undefined, // filters to wait for.
    apply(patcher: typeof BdApi.Patcher) {
        patcher.after(UserProfileStore, "getUserProfile", (_, [userId], ret) => {
            ret && (ret.profileEffect = undefined);
            return ret;
        })
    },
} as Patch;