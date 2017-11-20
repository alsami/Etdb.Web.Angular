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
import { LoginComponent } from './containers/login.component';
import { LoginFormComponent } from './components/login-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from './services/token-storage.service';

const COMPONENTS = [
    AppComponent,
    ToolbarComponent,
    LayoutComponent,
    SidenavContentComponent,
    LoginComponent,
    LoginFormComponent
];


@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    exports: [
        COMPONENTS
    ],
    providers: [
        AuthService,
        ConfigService,
        TokenStorageService,
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
