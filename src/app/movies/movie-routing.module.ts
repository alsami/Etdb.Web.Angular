import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from '@etdb/movies/containers';
import { MovieDetailComponent } from '@etdb/movies/components';

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
