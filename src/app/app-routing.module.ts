import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadChildren: 'app/movies/movie.module#MovieModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
