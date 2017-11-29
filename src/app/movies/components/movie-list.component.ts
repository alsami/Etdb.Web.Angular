import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { Movie } from '../movie.model';
import * as fromMovies from '../reducers';
import { MovieFormComponent } from './movie-form.component';
import * as movieCollectionActions from '../actions/movie-collection.actions';
import * as titleActions from '../../core/actions/title.actions';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'etdb-movie-list',
    templateUrl: 'movie-list.component.html',
    styleUrls: [
        'movie-list.component.scss'
    ]
})

export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {
    private overlayRef: OverlayRef;

    @Input() movies: Movie[] = [];
    @Input() loading = false;
    @Input() searching = false;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;
    @ViewChild('fileInput') fileInput;

    searchTerm = '';
    searchControl: FormControl;

    public constructor(private store: Store<fromMovies.State>,
        private dialog: MatDialog,  private overlay: Overlay) {
            this.store.dispatch(new titleActions.SetTitleAction('Movies'));
        }

    public ngOnInit(): void {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges
            .distinctUntilChanged()
            .debounceTime(1000)
            .subscribe(searchTerm => {
                this.searchTerm = searchTerm;
            });
    }

    public ngAfterViewInit(): void {
        this.initializeOverlay();
    }

    public ngOnDestroy(): void {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.overlayRef.detachBackdrop();
            this.overlayRef.dispose();
        }
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
            // config.backdropClass = 'cdk-overlay-dark-backdrop';

            this.overlayRef = this.overlay.create(config);
            this.overlayRef.attach(this.templatePortal);
            // this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }
}
