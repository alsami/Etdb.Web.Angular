import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { MovieDetailComponent } from './components/movie-detail.component';
import { MovieFormComponent } from './components/movie-form.component';
import { MovieListComponent } from './components/movie-list.component';
import { MovieComponent } from './containers/movie.component';
import { MovieCollectionEffects } from './effects/movie-collection.effects';
import { MovieEffects } from './effects/movie.effects';
import { MovieRoutingModule } from './movie-routing.module';
import { reducers } from './reducers';
import { MovieCoverImageService } from './services/movie-cover-image.service';
import { MovieService } from './services/movie.service';

@NgModule({
    declarations: [
        MovieComponent,
        MovieListComponent,
        MovieDetailComponent,
        MovieFormComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        MovieRoutingModule,
        StoreModule.forFeature('movies', reducers),
        EffectsModule.forFeature([MovieEffects, MovieCollectionEffects])
    ],
    exports: [
    ],
    providers: [
        MovieService,
        MovieCoverImageService
    ],
    entryComponents: [
        MovieFormComponent
    ]
})
export class MovieModule { }
