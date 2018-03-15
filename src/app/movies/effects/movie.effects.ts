import { SearchCompleteAction } from '../actions/movie.actions';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from '../services/movie.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as movieActions from '../actions/movie.actions';
import { Movie } from '@app/movies/models/movie.model';
import { map, catchError, toArray, switchMap, mergeMap, debounceTime, skip, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieEffects {
    public constructor(private actions$: Actions,
        private movieService: MovieService) {}

    @Effect() search$: Observable<Action> = this.actions$.pipe(
        ofType<movieActions.SearchAction>(movieActions.SEARCH),
        debounceTime(1000),
        map(action => action.searchTerm),
        switchMap(searchTerm => {
            if (searchTerm === '') {
                return of();
            }

            const nextSearch$ = this.actions$.pipe(
                ofType(movieActions.SEARCH),
                skip(1)
            );


            return this.movieService
                .search(searchTerm)
                .pipe(
                    takeUntil(nextSearch$),
                    map(movies => new movieActions.SearchCompleteAction(movies)),
                    catchError(() => of(new SearchCompleteAction([])))
                );
        }));
}
