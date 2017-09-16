import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from "../../movies/movie.model";


@Pipe({
    name: 'movieFilter'
})

export class MovieFilterPipe implements PipeTransform {
    public transform(movies: Movie[], key: string, searchTerm: string) : Movie[] {
        if(searchTerm === ''){
            return movies;
        }

        return movies.filter(movie => movie[key].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}