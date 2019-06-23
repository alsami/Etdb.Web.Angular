import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { userNameAvailableAsyncValidator } from '@etdb/users/validators';
import { UsersSearchFacadeService } from '@etdb/users/+state/facades';

@Component({
    selector: 'etdb-user-name-update',
    templateUrl: 'user-name-update.component.html',
})
export class UserNameUpdateComponent implements OnInit {

    public constructor(private usersSearchFacadeService: UsersSearchFacadeService, private formBuilder: FormBuilder) { }

    public userNameChangeForm: FormGroup;

    public searchControl: FormControl;



    public ngOnInit(): void {
        this.userNameChangeForm = this.formBuilder.group({
            'userName': new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(12)
            ], [
                    userNameAvailableAsyncValidator(this.usersSearchFacadeService)
                ])
        });

        this.searchControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
        ], [
                userNameAvailableAsyncValidator(this.usersSearchFacadeService)
            ]);
    }

    public isValid(): boolean {
        return this.userNameChangeForm.valid;
    }

    public hasMinLengthError(): boolean {
        return this.userNameChangeForm.get('userName').hasError('minlength');
    }

    public hasMaxLengthError(): boolean {
        return this.userNameChangeForm.get('userName').hasError('maxlength');
    }

    public hasUserNameTakenError(): boolean {
        return this.userNameChangeForm.get('userName').hasError('userNameTaken');
    }
}
