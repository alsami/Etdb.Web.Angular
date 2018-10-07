import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent, UsersComponent, UserSettingsComponent } from '@etdb/users/containers';

const routes: Routes = [{
    path: '',
    component: UsersComponent,
    children: [{
        path: 'profile/:id',
        component: UserProfileComponent
    }, {
        path: 'settings/:id',
        component: UserSettingsComponent
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
