import { Injectable } from '@angular/core';
import { IdentityToken } from '@etdb/core/models';

const KEY = 'ETDB_TOKEN';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        window.localStorage.setItem(KEY, JSON.stringify(token));
    }

    public getToken(): IdentityToken {
        return this.getTokenFromStorage();
    }

    public clearToken(): void {
        window.localStorage.removeItem(KEY);
    }

    public canRestore(): boolean {
        const token = this.getTokenFromStorage();
        return token !== undefined;
    }

    private getTokenFromStorage(): IdentityToken {
        const token: IdentityToken = JSON.parse(window.localStorage.getItem(KEY));

        if (!token) {
            return undefined;
        }

        token.expiresAt = new Date(token.expiresAt);

        return token;
    }
}
