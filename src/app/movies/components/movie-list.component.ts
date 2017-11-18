import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { Movie } from '../movie.model';
import * as fromMovies from '../reducers';
import { MovieFormComponent } from './movie-form.component';
import * as movieCollectionActions from '../actions/movie-collection.actions';

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
    @Input() loading = false;
    @Input() searching = false;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;
    @ViewChild('fileInput') fileInput;

    searchTerm = '';
    searchControl: FormControl;

    public constructor(private store: Store<fromMovies.State>,
        private dialog: MatDialog,  private overlay: Overlay) {}

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

    public openDialog(movie: Movie) {
        const dialogref = this.dialog.open(MovieFormComponent, {
            width: '50%',
            data: {
                movie
            }
        });

        dialogref.afterClosed().subscribe(() => {
            this.store.dispatch(new movieCollectionActions.LoadAction());
        });
    }

    private initializeOverlay(): void {
        const config = new OverlayConfig();
            config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally();
            // config.hasBackdrop = true;
            // config.backdropClass = 'cdk-overlay-transparent-backdrop';

            this.overlayRef = this.overlay.create(config);
            this.overlayRef.attach(this.templatePortal);
            // this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }
}
