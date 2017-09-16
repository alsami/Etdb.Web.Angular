import * as movieActions from '../actions/movie.actions';
import * as movieCollectionActions from '../actions/movie-collection.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Movie } from "../movie.model";

export interface MovieState extends EntityState<Movie> {
    selectedMovieId: string | null;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
    selectId: (movie: Movie) => movie.id,
    sort: false,
});

export const initialState: MovieState = adapter.getInitialState({
    selectedMovieId: null,
});

export function reducer(state: MovieState = initialState, 
    action: movieActions.Actions | movieCollectionActions.Actions) : MovieState {
    
    switch(action.type){
        case movieActions.SEARCH_COMPLETE:
        case movieCollectionActions.LOAD_SUCCESS: {
            return {
                ...adapter.addMany(action.movies, state),
                selectedMovieId: state.selectedMovieId
            };
        }

        case movieActions.LOAD: {
            return {
                ...adapter.addOne(action.movie, state),
                selectedMovieId: state.selectedMovieId
            };
        }

        case movieActions.SELECT: {
            return {
                ...state,
                selectedMovieId: state.selectedMovieId
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: MovieState) => state.selectedMovieId;