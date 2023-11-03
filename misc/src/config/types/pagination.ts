export type PaginationQuery = {
    page: number;
    pageSize: number;
};

export interface PaginationResp {
    page: number;
    pageSize: number;
    total: number;
}
