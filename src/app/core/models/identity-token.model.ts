import { AuthenticationProvider } from '@etdb/core/models/signin-provider.types';

export interface IdentityToken {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresAt: Date;
    authenticationProvider: AuthenticationProvider;
}
