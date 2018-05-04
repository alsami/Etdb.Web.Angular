import { PRIMARY_THEME } from '@etdb/core/core.constants';
import { LayoutActions, LayoutActionTypes } from '@etdb/core/actions/layout.actions';
import * as layoutActions from '@etdb/core/actions/layout.actions';

export interface LayoutState {
    showSidenav: boolean;
    theme: string;
}

const initialState: LayoutState = {
    showSidenav: true,
    theme: PRIMARY_THEME
};

export function reducer(state = initialState, action: LayoutActions): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.OpenSidenav:
        case LayoutActionTypes.CloseSidenav:
            return {
                ...state,
                showSidenav: action instanceof layoutActions.OpenSidenav
            };

        case LayoutActionTypes.SwitchTheme:
            return {
                ...state,
                theme: action.theme
            };

        default:
            return state;
    }
}

export const showSidenav = (state: LayoutState) => state.showSidenav;
export const theme = (state: LayoutState) => state.theme;
