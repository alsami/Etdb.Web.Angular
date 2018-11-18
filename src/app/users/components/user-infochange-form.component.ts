import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '@etdb/models';
import { UserProfileInfoChange } from '@etdb/users/models';

@Component({
    selector: 'etdb-user-infochange-form',
    templateUrl: 'user-infochange-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfochangeComponent implements OnInit, OnChanges {
    @Input()
    user: User;

    @Input()
    loading: boolean;

    @Output()
    requestProfileInfoChange: EventEmitter<
        UserProfileInfoChange
        > = new EventEmitter();

    public infochangeForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.buildForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && this.user) {
            this.patchForm(this.user);
        }
    }

    public submit(): void {
        if (this.loading) {
            return;
        }

        const profileInfoChange: UserProfileInfoChange = {
            ...this.infochangeForm.value
        };

        this.requestProfileInfoChange.emit(profileInfoChange);
    }

    private patchForm(user: User): void {
        setTimeout(() => {
            this.infochangeForm.patchValue(user);
        }, 100);
    }

    private buildForm(): void {
        this.infochangeForm = this.formBuilder.group({
            firstName: [null, null],
            name: [null, null],
            biography: [null, null]
        });
    }
}
