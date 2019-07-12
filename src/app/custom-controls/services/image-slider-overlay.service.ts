import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ImageSliderOverlayComponent } from '@etdb/custom-controls/container/image-slider-overlay.component';

import { ImageSliderOverlayRef, ImageSliderOverlayToken, ImageSliderOverlayConfig } from '@etdb/custom-controls/models';

export interface Image {
    name: string;
    url: string;
}


@Injectable()
export class ImageSliderOverlayService {
    public constructor(
        private injector: Injector,
        private overlay: Overlay) { }

    public open(config: ImageSliderOverlayConfig) {
        const overlayRef = this.createOverlay();

        const dialogRef = new ImageSliderOverlayRef(overlayRef);

        this.attachDialogContainer(overlayRef, config, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay() {
        const overlayConfig = this.getOverlayConfig();
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: ImageSliderOverlayConfig, dialogRef: ImageSliderOverlayRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(ImageSliderOverlayComponent, null, injector);
        const containerRef: ComponentRef<ImageSliderOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: ImageSliderOverlayConfig, dialogRef: ImageSliderOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(ImageSliderOverlayRef, dialogRef);
        injectionTokens.set(ImageSliderOverlayToken, config);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            // scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}
