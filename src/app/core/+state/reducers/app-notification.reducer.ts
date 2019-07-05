import { AppNotificationActions } from '@etdb/core/+state/actions';
import { AppNotification } from '@etdb/core/models';

export interface AppNotificationState {
    notifications: AppNotification[];
}

const initialState: AppNotificationState = {
    notifications: []
};

export function reducer(state: AppNotificationState = initialState,
    action: AppNotificationActions.NoticationActionsUnion): AppNotificationState {
    switch (action.type) {
        case AppNotificationActions.AppNotificationActionTypes.Add: {
            state.notifications.push(action.notification);

            return {
                ...state
            };
        }

        case AppNotificationActions.AppNotificationActionTypes.Update: {
            const index = state.notifications.findIndex(notification => notification.id === action.id);

            if (index === -1) {
                return state;
            }

            state[index] = action.notification;

            return state;
        }

        case AppNotificationActions.AppNotificationActionTypes.Remove: {
            const index = state.notifications.findIndex(notification => notification.id === action.id);

            if (index === -1) {
                return state;
            }

            const mutatedNotifications = state.notifications.splice(index, 1);

            return {
                ...state,
                notifications: mutatedNotifications
            };
        }
        default: return state;
    }
}

export const notifications = (state: AppNotificationState) => state.notifications;
