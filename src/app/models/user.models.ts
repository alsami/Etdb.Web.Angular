export interface User {
    id: string;
    userName: string;
    firstName: string;
    name: string;
    biography: string;
    registeredSince: Date;
    isExternalUser: boolean;
    profileImageMetaInfos: ProfileImageMetaInfo[];
}

export interface ProfileImageMetaInfo {
    id: string;
    url: string;
    removeUrl: string;
    isPrimary: boolean;
}
