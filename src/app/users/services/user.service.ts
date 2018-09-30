import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@etdb/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService  {
    private url = `${environment.userserviceUrl}users/`;

    public constructor(private http: HttpClient) {}

    public getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.url}${id}`);
    }

    public uploadProfileImage(id: string, file: File): Observable<User> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.patch<User>(`${this.url}${id}/profileimage`, formData);
    }
}
