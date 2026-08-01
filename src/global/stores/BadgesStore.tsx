const specialThanks = [
    "122072911455453184", // Weblure,
    "760274365853335563", // Kozhura_ubezhishe_player_fly,
    "482224256730791967", // Moeefa,
    "1106012563835195412",// HunBun (hunbun.net),
];

const Badges = {
    developers: {
        ids: ["359063827091816448", "917630027477159986"],
        badge: {
            id: "yabdp_developer",
            iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi.gif",
            description: "YABDP4Nitro Developer!",
            link: "https://github.com/riolubruh/YABDP4Nitro#contributors" //this link opens upon clicking the badge.
        }
    },

    contributors: {
        ids: specialThanks,
        badge: {
            id: "yabdp_contributor",
            iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/img/big_yoshi.gif",
            description: "YABDP4Nitro Contributor!",
            link: "https://github.com/riolubruh/YABDP4Nitro#contributors" //this link opens upon clicking the badge.
        }
    },
}

export default new class BadgesStore {
    public foundUsers: string[] = [];

    add(id: string) {
        if (!this.foundUsers.includes(id)) {
            this.foundUsers.push(id)
        }
    }

    check(id: string): boolean {
        return this.foundUsers.includes(id);
    }

    isImportant(id: string): boolean {
        return [...Badges.developers.ids, ...Badges.contributors.ids].includes(id);
    }

    returnRespondingBadge(id: string) {
        const category = Object.values(Badges).find(x => x.ids.includes(id))

        return category?.badge ?? {
            id: "yabdp_user",
            iconSrc: "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png",
            description: "A fellow YABDP4Nitro user!",
            link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
        }
    }
}