import {
    HttpHeaders
} from '@angular/common/http';
import { IdentityToken } from '../core/models/identity-token.model';

export abstract class ApiService {
    protected baseHeaders: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('charset', 'utf-8');

    protected setAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem('token'));
        return headers.set('Authorization', 'Bearer ' + token.access_token);
    }
}
