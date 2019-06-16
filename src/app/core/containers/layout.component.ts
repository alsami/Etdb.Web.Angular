import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    AfterViewChecked,
    ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IdentityUser } from '@etdb/core/models';

import * as fromRoot from '@etdb/+state';
import * as layoutActions from '../+state/actions/layout.actions';
import * as authActions from '../+state/actions/auth.actions';
import { BreakpointService } from '@etdb/core/services';
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortalDirective, Portal } from '@angular/cdk/portal';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    private overlayRef: OverlayRef;
    private interval;
    private mediaObserver: Subscription;


    @ViewChild(TemplatePortalDirective, { static: false })
    templatePortal: Portal<any>;

    showSidenav$: Observable<boolean>;
    title$: Observable<string>;
    user$: Observable<IdentityUser>;
    sidenavMode: string;
    layoutGap: string;

    public dots$: BehaviorSubject<string> = new BehaviorSubject('');

    public restoringSignIn$: Observable<boolean>;


    public constructor(
        private store: Store<fromRoot.AppState>,
        private breakpointService: BreakpointService,
        private overlay: Overlay,
        private overlayBuilder: OverlayPositionBuilder,
        private cdr: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.subscribeLayoutSizeChange();
        this.title$ = this.store.select(fromRoot.getTitle);
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlayBuilder
                .global()
                .centerHorizontally()
                .centerVertically(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop'
        });

    }

    public ngAfterViewInit(): void {
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.user$ = this.store.select(fromRoot.getAuthIdentityUser);
        this.restoringSignIn$ = this.store.select(fromRoot.getAuthSigningIn);

        this.restoringSignIn$.pipe(delay(0)) // delaying to make sure expressionchanged exception not thrown
            .subscribe(restoringSignIn => {
                if (!restoringSignIn) {
                    this.safeDetachOverlay();
                    clearInterval(this.interval);
                    this.cdr.markForCheck();
                    return;
                }

                if (this.overlayRef.hasAttached()) {
                    return;
                }

                this.overlayRef.attach(this.templatePortal);
                this.interval = setInterval(() => {
                    if (this.dots$.getValue().length === 0) {
                        this.dots$.next('.');
                        return;
                    }

                    if (this.dots$.getValue().length === 1) {
                        this.dots$.next('..');
                        return;
                    }

                    if (this.dots$.getValue().length === 2) {
                        this.dots$.next('...');
                        return;
                    }

                    this.dots$.next('');
                }, 500);
            });
    }

    public ngAfterViewChecked(): void {
    }

    public ngOnDestroy(): void {
        this.mediaObserver.unsubscribe();
    }

    public changeTheme(theme: string): void {
        this.store.dispatch(new layoutActions.SwitchTheme(theme));
    }

    public logout(): void {
        this.store.dispatch(new authActions.SignOut());
    }

    public toggleSidenav(visible: boolean): void {
        visible
            ? this.store.dispatch(new layoutActions.OpenSidenav())
            : this.store.dispatch(new layoutActions.CloseSidenav());
    }

    public toggleSidenavBasesOnSize(): void {
        if (
            !this.breakpointService.isExtraSmallDevice() &&
            !this.breakpointService.isSmallDevice()
        ) {
            return;
        }

        this.store.dispatch(new layoutActions.CloseSidenav());
    }

    private subscribeLayoutSizeChange(): void {
        this.mediaObserver = this.breakpointService
            .hasBreakpointChanged()
            .subscribe(changed => {
                if (!changed) {
                    return;
                }

                this.determineSidenavMode();
                this.determineLayoutGap();
            });
    }

    private determineSidenavMode(): void {
        if (
            this.breakpointService.isExtraSmallDevice() ||
            this.breakpointService.isSmallDevice()
        ) {
            this.sidenavMode = 'over';
            this.toggleSidenav(false);
            return;
        }

        this.sidenavMode = 'side';
    }

    private determineLayoutGap(): void {
        if (this.breakpointService.isExtraSmallDevice()) {
            this.layoutGap = '56';
            return;
        }

        this.layoutGap = '64';
    }

    private safeDetachOverlay(): void {
        if (!this.overlayRef || !this.overlayRef.hasAttached()) {
            return;
        }

        this.overlayRef.detach();
    }
}
