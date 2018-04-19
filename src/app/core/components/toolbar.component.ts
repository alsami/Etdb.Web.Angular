import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layoutActions from '../actions/layout.actions';
import { VALID_THEMES_DESC } from '@etdb/core/core.constants';
import { IdentityUser } from '@etdb/core/models';

@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent {
    @Output() requestThemeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestLogout: EventEmitter<void> = new EventEmitter<void>();
    @Input() title = '';
    @Input() sidenavVisible: boolean;
    @Input() user: IdentityUser;
    themes = VALID_THEMES_DESC;

    public constructor(private store: Store<fromRoot.AppState>) {}

    public toggleSidenav(): void {
        if (!this.sidenavVisible) {
            this.openSidenav();
        } else {
            this.closeSidenav();
        }
    }

    public getUserGreeting(): string {
        return 'Hello ' + this.user.preferred_username;
    }

    private openSidenav(): void {
        this.store.dispatch(new layoutActions.OpenSidenav());
    }

    private closeSidenav(): void {
        this.store.dispatch(new layoutActions.CloseSidenav());
    }
}
