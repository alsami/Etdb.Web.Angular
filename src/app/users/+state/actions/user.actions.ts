import { User, ProfileImageMetaInfo } from '@etdb/models';
import {
    UserNameChange,
    UserProfileImageUpload,
    UserPasswordChange,
    UserProfileInfoChange
} from '@etdb/users/models';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    Load = '[User API] Load User',
    Loaded = '[User API] Loaded User',
    LoadFailed = '[User API] Load User Failed',
    ChangeUserName = '[User API] Change User Name',
    ChangedUserName = '[User API] Changed User Name',
    ChangeUserNameFailed = '[User API] Change User Name Failed',
    UpdatePassword = '[User API] Update User Password',
    UpdatedPassword = '[User API] Updated User Password',
    UpdatePasswordFailed = '[User API] Update User Password Failed',
    UpdateProfileInfo = '[User API] Update User Profileinfo',
    UpdatedProfileInfo = '[User API] Updated User Profileinfo',
    UpdateProfileInfoFailed = '[User API] Update User Profileinfo Failed',
    UploadProfileImage = '[User API] Upload User Profile Image',
    UploadedProfileImage = '[User API] Uploaded User Profile Image',
    UploadProfileImageFailed = '[User API] Upload User Profil Image Failed',
    RemoveProfileImage = '[User API] Remove User Profile Image',
    RemovedProfileImage = '[User API] Removed User Profile Image',
    RemoveProfileImageFailed = '[User API] Remove User Profile Image Failed',
    MarkPrimaryProfileImage = '[User API] Mark User Primary Profile Image',
    MarkedPrimaryProfileImage = '[User API] Marked User Primary Profile Image',
    MarkPrimaryProfileImageFailed = '[User API] Marked User Primary Profile Image Failed',
}

export class Load implements Action {
    readonly type = UserActionTypes.Load;
    public constructor(public id: string) { }
}

export class Loaded implements Action {
    readonly type = UserActionTypes.Loaded;
    public constructor(public user: User) { }
}

export class LoadFailed implements Action {
    readonly type = UserActionTypes.LoadFailed;
    public constructor(public error: Error) { }
}

export class ChangeUserName implements Action {
    readonly type = UserActionTypes.ChangeUserName;
    public constructor(public data: UserNameChange) { }
}

export class ChangedUserName implements Action {
    readonly type = UserActionTypes.ChangedUserName;
    public constructor(public data: UserNameChange) { }
}

export class ChangeUserNameFailed implements Action {
    readonly type = UserActionTypes.ChangeUserNameFailed;
    public constructor(public error: Error) { }
}

export class UpdatePassword implements Action {
    readonly type = UserActionTypes.UpdatePassword;
    public constructor(
        public id: string,
        public passwordChange: UserPasswordChange
    ) { }
}

export class UpdatedPassword implements Action {
    readonly type = UserActionTypes.UpdatedPassword;
}

export class UpdatePasswordFailed implements Action {
    readonly type = UserActionTypes.UpdatePasswordFailed;
    public constructor(public error: Error) { }
}

export class UpdateProfileInfo implements Action {
    readonly type = UserActionTypes.UpdateProfileInfo;
    public constructor(
        public id: string,
        public profileInfoChange: UserProfileInfoChange
    ) { }
}

export class UpdatedProfileInfo implements Action {
    readonly type = UserActionTypes.UpdatedProfileInfo;
    public constructor(
        public id: string,
        public profileInfoChange: UserProfileInfoChange
    ) { }
}

export class UpdateProfileInfoFailed implements Action {
    readonly type = UserActionTypes.UpdateProfileInfoFailed;
    public constructor(public error: Error) { }
}

export class UploadProfileImage implements Action {
    readonly type = UserActionTypes.UploadProfileImage;
    public constructor(public profileImage: UserProfileImageUpload) { }
}

export class UploadedProfileImage implements Action {
    readonly type = UserActionTypes.UploadedProfileImage;
    public constructor(public userId: string, public profileImageMeta: ProfileImageMetaInfo) { }
}

export class UploadProfileImageFailed implements Action {
    readonly type = UserActionTypes.UploadProfileImageFailed;
    public constructor(public error: Error) { }
}

export class RemoveProfileImage implements Action {
    readonly type = UserActionTypes.RemoveProfileImage;
    public constructor(public url: string, public userId: string) { }
}

export class RemovedProfileImage implements Action {
    readonly type = UserActionTypes.RemovedProfileImage;
    public constructor(public url: string, public userId: string) { }
}

export class RemoveProfileImageFailed implements Action {
    readonly type = UserActionTypes.RemoveProfileImageFailed;
    public constructor(public error: Error) { }
}

export class MarkPrimaryProfileImage implements Action {
    readonly type = UserActionTypes.MarkPrimaryProfileImage;
    public constructor(public id: string, public userId: string) { }
}

export class MarkedPrimaryProfileImage implements Action {
    readonly type = UserActionTypes.MarkedPrimaryProfileImage;
    public constructor(public id: string, public userId: string) { }
}

export class MarkPrimaryProfileImageFailed implements Action {
    readonly type = UserActionTypes.MarkPrimaryProfileImageFailed;
    public constructor(public error: Error) { }
}

export type UserActions =
    | Load
    | Loaded
    | LoadFailed
    | ChangeUserName
    | ChangedUserName
    | ChangeUserNameFailed
    | UpdatePassword
    | UpdatedPassword
    | UpdatePasswordFailed
    | UpdateProfileInfo
    | UpdatedProfileInfo
    | UpdateProfileInfoFailed
    | RemoveProfileImage
    | RemovedProfileImage
    | RemoveProfileImageFailed
    | UploadProfileImage
    | UploadedProfileImage
    | UploadProfileImageFailed
    | MarkPrimaryProfileImage
    | MarkedPrimaryProfileImage
    | MarkPrimaryProfileImageFailed;
