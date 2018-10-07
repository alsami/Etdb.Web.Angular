import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as titleActions from '@etdb/core/actions/title.actions';
import { User } from '@etdb/models';
import * as userActions from '@etdb/users/actions/user.actions';
import * as fromUser from '@etdb/users/reducers';
import * as fromRoot from '@etdb/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityUser } from '@etdb/core/models';
import { PolicyService } from '@etdb/core/services';

@Component({
    selector: 'etdb-user',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss']
})

export class UserProfileComponent implements OnInit, OnDestroy {
    private paramSub: Subscription;
    private userId: string;

    public loggedInUserIsUser$: Observable<boolean>;
    public loading$: Observable<boolean>;
    public user$: Observable<User>;
    public loggedInUser$: Observable<IdentityUser>;

    public constructor(private store: Store<fromUser.State>, private route: ActivatedRoute, private policyService: PolicyService) { }

    public ngOnInit(): void {
        this.loading$ = this.store.select(fromUser.getUserLoading);

        this.paramSub = this.route.params.pipe(
            map(params => <string>params['id'])
        ).subscribe(id => {
            this.userId = id;
            this.store.dispatch(new userActions.Load(this.userId));
        });

        this.user$ = this.store.select(fromUser.getSelectedUser).pipe(
            map(user => {
                if (user) {
                    this.store.dispatch(new titleActions.SetTitle('Users', user.userName));
                }
                return user;
            })
        );

        this.loggedInUser$ = this.store.select(fromRoot.getAuthIdentityUser);

        this.loggedInUserIsUser$ = this.policyService.isSelectedUserIsLoggedInUser();
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
