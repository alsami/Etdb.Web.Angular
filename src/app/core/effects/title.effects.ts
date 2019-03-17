import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import * as titleActions from '@etdb/core/actions/title.actions';
import { TitleActionTypes } from '@etdb/core/actions/title.actions';

@Injectable()
export class TitleEffects {
    @Effect() tabTitle$: Observable<Action> = this.actions$.pipe(
        ofType(TitleActionTypes.SetTitle),
        switchMap((action: titleActions.SetTitle): Observable<any> => {
            if (action.suffix) {
                this.title.setTitle(
                    `ETDB | ${action.section} | ${action.suffix}`
                );
                return of();
            }

            this.title.setTitle(`ETDB | ${action.section}`);
            return of();
        })
    );

    public constructor(private actions$: Actions, private title: Title) { }
}
