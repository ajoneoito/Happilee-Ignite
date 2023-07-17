export interface tagListQuery {
  pageNumber?: number;
  limit?: number;
  tagName?: string;
}

export interface setTagListQuery {
  type: string;
  payload: tagListQuery;
}

export interface tagList {
  id: string;
  tagName: string;
}

export interface setTagList {
  type: string;
  payload: tagList;
}
