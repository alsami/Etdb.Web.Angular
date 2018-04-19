import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/reducers';
import { Observable } from 'rxjs';
import * as titleActions from '../actions/title.actions';
import * as authActions from '../actions/auth.actions';
import { RegisterUser } from '@etdb/core/models';

@Component({
    selector: 'etdb-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new titleActions.SetTitleAction('Register'));
        this.loading$ = this.store.select(fromRoot.getAuthLoading);
    }

    public register(registerUser: RegisterUser) {
        this.store.dispatch(new authActions.RegisterAction(registerUser));
    }
}
