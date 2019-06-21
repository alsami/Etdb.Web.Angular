import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@etdb/models';
import * as fromUser from '@etdb/users/+state/reducers';
import * as fromRoot from '@etdb/+state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityUser } from '@etdb/core/models';
import { PolicyService } from '@etdb/core/services';
import { TitleFacadeService } from '@etdb/core/+state/facades';

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

    public constructor(
        private store: Store<fromUser.State>,
        private route: ActivatedRoute,
        private policyService: PolicyService,
        private titleFacadeService: TitleFacadeService,
    ) { }

    public ngOnInit(): void {
        this.loading$ = this.store.select(fromUser.getUserFetching);

        this.paramSub = this.route.params
            .pipe(map(params => <string>params['id']))
            .subscribe(id => {
                this.userId = id;
                console.log(this.userId);
                // this.store.dispatch(new userActions.Load(this.userId));
            });

        this.route.data.subscribe(data => console.log('data', data));

        this.user$ = this.route.data.pipe(
            map((userData: { user: User }) => {
                console.log('user', userData);
                if (!userData.user) {
                    return;
                }

                this.titleFacadeService.setTitle(`User | ${userData.user.name}`);
                return userData.user;
            })
        );

        this.loggedInUser$ = this.store.select(fromRoot.getAuthIdentityUser);

        this.loggedInUserIsUser$ = this.policyService.isSelectedUserIsLoggedInUser();
    }

    public ngOnDestroy(): void {
        this.paramSub.unsubscribe();
    }
}
