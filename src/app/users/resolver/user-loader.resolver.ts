import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '@etdb/models';
import { Observable } from 'rxjs';
import { UsersFacadeService } from '@etdb/users/+state/facades';
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
    public constructor(private userFacadeService: UsersFacadeService) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<User> {
        this.userFacadeService.load(route.params['id']);

        return this.userFacadeService.awaitUserLoaded().pipe(
            take(1),
            mergeMap(() => this.userFacadeService.selectedUser$.pipe(take(1)))
        );
    }
}
