import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from '../services/token-storage.service';

export class TokenInterceptor implements HttpInterceptor {

    public constructor(private tokenStorageService: TokenStorageService) {}

    public intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has('Authorization')) {
            return httpHandler.handle(request);
        }

        const nextRequest = request.clone({
            setHeaders: {
                'Authorization' : 'Bearer ' + this.tokenStorageService.restoreToken().access_token
            }
        });

        return httpHandler.handle(nextRequest);
    }
}
