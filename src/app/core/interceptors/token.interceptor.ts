import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '@etdb/core/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    public constructor(private tokenStorageService: TokenStorageService) {}

    public intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has('Authorization')) {
            return httpHandler.handle(request);
        }

        if (request.url.indexOf('registration') > -1) {
            return httpHandler.handle(request);
        }

        if (!this.tokenStorageService.canRestore()) {
            return httpHandler.handle(request);
        }

        const token = this.tokenStorageService.restoreToken();

        const nextRequest = request.clone({
            setHeaders: {
                'Authorization' : 'Bearer ' + token.access_token
            }
        });

        return httpHandler.handle(nextRequest);
    }
}
