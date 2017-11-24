import { Action } from '@ngrx/store';

export const SWITCH = '[Theme] Change';
export const RESTORE = '[Theme] Restore';


export class SwitchThemeAction implements Action {
    readonly type = SWITCH;
    public constructor(public theme: string) {}
}

export class RestoreThemeAction implements Action {
    readonly type = RESTORE;
}


export declare type Actions = SwitchThemeAction | RestoreThemeAction;
