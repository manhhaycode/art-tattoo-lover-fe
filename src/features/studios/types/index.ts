export interface IMedia {
    id: string;
    url: string;
    type: string;
    created_at: Date;
}

export interface IStudio {
    id: string;
    name: string;
    detail: string;
    logo: string;
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
    website: string;
    address: string;
    latitude: string;
    longtitude: string;
    created_at: Date;
    updated_at: Date;
    medias: IMedia[];
}
