import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '@app/abstractions/api.service';
import { IdentityToken, UserLogin, IdentityUser, RegisterUser } from '@app/core/models';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService extends ApiService {
    public constructor(private http: HttpClient) {
        super();
    }

    public loginViaCredentials(login: UserLogin): Observable<IdentityToken> {
        const formData = new FormData();

        const headers = new HttpHeaders()
            .set('Authorization', 'Basic d2ViLmNsaWVudDpnaXg4ZXhrbmY5c3h2bmh2dmtyZ3R6bTVlYjdvNHU3bWtwbW5xODZtbzkwd2plNDlxdQ==')
            .set('Accept', 'application/json')
            .set('cache-control', 'no-cache');

        formData.append('grant_type', 'password');
        formData.append('username', login.userName);
        formData.append('password', login.password);
        formData.append('scope', 'UserService WebService openid offline_access');

        return this.http.post(environment.userserviceAuthUrl, formData, {
            headers: headers
        }).pipe(
            map((res: IdentityToken) => res)
        );
    }

    public loginViaRefreshtoken(token: IdentityToken): Observable<IdentityToken> {
        const formData = new FormData();

        const headers = new HttpHeaders()
            .set('Authorization', 'Basic d2ViLmNsaWVudDpnaXg4ZXhrbmY5c3h2bmh2dmtyZ3R6bTVlYjdvNHU3bWtwbW5xODZtbzkwd2plNDlxdQ==')
            .set('Accept', 'application/json')
            .set('cache-control', 'no-cache');

        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', token.refresh_token);

        return this.http.post(environment.userserviceAuthUrl, formData, {
            headers: headers
        }).pipe(
            map((res: IdentityToken) => res)
        );
    }

    public loadIdentityUser(): Observable<IdentityUser> {
        const headers = this.baseHeaders;

        return this.http.get(environment.userserviceAuthProfileUrl, {
            headers: headers
        }).pipe(
            map((res: IdentityUser) => res)
        );
    }

    public register(registerUser: RegisterUser): Observable<any> {
        const headers = this.baseHeaders;
        return this.http.post(environment.userserviceUrl + 'users/registration',
            JSON.stringify(registerUser), {
                headers: headers
            });
    }
}
