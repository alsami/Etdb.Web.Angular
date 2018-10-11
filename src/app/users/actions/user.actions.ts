import { User } from '@etdb/models';
import {
    UserNameUpdate,
    UserProfileImageUpload,
    UserPasswordChange
} from '@etdb/users/models';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    Load = '[User API] Load User',
    Loaded = '[User API] Loaded User',
    LoadFailed = '[User API] Load User Failed',
    UpdateUserName = '[User API] Update User Name',
    UpdatedUserName = '[User API] Updated User Name',
    UpdateUserNameFailed = '[User API] Update User Name Failed',
    UploadProfileImage = '[User API] Upload User Profile Image',
    UploadedProfileImage = '[User API] Uploaded User Profile Image',
    UploadProfileImageFailed = '[User API] Upload User Profil Image Failed',
    UpdatePassword = '[User API] Update User Password',
    UpdatedPassword = '[User API] Updated User Password',
    UpdatePasswordFailed = '[User API] Update User Password Failed'
}

export class Load implements Action {
    readonly type = UserActionTypes.Load;
    public constructor(public id: string) {}
}

export class Loaded implements Action {
    readonly type = UserActionTypes.Loaded;
    public constructor(public user: User) {}
}

export class LoadFailed implements Action {
    readonly type = UserActionTypes.LoadFailed;
    public constructor(public error: Error | any) {}
}

export class UpdateUserName implements Action {
    readonly type = UserActionTypes.UpdateUserName;
    public constructor(public data: UserNameUpdate) {}
}

export class UpdatedUserName implements Action {
    readonly type = UserActionTypes.UpdatedUserName;
}

export class UpdateUserNameFailed implements Action {
    readonly type = UserActionTypes.UpdateUserNameFailed;
    public constructor(public error: Error | any) {}
}

export class UploadProfileImage implements Action {
    readonly type = UserActionTypes.UploadProfileImage;
    public constructor(public profileImage: UserProfileImageUpload) {}
}

export class UploadedProfileImage implements Action {
    readonly type = UserActionTypes.UploadedProfileImage;
    public constructor(public user: User) {}
}

export class UploadProfileImageFailed implements Action {
    readonly type = UserActionTypes.UploadProfileImageFailed;
    public constructor(public error: Error | any) {}
}

export class UpdatePassword implements Action {
    readonly type = UserActionTypes.UpdatePassword;
    public constructor(
        public id: string,
        public passwordChange: UserPasswordChange
    ) {}
}

export class UpdatedPassword implements Action {
    readonly type = UserActionTypes.UpdatedPassword;
}

export class UpdatePasswordFailed implements Action {
    readonly type = UserActionTypes.UpdatePasswordFailed;
    public constructor(public error: Error | any) {}
}

export type UserActions =
    | Load
    | Loaded
    | LoadFailed
    | UpdateUserName
    | UpdatedUserName
    | UpdateUserNameFailed
    | UploadProfileImage
    | UploadedProfileImage
    | UploadProfileImageFailed
    | UpdatePassword
    | UpdatedPassword
    | UpdatePasswordFailed;
