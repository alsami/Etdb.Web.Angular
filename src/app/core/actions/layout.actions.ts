import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[Layout] Open Sidenav';
export const CLOSE_SIDENAV = '[Layout] Close Sidenav';
export const SWITCH = '[Layout] Change Theme';
export const RESTORE = '[Layout] Restore Theme';

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}


export class SwitchThemeAction implements Action {
    readonly type = SWITCH;
    public constructor(public theme: string) {}
}

export class RestoreThemeAction implements Action {
    readonly type = RESTORE;
}


export type Actions = OpenSidenav | CloseSidenav | SwitchThemeAction | RestoreThemeAction;
