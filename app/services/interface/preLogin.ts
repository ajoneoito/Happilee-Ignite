export interface preLogin {
  email: string;
  login_type?: string;
  phone_number?: number;
  country_code?: number;
}

//state auth types
export interface auth {
  policy?: boolean;
  logged?: boolean;
  authToken?: string;
  refreshToken?: string;
  centryfugeToken?: string;
  channelId?: string;
  userRole?: string;
  projectSelected?: boolean;
  projectId?: string;
  permissions?: string[];
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  country_code?: string;
  confirm?: any;
  operator_id: string;
  update_info: boolean;
  projectName: string;
}
// auth action types
export interface authAction {
  type: string;
  payload: auth;
}

// email otp action
export interface emailOtp {
  email: string;
}

//verify email
export interface verifyEmail {
  otp: string;
  type: string;
}

//Refresh token
export interface refreshAuth {
  project_id?: string;
}
// Update operator Info
export interface updateInfo {
  operator_id?: string;
  first_name?: string;
  last_name?: string;
}

//Device fcm subscription
export interface fcmSubBody {
  device_id: string;
  fcm_token: string;
}

//Device fcm unsubscription/logout
export interface logoutBody {
  device_id: string;
}
