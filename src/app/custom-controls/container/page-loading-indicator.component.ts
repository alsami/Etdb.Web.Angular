import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ViewChild,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortalDirective, Portal } from '@angular/cdk/portal';
import { BreakpointService } from '@etdb/core/services';
import { Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'etdb-page-loading-indicator',
    templateUrl: 'page-loading-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoadingIndicatorComponent
    implements OnInit, OnDestroy, AfterViewInit {
    @Input()
    loading: boolean;

    @ViewChild(TemplatePortalDirective)
    templatePortal: Portal<any>;

    private overlayRef: OverlayRef;
    private breakpointSubscription: Subscription;
    private isExtrasmallWindow: boolean;

    public constructor(
        private overlay: Overlay,
        private overlayBuilder: OverlayPositionBuilder,
        private breakpointService: BreakpointService
    ) {}

    public ngOnInit(): void {
        this.overlayRef = this.buildOverLayRef(56);
    }

    public ngAfterViewInit(): void {
        this.overlayRef.attach(this.templatePortal);

        this.breakpointSubscription = this.breakpointService
            .hasBreakpointChanged(Breakpoints.XSmall)
            .subscribe(isExtraSmall => this.redraw(isExtraSmall));
    }

    public ngOnDestroy(): void {
        this.breakpointSubscription.unsubscribe();

        this.safeDetach();
    }

    private redraw(isExtraSmall: boolean): void {
        if (this.isExtrasmallWindow === isExtraSmall) {
            return;
        }

        this.isExtrasmallWindow = isExtraSmall;

        this.safeDetach();

        this.overlayRef = this.buildOverLayRef(
            this.isExtrasmallWindow ? 56 : 64
        );

        this.overlayRef.attach(this.templatePortal);
    }

    private buildOverLayRef(size: 56 | 64): OverlayRef {
        return this.overlay.create({
            positionStrategy: this.overlayBuilder
                .global()
                .top(`${size}px`)
                .width('100%')
        });
    }

    private safeDetach(): void {
        if (!this.overlayRef || !this.overlayRef.hasAttached()) {
            return;
        }

        this.overlayRef.detach();
    }
}
