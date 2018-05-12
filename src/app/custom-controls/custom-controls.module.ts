import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { UploadButtonComponent } from '@etdb/custom-controls/components';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        UploadButtonComponent
    ],
    exports: [
        UploadButtonComponent
    ]
})
export class CustomControlModule { }
