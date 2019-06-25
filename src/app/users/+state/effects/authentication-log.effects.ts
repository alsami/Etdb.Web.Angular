import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthenticationLogService } from '@etdb/users/services';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthenticationLogActions } from '@etdb/users/+state/actions';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthenticationLogEffects {
    @Effect() loadLogs$: Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationLogActions.AuthenticationLogActionTypes.Load),
        switchMap((action: AuthenticationLogActions.Load) => this.authenticationLogsService.loadLogs(action.url).pipe(
            map(logs => new AuthenticationLogActions.Loaded(logs)),
            catchError((error: Error) => of(new AuthenticationLogActions.LoadFailed(error)))
        ))
    );

    public constructor(private actions$: Actions, private authenticationLogsService: AuthenticationLogService) { }
}
