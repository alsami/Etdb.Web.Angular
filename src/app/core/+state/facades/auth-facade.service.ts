import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as fromRoot from '@etdb/+state';
import { Store } from '@ngrx/store';
import { AuthActions } from '@etdb/core/+state/actions';
import { TokenStorageService } from '@etdb/core/services';
import { BehaviorSubject, combineLatest, Subscription, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { IdentityUser } from '@etdb/core/models';

@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
    private authIniSubscription: Subscription;
    private googleInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private facebookInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public signingIn$: Observable<boolean>;
    public authenticatedUser$: Observable<IdentityUser>;


    public constructor(private store: Store<fromRoot.AppState>,
        private tokenStorageService: TokenStorageService, private ngZone: NgZone) {
        this.signingIn$ = this.store.select(fromRoot.getAuthSigningIn);
        this.authenticatedUser$ = this.store.select(fromRoot.getAuthIdentityUser);
    }

    public ngOnDestroy(): void {
        this.authIniSubscription.unsubscribe();
    }

    public signOut(): void {
        this.store.dispatch(new AuthActions.SignOut());
    }

    public initialize(): void {
        this.loadGoogleApi();
        this.authIniSubscription = combineLatest(this.googleInitialized$, this.facebookInitialized$)
            .subscribe(([a, b]) => {
                if (!a || !b) {
                    return;
                }

                if (!this.tokenStorageService.canRestore()) {
                    return;
                }

                this.store.dispatch(new AuthActions.RestoreSignIn());
            });
    }

    private loadGoogleApi(): void {
        gapi.load('auth2', async () => {
            gapi.auth2.init({
                client_id: environment.googleClientId,
                scope: 'profile email openid'
            });
            this.ngZone.run(() => this.googleInitialized$.next(true));
        });
    }
}
