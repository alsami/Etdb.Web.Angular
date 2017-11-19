import { NotificationMessage } from './notification-message.model';

export interface ErrorNotificationMessage extends NotificationMessage {
    message: string;
    error?: Error;
}
