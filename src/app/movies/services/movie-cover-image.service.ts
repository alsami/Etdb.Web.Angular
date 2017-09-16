import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieCoverImageService {
    private mainUrl: string = environment.mainApiUrl + 'movies/';
    private adminUrl: string = environment.adminApiUrl + 'movies/';

    public constructor(private http: Http){}

    public create(formData: any, movieId: string){
        return this.http.post(this.adminUrl + movieId + '/moviecoverimages', formData)
            .catch(this.handleError);
    }

    private handleError(requestError: any) {
        console.log(requestError);
        return Observable.throw(requestError);
    }
}