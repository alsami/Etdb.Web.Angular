import { Injectable } from '@angular/core';
import { VALID_THEMES, PRIMARY_THEME } from '@app/core/core.constants';

@Injectable()
export class LayoutStorageService {
    public storeTheme(theme: string): void  {
        window.localStorage.setItem('theme', theme);
    }

    public getTheme(): string {
        const theme: string = window.localStorage.getItem('theme');
        if (VALID_THEMES.filter(validTheme => validTheme === theme).length === 1) {
            return theme;
        }
        return PRIMARY_THEME;
    }

    public canRestoreTheme(): boolean {
        const theme: string = window.localStorage.getItem('theme');
        return theme && theme !== '';
    }
}
