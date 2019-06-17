import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/+state';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitleFacadeService {
    public currentTitle$: Observable<string>;
    public constructor(private store: Store<fromRoot.AppState>) {
        this.currentTitle$ = this.store.select(fromRoot.getTitle);
    }
}
