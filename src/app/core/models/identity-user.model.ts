import { SignInProviderTypes } from '@etdb/core/models';

export interface IdentityUser {
    email: string;
    family_name: string;
    given_name: string;
    preferred_username: string;
    name: string;
    role: string[];
    sub: string;
    picture: string;
    idp: SignInProviderTypes;
}
