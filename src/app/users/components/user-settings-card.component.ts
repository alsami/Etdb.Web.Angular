import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@etdb/models';

@Component({
    selector: 'etdb-user-settings-card',
    templateUrl: 'user-settings-card.component.html'
})
export class UserSettingsCardComponent {
    @Input()
    user: User;
    @Input()
    showProfileImageUploadButton: boolean;
    @Output()
    profileImageUpload: EventEmitter<File> = new EventEmitter<File>();

    public userNameEditing: boolean;

    public imageLoading: boolean;

    public requestProfileImageUpload(files: File[]): void {
        this.profileImageUpload.emit(files[0]);
    }
}
