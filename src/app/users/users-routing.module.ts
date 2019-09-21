import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    UserProfileComponent,
    UsersRoutingComponent,
    UserSettingsComponent
} from '@etdb/users/container';
import { UserIsSignedInUserGuard } from '@etdb/users/guards';
import { UserResolver } from '@etdb/users/resolver/user-loader.resolver';

const routes: Routes = [
    {
        path: '',
        component: UsersRoutingComponent,
        children: [
            {
                path: 'profile/:id',
                component: UserProfileComponent,
                resolve: {
                    user: UserResolver
                },
            },
            {
                path: 'settings/:id',
                component: UserSettingsComponent,
                canActivate: [UserIsSignedInUserGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [UserResolver, UserIsSignedInUserGuard]
})
export class UsersRoutingModule { }
