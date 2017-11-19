import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as notificationMessageActions from '../actions/notification-message.actions';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NotificationMessageEffects {
    public constructor(private snackbar: MatSnackBar, private actions$: Actions) {}

    @Effect() errorNotification = this.actions$
        .ofType(notificationMessageActions.NOTIFY_ERROR)
        .mergeMap((action: notificationMessageActions.NotifyErrorAction) => {
            this.snackbar.open(action.errorNotification.message, null, {
                duration: 1000
            });
            return Observable.of();
        });
}
