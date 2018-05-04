import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AppRoutingModule } from '@etdb/app-routing.module';
import { reducers, metaReducers } from '@etdb/reducers';
import { AuthEffects, TitleEffects, LayoutEffects } from '@etdb/core/effects';
import { CoreModule } from '@etdb/core/core.module';
import { AppComponent } from '@etdb/core/containers';
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
            LayoutEffects,
            TitleEffects
        ]),
        CoreModule.forRoot(),
        BrowseModule,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'en-US'},
        UniqueSelectionDispatcher
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
