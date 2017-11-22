import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterUser } from '../models/register-user.model';

function matchingPasswords(password: string, passwordRepeat: string) {
    return (group: FormGroup): {[key: string]: any} => {
      if (group.controls[password].value !== group.controls[passwordRepeat].value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

@Component({
    selector: 'etdb-register-form',
    templateUrl: './register-form.component.html'
})

export class RegisterFormComponent {
    @Output() requestRegister: EventEmitter<RegisterUser> =
        new EventEmitter<RegisterUser>();

    @ViewChild('passwordInput') passwordInput: ElementRef;
    @ViewChild('passwordInputRepeat') passwordInputRepeat: ElementRef;

    registerFormGroup: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public isFormValid(): boolean {
        console.log(this.registerFormGroup);
        return this.registerFormGroup.valid;
    }

    public changePasswordVisibility(): void {
        this.passwordInput.nativeElement.type === 'password'
            ? this.passwordInput.nativeElement.type = 'text'
            : this.passwordInput.nativeElement.type = 'password';
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
        }, { validator: matchingPasswords('password', 'passwordRepeat') });
    }
}
