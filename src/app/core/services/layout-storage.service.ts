import { Injectable } from '@angular/core';
import { VALID_THEMES, PRIMARY_THEME } from '@etdb/core/core.constants';

const KEY = 'ETDB_THEME';

@Injectable({
    providedIn: 'root'
})
export class LayoutStorageService {
    public storeTheme(theme: string): void {
        window.localStorage.setItem(KEY, theme);
    }

    public getTheme(): string {
        const theme: string = window.localStorage.getItem(KEY);

        if (VALID_THEMES.filter(validTheme => validTheme === theme).length === 1) {
            return theme;
        }

        return PRIMARY_THEME;
    }

    public canRestoreTheme(): boolean {
        const theme: string = window.localStorage.getItem(KEY);
        return theme && theme !== '';
    }
}
