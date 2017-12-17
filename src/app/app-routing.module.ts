import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/containers/login.component';
import { RegisterComponent } from './core/containers/register.component';
import { BrowseComponent } from '@app/browse/container';


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
