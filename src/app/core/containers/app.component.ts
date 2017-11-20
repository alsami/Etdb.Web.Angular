import { Store } from '@ngrx/store';
import { Component, ViewChild, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as configActions from '../actions/config.actions';
import { Overlay, OverlayRef, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { PRIMARY_THEME } from '../core.constants';

@Component({
  selector: 'etdb-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    private overlayRef: OverlayRef;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private subscription: Subscription;
    theme = PRIMARY_THEME;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;


    public constructor(private overlay: Overlay,
        private overlayContainer: OverlayContainer,
        private store: Store<fromRoot.AppState>) {
    }

    public ngOnInit(): void {
      this.store.dispatch(new configActions.LoadClientConfigAction());
      this.store.select(fromRoot.getTheme).subscribe(theme => {
        if (theme !== this.theme) {
          this.overlayContainer.getContainerElement().classList.remove(this.theme);
          this.theme = theme;
        }
        this.overlayContainer.getContainerElement().classList.add(theme);
      });
      this.subscription = Observable.combineLatest(
        this.store.select(fromRoot.getAuthLoading),
        this.store.select(fromRoot.getConfigLoading)
      ).delay(200)
      .subscribe(([authLoading, configLoading]) => {
        const isLoading = authLoading || configLoading;
        this.loading$.next(isLoading);
        if (!isLoading) {
          this.overlayRef.detach();
          this.subscription.unsubscribe();
        }
      });

      this.initializeOverlay();
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
