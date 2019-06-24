import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { userNameAvailableAsyncValidator } from '@etdb/users/validators';
import { UsersSearchFacadeService } from '@etdb/users/+state/facades';
import { User } from '@etdb/models';

@Component({
    selector: 'etdb-user-name-change',
    templateUrl: 'user-name-change.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNameChangeComponent implements OnInit {

    public constructor(private usersSearchFacadeService: UsersSearchFacadeService,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef) { }

    public userNameChangeForm: FormGroup;

    @Output() requestUserNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() user: User;

    public ngOnInit(): void {
        this.userNameChangeForm = this.formBuilder.group({
            'userName': new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(12)
            ], [
                    userNameAvailableAsyncValidator(this.usersSearchFacadeService, this.cdr)
                ])
        });
    }

    public submit(): void {
        if (!this.userNameChangeForm.valid) {
            return;
        }

        const userName = this.userNameChangeForm.get('userName').value;

        this.requestUserNameChange.emit(userName);
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
