import { Injectable } from '@angular/core';
import { HumanreadableError } from '@etdb/core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorExtractorService {
    public extractHumanreadableError(error: Error): HumanreadableError {
        if (error instanceof HttpErrorResponse) {
            return this.extractFromHttpErrorResponse(error);
        }

        return {
            message: error.message
        };
    }

    private extractFromHttpErrorResponse(
        error: HttpErrorResponse
    ): HumanreadableError {
        return {
            message: error.error.message,
            errors: error.error.errors ? error.error.errors : []
        };
    }
}
