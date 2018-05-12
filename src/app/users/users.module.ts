import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { UserProfileComponent } from '@etdb/users/components';
import { UserComponent, UsersComponent } from '@etdb/users/containers';
import { UserEffects } from '@etdb/users/effects';
import { reducers } from '@etdb/users/reducers';
import { UserService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TokenInterceptor } from '@etdb/core/interceptors';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([
            UserEffects
        ]),
        MaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        UserComponent,
        UserProfileComponent
    ],
    providers: [
        UserService,
        TokenInterceptor
    ]
})
export class UsersModule { }
