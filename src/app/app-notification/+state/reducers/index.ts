import * as fromAppNotifications from './app-notification.reducer';
import * as fromRoot from '@etdb/+state';
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

export interface AppNotificationState {
    appNotifications: fromAppNotifications.AppNotificationState;
}

export interface State extends fromRoot.AppState {
    appNotifications: AppNotificationState;
}

export const reducers: ActionReducerMap<AppNotificationState> = {
    appNotifications: fromAppNotifications.reducer,
};

export const getAppNotificationsState = createFeatureSelector<AppNotificationState>('appNotifications');

export const getAppNotificationEntitiesState = createSelector(
    getAppNotificationsState,
    state => state.appNotifications
);

export const {
    selectAll: getAllAppNotifications,
    selectEntities: getAppNotificationsEntities
} = fromAppNotifications.adapter.getSelectors(getAppNotificationEntitiesState);

export const getUnreadAppNotificationsCount = createSelector(
    getAllAppNotifications,
    notifications => notifications.filter(notification => !notification.read).length
);
