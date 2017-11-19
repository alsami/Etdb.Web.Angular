import { Action } from '@ngrx/store';

export const SET_TITLE = '[Title] Set Title';

export class SetTitleAction implements Action {
    readonly type = SET_TITLE;
    public constructor(public title: string) {}
}

export type Actions = SetTitleAction;
