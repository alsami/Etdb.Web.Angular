import { Component, OnInit } from '@angular/core';
import { PRIMARY_THEME } from '@etdb/core/core.constants';
import * as fromRoot from '@etdb/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from '../actions/auth.actions';
import * as layoutActions from '../actions/layout.actions';
import {
    OverlayContainer,
} from '@angular/cdk/overlay';

@Component({
    selector: 'etdb-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public theme = PRIMARY_THEME;

    public restoringSignIn$: Observable<boolean>;

    public constructor(

        private overlayContainer: OverlayContainer,
        private store: Store<fromRoot.AppState>
    ) {
        this.store.dispatch(new layoutActions.RestoreTheme());
        this.store.dispatch(new authActions.RestoreSignIn());
    }

    public ngOnInit(): void {
        this.subscribeThemeChanges();

    }

    private subscribeThemeChanges(): void {
        this.store.select(fromRoot.getTheme).subscribe(theme => {
            if (theme !== this.theme) {
                this.overlayContainer
                    .getContainerElement()
                    .classList.remove(this.theme);
                this.theme = theme;
            }
            this.overlayContainer.getContainerElement().classList.add(theme);
        });
    }


}
