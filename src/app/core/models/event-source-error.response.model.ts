import { EventSourceResponse } from '@etdb/core/models/event-source.response.model';

export interface EventSourceErrorResponse extends EventSourceResponse {
    errors: string[];
}
