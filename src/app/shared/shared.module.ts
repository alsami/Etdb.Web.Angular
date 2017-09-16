import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

const modules = [
    FlexLayoutModule,
    MaterialModule
]

@NgModule({
    declarations: [
        MovieFilterPipe
    ],
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule,
        MovieFilterPipe
    ],
})
export class SharedModule { }
