import { Component, OnInit, NgZone } from '@angular/core';
import { PRIMARY_THEME } from '@etdb/core/core.constants';
import * as fromRoot from '@etdb/reducers';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import * as authActions from '../actions/auth.actions';
import * as layoutActions from '../actions/layout.actions';
import {
    OverlayContainer,
} from '@angular/cdk/overlay';
import { environment } from 'environments/environment';

@Component({
    selector: 'etdb-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    private googleInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private facebookInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public theme = PRIMARY_THEME;

    public constructor(

        private overlayContainer: OverlayContainer,
        private store: Store<fromRoot.AppState>,
        private ngZone: NgZone
    ) {
        this.loadGoogleApi();
        this.subscribeThemeChanges();
        this.store.dispatch(new layoutActions.RestoreTheme());
    }

    public ngOnInit(): void {
        combineLatest(this.googleInitialized$, this.facebookInitialized$)
            .subscribe(([a, b]) => {
                if (!a || !b) {
                    return;
                }

                this.store.dispatch(new authActions.RestoreSignIn());
            });
    }

    private loadGoogleApi(): void {
        gapi.load('auth2', async () => {
            console.log('LOADED GAPI');
            gapi.auth2.init({
                client_id: environment.googleClientId,
                scope: 'profile email openid'
            });
            this.ngZone.run(() => this.googleInitialized$.next(true));
        });
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
