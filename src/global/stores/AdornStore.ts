import {BetterDiscord} from "@shared/*";

const API_URL = "http://localhost:3000/api/v1/users/";

export default new class AdornStore extends BetterDiscord.Utils.Store {
    private Adorns: Record<string, any> = [];

    constructor() {
        super();

        BetterDiscord.Net.fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                this.Adorns = data;
                this.emitChange();
            })
            .catch(e => console.error("AdornStore: failed to fetch users", e));
    }

    get(userId: string) {
        return this.Adorns.find(x => x.discord_id == userId)
    }

    has(userId: string): boolean {
        return !!this.Adorns.find(x => x.discord_id == userId)
    }
}