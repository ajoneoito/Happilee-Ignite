export interface contactListQuery {
  tag_filter?: string[];
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort_active?: string;
  direction?: string;
}
export interface contactListInterface {
  contact_list_count: number;
}
//contacts list action types
export interface contactListAction {
  type: string;
  payload: contactListQuery;
}
//contactslist filter
export interface contactListFilter {
  tag_filter?: string[];
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort_active?: string;
  direction?: string;
}
export interface contactListFiltertAction {
  type: string;
  payload: contactListFilter;
}

export interface contactDeleInterface {
  tag_filter?: string[];
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort_active?: string;
  direction?: string;
  candidate_ids: number[];
}
export interface contactDeleteAction {
  type: string;
  payload: contactDeleInterface;
}
export interface parametersInterface {
  name: string;
  value: string;
}
export interface addContactInterface {
  parameters?: parametersInterface[];
  tags?: string[];
  name: string;
  phone_number: string;
  country_code: string;
}

export interface addContactAction {
  type: string;
  payload: addContactInterface;
}
