import { AppNotificationType } from './notification.types';
import { AppNotification } from './notification.model';
export class ProgressNotification extends AppNotification {
    public progress: number;
    public constructor(type: AppNotificationType, message: string, progress: number) {
        super(type, message);
        this.progress = progress;
    }
}
