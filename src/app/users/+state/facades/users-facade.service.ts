import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUsers from '@etdb/users/+state/reducers';
import { Observable } from 'rxjs';
import { User } from '@etdb/models';
import { UserActions } from '@etdb/users/+state/actions';
import { UserPasswordChange, UserProfileImageUpload, UserProfileInfoChange } from '@etdb/users/models';

@Injectable({
    providedIn: 'root'
})
export class UsersFacadeService {
    public fetching$: Observable<boolean>;
    public selectedUser$: Observable<User>;
    public userNameUpdating$: Observable<boolean>;
    public profileImageUploading$: Observable<boolean>;
    public profileInfoUpdating$: Observable<boolean>;
    public passwordUpdating$: Observable<boolean>;

    public constructor(private store: Store<fromUsers.UsersState>) {
        this.fetching$ = this.store.select(fromUsers.getUserFetching);

        this.selectedUser$ = this.store.select(fromUsers.getSelectedUser);

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
    }

    public load(userId: string): void {
        this.store.dispatch(new UserActions.Load(userId));
    }

    public changePassword(userId: string, passwordChange: UserPasswordChange): void {
        this.store.dispatch(new UserActions.UpdatePassword(userId, passwordChange));
    }

    public uploadProfileImage(profileImage: UserProfileImageUpload): void {
        this.store.dispatch(new UserActions.UploadProfileImage(profileImage));
    }

    public removeProfileImage(userId: string, url: string): void {
        this.store.dispatch(new UserActions.RemoveProfileImage(url, userId));
    }

    public updateProfileInfo(userId: string, profileInfoChange: UserProfileInfoChange): void {
        this.store.dispatch(new UserActions.UpdateProfileInfo(userId, profileInfoChange));
    }
}
