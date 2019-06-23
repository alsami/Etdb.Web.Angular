import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_HEADERS } from '@etdb/core/core.constants';
import { environment } from 'environments/environment';

@Injectable()
export class UserSearchService {
    private url = `${environment.apiUrls.userService}users/`;

    public constructor(private http: HttpClient) { }

    public checkUserNameAvailability(userName: string): Observable<{ available: boolean }> {
        return this.http.get<{ available: boolean }>(`${this.url}availability/${encodeURIComponent(userName)}`, {
            headers: BASE_HEADERS
        });
    }
}
