import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserUiPreferenceStorageService } from '@app/core/services/user-ui-preference-storage.service';
import * as layoutActions from '../actions/layout.actions';


@Injectable()
export class LayoutEffects {
    public constructor(private uiPreferenceStorageService: UserUiPreferenceStorageService,
        private actions$: Actions) {}

    @Effect() store = this.actions$
        .ofType(layoutActions.SWITCH)
        .switchMap((action: layoutActions.SwitchThemeAction) => {
            this.uiPreferenceStorageService.storeTheme(action.theme);
            return Observable.empty();
        });

    @Effect() restore = this.actions$
        .ofType(layoutActions.RESTORE)
        .switchMap(() => {
            if (this.uiPreferenceStorageService.canRestoreTheme()) {
                return Observable.of(new layoutActions.SwitchThemeAction(this.uiPreferenceStorageService.getTheme()));
            }
            return Observable.of({ type: 'EMPTY'});
        });
}
