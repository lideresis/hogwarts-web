import { PaginatedMeta } from './pagination';

export type User = {
  id: string,
  name: string,
  email: string,
  is_active: boolean,
  created_at: Date,
  updated_at: Date
}

export type PostUser = {
  name: string,
  email: string,
  password: string
}

export type UsersPaginated = {
  items: User[],
  meta: PaginatedMeta,
  links: any
}