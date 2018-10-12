import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@etdb/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserPasswordChange, UserProfileInfoChange } from '@etdb/users/models';
import { BASE_HEADERS } from '@etdb/core/core.constants';

@Injectable()
export class UserService {
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

    public updatePassword(
        id: string,
        passwordChange: UserPasswordChange
    ): Observable<any> {
        return this.http.patch(`${this.url}${id}/password`, passwordChange, {
            headers: BASE_HEADERS
        });
    }

    public updateProfileInfo(
        id: string,
        profileChange: UserProfileInfoChange
    ): Observable<any> {
        return this.http.patch(`${this.url}${id}/profileinfo`, profileChange, {
            headers: BASE_HEADERS
        });
    }
}