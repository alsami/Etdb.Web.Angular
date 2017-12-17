import * as layoutActions from '../actions/layout.actions';
import { PRIMARY_THEME } from '@app/core/core.constants';

export interface LayoutState {
    showSidenav: boolean;
    theme: string;
  }

const initialState: LayoutState = {
  showSidenav: true,
  theme: PRIMARY_THEME
};

export function reducer(state = initialState, action: layoutActions.Actions): LayoutState {
    switch (action.type) {
        case layoutActions.CLOSE_SIDENAV:
            return {
                ...state,
                showSidenav: false,
            };

        case layoutActions.OPEN_SIDENAV:
            return {
                ...state,
                showSidenav: true,
            };

        case layoutActions.SWITCH:
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
