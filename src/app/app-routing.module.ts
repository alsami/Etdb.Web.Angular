import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from '@etdb/browse/container';
import { LoginComponent, RegisterComponent } from '@etdb/core/containers';


const routes: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'register',
    component: RegisterComponent
}, {
    path: 'browse',
    component: BrowseComponent
}, {
    path: 'users/:id',
    loadChildren: 'app/users/users.module#UsersModule'
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
