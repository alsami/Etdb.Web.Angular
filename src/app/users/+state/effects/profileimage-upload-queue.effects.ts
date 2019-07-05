import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { ProfileImageQueueActions, UserActions } from '@etdb/users/+state/actions';
import { map, switchMap, last, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { UserService } from '@etdb/users/services';
import { ProfileImageMetaInfo } from '@etdb/models';
import { SimpleNotification, ProgressNotification } from '@etdb/app-notification/models';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniqueIdentifier } from '@etdb/core/models';
import { ProfileImageQueueFacadeService } from '@etdb/users/+state/facades';

@Injectable()
export class ProfileImageUploadQueueEffects {
    @Effect() addQueueItem$: Observable<Action> =
        this.actions$.pipe(
            ofType(ProfileImageQueueActions.ProfileImageUploadQueueActionTypes.Add),
            map((action: ProfileImageQueueActions.Add) => {
                const notification = new ProgressNotification(UniqueIdentifier.create().toString(), 'Uploading images', 0);

                this.appNotificationFacadeService.create(notification);

                this.snackbar.open('Your images are being uploaded in the background', null, {
                    duration: 1000,
                });

                return new ProfileImageQueueActions.Process(notification, action.profileImageQueueItem);
            })
        );

    @Effect() process$: Observable<Action> =
        this.actions$.pipe(
            ofType(ProfileImageQueueActions.ProfileImageUploadQueueActionTypes.Process),
            switchMap((action: ProfileImageQueueActions.Process) => {
                return this.userService
                    .uploadProfileImages(
                        action.profileImageQueueItem.userId,
                        action.profileImageQueueItem.images
                    )
                    .pipe(
                        tap(currentValue => {
                            if (typeof currentValue !== 'number') {
                                return;
                            }

                            action.progressNotification.progress = currentValue;

                            this.appNotificationFacadeService
                                .update(action.progressNotification);
                        }),
                        map(currentValue => {
                            if (Array.isArray(currentValue)) {
                                this.appNotificationFacadeService.create(
                                    new SimpleNotification(UniqueIdentifier.create().toString(), 'Images uploaded!'));
                            }

                            return new UserActions.UploadedProfileImages(action.profileImageQueueItem.userId,
                                currentValue as ProfileImageMetaInfo[]);
                        }),
                        catchError((error: Error) => {
                            this.appNotificationFacadeService.remove(action.progressNotification.id);

                            this.appNotificationFacadeService.create(
                                new SimpleNotification(UniqueIdentifier.create().toString(), 'Uploading images failed'));

                            this.profileImageQueueFacadeService.remove(action.profileImageQueueItem.id);

                            return of(new UserActions.UploadProfileImagesFailed(error));
                        }),
                        last(),
                    );
            })
        );

    public constructor(private actions$: Actions, private userService: UserService,
        private profileImageQueueFacadeService: ProfileImageQueueFacadeService,
        private appNotificationFacadeService: AppNotificationsFacadeService, private snackbar: MatSnackBar) {

    }
}
