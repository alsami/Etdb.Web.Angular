import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'etdb-movie-detail',
    templateUrl: 'movie-detail.component.html'
})

export class MovieDetailComponent implements OnInit {
    movie: Movie;
    private movieId: string;

    public constructor(private route: ActivatedRoute,
        private movieService: MovieService) {}

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.movieId = params['id'];
            this.loadMovie();
        });
    }

    private loadMovie() {
        this.movieService.getSingle(this.movieId)
            .subscribe(movie => this.movie = movie);
    }
}
