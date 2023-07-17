export interface spinnerTypes {
  spinning: boolean;
  title?: string;
  body?: string;
}

export interface spinnerAction {
  type: string;
  payload: spinnerTypes;
}
