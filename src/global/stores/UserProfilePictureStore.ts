import { BetterDiscord } from "@shared/";
import SettingsStore from "./SettingsStore.ts";

const USER_PFP = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";
// this api is kawaii. thank you. very simple.

export default new (class UserProfilePictureStore extends BetterDiscord.Utils.Store {
	private users: Record<string, string> = {};

	constructor() {
		super();

		this.fetch();
	}

	get(userId: string) {
		const enabled = SettingsStore.get("userPfpIntegration");
		if (!enabled) return null;
		return this.users[userId];
	}

	hasHash(id: string) {
		const enabled = SettingsStore.get("userPfpIntegration");
		if (!enabled) return false;
		return Boolean(this.users[id]);
	}

	async fetch() {
		const data = await BetterDiscord.Net.fetch(USER_PFP, {timeout: 120000});
		if(!data.ok || data.status != 200){
			return BetterDiscord.Logger.error("Failed to download UserPFP database!", data);
		}
		const response = await data.json();

		this.users = response.avatars;
	}

	unload() {
		this.users = {};
	}
})();
