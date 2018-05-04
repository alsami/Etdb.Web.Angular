import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RegisterUser } from '@etdb/core/models';
import { PasswordValidator } from '@etdb/core/validators';

export const hasPrimaryEmailError = 'hasPrimary';

export const hasMultiplePrimaryEmails = 'hasMultiplePrimary';

function primaryEmailValidation(primaryControlName: string): any {
    return (array: FormArray): { [key: string]: any } => {
        if (!array) {
            return null;
        }

        const groups = array.controls as FormGroup[];

        const groupsMarkedAsPrimary = groups
            .filter(group => (group.controls[primaryControlName].value as boolean));

        if (groupsMarkedAsPrimary.length > 1) {
            return { 'hasMultilePrimary': {
                valid: false
            }};
        }

        if (groupsMarkedAsPrimary.length === 0) {
            return { 'hasNoPrimary': {
                valid: false
            }};
        }

        return null;
    };
}

@Component({
    selector: 'etdb-register-form',
    templateUrl: 'register-form.component.html',
    styleUrls: ['register-form.component.scss']
})

export class RegisterFormComponent {
    @Output() requestRegister: EventEmitter<RegisterUser> =
        new EventEmitter<RegisterUser>();

    registerForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public getEmailFormArray(): FormArray {
        return this.registerForm.controls['emails'] as FormArray;
    }

    public hasMultiplePrimaryEmails(): boolean {
        return this.getEmailFormArray()
            .hasError('hasMultilePrimary');
    }

    public hasPrimaryEmailError(): boolean {
        return this.getEmailFormArray()
        .getError('hasNoPrimary');
    }

    hasInvalidEmailError(index: number): boolean {
        return (this.getEmailFormArray().at(index) as FormGroup)
        .controls['address']
        .hasError('email');
    }

    public hasMismatchedPasswordError(): boolean {
        return this.registerForm
            .controls['passwordRepeat']
            .hasError('mismatchedPassword');
    }

    public changePasswordVisibility(inputElement: HTMLInputElement): void {
        inputElement.type === 'password'
            ? inputElement.type = 'text'
            : inputElement.type = 'password';
    }

    public submit(): void {
        if (!this.registerForm.valid) {
            return;
        }

        const registerUser: RegisterUser = Object.assign({}, this.registerForm.value);
        this.requestRegister.emit(registerUser);
    }

    public appendEmailFormArray(): void {
        this.getEmailFormArray().push(this.createEmptyEmailGroup());
    }

    public removeEmailGroupFromFormArray(index: number): void {
        this.getEmailFormArray().removeAt(index);
    }

    public hasMinLengthPasswordError(): boolean {
        return this.registerForm
            .controls['password']
            .hasError('minlength');
    }

    private buildForm(): void {
        this.registerForm = this.formBuilder.group({
            name: [null],
            firstName: [null],
            userName: [null, Validators.required],
            emails: this.formBuilder.array([this.createEmptyEmailGroup(true)], primaryEmailValidation('isPrimary')),
            password: [null, [Validators.required, Validators.minLength(8)]],
            passwordRepeat: [null, Validators.required]
        }, { validator: PasswordValidator.mismatchedPassword('password', 'passwordRepeat') });
    }

    private createEmptyEmailGroup(markAsPrimary: boolean = false): FormGroup {
        return this.formBuilder.group({
            address: [null, [Validators.required, Validators.email]],
            isPrimary: [markAsPrimary]
        });
    }
}
