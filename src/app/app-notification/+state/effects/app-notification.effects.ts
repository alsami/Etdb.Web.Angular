import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppNotificationStorageService } from '@etdb/app-notification/services';
import { AppNotificationActionTypes } from '@etdb/app-notification/+state/actions/app-notification.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromNotifications from '@etdb/app-notification/+state/reducers';
import { AppNotificationActions } from '@etdb/app-notification/+state/actions';

@Injectable()
export class AppNotificationEffects {
    @Effect({dispatch: false})
    restore$ = this.actions$
        .pipe(ofType(AppNotificationActionTypes.Restore),
            tap(() => {
                const notifications = this.appNotificationStorage.restore();

                if (!notifications.length) {
                    return;
                }

                this.store.dispatch(new AppNotificationActions.AddMany(notifications));
            }));

    public constructor(private actions$: Actions, private appNotificationStorage: AppNotificationStorageService,
        private store: Store<fromNotifications.State>) {}
}
