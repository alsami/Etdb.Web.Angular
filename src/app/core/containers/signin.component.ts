import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/+state';
import { Observable } from 'rxjs';
import { UserSignIn, AuthenticationProvider } from '@etdb/core/models';

import * as titleActions from '../+state/actions/title.actions';
import * as authActions from '../+state/actions/auth.actions';

@Component({
    selector: 'etdb-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.scss']
})
export class SignInComponent {
    private provider = AuthenticationProvider;
    loading$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new titleActions.SetTitle('Signin'));
        this.loading$ = this.store.select(fromRoot.getAuthLoading);
    }

    public signIn(userSignIn: UserSignIn) {
        this.store.dispatch(new authActions.CredentialSignIn(userSignIn));
    }

    public googleSignIn(x: gapi.auth2.GoogleUser) {
        this.store.dispatch(
            new authActions.ProviderSignIn(
                this.provider.Google,
                x.getAuthResponse().access_token
            )
        );
    }

    public facebookSignIn(token: string) {
        this.store.dispatch(
            new authActions.ProviderSignIn(AuthenticationProvider.Facebook, token)
        );
    }
}
