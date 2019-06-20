import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as fromRoot from '@etdb/+state';
import { Store, select } from '@ngrx/store';
import { AuthActions } from '@etdb/core/+state/actions';
import { TokenStorageService } from '@etdb/core/services';
import { BehaviorSubject, combineLatest, Subscription, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { IdentityUser, RegisterUser, UserCredentials, AuthenticationProvider } from '@etdb/core/models';
import { take, filter, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
    private authIniSubscription: Subscription;
    private googleInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private facebookInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private initializing$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public signingIn$: Observable<boolean>;
    public authenticatedUser$: Observable<IdentityUser>;
    public registering$: Observable<boolean>;
    public authLoading$: Observable<boolean>;
    public signedIn$: Observable<boolean>;


    public constructor(private store: Store<fromRoot.AppState>,
        private tokenStorageService: TokenStorageService, private ngZone: NgZone) {
        this.signingIn$ = this.store.pipe(select(fromRoot.getAuthSigningIn));
        this.authenticatedUser$ = this.store.pipe(select(fromRoot.getAuthIdentityUser));
        this.registering$ = this.store.pipe(select(fromRoot.getAuthRegistering));
        this.authLoading$ = this.store.pipe(select(fromRoot.getAuthLoading));
        this.signedIn$ = this.store.pipe(select(fromRoot.getAuthSignedIn));
    }

    public ngOnDestroy(): void {
        this.authIniSubscription.unsubscribe();
    }

    public awaitAuthenticated(): Observable<boolean> {
        return this.initializing$.pipe(
            filter(initializing => !initializing),
            switchMap(() => {
                return this.store.pipe(
                    select(fromRoot.getAuthSigningIn),
                    filter(signingIn => !signingIn),
                    take(1),
                    switchMap(() => this.store.pipe(
                        select(fromRoot.getAuthLoaded),
                        filter(loaded => loaded),
                        take(1)
                    )));
            }));
    }

    public signIn(userSignIn: UserCredentials): void {
        this.store.dispatch(new AuthActions.CredentialSignIn(userSignIn));
    }

    public googleSignIn(acessToken: string): void {
        this.store.dispatch(new AuthActions.ProviderSignIn(AuthenticationProvider.Google, acessToken));
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
                    this.initializing$.next(false);
                    return;
                }

                this.store.dispatch(new AuthActions.RestoreSignIn());
                this.initializing$.next(false);
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
