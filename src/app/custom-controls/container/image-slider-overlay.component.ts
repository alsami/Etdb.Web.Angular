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
    public minBufferWidth: number;
    public maxBufferWidth: number;
    public viewPortWidth: number;

    public constructor(public dialogRef: ImageSliderOverlayRef,
        @Inject(ImageSliderOverlayToken) public imageSliderConfig: ImageSliderOverlayConfig) {
        this.selectedImageIndex = 0;
        this.selectedImageUrl = imageSliderConfig.urls[0];
        this.minBufferWidth = window.innerWidth / 4 * .8;
        this.maxBufferWidth = this.minBufferWidth * 2;
        this.viewPortWidth = window.innerWidth * .8;
    }

    public next(): void {
        if (this.selectedImageIndex === this.imageSliderConfig.urls.length) {
            this.selectedImageIndex = 0;
            this.selectedImageUrl = this.imageSliderConfig.urls[0];
            return;
        }

        this.selectedImageIndex++;
        this.selectedImageUrl = this.imageSliderConfig.urls[this.selectedImageIndex];
        return;
    }

    public previous(): void {
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex = this.imageSliderConfig.urls.length - 1;
            this.selectedImageUrl = this.imageSliderConfig.urls[this.selectedImageIndex];
            return;
        }

        this.selectedImageIndex--;
        this.selectedImageUrl = this.imageSliderConfig.urls[this.selectedImageIndex];
        return;
    }
}
