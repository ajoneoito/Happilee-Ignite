/**
 * Template Requests
 * @module TemplateRequests
 * @desc Template related requests.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {templateEndpoint} from '../enums/templateEndpoint';
import {newChat, templateListFilter} from '../interface/templateInterfaces';
import {request} from '../request/request';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Get message template list request.
 * @param {templateListFilter} params template list query params.
 * @returns Axios response.
 */
export const getTemplateListRequest = async (params: templateListFilter) => {
  const response = await request
    .get(templateEndpoint.messageTemplateList, {params: params})
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
 * Start new chat request with template message.
 * @param {newChat} params request body.
 * @returns Axios response.
 */
export const startNewChatRequest = async (body: newChat) => {
  const response = await request
    .post(templateEndpoint.startNewChat, body)
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
 * Get global message template list request.
 * @param {templateListFilter} params template list query params.
 * @returns Axios response.
 */
export const getGlobalTemplateListRequest = async (
  params: templateListFilter,
) => {
  const response = await request
    .get(templateEndpoint.globalTemplateList, {params: params})
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
 * Start new chat request with template message - admin.
 * @param {newChat} params request body.
 * @returns Axios response.
 */
export const globalStartNewChatRequest = async (body: newChat) => {
  const response = await request
    .post(templateEndpoint.globalSendMessage, body)
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