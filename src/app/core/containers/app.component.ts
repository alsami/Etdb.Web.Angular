import { Store } from '@ngrx/store';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { PRIMARY_THEME } from '../core.constants';
import * as layoutActions from '../actions/layout.actions';
import * as authActions from '../actions/auth.actions';
import * as fromRoot from '@app/reducers';

@Component({
  selector: 'etdb-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    private overlayRef: OverlayRef;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private authLoadingSubscription: Subscription;
    theme = PRIMARY_THEME;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;


    public constructor(private overlay: Overlay,
        private overlayContainer: OverlayContainer,
        private store: Store<fromRoot.AppState>) {
            this.store.dispatch(new layoutActions.RestoreThemeAction());
            this.store.dispatch(new authActions.RestoreLoginAction());
    }

    public ngOnInit(): void {
        this.subscribeThemeChanges();
        this.subscribeAuthLoading();
        this.initializeOverlay();
    }

    private subscribeThemeChanges(): void {
        this.store.select(fromRoot.getTheme).subscribe(theme => {
            if (theme !== this.theme) {
                this.overlayContainer.getContainerElement().classList.remove(this.theme);
                this.theme = theme;
            }
            this.overlayContainer.getContainerElement().classList.add(theme);
        });
    }

    private subscribeAuthLoading(): void {
        this.authLoadingSubscription = this.store.select(fromRoot.getAuthLoading)
        .delay(2500)
        .subscribe((loading: boolean) => {
            this.loading$.next(loading);
            if (!loading) {
                this.overlayRef.detach();
                this.authLoadingSubscription.unsubscribe();
            }
      });
    }

    private initializeOverlay(): void {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .centerVertically()
            .centerHorizontally();

        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-dark-backdrop';

        this.overlayRef = this.overlay.create(config);
        this.overlayRef.attach(this.templatePortal);
    }
}
