import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthFacadeService } from '@etdb/core/+state/facades';

@Injectable()
export class NotSignedInGuard implements CanActivate {
    public constructor(
        private router: Router,
        private authFacadeService: AuthFacadeService,
    ) {
    }

    public canActivate(): Observable<boolean> {
        return this.authFacadeService.awaitAuthenticated().pipe(
            switchMap(() => this.checkNotSignedIn())
        );
    }

    private checkNotSignedIn(): Observable<boolean> {
        return this.authFacadeService.authenticated$.pipe(
            switchMap(loggedIn => {
                if (loggedIn) {
                    this.router.navigate(['']);
                }

                return of(!loggedIn);
            })
        );
    }
}
