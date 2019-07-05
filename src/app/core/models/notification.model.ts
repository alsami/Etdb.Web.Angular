import { UniqueIdentifier } from './unique-identifier.model';
import { AppNotificationType } from './notification.types';
export abstract class AppNotification {
    public id: string;
    public type: AppNotificationType;
    public message: string;
    public read: boolean;
    public createdAt: Date;
    public constructor(type: AppNotificationType, message: string) {
        this.id = UniqueIdentifier.create().toString();
        this.createdAt = new Date(Date.now());
        this.type = type;
        this.message = message;
    }
}
