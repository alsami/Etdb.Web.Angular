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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,
 } from '@angular/material';

 import { OverlayModule } from '@angular/cdk/overlay';
 import { PortalModule } from '@angular/cdk/portal';
 import { LayoutModule } from '@angular/cdk/layout';

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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,
    OverlayModule,
    PortalModule,
    LayoutModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
