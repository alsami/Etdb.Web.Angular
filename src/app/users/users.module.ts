import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import {
    UserProfileComponent,
    UsersRoutingComponent,
    UserSettingsComponent
} from '@etdb/users/containers';
import { UserEffects, UserSearchEffects, AuthenticationLogEffects, ProfileImageUploadQueueEffects } from '@etdb/users/+state/effects';
import { reducers } from '@etdb/users/+state/reducers';
import { UserService, UserSearchService, AuthenticationLogService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    UserPasswordchangeFormComponent,
    UserInfochangeComponent,
    UserImageControlComponent,
    UserNameChangeComponent,
    AuthenticationLogOverviewComponent
} from '@etdb/users/components';
import {
    UsersFacadeService, UsersSearchFacadeService,
    AuthenticationLogFacadeService, ProfileImageQueueFacadeService
} from '@etdb/users/+state/facades';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([
            UserEffects,
            UserSearchEffects,
            AuthenticationLogEffects,
            ProfileImageUploadQueueEffects]),
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
        UserImageControlComponent,
        UserNameChangeComponent,
        AuthenticationLogOverviewComponent,
    ],
    providers: [UserService, UserSearchService, AuthenticationLogService,
        UsersFacadeService, UsersSearchFacadeService, AuthenticationLogFacadeService, ProfileImageQueueFacadeService]
})
export class UsersModule { }
