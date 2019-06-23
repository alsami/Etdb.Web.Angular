import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserSearchActions } from '@etdb/users/+state/actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserSearchService } from '@etdb/users/services';

@Injectable()
export class UserSearchEffects {
    @Effect()
    checkAvailability$: Observable<Action> = this.actions$.pipe(
        ofType(UserSearchActions.UserSearchActionTypes.AvailabilityCheck),
        switchMap((action: UserSearchActions.AvailabilityCheck) => {
            return this.userSearchService.checkUserNameAvailability(action.userName).pipe(
                map(data => new UserSearchActions.AvailabilityChecked(data),
                    catchError(error => of(new UserSearchActions.AvailabilityCheckFailed(error)))
                ));
        }));

    public constructor(private actions$: Actions, private userSearchService: UserSearchService) { }
}
