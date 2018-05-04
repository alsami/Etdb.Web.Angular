import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LayoutStorageService } from '@etdb/core/services/layout-storage.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LayoutActionTypes } from '@etdb/core/actions/layout.actions';
import * as layoutActions from '@etdb/core/actions/layout.actions';

@Injectable()
export class LayoutEffects {
    public constructor(private layoutStorageService: LayoutStorageService,
        private actions$: Actions) {}

    @Effect() store = this.actions$.pipe(
        ofType(LayoutActionTypes.SwitchTheme),
        switchMap((action: layoutActions.SwitchTheme) => {
            this.layoutStorageService.storeTheme(action.theme);
            return of();
        })
    );

    @Effect() restore = this.actions$.pipe(
        ofType(LayoutActionTypes.RestoreTheme),
        switchMap(() => {
            if (this.layoutStorageService.canRestoreTheme()) {
                return of(new layoutActions.SwitchTheme(this.layoutStorageService.getTheme()));
            }

            return of();
        })
    );
}
