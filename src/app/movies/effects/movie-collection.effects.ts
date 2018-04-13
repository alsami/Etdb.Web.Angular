import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import * as movieCollectionActions from '../actions/movie-collection.actions';
import { map, catchError, toArray, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieCollectionEffects {
    public constructor(private movieService: MovieService,
        private actions$: Actions) {}

    @Effect() loadCollection: Observable<Action> = this.actions$.pipe(
        ofType(movieCollectionActions.LOAD),
        switchMap(() =>
            this.movieService.get().pipe(
                map(movies => new movieCollectionActions.LoadSuccessAction(movies)),
                catchError(error => of(new movieCollectionActions.LoadFailAction(error)))
            )
        ));

    @Effect() addToMovieCollection: Observable<Action> = this.actions$.pipe(
        ofType(movieCollectionActions.ADD_MOVIE),
        map((action: movieCollectionActions.AddAction) => action.movie),
        mergeMap(movie =>
            this.movieService.post(movie).pipe(
                map(() => new movieCollectionActions.AddSuccessAction(movie)),
                catchError(() => of(new movieCollectionActions.AddFailAction(movie)))
        )));
}
