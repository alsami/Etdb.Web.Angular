import { Component, Inject } from '@angular/core';
import { ImageSliderOverlayRef, ImageSliderOverlayToken, ImageSliderOverlayConfig } from '@etdb/custom-controls/models';

@Component({
    selector: 'etdb-image-slider-overlay',
    templateUrl: 'image-slider-overlay.component.html',
    styleUrls: ['image-slider-overlay.component.scss']
})
export class ImageSliderOverlayComponent {

    public selectedImageIndex: number;
    public selectedImageUrl: string;
    public windowWidth: number;
    public imageLoadState: { url: string, loading: boolean }[] = [];

    public constructor(public dialogRef: ImageSliderOverlayRef,
        @Inject(ImageSliderOverlayToken) public imageSliderConfig: ImageSliderOverlayConfig) {
        this.selectedImageIndex = 0;
        this.selectedImageUrl = imageSliderConfig.thumbnails[0];
        this.windowWidth = window.innerWidth;
        this.imageLoadState = this.createLoadState(imageSliderConfig);
    }

    public next(): void {
        if (this.selectedImageIndex === this.imageSliderConfig.thumbnails.length - 1) {
            this.setSelectedImageLoading(0);
            this.selectedImageIndex = 0;
            this.selectedImageUrl = this.imageSliderConfig.thumbnails[0];
            return;
        }

        this.selectedImageIndex++;
        this.setSelectedImageLoading(this.selectedImageIndex);
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
        return;
    }

    public previous(): void {
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex = this.imageSliderConfig.thumbnails.length - 1;
            this.setSelectedImageLoading(this.selectedImageIndex);
            this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
            return;
        }

        this.selectedImageIndex--;
        this.setSelectedImageLoading(this.selectedImageIndex);
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
        return;
    }

    public selectImage(index: number): void {
        this.setSelectedImageLoading(index);
        this.selectedImageIndex = index;
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
    }

    public selectedImageLoading(): boolean {
        return this.imageLoadState[this.selectedImageIndex].loading;
    }

    public imageLoaded(): void {
        this.imageLoadState[this.selectedImageIndex].loading = false;
    }

    private setSelectedImageLoading(index: number): void {
        this.imageLoadState[index].loading = true;
    }

    private createLoadState(imageSliderConfig: ImageSliderOverlayConfig): { url: string, loading: boolean }[] {
        return imageSliderConfig.thumbnails.map(url => {
            return {
                url: url,
                loading: true
            };
        });
    }
}
