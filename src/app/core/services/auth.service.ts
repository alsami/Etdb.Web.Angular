import { ClientConfig } from '../models/client-config.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    public constructor(private http: HttpClient) {}

    public getToken(config: ClientConfig): Observable<any> {
        const formData = new FormData();

        const headers = new HttpHeaders()
            .set('Authorization', 'Basic ' + Base64.encode(config.name + ':' + config.secret))
            .set('Accept', 'application/json')
            .set('cache-control', 'no-cache');

        formData.append('grant_type', 'password');
        formData.append('username', 'admin');
        formData.append('password', 'admin');
        formData.append('scope', 'UserService WebService openid offline_access');

        return this.http.post(environment.userserviceAuthUrl, formData, {
            headers: headers
        });
    }
}
