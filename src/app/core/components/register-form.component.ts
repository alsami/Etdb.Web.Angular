import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterUser } from '@etdb/core/models';
import { PasswordValidator } from '@etdb/core/validators';

@Component({
    selector: 'etdb-register-form',
    templateUrl: 'register-form.component.html'
})

export class RegisterFormComponent {
    @Output() requestRegister: EventEmitter<RegisterUser> =
        new EventEmitter<RegisterUser>();

    registerFormGroup: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public isFormValid(): boolean {
        return this.registerFormGroup.valid;
    }

    public hasMismatchedPasswordError(): boolean {
        const hasPasswordError = this.registerFormGroup
            .controls['passwordRepeat'].hasError('mismatchedPassword');

        console.log(hasPasswordError);

        return hasPasswordError;
    }

    public changePasswordVisibility(inputElement: HTMLInputElement): void {
        inputElement.type === 'password'
            ? inputElement.type = 'text'
            : inputElement.type = 'password';
    }

    public submit(): void {
        const registerUser: RegisterUser = Object.assign({}, this.registerFormGroup.value);
        this.requestRegister.emit(registerUser);
    }

    private buildForm(): void {
        this.registerFormGroup = this.formBuilder.group({
            name: [
                '', Validators.required
            ],
            lastName: [
                '', Validators.required
            ],
            userName: [
                '', Validators.required
            ],
            email: [
                '', [Validators.required, Validators.email]
            ],
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required]
        }, { validator: PasswordValidator.mismatchedPassword('password', 'passwordRepeat') });
    }
}
