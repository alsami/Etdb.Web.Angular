import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '@etdb/core/validators';
import { UserPasswordChange } from '@etdb/users/models';

@Component({
    selector: 'etdb-user-pwd-change-form',
    templateUrl: 'user-passwordchange-form.component.html',
    styleUrls: ['user-passwordchange-form.component.scss']
})
export class UserPasswordchangeFormComponent implements OnInit {
    @Input()
    public loading: boolean;
    @Output()
    public requestPwdChange: EventEmitter<
        UserPasswordChange
    > = new EventEmitter();

    public pwdChangeForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.buildForm();
    }

    public submit(): void {
        if (!this.pwdChangeForm.valid || this.loading) {
            return;
        }

        const model = <UserPasswordChange>{
            ...this.pwdChangeForm.value
        };

        this.requestPwdChange.emit(model);
    }

    public changePasswordVisibility(inputElement: HTMLInputElement): void {
        inputElement.type === 'password'
            ? (inputElement.type = 'text')
            : (inputElement.type = 'password');
    }

    public hasMinLengthPasswordError(controlName: string): boolean {
        return this.pwdChangeForm.controls[controlName].hasError('minlength');
    }

    public hasMismatchedPasswordError(): boolean {
        return this.pwdChangeForm.controls['newPasswordRepeat'].hasError(
            'mismatchedPassword'
        );
    }

    private buildForm(): void {
        this.pwdChangeForm = this.formBuilder.group(
            {
                currentPassword: [
                    null,
                    [Validators.required, Validators.minLength(8)]
                ],
                newPassword: [
                    null,
                    [Validators.required, Validators.minLength(8)]
                ],
                newPasswordRepeat: [
                    null,
                    [Validators.required, Validators.minLength(8)]
                ]
            },
            {
                validator: PasswordValidator.mismatchedPassword(
                    'newPassword',
                    'newPasswordRepeat'
                )
            }
        );
    }
}
