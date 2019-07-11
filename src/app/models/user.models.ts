import { AuthenticationProvider } from '@etdb/core/models';

export interface User {
    id: string;
    userName: string;
    firstName: string;
    name: string;
    biography: string;
    registeredSince: Date;
    isExternalUser: boolean;
    authenticationProvider: AuthenticationProvider;
    authenticationLogsUrl: string;
    profileImageMetaInfos: ProfileImageMetaInfo[];
}

export interface ProfileImageMetaInfo {
    id: string;
    url: string;
    resizeUrl: string;
    removeUrl: string;
    isPrimary: boolean;
    createdAt: Date;
}

export enum AuthenticationLogType {
    Succeeded = 'Succeeded',
    Failed = 'Failed'
}

export interface AuthenticationLog {
    loggedAt: Date;
    authenticationLogType: AuthenticationLogType;
    ipAddress: string;
    additionalInformation: string;
}
