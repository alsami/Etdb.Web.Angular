import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '@etdb/users/+state/reducers';
import { Observable } from 'rxjs';
import { AuthenticationLog } from '@etdb/models';
import { AuthenticationLogActions } from '@etdb/users/+state/actions';

@Injectable()
export class AuthenticationLogFacadeService {
    public loadingAuthenticationLogs$: Observable<boolean>;
    public authenticationLogs$: Observable<AuthenticationLog[]>;

    public constructor(private store: Store<fromUsers.UsersState>) {
        this.loadingAuthenticationLogs$ = this.store.pipe(select(fromUsers.getAuthenticationLogsLoadingLogs));
        this.authenticationLogs$ = this.store.pipe(select(fromUsers.getAuthenticationLogs));
    }

    public loadLogs(url: string): void {
        this.store.dispatch(new AuthenticationLogActions.Load(url));
    }
}
