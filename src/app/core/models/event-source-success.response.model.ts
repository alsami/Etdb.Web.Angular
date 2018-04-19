import { EventSourceResponse } from '@etdb/core/models/event-source.response.model';

export interface EventSourceSuccessResponse extends EventSourceResponse {
    data: any;
}
