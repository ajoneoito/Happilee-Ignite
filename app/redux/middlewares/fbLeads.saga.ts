import {AxiosResponse} from 'axios';
import {t} from 'i18next';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {API_LIMIT} from '../../constants/pagination';
import {
  fbLeadDataUpdatepRequest,
  getFbAppListRequest,
  getfbLeadHistory,
  getfbLeadListRequest,
  getfbLeadStatusRequest,
  getfbLeadTypeList,
} from '../../services/api/fbLeadsRequest';
import {listFilterAction} from '../../services/interface/fbLeadsInterface';
import {
  ADD_ONS_ACTION,
  FB_LEADS_LIST_ACTION,
  LEAD_DATA_UPDATE_ACTION,
  LEAD_HISTORY_ACTION,
  LEAD_STATUS_ACTION,
  LEAD_TYPE_LIST_ACTION,
} from '../actions/fbLeads.action';
import {setAddonsList} from '../slices/addonsList.slice';
import {setFbLeadHistory} from '../slices/fbLeaddHistory.slice';
import {setFbLeadFilter} from '../slices/fbLeadFilter.slice';
import {setFbLeadsList, setInitialArray} from '../slices/fbLeads.slice';
import {setLeadTypeList} from '../slices/fbLeadTypeList.slice';
import {setLeadStatus} from '../slices/leadStatus.slice';
import {RootState} from '../store/root.reducer';
import { setSkeletonLoading, skeleton } from '../slices/skeleton.slice';
const getFbLeadFilterState = (state: RootState) => state.fbLeadFilter;

export function* addonsSaga(action: any) {
  const response: AxiosResponse = yield call(
    getFbAppListRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(setAddonsList(response.data.data));
  }
}
export function* fbLeadsSaga(action: any) {
  const response: AxiosResponse = yield call(
    getfbLeadListRequest,
    action.payload,
  );
 
  if (response && response.status === 200) {
    const fbLeadFilter: listFilterAction = yield select(getFbLeadFilterState);
    // const fbLead: listFilterAction = yield select(getLeads);

    if (action.payload.search != '') {
      yield put(setInitialArray());
    }
    let hasNextPage: boolean = false;
    if (response.data.data.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setFbLeadFilter({
        ...fbLeadFilter,
        hasNextPage: hasNextPage,
        pageNumber: action?.payload?.pageNumber,
      }),
    );
    if(response.data.data.length >0){
      yield put(setSkeletonLoading({skeleton:true}));
    }else{
      yield put(setSkeletonLoading({skeleton:false})); 
    }
    yield put(setFbLeadsList(response?.data));
    
  }else{
   
  }
}
export function* leadStatus() {
  const response: AxiosResponse = yield call(getfbLeadStatusRequest);
  if (response && response.status === 200) {
    yield put(setLeadStatus(response.data.data));
  }
}
export function* leadHistory(action: any) {
  const response: AxiosResponse = yield call(getfbLeadHistory, action.payload);
  if (response && response.status === 200) {
    yield put(setFbLeadHistory(response.data.data));
  }
}
export function* leadTypeList() {
  const response: AxiosResponse = yield call(getfbLeadTypeList);
  if (response && response.status === 200) {
    yield put(setLeadTypeList(response.data.data));
  }
}
export function* fbLeadDataUpdateSaga(action: any) {
  const response: AxiosResponse = yield call(
    fbLeadDataUpdatepRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: t('authSaga:ALERT_SUCCESS_TITLE'),
      textBody: response?.data?.message,
    });
  }
}
export function* FbLeadsSaga() {
  yield takeEvery(ADD_ONS_ACTION, addonsSaga);
  yield takeEvery(FB_LEADS_LIST_ACTION, fbLeadsSaga);
  yield takeEvery(LEAD_STATUS_ACTION, leadStatus);
  yield takeEvery(LEAD_HISTORY_ACTION, leadHistory);
  yield takeEvery(LEAD_TYPE_LIST_ACTION, leadTypeList);
  yield takeEvery(LEAD_DATA_UPDATE_ACTION, fbLeadDataUpdateSaga);
}