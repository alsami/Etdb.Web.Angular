import { Action } from '@ngrx/store';
import { Movie } from '@app/movies/models/movie.model';

export const ADD_MOVIE = '[Collection] Add MOVIE';
export const ADD_MOVIE_SUCCESS = '[Collection] Add MOVIE Success';
export const ADD_MOVIE_FAIL = '[Collection] Add MOVIE Fail';
export const REMOVE_MOVIE = '[Collection] Remove MOVIE';
export const REMOVE_MOVIE_SUCCESS = '[Collection] Remove MOVIE Success';
export const REMOVE_MOVIE_FAIL = '[Collection] Remove MOVIE Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

export class AddAction implements Action {
    readonly type = ADD_MOVIE;
    public constructor(public movie: Movie) {}
}

export class AddSuccessAction implements Action {
    readonly type = ADD_MOVIE_SUCCESS;
    public constructor(public movie: Movie) {}
}

export class AddFailAction implements Action {
    readonly type = ADD_MOVIE_FAIL;
    public constructor(public movie: Movie) {}
}

export class RemoveAction implements Action {
    readonly type = REMOVE_MOVIE;
    public constructor(public movie: Movie) {}
}

export class RemoveSuccessAction implements Action {
    readonly type = REMOVE_MOVIE_SUCCESS;
    public constructor(public movie: Movie) {}
}

export class RemoveFailAction implements Action {
    readonly type = REMOVE_MOVIE_FAIL;
    public constructor(public movie: Movie) {}
}

export class LoadAction implements Action {
    readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public movies: Movie[]) {}
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public error: any) {}
  }

export type Actions =
    AddAction | AddSuccessAction | AddFailAction |
    RemoveAction | RemoveSuccessAction | RemoveFailAction |
    LoadAction | LoadSuccessAction | LoadFailAction;
