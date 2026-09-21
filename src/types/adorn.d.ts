export type Role = "user" | "moderator";

export type AdornmentStatus = "pending" | "approved" | "rejected";

export type AdornmentType = "decoration" | "profile_frame" | "profile_effect" | "nameplate";

export interface User {
    id: string;
    discordId: string;
    username: string;
    globalName: string | null;
    avatar: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewUser {
    id?: string;
    discordId: string;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
    role?: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OAuthAccount {
    id: string;
    userId: string;
    provider: string;
    accessToken: string;
    refreshToken: string;
    scope: string | null;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewOAuthAccount {
    id?: string;
    userId: string;
    provider?: string;
    accessToken: string;
    refreshToken: string;
    scope?: string | null;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OAuthState {
    state: string;
    redirectUri: string | null;
    createdAt: Date;
}

export interface NewOAuthState {
    state: string;
    redirectUri?: string | null;
    createdAt?: Date;
}

export interface Session {
    token: string;
    userId: string;
    createdAt: Date;
    lastUsedAt: Date;
}

export interface NewSession {
    token: string;
    userId: string;
    createdAt?: Date;
    lastUsedAt?: Date;
}

export interface Adornment {
    id: string;
    ownerId: string;
    type: AdornmentType;
    originalFilename: string;
    storedName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    status: AdornmentStatus;
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewAdornment {
    id?: string;
    ownerId: string;
    type: AdornmentType;
    originalFilename: string;
    storedName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    status?: AdornmentStatus;
    rejectionReason?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserWithAdornments extends User {
    adornments: Adornment[];
}

export interface UserWithOAuthAccount extends User {
    oauthAccount: OAuthAccount | null;
}

export interface AdornmentWithOwner extends Adornment {
    owner: User;
}

export interface AdornmentWithReviewer extends Adornment {
    reviewer: User | null;
}