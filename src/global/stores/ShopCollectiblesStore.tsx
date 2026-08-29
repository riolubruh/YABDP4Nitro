import { BetterDiscord } from "@shared/*";
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
import { invalid } from "../quests/index.ts";

interface ShopCollectiblesDispatchData {
	categories: { categories: ShopCollection[] };
}

function itemsByType<T extends ShopItem>(
	collection: ShopCollection | undefined,
	type: ShopItemType
): (T & { productName: string })[] | null {
	if (!collection) return null;
	const items = collection.products.flatMap((p) =>
		p.items.filter((i) => i.type === type).map((i) => ({ ...i, productName: p.name }))
	) as (T & { productName: string })[];
	return [...new Map(items.map((i) => [i.sku_id, i])).values()];
}

export default new (class ShopCollectiblesStore extends BetterDiscord.Utils.Store {
	private collections: ShopCollection[] = [];
	private quests: Quest[] = [];
	private _invalid: ShopCollection[] = [];

	constructor() {
		super();
		this.fetch();
	}

	async fetch() {
		const [collections, quests] = await Promise.all([
			BetterDiscord.Net.fetch(
				"https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/collectibles.json",
				{timeout: 100000}
			).then((r) => r.json() as Promise<ShopCollection[]>),
			BetterDiscord.Net.fetch(
				"https://raw.githubusercontent.com/aamiaa/discord-api-diff/refs/heads/main/quests.json",
				{timeout: 100000}
			).then((r) => r.json() as Promise<Quest[]>),
		]);

		this.collections = collections;
		this.quests = quests;
		this._invalid = invalid;
		this.emitChange();
	}

	set(data: ShopCollectiblesDispatchData) {
		this.collections = data.categories.categories;
		this.emitChange();
	}

	getCategories(): string[] {
		return this.collections.map((c) => c.sku_id);
	}

	getInvalids(): string[] {
		return this._invalid.map((c) => c.sku_id);
	}

	getInvalid(id: string): ShopCollection | undefined {
		return this._invalid.find((c) => c.sku_id === id);
	}

	getCategory(skuId: string): ShopCollection | undefined {
		return this.collections.find((c) => c.sku_id === skuId);
	}

	getInvalidCategory(skuId: string): ShopCollection | undefined {
		return this._invalid.find((c) => c.sku_id === skuId);
	}

	getItemsFromCategory(skuId: string): ShopProduct[] | null {
		const category = this.getCategory(skuId);
		return category ? category.products.filter((p) => p.type !== 1000) : null;
	}

	getAvatarDecorations(skuId: string) {
		return itemsByType<AvatarDecorationItem>(
			this.getCategory(skuId),
			ShopItemType.AvatarDecoration
		);
	}

	getNameplates(skuId: string) {
		return itemsByType<NameplateItem>(this.getCategory(skuId), ShopItemType.Nameplate);
	}

	getProfileEffects(skuId: string) {
		return itemsByType<ProfileEffectItem>(this.getCategory(skuId), ShopItemType.ProfileEffect);
	}

	getProfileFrames(skuId: string) {
		return itemsByType<ProfileFrameItem>(this.getCategory(skuId), ShopItemType.ProfileFrame);
	}

	getInvalidByType<T extends ShopItem>(skuId: string, type: ShopItemType) {
		return itemsByType<T>(this.getInvalidCategory(skuId), type);
	}

	private getAllShopItems(): (ShopItem & { productName: string })[] {
		return this.collections.flatMap((c) =>
			c.products.flatMap((p) => p.items.map((i) => ({ ...i, productName: p.name })))
		);
	}

	getShopItemBySkuId(skuId: string) {
		return this.getAllShopItems().find((i) => i.sku_id === skuId);
	}

	getQuests(): Quest[] {
		return this.quests;
	}

	getQuest(id: string) {
		return this.quests.find((q) => q.id === id);
	}

	private getAllQuestRewards(): QuestReward[] {
		return this.quests.flatMap((q) => q?.config?.rewards_config?.rewards ?? []);
	}

	getProduct(skuId: string) {
		return this.getAllQuestRewards().find((r) => r.sku_id === skuId);
	}

	getQuestCollectible(skuId: string) {
		return this.getAllQuestRewards().find((r) => r.sku_id === skuId);
	}

	private getAllResolvedQuestItems(): ShopItem[] {
		return this.getAllQuestRewards()
			.map((r) => this.getShopItemBySkuId(r.sku_id))
			.filter((i): i is ShopItem => i !== undefined);
	}

	getQuestAvatarDecorations(): AvatarDecorationItem[] {
		return this.getAllResolvedQuestItems().filter(
			(i) => i.type === 3
		) as AvatarDecorationItem[];
	}

	unload() {
		this.collections = [];
		this.quests = [];
		this._invalid = [];
	}
})();
