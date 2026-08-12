import {BetterDiscord} from "@shared/*";
import {
    type AvatarDecorationItem,
    type NameplateItem,
    type ProfileEffectItem,
    type ProfileFrameItem, type Quest,
    type ShopCollection,
    ShopItemType,
    type ShopProduct,
} from "../../types/collectible.d.ts";

interface ShopCollectiblesDispatchData {
    categories: {
        categories: ShopCollection[];
    };
}

export default new class ShopCollectiblesStore extends BetterDiscord.Utils.Store {
    private collections: ShopCollection[] = [];
    private questCollectibles: Quest[] = [];

    constructor() {
        super();

        this.fetch();
    }

    async fetch()
    {
        const aamiaCollections = await BetterDiscord.Net.fetch("https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/collectibles.json").then(x => x.json());
        const aamiaQuests = await BetterDiscord.Net.fetch("https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/quests.json").then(x => x.json());

        this.collections = aamiaCollections;
        this.questCollectibles = aamiaQuests;
    }

    set(data: ShopCollectiblesDispatchData) {
        this.collections = data.categories.categories;
        this.emitChange();
    }

    getQuestCollectible(skuId: string): Quest {
        this.questCollectibles.find(q => q.id === skuId);
    }

    getCategories(){
        return this.collections.map(q => q.sku_id);
    }

    getCategory(categorySkuId: string): ShopCollection | undefined {
        return this.collections.find(x => x.sku_id === categorySkuId);
    }

    getItemsFromCategory(categorySkuId: string): ShopProduct[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        return category.products.filter(product => product.type !== 1000);
    }

    getAvatarDecorations(categorySkuId: string): AvatarDecorationItem[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        return category.products.flatMap(product =>
            product.items.filter(
                (item): item is AvatarDecorationItem => item.type === ShopItemType.AvatarDecoration
            )
        );
    }

    getNameplates(categorySkuId: string): NameplateItem[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        return category.products.flatMap(product =>
            product.items.filter(
                (item): item is NameplateItem => item.type === ShopItemType.Nameplate
            )
        );
    }

    getProfileEffects(categorySkuId: string): ProfileEffectItem[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        return category.products.flatMap(product =>
            product.items.filter(
                (item): item is ProfileEffectItem => item.type === ShopItemType.ProfileEffect
            )
        );
    }

    getProfileFrames(categorySkuId: string): ProfileFrameItem[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        return category.products.flatMap(product =>
            product.items.filter(
                (item): item is ProfileFrameItem => item.type === ShopItemType.ProfileFrame
            )
        );
    }
}