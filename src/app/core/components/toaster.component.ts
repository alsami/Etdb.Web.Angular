import {
    trigger, state, style, transition,
    animate,
} from '@angular/animations';

export const slideUpDown = [
    trigger('slideUpDown', [
        state('0', style({ 'opacity': '1' })),
        state('1', style({ 'opacity': '0' })),
        transition(':enter', animate('400ms ease-in-out')),
        transition('* => *', animate('600ms ease-in-out')),
    ])
];

import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ViewChild,
    OnInit,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import {
    Overlay,
    OverlayPositionBuilder,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortalDirective, Portal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'etdb-toaster',
    templateUrl: 'toaster.component.html',
    styleUrls: ['toaster.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideUpDown],
})
export class ToasterComponent
    implements OnInit, OnDestroy, AfterViewInit {
    @Input()
    loading: boolean;

    @ViewChild(TemplatePortalDirective, { static: false })
    templatePortal: Portal<any>;

    private overlayRef: OverlayRef;

    animationState$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public constructor(
        private overlay: Overlay,
        private overlayBuilder: OverlayPositionBuilder
    ) { }

    public ngOnInit(): void {
        this.overlayRef = this.buildOverLayRef();
        setInterval(() => {
            console.log('current animation!', this.animationState$.getValue());
            // this.animationState = this.animationState === 'visible' ? 'void' : 'visible';
            this.animationState$.next(!this.animationState$.getValue());
            console.log('animation changed!', this.animationState$.getValue());
        }, 5000);
    }

    public ngAfterViewInit(): void {
        this.overlayRef.attach(this.templatePortal);
    }

    public ngOnDestroy(): void {
        this.safeDetach();
    }

    private buildOverLayRef(): OverlayRef {
        return this.overlay.create({
            positionStrategy: this.overlayBuilder
                .global()
                .centerHorizontally()
            // .top('100%')
            // .centerVertically()
        });
    }

    private safeDetach(): void {
        if (!this.overlayRef || !this.overlayRef.hasAttached()) {
            return;
        }

        this.overlayRef.detach();
    }
}
