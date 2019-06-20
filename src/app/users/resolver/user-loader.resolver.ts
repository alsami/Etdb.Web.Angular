import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '@etdb/models';
import { Observable } from 'rxjs';
import { UsersFacadeService } from '@etdb/users/+state/facades';

@Injectable()
export class UserResolver implements Resolve<User> {
    public constructor(private userFacadeService: UsersFacadeService) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<User> {
        this.userFacadeService.load(route.params['id']);

        return this.userFacadeService.selectedUser$;
    }
}
