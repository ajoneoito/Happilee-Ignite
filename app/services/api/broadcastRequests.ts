/**
 * Broadcast Requests
 * @module BroadcastRequests
 * @desc Broadcast related requests.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {
  broadcasTagtList,
  broadcastListFilter,
  broadcastLog,
  broadcastMessage,
  broadcastRecipientsList,
} from '../interface/broadcastInterface';
import {request} from '../request/request';
import crashlytics from '@react-native-firebase/crashlytics';
import {broadcastEndPoint} from '../enums/broadcastEndpoint';
import {Toast, ALERT_TYPE} from '../../components/AlertComponent';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Appconfig} from '../../config/config';
import axios from 'axios';

/**
 * Get message broadcast list request.
 * @param {broadcastListFilter} params broadcast list query params.
 * @returns Axios response.
 */
export const getBroadcastRequest = async (params: broadcastListFilter) => {
  const response = await request
    .get(broadcastEndPoint.broadcastHistory, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(error);
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
 * Get message broadcast Recipients list request.
 * @param {broadcastRecipientsList} params template list query params.
 * @returns Axios response.
 */
export const getRecipientsRequest = async (body: broadcastRecipientsList) => {
  const response = await request
    .post(broadcastEndPoint.recipientslist, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(error);
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
 *  Broadcast message send  request.
 * @param {broadcastMessage} params  Broadcast send message  params.
 * @returns Axios response.
 */
export const BroadcastMessageRequest = async (body: broadcastMessage) => {
  const response = await request
    .post(broadcastEndPoint.broadcastSendMessage, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(new Error(JSON.stringify(error)));
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
 * Get message broadcast tags list request.
 * @param {broadcasTagtList} params broadcast tag list query params.
 * @returns Axios response.
 */
export const getBroadcastTagRequest = async (params: broadcasTagtList) => {
  const response = await request
    .get(broadcastEndPoint.broadcastPredefinedTags, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(error);
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
 * Get message broadcast filter request.
 * @param {broadcasTagtList} params broadcast tag list query params.
 * @returns Axios response.
 */
export const getBroadcastFilterParameterRequest = async (
  params: broadcasTagtList,
) => {
  const response = await request
    .get(broadcastEndPoint.BroadcastFilterParameters, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(error);
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
 * Get message broadcast filter request.
 * @param {broadcastLog} params broadcast tag list query params.
 * @returns Axios response.
 */
export const getBroadcastLog = async (params: broadcastLog) => {
  const response = await request
    .get(broadcastEndPoint.BroadcastLog, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      crashlytics().recordError(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};
// upload csv request
const MMKV = new MMKVLoader().initialize();
const getToken = async () => {
  let string = await MMKV.getStringAsync('authToken');
  return string;
};

export const uploadCsv = async (params, body) => {
  const response = await axios
    .post(
      `${Appconfig.BASE_URL}/broadcastQueueProvider?template_id=${params.template_id}&name=${params.name}`,
      body,
      {
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

// broadcast upload image request
export const getBroadcastUploadFileRequest = async body => {
  const response = await axios
    .post(`${Appconfig.BASE_URL}/uploadFileToStorage`, body, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
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
