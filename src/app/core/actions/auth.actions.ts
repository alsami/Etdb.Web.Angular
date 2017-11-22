import { Action } from '@ngrx/store';
import { UserLogin } from '../models/user-login.model';
import { IdentityToken } from '../models/identity-token.model';
import { IdentityUser } from '../models/identity-user.model';
import { RegisterUser } from '../models/register-user.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login success';
export const LOGIN_FAIL = '[Auth] Login fail';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register success';
export const REGISTER_FAIL = '[Auth] Register fail';
export const RESTORE_LOGIN = '[Auth] Restore login';
export const LOAD_IDENTITY_USER = '[Auth] Load Identity User';
export const LOAD_IDENTITY_USER_SUCCESS = '[Auth] Load Identity User success';
export const LOAD_IDENTITY_USER_FAIL = '[Auth] Load Identity User fail';

export class LoginAction implements Action {
    readonly type = LOGIN;
    public constructor(public login: UserLogin) {}
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;
    public constructor(public token: IdentityToken) {}
}

export class LoginFailAction implements Action {
    readonly type = LOGIN_FAIL;
    public constructor(public error: Error) {}
}

export class RegisterAction implements Action {
    readonly type = REGISTER;
    public constructor(public registerUser: RegisterUser) {}
}

export class RegisterSucessAction implements Action {
    readonly type = REGISTER_SUCCESS;
    public constructor(public login: UserLogin) {}
}

export class RegisterFailAction implements Action {
    readonly type = REGISTER_FAIL;
    public constructor(public error: Error) {}
}

export class RestoreLoginAction implements Action {
    readonly type = RESTORE_LOGIN;
}

export class LoadIdentityUserAction implements Action {
    readonly type = LOAD_IDENTITY_USER;
    public constructor(public identityToken: UserLogin) {}
}

export class LoadIdentityUserSuccessAction implements Action {
    readonly type = LOAD_IDENTITY_USER_SUCCESS;
    public constructor(public identityUser: IdentityUser) {}
}

export class LoadIdentityUserFailAction implements Action {
    readonly type = LOAD_IDENTITY_USER_FAIL;
    public constructor(public error: Error) {}
}

export declare type Actions =
    LoginAction | LoginSuccessAction | LoginFailAction |
    RegisterAction | RegisterSucessAction | RegisterFailAction |
    RestoreLoginAction |
    LoadIdentityUserAction | LoadIdentityUserSuccessAction | LoadIdentityUserFailAction;
