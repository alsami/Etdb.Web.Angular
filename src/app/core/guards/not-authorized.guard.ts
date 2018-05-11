import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as fromRoot from '@etdb/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class NotAuthorizedAuthGuard implements CanActivate {
    public constructor(private store: Store<fromRoot.AppState>, private router: Router) { }

    public canActivate(): Observable<boolean> {
        return this.waitForAuthToLoad().pipe(
            switchMap(() => this.isLoggedIn())
        );
    }

    private waitForAuthToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(fromRoot.getAuthLoaded),
            filter(loaded => loaded),
            take(1)
        );
    }

    private isLoggedIn(): Observable<boolean> {
        return this.store.pipe(
            select(fromRoot.getAuthLoggedIn),
            switchMap(loggedIn => {
                if (loggedIn) {
                    this.router.navigate(['/browse']);
                }

                return loggedIn ? of(false) : of(true);
            })
        );
    }
}
