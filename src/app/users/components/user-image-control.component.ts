import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef
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
    profileImagesUpload: EventEmitter<File[]> = new EventEmitter<File[]>();
    @Output()
    profileImageRemove: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    profileImagePrimary: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('fileInput', {
        static: false
    }) fileInput: ElementRef;

    public imageLoading: boolean;

    public tiles: { url: string, cols: number, rows: number }[] = [];

    private selectedIndex: number;

    private totalLength: number;

    public ngOnChanges(changes: SimpleChanges): void {
        const userChange = changes['user'];
        if (
            !userChange ||
            !this.user ||
            !this.user.profileImageMetaInfos.length
        ) {
            this.tiles = [];
            return;
        }

        if (userChange.previousValue && (<User>userChange.previousValue).profileImageMetaInfos.length === this.totalLength) {
            return;
        }

        this.tiles = [];

        this.totalLength = this.user.profileImageMetaInfos.length;

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
        this.fileInput.nativeElement.click();
    }

    public emitSelection($event): void {
        const files = [...$event.target.files];
        this.fileInput.nativeElement.value = null;
        if (!files || files.length === 0) {
            return;
        }

        if (files.length === 1) {
            this.requestProfileImageUpload(files[0]);
            return;
        }

        this.requestProfileImagesUpload(files);
    }

    public requestProfileImageUpload(files: File): void {
        this.profileImageUpload.emit(files);
    }

    public requestProfileImagesUpload(files: File[]): void {
        this.profileImagesUpload.emit(files);
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
        if (!profileImageMetaInfos || !profileImageMetaInfos.length) {
            return;
        }


        profileImageMetaInfos.forEach((meta, index) => {
            if (this.totalLength === 1) {
                this.tiles.push({
                    url: meta.url,
                    cols: 2,
                    rows: 2,
                });
                return;
            }

            if (index < (this.totalLength - 1)) {
                this.tiles.push({
                    url: meta.url,
                    cols: 1,
                    rows: 2,
                });
            }

            const factor = profileImageMetaInfos.length % 2 === 0 ? 1 : 2;

            if (index === (this.totalLength - 1)) {
                this.tiles.push({
                    url: meta.url,
                    cols: factor,
                    rows: factor,
                });
            }
        });
    }
}
