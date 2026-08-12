// Types for a Discord Collectibles Shop "store listing" payload
// (e.g. the "Solar Eclipse" category with its bundles and individual items)

/** tinycolor-style color object as serialized in `styles.*_colors` */
export interface ShopColor {
    _original_input: string;
    _r: number;
    _g: number;
    _b: number;
    _a: number;
    _round_a: number;
    _format: string;
    _ok: boolean;
    _tc_id: number;
}

export interface ShopStyles {
    background_colors: ShopColor[];
    button_colors: ShopColor[];
    confetti_colors: ShopColor[];
}

export type Currency = "usd" | "discord_orb" | (string & {});

export interface PriceAmount {
    amount: number;
    currency: Currency;
    tax: number;
    tax_inclusive: boolean;
}

export interface CountryPrices {
    country_code: string;
    prices: PriceAmount[];
}

export interface PriceEntry {
    country_prices: CountryPrices;
    /** Per-payment-source overrides; empty object in all observed samples */
    payment_source_prices: Record<string, unknown>;
}

/**
 * Keyed by a numeric "price tier" id as a string (e.g. "0" = standard,
 * "4" = discounted/promo tier). Not every product defines every key.
 */
export type PriceMap = Record<string, PriceEntry>;

/** Keyed by platform id (observed: "5" and "7" for Google/Play SKUs) */
export type GoogleSkuIds = Record<string, string>;

/** Discriminant shared by both `items[]` entries and top-level products */
export enum ShopItemType {
    AvatarDecoration = 0,
    ProfileEffect = 1,
    Nameplate = 2,
    ProfileFrame = 3,
}

export interface AvatarDecorationItem {
    type: ShopItemType.AvatarDecoration;
    sku_id: string;
    asset: string;
    label: string;
    productName: string;
}

export interface ProfileEffectAnimation {
    src: string;
    loop: boolean;
    duration: number;
    start: number;
    loop_delay: number;
    z_index: number;
    randomized_sources: string[];
}

export interface ProfileEffectItem {
    type: ShopItemType.ProfileEffect;
    sku_id: string;
    title: string;
    description: string;
    accessibility_label: string;
    reduced_motion_src: string;
    thumbnail_preview_src: string;
    effects: ProfileEffectAnimation[];
    animation_type: number;
    /** Only present on some effects (e.g. ones with a static/idle frame) */
    static_frame_src?: string;
}

export interface NameplateItem {
    type: ShopItemType.Nameplate;
    sku_id: string;
    asset: string;
    label: string;
    palette: string;
}

export interface ProfileFrameLayer {
    id: string;
    type: "staple" | "rail" | (string & {});
    order: "front" | "back";
    anchor: "top" | "bottom";
    responsive: boolean;
}

export interface ProfileFrameItem {
    type: ShopItemType.ProfileFrame;
    sku_id: string;
    label: string;
    layers: ProfileFrameLayer[];
    inner_width: number;
    overflow_top: number;
    overflow_bottom: number;
    overflow_horizontal: number;
}

export type ShopItem =
    | AvatarDecorationItem
    | ProfileEffectItem
    | NameplateItem
    | ProfileFrameItem;

/** Slim summary of a component product as it appears inside a bundle's `bundled_products` */
export interface BundledProductSummary {
    prices: PriceMap;
    type: ShopItemType;
    premium_type: number | null;
    name: string;
    sku_id: string;
    summary: string;
}

export interface PreviewAssets {
    fg_static?: string;
    bg_static?: string;
}

/** A standalone item uses ShopItemType (0-3); a bundle uses 1000 */
export type ProductType = ShopItemType | 1000;

export interface ShopProduct {
    store_listing_id: string;
    sku_id: string;
    name: string;
    /** May contain the literal template placeholder "{joined_items}" for bundles */
    summary: string;
    styles: ShopStyles;
    prices: PriceMap;
    type: ProductType;
    premium_type: number | null;
    items: ShopItem[];
    category_sku_id: string;
    is_category_reward: boolean;
    /** Only present on bundle products (type === 1000) */
    bundled_products?: BundledProductSummary[];
    preview_assets?: PreviewAssets;
    google_sku_ids?: GoogleSkuIds;
    is_first_party: boolean;
}

export interface HeroBannerDisplayConfig {
    desktop_max_height: number | null;
    mobile_max_height: number | null;
    responsive: boolean | null;
    background_style: string;
}

/** The top-level shop category/collection payload (e.g. "Solar Eclipse") */
export interface ShopCollection {
    store_listing_id: string;
    sku_id: string;
    name: string;
    summary: string;
    styles: ShopStyles;
    products: ShopProduct[];
    /** sku_ids of `products`, in display-priority order */
    hero_ranking: string[];
    unpublished_at: string | null;
    is_orbs_exclusive: boolean;
    hero_banner_url: string;
    hero_logo_url: string;
    catalog_banner_url: string;
    featured_block_url: string;
    logo_url: string;
    pdp_bg_url: string;
    mobile_banner_url: string;
    mobile_bg_url: string;
    hero_banner_display_config: HeroBannerDisplayConfig;
}

/**
 * Types for Discord's Quests payload (as returned by whatever endpoint
 * you pulled this from — looks like the quest-bar/eligible-quests list).
 */

export type QuestList = Quest[];

export interface Quest {
    id: string;
    config: QuestConfig;
    user_status: unknown | null;
    targeted_content: unknown[];
    preview: boolean;
    /** base64-encoded traffic metadata blob */
    traffic_metadata_raw: string;
}

export interface QuestConfig {
    id: string;
    config_version: number;
    starts_at: string; // ISO 8601
    expires_at: string; // ISO 8601
    /** feature flag ids gating this quest */
    features: number[];
    application: QuestApplication;
    assets: QuestAssets;
    colors: QuestColors;
    messages: QuestMessages;
    task_config_v2: QuestTaskConfig;
    rewards_config: QuestRewardsConfig;
    share_policy: QuestSharePolicy;
    cta_config: QuestCtaConfig;
}

export interface QuestApplication {
    link: string;
    id: string; // application/game snowflake
    name: string;
}

export interface QuestAssets {
    hero: string;
    hero_video?: string;
    quest_bar_hero_blurhash?: string;
    quest_bar_hero: string;
    quest_bar_hero_video?: string;
    /** often literally the string "PLACEHOLDER" when unset */
    game_tile: string;
    logotype: string;
    game_tile_light: string;
    game_tile_dark: string;
    logotype_light: string;
    logotype_dark: string;
}

export interface QuestColors {
    primary: string; // hex
    secondary: string; // hex
}

export interface QuestMessages {
    quest_name: string;
    game_title: string;
    game_publisher: string;
}

export type QuestJoinOperator = "and" | "or";

export interface QuestTaskConfig {
    tasks: Partial<Record<QuestTaskType, QuestTask>>;
    join_operator: QuestJoinOperator;
}

export type QuestTaskType =
    | "PLAY_ON_DESKTOP"
    | "PLAY_ON_MOBILE"
    | "WATCH_VIDEO"
    | "WATCH_VIDEO_ON_MOBILE"
    | "STREAM_ON_DESKTOP";

export type QuestTask = PlayOnDesktopTask | WatchVideoTask;

export interface PlayOnDesktopTask {
    type: "PLAY_ON_DESKTOP";
    /** seconds of playtime required */
    target: number;
    applications: { id: string }[];
}

export interface WatchVideoTask {
    type: "WATCH_VIDEO" | "WATCH_VIDEO_ON_MOBILE";
    /** seconds of watch time required */
    target: number;
    assets: {
        video: QuestVideoAsset;
        video_low_res: QuestVideoAsset;
        video_hls: QuestVideoAsset;
    };
    messages: {
        video_title: string;
    };
}

export interface QuestVideoAsset {
    url: string;
    width: number;
    height: number;
    thumbnail: string;
}

export interface QuestRewardsConfig {
    assignment_method: number;
    rewards: QuestReward[];
    rewards_expire_at: string; // ISO 8601
    /** 0 = desktop, etc. — platform enum ids */
    platforms: number[];
}

export interface QuestReward {
    type: number;
    sku_id: string;
    messages: {
        name: string;
        name_with_article: string;
        /** keyed by platform id (as string) */
        redemption_instructions_by_platform: Record<string, string>;
    };
    orb_quantity: number;
    premium_orb_quantity: number;
}

export type QuestSharePolicy = "shareable_everywhere" | (string & {});

export interface QuestCtaConfig {
    link: string;
    button_label: string;
}