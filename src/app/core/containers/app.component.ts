import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layoutActions from '../actions/layout.actions';
import { getShowSidenav } from '../reducers/layout.reducer';

@Component({
  selector: 'etdb-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {}
 