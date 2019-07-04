import { Injectable } from '@angular/core';
import { UserActionTypes } from '@etdb/users/+state/actions/user.actions';
import { UserService } from '@etdb/users/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, last, tap } from 'rxjs/operators';
import { ProfileImageMetaInfo } from '@etdb/models';
import * as fromUsers from '@etdb/users/+state/reducers';
import { UserActions } from '@etdb/users/+state/actions';

@Injectable()
export class UserEffects {
    @Effect()
    loadUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.Load),
        switchMap((action: UserActions.Load) => {
            return this.userService.getUser(action.id).pipe(
                map(user => new UserActions.Loaded(user)),
                catchError(error => of(new UserActions.LoadFailed(error)))
            );
        })
    );

    @Effect()
    uploadProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UploadProfileImage),
        switchMap((action: UserActions.UploadProfileImage) => {
            return this.userService
                .uploadProfileImage(
                    action.profileImage.userId,
                    action.profileImage.file
                )
                .pipe(
                    tap(currentValue => {
                        if (typeof currentValue !== 'number') {
                            return;
                        }

                        this.store.dispatch(new UserActions.ReportUploadProgress(currentValue));
                    }),
                    map(profileImagemetaInfo =>
                        new UserActions.UploadedProfileImage(action.profileImage.userId, profileImagemetaInfo as ProfileImageMetaInfo)),
                    last(),
                    catchError((error: Error) =>
                        of(new UserActions.UploadProfileImageFailed(error))
                    )
                );
        })
    );

    @Effect()
    uploadProfileImages$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UploadProfileImages),
        switchMap((action: UserActions.UploadProfileImages) => {
            return this.userService
                .uploadProfileImages(
                    action.userId,
                    action.files
                )
                .pipe(
                    tap(currentValue => {
                        if (typeof currentValue !== 'number') {
                            return;
                        }

                        this.store.dispatch(new UserActions.ReportUploadProgress(currentValue));
                    }),
                    map(profileImageMetaInfos =>
                        new UserActions.UploadedProfileImages(action.userId, profileImageMetaInfos as ProfileImageMetaInfo[])),
                    last(),
                    catchError((error: Error) =>
                        of(new UserActions.UploadProfileImagesFailed(error))
                    )
                );
        })
    );

    @Effect()
    patchPassword$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UpdatePassword),
        switchMap((action: UserActions.UpdatePassword) => {
            return this.userService
                .updatePassword(action.id, action.passwordChange)
                .pipe(
                    map(() => new UserActions.UpdatedPassword()),
                    catchError((error: Error) =>
                        of(new UserActions.UpdatePasswordFailed(error))
                    )
                );
        })
    );

    @Effect()
    patchProfileInfo$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.UpdateProfileInfo),
        switchMap((action: UserActions.UpdateProfileInfo) => {
            return this.userService
                .updateProfileInfo(action.id, action.profileInfoChange)
                .pipe(
                    map(
                        () =>
                            new UserActions.UpdatedProfileInfo(
                                action.id,
                                action.profileInfoChange
                            )
                    ),
                    catchError((error: Error) =>
                        of(new UserActions.UpdateProfileInfoFailed(error))
                    )
                );
        })
    );

    @Effect()
    removeProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.RemoveProfileImage),
        switchMap((action: UserActions.RemoveProfileImage) => {
            return this.userService.removeProfileImage(action.url).pipe(
                map(
                    () =>
                        new UserActions.RemovedProfileImage(
                            action.url,
                            action.userId
                        )
                ),
                catchError((error: Error) =>
                    of(new UserActions.RemoveProfileImageFailed(error))
                )
            );
        })
    );

    @Effect()
    markPrimaryProfileImage$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.MarkPrimaryProfileImage),
        switchMap((action: UserActions.MarkPrimaryProfileImage) => {
            return this.userService.markPrimaryProfileImage(action.id, action.userId).pipe(
                map(() => new UserActions.MarkedPrimaryProfileImage(action.id, action.userId)),
                catchError((error: Error) => of(new UserActions.MarkPrimaryProfileImageFailed(error)))
            );
        })
    );

    @Effect()
    changeUserName$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.ChangeUserName),
        switchMap((action: UserActions.ChangeUserName) => this.userService.changeUserName(action.data).pipe(
            map(() => new UserActions.ChangedUserName(action.data)),
            catchError((error: Error) => of(new UserActions.ChangeUserNameFailed(error)))
        ))
    );

    public constructor(
        private userService: UserService,
        private actions$: Actions,
        private store: Store<fromUsers.UsersState>
    ) { }
}
