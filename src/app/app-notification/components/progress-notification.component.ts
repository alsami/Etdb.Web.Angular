import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ProgressNotification } from '@etdb/app-notification/models';

@Component({
    selector: 'etdb-progress-notification',
    templateUrl: 'progress-notification.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ProgressNotificationComponent implements OnChanges {
    @Input() notification: ProgressNotification;


    public ngOnChanges(): void {
        console.log('progress in comp', this.notification.progress);
    }
}
