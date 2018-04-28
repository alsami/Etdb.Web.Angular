import { SearchCompleteAction } from '../actions/movie.actions';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from '../services/movie.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as movieActions from '../actions/movie.actions';
import { Movie } from '@etdb/movies/models/movie.model';
import { map, catchError, switchMap, debounceTime, skip, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

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
                    map((movies: Movie[]) => new movieActions.SearchCompleteAction(movies)),
                    catchError(() => of(new SearchCompleteAction([])))
                );
        }));
}
