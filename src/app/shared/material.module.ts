import { NgModule } from '@angular/core';
import { 
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdListModule,
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCardModule,
    MdDialogModule,
    MdProgressBarModule,
 } from '@angular/material';

 import {OverlayModule} from '@angular/cdk/overlay';
 import {PortalModule} from '@angular/cdk/portal';

const modules = [
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdListModule,
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCardModule,
    MdDialogModule,
    MdProgressBarModule,
    OverlayModule,
    PortalModule,
]

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
