export interface IPagination {
    page: number;
    pageSize: number;
    total: number;
}

export interface IPaginationReq {
    page: number;
    pageSize: number;
    searchKeyword?: string;
}

export interface EditRes {
    message: string;
    status: boolean;
}
