import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ChangeDetectorRef,
    ViewContainerRef,
    TemplateRef
} from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { IdentityUser } from '@etdb/core/models';

import { BreakpointService } from '@etdb/core/services';
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { LayoutFacadeService, AuthFacadeService, TitleFacadeService } from '@etdb/core/+state/facades';
import { AppNotification } from '@etdb/app-notification/models';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
    private overlayRef: OverlayRef;
    private interval;
    private mediaObserver: Subscription;
    private authenticatedUserId: string;


    @ViewChild('overlay', { static: false })
    templatePortal: TemplateRef<any>;

    public showSidenav$: Observable<boolean>;
    public title$: Observable<string>;
    public user$: Observable<IdentityUser>;
    public notifications$: Observable<AppNotification[]>;
    public unreadAppNotificationsCount$: Observable<number>;
    public sidenavMode: string;
    public layoutGap: string;

    public dots$: BehaviorSubject<string> = new BehaviorSubject('');

    public restoringSignIn$: Observable<boolean>;

    public showNotifications = false;


    public constructor(
        private breakpointService: BreakpointService,
        private overlay: Overlay,
        private overlayBuilder: OverlayPositionBuilder,
        private cdr: ChangeDetectorRef,
        private layoutFacadeService: LayoutFacadeService,
        private authFacadeService: AuthFacadeService,
        private titleFacadeService: TitleFacadeService,
        private appNotificationsFacade: AppNotificationsFacadeService,
        private viewContainerRef: ViewContainerRef,
    ) { }

    public ngOnInit(): void {
        this.subscribeLayoutSizeChange();
        this.title$ = this.titleFacadeService.currentTitle$;
        this.unreadAppNotificationsCount$ = this.appNotificationsFacade.unreadAppNotifications$;
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
        this.showSidenav$ = this.layoutFacadeService.showSidenav$;
        this.user$ = this.authFacadeService.authenticatedUser$;
        this.restoringSignIn$ = this.authFacadeService.authenticating$;

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

                this.overlayRef.attach(new TemplatePortal(this.templatePortal, this.viewContainerRef));

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

        this.user$.pipe(
        ).subscribe(authenticatedUser => {
            if (!authenticatedUser)  {
                this.authenticatedUserId = null;
                return;
            }

            if (!this.authenticatedUserId) {
                this.authenticatedUserId = authenticatedUser.id;
                this.appNotificationsFacade.restore(this.authenticatedUserId);
                return;
            }

            if (authenticatedUser.id === this.authenticatedUserId) {
                return;
            }

            this.appNotificationsFacade.restore(this.authenticatedUserId);
        });
    }

    public ngOnDestroy(): void {
        this.mediaObserver.unsubscribe();
    }

    public changeTheme(theme: string): void {
        this.layoutFacadeService.changeTheme(theme);
    }

    public logout(): void {
        this.authFacadeService.signOut();
    }

    public toggleSidenav(show: boolean): void {
        this.layoutFacadeService.toggleSidenav(show);
    }

    public toggleNotifications(show: boolean): void {
        this.showNotifications = show;
        console.log('showNotifications', this.showNotifications);
    }

    public toggleSidenavBasesOnSize(): void {
        if (
            !this.breakpointService.isExtraSmallDevice() &&
            !this.breakpointService.isSmallDevice()
        ) {
            return;
        }

        this.layoutFacadeService.toggleSidenav(false);
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
            this.layoutFacadeService.toggleSidenav(false);
            return;
        }

        this.sidenavMode = 'side';
    }

    private determineLayoutGap(): void {
        if (this.breakpointService.isExtraSmallDevice() ||
                this.breakpointService.isSmallDevice()) {
            this.layoutGap = '0';
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
