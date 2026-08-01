import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import {secondsightifyRevealOnly, getRevealedTextPerServer} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const { UserProfileStore } = BetterDiscord.Webpack.Stores

const REGEX_FX = /fx\d+/

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: [ x => x.getUser ], // filters to wait for.
    apply(finale, patcher) {
        patcher.after(UserProfileStore, "getUserProfile", (_: any, [userId]: string, ret: UserProfile) => {
            const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);

            const userBio = ret?.bio
            if (revealedSurrogate && revealedSurrogate.includes("fx")) {
                let parsed = !revealedSurrogate ? secondsightifyRevealOnly(userBio) : revealedSurrogate;

                if (!parsed) return ret;

                if (parsed.includes("fx"))
                {
                    const skuId = (parsed.match(REGEX_FX)?.[0])?.slice(2);
                    if (!skuId) return ret;

                    ret.profileEffect = {
                        skuId: skuId,
                        expiresAt: undefined
                    }
                }
            }

            return ret;
        });
    },
} as Patch;