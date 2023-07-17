export interface broadcastListFilter {
  limit?: number;
  pageNumber?: number;
  order?: string;
  sort?: string;
  search?: string;
}

export interface broadcastFilter {
  limit?: number;
  pageNumber?: number;
  search?: string;
  sort?: string;
  order?: string;
  hasNextPage?: boolean;
}
export interface broadcastAction {
  type: string;
  payload: broadcastFilter;
}

export interface broadcastRecipientsInterface {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicUrl: string;
}
export interface broadcastMessage {
  parameter_filter: string;
  tag_filter: string;
  match_condition: string;
  recipients: string;
  templateId: string;
  name: string;
  template_params: string;
}
export interface broadcastListQuery {
  payload: any;
  pageNumber?: number;
  hasNextpage?: boolean;
}
export interface broadcasTagtListFilter {
  limit: number;
  pageNumber: number;
  id: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}
export interface broadcasTagtList {
  limit: number;
  pageNumber: number;
  tagName: string;
}
export interface broadcastLog {
  broadcast_id: number | string;
  status?: string;
  limit?: number;
  pageNumber?: number;
  search?: string;
}
export interface broadcastLogAction {
  type: string;
  payload: broadcastLog;
}
export interface broadcastTagListAction {
  type: string;
  payload: broadcasTagtListFilter;
}
export interface broadcastRecipientsList {
  limit?: number;
  pageNumber?: number;
  search?: string;
  parameter_filter: string[];
  tag_filter?: string[];
  is_select_all?: boolean;
  match_condition?: string;
}
export interface broadcastFilterParms {
  limit?: number;
  pageNumber?: number;
  search?: string;
}
export interface broadcastFilterAction {
  type: string;
  payload: broadcastFilterParmsAction;
}
export interface broadcastFilterParmsAction {
  limit?: number;
  pageNumber?: number;
  search?: string;
}
export interface broadcastRecipientsLogAction {
  type: string;
  payload: broadcastRecipientsLogAction;
}
export interface broadcastRecipientsLogAction {
  limit?: number;
  pageNumber?: number;

  broadcast_data: {
    text: string;
    type: string;
  };
}
export interface uploadFile {
  file: string;
}
export interface broadcastLogHistoryAction {
  type: string;
  payload: broadcastLogHistory;
}

export interface broadcastLogHistory {
  broadcast_data: {
    template_body: {
      type: string;
      text: string;
    };
    template_header?: {
      format?: string;
      text?: string | null;
    };
    template_file_url?: string | null;
  };
  recipient_list: [
    {
      id: string;
      broadcastId: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
      recievedStatus: string;
      status: string;
      firstName?: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      countryCode: string;
    },
  ];
  isFirstCall?: boolean;
}
export interface uploadImageAction {
  type: string;
  payload: uploadImage;
}
export interface uploadImage {
  s3_url: string;
}
export interface isCollpas {
  collaps: boolean;
}

export interface isCollapsAction {
  type: string;
  payload: isCollpas;
}
export interface selectAll {
  select: boolean;
}

export interface selectAllRecipientsAction {
  type: string;
  payload: selectAll;
}
export interface selectedRecipientsAction {
  type: string;
  payload: Recipient;
}
export interface selectedRecipients {
  ids: [];
  recipients?: [
  ];
}

export interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicUrl: string;
}