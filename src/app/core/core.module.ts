import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent, RegisterFormComponent, SidenavContentComponent, ToolbarComponent } from '@etdb/core/components';
import { AppComponent, LayoutComponent, LoginComponent, RegisterComponent } from '@etdb/core/containers';
import { NotAuthorizedAuthGuard } from '@etdb/core/guards';
import { TokenInterceptor } from '@etdb/core/interceptors';
import { AuthService, LayoutStorageService, TokenStorageService } from '@etdb/core/services';
import { MaterialModule } from '@etdb/shared';


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
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                TokenStorageService,
                LayoutStorageService,
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                NotAuthorizedAuthGuard
            ]
        };
    }
}
