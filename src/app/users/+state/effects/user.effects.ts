import { Injectable } from '@angular/core';
import * as userActions from '@etdb/users/+state/actions/user.actions';
import { UserActionTypes } from '@etdb/users/+state/actions/user.actions';
import { UserService } from '@etdb/users/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ErrorExtractorService } from '@etdb/core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
    @Effect()
    loadUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.Load),
        switchMap((action: userActions.Load) => {
            return this.userService.getUser(action.id).pipe(
                map(user => new userActions.Loaded(user)),
                catchError(error => of(new userActions.LoadFailed(error)))
            );
        })
    );

    @Effect()
    uploadProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UploadProfileImage),
        switchMap((action: userActions.UploadProfileImage) => {
            return this.userService
                .uploadProfileImage(
                    action.profileImage.userId,
                    action.profileImage.file
                )
                .pipe(
                    map(user => new userActions.UploadedProfileImage(action.profileImage.userId, user)),
                    catchError((error: Error) =>
                        of(new userActions.UploadProfileImageFailed(error))
                    )
                );
        })
    );

    @Effect()
    patchPassword$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UpdatePassword),
        switchMap((action: userActions.UpdatePassword) => {
            return this.userService
                .updatePassword(action.id, action.passwordChange)
                .pipe(
                    map(() => new userActions.UpdatedPassword()),
                    catchError((error: Error) =>
                        of(new userActions.UpdatePasswordFailed(error))
                    )
                );
        })
    );

    @Effect()
    patchProfileInfo$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UpdateProfileInfo),
        switchMap((action: userActions.UpdateProfileInfo) => {
            return this.userService
                .updateProfileInfo(action.id, action.profileInfoChange)
                .pipe(
                    map(
                        () =>
                            new userActions.UpdatedProfileInfo(
                                action.id,
                                action.profileInfoChange
                            )
                    ),
                    catchError((error: Error) =>
                        of(new userActions.UpdateProfileInfoFailed(error))
                    )
                );
        })
    );

    @Effect()
    removeProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.RemoveProfileImage),
        switchMap((action: userActions.RemoveProfileImage) => {
            return this.userService.removeProfileImage(action.url).pipe(
                map(
                    () =>
                        new userActions.RemovedProfileImage(
                            action.url,
                            action.userId
                        )
                ),
                catchError((error: Error) =>
                    of(new userActions.RemoveProfileImageFailed(error))
                )
            );
        })
    );

    @Effect()
    markPrimaryProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.MarkPrimaryProfileImage),
        switchMap((action: userActions.MarkPrimaryProfileImage) => {
            return this.userService.markPrimaryProfileImage(action.id, action.userId).pipe(
                map(() => new userActions.MarkedPrimaryProfileImage(action.id, action.userId)),
                catchError((error: Error) => of(new userActions.MarkPrimaryProfileImageFailed(error)))
            );
        })
    );

    @Effect()
    displayError$: Observable<Action> = this.actions$.pipe(
        ofType(
            UserActionTypes.LoadFailed,
            UserActionTypes.UpdatePasswordFailed,
            UserActionTypes.UpdateProfileInfoFailed,
            UserActionTypes.UpdateUserNameFailed,
            UserActionTypes.UploadProfileImageFailed,
            UserActionTypes.RemoveProfileImageFailed,
            UserActionTypes.MarkPrimaryProfileImageFailed
        ),
        switchMap(
            (
                action:
                    | userActions.LoadFailed
                    | userActions.UpdateProfileInfoFailed
                    | userActions.UpdatePasswordFailed
                    | userActions.UpdateUserNameFailed
                    | userActions.RemoveProfileImageFailed
                    | userActions.MarkPrimaryProfileImageFailed
            ): Observable<any> => {
                const humanreadable = this.errorExtractorService.extractHumanreadableError(
                    action.error
                );

                this.snackbar.open(humanreadable.message, undefined, {
                    duration: 5000
                });

                return of();
            }
        )
    );

    public constructor(
        private userService: UserService,
        private errorExtractorService: ErrorExtractorService,
        private snackbar: MatSnackBar,
        private actions$: Actions
    ) { }
}
