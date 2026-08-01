import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import {secondsightifyRevealOnly, getRevealedTextPerServer} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import badgesStore from "../../global/stores/BadgesStore.tsx";

const { UserProfileStore } = BetterDiscord.Webpack.Stores

const REGEX_FX = /fx\d+/

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: [ x => x.getUser ], // filters to wait for.
    apply(finale, patcher) {
        patcher.after(UserProfileStore, "getUserProfile", (_: any, [userId]: string, ret: UserProfile) => {
            const killProfileEffects = SettingsStore.get("killProfileEffects")
            const shouldProfileV2 = SettingsStore.get("profileV2")
            const disableUserBadge = SettingsStore.get("disableUserBadge")

            BadgesStore.isImportant(userId) && BadgesStore.add(userId);

            shouldProfileV2 && (ret.premiumType = 2);

            const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);

            const userBio = ret?.bio
            if (revealedSurrogate && revealedSurrogate.includes("fx") && !killProfileEffects) {
                BadgesStore.add(userId)

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

            if (killProfileEffects) { ret.profileEffect = {} }

            const foundBadge = !Object.values(ret?.badges).find(x => x.id.startsWith("yabdp"))

            if (!disableUserBadge && foundBadge && BadgesStore.check(ret.userId)) {
                ret.badges.push(BadgesStore.returnRespondingBadge(ret.userId))
            }

            return ret;
        });
    },
} as Patch;