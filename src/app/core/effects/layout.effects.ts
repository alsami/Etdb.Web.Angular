import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutStorageService } from '@app/core/services/layout-storage.service';
import * as layoutActions from '../actions/layout.actions';


@Injectable()
export class LayoutEffects {
    public constructor(private layoutStorageService: LayoutStorageService,
        private actions$: Actions) {}

    @Effect() store = this.actions$
        .ofType(layoutActions.SWITCH)
        .switchMap((action: layoutActions.SwitchThemeAction) => {
            this.layoutStorageService.storeTheme(action.theme);
            return Observable.of();
        });

    @Effect() restore = this.actions$
        .ofType(layoutActions.RESTORE)
        .switchMap(() => {
            if (this.layoutStorageService.canRestoreTheme()) {
                return Observable.of(new layoutActions.SwitchThemeAction(this.layoutStorageService.getTheme()));
            }
            return Observable.of();
        });
}
