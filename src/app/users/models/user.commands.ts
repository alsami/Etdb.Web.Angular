export interface UserNameChange {
    id: string;
    userName: string;
}

export interface UserProfileImageUpload {
    userId: string;
    file: File;
}

export interface UserPasswordChange {
    currentPassword: string;
    newPassword: string;
}

export interface UserProfileInfoChange {
    firstName: string;
    name: string;
    biography: string;
}
