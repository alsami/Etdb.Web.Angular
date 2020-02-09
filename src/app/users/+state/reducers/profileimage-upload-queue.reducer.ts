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
            const queueItems = state.queueItems.slice();

            queueItems.push(action.profileImageQueueItem);

            return  {
                ...state,
                queueItems: queueItems
            }
        }

        case ProfileImageQueueActions.ProfileImageUploadQueueActionTypes.Remove: {
            const index = state.queueItems.findIndex(item => item.id === action.id);

            if (index === -1) {
                return state;
            }

            const queueItems = state.queueItems.slice();

            queueItems.splice(index, 1);

            return {
                ...state,
                queueItems
            };
        }

        default: return state;
    }
}
