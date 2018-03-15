import { NotificationMessage } from '@app/core/models';

export interface ErrorNotificationMessage extends NotificationMessage {
    message: string;
    error?: Error;
}
