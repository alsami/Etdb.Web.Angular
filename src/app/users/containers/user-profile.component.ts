import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@etdb/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleFacadeService } from '@etdb/core/+state/facades';
import { UsersFacadeService } from '@etdb/users/+state/facades';

@Component({
    selector: 'etdb-user',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    public loggedInUserIsUser$: Observable<boolean>;
    public loading$: Observable<boolean>;
    public user$: Observable<User>;

    public constructor(
        private route: ActivatedRoute,
        private titleFacadeService: TitleFacadeService,
        private userFacadeService: UsersFacadeService,
    ) { }

    public ngOnInit(): void {
        this.loading$ = this.userFacadeService.fetching$;

        this.user$ = this.route.data.pipe(
            map((userData: { user: User }) => {
                if (!userData.user) {
                    return;
                }

                this.titleFacadeService.setTitle(`User | ${userData.user.userName}`);
                return userData.user;
            })
        );

        this.loggedInUserIsUser$ = this.userFacadeService.selectedUserIsAuthenticatedUser$;
    }
}
