/**
 * chatHistoryRequest
 * @module ChatHistoryRequests
 * @desc The requests related chat history screen.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {chatDetailsPoint} from '../enums/chatDetailsEndpoints';
import {chatHistoryQuery, statusChangeBody} from '../interface/chatHistory';
import {textMessageBody} from '../interface/chatHistory';
import {request} from '../request/request';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import axios from 'axios';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Appconfig} from '../../config/config';

/**
 * Get chat history axios request.
 * @param {chatHistoryQuery} params Filter query params.
 * @returns Axios response.
 */
export const getChatHistoryRequest = async (params: chatHistoryQuery) => {
  const response = await request
    .get(chatDetailsPoint.chatHistory, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

const MMKV = new MMKVLoader().initialize();
const getToken = async () => {
  let string = await MMKV.getStringAsync('authToken');
  return string;
};

export const sendMediaMessage = async (params: any, body: any) => {
  const response = await axios
    .post(
      `${Appconfig.BASE_URL}/sendMediaMessage?candidate_id=${params.candidate_id}&media_id=${params.media_id}&file_path=${params.file_path}`,
      body,
      {
        onUploadProgress: function (progressEvent) {
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

/**
 * Send text message to candidate.
 * @param {textMessageBody} params Filter query params.
 * @returns Axios response.
 */
export const sendTextMessgaeCandidate = async (body: textMessageBody) => {
  const response = await request
    .post(chatDetailsPoint.sendTextMessage, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

/**
 * Update chat status.
 * @param {statusChangeBody} params Filter query params.
 * @returns Axios response.
 */
export const changeChatStatusRequest = async (body: statusChangeBody) => {
  const response = await request
    .post(chatDetailsPoint.changeStatus, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

/**
 * Get global chat history axios request.
 * @param {chatHistoryQuery} params Filter query params.
 * @returns Axios response.
 */
export const getGlobalChatHistoryRequest = async (params: chatHistoryQuery) => {
  const response = await request
    .get(chatDetailsPoint.globalChatHistory, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};
