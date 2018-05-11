import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ObservableMedia } from '@angular/flex-layout';
import { IdentityUser } from '@etdb/core/models';

import * as fromRoot from '@etdb/reducers';
import * as layoutActions from '../actions/layout.actions';
import * as authActions from '../actions/auth.actions';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html',
    styleUrls: [
        'layout.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutComponent implements OnInit, OnDestroy {
    showSidenav$: Observable<boolean>;
    title$: Observable<string>;
    user$: Observable<IdentityUser>;
    sidenavMode: string;
    layoutGap: string;

    private mediaObserver: Subscription;

    public constructor(private store: Store<fromRoot.AppState>, private observMedia: ObservableMedia) { }

    public ngOnInit(): void {
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.title$ = this.store.select(fromRoot.getTitle);
        this.user$ = this.store.select(fromRoot.getAuthIdentityUser);

        this.subscribeLayoutSizeChange();
    }

    public ngOnDestroy(): void {
        this.mediaObserver.unsubscribe();
    }

    public changeTheme(theme: string): void {
        this.store.dispatch(new layoutActions.SwitchTheme(theme));
    }

    public logout(): void {
        this.store.dispatch(new authActions.Logout());
    }

    public toggleSidenav(visible: boolean): void {
        visible
            ? this.store.dispatch(new layoutActions.OpenSidenav())
            : this.store.dispatch(new layoutActions.CloseSidenav());
    }

    public toggleSidenavBasesOnSize(): void {
        if (this.observMedia.isActive('xs') || this.observMedia.isActive('sm')) {
            this.store.dispatch(new layoutActions.CloseSidenav());
        }
    }

    private subscribeLayoutSizeChange(): void {
        this.mediaObserver = this.observMedia.subscribe(() => {
            this.determineSidenavMode();
            this.determineLayoutGap();
        });
    }

    private determineSidenavMode(): void {
        if (this.observMedia.isActive('xs') || this.observMedia.isActive('sm')) {
            this.sidenavMode = 'over';
            this.toggleSidenav(false);
        } else {
            this.sidenavMode = 'side';
        }
    }

    private determineLayoutGap(): void {
        if (this.observMedia.isActive('xs')) {
            this.layoutGap = '56';
        } else {
            this.layoutGap = '64';
        }
    }
}
