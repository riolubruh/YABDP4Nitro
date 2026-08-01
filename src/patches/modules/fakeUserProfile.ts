import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import {getRevealedTextPerServer, secondsightifyRevealOnly} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import CustomUserProfileStore from "../../global/stores/CustomUserProfileStore.ts";

const {UserProfileStore, SelectedGuildStore} = BetterDiscord.Webpack.Stores

const REGEX_FX = /fx\d+/

function decodeProfileColors(string: string) {
    if (!string) return null;

    const colorString = string.match(
        /\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u,
    );

    if (colorString == null) return null;

    let parsed = [...colorString[0]].map((c) => String.fromCodePoint(c.codePointAt(0) - 0xe0000)).join("");
    let colors = parsed
        .substring(1, parsed.length - 1)
        .split(",")
        .map(x => parseInt(x.replace("#", "0x"), 16));
    return colors;
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

            if (!ret) return;

            BadgesStore.isImportant(userId) && BadgesStore.add(userId);

            const revealedSurrogate = getRevealedTextPerServer(userId, `\uDB40`);
            const guildId = SelectedGuildStore.getGuildId();

            (shouldProfileV2 || ret?.bio?.includes?.(`\uDB40\uDC42\uDB40\uDC7B`) || revealedSurrogate?.includes("B{")) && (ret.premiumType = 2);

            const userBio = ret?.bio
            if (revealedSurrogate && revealedSurrogate.includes("fx") && !killProfileEffects) {
                BadgesStore.add(userId)

                let parsed = !revealedSurrogate ? secondsightifyRevealOnly(userBio) : revealedSurrogate;

                if (!parsed) return ret;

                if (parsed.includes("fx")) {
                    const skuId = (parsed.match(REGEX_FX)?.[0])?.slice(2);
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

            return ret;
        });
    },
} as Patch;