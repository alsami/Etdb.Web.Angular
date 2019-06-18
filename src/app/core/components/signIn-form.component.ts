import {
    Component,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserCredentials } from '@etdb/core/models';

@Component({
    selector: 'etdb-signin-form',
    templateUrl: 'signin-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent {
    @Output()
    requestSignIn: EventEmitter<UserCredentials> = new EventEmitter<UserCredentials>();

    @ViewChild('passwordInput', { static: false })
    passwordInput: ElementRef;

    loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public isFormValid(): boolean {
        return this.loginForm.valid;
    }

    public changePasswordVisibility(): void {
        this.passwordInput.nativeElement.type === 'password'
            ? (this.passwordInput.nativeElement.type = 'text')
            : (this.passwordInput.nativeElement.type = 'password');
    }

    public submit(): void {
        if (!this.isFormValid()) {
            return;
        }

        const userSignIn: UserCredentials = this.loginForm.value;
        this.requestSignIn.emit(userSignIn);
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
