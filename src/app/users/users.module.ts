import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { UserDetailComponent } from '@etdb/users/components';
import { UserComponent } from '@etdb/users/containers';
import { reducers } from '@etdb/users/reducers';
import { StoreModule } from '@ngrx/store';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers)
        MaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        UserComponent,
        UserDetailComponent
    ]
})
export class UsersModule { }
