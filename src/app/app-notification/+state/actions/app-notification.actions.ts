import { Action } from '@ngrx/store';
import { AppNotification } from '@etdb/app-notification/models';

export enum AppNotificationActionTypes {
    Add = '[App-Notifications] Add notification',
    AddMany = '[App-Notifications] Add notifications',
    Update = '[App-Notifications] Update notification',
    Remove = '[App-Notifications] Remove notification',
    Read = '[App-Notifications] Read notification',
    Restore = '[App-Notifications] Restore notifications'
}

export class Add<TNotification extends AppNotification> implements Action {
    readonly type = AppNotificationActionTypes.Add;
    public constructor(public userId: string, public notification: TNotification) { }
}

export class AddMany<TNotification extends AppNotification> implements Action {
    readonly type = AppNotificationActionTypes.AddMany;
    public constructor(public notifications: TNotification[]) { }
}

export class Update<TNotification extends AppNotification> implements Action {
    readonly type = AppNotificationActionTypes.Update;
    public constructor(public id: string, public notification: TNotification) { }
}

export class Remove implements Action {
    readonly type = AppNotificationActionTypes.Remove;
    public constructor(public id: string) { }
}

export class Read implements Action {
    readonly type = AppNotificationActionTypes.Read;
    public constructor(public id: string) { }
}

export class Restore implements Action {
    readonly type = AppNotificationActionTypes.Restore;
    public constructor(public userId: string) {}
}

export type AppNoticationActionsUnion =
    | Add<AppNotification>
    | AddMany<AppNotification>
    | Update<AppNotification>
    | Remove
    | Read
    | Restore;
