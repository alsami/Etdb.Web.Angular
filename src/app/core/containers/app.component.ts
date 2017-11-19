import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as configActions from '../actions/config.actions';

@Component({
  selector: 'etdb-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
    public constructor(private store: Store<fromRoot.AppState>) {
      this.store.dispatch(new configActions.LoadClientConfigAction());
    }
}
