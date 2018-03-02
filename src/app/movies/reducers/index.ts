import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducers';
import * as fromMovies from './movie.reducers';
import * as fromCollection from './movie-collecion.reducers';
import * as fromRoot from '../../reducers';

export interface MoviesState {
    search: fromSearch.SearchState;
    movies: fromMovies.MovieState;
    collection: fromCollection.MovieCollectionState;
}

export interface State extends fromRoot.AppState {
  'movies': MoviesState;
}

export const reducers = {
    search: fromSearch.reducer,
    movies: fromMovies.reducer,
    collection: fromCollection.reducer,
};

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getMovieEntitiesState = createSelector(
    getMoviesState,
    state => state.movies
);

export const getSelectedMovieId = createSelector(
    getMovieEntitiesState,
    fromMovies.getSelectedId
);

export const {
    selectIds: getMovieIds,
    selectEntities: getMovieEntities,
    selectAll: getAllMovies,
    selectTotal: getTotalMovies,
} = fromMovies.adapter.getSelectors(getMovieEntitiesState);

export const getSelectedMovie = createSelector(
    getMovieEntities,
    getSelectedMovieId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getSearchState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.search
);

export const getSearchMovieIds = createSelector(
    getSearchState,
    fromSearch.getIds
);
export const getSearchTerm = createSelector(
    getSearchState,
    fromSearch.getSearchTerm
);
export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getSearchResults = createSelector(
    getMovieEntities,
    getSearchMovieIds,
    (movies, searchIds) => {
    return searchIds.map(id => movies[id]);
    }
);

export const getCollectionState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionMovieIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getMovieCollection = createSelector(
    getMovieEntities,
    getCollectionMovieIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

export const isSelectedMovieInCollection = createSelector(
    getCollectionMovieIds,
    getSelectedMovieId,
    (ids, selected) => {
        return ids.indexOf(selected) > -1;
    }
);
