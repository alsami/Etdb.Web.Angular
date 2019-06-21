import { User } from '@etdb/models';
import { UserActions, UserActionTypes } from '@etdb/users/+state/actions/user.actions';
import * as userActions from '@etdb/users/+state/actions/user.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    selectedUser: User;
    fetching: boolean;
    userNameUpdating: boolean;
    uploadingProfileImage: boolean;
    removingProfileImage: boolean;
    profileInfoUpdating: boolean;
    updatingPassword: boolean;
    loaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName)
});

export const initialState: UserState = adapter.getInitialState({
    selectedUser: null,
    selectedId: null,
    fetching: false,
    userNameUpdating: false,
    uploadingProfileImage: false,
    removingProfileImage: false,
    profileInfoUpdating: false,
    updatingPassword: false,
    loaded: false,
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
                uploadingProfileImage:
                    action instanceof userActions.UploadProfileImage,
                removingProfileImage: action instanceof userActions.RemoveProfileImage,
                profileInfoUpdating:
                    action instanceof userActions.UpdateProfileInfo,
                updatingPassword: action instanceof userActions.UpdatePassword,
                loaded: action instanceof userActions.Load ? false : state.loaded,
            };
        }

        case UserActionTypes.Loaded: {
            return {
                ...adapter.upsertOne(action.user, state),
                selectedUser: action.user,
                selectedId: action.user.id,
                fetching: false,
                loaded: true,
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
                uploadingProfileImage: false
            };
        }

        case UserActionTypes.RemovedProfileImage: {
            const user = state.entities[action.userId];
            user.profileImageMetaInfos = user.profileImageMetaInfos.filter(
                meta => meta.url !== action.url
            );
            return {
                ...adapter.upsertOne(user, state),
                removingProfileImage: false
            };
        }

        case UserActionTypes.UpdatedPassword: {
            return {
                ...state,
                updatingPassword: false
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
                uploadingProfileImage:
                    action instanceof userActions.UploadProfileImageFailed
                        ? false
                        : state.uploadingProfileImage,
                removingProfileImage:
                    action instanceof userActions.RemoveProfileImageFailed
                        ? false
                        : state.removingProfileImage,
                profileInfoUpdating:
                    action instanceof userActions.UpdateProfileInfoFailed
                        ? false
                        : state.profileInfoUpdating,
                updatingPassword:
                    action instanceof userActions.UpdatePasswordFailed
                        ? false
                        : state.updatingPassword
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

export const uploadingProfileImage = (state: UserState) =>
    state.uploadingProfileImage;

export const removingProfileImage = (state: UserState) =>
    state.removingProfileImage;

export const profileInfoUpdating = (state: UserState) =>
    state.profileInfoUpdating;

export const updatingPassword = (state: UserState) => state.updatingPassword;

export const loaded = (state: UserState) => state.loaded;
