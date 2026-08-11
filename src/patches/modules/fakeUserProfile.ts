import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/";
import {getRevealedText, getRevealedTextPerServer, secondsightifyRevealOnly} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import CustomUserProfileStore from "../../global/stores/CustomUserProfileStore.ts";
import suggondeeznutz from "../../global/shared/surrogates.ts"

const {UserProfileStore, SelectedGuildStore} = BetterDiscord.Webpack.Stores

function decodeProfileColors(string: string) {
    if (!string) return null;

    const decoded = secondsightifyRevealOnly(string);
    if (!decoded) return null;

    const match = decoded.match(/\[#([a-fA-F0-9]+),#([a-fA-F0-9]+)\]/);
    if (!match) return null;

    return [match[1], match[2]].map(x => parseInt(x, 16));
}

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: [x => x.getUser], // filters to wait for.
    apply(finale, patcher) {
        patcher.after(UserProfileStore, "getUserProfile", (_: any, [userId]: string, ret: UserProfile) => {
            const killProfileEffects = SettingsStore.get("killProfileEffects");
            const shouldProfileV2 = SettingsStore.get("profileV2");
            const disableUserBadge = SettingsStore.get("disableUserBadge");
            const profileThemesEnabled = SettingsStore.get("fakeProfileThemes");
            const profileFramesEnabled = SettingsStore.get("profileFrames");

            if (!ret) return;

            const perServer = getRevealedTextPerServer(userId, `\uDB40`);
            const revealedSurrogate = perServer ?? (ret?.bio ? secondsightifyRevealOnly(ret.bio) : undefined);

            const guildId = SelectedGuildStore.getGuildId();

            (shouldProfileV2 || ret?.bio?.includes?.(`\uDB40`) || revealedSurrogate?.includes("B{")) && (ret.premiumType = 2);

            const userBio = ret?.bio
            if (revealedSurrogate && revealedSurrogate.includes("fx") && !killProfileEffects) {
                let parsed = !revealedSurrogate ? secondsightifyRevealOnly(userBio) : revealedSurrogate;

                if (!parsed) return ret;

                if (parsed.includes("fx")) {
                    const skuId = (parsed.match(suggondeeznutz.PROFILE_EFFECTS)?.[0])?.slice(2);
                    if (!skuId) return ret;

                    ret.profileEffect = {
                        skuId: skuId,
                        expiresAt: undefined
                    }
                }
            }

            if (killProfileEffects) {
                ret.profileEffect = {}
            }

            const foundBadge = !Object.values(ret?.badges ?? {}).find(x => x.id.startsWith("yabdp"))

            if (!disableUserBadge && foundBadge && BadgesStore.check(ret?.userId)) {
                ret.badges.push(BadgesStore.returnRespondingBadge(ret.userId))
            }

            if (profileThemesEnabled) {
                const userGuildMemberCache = CustomUserProfileStore.getMember(userId, guildId);

                const colors = {
                    serverPronouns: decodeProfileColors(userGuildMemberCache?.pronouns),
                    serverBio: decodeProfileColors(userGuildMemberCache?.bio),
                    global: decodeProfileColors(ret?.bio)
                };

                ret.themeColors = Object.values(colors).find(Boolean);
            }

            if (revealedSurrogate && revealedSurrogate.includes("pf") && profileFramesEnabled) {
                const match = revealedSurrogate.match(suggondeeznutz.PROFILE_FRAME)?.[0]?.substring(2);
                if (match) ret.profileFrame = { skuId: match, expiresAt: undefined };
            }

            return ret;
        });
    },
} as Patch;