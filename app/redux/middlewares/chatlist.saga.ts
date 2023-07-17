/**
 * Chat list Middleware
 * @module ChatList Saga
 * @desc Middleware containes chatlist services.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {call, put, select, takeEvery} from 'redux-saga/effects';
import {setSpinner, stopSpinner} from '../slices/spinner.slice';
import {AxiosResponse} from 'axios';
import {
  deleteChatRequest,
  getChatListRequest,
  getGlobalChatListRequest,
  readCountUpdateRequest,
} from '../../services/api/chatRequests';
import {setchatListFilter} from '../slices/chatlistfilter.slice';
import {
  GET_CHATLIST_ACTION,
  CHATLIST_FILTER_ACTION,
  DELETE_CHATLIST_ACTION,
  UPDATE_CHAT_COUNT_ACTION,
  GET_GLOBAL_CHATLIST_ACTION,
} from '../actions/chatlist.action';
import {
  addMultipleChat,
  checkExistChat,
  deleteAllGlobalChats,
  deleteProjectChats,
} from '../../utils/database/realmHooks/useChatList';
import {setchatList} from '../slices/chatlist.slice';
import {RootState} from '../store/root.reducer';
import {chatListQuery} from '../../services/interface/chatInterfaces';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import realm from '../../utils/database/schema';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
import {routeEnum} from '../../enums/route.enum';
import {API_LIMIT} from '../../constants/pagination';
const getChatListQuery = (state: RootState) => state.chatList;
const getAuth = (state: RootState) => state.auth;

//Get chat list action.
export function* getChatListSaga(action: any) {
  //Request chat list with given params.
  //Update or save the response in local db.
  const response: AxiosResponse = yield call(
    getChatListRequest,
    action.payload,
  );
  const auth: any = yield select(getAuth);
  if (response && response?.status === 200) {
    //Added for update data with deleted message, remove it if you have delete property in chatlist response.
    if (response?.data?.pageNumber === '1') {
      // below line commented out as the deletion casuing error while search filtering
      yield call(deleteProjectChats, auth?.projectId); //pass current project id
    }
    const chatList: chatListQuery = yield select(getChatListQuery);
    let hasNextPage: boolean = false;
    if (response?.data?.chatList?.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setchatList({
        ...chatList,
        hasNextpage: hasNextPage,
        pageNumber: parseInt(response.data?.pageNumber, 10),
        primary_filter: response.data?.primaryFilter,
        secondary_filter: response.data?.secondaryFilter,
        chatCount: response.data?.chatCount,
        availableChatCount: response.data?.availableChatCount,
      }),
    );
    yield call(addMultipleChat, response.data?.chatList ?? []);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Delete chat saga
export function* deleteChatSaga(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Deleting Contact',
    }),
  );
  //Request for delete chat from server using chatuid.
  const response: AxiosResponse = yield call(deleteChatRequest, action.payload);
  if (response && response.status === 200) {
    if (action.from === 'ContactMainScreen') {
      navigate(routeEnum.HOMESCREEN);
    }
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: response.data?.message,
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Update chat list query
export function* updateChatListFilter(action: any) {
  yield put(setchatListFilter(action.payload));
}

// Update chat read count
export function* updateReadCountSaga(action: any) {
  //Request for delete chat from server using chatuid.
  const response: AxiosResponse = yield call(
    readCountUpdateRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    let chat = checkExistChat(action.payload.chatUid);
    if (chat) {
      realm.write(() => {
        chat.currentUnreadMessageCount = 0;
      });
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* getGlobalChatListSaga(action: any) {
  const response: AxiosResponse = yield call(
    getGlobalChatListRequest,
    action.payload,
  );
  if (response && response?.status === 200) {
    if (response?.data?.pageNumber === '1') {
      yield call(deleteAllGlobalChats);
    }
    const chatList: chatListQuery = yield select(getChatListQuery);
    let hasNextPage: boolean = false;
    if (response?.data?.chatList?.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setchatList({
        ...chatList,
        hasNextpage: hasNextPage,
        pageNumber: parseInt(response.data?.pageNumber, 10),
        primary_filter: response.data?.primaryFilter,
        secondary_filter: response.data?.secondaryFilter,
        chatCount: response.data?.chatCount,
        availableChatCount: response.data?.availableChatCount,
      }),
    );
    yield call(addMultipleChat, response.data?.chatList ?? []);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* chatListSaga() {
  yield takeEvery(GET_CHATLIST_ACTION, getChatListSaga);
  yield takeEvery(GET_GLOBAL_CHATLIST_ACTION, getGlobalChatListSaga);
  yield takeEvery(CHATLIST_FILTER_ACTION, updateChatListFilter);
  yield takeEvery(DELETE_CHATLIST_ACTION, deleteChatSaga);
  yield takeEvery(UPDATE_CHAT_COUNT_ACTION, updateReadCountSaga);
}
