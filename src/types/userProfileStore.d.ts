type Snowflake = string;

interface Collectible {
    skuId: string;
    type: number;
    expiresAt?: Date;
}

interface ProfileEffect {
    skuId: string;
    expiresAt?: number; // unix seconds
}

interface ProfileFrame {
    skuId: string;
    type: number;
    expiresAt?: Date;
}

interface ConnectedAccount {
    type: string;
    id: string;
    name: string;
    verified: boolean;
    [key: string]: unknown;
}

interface ApplicationRoleConnection {
    [key: string]: unknown;
}

interface ApplicationProfile {
    id: Snowflake;
    primarySkuId?: Snowflake;
    customInstallUrl?: string;
    installParams?: unknown;
    integrationTypesConfig?: unknown;
    flags: number;
    popularApplicationCommandIds?: Snowflake[];
    storefront_available?: boolean;
    name: string;
    termsOfServiceUrl?: string;
    privacyPolicyUrl?: string;
}

interface Badge {
    id: string;
    description?: string;
    icon?: string;
    link?: string;
    [key: string]: unknown;
}

interface GameEntry {
    applicationId: Snowflake;
    comment?: string;
    tags?: string[];
}

interface GamesWidget {
    id: string;
    type: 1 | 2 | 3 | 4; // CURRENT_GAMES | FAVORITE_GAMES | PLAYED_GAMES | WANT_TO_PLAY_GAMES
    games: GameEntry[];
}

interface ApplicationWidget {
    id: string;
    type: number; // APPLICATION
    applicationId: Snowflake;
}

interface PersonalWidget {
    id: string;
    type: number; // PERSONAL
    header?: unknown;
    sections: unknown;
}

interface ClipEntry {
    status: "saved";
    id: string;
    fileId: string;
    gameId: Snowflake;
    title?: string;
    tags?: string[];
}

interface ClipsGalleryWidget {
    id: string;
    type: number; // CLIPS_GALLERY
    clips: ClipEntry[];
}

type ProfileWidget = GamesWidget | ApplicationWidget | PersonalWidget | ClipsGalleryWidget;

interface WishlistSetting {
    [key: string]: unknown;
}

interface UserProfile {
    userId: Snowflake;
    collectibles?: Collectible[];
    profileEffect?: ProfileEffect;
    profileFrame?: ProfileFrame;
    banner?: string | null;
    accentColor?: number | null;
    themeColors?: number[] | null;
    popoutAnimationParticleType?: unknown;
    bio: string;
    pronouns: string;
    connectedAccounts: ConnectedAccount[];
    applicationRoleConnections: ApplicationRoleConnection[];
    premiumSince: Date | null;
    premiumType: number | null;
    premiumGuildSince: Date | null;
    fetchStartedAt: number;
    fetchEndedAt: number;
    fetchError?: unknown;
    legacyUsername: string | null;
    application: ApplicationProfile | null;
    badges: Badge[];
    widgets?: ProfileWidget[];
    wishlistSettings?: Record<string, WishlistSetting>;
    private?: unknown;
}

interface GuildMemberProfile {
    userId: Snowflake;
    guildId: Snowflake;
    collectibles?: Collectible[];
    profileEffect?: ProfileEffect;
    profileFrame?: ProfileFrame;
    banner?: string | null;
    accentColor?: number | null;
    themeColors?: number[] | null;
    popoutAnimationParticleType?: unknown;
    bio: string;
    pronouns: string;
    badges: Badge[];
    fetchStartedAt: number;
    fetchEndedAt: number;
    fetchError?: unknown;
}

interface MutualFriendEntry {
    key: Snowflake;
    user: unknown; // BD User instance
    status: unknown;
}

interface MutualGuildEntry {
    guild: unknown; // Guild instance
    nick?: string;
}
