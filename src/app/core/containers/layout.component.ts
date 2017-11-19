import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html'
})

export class LayoutComponent {
    showSidenav$: Observable<boolean>;
    title$: Observable<string>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.title$ = this.store.select(fromRoot.getTitle);
    }
}
