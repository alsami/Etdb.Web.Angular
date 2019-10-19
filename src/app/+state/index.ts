import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { fromAuth, fromLayout, fromTitle } from '@etdb/core/+state/reducers';
import { AuthActionTypes } from '@etdb/core/+state/actions/auth.actions';

export interface AppState {
    layout: fromLayout.LayoutState;
    title: fromTitle.TitleState;
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    layout: fromLayout.reducer,
    title: fromTitle.reducer,
    auth: fromAuth.reducer,
};

// console.log all actions
export function logger(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export function clearOnSignOut(reducer: ActionReducer<AppState>) {
    return function (state: AppState, action: any) {
      return reducer(action.type === AuthActionTypes.SignOut ? <any> {
          ...state,
          appNotifications: []
      } : state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, clearOnSignOut]
    : [clearOnSignOut];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>(
    'layout'
);

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.showSidenav
);

export const getTheme = createSelector(
    getLayoutState,
    fromLayout.theme
);

/**
 * Title Reducers
 */
export const getTitleState = createFeatureSelector<fromTitle.TitleState>(
    'title'
);

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

export const getAuthenticatedUser = createSelector(
    getAuthState,
    fromAuth.authenticatedUser
);

export const getAuthAuthenticated = createSelector(
    getAuthState,
    fromAuth.authenticated
);

export const getAuthLoading = createSelector(
    getAuthState,
    fromAuth.loading,
);

export const getAuthLoaded = createSelector(
    getAuthState,
    fromAuth.loaded
);

export const getAuthAuthenticating = createSelector(
    getAuthState,
    state => state.authenticating && !state.registering
);

export const getAuthRegistering = createSelector(
    getAuthState,
    fromAuth.registering
);

export const getAuthGoogleAuthAvailable = createSelector(
    getAuthState,
    fromAuth.googleAuthAvailable
);

export const getAuthFacebookAuthAvailable = createSelector(
    getAuthState,
    fromAuth.facebookAuthAvailable
);


