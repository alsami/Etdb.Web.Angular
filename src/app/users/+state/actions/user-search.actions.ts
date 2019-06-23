import { Action } from '@ngrx/store';

export enum UserSearchActionTypes {
    AvailabilityCheck = '[User API] Check User Name Availability',
    AvailabilityChecked = '[User API] Checked User Name Availability',
    AvailabilityCheckFailed = '[User API] Check User Name Availability failed',
}

export class AvailabilityCheck implements Action {
    readonly type = UserSearchActionTypes.AvailabilityCheck;
    public constructor(public userName: string) { }
}

export class AvailabilityChecked implements Action {
    readonly type = UserSearchActionTypes.AvailabilityChecked;
    public constructor(public data: { available: boolean }) { }
}

export class AvailabilityCheckFailed implements Action {
    readonly type = UserSearchActionTypes.AvailabilityCheckFailed;
    public constructor(public error: Error) { }
}

export type UserSearchActions =
    | AvailabilityCheck
    | AvailabilityChecked
    | AvailabilityCheckFailed;
