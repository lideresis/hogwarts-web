import { PaginatedMeta } from './pagination'

export type PanelProps = {
  title: string,
  children: JSX.Element,
  message?: MessageProps | undefined,
  pagination?: PaginatedMeta,
  setParentPage?: Function
}

export type MessageProps = {
  message: string | undefined,
  type?: "default" | "info" | "success" | "alert" | "warning" | undefined
}