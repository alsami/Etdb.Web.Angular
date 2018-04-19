import * as authActions from '../actions/auth.actions';
import { IdentityToken, IdentityUser } from '@etdb/core/models';

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

export function reducer(state = initialState, action: authActions.Actions): AuthState {
    switch (action.type) {
        case authActions.LOGIN: {
            return {
                ...state,
                loading: true
            };
        }

        case authActions.LOGIN_SUCCESS: {
            return {
                ...state,
                identityToken: action.token,
                loading: false,
                loaded: true
            };
        }

        case authActions.LOGIN_FAIL: {
            return {
                identityToken: null,
                identityUser: null,
                loaded: true,
                loading: false
            };
        }

        case authActions.LOGOUT: {
            return {
                ...state,
                identityToken: null,
                identityUser: null
            };
        }

        case authActions.REGISTER: {
            return {
                ...state,
                loading: true
            };
        }

        case authActions.REGISTER_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case authActions.REGISTER_FAIL: {
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }

        case authActions.LOAD_IDENTITY_USER: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case authActions.LOAD_IDENTITY_USER_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false,
                identityUser: action.identityUser
            };
        }

        case authActions.LOAD_IDENTITY_USER_FAIL: {
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
