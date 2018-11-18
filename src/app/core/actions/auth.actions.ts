import { Action } from '@ngrx/store';
import { IdentityToken, RegisterUser, IdentityUser, UserSignIn, SignInProviderTypes } from '@etdb/core/models';

export enum AuthActionTypes {
    CredentialSignIn = '[Auth API] User Credential SignIn',
    ProviderSignIn = '[Auth API] User Provider SignIn',
    SignedIn = '[Auth API] User SignedIn',
    SignInFailed = '[Auth API] User SignIn failed',
    SignOut = '[Auth API] SignOut',
    Register = '[Auth API] User Register',
    Registered = '[Auth API] User Registered',
    RegisterFailed = '[Auth API] User Register failed',
    RestoreSignIn = '[Auth API] Restore SignIn',
    RestoreCompleted = '[Auth API] Restore completed',
    IdentityUserLoad = '[Auth API] Identity-User Load',
    IdentityUserLoaded = '[Auth API] Identity-User Loaded',
    IdentityUserLoadFailed = '[Auth API] Identity-User Load failed',
}

export class CredentialSignIn implements Action {
    readonly type = AuthActionTypes.CredentialSignIn;
    public constructor(public signIn: UserSignIn) { }
}

export class ProviderSignIn implements Action {
    readonly type = AuthActionTypes.ProviderSignIn;
    public constructor(public provider: SignInProviderTypes, public token: string) { }
}

export class SignedIn implements Action {
    readonly type = AuthActionTypes.SignedIn;
    public constructor(public token: IdentityToken, public navigateToRoot = false) { }
}

export class SignInFailed implements Action {
    readonly type = AuthActionTypes.SignInFailed;
    public constructor(public error: Error) { }
}

export class SignOut implements Action {
    readonly type = AuthActionTypes.SignOut;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    public constructor(public registerUser: RegisterUser) { }
}

export class Registered implements Action {
    readonly type = AuthActionTypes.Registered;
    public constructor(public signIn: UserSignIn) { }
}

export class RegisterFailed implements Action {
    readonly type = AuthActionTypes.RegisterFailed;
    public constructor(public error: Error) { }
}

export class RestoreSignIn implements Action {
    readonly type = AuthActionTypes.RestoreSignIn;
}

export class RestoreCompleted implements Action {
    readonly type = AuthActionTypes.RestoreCompleted;
}

export class IdentityUserLoad implements Action {
    readonly type = AuthActionTypes.IdentityUserLoad;
    public constructor(public identityToken: UserSignIn) { }
}

export class IdentityUserLoaded implements Action {
    readonly type = AuthActionTypes.IdentityUserLoaded;
    public constructor(public identityUser: IdentityUser) { }
}

export class IdentityUserLoadFailed implements Action {
    readonly type = AuthActionTypes.IdentityUserLoadFailed;
    public constructor(public error: Error) { }
}

export declare type AuthActionUnion =
    | CredentialSignIn
    | ProviderSignIn
    | SignedIn
    | SignInFailed
    | SignOut
    | RestoreSignIn
    | RestoreCompleted
    | Register
    | Registered
    | RegisterFailed
    | IdentityUserLoad
    | IdentityUserLoaded
    | IdentityUserLoadFailed;
