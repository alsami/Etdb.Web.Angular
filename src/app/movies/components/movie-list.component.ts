import { MovieCoverImageService } from '../services/movie-cover-image.service';
import { Overlay, OverlayRef, OverlayState } from '@angular/cdk/overlay';
import { Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { Movie } from '../movie.model';
import * as fromMovies from '../reducers';
import { MovieFormComponent } from './movie-form.component';

@Component({
    selector: 'etdb-movie-list',
    templateUrl: 'movie-list.component.html',
    styleUrls: [
        'movie-list.component.scss'
    ]
})

export class MovieListComponent implements OnInit {
    private overlayRef: OverlayRef;

    @Input() movies: Movie[] = [];
    @Input() loading: boolean = false;
    @Input() searching: boolean = false;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;
    @ViewChild('fileInput') fileInput;

    searchTerm: string = '';
    searchControl: FormControl;
    
    public constructor(private store: Store<fromMovies.State>, 
        private dialog: MdDialog,  private overlay: Overlay, 
        private movieCoverImageService: MovieCoverImageService) { 

        }

    public ngOnInit() {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges
            .distinctUntilChanged()
            .debounceTime(1000)
            .subscribe(searchTerm => {
                this.searchTerm = searchTerm;
            });
        this.initializeOverlay();
     }

    private openDialog(movie: Movie){
        const dialogref = this.dialog.open(MovieFormComponent, {
            width: '50%',
            data: {
                movie
            }
        });
        dialogref.afterClosed().subscribe(value => console.log(value))
    }

    private initializeOverlay(): void {
        console.log(this.templatePortal);
        
        let config = new OverlayState();
            config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally();
            // config.hasBackdrop = true;
            // config.backdropClass = 'cdk-overlay-transparent-backdrop';

            this.overlayRef = this.overlay.create(config);
            this.overlayRef.attach(this.templatePortal);
            //this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    private uploadCoverFile(){
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
          const formData = new FormData();
          formData.append("file", fileBrowser.files[0]);
          this.movieCoverImageService.create(formData, this.movies[0].id).subscribe(res => {
              console.log(res)
          });
        }
    }
}