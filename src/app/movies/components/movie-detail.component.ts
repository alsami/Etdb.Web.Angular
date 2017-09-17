import { MovieCoverImageService } from '../services/movie-cover-image.service';
import { Observable } from 'rxjs/Rx';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'etdb-movie-detail',
    templateUrl: 'movie-detail.component.html'
})

export class MovieDetailComponent implements OnInit {
    movie: Movie
    private movieId: string;
    @ViewChild('fileInput') fileInput;

    public constructor(private route: ActivatedRoute,
        private movieService: MovieService, 
        private movieCoverImageService: MovieCoverImageService){

    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.movieId = params['id'];
            this.loadMovie();
        })
    }

    private loadMovie(){
        this.movieService.getSingle(this.movieId)
            .subscribe(movie => this.movie = movie);
    }

    private uploadCoverFile(){
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
          const formData = new FormData();
          formData.append("file", fileBrowser.files[0]);
          this.movieCoverImageService.create(formData, this.movie.id).subscribe(res => {
              console.log(res)
          }, 
          () => {}, 
          () => {
            this.loadMovie();
          });
        }
    }
}