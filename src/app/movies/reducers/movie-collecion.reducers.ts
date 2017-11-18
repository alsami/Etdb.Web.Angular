import * as movieCollectionActions from '../actions/movie-collection.actions';

export interface MovieCollectionState {
    loaded: boolean;
    loading: boolean;
    ids: string[];
}

const initialState: MovieCollectionState = {
    loaded: false,
    loading: false,
    ids: [],
};

export function reducer(state: MovieCollectionState = initialState,
    action: movieCollectionActions.Actions): MovieCollectionState {
        switch (action.type) {
            case movieCollectionActions.LOAD: {
                return {
                    ...state,
                    loading: true
                };
            }

            case movieCollectionActions.LOAD_SUCCESS: {
                return {
                    loaded: true,
                    loading: false,
                    ids: action.movies.map(movie => movie.id)
                };
            }

            case movieCollectionActions.LOAD_FAIL: {
                return {
                    ...state,
                    loading: false,
                    loaded: false
                };
            }

            case movieCollectionActions.ADD_MOVIE_SUCCESS:
            case movieCollectionActions.REMOVE_MOVIE_FAIL: {
                if (state.ids.indexOf(action.movie.id) > -1) {
                    return state;
                }

                return {
                    ...state,
                    ids: [
                        ...state.ids,
                        action.movie.id
                    ]
                };
            }

            case movieCollectionActions.REMOVE_MOVIE_SUCCESS:
            case movieCollectionActions.ADD_MOVIE_FAIL: {
                return {
                    ...state,
                    ids: state.ids.filter(id => id !== action.movie.id)
                };
            }

            default: {
                return state;
            }
        }
}

export const getLoaded = (state: MovieCollectionState) => state.loaded;

export const getLoading = (state: MovieCollectionState) => state.loading;

export const getIds = (state: MovieCollectionState) => state.ids;
