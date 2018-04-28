import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as notificationMessageActions from '../actions/notification-message.actions';



@Injectable()
export class NotificationMessageEffects {
    public constructor(private snackbar: MatSnackBar, private actions$: Actions) {}

    @Effect() errorNotification = this.actions$
        .pipe(
            ofType(notificationMessageActions.NOTIFY_ERROR),
            mergeMap((action: notificationMessageActions.NotifyErrorAction) => {
                this.snackbar.open(action.errorNotification.message, null, {
                    duration: 1000
                });
                return of();
            })
        );
}
