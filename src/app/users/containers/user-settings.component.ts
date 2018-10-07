import { Component, OnInit } from '@angular/core';
import * as fromRoot from '@etdb/reducers';
import { Store } from '@ngrx/store';
import * as titleActions from '@etdb/core/actions/title.actions';

@Component({
    selector: 'etdb-user-settings',
    templateUrl: 'user-settings.component.html'
})
export class UserSettingsComponent implements OnInit {
    public constructor(private store: Store<fromRoot.AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(new titleActions.SetTitle('Users', 'Settings'));
    }
}
