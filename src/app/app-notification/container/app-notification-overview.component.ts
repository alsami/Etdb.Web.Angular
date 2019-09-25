import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { Observable } from 'rxjs';
import { AppNotification, AppNotificationType } from '@etdb/app-notification/models';
import { AppNotificationStorageService } from '@etdb/app-notification/services';

@Component({
    selector: 'etdb-app-notification-overview',
    templateUrl: 'app-notification-overview.component.html',
    styleUrls: ['app-notification-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppNotificationOverviewComponent implements OnInit {
    public notifications$: Observable<AppNotification[]>;
    public AppNotificationTypes = AppNotificationType;

    public constructor(private appNotificationsFacadeService: AppNotificationsFacadeService,
        private notificationStorage: AppNotificationStorageService) { }

    public ngOnInit(): void {
        this.notifications$ = this.appNotificationsFacadeService.appNotifications$;

        this.notifications$.subscribe(notifications => this.notificationStorage.storeMany(notifications));
    }

    public notificationRead(notification: AppNotification): void {
        this.appNotificationsFacadeService.read(notification.id);
    }

    public notificationRemove(notification: AppNotification): void {
        this.appNotificationsFacadeService.remove(notification.id);
    }

    public getViewIcon(notification: AppNotification): string {
        return notification.read
            ? 'visibility_off'
            : 'visibility';
    }
}
