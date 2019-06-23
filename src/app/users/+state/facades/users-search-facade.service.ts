import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '@etdb/users/+state/reducers';
import { Observable } from 'rxjs';
import { UserSearchActions } from '@etdb/users/+state/actions';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class UsersSearchFacadeService {
    public checkingUserNameAvailability$: Observable<boolean>;
    public userNameAvailable$: Observable<boolean>;

    public constructor(private store: Store<fromUsers.UsersState>) {
        this.checkingUserNameAvailability$ = this.store.pipe(select(fromUsers.getSearchCheckingUserNameAvailability));
        this.userNameAvailable$ = this.store.pipe(select(fromUsers.getSearchUserNameAvailable));
    }

    public checkUserNameAvailability(userName: string): void {
        this.store.dispatch(new UserSearchActions.AvailabilityCheck(userName));
    }

    public awaitCheckUserNameAvailabilityCompletion(): Observable<boolean> {
        return this.store.pipe(
            select(fromUsers.getSearchUserNameAvailibilityCheckCompleted),
            filter(completed => completed),
            take(1));
    }
}
