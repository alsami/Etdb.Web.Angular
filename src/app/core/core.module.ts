import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    SignInFormComponent,
    RegisterFormComponent,
    SidenavContentComponent,
    ToolbarComponent,
    GoogleSignInButtonComponent
} from '@etdb/core/components';
import {
    AppComponent,
    LayoutComponent,
    SignInComponent,
    RegisterComponent
} from '@etdb/core/containers';
import { NotAuthorizedAuthGuard } from '@etdb/core/guards';
import { TokenInterceptor } from '@etdb/core/interceptors';
import {
    AuthService,
    LayoutStorageService,
    TokenStorageService,
    BreakpointService,
    PolicyService,
    ErrorExtractorService
} from '@etdb/core/services';
import { MaterialModule } from '@etdb/shared';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';

const COMPONENTS = [
    AppComponent,
    ToolbarComponent,
    LayoutComponent,
    SidenavContentComponent,
    SignInComponent,
    SignInFormComponent,
    RegisterComponent,
    RegisterFormComponent,
    GoogleSignInButtonComponent
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CustomControlModule,
        MaterialModule
    ],
    exports: [COMPONENTS]
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                PolicyService,
                TokenStorageService,
                LayoutStorageService,
                BreakpointService,
                ErrorExtractorService,
                NotAuthorizedAuthGuard,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }
            ]
        };
    }
}
