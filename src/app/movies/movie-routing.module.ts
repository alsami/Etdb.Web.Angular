import { MovieDetailComponent } from './components/movie-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from './containers/movie.component';

const routes: Routes = [
    {
        path: '',
        component: MovieComponent,
    },
    {
        path: ':id',
        component: MovieDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
