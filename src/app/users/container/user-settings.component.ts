import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User, ProfileImageMetaInfo } from '@etdb/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserPasswordChange, UserProfileInfoChange, ProfileImagesUploadQueueItem } from '@etdb/users/models';
import { UsersFacadeService, UsersSearchFacadeService, ProfileImageQueueFacadeService } from '@etdb/users/+state/facades';
import { TitleFacadeService } from '@etdb/core/+state/facades';

@Component({
    selector: 'etdb-user-settings',
    templateUrl: 'user-settings.component.html'
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private userId: string;
    private paramsSubscription: Subscription;

    public user$: Observable<User>;
    public profileImages$: Observable<ProfileImageMetaInfo[]>;
    public fetching$: Observable<boolean>;
    public changingUserName$: Observable<boolean>;
    public profileImageUploading$: Observable<boolean>;
    public profileImagesUploading$: Observable<boolean>;
    public profileInfoUpdating$: Observable<boolean>;
    public updatingPassword$: Observable<boolean>;
    public removingProfileImage$: Observable<boolean>;
    public markingPrimaryProfileImage$: Observable<boolean>;
    public checkingUserNameAvailability$: Observable<boolean>;

    public updateProfileMessage$: Observable<string>;
    public removeProfileImageMessage$: Observable<string>;
    public updatePasswordMessage$: Observable<string>;
    public markingPrimaryProfileImageMessage$: Observable<string>;
    public changingUserNameMessage$: Observable<string>;

    public constructor(
        private route: ActivatedRoute,
        private usersFacadeService: UsersFacadeService,
        private usersSearchFacadeService: UsersSearchFacadeService,
        private titleFacadeService: TitleFacadeService,
        private profileImageQueueFacadeService: ProfileImageQueueFacadeService
    ) { }

    public ngOnInit(): void {
        this.titleFacadeService.setTitle('User | Settings');

        this.user$ = this.usersFacadeService.selectedUser$;

        this.fetching$ = this.usersFacadeService.fetching$;

        this.changingUserName$ = this.usersFacadeService.userNameUpdating$;

        this.removingProfileImage$ = this.usersFacadeService.removingProfileImage$;

        this.removeProfileImageMessage$ = this.applyLoadingMessage(this.removingProfileImage$, 'Removing image');

        this.profileInfoUpdating$ = this.usersFacadeService.updatingProfileInfo$;

        this.updateProfileMessage$ = this.applyLoadingMessage(this.profileInfoUpdating$, 'Updating profile');

        this.updatingPassword$ = this.usersFacadeService.updatingPassword$;

        this.updatePasswordMessage$ = this.applyLoadingMessage(this.updatingPassword$, 'Updating password');

        this.markingPrimaryProfileImage$ = this.usersFacadeService.markingPrimaryProfileImage$;

        this.markingPrimaryProfileImageMessage$
            = this.applyLoadingMessage(this.markingPrimaryProfileImage$, 'Setting selected image as primary');

        this.checkingUserNameAvailability$ = this.usersSearchFacadeService.checkingUserNameAvailability$;

        this.changingUserName$ = this.usersFacadeService.changingUserName$;

        this.changingUserNameMessage$ = this.applyLoadingMessage(this.changingUserName$, 'Changing user-name');

        this.profileImages$ = this.user$.pipe(
            map(user => {
                console.log(user);
                return user.profileImageMetaInfos;
            })
        );

        this.paramsSubscription = this.route.params
            .pipe(map(params => <string>params['id']))
            .subscribe(id => {
                this.userId = id;
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    public updatePassword(userPasswordChange: UserPasswordChange): void {
        this.usersFacadeService.changePassword(this.userId, userPasswordChange);
    }

    public uploadProfileImages(files: File[]): void {
        if (!this.userId) {
            return;
        }

        this.profileImageQueueFacadeService.add(new ProfileImagesUploadQueueItem(this.userId, files));
    }

    public removeProfileImage(url: string): void {
        this.usersFacadeService.removeProfileImage(this.userId, url);
    }

    public markPrimaryProfileImage(id: string): void {
        this.usersFacadeService.markPrimaryProfileImage(id, this.userId);
    }

    public updateProfileInfo(profileInfoChange: UserProfileInfoChange): void {
        this.usersFacadeService.updateProfileInfo(this.userId, profileInfoChange);
    }

    public changeUserName(userName: string): void {
        this.usersFacadeService.changeUserName(this.userId, userName);
    }

    private applyLoadingMessage(observer: Observable<boolean>, message: string): Observable<string> {
        return observer.pipe(
            map(updating => updating ? message : null)
        );
    }
}
