export type PaginationParams = {
  page: number,
  limit: number,
  orderBy: string,
  orderType: OrderType
}

export enum OrderType {
  ASC = "ASC",
  DESC = "DESC"
} 