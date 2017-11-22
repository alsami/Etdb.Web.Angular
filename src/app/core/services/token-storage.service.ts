import { IdentityToken } from '../models/identity-token.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        window.localStorage.setItem('access_token', token.access_token);
        window.localStorage.setItem('refresh_token', token.refresh_token);
        window.localStorage.setItem('expires_in', token.expires_in.toString());
        window.localStorage.setItem('token_type', token.token_type);
    }

    public restoreToken(): IdentityToken {
        return {
            access_token: window.localStorage.getItem('access_token'),
            refresh_token: window.localStorage.getItem('refresh_token'),
            expires_in: Number.parseInt(window.localStorage.getItem('expires_in')),
            token_type: window.localStorage.getItem('token_type')
        };
    }

    public clearToken(): void {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('refresh_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('token_type');
    }

    public canRestore() {
        const refreshToken = window.localStorage.getItem('refresh_token');
        return refreshToken !== '' && refreshToken !== undefined && refreshToken !== null;
    }
}
