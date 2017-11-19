import * as layoutActions from '../actions/layout.actions';

export interface LayoutState {
    showSidenav: boolean;
  }

const initialState: LayoutState = {
  showSidenav: true,
};

export function reducer(state = initialState, action: layoutActions.Actions): LayoutState {
    switch (action.type) {
      case layoutActions.CLOSE_SIDENAV:
        return {
          showSidenav: false,
        };

      case layoutActions.OPEN_SIDENAV:
        return {
          showSidenav: true,
        };

      default:
        return state;
    }
  }

export const showSidenav = (state: LayoutState) => state.showSidenav;
