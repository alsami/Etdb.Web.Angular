import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fromRoot from '@etdb/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WaitingForAuthGuard } from '@etdb/abstractions/guards';

@Injectable()
export class SignedInGuard extends WaitingForAuthGuard {
    public constructor(
        private router: Router,
        protected store: Store<fromRoot.AppState>
    ) {
        super(store);
    }
    public canActivate(): Observable<boolean> {
        return this.waitForAuthToLoad().pipe(
            switchMap(() => this.checkSignedIn())
        );
    }
    private checkSignedIn(): Observable<boolean> {
        return this.store.pipe(
            select(fromRoot.getAuthSignedIn),
            switchMap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['/signin']);
                }
                return of(loggedIn);
            })
        );
    }
}
