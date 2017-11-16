import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { LayoutComponent } from './containers/layout.component';
import { ToolbarComponent } from './components/toolbar.component';

const COMPONENTS = [
    AppComponent,
    ToolbarComponent,
    LayoutComponent,
];


@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        COMPONENTS
    ],
    providers: [
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
