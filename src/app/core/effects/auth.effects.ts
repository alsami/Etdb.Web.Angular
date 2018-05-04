import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TokenStorageService } from '@etdb/core/services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActionTypes } from '@etdb/core/actions/auth.actions';
import * as authActions from '@etdb/core/actions/auth.actions';

@Injectable()
export class AuthEffects {

    public constructor(private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions, private router: Router) {}

    @Effect() login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login, AuthActionTypes.Registered),
        switchMap((action: authActions.Login | authActions.Registered) =>
            this.authService.loginViaCredentials(action.login).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoggedIn(token);
                }),
                catchError((error: Error) => of(new authActions.LoginFailed(error)))
            ))
    );

    @Effect() loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoggedIn, AuthActionTypes.Registered),
        switchMap(() => {
            this.router.navigate(['/']);
            return of();
        })
    );

    @Effect() logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        switchMap(() => {
            this.tokenStorageService.clearToken();
            return of();
        }));

    @Effect() register$ = this.actions$.pipe(
        ofType(AuthActionTypes.Register),
        switchMap((action: authActions.Register) =>
            this.authService.register(action.registerUser).pipe(
                map(() => new authActions.Registered({
                    userName: action.registerUser.userName,
                    password: action.registerUser.password
                })),
                catchError((error: Error) => of(new authActions.RegisterFailed(error)))
        ))
    );

    @Effect() identityUserLoad$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoggedIn),
        switchMap(() => this.authService.loadIdentityUser().pipe(
                map(identityUser => new authActions.IdentityUserLoaded(identityUser)),
                catchError((error: Error) => of(new authActions.IdentityUserLoadFailed(error)))
            )
        )
    );

    @Effect() restoreLogin$ = this.actions$.pipe(
        ofType(AuthActionTypes.RestoreLogin),
        switchMap(() => {
            if (!this.tokenStorageService.canRestore()) {
                return of();
            }

            return this.authService.loginViaRefreshtoken(this.tokenStorageService.restoreToken())
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
        })
    );




}
