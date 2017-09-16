import { Observable } from 'rxjs/Rx';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'etdb-movie-detail',
    templateUrl: 'movie-detail.component.html'
})

export class MovieDetailComponent implements OnInit {
    movie$: Observable<Movie>
    private movieId: string;

    public constructor(private route: ActivatedRoute,
        private movieService: MovieService){

    }

    public ngOnInit(): void {
        console.log('init');
        this.route.params.subscribe(params => {
            this.movie$ = this.movieService.getSingle(params['id']);
        })
    }
}