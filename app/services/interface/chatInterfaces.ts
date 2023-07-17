export interface chatListQuery {
  pageNumber?: number;
  primary_filter?: string;
  secondary_filter?: string;
  hasNextpage?: boolean;
  chatCount?: number;
  availableChatCount?: number;
}

// chatlist action types
export interface chatListAction {
  type: string;
  payload: chatListQuery;
}
export interface chatListFilter {
  limit?: number;
  pageNumber?: number;
  search?: string;
  primary_filter?: string;
  secondary_filter?: string;
}
export interface chatLisFiltertAction {
  type: string;
  payload: chatListFilter;
}

export interface chatDeleInterface {
  chatUid: string;
}
export interface chatDeleteAction {
  type: string;
  payload: chatDeleInterface;
}

export interface tabInterface {
  type: string;
  payload: string;
}

export interface readCount {
  candidate_id: string;
  chatUid: string;
}
