import { PaginatedMeta } from './pagination';

export type Wizard = {
  id: string,
  name: string,
  age: number,
  speciality: string,
  is_active: boolean,
  created_at: Date,
  updated_at: Date
}

export type PostWizard = {
  name: string,
  age: number,
  speciality: string,
  is_active: boolean
}

export type UpdateWizard = PostWizard;

export type WizardsPaginated = {
  items: Wizard[],
  meta: PaginatedMeta,
  links: any
}