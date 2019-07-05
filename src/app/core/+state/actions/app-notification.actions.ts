import { Action } from '@ngrx/store';
import { AppNotification } from '@etdb/core/models';

export enum AppNotificationActionTypes {
    Add = '[App-Notifications] Add notification',
    Update = '[App-Notifications] Update notification',
    Remove = '[App-Notifications] Remove notification',
}

export class Add<TNotification extends AppNotification> implements Action {
    readonly type = AppNotificationActionTypes.Add;
    public constructor(public notification: TNotification) { }
}

export class Update<TNotification extends AppNotification> implements Action {
    readonly type = AppNotificationActionTypes.Update;
    public constructor(public id: string, public notification: TNotification) { }
}

export class Remove implements Action {
    readonly type = AppNotificationActionTypes.Remove;
    public constructor(public id: string) { }
}

export type NoticationActionsUnion =
    | Add<AppNotification>
    | Update<AppNotification>
    | Remove;
