import * as fromRoot from '@etdb/reducers';
import * as fromUser from '@etdb/users/reducers/user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

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

export const getUserLoading = createSelector(
    getUserEntitiesState,
    fromUser.loading
);
