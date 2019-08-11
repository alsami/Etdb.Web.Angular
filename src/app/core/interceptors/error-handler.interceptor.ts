import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenStorageService, ErrorExtractorService } from '@etdb/core/services';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthFacadeService } from '@etdb/core/+state/facades';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class ErrorRetryHandlerInterceptor implements HttpInterceptor {

    public constructor(private tokenStorageService: TokenStorageService, private authFacadeService: AuthFacadeService,
        private errorExtractorService: ErrorExtractorService, private snackbar: MatSnackBar, private router: Router) { }


    public intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        const nextRequest = request.clone();
        return httpHandler.handle(nextRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 401) {
                    this.showError(error);
                    return new Observable<HttpEvent<any>>();
                    return this.complete(httpHandler, request);
                }

                if (!this.tokenStorageService.canRestore()) {
                    this.whenEverythingHasFailed(error);
                    return new Observable<HttpEvent<any>>();
                    return this.complete(httpHandler, request);
                }

                if (nextRequest.url.indexOf('/auth/') > -1) {
                    this.whenEverythingHasFailed(error);
                    return new Observable<HttpEvent<any>>();
                    return this.complete(httpHandler, request);
                }

                this.authFacadeService.restoreSignin(false);

                return this.authFacadeService.awaitAuthenticated().pipe(switchMap(authenticated => {
                    if (!authenticated) {
                        this.whenEverythingHasFailed(error);
                        return httpHandler.handle(nextRequest.clone());
                    }
                    const repeatedRequest = nextRequest.clone({
                        setHeaders: {
                            'Authorization': 'Bearer ' + this.tokenStorageService.getToken().accessToken
                        }
                    });
                    return httpHandler.handle(repeatedRequest);
                }));
            })
        );
    }

    private complete(httpHandler: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return httpHandler.handle(request);
    }

    private showError(error: HttpErrorResponse): void {
        const humanreadable = this.errorExtractorService.extractHumanreadableError(error);
        this.snackbar.open(humanreadable.message, undefined, {
            duration: 5000
        });
    }

    private whenEverythingHasFailed(error: HttpErrorResponse): void {
        this.showError(error);
        this.router.navigate(['/signin']);
    }

    // ,
    // tap((response: HttpResponse<any>) => {
    //     if (!(response instanceof HttpErrorResponse)) {
    //         return;
    //     }

    //     const error = response as HttpErrorResponse;

    //     if (error.status !== 401) {
    //         this.showError(error);
    //         return;
    //     }

    //     if (!this.tokenStorageService.canRestore()) {
    //         this.whenEverythingHasFailed(error);
    //         return;
    //     }

    //     if (nextRequest.url.indexOf('/auth/') > -1) {
    //         this.whenEverythingHasFailed(error);
    //         return;
    //     }

    //     this.authFacadeService.restoreSignin(false);

    //     this.authFacadeService.awaitAuthenticated().pipe(switchMap(authenticated => {
    //         if (!authenticated) {
    //             this.whenEverythingHasFailed(error);
    //             return httpHandler.handle(nextRequest.clone());
    //         }
    //         const repeatedRequest = nextRequest.clone({
    //             setHeaders: {
    //                 'Authorization': 'Bearer ' + this.tokenStorageService.getToken().accessToken
    //             }
    //         });

    //         return httpHandler.handle(repeatedRequest);
    //     }));
    // })
}


