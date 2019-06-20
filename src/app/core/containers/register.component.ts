import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '@etdb/core/models';

import { AuthFacadeService, TitleFacadeService } from '@etdb/core/+state/facades';
import { map } from 'rxjs/operators';

@Component({
    selector: 'etdb-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading$: Observable<boolean>;
    message$: Observable<string>;

    public constructor(private authFacadeService: AuthFacadeService, private titleFacadeService: TitleFacadeService) {
        this.titleFacadeService.setTitle('Register');
        this.loading$ = this.authFacadeService.registering$;
        this.message$ = this.loading$.pipe(map(loading => loading ? 'Registering' : null));
    }

    public register(registerUser: RegisterUser) {
        this.authFacadeService.registerUser(registerUser);
    }
}
