import * as titleActions from '../actions/title.actions';

export interface TitleState {
    title: string;
}

const initialState: TitleState = {
  title: '',
};

export function reducer(state = initialState, action: titleActions.Actions): TitleState {
  switch (action.type) {
    case titleActions.SET_TITLE:
      return {
        title: action.title
      };

    default:
      return state;
  }
}

export const title = (state: TitleState) => state.title;
