import * as movieActions from '../actions/movie.actions';

export interface SearchState {
  ids: string[];
  loading: boolean;
  searchTerm: string;
}

const initialState: SearchState = {
  ids: [],
  loading: false,
  searchTerm: '',
};

export function reducer(state: SearchState = initialState, action: movieActions.Actions): SearchState {
  switch (action.type) {
    case movieActions.SEARCH: {
      const searchTerm = action.searchTerm;

      if (searchTerm === '') {
        return {
          ids: [],
          loading: false,
          searchTerm,
        };
      }

      return {
        ...state,
        searchTerm,
        loading: true,
      };
    }

    case movieActions.SEARCH_COMPLETE: {
      return {
        ids: action.movies.map(movie => movie.id),
        loading: false,
        searchTerm: state.searchTerm,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: SearchState) => state.ids;

export const getSearchTerm = (state: SearchState) => state.searchTerm;

export const getLoading = (state: SearchState) => state.loading;
