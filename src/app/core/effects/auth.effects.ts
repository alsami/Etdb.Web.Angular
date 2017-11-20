import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// import * as notificationMessageActions from '../actions/notification-message.actions';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { ClientConfig } from '../models/client-config.model';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from '../services/token-storage.service';
import * as configActions from '../actions/config.actions';



@Injectable()
export class AuthEffects {
    public constructor(private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private store: Store<fromRoot.AppState>,
        private actions$: Actions) {}

    @Effect() login = this.actions$
        .ofType(authActions.LOGIN)
        .withLatestFrom(this.store.select(fromRoot.getClientConfig))
        .switchMap(([action, config]: [authActions.LoginAction, ClientConfig]) => {
            return this.authService.loginViaCredentials(action.login, config)
                .map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.LoginSuccessAction(token);
                }).catch((error: Error) => Observable.of(new authActions.LoginFailAction(error)));
        });

    @Effect() loadIdentityUser = this.actions$
        .ofType(authActions.LOGIN_SUCCESS)
        .switchMap(() => {
            return this.authService.loadIdentityUser()
                .map(identityUser => new authActions.LoadIdentityUserSuccessAction(identityUser))
                .catch((error: Error) => Observable.of(new authActions.LoadIdentityUserFailAction(error)));
        });

    @Effect() restoreLogin = this.actions$
        .ofType(configActions.LOAD_CLIENT_CONFIG_SUCCESS, authActions.RESTORE_LOGIN)
        .withLatestFrom(this.store.select(fromRoot.getClientConfig))
        .switchMap(([action, config]: [configActions.LoadClientConfigSuccessAction |
            authActions.RestoreLoginAction, ClientConfig]) => {
                if (!this.tokenStorageService.canRestore()) {
                    return Observable.of();
                }
                switch (action.type) {
                    case configActions.LOAD_CLIENT_CONFIG_SUCCESS:
                    case authActions.RESTORE_LOGIN: {
                        return this.authService
                            .loginViaRefreshtoken(this.tokenStorageService.restoreToken(), config)
                            .map(token => {
                                this.tokenStorageService.storeToken(token);
                                return new authActions.LoginSuccessAction(token);
                            }).catch((error: Error) => Observable.of(new authActions.LoginFailAction(error)));
                    }
                }
        });
}
