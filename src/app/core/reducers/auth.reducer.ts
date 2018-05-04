import { IdentityToken, IdentityUser } from '@etdb/core/models';
import { AuthActionTypes, AuthActions } from '@etdb/core/actions/auth.actions';

export interface AuthState {
    identityToken: IdentityToken;
    identityUser: IdentityUser;
    loading: boolean;
    loaded: boolean;
  }

const initialState: AuthState = {
  identityToken: null,
  identityUser: null,
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                ...state,
                loading: true
            };
        }

        case AuthActionTypes.LoggedIn: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                loaded: true
            };
        }

        case AuthActionTypes.LoginFailed: {
            return {
                identityToken: null,
                identityUser: null,
                loaded: true,
                loading: false
            };
        }

        case AuthActionTypes.Logout: {
            return {
                ...state,
                identityToken: null,
                identityUser: null
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
                loaded: false
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
                loaded: true
            };
        }

        default:
            return state;
    }
  }


export const identityToken = (state: AuthState) => state.identityToken;
export const identityUser = (state: AuthState) => state.identityUser;
export const loading = (state: AuthState) => state.loading;
export const loaded = (state: AuthState) => state.loaded;
