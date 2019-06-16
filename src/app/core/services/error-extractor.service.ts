import { Injectable } from '@angular/core';
import { HumanreadableError } from '@etdb/core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
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
        if (error.status === 0) {
            return {
                message: 'Service currently unavailable'
            };
        }

        if (error.status === 401) {
            return {
                message: 'Not authorized'
            };
        }

        const hasDefaultError = error.error.message !== undefined;
        const hasIdentityErrorWithDescription =
            error.error.error_description !== undefined;
        const hasIdentityError = error.error.error_message !== undefined;

        return {
            message: hasDefaultError
                ? error.error.message
                : hasIdentityErrorWithDescription
                    ? error.error.error_description
                    : hasIdentityError
                        ? error.error.error_message
                        : 'Unknown error',
            errors: error.error.errors ? error.error.errors : []
        };
    }
}
