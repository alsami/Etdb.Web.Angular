import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '@etdb/reducers';
import * as titleActions from '@etdb/core/actions/title.actions';
import * as fromUsers from '@etdb/users/reducers';
import * as userActions from '@etdb/users/actions/user.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '@etdb/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserPasswordChange } from '@etdb/users/models';

@Component({
    selector: 'etdb-user-settings',
    templateUrl: 'user-settings.component.html'
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private id: string;

    public user$: Observable<User>;
    public loading$: Observable<boolean>;
    public paramsSubscription: Subscription;

    public constructor(
        private store: Store<fromRoot.AppState>,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.store.dispatch(new titleActions.SetTitle('Users', 'Settings'));

        this.user$ = this.store.select(fromUsers.getSelectedUser);

        this.loading$ = this.store.select(fromUsers.getUserLoading);

        this.paramsSubscription = this.route.params
            .pipe(map(params => <string>params['id']))
            .subscribe(id => {
                this.id = id;
                this.store.dispatch(new userActions.Load(id));
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    public updatePassword(model: UserPasswordChange): void {
        this.store.dispatch(new userActions.UpdatePassword(this.id, model));
    }
}
