import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { CommonModule } from '@angular/common';
import {
    UploadButtonComponent,
    MatStepperExtendedComponent,
    UserCardComponent,
    PageLoadingIndicatorComponent,
    ComponentLoaderOverlayComponent,
    ImageSliderOverlayComponent
} from '@etdb/custom-controls/container';
import { MatStepperStepExtendedComponent } from '@etdb/custom-controls/components';
import { ImageSliderOverlayService } from '@etdb/custom-controls/services';

const COMPONENTS = [
    UserCardComponent,
    UploadButtonComponent,
    MatStepperExtendedComponent,
    MatStepperStepExtendedComponent,
    PageLoadingIndicatorComponent,
    ComponentLoaderOverlayComponent,
    ImageSliderOverlayComponent
];

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    providers: [ImageSliderOverlayService],
    entryComponents: [PageLoadingIndicatorComponent, ImageSliderOverlayComponent]
})
export class CustomControlModule { }
