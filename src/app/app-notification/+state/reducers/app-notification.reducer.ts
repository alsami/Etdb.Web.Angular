import { AppNotificationActions } from '@etdb/app-notification/+state/actions';
import { AppNotification } from '@etdb/app-notification/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { sortDatesDescending } from '@etdb/functions';

export interface AppNotificationState extends EntityState<AppNotification> {
}

export const adapter: EntityAdapter<AppNotification> = createEntityAdapter<AppNotification>({
    selectId: (notification: AppNotification) => notification.id,
    sortComparer: (a: AppNotification, b: AppNotification) => sortDatesDescending(a.createdAt, b.createdAt)
});

const initialState: AppNotificationState = adapter.getInitialState({});

export function reducer(state: AppNotificationState = initialState,
    action: AppNotificationActions.AppNoticationActionsUnion): AppNotificationState {
    switch (action.type) {
        case AppNotificationActions.AppNotificationActionTypes.Add: {
            return {
                ...adapter.addOne(action.notification, state)
            };
        }

        case AppNotificationActions.AppNotificationActionTypes.AddMany: {
            return {
                ...adapter.addMany(action.notifications, state)
            };
        }

        case AppNotificationActions.AppNotificationActionTypes.Update: {
            return {
                ...adapter.upsertOne(action.notification, state)
            };
        }

        case AppNotificationActions.AppNotificationActionTypes.Read: {
            const storedNotification = state.entities[action.id];

            const notification = {
                ...{},
                ...storedNotification
            };

            if (!notification) {
                return state;
            }

            notification.read = !notification.read;

            return {
                ...adapter.upsertOne(notification, adapter.removeOne(storedNotification.id, state))
            };
        }

        case AppNotificationActions.AppNotificationActionTypes.Remove: {
            return adapter.removeOne(action.id, state);
        }


        default: return state;
    }
}
