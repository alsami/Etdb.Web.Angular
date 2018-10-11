import { User } from '@etdb/models';
import { UserActionTypes, UserActions } from '@etdb/users/actions/user.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    selectedUser: User;
    loading: boolean;
}

export const adapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName)
});

export const initialState: UserState = adapter.getInitialState({
    selectedUser: null,
    selectedId: null,
    loading: false
});

export function reducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case UserActionTypes.Load:
        case UserActionTypes.UpdatedUserName:
        case UserActionTypes.UploadProfileImage:
        case UserActionTypes.UpdatePassword: {
            return {
                ...state,
                loading: true
            };
        }

        case UserActionTypes.Loaded:
        case UserActionTypes.UploadedProfileImage: {
            return {
                ...adapter.addOne(
                    action.user,
                    adapter.removeOne(action.user.id, state)
                ),
                selectedUser: action.user,
                selectedId: action.user.id,
                loading: false
            };
        }

        case UserActionTypes.UpdatedPassword: {
            return {
                ...state,
                loading: false
            };
        }

        case UserActionTypes.LoadFailed:
        case UserActionTypes.UpdateUserNameFailed:
        case UserActionTypes.UploadProfileImageFailed:
        case UserActionTypes.UpdatePasswordFailed: {
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

export const selectedId = (state: UserState) => state.selectedId;
export const loading = (state: UserState) => state.loading;
