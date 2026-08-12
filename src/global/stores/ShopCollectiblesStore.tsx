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

    private allShopItemsCache: ShopItem[] | null = null;
    private shopItemsBySkuIdCache: Map<string, ShopItem> | null = null;
    private categoryItemCache = new Map<ShopItemType, Map<string, ShopItem[]>>();
    private questItemCache = new Map<ShopItemType, ShopItem[]>();

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
        this.invalidateCaches();
        this.emitChange();
    }

    set(data: ShopCollectiblesDispatchData) {
        this.collections = data.categories.categories;
        this.invalidateCaches();
        this.emitChange();
    }

    private invalidateCaches() {
        this.allShopItemsCache = null;
        this.shopItemsBySkuIdCache = null;
        this.categoryItemCache.clear();
        this.questItemCache.clear();
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

        let byCategory = this.categoryItemCache.get(type);
        if (!byCategory) {
            byCategory = new Map();
            this.categoryItemCache.set(type, byCategory);
        }

        let cached = byCategory.get(categorySkuId);
        if (!cached) {
            cached = category.products.flatMap(product =>
                product.items.filter(item => item.type === type)
            );
            byCategory.set(categorySkuId, cached);
        }

        return cached as T[];
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
        if (!this.allShopItemsCache) {
            this.allShopItemsCache = this.collections.flatMap(category =>
                category.products.flatMap(product => product.items)
            );
        }
        return this.allShopItemsCache;
    }

    private getShopItemsBySkuIdMap(): Map<string, ShopItem> {
        if (!this.shopItemsBySkuIdCache) {
            this.shopItemsBySkuIdCache = new Map(
                this.getAllShopItems().map(item => [item.sku_id, item])
            );
        }
        return this.shopItemsBySkuIdCache;
    }

    getShopItemBySkuId(skuId: string): ShopItem | undefined {
        return this.getShopItemsBySkuIdMap().get(skuId);
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

    private getAllResolvedQuestItems(): ShopItem[] {
        return this.quests
            .flatMap(quest => quest?.config?.rewards_config?.rewards ?? [])
            .map(reward => this.getShopItemBySkuId(reward?.sku_id))
            .filter((item): item is ShopItem => item !== undefined);
    }

    private getQuestItemsByType<T extends ShopItem>(type: ShopItemType): T[] {
        let cached = this.questItemCache.get(type);
        if (!cached) {
            cached = this.getAllResolvedQuestItems().filter(item => item.type === type);
            this.questItemCache.set(type, cached);
        }
        return cached as T[];
    }

    getQuestAvatarDecorations(): AvatarDecorationItem[] {
        return this.getQuestItemsByType<AvatarDecorationItem>(ShopItemType.AvatarDecoration);
    }

    getQuestNameplates(): NameplateItem[] {
        return this.getQuestItemsByType<NameplateItem>(ShopItemType.Nameplate);
    }

    getQuestProfileEffects(): ProfileEffectItem[] {
        return this.getQuestItemsByType<ProfileEffectItem>(ShopItemType.ProfileEffect);
    }

    getQuestProfileFrames(): ProfileFrameItem[] {
        return this.getQuestItemsByType<ProfileFrameItem>(ShopItemType.ProfileFrame);
    }
}