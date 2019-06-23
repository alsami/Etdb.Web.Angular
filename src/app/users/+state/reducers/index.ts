import * as fromRoot from '@etdb/+state';
import * as fromUser from '@etdb/users/+state/reducers/user.reducer';
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

export interface UsersState {
    users: fromUser.UserState;
}

export interface State extends fromRoot.AppState {
    users: UsersState;
}

export const reducers: ActionReducerMap<UsersState> = {
    users: fromUser.reducer
};

export const getUsersState = createFeatureSelector<UsersState>('users');

export const getUserEntitiesState = createSelector(
    getUsersState,
    state => state.users
);

export const getSelectedUserId = createSelector(
    getUserEntitiesState,
    fromUser.selectedId
);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers
} = fromUser.adapter.getSelectors(getUserEntitiesState);

export const getSelectedUser = createSelector(
    getUserEntities,
    getSelectedUserId,
    (entities, selectedId) => selectedId && entities[selectedId]
);

export const getUserFetching = createSelector(
    getUserEntitiesState,
    fromUser.fetching
);

export const getUserNameUpdating = createSelector(
    getUserEntitiesState,
    fromUser.userNameUpdating
);

export const getUploadingProfileImage = createSelector(
    getUserEntitiesState,
    fromUser.uploadingProfileImage
);

export const getRemovingProfileImage = createSelector(
    getUserEntitiesState,
    fromUser.removingProfileImage
);

export const getMarkingPrimaryProfileImage = createSelector(
    getUserEntitiesState,
    fromUser.markingPrimaryProfileImage
);

export const getUpdatingProfileInfo = createSelector(
    getUserEntitiesState,
    fromUser.profileInfoUpdating
);

export const getUpdatingPassword = createSelector(
    getUserEntitiesState,
    fromUser.updatingPassword
);

export const getSelectedUserIsAuthenticatedUser = createSelector(
    fromRoot.getAuthenticatedUser,
    getSelectedUser,
    (identityUser, selectedUser) =>
        identityUser !== null &&
        selectedUser !== null &&
        identityUser.id === selectedUser.id
);

export const getUserLoaded = createSelector(
    getUserEntitiesState,
    fromUser.loaded
);
