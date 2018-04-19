import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AppRoutingModule } from '@etdb/app-routing.module';
import { reducers, metaReducers } from '@etdb/reducers';
import { AuthEffects, NotificationMessageEffects } from '@etdb/core/effects';
import { CoreModule } from '@etdb/core/core.module';
import { AppComponent } from '@etdb/core/containers';
import { LayoutEffects } from '@etdb/core/effects/layout.effects';
import { BrowseModule } from '@etdb/browse/browse.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot([
            AuthEffects,
            NotificationMessageEffects,
            LayoutEffects,
        ]),
        CoreModule.forRoot(),
        BrowseModule,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'de-de'},
        UniqueSelectionDispatcher
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
