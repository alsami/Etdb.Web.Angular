import {
    Component, ElementRef, EventEmitter, Input, Output, ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@etdb/models';

@Component({
    selector: 'etdb-user-profile',
    templateUrl: 'user-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileComponent {
    @Input() user: User;
    @Output() requestProfileImageUpload: EventEmitter<File> = new EventEmitter<File>();
    @ViewChild('fileInput') input: ElementRef;

    public constructor() { }

    public emitProfileImageUploadRequest(): void {
        this.requestProfileImageUpload.emit(this.input.nativeElement.files[0]);
    }
}
