import { Action } from '@ngrx/store';
import { ProfileImagesUploadQueueItem } from '@etdb/users/models';
import { ProgressNotification } from '@etdb/app-notification/models';

export enum ProfileImageUploadQueueActionTypes {
    Add = '[ProfileImageUploadQueue] Add profile image queue item',
    Process = '[ProfileImageUploadQueue] Process profile image queue item',
    Remove = '[ProfileImageUploadQueue] Remove profile image queue item',
}

export class Add implements Action {
    readonly type = ProfileImageUploadQueueActionTypes.Add;
    public constructor(public profileImageQueueItem: ProfileImagesUploadQueueItem) { }
}

export class Process implements Action {
    readonly type = ProfileImageUploadQueueActionTypes.Process;
    public constructor(public progressNotification: ProgressNotification,
        public profileImageQueueItem: ProfileImagesUploadQueueItem) { }
}

export class Remove implements Action {
    readonly type = ProfileImageUploadQueueActionTypes.Remove;
    public constructor(public id: string) { }
}

export type ProfileImageQueueItemActionUnion =
    | Add
    | Process
    | Remove;
