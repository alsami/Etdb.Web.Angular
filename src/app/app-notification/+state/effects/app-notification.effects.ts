import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppNotificationStorageService } from '@etdb/app-notification/services';
import { AppNotificationActionTypes } from '@etdb/app-notification/+state/actions/app-notification.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromNotifications from '@etdb/app-notification/+state/reducers';
import { AppNotificationActions } from '@etdb/app-notification/+state/actions';
import { Observable } from 'rxjs';

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

    @Effect({dispatch: false})
    add$: Observable<any> = this.actions$
        .pipe(
            ofType(AppNotificationActionTypes.Add),
            tap((action: AppNotificationActions.Add<any>) => this.appNotificationStorage.store(action.notification)));

    @Effect({dispatch: false})
    update$: Observable<any> = this.actions$
        .pipe(
            ofType(AppNotificationActionTypes.Update),
            tap((action: AppNotificationActions.Update<any>) => this.appNotificationStorage.update(action.notification)));

    @Effect({dispatch: false})
    read$: Observable<any> = this.actions$
        .pipe(
            ofType(AppNotificationActionTypes.Read),
            tap((action: AppNotificationActions.Read) => this.appNotificationStorage.read(action.id)));

    @Effect({dispatch: false})
    remove$: Observable<any> = this.actions$
        .pipe(
            ofType(AppNotificationActionTypes.Remove),
            tap((action: AppNotificationActions.Remove) => this.appNotificationStorage.remove(action.id)));



    public constructor(private actions$: Actions, private appNotificationStorage: AppNotificationStorageService,
        private store: Store<fromNotifications.State>) {

    }
}
