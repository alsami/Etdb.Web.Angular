import { User } from '@etdb/models';
import { UserActions, UserActionTypes } from '@etdb/users/actions/user.actions';
import * as userActions from '@etdb/users/actions/user.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    selectedUser: User;
    fetching: boolean;
    userNameUpdating: boolean;
    profileImageUpdating: boolean;
    profileInfoUpdating: boolean;
    passwordUpdating: boolean;
}

export const adapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName)
});

export const initialState: UserState = adapter.getInitialState({
    selectedUser: null,
    selectedId: null,
    fetching: false,
    userNameUpdating: false,
    profileImageUpdating: false,
    profileInfoUpdating: false,
    passwordUpdating: false
});

export function reducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case UserActionTypes.Load:
        case UserActionTypes.UpdateUserName:
        case UserActionTypes.UploadProfileImage:
        case UserActionTypes.UpdateProfileInfo:
        case UserActionTypes.UpdatePassword:
        case UserActionTypes.RemoveProfileImage: {
            return {
                ...state,
                fetching: action instanceof userActions.Load,
                userNameUpdating: action instanceof userActions.UpdateUserName,
                profileImageUpdating:
                    action instanceof userActions.UploadProfileImage ||
                    action instanceof userActions.RemoveProfileImage,
                profileInfoUpdating:
                    action instanceof userActions.UpdateProfileInfo,
                passwordUpdating: action instanceof userActions.UpdatePassword
            };
        }

        case UserActionTypes.Loaded: {
            return {
                ...adapter.upsertOne(action.user, state),
                selectedUser: action.user,
                selectedId: action.user.id,
                fetching: false
            };
        }

        case UserActionTypes.UploadedProfileImage: {
            const user = state.entities[action.userId];
            if (!user.profileImageMetaInfos) { user.profileImageMetaInfos = []; }
            user.profileImageMetaInfos.push(action.profileImageMeta);

            return {
                ...adapter.upsertOne(user, state),
                selectedUser: user,
                selectedId: user.id,
                profileImageUpdating: false
            };
        }

        case UserActionTypes.RemovedProfileImage: {
            const user = state.entities[action.userId];
            user.profileImageMetaInfos = user.profileImageMetaInfos.filter(
                meta => meta.url !== action.url
            );
            return {
                ...adapter.upsertOne(user, state),
                profileImageUpdating: false
            };
        }

        case UserActionTypes.UpdatedPassword: {
            return {
                ...state,
                passwordUpdating: false
            };
        }

        case UserActionTypes.UpdatedProfileInfo: {
            const user = state.entities[action.id];

            user.firstName = action.profileInfoChange.firstName;
            user.name = action.profileInfoChange.name;
            user.biography = action.profileInfoChange.biography;

            return {
                ...adapter.upsertOne(user, state),
                profileInfoUpdating: false
            };
        }

        case UserActionTypes.LoadFailed:
        case UserActionTypes.UpdateUserNameFailed:
        case UserActionTypes.UploadProfileImageFailed:
        case UserActionTypes.UpdateProfileInfoFailed:
        case UserActionTypes.UpdatePasswordFailed:
        case UserActionTypes.RemoveProfileImageFailed: {
            return {
                ...state,
                fetching:
                    action instanceof userActions.LoadFailed
                        ? false
                        : state.fetching,
                userNameUpdating:
                    action instanceof userActions.UpdateUserNameFailed
                        ? false
                        : state.userNameUpdating,
                profileImageUpdating:
                    action instanceof userActions.UploadProfileImageFailed ||
                        action instanceof userActions.RemoveProfileImageFailed
                        ? false
                        : state.profileImageUpdating,
                profileInfoUpdating:
                    action instanceof userActions.UpdateProfileInfoFailed
                        ? false
                        : state.profileInfoUpdating,
                passwordUpdating:
                    action instanceof userActions.UpdatePasswordFailed
                        ? false
                        : state.passwordUpdating
            };
        }

        default: {
            return state;
        }
    }
}

export const selectedId = (state: UserState) => state.selectedId;

export const fetching = (state: UserState) => state.fetching;

export const userNameUpdating = (state: UserState) => state.userNameUpdating;

export const profileImageUpdating = (state: UserState) =>
    state.profileImageUpdating;

export const profileInfoUpdating = (state: UserState) =>
    state.profileInfoUpdating;

export const passwordUpdating = (state: UserState) => state.passwordUpdating;
