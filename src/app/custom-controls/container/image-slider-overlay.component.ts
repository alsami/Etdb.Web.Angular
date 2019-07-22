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

    public constructor(public dialogRef: ImageSliderOverlayRef,
        @Inject(ImageSliderOverlayToken) public imageSliderConfig: ImageSliderOverlayConfig) {
        this.selectedImageIndex = 0;
        this.selectedImageUrl = imageSliderConfig.thumbnails[0];
        this.windowWidth = window.innerWidth;
    }

    public next(): void {
        if (this.selectedImageIndex === this.imageSliderConfig.thumbnails.length - 1) {
            this.selectedImageIndex = 0;
            this.selectedImageUrl = this.imageSliderConfig.thumbnails[0];
            return;
        }

        this.selectedImageIndex++;
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
        return;
    }

    public previous(): void {
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex = this.imageSliderConfig.thumbnails.length - 1;
            this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
            return;
        }

        this.selectedImageIndex--;
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
        return;
    }

    public selectImage(index: number): void {
        this.selectedImageIndex = index;
        this.selectedImageUrl = this.imageSliderConfig.thumbnails[this.selectedImageIndex];
    }
}
