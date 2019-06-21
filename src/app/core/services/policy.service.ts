import * as fromRoot from '@etdb/+state';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import * as fromUsers from '@etdb/users/+state/reducers';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PolicyService {
    public constructor(private store: Store<fromRoot.AppState>) { }

    public isSelectedUserIsLoggedInUser(): Observable<boolean> {
        return combineLatest(this.store.select(fromRoot.getAuthenticatedUser), this.store.select(fromUsers.getSelectedUser))
            .pipe(map(([identityUser, loggedInUser]) => {
                if ((!identityUser && !loggedInUser) || !identityUser || !loggedInUser) {
                    return false;
                }

                return identityUser.id === loggedInUser.id;
            }));
    }
}
