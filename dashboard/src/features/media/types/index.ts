export interface IMedia {
    success: boolean;
    url: string;
}

export enum typeEnum {
    IMAGE = 0,
    VIDEO = 1,
    AUDIO = 2,
    FILE = 3,
}

export interface MediaCredentials {
    file: File;
    type: typeEnum;
}
