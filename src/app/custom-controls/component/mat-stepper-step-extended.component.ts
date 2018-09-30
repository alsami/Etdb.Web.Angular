import { Component, Input, TemplateRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'etdb-mat-stepper-step-extended',
    templateUrl: 'mat-stepper-step-extended.component.html'
})
export class MatStepperStepExtendedComponent {
    @Input() isOptional = false;
    @Input() label: string;
    @Input() form: FormGroup;
    @ViewChild('matStepperExtendedStep') template: TemplateRef<any>;
    @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

    public submit(): void {
        this.formSubmitted.emit(this.form.value);
    }
}
