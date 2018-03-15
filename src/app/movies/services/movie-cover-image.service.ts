import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class MovieCoverImageService {
    private adminUrl: string = environment.webserviceAdminUrl + 'movies/';

    public constructor(private http: HttpClient) {}

    public create(formData: FormData, movieId: string) {
        return this.http.post(this.adminUrl + movieId + '/moviecoverimages', formData);
    }
}
