export interface IdentityToken {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresAt: Date;
}
