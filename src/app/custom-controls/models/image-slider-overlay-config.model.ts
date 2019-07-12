import { InjectionToken } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';


export interface ImageSliderOverlayConfig {
    urls: string[];
    thumbnails: string[];
}


export class ImageSliderOverlayRef {

    constructor(private overlayRef: OverlayRef) { }

    close(): void {
        this.overlayRef.dispose();
    }
}

export const ImageSliderOverlayToken = new InjectionToken<ImageSliderOverlayConfig>('ImageSliderOverLayConfig');
