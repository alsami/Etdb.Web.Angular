import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationLog } from '@etdb/models';
import { BASE_HEADERS } from '@etdb/core/core.constants';

@Injectable()
export class AuthenticationLogService {

    public constructor(private http: HttpClient) { }

    public loadLogs(url: string): Observable<AuthenticationLog[]> {
        return this.http.get<AuthenticationLog[]>(url, {
            headers: BASE_HEADERS
        });
    }
}
