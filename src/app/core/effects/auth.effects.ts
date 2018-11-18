import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as authActions from '@etdb/core/actions/auth.actions';
import { AuthActionTypes } from '@etdb/core/actions/auth.actions';
import { AuthService, TokenStorageService } from '@etdb/core/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.CredentialSignIn, AuthActionTypes.Registered),
        switchMap((action: authActions.CredentialSignIn | authActions.Registered) =>
            this.authService.signInWithCredentials(action.signIn).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.SignedIn(token, true);
                }),
                catchError((error: Error) =>
                    of(new authActions.SignInFailed(error))
                )
            )
        )
    );

    @Effect()
    signInWithProvider$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.ProviderSignIn),
        switchMap((action: authActions.ProviderSignIn) =>
            this.authService.signInWithProvider(action.provider, action.token).pipe(
                map(token => {
                    this.tokenStorageService.storeToken(token);
                    return new authActions.SignedIn(token, true);
                }),
                catchError((error: Error) => of(new authActions.SignInFailed(error)))
            ))
    );

    @Effect()
    signedIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SignedIn),
        switchMap((action: authActions.SignedIn) => {
            if (action.navigateToRoot) {
                // workaround because of https://github.com/angular/angular/issues/25837
                this.ngZone.run(async () => {
                    this.router.navigate(['/']);
                });
            }
            return of();
        })
    );
    @Effect()
    signOut$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SignOut),
        switchMap(() => {
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
    identityUserLoad$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SignedIn),
        switchMap(() =>
            this.authService.loadIdentityUser().pipe(
                map(
                    identityUser =>
                        new authActions.IdentityUserLoaded(identityUser)
                ),
                catchError((error: Error) =>
                    of(new authActions.IdentityUserLoadFailed(error))
                )
            )
        )
    );

    @Effect()
    restoreSignIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.RestoreSignIn),
        switchMap(
            (): Observable<
                | authActions.RestoreCompleted
                | authActions.SignedIn
                | authActions.SignInFailed
                > => {
                if (!this.tokenStorageService.canRestore()) {
                    return of(new authActions.RestoreCompleted());
                }
                return this.authService
                    .signInWithRefreshToken(
                        this.tokenStorageService.restoreToken()
                    )
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

    public constructor(
        private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private actions$: Actions,
        private router: Router,
        private ngZone: NgZone
    ) { }
}
