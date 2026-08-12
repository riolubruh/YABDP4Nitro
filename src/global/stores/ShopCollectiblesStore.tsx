import {BetterDiscord} from "@shared/*";
import {
    type AvatarDecorationItem,
    type NameplateItem,
    type ProfileEffectItem,
    type ProfileFrameItem,
    type Quest,
    type QuestReward,
    type ShopCollection,
    type ShopItem,
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
    private quests: Quest[] = [];

    constructor() {
        super();

        this.fetch();
    }

    async fetch() {
        const [collections, quests] = await Promise.all([
            BetterDiscord.Net.fetch(
                "https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/collectibles.json"
            ).then(r => r.json() as Promise<ShopCollection[]>),
            BetterDiscord.Net.fetch(
                "https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/quests.json"
            ).then(r => r.json() as Promise<Quest[]>),
        ]);

        this.collections = collections;
        this.quests = quests;
        this.emitChange();
    }

    set(data: ShopCollectiblesDispatchData) {
        this.collections = data.categories.categories;
        this.emitChange();
    }

    getCategories(): string[] {
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

    private getCategoryItemsByType<T extends ShopItem>(
        categorySkuId: string,
        type: ShopItemType
    ): T[] | null {
        const category = this.getCategory(categorySkuId);
        if (!category) return null;

        const items = category.products.flatMap(product =>
            product.items.filter(item => item.type === type)
        );

        return [...new Map(items.map(item => [item.sku_id, item])).values()] as T[];
    }

    getAvatarDecorations(categorySkuId: string): AvatarDecorationItem[] | null {
        return this.getCategoryItemsByType<AvatarDecorationItem>(
            categorySkuId,
            ShopItemType.AvatarDecoration
        );
    }

    getNameplates(categorySkuId: string): NameplateItem[] | null {
        return this.getCategoryItemsByType<NameplateItem>(categorySkuId, ShopItemType.Nameplate);
    }

    getProfileEffects(categorySkuId: string): ProfileEffectItem[] | null {
        return this.getCategoryItemsByType<ProfileEffectItem>(
            categorySkuId,
            ShopItemType.ProfileEffect
        );
    }

    getProfileFrames(categorySkuId: string): ProfileFrameItem[] | null {
        return this.getCategoryItemsByType<ProfileFrameItem>(
            categorySkuId,
            ShopItemType.ProfileFrame
        );
    }

    private getAllShopItems(): ShopItem[] {
        return this.collections.flatMap(category =>
            category.products.flatMap(product => product.items)
        );
    }

    getShopItemBySkuId(skuId: string): ShopItem | undefined {
        return this.getAllShopItems().find(item => item.sku_id === skuId);
    }

    getQuests(): Quest[] {
        return this.quests;
    }

    getQuest(questId: string): Quest | undefined {
        return this.quests.find(q => q.id === questId);
    }

    getQuestCollectible(skuId: string): QuestReward | undefined {
        for (const quest of this.quests) {
            const reward = quest?.config?.rewards_config?.rewards?.find(r => r.sku_id === skuId);
            if (reward) return reward;
        }
        return undefined;
    }

    private getAllResolvedQuestItems(): QuestReward[] {
        return this.quests
            .flatMap(quest => quest?.config?.rewards_config?.rewards ?? [])
    }

    getQuestAvatarDecorations(): QuestReward[] {
        return this.getAllResolvedQuestItems().filter(x => x.type == 3);
    }
}