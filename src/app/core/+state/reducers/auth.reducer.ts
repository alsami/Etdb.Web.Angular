import { AuthActions } from '@etdb/core/+state/actions';
import { IdentityToken, IdentityUser } from '@etdb/core/models';
import { CredentialSignIn, ProviderSignIn } from '@etdb/core/+state/actions/auth.actions';

export interface AuthState {
    identityToken: IdentityToken;
    identityUser: IdentityUser;
    signingIn: boolean;
    identityUserLoading: boolean;
    signedIn: boolean;
    loading: boolean;
    loaded: boolean;
    registering: boolean;
}

const initialState: AuthState = {
    identityToken: null,
    identityUser: null,
    signingIn: false,
    identityUserLoading: false,
    signedIn: false,
    loading: false,
    loaded: true,
    registering: false,
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
                loading: true,
                signingIn: action instanceof CredentialSignIn,
                registering: action instanceof ProviderSignIn
            };
        }

        case AuthActions.AuthActionTypes.RestoreSignIn: return {
            ...state,
            signingIn: true,
        };

        case AuthActions.AuthActionTypes.RestoreCompleted: return {
            ...state,
            signingIn: false
        };

        case AuthActions.AuthActionTypes.SignedIn: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                signedIn: true,
                loaded: true
            };
        }

        case AuthActions.AuthActionTypes.SignInFailed: {
            return {
                ...state,
                loaded: true,
                loading: false,
                signingIn: false
            };
        }

        case AuthActions.AuthActionTypes.SignOut: {
            return {
                ...state,
                signedIn: false,
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
                identityUserLoading: true,
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoaded: {
            return {
                ...state,
                loaded: true,
                loading: false,
                identityUserLoading: false,
                signingIn: false,
                identityUser: action.identityUser
            };
        }

        case AuthActions.AuthActionTypes.IdentityUserLoadFailed: {
            return {
                ...state,
                identityUserLoading: false,
                signingIn: false,
                loading: false,
                loaded: true,
                signedIn: false
            };
        }

        default:
            return state;
    }
}

export const identityToken = (state: AuthState) => state.identityToken;
export const identityUser = (state: AuthState) => state.identityUser;
export const identityUserLoading = (state: AuthState) => state.identityUserLoading;
export const signingIn = (state: AuthState) => state.signingIn;
export const signedIn = (state: AuthState) => state.signedIn;
export const loading = (state: AuthState) => state.loading;
export const loaded = (state: AuthState) => state.loaded;
export const registering = (state: AuthState) => state.registering;
