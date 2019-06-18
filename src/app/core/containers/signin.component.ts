import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '@etdb/core/models';

import { TitleFacadeService, AuthFacadeService } from '@etdb/core/+state/facades';

@Component({
    selector: 'etdb-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.scss']
})
export class SignInComponent {
    loading$: Observable<boolean>;

    public constructor(private titleFacadeService: TitleFacadeService, private authFacadeService: AuthFacadeService) {
        this.titleFacadeService.setTitle('Sign-In');
        this.loading$ = this.authFacadeService.authLoading$;
    }

    public signIn(userCredentials: UserCredentials) {
        this.authFacadeService.signIn(userCredentials);
    }

    public googleSignIn(user: gapi.auth2.GoogleUser) {
        this.authFacadeService.googleSignIn(user);
    }

    public facebookSignIn(token: string) {
        this.authFacadeService.facebookSignIn(token);
    }
}
