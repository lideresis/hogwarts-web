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

export type PaginatedMeta = {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}

export type PaginationButtonType = {
  text: string,
  page: number,
  status: ButtonStatus
}

export enum ButtonStatus {
  DEFAULT = "default",
  ACTIVE = "active",
  DISABLED = "disabled"
}

export type PaginationButtons = {
  start: PaginationButtonType,
  first: PaginationButtonType,
  second: PaginationButtonType,
  third: PaginationButtonType,
  end: PaginationButtonType
}
export type PaginationPages = {
  first: number,
  second: number,
  third: number
}