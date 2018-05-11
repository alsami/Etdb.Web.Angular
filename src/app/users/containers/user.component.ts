import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@etdb/models';
import * as userActions from '@etdb/users/actions/user.actions';
import * as fromUser from '@etdb/users/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'etdb-user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
    private paramSub: Subscription;

    public $loading: Observable<boolean>;
    public $user: Observable<User>;

    public constructor(private store: Store<fromUser.State>, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.paramSub = this.route.params.pipe(
            map(params => params['id'])
        ).subscribe(id => this.store.dispatch(new userActions.Load(id)));
    }

    public ngOnDestroy(): void {
        this.paramSub.unsubscribe();
    }
}
