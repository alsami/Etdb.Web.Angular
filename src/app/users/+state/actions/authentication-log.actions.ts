import { Action } from '@ngrx/store';
import { AuthenticationLog } from '@etdb/models';

export enum AuthenticationLogActionTypes {
    Load = '[Authentication-Log API] Load Authentication Logs',
    Loaded = '[Authentication-Log API] Loaded Authentication Logs',
    LoadFailed = '[Authentication-Log API] Load Authentication Logs Failed',
}

export class Load implements Action {
    readonly type = AuthenticationLogActionTypes.Load;
    public constructor(public url: string) { }
}

export class Loaded implements Action {
    readonly type = AuthenticationLogActionTypes.Loaded;
    public constructor(public authenticationLogs: AuthenticationLog[]) { }
}

export class LoadFailed implements Action {
    readonly type = AuthenticationLogActionTypes.LoadFailed;
    public constructor(public error: Error) { }
}

export type AuthenticationLogActions =
    | Load
    | Loaded
    | LoadFailed;
