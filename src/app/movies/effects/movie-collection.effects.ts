import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MovieService } from '../services/movie.service';
import * as movieCollectionActions from '../actions/movie-collection.actions';

@Injectable()
export class MovieCollectionEffects {
    public constructor(private movieService: MovieService,
        private actions$: Actions) {}

    @Effect() loadCollection: Observable<Action> = this.actions$
        .ofType(movieCollectionActions.LOAD)
        .switchMap(() =>
            this.movieService.get()
                .map(movies => new movieCollectionActions.LoadSuccessAction(movies))
                .catch(error => of(new movieCollectionActions.LoadFailAction(error)))
        );

    @Effect() addToMovieCollection: Observable<Action> = this.actions$
        .ofType(movieCollectionActions.ADD_MOVIE)
        .map((action: movieCollectionActions.AddAction) => action.movie)
        .mergeMap(movie =>
            this.movieService.post(movie)
                .map(() => new movieCollectionActions.AddSuccessAction(movie))
                .catch(() => of(new movieCollectionActions.AddFailAction(movie)))
        );
}
