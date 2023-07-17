/**
 * broadcast  Middleware
 * @module Broadcast Saga
 * @desc Middleware containes broadcast services.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  getBroadcastRequest,
  getRecipientsRequest,
  getBroadcastTagRequest,
  BroadcastMessageRequest,
  getBroadcastFilterParameterRequest,
  getBroadcastLog,
  uploadCsv,
  getBroadcastUploadFileRequest,
} from '../../services/api/broadcastRequests';
import {
  BROADCAST_FILTER_PARAMS_ACTION,
  BROADCAST_LIST_ACTION,
  BROADCAST_LOG_ACTION,
  BROADCAST_RECIPIENTS_ACTION,
  BROADCAST_SEND_MESSAGE_ACTION,
  BROADCAST_TAG_LIST_ACTION,
  UPLOAD_BROADCAST_FILE,
  UPLOAD_CSV_ACTION,
} from '../actions/broadcastList.action';
import {AxiosResponse} from 'axios';
import {RootState} from '../store/root.reducer';
import {routeEnum} from '../../enums/route.enum';
import {API_LIMIT, REALM_LIMIT, REALM_OFFSET} from '../../constants/pagination';
import {setbroadcastList} from '../slices/broadcast.slice';
import {setBroadcastLog} from '../slices/broadcastLog.slice';
import {navigate} from '../../navigation/useNavigationUtils';
import {setSpinner, stopSpinner} from '../slices/spinner.slice';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {setbroadcastTagList} from '../slices/broadcastTagList.slice';
import {setBroadcastRecipients} from '../slices/broadcastRecipients.slice';
import {setbroadcastFileUpload} from '../slices/broadcastFileUpload.slice';
import {setBroadcastFilterParams} from '../slices/broadcastFilterPrams.slice';
import {
  broadcastFilter,
  broadcastListQuery,
} from '../../services/interface/broadcastInterface';
import {
  addMultipleBroadcast,
  getAllBroadcast,
} from '../../utils/database/realmHooks/useBroadcast';
import {setRecipientsFilter} from '../slices/recipientsFilter.slice';
import {setBroadcastListItems} from '../slices/broadcastList.slice';
import {setBroadcastListCollection} from '../slices/broadcastListCollection.slice';
import {setUpdateBroadcast} from '../slices/updateBroadcast.slice';
import { setBroadcastRecipientsFilter } from '../slices/broadcastRecipientsFilter.slice';
const getBroadcastListQuery = (state: RootState) => state.broadcast;
const getContactListQuery = (state: RootState) => state.recipientsFilter;
const getAuth = (state: RootState) => state.auth;
const getBroadcastLogQuery = (state: RootState) => state.broadcastRecipientsFilter;



export function* broadcastListSaga(action: any) {
  //broadcast list request.
  const response: AxiosResponse = yield call(
    getBroadcastRequest,
    action.payload,
  );

  if (response && response.status === 200) {
    const broadcastList: broadcastListQuery = yield select(
      getBroadcastListQuery,
    );
    let hasNextPage: boolean = false;
    if (response.data.data.broadcastDetails.rows?.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setbroadcastList({
        ...broadcastList,
        hasNextpage: hasNextPage,
      }),
    );
    if (action.payload.search != '') {
      yield put(
        setBroadcastListCollection(response.data.data.broadcastDetails.rows),
      );
    }

    yield addMultipleBroadcast(response.data.data.broadcastDetails.rows ?? []);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* recipientsListSaga(action: any) {
  // Broadcast recipients list request.
  const response: AxiosResponse = yield call(
    getRecipientsRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(setBroadcastRecipients(response?.data?.candidates));
    const recipientsListFilter: broadcastFilter = yield select(
      getContactListQuery,
    );
    let hasNextPage: boolean = false;
    if (response?.data?.candidates.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setRecipientsFilter({
        ...recipientsListFilter,
        hasNextPage: hasNextPage,
      }),
    );
  }

  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* broadcastMessageSaga(action: any) {
  // Broadcast send message list request.

  const response: AxiosResponse = yield call(
    BroadcastMessageRequest,
    action.payload,
  );

  if (response && response.status === 200) {
    yield put({
      type: BROADCAST_LIST_ACTION,
      payload: {
        limit: API_LIMIT,
        pageNumber: 1,
        sort: 'createdAt',
        order: 'DESC',
      },
    });
    yield put(setUpdateBroadcast({update: true}));

    navigate(routeEnum.HOMESCREEN);
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
export function* broadcastTagListSaga(action: any) {
  // Broadcast tag list request.

  const response: AxiosResponse = yield call(
    getBroadcastTagRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(setbroadcastTagList(response?.data?.data?.PredefinedTags));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* broadcastFilterListSaga(action: any) {
  // Broadcast filter list request.

  const response: AxiosResponse = yield call(
    getBroadcastFilterParameterRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(
      setBroadcastFilterParams(response?.data?.data?.candidateCustomParameters),
    );
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* broadcastLogSaga(action: any) {
  // Broadcast log list request.

  const response: AxiosResponse = yield call(getBroadcastLog, action.payload);
  if (response && response.status === 200) {
    if(action.payload.pageNumber === 1){
      yield put(setBroadcastLog(response?.data?.data));
    
    }else{
      yield put (setBroadcastLog({
        broadcast_data:response?.data?.data.broadcast_data,
        recipient_list: response?.data?.data.recipient_list,
        isFirstCall: true,
      }))

    
    }
    const broadcastRecipientsFilter: broadcastFilter = yield select(
      getBroadcastLogQuery,
    );
    let hasNextPage: boolean = false;
    if (response?.data?.data.recipient_list.length === API_LIMIT) {
      hasNextPage = true;
    }
    
    yield put(
      setBroadcastRecipientsFilter({ 
        ...broadcastRecipientsFilter,
        hasNextPage: hasNextPage,
        pageNumber:action.payload.pageNumber
      }),
    );
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* sendCsvSaga(action: any) {
  // Broaddcast send csv.
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Sending Media.',
    }),
  );

  const response: AxiosResponse = yield call(
    uploadCsv,
    action.payload.params,
    action.payload.file,
  );

  if (response && response.status === 200) {
    yield put({
      type: BROADCAST_LIST_ACTION,
      payload: {
        limit: API_LIMIT,
        pageNumber: 1,
        sort: 'createdAt',
        order: 'DESC',
      },
    });
    yield put(setUpdateBroadcast({update: true}));

    navigate(routeEnum.HOMESCREEN);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Successfull',
      textBody: response?.data?.message,
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* broadcastUploadFileSaga(action: any) {
  // Broadcast  Upload File Saga
  const response: AxiosResponse = yield call(
    getBroadcastUploadFileRequest,
    action.payload,
  );

  if (response && response.status === 200) {
    yield put(setbroadcastFileUpload(response.data.data));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* BroadcastSaga() {
  yield takeEvery(BROADCAST_LIST_ACTION, broadcastListSaga);
  yield takeEvery(BROADCAST_RECIPIENTS_ACTION, recipientsListSaga);
  yield takeEvery(BROADCAST_SEND_MESSAGE_ACTION, broadcastMessageSaga);
  yield takeEvery(BROADCAST_TAG_LIST_ACTION, broadcastTagListSaga);
  yield takeEvery(BROADCAST_FILTER_PARAMS_ACTION, broadcastFilterListSaga);
  yield takeEvery(BROADCAST_LOG_ACTION, broadcastLogSaga);
  yield takeEvery(UPLOAD_CSV_ACTION, sendCsvSaga);
  yield takeEvery(UPLOAD_BROADCAST_FILE, broadcastUploadFileSaga);
}
