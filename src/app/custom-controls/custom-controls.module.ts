import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { CommonModule } from '@angular/common';
import {
    UploadButtonComponent,
    MatStepperExtendedComponent,
    UserCardComponent,
    PageLoadingIndicatorComponent
} from '@etdb/custom-controls/container';
import { MatStepperStepExtendedComponent } from '@etdb/custom-controls/component';

const COMPONENTS = [
    UserCardComponent,
    UploadButtonComponent,
    MatStepperExtendedComponent,
    MatStepperStepExtendedComponent,
    PageLoadingIndicatorComponent
];

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    entryComponents: [PageLoadingIndicatorComponent]
})
export class CustomControlModule {}
