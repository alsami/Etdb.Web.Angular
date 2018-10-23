import { User } from '@etdb/models';
import { UserActionTypes, UserActions } from '@etdb/users/actions/user.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    selectedUser: User;
    fetching: boolean;
    updating: boolean;
}

export const adapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName)
});

export const initialState: UserState = adapter.getInitialState({
    selectedUser: null,
    selectedId: null,
    fetching: false,
    updating: false
});

export function reducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case UserActionTypes.Load: {
            return {
                ...state,
                fetching: true
            };
        }
        case UserActionTypes.UpdateUserName:
        case UserActionTypes.UploadProfileImage:
        case UserActionTypes.UpdatePassword:
        case UserActionTypes.UpdateProfileInfo: {
            return {
                ...state,
                updating: true
            };
        }

        case UserActionTypes.Loaded:
        case UserActionTypes.UploadedProfileImage: {
            return {
                ...adapter.upsertOne(action.user, state),
                selectedUser: action.user,
                selectedId: action.user.id,
                fetching: false,
                updating: false
            };
        }

        case UserActionTypes.UpdatedPassword: {
            return {
                ...state,
                updating: false
            };
        }

        case UserActionTypes.UpdatedProfileInfo: {
            const user = state.entities[action.id];

            user.firstName = action.profileInfoChange.firstName;
            user.name = action.profileInfoChange.name;
            user.biography = action.profileInfoChange.biography;

            return {
                ...adapter.upsertOne(user, state),
                updating: false
            };
        }

        case UserActionTypes.LoadFailed:
        case UserActionTypes.UpdateUserNameFailed:
        case UserActionTypes.UploadProfileImageFailed:
        case UserActionTypes.UpdatePasswordFailed:
        case UserActionTypes.UpdateProfileInfoFailed: {
            console.log(action.error);
            return {
                ...state,
                fetching: false,
                updating: false
            };
        }

        default: {
            return state;
        }
    }
}

export const selectedId = (state: UserState) => state.selectedId;
export const fetching = (state: UserState) => state.fetching;
export const updating = (state: UserState) => state.updating;
