import {
    HttpHeaders
} from '@angular/common/http';

export const BASE_HEADERS: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('charset', 'utf-8');

export const PRIMARY_THEME = 'primary-theme';

export const DARK_THEME = 'dark-theme';

export const VALID_THEMES = [
    PRIMARY_THEME,
    DARK_THEME
];

export const VALID_THEMES_DESC = [{
    theme: PRIMARY_THEME,
    name: 'Light Theme'
}, {
    theme: DARK_THEME,
    name: 'Dark Theme'
}];
