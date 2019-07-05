import { AppNotificationType } from './app-notification.types';
import { AppNotification } from './app-notification.model';
export class ProgressNotification extends AppNotification {
    public progress: number;

    public constructor(id: string, message: string, progress: number) {
        super(id, message);
        this.progress = progress;
        this.type = AppNotificationType.Progress;
    }

    public copyWithNewProgress(progress: number): ProgressNotification {
        return new ProgressNotification(this.id, this.message, progress);
    }
}
