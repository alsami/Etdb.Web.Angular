import { IdentityToken } from '../models/identity-token.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        window.localStorage.setItem('token', JSON.stringify(token));
        // window.localStorage.setItem('access_token', token.access_token);
        // window.localStorage.setItem('refresh_token', token.refresh_token);
        // window.localStorage.setItem('expires_in', token.expires_in.toString());
        // window.localStorage.setItem('token_type', token.token_type);
    }

    public restoreToken(): IdentityToken {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem('token'));
        return token;
    }

    public clearToken(): void {
        window.localStorage.removeItem('token');
    }

    public canRestore() {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem('token'));
        return token !== undefined && token !== null;
    }
}
