export interface InitialState {
  pageNumber: number;
  template: templateListInterface;
}
export interface templateListInterface {
  id?: string;
  templateMessageUid?: string;
  status?: string;
  headerUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  templateBody: {
    type: string;
    text: string;
    id?: string;
  };
  template_type?: string;
  footer: string;
  header?: {
    format?: string;
    text?: string | null;
  };
  deleted_at?: string;
  template_uid?: string;
  project_id?: number;
  elementName?: string;
  template_message_custom_params:
    | [
        {
          id?: string;
          paramName?: string;
        },
      ]
    | [];
}

export interface templateListAction {
  type: string;
  payload: templateListInterface;
}
export interface templateListFilter {
  limit: number;
  pageNumber?: number;
  search?: string;
}
export interface newChat {
  phone_number?: number;
  country_code?: string;
  template_message_id?: string;
  template_params?: string;
}
