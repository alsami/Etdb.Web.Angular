import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { CovalentFileModule, TdFileService } from '@covalent/core';

const modules = [
    FlexLayoutModule,
    MaterialModule
]

@NgModule({
    declarations: [
        MovieFilterPipe
    ],
    imports: [
        MaterialModule,
        CovalentFileModule,
    ],
    exports: [
        MovieFilterPipe,
        MaterialModule,
        CovalentFileModule,
    ],
    providers: [
        TdFileService
    ]
})
export class SharedModule { }
