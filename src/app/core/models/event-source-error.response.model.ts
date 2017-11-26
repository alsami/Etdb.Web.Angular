import { EventSourceResponse } from '@app/core/models/event-source.response.model';

export interface EventSourceErrorResponse extends EventSourceResponse {
    errors: string[];
}
