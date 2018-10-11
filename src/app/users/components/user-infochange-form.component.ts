import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    Input,
    ElementRef,
    ChangeDetectionStrategy,
    ViewContainerRef
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '@etdb/models';
import {
    OverlayPositionBuilder,
    Overlay,
    ConnectedPosition
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PageLoadingIndicatorComponent } from '@etdb/custom-controls/container';

@Component({
    selector: 'etdb-user-infochange-form',
    templateUrl: 'user-infochange-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfochangeComponent implements OnInit, OnChanges {
    @Input()
    user: User;

    @Input()
    loading: boolean;

    public infochangeForm: FormGroup;

    public constructor(
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        public elementRef: ElementRef,
        public overlayBuilder: OverlayPositionBuilder,
        public vcr: ViewContainerRef
    ) {
        const poses: ConnectedPosition[] = [
            {
                originX: 'start',
                originY: 'center',
                overlayX: 'center',
                overlayY: 'center',
                offsetY: 56
            }
        ];

        console.log(elementRef);

        const overlayx = this.overlay.create({
            positionStrategy: this.overlayBuilder
                .flexibleConnectedTo(elementRef.nativeElement)
                .withPositions(poses),
            hasBackdrop: true
        });

        overlayx.attach(
            new ComponentPortal(PageLoadingIndicatorComponent, vcr)
        );
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && this.user) {
            this.patchForm(this.user);
        }
    }

    public submit(): void {
        if (this.loading) {
            return;
        }

        const obj = this.infochangeForm.value;
        console.log('has value', obj);
    }

    private patchForm(user: User): void {
        setTimeout(() => {
            this.infochangeForm.patchValue(user);
        }, 100);
    }

    private buildForm(): void {
        this.infochangeForm = this.formBuilder.group({
            firstName: [null, null],
            name: [null, null],
            biography: [null, null]
        });
    }
}
