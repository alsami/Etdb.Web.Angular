import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAppNotifications from '@etdb/app-notification/+state/reducers';
import { AppNotificationOverviewComponent } from '@etdb/app-notification/container';
import { ProgressNotificationComponent, SimpleNotificationComponent } from '@etdb/app-notification/components';
import { MaterialModule } from '@etdb/shared';
import { EffectsModule } from '@ngrx/effects';
import { AppNotificationEffects } from '@etdb/app-notification/+state/effects';
import { UnreadNotificationDirective } from './directives/unread-notification.directive';

const EXPORTED_COMPONENTS = [
    AppNotificationOverviewComponent
];

const DECLARED_COMPONENTS = [
    ProgressNotificationComponent,
    SimpleNotificationComponent
];

@NgModule({
    declarations: [
        EXPORTED_COMPONENTS,
        DECLARED_COMPONENTS,
        UnreadNotificationDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        StoreModule.forFeature('appNotifications', fromAppNotifications.reducers),
        EffectsModule.forFeature([AppNotificationEffects])
    ],
    exports: [EXPORTED_COMPONENTS]
})
export class AppNotificationModule { }
