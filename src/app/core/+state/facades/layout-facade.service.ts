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
    public showSidenav$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.currentTheme$ = this.store.select(fromRoot.getTheme);
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.store.dispatch(new LayoutActions.RestoreTheme());
    }

    public restoreTheme(): void {
        this.store.dispatch(new LayoutActions.RestoreTheme());
    }

    public changeTheme(newTheme: string): void {
        this.store.dispatch(new LayoutActions.SwitchTheme(newTheme));
    }

    public toggleSidenav(show: boolean): void {
        show
            ? this.store.dispatch(new LayoutActions.OpenSidenav())
            : this.store.dispatch(new LayoutActions.CloseSidenav());
    }
}
