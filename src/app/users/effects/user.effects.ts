import { Injectable } from '@angular/core';
import * as userActions from '@etdb/users/actions/user.actions';
import { UserActionTypes } from '@etdb/users/actions/user.actions';
import { UserService } from '@etdb/users/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
                    action.profileImage.id,
                    action.profileImage.file
                )
                .pipe(
                    map(user => new userActions.UploadedProfileImage(user)),
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

    public constructor(
        private userService: UserService,
        private actions$: Actions
    ) {}
}
