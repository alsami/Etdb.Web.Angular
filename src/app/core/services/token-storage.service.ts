import { Injectable } from '@angular/core';
import { IdentityToken } from '@etdb/core/models';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        window.localStorage.setItem('token', JSON.stringify(token));
    }

    public getToken(): IdentityToken {
        return this.getTokenFromStorage();
    }

    public clearToken(): void {
        window.localStorage.removeItem('token');
    }

    public canRestore(): boolean {
        const token = this.getTokenFromStorage();
        return token !== undefined;
    }

    public isExpired(): boolean {
        const token = this.getTokenFromStorage();
        return token.expiresAt < new Date();
    }

    private getTokenFromStorage(): IdentityToken {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem('token'));

        if (!token) {
            return undefined;
        }

        return token;
    }
}
