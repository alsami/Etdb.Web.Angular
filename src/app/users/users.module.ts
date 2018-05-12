import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import { UserComponent, UsersComponent } from '@etdb/users/containers';
import { UserEffects } from '@etdb/users/effects';
import { reducers } from '@etdb/users/reducers';
import { UserService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TokenInterceptor } from '@etdb/core/interceptors';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { CardsModule } from '@etdb/cards/cards.module';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([
            UserEffects
        ]),
        MaterialModule,
        UsersRoutingModule,
        CustomControlModule,
        CardsModule
    ],
    declarations: [
        UsersComponent,
        UserComponent,
    ],
    providers: [
        UserService,
        TokenInterceptor
    ]
})
export class UsersModule { }
