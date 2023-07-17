export interface listapps {
  category?: string;
  search?: string;
  appsListType?: string;
}

export interface addonsListAction {
  type: string;
  payload: addonsList;
}
export interface addonsList {
  createdAt: string;
  description: string;
  id: string;
  logo_url: string;
  name?: string;
  status: string;
  updatedAt: string;
  // search: string;
}
export interface listFilterAction {
  pageNumber: number;
  limit: number;
  search: string;
  hasNextPage: boolean;
}
export interface fbLeadFilterAction {
  type: string;
  payload: listFilterAction;
}
export interface addonListFilterAction {
  search: string;
}
export interface addonFilter {
  type: string;
  payload: addonListFilterAction;
}
export interface fbLeads {
  search?: string;
  limit?: number;
  pageNumber: number;
  filter_type: string;
  filter_key: string;
  current_date?: string;
}
export interface leadHistory {
  lead_id: string;
}
export interface fbLeadHistoryAction {
  type: string;
  payload: fbLeadHistory;
}
export interface fbLeadHistory {
  created_at: string;
  additionalInfo: {
    address: {
      type: string;
      value: string;
    };
    lead_id: string;
    whatsapp_number: {
      type: string;
      value: number | string;
    };
  };
  basicInfo: {
    email: string;
    name: string;
    phone_number: string;
    status: string;
  };
  notes: [
    {
      created_at: string;
      id: number | null;
      text: string;
      updated_at: string;
    },
  ];
}

export interface leadaTypeAction {
  type: string;
  payload: fbLeadType;
}
export interface fbLeadType {
  field_name: string;
  field_type: string;
}
export interface fbLeadUpdate {
  lead_id: string;
  status: string;
  status_id: string;
  follow_up_date: string;
  notes: [{text: string; created_at: string; updated_at: string}];
}
export interface fbLeadList {
  // total_count: number;
  // status_name: string;
  // lead_status_filter_id: string;
  // lead_id: string;
  // name: string;
  // email: string;
  // phone_number: string | null;
  // createdAt: string;
  // updatedAt: string;
  // follow_up_date: null | string;
  // data: {
  //   basicInfo: {
  //     name: string;
  //     email: string;
  //     phone_number: string;
  //     status: null | string;
  //   };
  //   additionalInfo: {};
  //   notes: [];
  // };

  count: number;
  data: [
    {
      total_count: number;
      status_name: string;
      lead_status_filter_id: string;
      lead_id: string;
      name?: string;
      email: string;
      phone_number: string | null;
      createdAt: string;
      updatedAt: string;
      follow_up_date: null | string;
      data: {
        basicInfo: {
          name: string;
          email: string;
          phone_number: string;
          status: null | string;
        };
        additionalInfo: {};
        notes: [];
      };
    },
  ];
}
export interface  leadAction{
  type:string;
  payload: fbLeadList;
}
export interface fbLeadsList{
  count:number;
  data: [],

}
export interface fbLeadListAction {
  type: string;
  payload: fbLeadList;
}
export interface leadList {
  total_count: number;
  status_name: string;
  lead_status_filter_id: string;
  lead_id: string;
  name?: string;
  email: string;
  phone_number: string | null;
  createdAt: string;
  updatedAt: string;
  follow_up_date: null | string;
}
export interface leadStatusAction {
  type: string;
  payload: fbLeadStatus;
}
export interface fbLeadStatus {
  dynamic_statuses: [
    {
      id: string;
      project_id: string;
      name: string;
      priority: 0;
      createdAt: string;
      updatedAt: string;
    },
  ];
  follow_up_types: [
    {
      id: string;
      project_id: string;
      name: string;
      priority: 0;
      createdAt: string;
      updatedAt: string;
    },
  ];
  status_types: [
    {
      id: string;
      project_id: string;
      name: string;
      priority: 0;
      createdAt: string;
      updatedAt: string;
    },
  ];
}
export interface fbLeadFilter {
  search: string;
  limit: number;
  pageNumber: number;
  filter_type: string;
  filter_key: string;
  current_date: string;
}
export interface statusFilter {
  payload_key: string;
  count?: 0;
  id: string;
  project_id: string;
  name: string;
  priority: 0;
  createdAt: string;
  updatedAt: string;
}
export interface leadFilterAction {
  type: string;
  payload: fbLeadFilter;
}
