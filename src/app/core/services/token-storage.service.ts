import { IdentityToken } from '../models/identity-token.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        const storeToken: IdentityToken = token;
        this.setExpiresInTime(storeToken);
        console.log('before token store', storeToken);
        window.localStorage.setItem('token', JSON.stringify(storeToken));
    }

    public restoreToken(): IdentityToken {
        return this.getTokenFromStorage();
    }

    public clearToken(): void {
        window.localStorage.removeItem('token');
    }

    public canRestore(): boolean {
        const token = this.getTokenFromStorage();
        return token !== undefined && token !== null;
    }

    public isExpired(): boolean {
        const token = this.getTokenFromStorage();
        return token.expires_at < new Date();
    }

    private setExpiresInTime(token: IdentityToken): void {
        const date = new Date();
        date.setMinutes(date.getMinutes(), token.expires_in);
        token.expires_in = date.getTime();
    }

    private getTokenFromStorage(): IdentityToken {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem('token'));
        token.expires_at = new Date(token.expires_in);
        return token;
    }
}
