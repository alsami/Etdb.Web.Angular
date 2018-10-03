import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { CommonModule } from '@angular/common';
import {
    UploadButtonComponent,
    MatStepperExtendedComponent
} from '@etdb/custom-controls/container';
import { MatStepperStepExtendedComponent } from '@etdb/custom-controls/component';

const COMPONENTS = [
    UploadButtonComponent,
    MatStepperExtendedComponent,
    MatStepperStepExtendedComponent
];

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class CustomControlModule {}
