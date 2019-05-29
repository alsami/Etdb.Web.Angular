import {
    Component,
    OnDestroy,
    Input,
    ContentChildren,
    QueryList,
    ViewChild,
    TemplateRef,
    ChangeDetectionStrategy,
    AfterViewChecked,
    ChangeDetectorRef,
    AfterViewInit
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatStepperStepExtendedComponent } from '@etdb/custom-controls/component';

@Component({
    selector: 'etdb-mat-stepper-extended',
    templateUrl: 'mat-stepper-extended.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatStepperExtendedComponent
    implements AfterViewInit, AfterViewChecked, OnDestroy {
    public selectedIndex = 0;
    public isMobile: boolean;
    public template: TemplateRef<any>;

    @Input()
    isLinear = true;
    @Input()
    startAtIndex: number;
    @Input()
    nextButtonLabel = 'Next';
    @Input()
    endButtonLabel = 'Done';
    @Input()
    previousButtonLabel = 'Previous';
    @Input()
    observeableBreakpoints: string | string[] = ['(max-width: 599px)'];

    @ContentChildren(MatStepperStepExtendedComponent)
    public steps: QueryList<MatStepperStepExtendedComponent>;

    @ViewChild('stepper', { static: false })
    stepper: MatStepper;

    private breakpointSubscriber: Subscription;

    public constructor(
        private breakpointObserver: BreakpointObserver,
        private changeDetector: ChangeDetectorRef
    ) { }

    public ngAfterViewInit(): void {
        this.breakpointSubscriber = this.breakpointObserver
            .observe(this.observeableBreakpoints)
            .subscribe((state: BreakpointState) => {
                this.setMobileStepper(state.matches);
            });

        if (!this.startAtIndex) {
            return;
        }

        this.selectedIndex = this.startAtIndex;
    }

    public ngAfterViewChecked(): void {
        this.stepper.selectedIndex = this.selectedIndex;
    }

    public ngOnDestroy(): void {
        this.breakpointSubscriber.unsubscribe();
    }

    public selectionChanged(event: any): void {
        this.selectedIndex = event.selectedIndex;
    }

    public setMobileStepper(isMobile: boolean): void {
        this.isMobile = isMobile;
        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }

    public rightButtonText = (isLast: boolean): string =>
        isLast ? this.endButtonLabel : this.nextButtonLabel

    public reset = (): void => this.stepper.reset();
}
