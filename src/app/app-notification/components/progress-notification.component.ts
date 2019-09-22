import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProgressNotification } from '@etdb/app-notification/models';

@Component({
    selector: 'etdb-progress-notification',
    templateUrl: 'progress-notification.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ProgressNotificationComponent {
    @Input() notification: ProgressNotification;
}
