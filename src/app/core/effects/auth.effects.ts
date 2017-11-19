import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// import * as notificationMessageActions from '../actions/notification-message.actions';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { ClientConfig } from '../models/client-config.model';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthEffects {
    public constructor(private authService: AuthService, private store: Store<fromRoot.AppState>,
        private actions$: Actions) {}

    @Effect() login = this.actions$
        .ofType(authActions.LOGIN)
        .withLatestFrom(this.store.select(fromRoot.getClientConfig))
        .switchMap(([action, config]: [authActions.LoginAction, ClientConfig]) => {
            return this.authService.login(action.login, config)
                .map(identityToken => {
                    window.localStorage.setItem('access_token', identityToken.access_token);
                    window.localStorage.setItem('refresh_token', identityToken.refresh_token);
                    window.localStorage.setItem('expires_in', identityToken.expires_in.toString());
                    window.localStorage.setItem('token_type', identityToken.token_type);
                    return new authActions.LoginSuccessAction(identityToken);
                }).catch((error: Error) => Observable.of(new authActions.LoginFailAction(error)));
        });

    @Effect() loadIdentityUser = this.actions$
        .ofType(authActions.LOGIN_SUCCESS)
        .switchMap(() => {
            return this.authService.loadIdentityUser()
                .map(identityUser => new authActions.LoadIdentityUserSuccessAction(identityUser))
                .catch((error: Error) => Observable.of(new authActions.LoadIdentityUserFailAction(error)));
        });
}
