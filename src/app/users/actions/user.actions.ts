import { User } from '@etdb/users/models';
import { Action } from '@ngrx/store';

export enum UserActionsTypes {
    Load = '[User API] User Load ',
    Loaded = '[User API] User Loaded',
    LoadFailed = '[User API] User Load Failed'
}

export class Load implements Action {
    readonly type = UserActionsTypes.Load;
    public constructor(public id: string) { }
}

export class Loaded implements Action {
    readonly type = UserActionsTypes.Loaded;
    public constructor(public user: User) { }
}

export class LoadFailed implements Action {
    readonly type = UserActionsTypes.LoadFailed;
    public constructor(public error: Error) { }
}

export type UserActions = Load | Loaded | LoadFailed;
