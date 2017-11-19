import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';

@Component({
    selector: 'etdb-login-form',
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    @Output() requestLogin: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();
    loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public isFormValid(): boolean {
        return this.loginForm.valid;
    }

    public submit(): void {
        const userLogin: UserLogin = Object.assign({}, this.loginForm.value);
        this.requestLogin.emit(userLogin);
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: [
                '', Validators.required
            ],
            password:  [
                '', Validators.required
            ]
        });
    }
}
