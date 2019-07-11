import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import { ProfileImageMetaInfo } from '@etdb/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
    selector: 'etdb-user-image-control',
    templateUrl: 'user-image-control.component.html',
    styleUrls: ['user-image-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class UserImageControlComponent implements OnChanges, OnDestroy {
    @Input()
    profileImages: ProfileImageMetaInfo[] = [];

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

    @ViewChild(CdkVirtualScrollViewport, {
        static: false
    }) viewPort: CdkVirtualScrollViewport;

    private selectedIndex: number;

    public totalLength: number;

    public profileImages$: BehaviorSubject<ProfileImageMetaInfo[]> = new BehaviorSubject([]);

    public isDevelopment = !environment.production;

    private subscription: Subscription = null;

    public imagesLoadedState: { resizeUrl: string, loaded: boolean }[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        const profileImagesChange = changes['profileImages'];
        if (
            !profileImagesChange ||
            !this.profileImages ||
            !this.profileImages.length
        ) {
            this.profileImages = [];
            return;
        }

        this.totalLength = this.profileImages.length;

        this.calculateImagesLoadState(this.profileImages);

        this.profileImages$.next(this.profileImages);
    }

    public ngOnDestroy(): void {
        if (!this.subscription || this.subscription.closed) {
            return;
        }

        this.subscription.unsubscribe();
    }

    public calculateColSpan(index: number): number {
        const indexPlusOne = index + 1;

        if (indexPlusOne < this.totalLength) {
            return 1;
        }

        if (indexPlusOne % 2 !== 0) {
            return 2;
        }

        return 1;
    }

    public triggerFileDialog(): void {
        this.fileInput.nativeElement.click();
    }

    public emitSelection($event: { target: { files: any; }; }): void {
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
        this.profileImageRemove.emit(this.profileImages[this.selectedIndex].removeUrl);
    }

    public requestMarkPrimaryProfileImage(): void {
        this.profileImagePrimary.emit(this.profileImages[this.selectedIndex].id);
    }

    public setSelected(index: number): void {
        if (!this.profileImages || !this.profileImages.length) {
            return;
        }

        this.selectedIndex = index;
    }

    public isImageLoaded(resizeUrl: string): boolean {
        const wanted = this.imagesLoadedState.find(state => state.resizeUrl === resizeUrl);

        if (!wanted) {
            return false;
        }

        return wanted.loaded;
    }

    public imageLoaded(resizeUrl: string) {
        const searchState = this.imagesLoadedState.find(state => state.resizeUrl === resizeUrl);
        if (!searchState) {
            return;
        }

        searchState.loaded = true;
    }

    public trackByFn(_index: number, meta: ProfileImageMetaInfo): number {
        return new Date(meta.createdAt).getDate();
    }

    private calculateImagesLoadState(profileImages: ProfileImageMetaInfo[]): void {
        this.imagesLoadedState = this.imagesLoadedState
            .filter(state => profileImages.findIndex(image => image.resizeUrl === state.resizeUrl) !== -1);

        profileImages
            .filter(image => this.imagesLoadedState.findIndex(state => state.resizeUrl === image.resizeUrl) === -1)
            .forEach(image => {
                this.imagesLoadedState.push({
                    resizeUrl: image.resizeUrl,
                    loaded: false
                });
            });

        console.log(this.imagesLoadedState);
    }
}
