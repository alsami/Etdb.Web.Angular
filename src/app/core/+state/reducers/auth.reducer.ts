import { AuthActions } from '@etdb/core/+state/actions';
import { IdentityToken, IdentityUser } from '@etdb/core/models';
import { CredentialSignIn, ProviderSignIn } from '@etdb/core/+state/actions/auth.actions';

export interface AuthState {
    identityToken: IdentityToken;
    authenticatedUser: IdentityUser;
    authenticating: boolean;
    loadingAuthenticatedUser: boolean;
    authenticated: boolean;
    loading: boolean;
    loaded: boolean;
    registering: boolean;
    googleAuthAvailable: boolean;
    facebookAuthAvailable: boolean;
}

const initialState: AuthState = {
    identityToken: null,
    authenticatedUser: null,
    authenticating: false,
    loadingAuthenticatedUser: false,
    authenticated: false,
    loading: false,
    loaded: true,
    registering: false,
    googleAuthAvailable: false,
    facebookAuthAvailable: false,
};

export function reducer(
    state = initialState,
    action: AuthActions.AuthActionUnion
): AuthState {
    switch (action.type) {
        case AuthActions.AuthActionTypes.CredentialSignIn:
        case AuthActions.AuthActionTypes.ProviderSignIn: {
            return {
                ...state,
                identityToken: null,
                authenticatedUser: null,
                loading: true,
                authenticating: action instanceof CredentialSignIn,
                registering: action instanceof ProviderSignIn
            };
        }

        case AuthActions.AuthActionTypes.RestoreAuthentication: return {
            ...state,
            authenticating: action.emitAuthenticationState,
        };

        case AuthActions.AuthActionTypes.RestoreAuthenticationCompleted: return {
            ...state,
            authenticating: false
        };

        case AuthActions.AuthActionTypes.Authenticated: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                authenticated: true,
                loaded: true,
                registering: false
            };
        }

        case AuthActions.AuthActionTypes.AuthenticationFailed: {
            return {
                ...state,
                loaded: true,
                loading: false,
                authenticating: false
            };
        }

        case AuthActions.AuthActionTypes.SignOut: {
            return {
                ...state,
                authenticated: false,
                identityToken: null,
                authenticatedUser: null
            };
        }

        case AuthActions.AuthActionTypes.Register: {
            return {
                ...state,
                loading: true,
                registering: true,
            };
        }

        case AuthActions.AuthActionTypes.Registered: {
            return {
                ...state,
                loaded: true,
                loading: false,
                registering: false,
            };
        }

        case AuthActions.AuthActionTypes.RegisterFailed: {
            return {
                ...state,
                loaded: true,
                loading: false,
                registering: false,
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoad: {
            return {
                ...state,
                loaded: false,
                loading: true,
                loadingAuthenticatedUser: true,
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoaded: {
            return {
                ...state,
                loaded: true,
                loading: false,
                loadingAuthenticatedUser: false,
                authenticating: false,
                authenticatedUser: action.identityUser
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoadFailed: {
            return {
                ...state,
                loadingAuthenticatedUser: false,
                authenticating: false,
                loading: false,
                loaded: true,
                authenticated: false
            };
        }

        case AuthActions.AuthActionTypes.SetGoogleAuthAvailable: {
            return {
                ...state,
                googleAuthAvailable: action.available
            };
        }

        case AuthActions.AuthActionTypes.SetFacebookAuthAvailable: {
            return {
                ...state,
                facebookAuthAvailable: action.available
            };
        }

        default:
            return state;
    }
}

export const identityToken = (state: AuthState) => state.identityToken;
export const authenticatedUser = (state: AuthState) => state.authenticatedUser;
export const loadingAuthenticatedUser = (state: AuthState) => state.loadingAuthenticatedUser;
export const authenticating = (state: AuthState) => state.authenticating;
export const authenticated = (state: AuthState) => state.authenticated;
export const loading = (state: AuthState) => state.loading;
export const loaded = (state: AuthState) => state.loaded;
export const registering = (state: AuthState) => state.registering;
export const googleAuthAvailable = (state: AuthState) => state.googleAuthAvailable;
export const facebookAuthAvailable = (state: AuthState) => state.facebookAuthAvailable;
