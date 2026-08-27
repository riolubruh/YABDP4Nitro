const specialThanks = [
	"122072911455453184", // Weblure,
	"760274365853335563", // Kozhura_ubezhishe_player_fly,
	"482224256730791967", // Moeefa, and
	"1106012563835195412", // HunBun (hunbun.net) !
];

const Badges = {
	developers: {
		ids: ["359063827091816448", "917630027477159986"], //Riolubruh, Arven
		badge: {
			id: "yabdp_developer",
			iconSrc:
				"https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi.gif",
			description: "YABDP4Nitro Developer!",
			link: "https://github.com/riolubruh/YABDP4Nitro#contributors",
		},
	},

	silly: {
		ids: ["917630027477159986"], // Arven
		badge: {
			id: "yabdp_silly",
			iconSrc:
				"https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/refs/heads/main/img/yabdp_silly.png",
			description: "Honk.",
		},
	},

	sera: {
		ids: ["1323433010858557523"], // Seraphina
		badge: {
			id: "yabdp_sera",
			iconSrc:
				"https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/refs/heads/main/img/yabdp_sera.gif",
			description: "sera so silly ;3",
		},
	},

	contributors: {
		ids: specialThanks,
		badge: {
			id: "yabdp_contributor",
			iconSrc:
				"https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi_red.gif",
			description: "YABDP4Nitro Contributor!",
			link: "https://github.com/riolubruh/YABDP4Nitro#contributors",
		},
	},
};

const defaultBadge = {
	id: "yabdp_user",
	iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png",
	description: "A fellow YABDP4Nitro user!",
	link: "https://github.com/riolubruh/YABDP4Nitro", //this link opens upon clicking the badge.
};

export default new (class BadgesStore {
	public foundUsers: string[] = [];

	add(id: string) {
		if (!this.foundUsers.includes(id)) {
			this.foundUsers.push(id);
		}
	}

	check(id: string): boolean {
		return this.foundUsers.includes(id) || this.isImportant(id);
	}

	isImportant(id: string): boolean {
		return Object.values(Badges).some((category) => category.ids.includes(id));
	}

	findBadgesForUser(id: string): Badge[] {
		return Object.values(Badges)
			.filter((category) => category.ids.includes(id))
			.map((category) => category.badge);
	}

	returnRespondingBadges(id: string): Badge[] {
		const categories = Object.values(Badges).filter((x) => x.ids.includes(id));
		return categories.length ? categories.map((x) => x.badge) : [defaultBadge];
	}

	unload() {
		this.foundUsers = [];
	}
})();
