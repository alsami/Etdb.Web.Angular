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
    AfterViewChecked,
    OnDestroy,
    NgZone,
} from '@angular/core';
import { ProfileImageMetaInfo } from '@etdb/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { delay, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'etdb-user-image-control',
    templateUrl: 'user-image-control.component.html',
    styleUrls: ['user-image-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserImageControlComponent implements OnChanges, AfterViewChecked, OnDestroy {
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

    private currentIndex: number;

    private pageSize = 4;

    private pages: number;

    private currentPage = 0;

    public imageLoading: boolean;

    public totalLength: number;

    public profileImages$: BehaviorSubject<ProfileImageMetaInfo[]> = new BehaviorSubject([]);

    public isDevelopment = !environment.production;
    private subscription: Subscription = null;

    public constructor(private ngZone: NgZone) { }

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

        console.log(this.profileImages);

        this.totalLength = this.profileImages.length;

        this.pages = Math.ceil(this.totalLength / this.pageSize);

        console.log('PAGES', this.pages);

        this.ngZone.run(() => this.viewPortScrolled(this.currentIndex));
    }

    public ngAfterViewChecked(): void {
        if (this.viewPort && !this.subscription) {
            this.subscription = this.viewPort.scrolledIndexChange.pipe(
                distinctUntilChanged(),
                delay(100)
            ).subscribe(index => this.ngZone.run(() => this.viewPortScrolled(index)));
        }

        if (!this.viewPort && this.subscription) {
            this.subscription.unsubscribe();
        }
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
            console.log('CALC COLSPAN 2! AT index:', index);
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

    public viewPortScrolled(index: number): void {
        console.log('NEW INDEX', index);
        console.log('CURRENT INDEX', this.currentIndex);

        const currentValue = this.profileImages$.getValue();
        const currentLength = currentValue.length;

        if (currentLength === 0) {
            this.profileImages$.next(this.profileImages.slice(0, 4));
            this.currentIndex = index;
            return;
        }

        if (currentLength > this.totalLength) {
            this.profileImages$.next(this.profileImages);
            return;
        }

        if (currentLength === this.totalLength) {
            this.currentIndex = index;
            return;
        }

        console.log('ADDING SOMETHING');

        const nonZeroIndex = (isNaN(index) ? 0 : index) + 1;
        const nextItemCount = Math.max(nonZeroIndex, Math.max(this.pageSize, this.currentPage * this.pageSize));

        const nextSliceEnd = Math.max(nextItemCount, this.currentPage * this.pageSize);

        const nextSlice = this.profileImages.slice(currentLength, nextSliceEnd);
        const nextValue = currentValue.concat(nextSlice);

        this.currentPage++;
        this.currentIndex = index;
        this.profileImages$.next(nextValue);
    }

    public trackByFn(_index: number, meta: ProfileImageMetaInfo): number {
        return new Date(meta.createdAt).getDate();
    }
}
