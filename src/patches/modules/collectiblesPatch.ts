import { BetterDiscord } from "@shared/*";
import AdornStore from "../../global/stores/AdornStore.ts";

const FAKE_SKU_ID = "69420";

const originalDecorations = new Map<string, unknown>();

function isFakeDecoration(v: any): boolean {
    return typeof v?.skuId === "string" && v.skuId.startsWith(`${FAKE_SKU_ID}:`);
}

const avatarDecorationDescriptor = {
    get(this: { id: string }) {
        const entry = AdornStore.get(this.id);
        if (!entry?.decoration) {
            return originalDecorations.get(this.id);
        }

        return {
            skuId: `${FAKE_SKU_ID}:${this.id}`,
            asset: `${FAKE_SKU_ID}:${this.id}`
        };
    },
    set(this: { id: string }, v: unknown) {
        if (!isFakeDecoration(v)) {
            originalDecorations.set(this.id, v);
        }
    },
    configurable: true
};

export default {
    name: "collectibles",
    apply: (finale, patcher: typeof BetterDiscord.Patcher) => {
        return; // not finished yet.

        const UserRecord = BetterDiscord.Webpack.getById(889227).A;

        Object.defineProperty(UserRecord.prototype, "avatarDecorationData", avatarDecorationDescriptor);

        Object.values(BetterDiscord.Webpack.Stores.UserStore.getUsers()).forEach((x: any) => {
            originalDecorations.set(x.id, x.avatarDecorationData);
            Object.defineProperty(x, "avatarDecorationData", avatarDecorationDescriptor);
        });

        const mod = BetterDiscord.Webpack.getByKeys("getCollectiblesItemAssetUrl");

        patcher.after(mod, "getCollectiblesItemAssetUrl", (_, data, b) => {
            // here we will grab the sku id, use the product store and determine the type of the sku.
            // then depending on the type, we can return the custom sku data based off the type.
            // check out AdornmentType from src/types/adorn.d.ts

            return b;
            const asset: string | undefined = data?.[0].skuId;
            if (!asset?.startsWith(`${FAKE_SKU_ID}:`)) return b;

            const userId = asset.slice(FAKE_SKU_ID.length + 1);
            const entry = AdornStore.get(userId);

            return entry?.decoration?.file_url ?? b;
        });

        BetterDiscord.Webpack.Stores.UserStore.emitChange();
    }
};