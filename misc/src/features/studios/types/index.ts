import { IArtist, IUser } from '@/features/users';

export interface IMedia {
    id: string;
    url: string;
    type: string;
}

export interface IFilter {
    searchKeyword?: string;
    category?: string;
    rating?: number[];
    viewPortNE?: {
        lat: number;
        lng: number;
    };
    viewPortSW?: {
        lat: number;
        lng: number;
    };
    page?: number;
    pageSize?: number;
    sort?: string;
}

export interface IWorkingTime {
    dayOfWeek: number;
    closeAt: string;
    openAt: string;
}

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
}

export interface IPaginationStudio {
    data: IStudio[];
    page: number;
    pageSize: number;
    total: number;
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
    longitude: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    rating: number;
    listCategory: ICategory[];
    listMedia: IMedia[];
    workingTimes: IWorkingTime[];
}

// "shiftArtists": [
//     {
//         "shiftId": "8bd0d9a4-8901-432f-b032-45fa70986020",
//         "stuUserId": "eff7cc71-4f9c-4c38-b7c1-b2a851bb4d80",
//         "stuUser": {
//             "id": "eff7cc71-4f9c-4c38-b7c1-b2a851bb4d80",
//             "studioId": "6a9ecc3e-1051-44dd-9e4f-3468e8dae134",
//             "userId": "6ee2666f-a57b-412e-b586-08dbd9d3dace",
//             "isDisabled": false,
//             "user": {
//                 "id": "6ee2666f-a57b-412e-b586-08dbd9d3dace",
//                 "email": "heheartist1@gmail.com",
//                 "fullName": "Hehe Artist 1",
//                 "phone": "025546879",
//                 "address": null,
//                 "avatar": "https://storage.googleapis.com/arttattoolover-adf51.appspot.com/media/1cc7e16c-8097-464f-ac22-1675935e9aa1.png",
//                 "birthday": null,
//                 "roleId": 5,
//                 "status": 1
//             }
//         },
//         "isBooked": false
//     }
// ]

export type StudioArtist = {
    id: string;
    studioId: string;
    userId: string;
    isDisabled: boolean;
    user: IUser;
};

export type ShiftArtist = {
    shiftId: string;
    userId: string;
    isBooked: boolean;
    stuUser: IArtist;
};

export type Shift = {
    id: string;
    studioId: string;
    start: string;
    end: string;
    shiftArtists: ShiftArtist[];
};
