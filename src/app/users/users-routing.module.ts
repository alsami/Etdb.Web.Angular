import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent, UsersComponent } from '@etdb/users/containers';

const routes: Routes = [{
    path: '',
    component: UsersComponent,
    children: [{
        path: ':id',
        component: UserComponent
    }]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule { }
