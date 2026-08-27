import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/*";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import { getKey, wpGet, wpWait } from "../../global/webpack";

const React = BetterDiscord.React;

const { UserStore } = BetterDiscord.Webpack.Stores;

export default {
	name: "dev",
	apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
		const module = BetterDiscord.Webpack.getBySource(".SENT_BY_SOCIAL_LAYER_INTEGRATION)?");

		patcher.after(module.Ay, "type", (_, args, res) => {
			if (!BadgesStore.isImportant(UserStore.getCurrentUser().id)) return res;

			const user = args[0]?.message?.author;
			if (!user) return res;

			if (
				!res.props.badges.find((x) => x.key.includes("yabd")) &&
				(BadgesStore.check(user.id) || BadgesStore.isImportant(user.id))
			) {
				const badges = BadgesStore.returnRespondingBadges(user.id);
				res.props.badges.push(
					...badges.map((x) => (
						<img key={`yabd-${x.id}`} height={"16px"} width={"16px"} src={x.iconSrc} />
					))
				);
			}

			return res;
		});

		const title = getKey(
			BetterDiscord.Webpack.getBySource(".NOT_STAFF_WARNING})", { raw: true }).declarations,
			(x) => String(x).includes(".NOT_STAFF_WARNING})")
		);
		patcher.instead(title.module, title.key, () => null);

		// this was me attempting to mimic discord core badges to implement them into the badge modal
		// along with eyebrows, body, and titles.

		// const _bagdeModal = await wpWait(BetterDiscord.Webpack.getBySource("badgeIndicatorIds:", {raw: true}));
		// const bagdeModal = getKey(_bagdeModal.declarations, BetterDiscord.Webpack.Filters.byStrings("displayedUserId"));
		//
		// patcher.after(bagdeModal.module, bagdeModal.key, (a, b, c) => {
		//     const userBadges = BadgesStore.findBadgesForUser(b[0].displayedUserId);
		//     const badges = BetterDiscord.Utils.findInTree(c, x => x.badges, {walkable: ['props', 'children']});
		//
		//     console.log(badges);
		//     badges.badges = [...badges.badges, ...userBadges]
		// });
	},
} as unknown as Patch;
