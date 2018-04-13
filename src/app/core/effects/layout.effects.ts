import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutStorageService } from '@app/core/services/layout-storage.service';
import * as layoutActions from '../actions/layout.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class LayoutEffects {
    public constructor(private layoutStorageService: LayoutStorageService,
        private actions$: Actions) {}

    @Effect() store = this.actions$.pipe(
        ofType(layoutActions.SWITCH),
        switchMap((action: layoutActions.SwitchThemeAction) => {
            this.layoutStorageService.storeTheme(action.theme);
            return of();
        })
    );

    @Effect() restore = this.actions$.pipe(
        ofType(layoutActions.RESTORE),
        switchMap(() => {
            if (this.layoutStorageService.canRestoreTheme()) {
                return of(new layoutActions.SwitchThemeAction(this.layoutStorageService.getTheme()));
            }

            return of();
        })
    );
}
