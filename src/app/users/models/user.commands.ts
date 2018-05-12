export interface UpdateUserNameCommand {
    id: string;
    userName: string;
}

export interface UploadProfileImageCommand {
    id: string;
    file: File;
}
