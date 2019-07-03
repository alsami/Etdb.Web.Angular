import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, ProfileImageMetaInfo } from '@etdb/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserPasswordChange, UserProfileInfoChange, UserNameChange } from '@etdb/users/models';
import { BASE_HEADERS } from '@etdb/core/core.constants';
import { map } from 'rxjs/operators';
import { uploadProgressReporter } from '@etdb/functions';

@Injectable()
export class UserService {
    private url = `${environment.apiUrls.userService}users/`;

    public constructor(private http: HttpClient) { }

    public getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.url}${id}`);
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

    public removeProfileImage(url: string): Observable<any> {
        return this.http.delete(url);
    }

    public uploadProfileImage(userId: string, file: File): Observable<ProfileImageMetaInfo | number> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<any>(
            `${this.url}${userId}/profileimages`,
            formData, {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(
            map(uploadProgressReporter)
        );
    }

    public uploadProfileImages(userId: string, files: File[]): Observable<ProfileImageMetaInfo[] | number> {
        const formData = new FormData();

        files.forEach(file => formData.append('files', file));

        return this.http.post<any[]>(
            `${this.url}${userId}/profileimages/multiple`,
            formData, {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(
            map(uploadProgressReporter)
        );
    }

    public markPrimaryProfileImage(id: string, userId: string): Observable<any> {
        return this.http.patch(`${this.url}${userId}/profileimages/${id}`, null);
    }

    public changeUserName(userNameChange: UserNameChange): Observable<any> {
        return this.http.patch(`${this.url}${userNameChange.id}/username/${encodeURIComponent(userNameChange.userName)}`, null);
    }
}
