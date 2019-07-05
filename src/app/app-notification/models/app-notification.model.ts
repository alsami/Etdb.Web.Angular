import { AppNotificationType } from './app-notification.types';
export abstract class AppNotification {
    public id: string;
    public readonly message: string;
    public read: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public type: AppNotificationType;
    public constructor(id: string, message: string) {
        this.id = id;
        this.createdAt = new Date(Date.now());
        this.updatedAt = this.createdAt;
        this.message = message;
    }
}
