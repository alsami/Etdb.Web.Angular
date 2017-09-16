import { Action, createSelector } from '@ngrx/store';
import * as LayoutActions from '../actions/layout.actions';

export interface LayoutState {
    showSidenav: boolean;
  }
  
  const initialState: LayoutState = {
    showSidenav: false,
  };
  
  export function reducer(state = initialState, action: Action): LayoutState {
    switch (action.type) {
      case LayoutActions.CLOSE_SIDENAV:
        return {
          showSidenav: false,
        };
  
      case LayoutActions.OPEN_SIDENAV:
        return {
          showSidenav: true,
        };
  
      default:
        return state;
    }
  }
  
export const getShowSidenav = (state: LayoutState) => state.showSidenav;
  