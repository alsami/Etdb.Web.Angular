import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../movie.model';
import * as fromMovies from '../reducers';
import * as movieCollectionActions from '../actions/movie-collection.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'etdb-movie',
    template: `<etdb-movie-list
            [movies]="movies$ | async"
            [loading]="loading$ | async"
            [searching]="searching$ | async">
        </etdb-movie-list>`,
})

export class MovieComponent implements OnInit {
    movies$: Observable<Movie[]>;
    searchMovies$: Observable<Movie[]>;
    loading$: Observable<boolean>;
    searching$: Observable<boolean>;

    public constructor(private store: Store<fromMovies.State>) {
        this.movies$ = this.store.select(fromMovies.getMovieCollection);
        this.searchMovies$ = this.store.select(fromMovies.getSearchResults);
        this.loading$ = this.store.select(fromMovies.getCollectionLoading);
        this.searching$ = this.store.select(fromMovies.getSearchLoading);
     }

    public ngOnInit(): void {
        this.store.dispatch(new movieCollectionActions.LoadAction());
    }


}
