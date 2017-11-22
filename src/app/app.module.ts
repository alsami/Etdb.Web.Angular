import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { NotificationMessageEffects } from './core/effects/notification-message.effects';
import { AuthEffects } from './core/effects/auth.effects';


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
