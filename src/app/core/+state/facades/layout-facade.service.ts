import { Injectable } from '@angular/core';
import * as fromRoot from '@etdb/+state';
import { Store } from '@ngrx/store';
import { LayoutActions } from '@etdb/core/+state/actions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutFacadeService {
    public currentTheme$: Observable<string>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.currentTheme$ = this.store.select(fromRoot.getTheme);
        this.store.dispatch(new LayoutActions.RestoreTheme());
    }

    public restoreTheme(): void {
        this.store.dispatch(new LayoutActions.RestoreTheme());
    }
}
