export interface IMedia {
    id: string;
    url: string;
    type: string;
    created_at: Date;
}

export interface IFilter {
    name?: string;
    category?: string;
    rating?: number;
    location?: {
        latitude: number;
        longtitude: number;
    };
    sort?: string;
}

export interface IWorkingTime {
    dayOfWeek: number;
    closeAt: Date;
    openAt: Date;
}

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
}

export interface IStudio {
    id: string;
    name: string;
    slogan: string;
    introduction: string;
    detail: string;
    logo: string;
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
    website: string;
    address: string;
    latitude: number;
    longtitude: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    rating: number;
    listCategory: ICategory[];
    listMedia: IMedia[];
    workingTimes: IWorkingTime[];
}
