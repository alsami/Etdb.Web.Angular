import { Router } from '@angular/router';
import { Movie } from '../movie.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'etdb-movie-card',
    templateUrl: 'movie-card.component.html'
})

export class MovieCardComponent {
    @Input() movie: Movie;
    @Output() requestEdit: EventEmitter<any> = new EventEmitter();
}