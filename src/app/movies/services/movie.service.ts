import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APiService } from '../../abstractions/api.service';
import { Movie } from '../movie.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MovieService extends APiService {
    private headers: HttpHeaders = this.baseHeaders;
    private mainUrl: string = environment.webserviceMainUrl + 'movies/';
    private adminUrl: string = environment.webserviceAdminUrl + 'movies/';

    public constructor(private http: HttpClient) {
        super();
    }

    public get(): Observable<Movie[]> {
        return this.http.get(this.mainUrl)
            .map(res => <Movie[]>res);
    }

    public getSingle(id: string): Observable<Movie> {
        return this.http.get(this.mainUrl + id)
        .map(res => <Movie>res);
    }

    public search(searchTerm: string): Observable<Movie[]> {
        return this.http.get(this.mainUrl + 'search/' + searchTerm)
            .map(res => <Movie[]>res);
    }

    public post(movie: Movie): Observable<Movie> {
        return this.http.post(this.adminUrl, JSON.stringify(movie), {
            headers: this.headers
        })
        .map(res => <Movie>res)
        .catch(this.handleError);
    }

    public put(movie: Movie): Observable<Movie> {
        return this.http.put(this.adminUrl + movie.id, JSON.stringify(movie), {
            headers: this.headers
        })
        .map(res => <Movie>res)
        .catch(this.handleError);
    }

    private handleError(requestError: any) {
        console.error(requestError);
        return Observable.throw(requestError);
    }
}
