interface RestrictedSchedule {
  // shape unknown from module, adjust as needed
  [key: string]: unknown;
}

interface PrimaryGuild {
  identityGuildId?: string;
  identityEnabled?: boolean;
  tag?: string | null;
  badge?: string | null;
}

interface DisplayNameStyles {
  [key: string]: unknown;
}

interface PremiumState {
  premiumSource?: number;
  premiumSubscriptionType?: number;
  premiumSubscriptionGroupRole?: number;
  [key: string]: unknown;
}

interface Perks {
  activePerksBitmask?: number;
  [key: string]: unknown;
}

interface Collectibles {
  nameplate?: unknown;
  [key: string]: unknown;
}

interface StoreCountry {
  country: string;
  setAt: string | null;
  isLocked: boolean;
}

interface AvatarDecorationData {
  [key: string]: unknown;
}

interface User {
  readonly id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  avatarDecorationData: AvatarDecorationData | undefined;
  banner: string | undefined;
  email: string | null;
  verified: boolean;
  bot: boolean;
  system: boolean;
  mfaEnabled: boolean;
  mobile: boolean;
  desktop: boolean;
  premiumType: number | null;
  flags: number;
  publicFlags: number;
  purchasedFlags: number;
  premiumUsageFlags: number;
  phone: string | null;
  nsfwAllowed: boolean | undefined;
  ageVerificationStatus: unknown;
  guildMemberAvatars: Record<string, string | undefined>;
  hasBouncedEmail: boolean;
  personalConnectionId: string | null;
  globalName: string | null;
  primaryGuild: PrimaryGuild | null;
  collectibles: Collectibles | undefined;
  displayNameStyles: DisplayNameStyles | undefined;
  premiumState: PremiumState | undefined;
  perks: Perks | undefined;
  restrictedSchedule: RestrictedSchedule | undefined;
  appTransactionIds: string[] | null;
  storeCountry: StoreCountry | null;

  readonly createdAt: Date;
  readonly tag: string;
  avatarDecoration: AvatarDecorationData | undefined;
  readonly nameplate: unknown;
  readonly premiumGroupRole: number;
  readonly isProvisional: boolean;

  hasFlag(flag: number): boolean;
  isStaff(): boolean;
  isStaffPersonal(): boolean;
  hasAnyStaffLevel(): boolean;
  hasVerifiedEmailOrPhone(): boolean;
  getAvatarURL(guildId?: string, size?: number, canAnimate?: boolean, canWebP?: boolean): string;
  addGuildAvatarHash(guildId: string, hash: string): User;
  removeGuildAvatarHash(guildId: string): User;
  getAvatarSource(guildId?: string, canAnimate?: boolean, size?: number): unknown;
  isClaimed(): boolean;
  isPhoneVerified(): boolean;
  toString(): string;
  hasPurchasedFlag(flag: number): boolean;
  hasPremiumUsageFlag(flag: number): boolean;
  hasHadSKU(sku: string): boolean;
  hasHadPremium(tier?: number | null): boolean;
  hadPremiumSubscription(tier?: number | null): boolean;
  hasFreePremium(): boolean;
  isOnReverseTrial(): boolean;
  isPremiumWithPremiumGroup(): boolean;
  hasPaidTier2Subscription(): boolean;
  isPremiumWithFractionalPremiumOnly(): boolean;
  isFractionalPremiumWithNoStandardSub(): boolean;
  isFractionalPremium(): boolean;
  hasUrgentMessages(): boolean;
  isNonUserBot(): boolean;
  isLocalBot(): boolean;
  isVerifiedBot(): boolean;
  isSystemUser(): boolean;
  hasAvatarForGuild(guildId?: string): boolean;
  hasUniqueUsername(): boolean;
  isPremiumGroupMember(): boolean;
  isPremiumGroupPrimary(): boolean;
}
