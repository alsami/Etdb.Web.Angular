import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAppNotifications from '@etdb/app-notification/+state/reducers';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';
import { AppNotificationOverviewComponent } from '@etdb/app-notification/container';
import { ProgressNotificationComponent, SimpleNotificationComponent } from '@etdb/app-notification/components';
import { MaterialModule } from '@etdb/shared';

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
        DECLARED_COMPONENTS
    ],
    imports: [
        CommonModule,
        MaterialModule,
        StoreModule.forFeature('appNotifications', fromAppNotifications.reducers)
    ],
    providers: [
        AppNotificationsFacadeService
    ],
    exports: [EXPORTED_COMPONENTS]
})
export class AppNotificationModule { }
