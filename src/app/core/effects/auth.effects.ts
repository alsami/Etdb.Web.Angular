import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as authActions from '@etdb/core/actions/auth.actions';
import { AuthActionTypes } from '@etdb/core/actions/auth.actions';
import { AuthService, TokenStorageService } from '@etdb/core/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Login, AuthActionTypes.Registered),
        switchMap((action: authActions.Login | authActions.Registered) =>
            this.authService.loginViaCredentials(action.login).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoggedIn(token, true);
                }),
                catchError((error: Error) =>
                    of(new authActions.LoginFailed(error))
                )
            )
        )
    );

    @Effect()
    loggedIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LoggedIn),
        switchMap((action: authActions.LoggedIn) => {
            if (action.navigateToRoot) {
                this.router.navigate(['/']);
            }
            return of();
        })
    );
    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        switchMap(() => {
            this.tokenStorageService.clearToken();
            return of();
        })
    );

    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Register),
        switchMap((action: authActions.Register) =>
            this.authService.register(action.registerUser).pipe(
                map(
                    () =>
                        new authActions.Registered({
                            userName: action.registerUser.userName,
                            password: action.registerUser.password
                        })
                ),
                catchError((error: Error) =>
                    of(new authActions.RegisterFailed(error))
                )
            )
        )
    );

    @Effect()
    identityUserLoad$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LoggedIn),
        switchMap(() =>
            this.authService.loadIdentityUser().pipe(
                map(
                    identityUser =>
                        new authActions.IdentityUserLoaded(identityUser)
                ),
                catchError((error: Error) =>
                    of(new authActions.IdentityUserLoadFailed(error))
                )
            )
        )
    );

    @Effect()
    restoreLogin$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.RestoreLogin),
        switchMap(
            (): Observable<
                | authActions.RestoreCompleted
                | authActions.LoggedIn
                | authActions.LoginFailed
            > => {
                if (!this.tokenStorageService.canRestore()) {
                    return of(new authActions.RestoreCompleted());
                }
                return this.authService
                    .loginViaRefreshtoken(
                        this.tokenStorageService.restoreToken()
                    )
                    .pipe(
                        map(token => {
                            this.tokenStorageService.clearToken();
                            this.tokenStorageService.storeToken(token);
                            return new authActions.LoggedIn(token);
                        }),
                        catchError((error: Error) => {
                            this.tokenStorageService.clearToken();
                            return of(new authActions.LoginFailed(error));
                        })
                    );
            }
        )
    );

    public constructor(
        private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions,
        private router: Router
    ) {}
}
