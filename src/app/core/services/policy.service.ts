import * as fromRoot from '@etdb/reducers';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import * as fromUsers from '@etdb/users/reducers';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class PolicyService {
    public constructor(private store: Store<fromRoot.AppState>) { }

    public isSelectedUserIsLoggedInUser(): Observable<boolean> {
        return combineLatest(this.store.select(fromRoot.getAuthIdentityUser), this.store.select(fromUsers.getSelectedUser))
            .pipe(map(([identityUser, loggedInUser]) => {
                if ((!identityUser && !loggedInUser) || !identityUser || !loggedInUser) {
                    return false;
                }

                return identityUser.sub === loggedInUser.id;
            }));
    }
}
