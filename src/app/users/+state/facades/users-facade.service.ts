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
    public uploadingProfileImage$: Observable<boolean>;
    public updatingProfileInfo$: Observable<boolean>;
    public updatingPassword$: Observable<boolean>;
    public removingProfileImage$: Observable<boolean>;
    public selectedUserIsAuthenticatedUser$: Observable<boolean>;

    public constructor(private store: Store<fromUsers.UsersState>) {
        this.fetching$ = this.store.pipe(select(fromUsers.getUserFetching));

        this.selectedUser$ = this.store.select(fromUsers.getSelectedUser);

        this.userNameUpdating$ = this.store.pipe(select(
            fromUsers.getUserNameUpdating
        ));

        this.uploadingProfileImage$ = this.store.pipe(select(
            fromUsers.getUploadingProfileImage
        ));

        this.updatingProfileInfo$ = this.store.pipe(select(
            fromUsers.getUpdatingProfileInfo
        ));

        this.updatingPassword$ = this.store.pipe(select(
            fromUsers.getUpdatingPassword
        ));

        this.removingProfileImage$ = this.store.pipe(select(
            fromUsers.getRemovingProfileImage
        ));

        this.selectedUserIsAuthenticatedUser$ = this.store.pipe(select(fromUsers.getSelectedUserIsAuthenticatedUser));
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
