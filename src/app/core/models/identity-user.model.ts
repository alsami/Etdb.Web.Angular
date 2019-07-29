import { AuthenticationProvider } from '@etdb/core/models';

export interface IdentityUser {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    userName: string;
    fullName: string;
    role: string[];
    profileImageUrl: string;
    authenticationProvider: AuthenticationProvider;
}
