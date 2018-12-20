import { WaitingForAuthGuard } from '@etdb/abstractions/guards';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '@etdb/reducers';
import * as fromUsers from '@etdb/users/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { UserApiActions } from '@etdb/users/actions';

@Injectable()
export class UserIsSignedInUserGuard extends WaitingForAuthGuard {
    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        protected store: Store<fromRoot.AppState>
    ) {
        super(store);
    }

    public canActivate(): Observable<boolean> {
        const id = this.route.snapshot.params['id'] as string;

        this.store.dispatch(new UserApiActions.Load(id));

        return this.waitForAuthToLoad().pipe(
            switchMap(x => {
                console.log('hi1111', x);
                return this.waitForUserToLoad().pipe(
                    switchMap(() => {
                        console.log('hi');
                        return this.checkSelectedUserIsSignedInUser();
                    })
                );
            })
        );
    }

    private checkSelectedUserIsSignedInUser(): Observable<boolean> {
        return this.store.select(fromUsers.getSelectedUserIsSignedInUser).pipe(
            switchMap(selectedUserIsSignedInUser => {
                if (!selectedUserIsSignedInUser) {
                    this.router.navigate(['unauthorized']);
                }

                return of(!selectedUserIsSignedInUser);
            })
        );
    }

    private waitForUserToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(fromUsers.getUserFetching),
            filter(fetching => fetching),
            take(1)
        );
    }
}
