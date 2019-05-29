import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";

@Component({
    selector: "etdb-mat-stepper-step-extended",
    templateUrl: "mat-stepper-step-extended.component.html"
})
export class MatStepperStepExtendedComponent {
    @Input()
    isOptional = false;
    @Input()
    label: string;
    @Input()
    form: FormGroup;

    @ViewChild("matStepperExtendedStep", { static: false })
    template: TemplateRef<any>;

    @Input()
    submitAction: (...args) => void | any = (): void => {};

    public submit(): void {
        this.markFormControls(this.form);
        this.submitAction();
    }

    private markFormControls(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            form.controls[key].markAsTouched();

            if (form.controls[key] instanceof FormGroup) {
                this.markFormControls(<FormGroup>form.controls[key]);
            }

            if (!(form.controls[key] instanceof FormArray)) {
                return;
            }

            (form.controls[key] as FormArray).controls.forEach(
                (formGroup: FormGroup) => this.markFormControls(formGroup)
            );
        });
    }
}
