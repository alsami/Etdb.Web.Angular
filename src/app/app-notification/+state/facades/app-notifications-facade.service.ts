import { Injectable } from '@angular/core';
import * as fromAppNotifications from '@etdb/app-notification/+state/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppNotification } from '@etdb/app-notification/models';
import { AppNotificationActions } from '@etdb/app-notification/+state/actions';


@Injectable({
    providedIn: 'root'
})
export class AppNotificationsFacadeService {
    public appNotifications$: Observable<AppNotification[]>;
    public unreadAppNotifications$: Observable<number>;

    public constructor(private store: Store<fromAppNotifications.AppNotificationState>) {
        this.appNotifications$ = this.store.pipe(select(fromAppNotifications.getAllAppNotifications));
        this.unreadAppNotifications$ = this.store.pipe(select(fromAppNotifications.getUnreadAppNotificationsCount));
    }

    public create<TAppNotifcation extends AppNotification>(notification: TAppNotifcation): void {
        this.store.dispatch(new AppNotificationActions.Add(notification));
    }

    public update<TAppNotifcation extends AppNotification>(notification: TAppNotifcation): void {
        this.store.dispatch(new AppNotificationActions.Update(notification.id, notification));
    }

    public remove(id: string): void {
        this.store.dispatch(new AppNotificationActions.Remove(id));
    }
}
