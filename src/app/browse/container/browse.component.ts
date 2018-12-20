import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/reducers';
import { TitleActions } from '@etdb/core/actions';

@Component({
    selector: 'etdb-browse',
    templateUrl: 'browse.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseComponent implements OnInit {
    public constructor(private store: Store<fromRoot.AppState>) {}

    public ngOnInit(): void {
        this.store.dispatch(new TitleActions.SetTitle('Browse'));
    }
}
