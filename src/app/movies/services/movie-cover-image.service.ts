import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieCoverImageService {
    private mainUrl: string = environment.mainApiUrl + 'movies/';
    private adminUrl: string = environment.adminApiUrl + 'movies/';

    public constructor(private http: HttpClient) {}

    public create(formData: any, movieId: string) {
        return this.http.post(this.adminUrl + movieId + '/moviecoverimages', formData)
            .catch(this.handleError);
    }

    private handleError(requestError: any) {
        console.error(requestError);
        return Observable.throw(requestError);
    }
}
