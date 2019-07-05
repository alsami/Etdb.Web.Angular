import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '@etdb/users/+state/reducers';
import { ProfileImagesUploadQueueItem } from '@etdb/users/models';
import { ProfileImageQueueActions } from '@etdb/users/+state/actions';
import { ProgressNotification } from '@etdb/app-notification/models';

@Injectable()
export class ProfileImageQueueFacadeService {
    public constructor(private store: Store<fromUser.UsersState>) { }

    public add(profileImageUploadQueueItem: ProfileImagesUploadQueueItem): void {
        this.store.dispatch(new ProfileImageQueueActions.Add(profileImageUploadQueueItem));
    }

    public process(progressNotification: ProgressNotification, profileImageUploadQueueItem: ProfileImagesUploadQueueItem): void {
        this.store.dispatch(new ProfileImageQueueActions.Process(progressNotification, profileImageUploadQueueItem));
    }

    public remove(id: string): void {
        this.store.dispatch(new ProfileImageQueueActions.Remove(id));
    }
}
