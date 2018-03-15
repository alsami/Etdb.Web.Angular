import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services';
import * as authActions from '../actions/auth.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {
    public constructor(private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions, private router: Router) {}

    @Effect() login = this.actions$.pipe(
        ofType(authActions.LOGIN, authActions.REGISTER_SUCCESS),
        switchMap((action: authActions.LoginAction | authActions.RegisterSucessAction) =>
            this.authService.loginViaCredentials(action.login).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoginSuccessAction(token);
                }),
                catchError((error: Error) => of(new authActions.LoginFailAction(error)))
            ))
    );

    @Effect() loginSuccess = this.actions$.pipe(
        ofType(authActions.LOGIN_SUCCESS, authActions.REGISTER_SUCCESS),
        switchMap(() => {
            this.router.navigate(['/']);
            return of();
        })
    );

    @Effect() logout = this.actions$.pipe(
        ofType(authActions.LOGOUT),
        switchMap(() => {
            this.tokenStorageService.clearToken();
            return of();
        }));

    @Effect() register = this.actions$.pipe(
        ofType(authActions.REGISTER),
        switchMap((action: authActions.RegisterAction) =>
            this.authService.register(action.registerUser).pipe(
                map(() => new authActions.RegisterSucessAction({
                    userName: action.registerUser.userName,
                    password: action.registerUser.password
                })),
                catchError((error: Error) => of(new authActions.RegisterFailAction(error)))
        ))
    );

    @Effect() loadIdentityUser = this.actions$.pipe(
        ofType(authActions.LOGIN_SUCCESS),
        switchMap(() => this.authService.loadIdentityUser().pipe(
                map(identityUser => new authActions.LoadIdentityUserSuccessAction(identityUser)),
                catchError((error: Error) => of(new authActions.LoadIdentityUserFailAction(error)))
            )
        )
    );

    @Effect() restoreLogin = this.actions$.pipe(
        ofType(authActions.RESTORE_LOGIN),
        switchMap(() => {
            if (!this.tokenStorageService.canRestore()) {
                return of();
            }

            return this.authService.loginViaRefreshtoken(this.tokenStorageService.restoreToken())
                .pipe(
                    map(token => {
                        this.tokenStorageService.clearToken();
                        this.tokenStorageService.storeToken(token);
                        return new authActions.LoginSuccessAction(token);
                    }),
                    catchError((error: Error) => {
                        this.tokenStorageService.clearToken();
                        return of(new authActions.LoginFailAction(error));
                    })
            );
        })
    );




}
