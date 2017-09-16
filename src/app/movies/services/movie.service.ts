import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APiService } from '../../abstractions/api.service';
import { Movie } from '../movie.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService extends APiService {
    private headers: Headers = this.baseHeaders;
    private mainUrl: string = environment.mainApiUrl + 'movies/';
    private adminUrl: string = environment.adminApiUrl + 'movies/';

    public constructor(private http: Http) { 
        super();
    }

    public get(): Observable<Movie[]> {
        return this.http.get(this.mainUrl)
            .map(res => <Movie[]>res.json());
    }

    public getSingle(id: string): Observable<Movie> {
        return this.http.get(this.mainUrl + id)
            .map(res => <Movie>res.json());
    }

    public search(searchTerm: string) : Observable<Movie[]> {
        return this.http.get(this.mainUrl + 'search/' + searchTerm)
            .map(res => <Movie[]>res.json());
    }
    
    public post(movie: Movie) : Observable<Movie> {
        const requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: this.headers
        });

        return this.http.post(this.adminUrl, JSON.stringify(movie), requestOptions)
            .map(res => <Movie>res.json())
            .catch(this.handleError);
    }

    public put(movie: Movie) : Observable<Movie> {
        const requestOptions = new RequestOptions({
            method: RequestMethod.Put,
            headers: this.headers
        });
        return this.http.put(this.adminUrl + movie.id, JSON.stringify(movie), requestOptions)
            .map(res => <Movie>res.json())
            .catch(this.handleError)
    }

    private handleError(requestError: any) {
        console.log(requestError);
        return Observable.throw(requestError);
    }
}