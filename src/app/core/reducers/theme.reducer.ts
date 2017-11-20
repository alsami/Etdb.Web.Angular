import * as themeActions from '../actions/theme.actions';
import { PRIMARY_THEME } from '../core.constants';

export interface ThemeState {
    theme: string;
}

const initialState: ThemeState = {
  theme: PRIMARY_THEME,
};

export function reducer(state = initialState, action: themeActions.Actions): ThemeState {
  switch (action.type) {
    case themeActions.SWITCH:
      return {
        theme: action.theme
      };

    default:
      return state;
  }
}

export const theme = (state: ThemeState) => state.theme;
