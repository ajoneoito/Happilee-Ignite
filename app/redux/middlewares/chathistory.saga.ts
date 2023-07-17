/**
 * Chat history Middleware
 * @module ChatHistory Saga
 * @desc Middleware containes chat history services.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {call, put, takeEvery} from 'redux-saga/effects';
import {startSpinner, stopSpinner} from '../slices/spinner.slice';
import {AxiosResponse} from 'axios';
import {
  getChatHistoryRequest,
  sendTextMessgaeCandidate,
  changeChatStatusRequest,
  sendMediaMessage,
  getGlobalChatHistoryRequest,
} from '../../services/api/chatHistoryRequests';
import {setchatListFilter} from '../slices/chatlistfilter.slice';
import {
  CHAT_HISTORY_FILTER_ACTION,
  GET_CHAT_HISTORY_ACTION,
  SEND_TEXT_MESSAGE_ACTION,
  CHANGE_CHAT_STATUS_ACTION,
  SEND_MEDIA_MESSAGE,
  SEND_MEDIA_MESSAGE_TO_CHAT,
  GET_GLOBAL_CHAT_HISTORY_ACTION,
  SEND_GLOBAL_TEXT_MESSAGE_ACTION,
} from '../actions/chathistory.action';
// import { textMessageBody } from '../../services/interface/chatHistory';
import {addMultipleChatHistory} from '../../utils/database/realmHooks/useChatHistory';
import {setchatHistory} from '../slices/chathistory.slice';
import Sounds from '../../utils/functions/sounds';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {setIMageToUpload} from '../slices/imageToUpload.slice';
import {globalStartNewChatRequest} from '../../services/api/templateRequests';

export function* updateChatHistoryQuery(action: any) {
  yield put(setchatListFilter(action.payload));
}

//Get chat history action.
export function* getChatHistory(action: any) {
  //Request chat history with given params.
  //Update or save the response in local db.
  // if (action?.payload?.pageNumber > 4) {
  //   yield put(
  //     startSpinner({
  //       spinning: true,
  //       title: 'Please wait',
  //       body: 'Fetching History',
  //     }),
  //   );
  // }
  const response: AxiosResponse = yield call(
    getChatHistoryRequest,
    action.payload,
  );
  if (response && response?.status === 200) {
    let data = response?.data?.data;
    let hasNextPage: boolean = false;
    if (data?.chatHistory?.length === 30) {
      hasNextPage = true;
    }
    yield put(
      setchatHistory({
        hasNextPage: hasNextPage,
        pageNumber: action?.payload?.pageNumber,
        count: data?.count,
        chatUid: action?.payload?.chat_uid,
        candidatePhoneNumber: data.candidatePhoneNumber,
      }),
    );
    yield addMultipleChatHistory(data.chatHistory);
    yield put(
      stopSpinner({
        spinning: false,
      }),
    );
    // if (action.payload.pageNumber === 1) {
    //   const item: ChatListInterface = yield checkExistChat(
    //     action.payload.chat_uid,
    //   );
    //   if (item) {
    //     navigate(routeEnum.CHATBOX, {data: item});
    //   }
    // }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Get global chat history action.
export function* getGlobalChatHistory(action: any) {
  const response: AxiosResponse = yield call(
    getGlobalChatHistoryRequest,
    action.payload,
  );
  if (response && response?.status === 200) {
    let data = response?.data?.data;
    let hasNextPage: boolean = false;
    if (data?.chatHistory?.length === 30) {
      hasNextPage = true;
    }
    yield put(
      setchatHistory({
        hasNextPage: hasNextPage,
        pageNumber: action?.payload?.pageNumber,
        count: data?.count,
        chatUid: action?.payload?.chat_uid,
        candidatePhoneNumber: data.candidatePhoneNumber,
      }),
    );
    yield addMultipleChatHistory(data.chatHistory);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Send text message action saga.
export function* sendTextMessageSaga(action: any) {
  //Request chat history with given params.
  //Update or save the response in local db.
  const response: AxiosResponse = yield call(
    sendTextMessgaeCandidate,
    action.payload,
  );
  if (response && response.status === 200) {
    Sounds.send.play();
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

//Send global text message action saga.
export function* sendGlobalTextMessageSaga(action: any) {
  //Request chat history with given params.
  //Update or save the response in local db.
  const response: AxiosResponse = yield call(
    globalStartNewChatRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    Sounds.send.play();
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* sendFileToChat(action: any) {
  yield put(setIMageToUpload(action.payload));
}

export function* sendMediaMessageSaga(action: any) {
  //Request chat history with given params.
  //Update or save the response in local db.
  const response: AxiosResponse = yield call(
    sendMediaMessage,
    action.payload.params,
    action.payload.file,
  );
  if (response && response.status === 200) {
    Sounds.send.play();
  }
}
//Update chat status saga.
export function* updateChatStatusSaga(action: any) {
  const response: AxiosResponse = yield call(
    changeChatStatusRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Status updated successfully.',
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* chatHistorySaga() {
  yield takeEvery(CHAT_HISTORY_FILTER_ACTION, updateChatHistoryQuery);
  yield takeEvery(GET_CHAT_HISTORY_ACTION, getChatHistory);
  yield takeEvery(GET_GLOBAL_CHAT_HISTORY_ACTION, getGlobalChatHistory);
  yield takeEvery(SEND_TEXT_MESSAGE_ACTION, sendTextMessageSaga);
  yield takeEvery(SEND_GLOBAL_TEXT_MESSAGE_ACTION, sendGlobalTextMessageSaga);
  yield takeEvery(CHANGE_CHAT_STATUS_ACTION, updateChatStatusSaga);
  yield takeEvery(SEND_MEDIA_MESSAGE, sendMediaMessageSaga);
  yield takeEvery(SEND_MEDIA_MESSAGE_TO_CHAT, sendFileToChat);
}
