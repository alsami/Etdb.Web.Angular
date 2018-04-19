import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/reducers';
import * as layoutActions from '../actions/layout.actions';
import * as authActions from '../actions/auth.actions';
import { IdentityUser } from '@etdb/core/models';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutComponent {
    showSidenav$: Observable<boolean>;
    title$: Observable<string>;
    user$: Observable<IdentityUser>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.title$ = this.store.select(fromRoot.getTitle);
        this.user$ = this.store.select(fromRoot.getIdentityUser);
    }

    public dispatchThemeChange(theme: string): void {
        this.store.dispatch(new layoutActions.SwitchThemeAction(theme));
    }

    public dispatchLogout(): void {
        this.store.dispatch(new authActions.LogoutAction());
    }
}
