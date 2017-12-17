import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {
    public constructor(private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions, private router: Router) {}

    @Effect() login = this.actions$
        .ofType(authActions.LOGIN, authActions.REGISTER_SUCCESS)
        .switchMap((action: authActions.LoginAction | authActions.RegisterSucessAction) => {
            return this.authService.loginViaCredentials(action.login)
                .map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoginSuccessAction(token);
                }).catch((error: Error) => Observable.of(new authActions.LoginFailAction(error)));
        });

    @Effect() loginSuccess = this.actions$
        .ofType(authActions.LOGIN_SUCCESS, authActions.REGISTER_SUCCESS)
        .switchMap(() => {
            this.router.navigate(['/']);
            return Observable.of();
        });

    @Effect() logout = this.actions$
        .ofType(authActions.LOGOUT)
        .switchMap(() => {
            this.tokenStorageService.clearToken();
            return Observable.of();
        });

    @Effect() register = this.actions$
        .ofType(authActions.REGISTER)
        .switchMap((action: authActions.RegisterAction) => {
            return this.authService.register(action.registerUser)
                .map(() => {
                    return new authActions.RegisterSucessAction({
                        userName: action.registerUser.userName,
                        password: action.registerUser.password
                    });
                }).catch((error: Error) => Observable.of(new authActions.RegisterFailAction(error)));
        });

    @Effect() loadIdentityUser = this.actions$
        .ofType(authActions.LOGIN_SUCCESS)
        .switchMap(() => {
            return this.authService.loadIdentityUser()
                .map(identityUser => new authActions.LoadIdentityUserSuccessAction(identityUser))
                .catch((error: Error) => Observable.of(new authActions.LoadIdentityUserFailAction(error)));
        });

    @Effect() restoreLogin = this.actions$
        .ofType(authActions.RESTORE_LOGIN)
        .switchMap(() => {
            if (!this.tokenStorageService.canRestore()) {
                return Observable.of();
            }

            return this.authService
                .loginViaRefreshtoken(this.tokenStorageService.restoreToken())
                .map(token => {
                    this.tokenStorageService.clearToken();
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoginSuccessAction(token);
                }).catch((error: Error) => {
                    this.tokenStorageService.clearToken();
                    return Observable.of(new authActions.LoginFailAction(error));
                });
        });
}
