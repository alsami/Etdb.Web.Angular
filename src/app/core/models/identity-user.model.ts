import { AuthenticationProvider } from '@etdb/core/models';

export interface IdentityUser {
    id: string;
    emails: string;
    lastName: string;
    firstName: string;
    userName: string;
    fullName: string;
    role: string[];
    profileImageUrl: string;
    authenticationProvider: AuthenticationProvider;
}
