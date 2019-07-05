import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared/material.module';
import { UnderConstructionComponent } from '@etdb/shared/components';

const COMPONENTS = [
    UnderConstructionComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [MaterialModule],
    exports: COMPONENTS
})
export class SharedModule { }
