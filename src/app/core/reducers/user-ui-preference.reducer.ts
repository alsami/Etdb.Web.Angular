import * as themeActions from '../actions/user-ui-preference.actions';
import { PRIMARY_THEME } from '../core.constants';

export interface UserUiPreferenceState {
    theme: string;
}

const initialState: UserUiPreferenceState = {
  theme: PRIMARY_THEME,
};

export function reducer(state = initialState, action: themeActions.Actions): UserUiPreferenceState {
  switch (action.type) {
    case themeActions.SWITCH:
      return {
        theme: action.theme
      };

    default:
      return state;
  }
}

export const theme = (state: UserUiPreferenceState) => state.theme;
