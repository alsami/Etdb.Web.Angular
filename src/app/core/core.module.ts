import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { LayoutComponent } from './containers/layout.component';
import { ToolbarComponent } from './components/toolbar.component';
import { SidenavContentComponent } from './components/sidenav-content.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
    AppComponent,
    ToolbarComponent,
    LayoutComponent,
    SidenavContentComponent,
];


@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        COMPONENTS
    ],
    providers: [
        AuthService,
        ConfigService,
    ],
})

export class CoreModule {
    public static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [

            ]
        };
    }
}
