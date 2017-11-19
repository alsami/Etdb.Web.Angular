import { ClientConfig } from '../models/client-config.model';
import { Action } from '@ngrx/store';

export const LOAD_CLIENT_CONFIG = '[Config] Client Config load';
export const LOAD_CLIENT_CONFIG_SUCCESS = '[Layout] Client Config load success';
export const LOAD_CLIENT_CONFIG_FAIL = '[Layout] Client Config load fail';

export class LoadClientConfigAction implements Action {
    readonly type = LOAD_CLIENT_CONFIG;
    public constructor() {}
}

export class LoadClientConfigSuccessAction implements Action {
    readonly type = LOAD_CLIENT_CONFIG_SUCCESS;
    public constructor(public clientConfig: ClientConfig) {}
}

export class LoadClientConfigFailAction implements Action {
    readonly type = LOAD_CLIENT_CONFIG_FAIL;
    public constructor(public error: Error) {}
}

export declare type Actions =
    LoadClientConfigAction | LoadClientConfigSuccessAction | LoadClientConfigFailAction;
