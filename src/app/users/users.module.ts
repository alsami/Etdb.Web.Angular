import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import {
    UserProfileComponent,
    UsersComponent,
    UserSettingsComponent,
} from '@etdb/users/containers';
import { UserEffects } from '@etdb/users/effects';
import { reducers } from '@etdb/users/reducers';
import { UserService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    UserPasswordchangeFormComponent,
    UserInfochangeComponent
} from '@etdb/users/components';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([UserEffects]),
        MaterialModule,
        UsersRoutingModule,
        CustomControlModule,
        ReactiveFormsModule
    ],
    declarations: [
        UsersComponent,
        UserProfileComponent,
        UserSettingsComponent,
        UserPasswordchangeFormComponent,
        UserInfochangeComponent
    ],
    providers: [UserService]
})
export class UsersModule { }
