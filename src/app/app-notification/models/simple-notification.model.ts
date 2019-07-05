import { AppNotification } from './app-notification.model';
import { AppNotificationType } from '@etdb/app-notification/models/app-notification.types';
export class SimpleNotification extends AppNotification {
    public constructor(id: string, message: string) {
        super(id, message);
        this.type = AppNotificationType.Simple;
    }
}
