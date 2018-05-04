import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutStorageService } from '@etdb/core/services/layout-storage.service';
import { AppComponent, LayoutComponent, LoginComponent, RegisterComponent } from '@etdb/core/containers';
import { ToolbarComponent, SidenavContentComponent, LoginFormComponent, RegisterFormComponent } from '@etdb/core/components';
import { MaterialModule } from '@etdb/shared';
import { AuthService, TokenStorageService } from '@etdb/core/services';
import { TokenInterceptor } from '@etdb/core/interceptors';

const COMPONENTS = [
    AppComponent,
    ToolbarComponent,
    LayoutComponent,
    SidenavContentComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent
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
        ReactiveFormsModule,
    ],
    exports: [
        COMPONENTS
    ]
})

export class CoreModule {
    public static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                TokenStorageService,
                LayoutStorageService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }
            ]
        };
    }
}
