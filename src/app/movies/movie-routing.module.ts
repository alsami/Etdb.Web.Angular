import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from '@app/movies/containers';
import { MovieDetailComponent } from '@app/movies/components';

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
