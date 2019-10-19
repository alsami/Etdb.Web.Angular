import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { AppNotification, AppNotificationType } from '@etdb/app-notification/models';
import { AppNotificationStorageService } from '@etdb/app-notification/services';
import { AuthFacadeService } from '@etdb/core/+state/facades';
import { IdentityUser } from '@etdb/core/models';
import { map } from 'rxjs/operators';

@Component({
    selector: 'etdb-app-notification-overview',
    templateUrl: 'app-notification-overview.component.html',
    styleUrls: ['app-notification-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppNotificationOverviewComponent implements OnInit, OnDestroy {
    private authenticatedUser$: Observable<IdentityUser>;

    private userNotificationSub: Subscription;

    public notifications$: Observable<AppNotification[]>;
    public AppNotificationTypes = AppNotificationType;



    public constructor(private appNotificationsFacadeService: AppNotificationsFacadeService,
        private notificationStorage: AppNotificationStorageService, private authFacadeService: AuthFacadeService) { }

    public ngOnInit(): void {
        this.authenticatedUser$ = this.authFacadeService.authenticatedUser$;

        this.notifications$ = this.appNotificationsFacadeService.appNotifications$;

        this.userNotificationSub = combineLatest(this.authenticatedUser$, this.notifications$)
            .pipe(map(([authenticatedUser, notifications]) => {
                if (!authenticatedUser || !notifications || !notifications.length) {
                    return;
                }

                this.notificationStorage.storeMany(authenticatedUser.id, notifications);
            }))
            .subscribe();
    }

    public ngOnDestroy(): void {
        if (!this.userNotificationSub) {
            return;
        }

        this.userNotificationSub.unsubscribe();
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
