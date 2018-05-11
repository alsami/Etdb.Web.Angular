import { User } from '@etdb/models';
import { UserActionTypes, UserActions } from '@etdb/users/actions/user.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectUserId: string | null;
    loading: boolean;
}

export const adapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName),
});

export const initialState: UserState = adapter.getInitialState({
    selectUser: null,
    selectUserId: null,
    loading: false,
});

export function reducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case (UserActionTypes.Load):
        case (UserActionTypes.UpdatedUserName): {
            return {
                ...state,
                loading: true
            };
        }

        case (UserActionTypes.Loaded): {
            return {
                ...adapter.removeOne(action.user.id, state),
                loading: false
            };
        }

        case (UserActionTypes.LoadFailed):
        case (UserActionTypes.UpdateUserNameFailed): {
            return {
                ...state,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}

export const selectedId = (state: UserState) => state.selectUserId;
export const loading = (state: UserState) => state.loading;
