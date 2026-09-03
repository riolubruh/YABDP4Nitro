import {BetterDiscord} from "@shared/*";

interface IgnoreFlags {
    nitro: boolean;
    encoding: boolean;
}

export default new class IgnoreStore extends BetterDiscord.Utils.Store {
    private data: Record<string, IgnoreFlags> = BetterDiscord.Data.load("ignores") ?? {};

    private persist() {
        this.emitChange();
        BetterDiscord.Data.save("ignores", this.data);
    }

    private getEntry(id: string): IgnoreFlags {
        return this.data[id] ?? {nitro: false, encoding: false};
    }

    ignore(id: string, flags: Partial<IgnoreFlags> = {nitro: true, encoding: true}) {
        const entry = this.getEntry(id);
        this.data[id] = {...entry, ...flags};
        this.persist();
    }

    unIgnore(id: string, flags: Partial<IgnoreFlags> = {nitro: false, encoding: false}) {
        const entry = this.getEntry(id);
        this.data[id] = {...entry, ...flags};
        this.persist();
    }

    toggleIgnored(id: string, key: keyof IgnoreFlags) {
        const entry = this.getEntry(id);
        this.data[id] = {...entry, [key]: !entry[key]};
        this.persist();
    }

    isIgnored(id: string, key?: keyof IgnoreFlags): boolean {
        const entry = this.data?.[id];
        if (!entry) return false;
        if (key) return !!entry[key];
        return !!(entry.nitro || entry.encoding);
    }
}