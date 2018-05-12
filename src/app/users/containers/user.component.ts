import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as titleActions from '@etdb/core/actions/title.actions';
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
    private userId: string;

    public loading$: Observable<boolean>;
    public user$: Observable<User>;

    public constructor(private store: Store<fromUser.State>, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.paramSub = this.route.params.pipe(
            map(params => params['id'])
        ).subscribe(id => {
            this.userId = id;
            this.store.dispatch(new userActions.Load(id));
        });

        this.user$ = this.store.select(fromUser.getSelectedUser).pipe(
            map(user => {
                if (user) {
                    this.store.dispatch(new titleActions.SetTitle(`Users | ${user.userName.toUpperCase()}`));
                }
                return user;
            })
        );

        this.loading$ = this.store.select(fromUser.getUserLoading);
        this.loading$.subscribe(l => console.warn(l));
    }

    public ngOnDestroy(): void {
        this.paramSub.unsubscribe();
    }

    public upload(file: File): void {
        if (!this.userId) {
            return;
        }

        this.store.dispatch(new userActions.UploadProfileImage({
            id: this.userId,
            file: file
        }));
    }
}
