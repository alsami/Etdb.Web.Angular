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
        switchMap(
            (action: titleActions.SetTitle): Observable<any> => {
                const newTitle = action.suffix
                    ? `ETDB | ${action.section} | ${action.suffix}`
                    : `ETDB | ${action.section}`;

                this.title.setTitle(newTitle);
                return of();
            }
        )
    );

    public constructor(private actions$: Actions, private title: Title) {}
}
