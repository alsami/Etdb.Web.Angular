import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as authActions from '@etdb/core/+state/actions/auth.actions';
import { AuthActionTypes } from '@etdb/core/+state/actions/auth.actions';
import {
    AuthService,
    TokenStorageService,
    ErrorExtractorService
} from '@etdb/core/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationProvider } from '@etdb/core/models';

@Injectable()
export class AuthEffects {
    @Effect()
    registered$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Registered),
        map((action: authActions.Registered) => new authActions.CredentialSignIn(action.signIn))
    );

    @Effect()
    signIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.CredentialSignIn),
        switchMap((action: authActions.CredentialSignIn) =>
            this.authService.authenticateWithCredentials(action.signIn).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.SignedIn(token, true);
                }),
                catchError((error: Error) => {
                    this.showError(error);

                    return of(new authActions.SignInFailed(error));
                })
            )
        )
    );

    @Effect()
    signInWithProvider$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.ProviderSignIn),
        switchMap((action: authActions.ProviderSignIn) =>
            this.authService
                .authenticateWithProvider(action.provider, action.token)
                .pipe(
                    map(token => {
                        this.tokenStorageService.storeToken(token);
                        return new authActions.SignedIn(token, true);
                    }),
                    catchError((error: Error) => {
                        this.showError(error);
                        return of(new authActions.SignInFailed(error));
                    })
                )
        )
    );

    @Effect()
    signedIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Authenticated),
        map((action: authActions.SignedIn) => {
            if (action.navigateToRoot) {
                this.router.navigate(['/']);
            }

            return new authActions.IdentityUserLoad();
        })
    );

    @Effect()
    identityUserLoad$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.IdentityUserLoad),
        switchMap(() => {
            return this.authService.loadIdentityUser(this.tokenStorageService.getToken().accessToken).pipe(
                map(
                    identityUser =>
                        new authActions.IdentityUserLoaded(identityUser)
                ),
                catchError((error: Error) =>
                    of(new authActions.IdentityUserLoadFailed(error))
                )
            );
        })
    );



    @Effect()
    signOut$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SignOut),
        switchMap((): Observable<any> => {
            this.tokenStorageService.clearToken();
            return of();
        })
    );

    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Register),
        switchMap((action: authActions.Register) =>
            this.authService.register(action.registerUser).pipe(
                map(
                    () =>
                        new authActions.Registered({
                            userName: action.registerUser.userName,
                            password: action.registerUser.password
                        })
                ),
                catchError((error: Error) =>
                    of(new authActions.RegisterFailed(error))
                )
            )
        )
    );

    @Effect()
    restoreSignIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.RestoreAuthentication),
        switchMap(
            (): Observable<
                | authActions.RestoreAuthenticationCompleted
                | authActions.SignedIn
                | authActions.SignInFailed
            > => {
                if (!this.tokenStorageService.canRestore()) {
                    return of(new authActions.RestoreAuthenticationCompleted());
                }

                const restoreToken = this.tokenStorageService.getToken();

                if (restoreToken.authenticationProvider === AuthenticationProvider.Google) {
                    // this.ngZone.run(() =>
                    //     gapi.auth2.getAuthInstance().signIn().then((cl: gapi.auth2.GoogleUser) => console.log('google!', cl)));
                    // return new authActions.ProviderSignIn(AuthenticationProvider.Google, cl.getAuthResponse().access_token);
                }

                return this.authService
                    .signInWithRefreshToken(restoreToken)
                    .pipe(
                        map(token => {
                            this.tokenStorageService.clearToken();
                            this.tokenStorageService.storeToken(token);
                            return new authActions.SignedIn(token);
                        }),
                        catchError((error: Error) => {
                            this.tokenStorageService.clearToken();
                            return of(new authActions.SignInFailed(error));
                        })
                    );
            }
        )
    );

    private showError(error: Error): void {
        const humanReadableError = this.errorExtractorService.extractHumanreadableError(
            error
        );
        this.snackbar.open(humanReadableError.message, undefined, {
            duration: 5000
        });
    }

    public constructor(
        private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions,
        private router: Router,
        private errorExtractorService: ErrorExtractorService,
        private snackbar: MatSnackBar,
        public ngZone: NgZone
    ) { }
}
