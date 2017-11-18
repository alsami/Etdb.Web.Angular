import {
    HttpHeaders
} from '@angular/common/http';

export abstract class APiService {
    protected baseHeaders: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('charset', 'utf-8');

    protected setAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        return headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    }
}
