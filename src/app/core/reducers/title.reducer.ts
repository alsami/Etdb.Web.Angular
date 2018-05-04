import { TitleActions, TitleActionTypes } from '@etdb/core/actions/title.actions';

export interface TitleState {
    title: string;
}

const initialState: TitleState = {
    title: '',
};

export function reducer(state = initialState, action: TitleActions): TitleState {
    switch (action.type) {
        case TitleActionTypes.SetTitle:
            return {
                title: action.title
            };

        default:
            return state;
    }
}

export const title = (state: TitleState) => state.title;
