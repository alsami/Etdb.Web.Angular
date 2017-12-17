import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/shared/material.module';
import { BrowseComponent } from '@app/browse/container';
import { RouterModule } from '@angular/router';

const components = [
    BrowseComponent
];

@NgModule({
    imports: [
        MaterialModule,
        RouterModule.forChild([])
    ],
    declarations: [
        ...components
    ],
    exports: [

    ],
    providers: [

    ]
})

export class BrowseModule {}
