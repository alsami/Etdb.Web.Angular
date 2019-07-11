import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as fromRoot from '@etdb/+state';
import { Store, select } from '@ngrx/store';
import { AuthActions } from '@etdb/core/+state/actions';
import { TokenStorageService } from '@etdb/core/services';
import { BehaviorSubject, combineLatest, Subscription, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {
    IdentityUser, RegisterUser, UserCredentials,
    AuthenticationProvider
} from '@etdb/core/models';
import { take, filter, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
    private authIniSubscription: Subscription;
    private googleInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private facebookInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private initializing$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public authenticating$: Observable<boolean>;
    public authenticatedUser$: Observable<IdentityUser>;
    public registering$: Observable<boolean>;
    public authLoading$: Observable<boolean>;
    public authenticated$: Observable<boolean>;
    public googleAuthAvailable$: Observable<boolean>;
    public facebookAuthAvailable$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>,
        private tokenStorageService: TokenStorageService, private ngZone: NgZone) {
        this.authenticating$ = this.store.pipe(select(fromRoot.getAuthAuthenticating));
        this.authenticatedUser$ = this.store.pipe(select(fromRoot.getAuthenticatedUser));
        this.registering$ = this.store.pipe(select(fromRoot.getAuthRegistering));
        this.authLoading$ = this.store.pipe(select(fromRoot.getAuthLoading));
        this.authenticated$ = this.store.pipe(select(fromRoot.getAuthAuthenticated));
        this.googleAuthAvailable$ = this.store.pipe(select(fromRoot.getAuthGoogleAuthAvailable));
        this.facebookAuthAvailable$ = this.store.pipe(select(fromRoot.getAuthFacebookAuthAvailable));
    }

    public ngOnDestroy(): void {
        this.authIniSubscription.unsubscribe();
    }

    public awaitAuthenticated(): Observable<boolean> {
        return this.initializing$.pipe(
            filter(initializing => !initializing),
            switchMap(() => {
                return this.store.pipe(
                    select(fromRoot.getAuthAuthenticating),
                    filter(authenticating => !authenticating),
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

    public restoreSignin(emitAuthenticatingState: boolean = true): void {
        this.store.dispatch(new AuthActions.RestoreAuthentication(emitAuthenticatingState));
    }

    public initialize(): void {
        this.loadGoogleApi();
        this.checkFacebookApiAvailability();
        this.authIniSubscription = combineLatest(this.googleInitialized$, this.facebookInitialized$)
            .subscribe(([googleInitialized, facebookInitialized]) => {
                if (!googleInitialized || !facebookInitialized) {
                    return;
                }

                if (!this.tokenStorageService.canRestore()) {
                    this.initializing$.next(false);
                    return;
                }

                this.restoreSignin();
                this.initializing$.next(false);
            });
    }

    private loadGoogleApi(): void {
        if (gapi === undefined || gapi.load === undefined) {
            this.store.dispatch(new AuthActions.SetGoogleAuthAvailable(false));
            this.googleInitialized$.next(true);
            return;
        }

        gapi.load('auth2', async () => {
            gapi.auth2.init({
                client_id: environment.googleClientId,
                scope: 'profile email openid'
            });
            this.ngZone.run(() => {
                this.store.dispatch(new AuthActions.SetGoogleAuthAvailable(true));
                this.googleInitialized$.next(true);
            });
        });
    }

    private checkFacebookApiAvailability(): void {
        try {
            FB.getLoginStatus(() => { });
            this.store.dispatch(new AuthActions.SetFacebookAuthAvailable(true));
            this.facebookInitialized$.next(true);
        } catch (error) {
            this.store.dispatch(new AuthActions.SetFacebookAuthAvailable(false));
            this.facebookInitialized$.next(true);
        }
    }
}
