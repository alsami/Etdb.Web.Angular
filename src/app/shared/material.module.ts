import { NgModule } from '@angular/core';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatExpansionModule,
 } from '@angular/material';

 import {OverlayModule} from '@angular/cdk/overlay';
 import {PortalModule} from '@angular/cdk/portal';

const modules = [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatExpansionModule,
    OverlayModule,
    PortalModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
