export type PaginationQuery = {
    page: number;
    pageSize: number;
    startDate?: string;
    status?: string;
};

export interface PaginationResp {
    page: number;
    pageSize: number;
    total: number;
}
