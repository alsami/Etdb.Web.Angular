import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../abstractions/api.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '@etdb/movies/models/movie.model';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService extends ApiService {
    private headers: HttpHeaders = this.baseHeaders;
    private mainUrl: string = environment.webserviceMainUrl + 'movies/';
    private adminUrl: string = environment.webserviceAdminUrl + 'movies/';

    public constructor(private http: HttpClient) {
        super();
    }

    public get(): Observable<Movie[]> {
        return this.http.get(this.mainUrl)
            .pipe(map(res => <Movie[]>res));
    }

    public getSingle(id: string): Observable<Movie> {
        return this.http.get(this.mainUrl + id)
            .pipe(map(res => <Movie>res));
    }

    public search(searchTerm: string): Observable<Movie[]> {
        return this.http.get(this.mainUrl + 'search/' + searchTerm)
            .pipe(map(res => <Movie[]>res));
    }

    public post(movie: Movie): Observable<Movie> {
        return this.http.post(this.adminUrl, JSON.stringify(movie), {
            headers: this.headers
        })
        .pipe(map(res => <Movie>res));
    }

    public put(movie: Movie): Observable<Movie> {
        return this.http.put(this.adminUrl + movie.id, JSON.stringify(movie), {
            headers: this.headers
        })
        .pipe(map(res => <Movie>res));
    }
}
