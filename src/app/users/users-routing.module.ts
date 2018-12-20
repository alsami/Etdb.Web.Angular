import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    UserProfileComponent,
    UsersComponent,
    UserSettingsComponent
} from '@etdb/users/containers';
// import { UserIsSignedInUserGuard } from '@etdb/users/guards';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: 'profile/:id',
                component: UserProfileComponent
            },
            {
                path: 'settings/:id',
                component: UserSettingsComponent
                // canActivate: [UserIsSignedInUserGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
