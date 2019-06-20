import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '@etdb/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserPasswordChange, UserProfileInfoChange } from '@etdb/users/models';
import { UsersFacadeService } from '@etdb/users/+state/facades';
import { TitleFacadeService } from '@etdb/core/+state/facades';

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
        private route: ActivatedRoute,
        private usersFacadeService: UsersFacadeService,
        private titleFacadeService: TitleFacadeService
    ) { }

    public ngOnInit(): void {
        this.titleFacadeService.setTitle('User | Settings');

        this.user$ = this.usersFacadeService.selectedUser$;

        this.fetching$ = this.usersFacadeService.fetching$;

        this.userNameUpdating$ = this.usersFacadeService.userNameUpdating$;

        this.profileImageUploading$ = this.usersFacadeService.profileImageUploading$;

        this.profileInfoUpdating$ = this.usersFacadeService.profileInfoUpdating$;

        this.passwordUpdating$ = this.usersFacadeService.passwordUpdating$;

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

    public uploadProfileImage(file: File): void {
        if (!this.userId) {
            return;
        }

        this.usersFacadeService.uploadProfileImage({
            userId: this.userId,
            file: file
        });
    }

    public removeProfileImage(url: string): void {
        this.usersFacadeService.removeProfileImage(this.userId, url);
    }

    public updateProfileInfo(profileInfoChange: UserProfileInfoChange): void {
        this.usersFacadeService.updateProfileInfo(this.userId, profileInfoChange);
    }
}
