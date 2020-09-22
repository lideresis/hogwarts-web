import { PaginatedMeta } from './pagination'

export enum PageAction {
  LIST,
  SINGLE,
  NEW,
  UPDATE,
  DELETE
}

export type PageState = {
  title: string,
  action: PageAction,
  message?: MessageProps,
  selectedItemId?: string,
  setStatePageFunction: (state:PageState) => void
}

export type PanelProps = {
  title: string,
  children: JSX.Element,
  message?: MessageProps | undefined,
  pagination?: PaginatedMeta,
  setParentPage?: React.Dispatch<React.SetStateAction<number>>
}

export enum MessageType {
  DEFAULT = "default",
  INFO = "info",
  SUCCESS = "success",
  ALERT = "alert",
  WARNING = "warning"
}

export type MessageProps = {
  message: string | undefined,
  type: MessageType
}