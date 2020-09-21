export type PaginationParams = {
  page: number,
  limit: number,
  orderBy: string,
  orderType: "ASC" | "DESC" | string
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
  status: "default" | "active" | "disabled"
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