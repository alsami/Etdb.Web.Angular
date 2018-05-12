import { AuthActionTypes, AuthActions } from '@etdb/core/actions/auth.actions';
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
    loaded: false,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                ...initialState,
                loading: true
            };
        }

        case AuthActionTypes.LoggedIn: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                loggedIn: true,
                loaded: true
            };
        }

        case AuthActionTypes.LoginFailed: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActionTypes.Logout: {
            return {
                ...state,
                loggedIn: false,
                identityToken: null,
                identityUser: null
            };
        }

        case AuthActionTypes.RestoreCompleted: {
            return {
                ...state,
                loaded: true
            };
        }

        case AuthActionTypes.Register: {
            return {
                ...state,
                loading: true
            };
        }

        case AuthActionTypes.Registered: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActionTypes.RegisterFailed: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case AuthActionTypes.IdentityUserLoad: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        case AuthActionTypes.IdentityUserLoaded: {
            return {
                ...state,
                loaded: true,
                loading: false,
                identityUser: action.identityUser
            };
        }

        case AuthActionTypes.IdentityUserLoadFailed: {
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
export const loggedIn = (state: AuthState) => state.loggedIn;
export const loading = (state: AuthState) => state.loading;
export const loaded = (state: AuthState) => state.loaded;
