import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/+state';
import { Observable } from 'rxjs';
import { RegisterUser } from '@etdb/core/models';

import * as titleActions from '../+state/actions/title.actions';
import * as authActions from '../+state/actions/auth.actions';

@Component({
    selector: 'etdb-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new titleActions.SetTitle('Register'));
        this.loading$ = this.store.select(fromRoot.getAuthRegistering);
    }

    public register(registerUser: RegisterUser) {
        this.store.dispatch(new authActions.Register(registerUser));
    }
}
