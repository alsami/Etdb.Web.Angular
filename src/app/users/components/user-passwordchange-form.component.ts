import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '@etdb/core/validators';

@Component({
    selector: 'etdb-user-pwd-change-form',
    templateUrl: 'user-passwordchange-form.component.html',
    styleUrls: ['user-passwordchange-form.component.scss']
})
export class UserPasswordchangeFormComponent implements OnInit {
    public pwdChangeForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.buildForm();
    }

    public hasMinLengthPasswordError(controlName: string): boolean {
        return this.pwdChangeForm.controls[controlName].hasError(
            'minlength'
        );
    }

    public hasMismatchedPasswordError(): boolean {
        return this.pwdChangeForm.controls['newPasswordRepeat'].hasError(
            'mismatchedPassword'
        );
    }

    private buildForm(): void {
        this.pwdChangeForm = this.formBuilder.group({
            currentPassword: [null, [Validators.required, Validators.minLength(8)]],
            newPassword: [null, [Validators.required, Validators.minLength(8)]],
            newPasswordRepeat: [null, [Validators.required, Validators.minLength(8)]]
        }, { validator: PasswordValidator.mismatchedPassword('newPassword', 'newPasswordRepeat') });
    }
}
