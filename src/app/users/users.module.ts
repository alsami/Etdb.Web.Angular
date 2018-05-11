import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { UserProfileComponent } from '@etdb/users/components';
import { UserComponent, UsersComponent } from '@etdb/users/containers';
import { reducers } from '@etdb/users/reducers';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        MaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        UserComponent,
        UserProfileComponent
    ]
})
export class UsersModule { }
