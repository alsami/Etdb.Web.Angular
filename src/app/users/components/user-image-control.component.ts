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
    selector: 'etdb-user-image-control',
    templateUrl: 'user-image-control.component.html',
    styleUrls: ['user-image-control.component.scss']
})
export class UserImageControlComponent implements OnChanges {
    @Input()
    user: User;
    @Input()
    showProfileImageUploadButton: boolean;
    @Output()
    profileImageUpload: EventEmitter<File> = new EventEmitter<File>();
    @Output()
    profileImageRemove: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    profileImagePrimary: EventEmitter<string> = new EventEmitter<string>();

    public imageLoading: boolean;

    private selectedIndex: number;

    public imageCount = 0;

    public tiles: { url: string, cols: number, rows: number }[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        this.imageCount = 0;
        if (
            !changes['user'] ||
            !this.user ||
            !this.user.profileImageMetaInfos.length
        ) {
            return;
        }

        this.computeTiles(this.user.profileImageMetaInfos);

        const primaryImageIndex = this.user.profileImageMetaInfos
            .findIndex(image => image.isPrimary);

        if (primaryImageIndex) {
            this.setSelected(primaryImageIndex);
            return;
        }

        this.setSelected(0);
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

    public requestProfileImageUpload(files: File): void {
        this.profileImageUpload.emit(files);
    }

    public requestProfileImageRemove(): void {
        this.profileImageRemove.emit(this.user.profileImageMetaInfos[this.selectedIndex].removeUrl);
    }

    public requestMarkPrimaryProfileImage(): void {
        this.profileImagePrimary.emit(this.user.profileImageMetaInfos[this.selectedIndex].id);
    }

    public setSelected(index: number): void {
        if (!this.tiles || !this.tiles.length) {
            return;
        }

        this.selectedIndex = index;
    }

    private computeTiles(profileImageMetaInfos: ProfileImageMetaInfo[]): void {
        this.tiles = [];
        if (!profileImageMetaInfos || !profileImageMetaInfos.length) {
            return;
        }

        const totalLength = profileImageMetaInfos.length;

        profileImageMetaInfos.forEach((meta, index) => {
            if (totalLength === 1) {
                this.tiles.push({
                    url: meta.url,
                    cols: 1,
                    rows: 1,
                });
                return;
            }

            if (index < (totalLength - 1)) {
                this.tiles.push({
                    url: meta.url,
                    cols: 1,
                    rows: 1,
                });
            }

            const factor = profileImageMetaInfos.length % 2 === 0 ? 1 : 2;

            if (index === (totalLength - 1)) {
                this.tiles.push({
                    url: meta.url,
                    cols: factor,
                    rows: factor,
                });
            }
        });
    }
}
