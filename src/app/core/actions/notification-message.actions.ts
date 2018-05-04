import { ErrorNotificationMessage } from '../models/error-notification-message.model';
import { Action } from '@ngrx/store';

export const NOTIFY_ERROR = '[NotificationMessage] Notify Error';


export class NotifyErrorAction implements Action {
    readonly type = NOTIFY_ERROR;
    public constructor(public errorNotification: ErrorNotificationMessage) {}
}


export declare type NotificationActions =
    NotifyErrorAction;
