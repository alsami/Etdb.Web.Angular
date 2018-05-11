import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '@etdb/core/models';
import { PasswordValidator, PrimaryEmailValidation } from '@etdb/core/validators';

@Component({
    selector: 'etdb-register-form',
    templateUrl: 'register-form.component.html',
    styleUrls: ['register-form.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.5 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class RegisterFormComponent {
    @Output() requestRegister: EventEmitter<RegisterUser> =
        new EventEmitter<RegisterUser>();

    public registerForm: FormGroup;

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
            emails: this.formBuilder.array([this.createEmptyEmailGroup(true)], PrimaryEmailValidation.primaryEmail('isPrimary')),
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
