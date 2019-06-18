import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '@etdb/core/models';

import { AuthFacadeService, TitleFacadeService } from '@etdb/core/+state/facades';

@Component({
    selector: 'etdb-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading$: Observable<boolean>;

    public constructor(private authFacadeService: AuthFacadeService, private titleFacadeService: TitleFacadeService) {
        this.titleFacadeService.setTitle('Register');
        this.loading$ = this.authFacadeService.registering$;
    }

    public register(registerUser: RegisterUser) {
        this.authFacadeService.registerUser(registerUser);
    }
}
