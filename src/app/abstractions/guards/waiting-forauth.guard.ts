import { CanActivate } from '@angular/router';
import * as fromRoot from '@etdb/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export abstract class WaitingForAuthGuard implements CanActivate {
    protected constructor(protected store: Store<fromRoot.AppState>) {}
    protected waitForAuthToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(fromRoot.getAuthLoaded),
            filter(loaded => loaded),
            take(1)
        );
    }

    public abstract canActivate(): Observable<boolean>;
}
