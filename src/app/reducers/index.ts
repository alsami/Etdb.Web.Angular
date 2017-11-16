import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';

  import * as fromLayout from '../core/reducers/layout.reducer';

  /**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
  export interface State {
    layout: fromLayout.LayoutState;
  }

  /**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer
};

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav,
);

export const getSidenavShown = createSelector(getShowSidenav, (state: boolean) => state);
