import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { User, ProfileImageMetaInfo } from '@etdb/models';

@Component({
    selector: 'etdb-user-settings-card',
    templateUrl: 'user-settings-card.component.html',
    styleUrls: ['user-settings-card.component.scss']
})
export class UserSettingsCardComponent implements OnChanges {
    @Input()
    user: User;
    @Input()
    showProfileImageUploadButton: boolean;
    @Output()
    profileImageUpload: EventEmitter<File> = new EventEmitter<File>();
    @Output()
    profileImageRemove: EventEmitter<string> = new EventEmitter<string>();

    public imageLoading: boolean;

    public selectedImage: ProfileImageMetaInfo;
    public selectedImageIndex: number;

    public imageCount = 0;


    public ngOnChanges(changes: SimpleChanges): void {
        this.selectedImage = null;
        this.imageCount = 0;
        if (
            !changes['user'] ||
            !this.user ||
            !this.user.profileImageMetaInfos.length
        ) {
            return;
        }

        this.imageCount = this.user.profileImageMetaInfos.length;

        this.selectedImage = this.user.profileImageMetaInfos.find(
            image => image.isPrimary
        );

        if (!this.selectedImage) {
            this.selectedImage = this.user.profileImageMetaInfos[0];
        }

        this.selectedImageIndex = this.user.profileImageMetaInfos.indexOf(
            this.selectedImage
        );
    }

    public triggerFileDialog(): void {
        const element: HTMLElement = document.querySelector('input[type=file]');
        element.click();
    }

    public emitSelection($event): void {
        const files = $event.target.files as File[];

        if (!files || files.length === 0) {
            return;
        }

        this.requestProfileImageUpload(files[0]);
    }

    public selectNext(): void {
        if (
            this.selectedImageIndex ===
            this.user.profileImageMetaInfos.length - 1
        ) {
            this.selectedImageIndex = 0;
            this.selectedImage = this.user.profileImageMetaInfos[0];
            return;
        }

        this.selectedImageIndex += 1;
        this.selectedImage = this.user.profileImageMetaInfos[
            this.selectedImageIndex
        ];
    }

    public selectPrevious(): void {
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex =
                this.user.profileImageMetaInfos.length - 1;
            this.selectedImage = this.user.profileImageMetaInfos[
                this.selectedImageIndex
            ];
            return;
        }

        this.selectedImageIndex -= 1;
        this.selectedImage = this.user.profileImageMetaInfos[
            this.selectedImageIndex
        ];
    }

    public requestProfileImageUpload(files: File): void {
        this.profileImageUpload.emit(files);
    }

    public requestProfileImageRemove(imageMeta: ProfileImageMetaInfo): void {
        this.profileImageRemove.emit(imageMeta.removeUrl);
    }
}
