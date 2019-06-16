import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '@etdb/+state';
import * as titleActions from '@etdb/core/+state/actions/title.actions';
import * as fromUsers from '@etdb/users/+state/reducers';
import * as userActions from '@etdb/users/+state/actions/user.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '@etdb/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserPasswordChange, UserProfileInfoChange } from '@etdb/users/models';

@Component({
    selector: 'etdb-user-settings',
    templateUrl: 'user-settings.component.html'
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private userId: string;

    public user$: Observable<User>;
    public fetching$: Observable<boolean>;
    public userNameUpdating$: Observable<boolean>;
    public profileImageUploading$: Observable<boolean>;
    public profileInfoUpdating$: Observable<boolean>;
    public passwordUpdating$: Observable<boolean>;
    public paramsSubscription: Subscription;

    public constructor(
        private store: Store<fromRoot.AppState>,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new titleActions.SetTitle('Users', 'Settings'));

        this.user$ = this.store.select(fromUsers.getSelectedUser);

        this.fetching$ = this.store.select(fromUsers.getUserFetching);

        this.userNameUpdating$ = this.store.select(
            fromUsers.getUserNameUpdating
        );

        this.profileImageUploading$ = this.store.select(
            fromUsers.getProfileImageUpdating
        );

        this.profileInfoUpdating$ = this.store.select(
            fromUsers.getProfileInfoUpdating
        );

        this.passwordUpdating$ = this.store.select(
            fromUsers.getPasswordUpdating
        );

        this.paramsSubscription = this.route.params
            .pipe(map(params => <string>params['id']))
            .subscribe(id => {
                this.userId = id;
                this.store.dispatch(new userActions.Load(id));
            });

        this.store
            .select(fromUsers.getSelectedUserIsSignedInUser)
            .subscribe(x => console.log(x));
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    public updatePassword(model: UserPasswordChange): void {
        this.store.dispatch(new userActions.UpdatePassword(this.userId, model));
    }

    public uploadProfileImage(file: File): void {
        if (!this.userId) {
            return;
        }

        this.store.dispatch(
            new userActions.UploadProfileImage({
                userId: this.userId,
                file: file
            })
        );
    }

    public removeProfileImage(url: string): void {
        this.store.dispatch(
            new userActions.RemoveProfileImage(url, this.userId)
        );
    }

    public updateProfileInfo(model: UserProfileInfoChange): void {
        this.store.dispatch(
            new userActions.UpdateProfileInfo(this.userId, model)
        );
    }
}
