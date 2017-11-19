import * as configActions from '../actions/config.actions';
import { ClientConfig } from '../models/client-config.model';

export interface ConfigState {
    clientConfig: ClientConfig;
    loading: boolean;
    loaded: boolean;
  }

const initialState: ConfigState = {
  clientConfig: null,
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: configActions.Actions): ConfigState {
    switch (action.type) {
        case configActions.LOAD_CLIENT_CONFIG:
        return {
            clientConfig: null,
            loading: true,
            loaded: false
        };

        case configActions.LOAD_CLIENT_CONFIG_SUCCESS:
        return {
            clientConfig: action.clientConfig,
            loading: false,
            loaded: true
        };

        case configActions.LOAD_CLIENT_CONFIG_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false
        };

        default:
            return state;
    }
  }

export const clientConfig = (state: ConfigState) => state.clientConfig;
export const loading = (state: ConfigState) => state.loading;
export const loaded = (state: ConfigState) => state.loaded;
