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
import { BehaviorSubject } from 'rxjs';

interface ImageTile {
    url: string;
    cols: number;
    rows: number;
}

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

    public tiles: ImageTile[] = [];

    private selectedIndex: number;

    private totalLength: number;

    public tiles$: BehaviorSubject<ImageTile[]> = new BehaviorSubject([]);

    private currentIndex: number;


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

        this.totalLength = this.user.profileImageMetaInfos.length;

        this.computeTiles(this.user.profileImageMetaInfos);

        this.viewPortScrolled(this.currentIndex);

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

    public viewPortScrolled(index: number): void {
        this.currentIndex = this.tiles$.getValue().length;
        const plused = this.currentIndex + index;
        const next = plused > 0 ? plused : 4;
        const rounded = next % 2 === 0 ? next : (next + 1);
        this.tiles$.next(this.tiles.slice(0, rounded));
    }

    private computeTiles(profileImageMetaInfos: ProfileImageMetaInfo[]): void {
        if (!profileImageMetaInfos || !profileImageMetaInfos.length) {
            return;
        }

        this.tiles.forEach((tile, tileIndex) => {
            if (profileImageMetaInfos.findIndex(meta => meta.url === tile.url) === -1) {
                this.tiles.splice(tileIndex, 1);
            }
        });

        const factor = profileImageMetaInfos.length % 2 === 0 ? 1 : 2;

        profileImageMetaInfos
            .filter(meta => this.tiles.findIndex(tile => tile.url === meta.url) === -1)
            .forEach((meta, index) => {
                if (this.totalLength === 1) {
                    this.tiles.push({
                        url: meta.url,
                        cols: factor,
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

                if (index === (this.totalLength - 1)) {
                    this.tiles.push({
                        url: meta.url,
                        cols: factor,
                        rows: factor,
                    });
                }
            });

        if (this.tiles.length % factor === 0 || this.tiles[this.tiles.length - 1].cols === factor) {
            return;
        }

        this.tiles[this.tiles.length - 1].cols = factor;
    }
}
