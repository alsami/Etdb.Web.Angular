import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/+state';
import { Observable } from 'rxjs';
import { TitleActions } from '@etdb/core/+state/actions';

@Injectable({
    providedIn: 'root'
})
export class TitleFacadeService {
    public currentTitle$: Observable<string>;
    public constructor(private store: Store<fromRoot.AppState>) {
        this.currentTitle$ = this.store.select(fromRoot.getTitle);
    }

    public setTitle(title: string): void {
        this.store.dispatch(new TitleActions.SetTitle(title));
    }
}
