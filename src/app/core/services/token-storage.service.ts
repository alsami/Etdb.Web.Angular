import { Injectable } from '@angular/core';
import { IdentityToken } from '@etdb/core/models';

@Injectable()
export class TokenStorageService {
    public storeToken(token: IdentityToken): void {
        const storeToken: IdentityToken = token;
        this.setExpiresInTime(storeToken);
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
        return token !== undefined;
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

        if (!token) {
            return undefined;
        }

        token.expires_at = new Date(token.expires_in);
        return token;
    }
}
