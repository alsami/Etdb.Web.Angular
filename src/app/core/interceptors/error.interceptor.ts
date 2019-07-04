import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorExtractorService } from '@etdb/core/services';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    public constructor(private errorExtractorService: ErrorExtractorService, private snackbar: MatSnackBar) {
    }
    public intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        const nextRequest = request.clone();
        return httpHandler.handle(nextRequest).pipe(tap(null, (error: HttpErrorResponse) => {
            const humanreadable = this.errorExtractorService.extractHumanreadableError(error);
            this.snackbar.open(humanreadable.message, undefined, {
                duration: 5000
            });
        }));
    }
}
