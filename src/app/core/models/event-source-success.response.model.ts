import { EventSourceResponse } from '@app/core/models/event-source.response.model';

export interface EventSourceSuccessResponse extends EventSourceResponse {
    data: any;
}
