import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IdentityUser } from '@etdb/core/models';

import * as fromRoot from '@etdb/reducers';
import * as layoutActions from '../actions/layout.actions';
import * as authActions from '../actions/auth.actions';
import { BreakpointService } from '@etdb/core/services';

@Component({
    selector: 'etdb-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
    showSidenav$: Observable<boolean>;
    title$: Observable<string>;
    user$: Observable<IdentityUser>;
    sidenavMode: string;
    layoutGap: string;

    private mediaObserver: Subscription;

    public constructor(
        private store: Store<fromRoot.AppState>,
        private breakpointService: BreakpointService
    ) {}

    public ngOnInit(): void {
        this.subscribeLayoutSizeChange();
    }

    public ngAfterViewInit(): void {
        this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
        this.title$ = this.store.select(fromRoot.getTitle);
        this.user$ = this.store.select(fromRoot.getAuthIdentityUser);
    }

    public ngOnDestroy(): void {
        this.mediaObserver.unsubscribe();
    }

    public changeTheme(theme: string): void {
        this.store.dispatch(new layoutActions.SwitchTheme(theme));
    }

    public logout(): void {
        this.store.dispatch(new authActions.SignOut());
    }

    public toggleSidenav(visible: boolean): void {
        visible
            ? this.store.dispatch(new layoutActions.OpenSidenav())
            : this.store.dispatch(new layoutActions.CloseSidenav());
    }

    public toggleSidenavBasesOnSize(): void {
        if (
            !this.breakpointService.isExtraSmallDevice() &&
            !this.breakpointService.isSmallDevice()
        ) {
            return;
        }

        this.store.dispatch(new layoutActions.CloseSidenav());
    }

    private subscribeLayoutSizeChange(): void {
        this.mediaObserver = this.breakpointService
            .hasBreakpointChanged()
            .subscribe(changed => {
                if (!changed) {
                    return;
                }

                this.determineSidenavMode();
                this.determineLayoutGap();
            });
    }

    private determineSidenavMode(): void {
        if (
            this.breakpointService.isExtraSmallDevice() ||
            this.breakpointService.isSmallDevice()
        ) {
            this.sidenavMode = 'over';
            this.toggleSidenav(false);
            return;
        }

        this.sidenavMode = 'side';
    }

    private determineLayoutGap(): void {
        if (this.breakpointService.isExtraSmallDevice()) {
            this.layoutGap = '56';
            return;
        }

        this.layoutGap = '64';
    }
}
