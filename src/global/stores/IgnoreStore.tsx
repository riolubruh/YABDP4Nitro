import {BetterDiscord} from "@shared/*";

export default new class IgnoreStore extends BetterDiscord.Utils.Store {
    private data: Record<string, boolean> = BetterDiscord.Data.load("ignores") ?? {};

    private set(id: string, value: boolean) {
        this.data[id] = value;
        this.emitChange();
        BetterDiscord.Data.save("ignores", this.data);
    }

    ignore(id: string) {
        this.set(id, true);
    }

    unIgnore(id: string) {
        this.set(id, false);
    }

    toggleIgnored(id: string) {
        this.set(id, !this.isIgnored(id));
    }

    isIgnored(id: string): boolean {
        return !!this.data?.[id];
    }
}