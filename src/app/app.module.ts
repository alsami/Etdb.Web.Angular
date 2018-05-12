import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@etdb/app-routing.module';
import { BrowseModule } from '@etdb/browse/browse.module';
import { AppComponent } from '@etdb/core/containers';
import { CoreModule } from '@etdb/core/core.module';
import { AuthEffects, LayoutEffects, TitleEffects } from '@etdb/core/effects';
import { reducers, metaReducers } from '@etdb/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';



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
        { provide: LOCALE_ID, useValue: 'en-US' },
        UniqueSelectionDispatcher
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
