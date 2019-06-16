import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IdentityToken,
    IdentityUser,
    RegisterUser,
    UserSignIn,
    AuthenticationProvider
} from '@etdb/core/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BASE_HEADERS } from '@etdb/core/core.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public constructor(private http: HttpClient) { }

    public authenticateWithProvider(
        provider: AuthenticationProvider,
        token: string
    ): Observable<IdentityToken> {
        return this.http.post<IdentityToken>(`${environment.apiUrls.userService}auth/external-authentication`, {
            token: token,
            provider: provider,
            clientId: environment.etdbClientId
        }, { headers: BASE_HEADERS });
    }

    public authenticateWithCredentials(
        signIn: UserSignIn
    ): Observable<IdentityToken> {
        return this.http.post<IdentityToken>(
            `${environment.apiUrls.userService}auth/authentication`,
            {
                username: signIn.userName,
                password: signIn.password,
                clientId: environment.etdbClientId
            },
            {
                headers: BASE_HEADERS
            }
        );
    }

    public signInWithRefreshToken(
        token: IdentityToken
    ): Observable<IdentityToken> {
        let url = `${environment.apiUrls.userService}auth/refresh-authentication/`;
        url += `${token.refreshToken}/${environment.etdbClientId}/${token.authenticationProvider}`;
        return this.http.get<IdentityToken>(url);
    }

    public loadIdentityUser(accessToken: string): Observable<IdentityUser> {
        const headers = BASE_HEADERS;

        return this.http.get<IdentityUser>(
            `${environment.apiUrls.userService}auth/user-identity/${accessToken}`,
            {
                headers: headers
            }
        );
    }

    public register(registerUser: RegisterUser): Observable<any> {
        const headers = BASE_HEADERS;
        return this.http.post(
            `${environment.apiUrls.userService}auth/registration`,
            registerUser,
            {
                headers: headers
            }
        );
    }
}
