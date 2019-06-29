import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from '@etdb/browse/container';
import { ShareModule } from '@etdb/shared';

@NgModule({
    imports: [
        ShareModule,
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
