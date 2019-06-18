import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as fromRoot from '@etdb/+state';
import { Store } from '@ngrx/store';
import { AuthActions } from '@etdb/core/+state/actions';
import { TokenStorageService } from '@etdb/core/services';
import { BehaviorSubject, combineLatest, Subscription, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { IdentityUser, RegisterUser, UserCredentials, AuthenticationProvider } from '@etdb/core/models';

@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
    private authIniSubscription: Subscription;
    private googleInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private facebookInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public signingIn$: Observable<boolean>;
    public authenticatedUser$: Observable<IdentityUser>;
    public registering$: Observable<boolean>;
    public authLoading$: Observable<boolean>;


    public constructor(private store: Store<fromRoot.AppState>,
        private tokenStorageService: TokenStorageService, private ngZone: NgZone) {
        this.signingIn$ = this.store.select(fromRoot.getAuthSigningIn);
        this.authenticatedUser$ = this.store.select(fromRoot.getAuthIdentityUser);
        this.registering$ = this.store.select(fromRoot.getAuthRegistering);
        this.authLoading$ = this.store.select(fromRoot.getAuthLoading);
    }

    public ngOnDestroy(): void {
        this.authIniSubscription.unsubscribe();
    }

    public signIn(userSignIn: UserCredentials): void {
        this.store.dispatch(new AuthActions.CredentialSignIn(userSignIn));
    }

    public googleSignIn(user: gapi.auth2.GoogleUser): void {
        this.store.dispatch(new AuthActions.ProviderSignIn(AuthenticationProvider.Google, user.getAuthResponse().access_token));
    }

    public facebookSignIn(token: string): void {
        this.store.dispatch(new AuthActions.ProviderSignIn(AuthenticationProvider.Facebook, token));
    }

    public signOut(): void {
        this.store.dispatch(new AuthActions.SignOut());
    }

    public registerUser(registerUser: RegisterUser) {
        this.store.dispatch(new AuthActions.Register(registerUser));
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
