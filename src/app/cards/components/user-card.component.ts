import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@etdb/models';

@Component({
    selector: 'etdb-user-card',
    templateUrl: 'user-card.component.html',
})

export class UserCardComponent {
    @Input() user: User;
    @Input() showProfileImageUploadButton: boolean;
    @Output() profileImageUpload: EventEmitter<File> = new EventEmitter<File>();

    public imageLoading: boolean;

    public requestProfileImageUpload(files: File[]): void {
        this.profileImageUpload.emit(files[0]);
    }
}
