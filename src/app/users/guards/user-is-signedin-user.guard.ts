import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthFacadeService } from '@etdb/core/+state/facades';
import { UsersFacadeService } from '@etdb/users/+state/facades';

@Injectable()
export class UserIsSignedInUserGuard implements CanActivate {

    public constructor(
        private router: Router,
        private authFacadeService: AuthFacadeService,
        private userFacadeService: UsersFacadeService,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.userFacadeService.load(route.paramMap.get('id'));

        return this.authFacadeService.awaitAuthenticated()
            .pipe(
                switchMap(() => {
                    return this.userFacadeService.awaitUserLoaded().pipe(
                        switchMap(() => {
                            return this.checkSelectedUserIsSignedInUser();
                        })
                    );
                })
            );
    }

    private checkSelectedUserIsSignedInUser(): Observable<boolean> {
        return this.userFacadeService.selectedUserIsAuthenticatedUser$.pipe(
            switchMap(selectedUserIsSignedInUser => {
                if (!selectedUserIsSignedInUser) {
                    this.router.navigate(['/unauthorized']);
                }

                return this.userFacadeService.selectedUserIsAuthenticatedUser$;
            })
        );
    }
}
