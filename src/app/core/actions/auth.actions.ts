import { Action } from '@ngrx/store';
import { IdentityToken, RegisterUser, IdentityUser, UserLogin } from '@etdb/core/models';

export enum AuthActionTypes {
    Login = '[Auth API] User Login',
    LoggedIn = '[Auth API] User Logged in',
    LoginFailed = '[Auth API] User Login failed',
    Logout = '[Auth API] Logout',
    Register = '[Auth API] User Register',
    Registered = '[Auth API] User Registered',
    RegisterFailed = '[Auth API] User Register failed',
    RestoreLogin = '[Auth API] Restore Login',
    RestoreCompleted = '[Auth API] Restore completed',
    IdentityUserLoad = '[Auth API] Identity-User Load',
    IdentityUserLoaded = '[Auth API] Identity-User Loaded',
    IdentityUserLoadFailed = '[Auth API] Identity-User Load failed',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    public constructor(public login: UserLogin) { }
}

export class LoggedIn implements Action {
    readonly type = AuthActionTypes.LoggedIn;
    public constructor(public token: IdentityToken, public navigateToRoot = false) { }
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LoginFailed;
    public constructor(public error: Error) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    public constructor(public registerUser: RegisterUser) { }
}

export class Registered implements Action {
    readonly type = AuthActionTypes.Registered;
    public constructor(public login: UserLogin) { }
}

export class RegisterFailed implements Action {
    readonly type = AuthActionTypes.RegisterFailed;
    public constructor(public error: Error) { }
}

export class RestoreLogin implements Action {
    readonly type = AuthActionTypes.RestoreLogin;
}

export class RestoreCompleted implements Action {
    readonly type = AuthActionTypes.RestoreCompleted;
}

export class IdentityUserLoad implements Action {
    readonly type = AuthActionTypes.IdentityUserLoad;
    public constructor(public identityToken: UserLogin) { }
}

export class IdentityUserLoaded implements Action {
    readonly type = AuthActionTypes.IdentityUserLoaded;
    public constructor(public identityUser: IdentityUser) { }
}

export class IdentityUserLoadFailed implements Action {
    readonly type = AuthActionTypes.IdentityUserLoadFailed;
    public constructor(public error: Error) { }
}

export declare type AuthActions =
    Login | LoggedIn | LoginFailed | Logout | RestoreLogin | RestoreCompleted |
    Register | Registered | RegisterFailed |
    IdentityUserLoad | IdentityUserLoaded | IdentityUserLoadFailed;
