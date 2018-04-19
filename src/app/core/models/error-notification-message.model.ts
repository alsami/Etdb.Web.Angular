import { NotificationMessage } from '@etdb/core/models';

export interface ErrorNotificationMessage extends NotificationMessage {
    message: string;
    error?: Error;
}
