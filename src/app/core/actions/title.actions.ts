import { Action } from '@ngrx/store';

export enum TitleActionTypes {
    SetTitle = '[Title] Set Title'
}

export class SetTitle implements Action {
    readonly type = TitleActionTypes.SetTitle;
    public constructor(public title: string) {}
}

export type TitleActions = SetTitle;
