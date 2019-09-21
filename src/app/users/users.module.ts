import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { MaterialModule } from '@etdb/shared';
import { AuthenticationLogEffects, ProfileImageUploadQueueEffects, UserEffects, UserSearchEffects } from '@etdb/users/+state/effects';
import { AuthenticationLogFacadeService, ProfileImageQueueFacadeService,
    UsersFacadeService, UsersSearchFacadeService } from '@etdb/users/+state/facades';
import { reducers } from '@etdb/users/+state/reducers';
import { AuthenticationLogOverviewComponent, UserImageControlComponent,
    UserInfochangeComponent, UserNameChangeComponent, UserPasswordchangeFormComponent } from '@etdb/users/components';
import { UserProfileComponent, UserSettingsComponent, UsersRoutingComponent } from '@etdb/users/container';
import { AuthenticationLogService, UserSearchService, UserService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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
