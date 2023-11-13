export interface IMedia {
    id: string;
    url: string;
    type: typeEnum;
}

export interface IMediaCreate {
    success: boolean;
    url: string;
}

export enum typeEnum {
    IMAGE = 0,
    VIDEO = 1,
    CERT = 2,
    FILE = 3,
}

export interface MediaCredentials {
    id?: string;
    file: File;
    type: typeEnum;
}
