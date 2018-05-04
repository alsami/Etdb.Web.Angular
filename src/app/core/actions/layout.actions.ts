import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    OpenSidenav = '[Layout] Open Sidenav',
    CloseSidenav = '[Layout] Close Sidenav',
    SwitchTheme = '[Layout] Switch Theme',
    RestoreTheme = '[Layout] Restore Theme'
}

export class OpenSidenav implements Action {
    readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
    readonly type = LayoutActionTypes.CloseSidenav;
}

export class SwitchTheme implements Action {
    readonly type = LayoutActionTypes.SwitchTheme;
    public constructor(public theme: string) { }
}

export class RestoreTheme implements Action {
    readonly type = LayoutActionTypes.RestoreTheme;
}

export type LayoutActions = OpenSidenav | CloseSidenav | SwitchTheme | RestoreTheme;
