import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AppRoutingModule } from '@app/app-routing.module';
import { reducers, metaReducers } from '@app/reducers';
import { AuthEffects, NotificationMessageEffects, UserUiPreferenceEffects } from '@app/core/effects';
import { CoreModule } from '@app/core/core.module';
import { AppComponent } from '@app/core/containers';


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
        UserUiPreferenceEffects
    ]),
    CoreModule.forRoot(),
    ],
    providers: [
    {provide: LOCALE_ID, useValue: 'de-de'},
    UniqueSelectionDispatcher
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
