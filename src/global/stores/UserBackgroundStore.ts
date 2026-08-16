import {BetterDiscord} from "@shared/";

const USER_BG = "https://usrbg.is-hardly.online/users"
// dude this api is terribly made.

export default new class UserBackgroundStore extends BetterDiscord.Utils.Store {
    private users: Record<string, string> = {};
    private meta: Record<string, string> = {};

    get(userId: string)
    {
        return this.users[userId];
    }

    public format(userId: string) {
        const userHash = this.get(userId);
        return `https://usrbg.is-hardly.online/${this.meta.bucket}/${this.meta.prefix.slice(0, this.meta.prefix.length - 1)}/${userId}?${userHash}`;
    }

    hasHash(id: string)
    {
        return Boolean(this.users[id])
    }

    async fetch()
    {
        const data = await BetterDiscord.Net.fetch(USER_BG)
        const response = await data.json();

        this.meta = {...this.meta, ["bucket"]: response.bucket, ["prefix"]: response.prefix};
        this.users = response.users;
    }


    unload(){
        this.users = null;
        this.meta = null;
    }
}