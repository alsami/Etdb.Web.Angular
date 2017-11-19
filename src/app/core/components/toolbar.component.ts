import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layoutActions from '../actions/layout.actions';

@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent {
    @Input() title = '';
    @Input() sidenavVisible: boolean;

    public constructor(private store: Store<fromRoot.AppState>) {}

    public toggleSidenav(): void {
        if (!this.sidenavVisible) {
            this.openSidenav();
        } else {
            this.closeSidenav();
        }
    }

    private openSidenav(): void {
        this.store.dispatch(new layoutActions.OpenSidenav());
    }

    private closeSidenav(): void {
        this.store.dispatch(new layoutActions.CloseSidenav());
    }
}
