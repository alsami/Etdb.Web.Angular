import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { Observable } from 'rxjs';
import { AppNotification, AppNotificationType } from '@etdb/app-notification/models';

@Component({
    selector: 'etdb-app-notification-overview',
    templateUrl: 'app-notification-overview.component.html',
    styleUrls: ['app-notification-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppNotificationOverviewComponent implements OnInit {
    public notifications$: Observable<AppNotification[]>;
    public AppNotificationTypes = AppNotificationType;

    public constructor(private appNotificationsFacadeService: AppNotificationsFacadeService) { }

    public ngOnInit(): void {
        this.notifications$ = this.appNotificationsFacadeService.appNotifications$;
    }
}
