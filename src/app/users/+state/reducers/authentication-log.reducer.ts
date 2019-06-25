import { AuthenticationLog } from '@etdb/models';
import { AuthenticationLogActions } from '@etdb/users/+state/actions';

export interface AuthenticationLogState {
    loadingAuthenticationLogs: boolean;
    authenticationLogs: AuthenticationLog[];
}

const inialState: AuthenticationLogState = {
    loadingAuthenticationLogs: false,
    authenticationLogs: [],
};

export function reducer(state: AuthenticationLogState = inialState,
    action: AuthenticationLogActions.AuthenticationLogActions): AuthenticationLogState {
    switch (action.type) {
        case AuthenticationLogActions.AuthenticationLogActionTypes.Load: {
            return {
                ...state,
                loadingAuthenticationLogs: true,
                authenticationLogs: []
            };
        }

        case AuthenticationLogActions.AuthenticationLogActionTypes.LoadFailed: {
            return {
                ...state,
                loadingAuthenticationLogs: false
            };
        }

        case AuthenticationLogActions.AuthenticationLogActionTypes.Loaded: {
            return {
                ...state,
                loadingAuthenticationLogs: false,
                authenticationLogs: action.authenticationLogs,
            };
        }

        default: return state;
    }
}

export const loadingAuthenticationLogs = (state: AuthenticationLogState) => state.loadingAuthenticationLogs;

export const authenticationLogs = (state: AuthenticationLogState) => state.authenticationLogs;
