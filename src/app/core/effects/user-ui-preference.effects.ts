import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserUiPreferenceStorageService } from '@app/core/services/user-ui-preference-storage.service';
import * as userUiPreferenceActions from '../actions/user-ui-preference.actions';


@Injectable()
export class UserUiPreferenceEffects {
    public constructor(private uiPreferenceStorageService: UserUiPreferenceStorageService,
        private actions$: Actions) {}

    @Effect() store = this.actions$
        .ofType(userUiPreferenceActions.SWITCH)
        .switchMap((action: userUiPreferenceActions.SwitchThemeAction) => {
            this.uiPreferenceStorageService.storeTheme(action.theme);
            return Observable.of();
        });

    @Effect() restore = this.actions$
        .ofType(userUiPreferenceActions.RESTORE)
        .map(() => {
            if (this.uiPreferenceStorageService.canRestoreTheme()) {
                return new userUiPreferenceActions
                    .SwitchThemeAction(this.uiPreferenceStorageService.getTheme());
            }
            Observable.of();
        });
}
