import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        MovieFilterPipe
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [
        MovieFilterPipe,
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class SharedModule { }

