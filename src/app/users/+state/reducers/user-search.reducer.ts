import { UserSearchActions, UserSearchActionTypes } from '@etdb/users/+state/actions/user-search.actions';

export interface UserSearchState {
    checkingUserNameAvailability: boolean;
    userNameAvailable: boolean;
    userNameAvailibilityCheckCompleted: boolean;
}

const initialState: UserSearchState = {
    checkingUserNameAvailability: false,
    userNameAvailable: false,
    userNameAvailibilityCheckCompleted: false,
};

export function reducer(state: UserSearchState = initialState,
    action: UserSearchActions) {
    switch (action.type) {
        case UserSearchActionTypes.AvailabilityCheck: return {
            ...initialState,
            checkingUserNameAvailability: true
        };

        case UserSearchActionTypes.AvailabilityCheckFailed: return {
            ...state,
            initialState,
            checkingUserNameAvailability: false,
            userNameAvailibilityCheckCompleted: true,
        };

        case UserSearchActionTypes.AvailabilityChecked: return {
            ...state,
            checkingUserNameAvailability: false,
            userNameAvailable: action.data.available,
            userNameAvailibilityCheckCompleted: true,
        };

        default: return state;
    }
}

export const userNameAvailibilityCheckCompleted = (state: UserSearchState) => state.userNameAvailibilityCheckCompleted;

export const checkingUserNameAvailability = (state: UserSearchState) => state.checkingUserNameAvailability;

export const userNameAvailable = (state: UserSearchState) => state.userNameAvailable;
