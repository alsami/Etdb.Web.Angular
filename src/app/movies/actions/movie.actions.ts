import { Action } from '@ngrx/store';
import { Movie } from '@app/movies/models/movie.model';

export const SEARCH = '[Movie] Search';
export const SEARCH_COMPLETE = '[Movie] Search Complete';
export const LOAD = '[Movie] Load';
export const SELECT = '[Movie] Select';

export class SearchAction implements Action {
    readonly type = SEARCH;
    public constructor(public searchTerm: string) {

    }
}

export class SearchCompleteAction implements Action {
    readonly type = SEARCH_COMPLETE;
    public constructor(public movies: Movie[]) {

    }
}

export class LoadAction implements Action {
    readonly type = LOAD;
    public constructor(public movie: Movie) {

    }
}

export class SelectAction implements Action {
    readonly type = SELECT;
    public constructor(public movie: Movie) {

    }
}

export type Actions =
    SearchAction | SearchCompleteAction | LoadAction | SelectAction;
