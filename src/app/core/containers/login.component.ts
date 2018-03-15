import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';
import * as titleActions from '../actions/title.actions';
import * as authActions from '../actions/auth.actions';
import { UserLogin } from '@app/core/models';

@Component({
    selector: 'etdb-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    loading$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new titleActions.SetTitleAction('Login'));
        this.loading$ = this.store.select(fromRoot.getAuthLoading);
    }

    public login(userLogin: UserLogin) {
        this.store.dispatch(new authActions.LoginAction(userLogin));
    }
}
