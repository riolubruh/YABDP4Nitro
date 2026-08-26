import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/";
import { getRevealedTextPerServer, secondsightifyRevealOnly } from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import {
	extractProfileEffects,
	extractProfileFrame,
	containsProfileEffects,
} from "../../global/shared/regexHelpers.ts";
import regexReveals from "../../global/shared/regexReveals.ts";

const { UserProfileStore, SelectedGuildStore } = BetterDiscord.Webpack.Stores;

function extractProfileColors(string: string) {
	if (!string) return null;

	const match = string.match(regexReveals.PROFILE_COLORS);
	if (!match) return null;

	return match
		.slice(1)
		.filter(Boolean)
		.map((x) => parseInt(x, 16));
}
export default {
	name: "User Profile",
	description: "Performs fake profile stuffs.",
	ids: undefined,
	waitFor: [(x) => x.getUser],
	apply(finale, patcher) {
		patcher.after(
			UserProfileStore,
			"getUserProfile",
			(_: any, [userId]: [string], ret: UserProfile) => {
				const killProfileEffects = SettingsStore.get("killProfileEffects");
				const profileEffectsEnabled = SettingsStore.get("profileEffects");
				const shouldProfileV2 = SettingsStore.get("profileV2");
				const disableUserBadge = SettingsStore.get("disableUserBadge");
				const profileThemesEnabled = SettingsStore.get("fakeProfileThemes");
				const profileFramesEnabled = SettingsStore.get("profileFrames");

				if (!ret) return;

				const userBio = ret.bio;
				(shouldProfileV2 ||
					userBio?.includes?.(`\uDB40`) ||
					getRevealedTextPerServer(userId, `\uDB40`)) &&
					(ret.premiumType = 2);

				const revealedGlobalBio = secondsightifyRevealOnly(userBio);

				if (!killProfileEffects && profileEffectsEnabled) {
					const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC66\uDB40\uDC78`);
					const parsed =
						perServer ??
						(userBio?.includes?.(`\uDB40\uDC66\uDB40\uDC78`)
							? revealedGlobalBio
							: null);

					if (parsed && containsProfileEffects(parsed)) {
						const skuId = extractProfileEffects(parsed);
						skuId &&
							(ret.profileEffect = {
								skuId: skuId,
								expiresAt: undefined,
							});
					}
				}

				if (killProfileEffects) {
					ret.profileEffect = {};
				}

				if (profileThemesEnabled) {
					const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC5B\uDB40\uDC23`);
					const match = perServer
						? extractProfileColors(perServer)
						: extractProfileColors(revealedGlobalBio);

					match && (ret.themeColors = match);
				}

				if (profileFramesEnabled) {
					const perServer = getRevealedTextPerServer(userId, `\uDB40\uDC70\uDB40\uDC66`);
					const revealedSurrogate =
						perServer ??
						(userBio?.includes?.(`\uDB40\uDC70\uDB40\uDC66`)
							? revealedGlobalBio
							: null);
					const match = extractProfileFrame(revealedSurrogate);
					match && (ret.profileFrame = { skuId: match, expiresAt: undefined });
				}

				const noBadgeFound = !Object.values(ret?.badges ?? {}).find((x) =>
					x?.id?.startsWith("yabdp")
				);

				if (!disableUserBadge && noBadgeFound && BadgesStore.check(ret?.userId)) {
					if (!ret.badges) ret.badges = [];
					ret.badges.push(...BadgesStore.findBadgesForUser(ret.userId));
				}
			}
		);
	},
} as Patch;
