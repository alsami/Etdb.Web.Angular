import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import {
    UserProfileComponent,
    UsersRoutingComponent,
    UserSettingsComponent
} from '@etdb/users/containers';
import { UserEffects } from '@etdb/users/+state/effects';
import { reducers } from '@etdb/users/+state/reducers';
import { UserService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    UserPasswordchangeFormComponent,
    UserInfochangeComponent,
    UserImageControlComponent
} from '@etdb/users/components';
import { UserIsSignedInUserGuard } from '@etdb/users/guards/user-is-signedin-user.guard';
import { UsersFacadeService } from '@etdb/users/+state/facades';

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
        UsersRoutingComponent,
        UserProfileComponent,
        UserSettingsComponent,
        UserPasswordchangeFormComponent,
        UserInfochangeComponent,
        UserImageControlComponent
    ],
    providers: [UserService, UserIsSignedInUserGuard, UsersFacadeService]
})
export class UsersModule { }
