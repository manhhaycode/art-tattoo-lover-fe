export interface IMedia {
    success: boolean;
    url: string;
}

export enum typeEnum {
    IMAGE = 0,
    VIDEO = 1,
    CERT = 2,
    YOUTUBE = 3,
}

export interface MediaCredentials {
    id?: string;
    file: File;
    type: typeEnum;
}
