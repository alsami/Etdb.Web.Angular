import { Component, OnInit, Inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../movie.model';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'etdb-movie-form',
    templateUrl: 'movie-form.component.html'
})

export class MovieFormComponent {
    private movie: Movie;
    title: string;
    form: FormGroup;
    loading: boolean = false;
    
    public constructor(private formBuilder: FormBuilder,
        private movieService: MovieService,
        private dialogRef: MdDialogRef<MovieFormComponent>,
        @Inject(MD_DIALOG_DATA) data: any) {
            this.movie = data.movie;
            this.init();
    }

    private init(): void {
        this.movie ? this.title = 'Edit movie' : this.title = 'Create movie';
        this.buildForm();
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            title: [this.movie ? this.movie.title : '', 
                Validators.required
            ],
            description: [
                this.movie ? this.movie.description : '', 
                Validators.required
            ],
            releasedOn: [
                this.movie && this.movie.releasedOn ? new Date(this.movie.releasedOn) : new Date()
            ],
        });
    }

    private isFormValid(): boolean {
        return this.form.valid;
    }

    private submit(): void {
        this.loading = true;
        const formData = this.form.value;
        if(!this.movie){
            this.movie = {
                title: formData.title,
                description: formData.description,
                releasedOn: formData.releasedOn
            }
            this.movieService.post(this.movie).subscribe(value => {
                this.movie = value
                console.log(this.movie);
                console.log(this.movie.releasedOn instanceof Date);
                console.log(new Date(this.movie.releasedOn));
                this.init();
            }, error => console.log(error), () => {
                this.init();
                this.loading = false;
                this.dialogRef.close();
            });
        } else {
            Object.assign(this.movie, formData)
            this.movieService.put(this.movie).subscribe(value => {
                this.movie = value
            }, error => console.log(error), () => {
                this.init();
                this.loading = false;
                this.dialogRef.close();
            });
        }
    }
}