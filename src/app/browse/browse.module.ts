import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared/material.module';
import { BrowseComponent } from '@etdb/browse/container';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        MaterialModule,
        RouterModule.forChild([])
    ],
    declarations: [
        BrowseComponent
    ],
    exports: [

    ],
    providers: [

    ]
})

export class BrowseModule {}
