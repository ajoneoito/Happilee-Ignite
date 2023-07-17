export interface chatHistoryQuery {
  pageNumber?: number;
  limit?: number;
  chat_uid?: string;
}

export interface setChatHistoryQuery {
  type: string;
  payload: chatHistoryQuery;
}

export interface chatHistory {
  pageNumber?: number;
  hasNextPage?: boolean;
  count?: number;
  chatUid?: string;
  candidatePhoneNumber?: string;
}

export interface setChatHistory {
  type: string;
  payload: chatHistory;
}

export interface textMessageBody {
  candidate_id: string;
  message: string;
}

export interface statusChangeBody {
  chatUid: string;
  status: string;
}
