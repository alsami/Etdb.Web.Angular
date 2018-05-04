import { Component, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserLogin } from '@etdb/core/models';

@Component({
    selector: 'etdb-login-form',
    templateUrl: 'login-form.component.html',
    styleUrls: [
        'login-form.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
    @Output() requestLogin: EventEmitter<UserLogin> =
        new EventEmitter<UserLogin>();

    @ViewChild('passwordInput') passwordInput: ElementRef;

    loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public isFormValid(): boolean {
        return this.loginForm.valid;
    }

    public logInput(): void {
        console.log(this.passwordInput);
    }

    public changePasswordVisibility(): void {
        this.passwordInput.nativeElement.type === 'password'
            ? this.passwordInput.nativeElement.type = 'text'
            : this.passwordInput.nativeElement.type = 'password';
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
