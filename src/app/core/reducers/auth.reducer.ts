import { AuthActions } from '@etdb/core/actions/';
import { IdentityToken, IdentityUser } from '@etdb/core/models';

export interface AuthState {
    identityToken: IdentityToken;
    identityUser: IdentityUser;
    loggedIn: boolean;
    loading: boolean;
    loaded: boolean;
}

const initialState: AuthState = {
    identityToken: null,
    identityUser: null,
    loggedIn: false,
    loading: false,
    loaded: false
};

export function reducer(
    state = initialState,
    action: AuthActions.AuthActionUnion
): AuthState {
    switch (action.type) {
        case AuthActions.AuthActionTypes.CredentialSignIn:
        case AuthActions.AuthActionTypes.ProviderSignIn: {
            return {
                ...initialState,
                loading: true
            };
        }

        case AuthActions.AuthActionTypes.SignedIn: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                loggedIn: true,
                loaded: true
            };
        }

        case AuthActions.AuthActionTypes.SignInFailed: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActions.AuthActionTypes.SignOut: {
            return {
                ...state,
                loggedIn: false,
                identityToken: null,
                identityUser: null
            };
        }

        case AuthActions.AuthActionTypes.RestoreCompleted: {
            return {
                ...state,
                loaded: true
            };
        }

        case AuthActions.AuthActionTypes.Register: {
            return {
                ...state,
                loading: true
            };
        }

        case AuthActions.AuthActionTypes.Registered: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActions.AuthActionTypes.RegisterFailed: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoad: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoaded: {
            return {
                ...state,
                loaded: true,
                loading: false,
                identityUser: action.identityUser
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoadFailed: {
            return {
                ...state,
                loading: false,
                loaded: true,
                loggedIn: false
            };
        }

        default:
            return state;
    }
}

export const identityToken = (state: AuthState) => state.identityToken;
export const identityUser = (state: AuthState) => state.identityUser;
export const signedIn = (state: AuthState) => state.loggedIn;
export const loading = (state: AuthState) => state.loading;
export const loaded = (state: AuthState) => state.loaded;
