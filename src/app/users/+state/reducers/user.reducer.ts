import { User } from '@etdb/models';
import { UserActions, UserActionTypes } from '@etdb/users/+state/actions/user.actions';
import * as userActions from '@etdb/users/+state/actions/user.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    selectedUser: User;
    fetching: boolean;
    userNameUpdating: boolean;
    removingProfileImage: boolean;
    profileInfoUpdating: boolean;
    updatingPassword: boolean;
    markingPrimaryProfileImage: boolean;
    changingUserName: boolean;
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
    removingProfileImage: false,
    profileInfoUpdating: false,
    updatingPassword: false,
    markingPrimaryProfileImage: false,
    changingUserName: false,
    loaded: false,
});

export function reducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case UserActionTypes.Load:
        case UserActionTypes.ChangeUserName:
        case UserActionTypes.UpdateProfileInfo:
        case UserActionTypes.UpdatePassword:
        case UserActionTypes.RemoveProfileImage:
        case UserActionTypes.MarkPrimaryProfileImage:
        case UserActionTypes.ChangeUserName: {
            return {
                ...state,
                fetching: action instanceof userActions.Load,
                userNameUpdating: action instanceof userActions.ChangeUserName,
                removingProfileImage: action instanceof userActions.RemoveProfileImage,
                profileInfoUpdating:
                    action instanceof userActions.UpdateProfileInfo,
                updatingPassword: action instanceof userActions.UpdatePassword,
                markingPrimaryProfileImage: action instanceof userActions.MarkPrimaryProfileImage,
                changingUserName: action instanceof userActions.ChangeUserName,
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

        case UserActionTypes.UploadedProfileImages: {
            const user = state.entities[action.userId];

            const mutatedUser = {
                ...{},
                ...user,
                profileImageMetaInfos: user.profileImageMetaInfos.slice().concat(action.profileImageMetainfos)
            }

            return {
                ...adapter.upsertOne(mutatedUser, state),
                selectedUser: mutatedUser,
                selectedId: mutatedUser.id,
            };
        }

        case UserActionTypes.RemovedProfileImage: {
            const user = state.entities[action.userId];
            const images = user
                            .profileImageMetaInfos
                            .slice()
                            .filter(meta => meta.url !== action.url
            );
            return {
                ...adapter.upsertOne({...{}, ...user, profileImageMetaInfos: images}, state),
                removingProfileImage: false
            };
        }

        case UserActionTypes.ReportUploadProgress: {
            return {
                ...state,
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

            return {
                ...adapter.upsertOne({
                    ...user,
                    firstName: action.profileInfoChange.firstName,
                    name: action.profileInfoChange.name,
                    biography: action.profileInfoChange.biography
                }, state),
                profileInfoUpdating: false
            };
        }

        case UserActionTypes.MarkedPrimaryProfileImage: {
            const user = state.entities[action.userId];

            const imageMetas = user
                .profileImageMetaInfos
                .map(meta => ({...{}, ...meta}));

            imageMetas.forEach(meta => meta.isPrimary = meta.id === action.id);

            return {
                ...adapter.upsertOne({
                    ...user,
                    profileImageMetaInfos: imageMetas
                }, state),
                markingPrimaryProfileImage: false
            };
        }

        case UserActionTypes.ChangedUserName: {
            const user = {
                ...{},
                ...state.entities[action.data.id],
                userName: action.data.userName
            }

            return {
                ...adapter.upsertOne(user, state),
                changingUserName: false
            };
        }

        case UserActionTypes.LoadFailed:
        case UserActionTypes.ChangeUserNameFailed:
        case UserActionTypes.UploadProfileImagesFailed:
        case UserActionTypes.UpdateProfileInfoFailed:
        case UserActionTypes.UpdatePasswordFailed:
        case UserActionTypes.RemoveProfileImageFailed:
        case UserActionTypes.MarkPrimaryProfileImageFailed:
        case UserActionTypes.ChangeUserNameFailed: {
            return {
                ...state,
                fetching:
                    action instanceof userActions.LoadFailed
                        ? false
                        : state.fetching,
                userNameUpdating:
                    action instanceof userActions.ChangeUserNameFailed
                        ? false
                        : state.userNameUpdating,
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
                        : state.updatingPassword,
                markingPrimaryProfileImage:
                    action instanceof userActions.MarkPrimaryProfileImageFailed
                        ? false
                        : state.markingPrimaryProfileImage,
                changingUserName:
                    action instanceof userActions.ChangeUserNameFailed
                        ? false
                        : state.changingUserName
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

export const removingProfileImage = (state: UserState) =>
    state.removingProfileImage;

export const profileInfoUpdating = (state: UserState) =>
    state.profileInfoUpdating;

export const updatingPassword = (state: UserState) => state.updatingPassword;

export const loaded = (state: UserState) => state.loaded;

export const markingPrimaryProfileImage = (state: UserState) => state.markingPrimaryProfileImage;

export const changingUserName = (state: UserState) => state.changingUserName;
