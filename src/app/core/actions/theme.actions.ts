import { Action } from '@ngrx/store';

export const SWITCH = '[Theme] Change';


export class SwitchThemeAction implements Action {
    readonly type = SWITCH;
    public constructor(public theme: string) {}
}


export declare type Actions = SwitchThemeAction;
