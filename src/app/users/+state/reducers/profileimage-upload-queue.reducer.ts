import { ProfileImagesUploadQueueItem } from '@etdb/users/models';
import { ProfileImageQueueActions } from '@etdb/users/+state/actions';

export interface ProfileImageUploadQueueState {
    queueItems: ProfileImagesUploadQueueItem[];
}

const initialState: ProfileImageUploadQueueState = {
    queueItems: []
};

export function reducer(state: ProfileImageUploadQueueState = initialState,
    action: ProfileImageQueueActions.ProfileImageQueueItemActionUnion): ProfileImageUploadQueueState {
    switch (action.type) {
        case ProfileImageQueueActions.ProfileImageUploadQueueActionTypes.Add: {
            state.queueItems.push(action.profileImageQueueItem);
            return state;
        }

        case ProfileImageQueueActions.ProfileImageUploadQueueActionTypes.Remove: {
            const index = state.queueItems.findIndex(item => item.id === action.id);

            if (index === -1) {
                return state;
            }

            state.queueItems.splice(index, 1);

            return state;
        }

        default: return state;
    }
}
