/**
 * Authentication Middleware
 * @module Auth Saga
 * @desc Middleware containes authentication services.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
  preLoginRequest,
  verifyEmailOtpRequest,
  refreshAuthTokenRequest,
  updateInfoRequest,
  fcmSubscribeRequest,
  userlogoutRequest,
} from '../../services/api/authRequests';
import {
  AGREE_POLICY_ACTION,
  LOGIN_PRECHECK_ACTION,
  SEND_MAIL_OTP_ACTION,
  SEND_MOBILE_OTP_ACTION,
  VERIFY_MAIL_OTP_ACTION,
  VERIFY_MOBILE_OTP_ACTION,
  REFRESH_AUTH_TOKEN_ACTION,
  OPERATOR_UPDATE_INFO_ACTION,
  USER_LOGOUT_ACTION,
} from '../actions/auth.action';
import {AxiosResponse} from 'axios';
import {setAuth} from '../slices/auth.slice';
import {RootState} from '../store/root.reducer';
import {
  auth as authInterface,
  fcmSubBody,
} from '../../services/interface/preLogin';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
import {routeEnum} from '../../enums/route.enum';
import {Toast, ALERT_TYPE} from '../../components/AlertComponent';
import auth from '@react-native-firebase/auth';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {setSpinner, stopSpinner} from '../slices/spinner.slice';
import i18next from 'i18next';
import {projectListingRequest} from '../../services/api/projectRequests';
import {getUniqueId} from 'react-native-device-info';

import {
  addMultipleProject,
  deleteAllProject,
} from '../../utils/database/realmHooks/useProjects';
import {GetFCMToken} from '../../utils/functions/messaging';
//Accept policy action.

const {t} = i18next;

export function* enablePolicy(action: any) {
  yield put(setAuth(action));
}
//Auth state loading for update
const getAuth = (state: RootState) => state.auth;

// Create a new Loader Class.
const MMKV = new MMKVLoader().initialize();

//Login precheck action.
export function* loginPreckeck(action: any) {
  //Request and confirm user exist with login method and value in body.
  const response: AxiosResponse = yield call(preLoginRequest, action.payload);
  if (response && response.status === 200) {
    const authState: authInterface = yield select(getAuth);
    yield put(
      setAuth({
        ...authState,
        authToken: response?.data?.token,
        refreshToken: response?.data?.refreshToken,
        channelId: response?.data?.operator_channel_name,
        userRole: response?.data?.role,
        permissions: response?.data?.permissions,
        first_name: response?.data?.first_name,
        last_name: response?.data?.last_name,
        operator_id: response?.data.operator_id,
        email: action.payload?.email,
        phone: action.payload?.phone_number,
        country_code: action.payload?.country_code,
      }),
    );
    yield MMKV.setStringAsync('authToken', response?.data?.token);
    if (response?.data?.refreshToken) {
      yield MMKV.setStringAsync('refreshToken', response?.data?.refreshToken);
    }

    // if (response?.data?.role !== '3') {
    //   Toast.show({
    //     type: ALERT_TYPE.WARNING,
    //     title: 'Sorry...',
    //     textBody: 'You are not an operator.',
    //   });
    // } else {
    if (action.payload?.login_type === 'email') {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: t('authSaga:ALERT_VERIFY_TITLE'),
        textBody: response?.data?.message,
      });
      navigate(routeEnum.OTPSCREEN, {
        login_type: 'email',
        email: action.payload?.email,
        phone: action.payload?.phone_number,
        country_code: action.payload?.country_code,
      });
    } else {
      try {
        //Actual funtion.
        const confirmation: any = yield auth().signInWithPhoneNumber(
          '+' +
            action.payload?.country_code +
            ' ' +
            action.payload?.phone_number,
        );

        //set for testing.
        // const confirmation: any = yield auth().signInWithPhoneNumber(
        //   '+91 9061147829',
        // );
        yield put(
          setAuth({
            ...authState,
            confirm: confirmation,
          }),
        );
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: t('authSaga:ALERT_VERIFY_TITLE'),
          textBody:
            'Please check your phone, a verification code has been sent.',
        });
        navigate(routeEnum.OTPSCREEN, {
          login_type: 'number',
          email: action.payload?.email,
          phone: action.payload?.phone_number,
          country_code: action.payload?.country_code,
        });
      } catch (e: any) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: t('authSaga:ALERT_ERROR_TITLE'),
          textBody: e?.message,
        });
      }
    }
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: t('authSaga:ALERT_VERIFY_TITLE'),
      textBody:
        action.payload?.login_type === 'email'
          ? response?.data?.message
          : t('authSaga:OTP_MOBILE'),
    });
    // }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Resend email otp action.
export function* resendMailOtp(_action: any) {
  //call email generate otp request
}

//Verify email otp action.
export function* verifyMailOtp(action: any) {
  //call email verify otp request for login completeion.
  //set logged true only here.
  //navigate to chats screen
  const authState: authInterface = yield select(getAuth);
  const response: AxiosResponse = yield call(
    verifyEmailOtpRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: t('authSaga:ALERT_SUCCESS_TITLE'),
      textBody: response?.data?.message,
    });
    yield put(
      setAuth({
        ...authState,
        logged: true,
        authToken: response?.data?.tokenData?.access_token,
        refreshToken: response?.data?.tokenData?.refresh_token,
      }),
    );
    yield MMKV.setStringAsync(
      'authToken',
      response?.data?.tokenData?.access_token,
    );
    yield MMKV.setStringAsync(
      'refreshToken',
      response?.data?.tokenData?.refresh_token,
    );
    let deviceId = yield getUniqueId();
    let fcmToken = yield GetFCMToken();
    let body: fcmSubBody = {
      device_id: deviceId,
      fcm_token: fcmToken,
    };
    const subscription: AxiosResponse = yield call(fcmSubscribeRequest, body);
    if (subscription && subscription.status === 200) {
      console.warn('subscription success', response.data);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: t('authSaga:ALERT_SUCCESS_TITLE'),
        textBody: response?.data?.message,
      });
    }
    yield put(
      setSpinner({
        spinning: true,
        title: 'Please wait...',
        body: 'Fetching assigned projects.',
      }),
    );
    const projects: AxiosResponse = yield call(projectListingRequest);
    if (projects && projects.status === 200) {
      yield deleteAllProject(); //Delete local project list.
      yield addMultipleProject(projects.data.data); //Update latest operator project.
      //Access projects in project listing screen from local db.
      //navigate to project list page
      resetNavigation({
        index: 1,
        // navigate to project screen if user admin : future feature
        routes: [{name: routeEnum.PROJECTSTACKSCREEN}],
      });
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Resend firebase otp action.
export function* resendMobileOtp(action: any) {
  const authState: authInterface = yield select(getAuth);
  try {
    //Actual funtion.
    const confirmation: any = yield auth().signInWithPhoneNumber(
      '+' + action.payload?.country_code + ' ' + action.payload?.phone_number,
    );
    //set for testing.
    // const confirmation: any = yield auth().signInWithPhoneNumber(
    //   '+91 9061147829',
    // );
    yield put(
      setAuth({
        ...authState,
        confirm: confirmation,
      }),
    );
  } catch (e: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: t('authSaga:ALERT_ERROR_TITLE'),
      textBody: e?.message,
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Verify firebase otp action.
export function* verifyMobileOtp(action: any) {
  const authState: authInterface = yield select(getAuth);
  try {
    yield authState.confirm.confirm(action.payload?.code);
    // call refresh token request.
    const authRefresh: AxiosResponse = yield call(refreshAuthTokenRequest);
    if (authRefresh && authRefresh.status === 200) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: t('authSaga:ALERT_SUCCESS_TITLE'),
        textBody: 'Mobile number verified successfully.',
      });
      yield put(
        setAuth({
          ...authState,
          authToken: authRefresh?.data?.token,
          logged: true,
        }),
      );
      yield MMKV.setStringAsync('authToken', authRefresh?.data?.token);
      yield put(
        setSpinner({
          spinning: true,
          title: 'Please wait...',
          body: 'Fetching assigned projects.',
        }),
      );
      const projects: AxiosResponse = yield call(projectListingRequest);
      if (projects && projects.status === 200) {
        yield deleteAllProject(); //Delete local project list.
        yield addMultipleProject(projects.data.data); //Update latest operator project.
        //Access projects in project listing screen from local db.
        //navigate to project list page
        resetNavigation({
          index: 1,
          // navigate to project screen if user admin : future feature
          // routes: [{name: routeEnum.PROJECTSTACKSCREEN}],
          routes: [{name: routeEnum.PROJECTSTACKSCREEN}],
        });
      }
    }
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: t('authSaga:ALERT_ERROR_TITLE'),
      textBody: 'Invalid or expired verification code!',
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Refresh auth token action
export function* refreshAuthToken() {
  const authState: authInterface = yield select(getAuth);
  const response: AxiosResponse = yield call(refreshAuthTokenRequest);
  if (response && response.status === 200) {
    yield put(
      setAuth({
        ...authState,
        authToken: response?.data?.token,
      }),
    );
    yield MMKV.setStringAsync('authToken', response?.data?.token);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
// operator profile info update action
export function* updateOperatorInfo(action: any) {
  const response: AxiosResponse = yield call(updateInfoRequest, action.payload);
  const authState: authInterface = yield select(getAuth);
  if (response && response.status === 200) {
    yield put(
      setAuth({
        ...authState,
        first_name: action?.payload.first_name,
        last_name: action?.payload.last_name,
        update_info: true,
      }),
    );
    resetNavigation({
      index: 1,
      // navigate to project screen if user admin : future feature
      routes: [{name: routeEnum.PROJECTSTACKSCREEN}],

      // routes: [{name: routeEnum.LOGGEDSCREENS}],
    });
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: response?.data?.message,
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

// user logout saga
export function* userLogoutSaga(action: any) {
  const response: AxiosResponse = yield call(userlogoutRequest, action.payload);
  console.warn('logout response', response);
  const authState: authInterface = yield select(getAuth);
  // if (response && response.status === 200) {
  yield put(
    setAuth({
      ...authState,
      ...auth,
      logged: false,
      authToken: '',
      refreshToken: '',
      channelId: '',
      projectId: '',
    }),
  );
  resetNavigation({
    index: 1,
    routes: [{name: routeEnum.LOGINSCREEN}],
  });
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    // title: '😐😐😐',
    textBody: 'You have been logged out.',
  });
  // }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* AuthSaga() {
  yield takeEvery(AGREE_POLICY_ACTION, enablePolicy);
  yield takeEvery(LOGIN_PRECHECK_ACTION, loginPreckeck);
  yield takeEvery(SEND_MAIL_OTP_ACTION, resendMailOtp);
  yield takeEvery(SEND_MOBILE_OTP_ACTION, resendMobileOtp);
  yield takeEvery(VERIFY_MAIL_OTP_ACTION, verifyMailOtp);
  yield takeEvery(VERIFY_MOBILE_OTP_ACTION, verifyMobileOtp);
  yield takeEvery(REFRESH_AUTH_TOKEN_ACTION, refreshAuthToken);
  yield takeEvery(OPERATOR_UPDATE_INFO_ACTION, updateOperatorInfo);
  yield takeEvery(USER_LOGOUT_ACTION, userLogoutSaga);
}
