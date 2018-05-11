import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../core/reducers/auth.reducer';
import * as fromLayout from '../core/reducers/layout.reducer';
import * as fromTitle from '../core/reducers/title.reducer';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    layout: fromLayout.LayoutState;
    title: fromTitle.TitleState;
    auth: fromAuth.AuthState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<AppState> = {
    layout: fromLayout.reducer,
    title: fromTitle.reducer,
    auth: fromAuth.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.showSidenav,
);

export const getTheme = createSelector(
    getLayoutState,
    fromLayout.theme
);

/**
 * Title Reducers
 */
export const getTitleState = createFeatureSelector<fromTitle.TitleState>('title');

export const getTitle = createSelector(
    getTitleState,
    fromTitle.title
);

/**
 * Auth Reducers
 */
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getAuthIdentityToken = createSelector(
    getAuthState,
    fromAuth.identityToken
);

export const getAuthIdentityUser = createSelector(
    getAuthState,
    fromAuth.identityUser
);

export const getAuthLoggedIn = createSelector(
    getAuthState,
    fromAuth.loggedIn
);

export const getAuthLoading = createSelector(
    getAuthState,
    fromAuth.loading
);

export const getAuthLoaded = createSelector(
    getAuthState,
    fromAuth.loaded
);
