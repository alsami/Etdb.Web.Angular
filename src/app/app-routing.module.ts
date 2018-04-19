import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from '@etdb/browse/container';
import { LoginComponent, RegisterComponent } from '@etdb/core/containers';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/browse/movies',
        pathMatch: 'full'
    },
    {
        path: 'browse',
        redirectTo: '/browse/movies',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'browse',
        component: BrowseComponent,
        children: [
            {
                path: 'movies',
                loadChildren: 'app/movies/movie.module#MovieModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
