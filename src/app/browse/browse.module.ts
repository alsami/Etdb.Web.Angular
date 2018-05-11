import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from '@etdb/browse/container';
import { MaterialModule } from '@etdb/shared/material.module';

@NgModule({
    imports: [
        MaterialModule,
        RouterModule.forChild([{
            path: 'browse',
            component: BrowseComponent
        }])
    ],
    declarations: [
        BrowseComponent
    ],
    exports: [

    ],
    providers: [

    ]
})

export class BrowseModule { }
