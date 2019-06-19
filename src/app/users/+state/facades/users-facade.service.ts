import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '@etdb/users/+state/reducers';
import { Observable } from 'rxjs';
import { User } from '@etdb/models';
import { UserActions } from '@etdb/users/+state/actions';
import { UserPasswordChange, UserProfileImageUpload, UserProfileInfoChange } from '@etdb/users/models';
import { filter, take } from 'rxjs/operators';

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
    public selectedUserIsSignedInUser$: Observable<boolean>;

    public constructor(private store: Store<fromUsers.UsersState>) {
        this.fetching$ = this.store.pipe(select(fromUsers.getUserFetching));

        this.selectedUser$ = this.store.select(fromUsers.getSelectedUser);

        this.userNameUpdating$ = this.store.pipe(select(
            fromUsers.getUserNameUpdating
        ));

        this.profileImageUploading$ = this.store.pipe(select(
            fromUsers.getProfileImageUpdating
        ));

        this.profileInfoUpdating$ = this.store.pipe(select(
            fromUsers.getProfileInfoUpdating
        ));

        this.passwordUpdating$ = this.store.pipe(select(
            fromUsers.getPasswordUpdating
        ));

        this.selectedUserIsSignedInUser$ = this.store.pipe(select(fromUsers.getSelectedUserIsSignedInUser));
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

    public awaitUserLoaded(): Observable<boolean> {
        return this.store.pipe(
            select(fromUsers.getUserLoaded),
            filter(loaded => loaded),
            take(1));
    }
}
