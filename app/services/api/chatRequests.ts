/**
 * ChatRequests
 * @module ChatRequests
 * @desc The request used for chat.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {chatEndPoint} from '../enums/chatEndpoint';
import {
  chatListFilter,
  chatDeleInterface,
  readCount,
} from '../interface/chatInterfaces';
import {request} from '../request/request';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
/**
 * Get chat list axios request.
 * @param {chatListFilter} params Filter query params.
 * @returns Axios response.
 */
export const getChatListRequest = async (params: chatListFilter) => {
  const response = await request
    .get(chatEndPoint.chatList, {params: params})
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
 * Delete chat request.
 * @param {chatDeleInterface} params chat uid as param.
 * @returns Axios response.
 */
export const deleteChatRequest = async (body: chatDeleInterface) => {
  const response = await request
    .post(chatEndPoint.deleteChat, body)
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
 * Update message read count.
 * @param {readCount} params chat uid as param.
 * @returns Axios response.
 */
export const readCountUpdateRequest = async (body: readCount) => {
  const response = await request
    .post(chatEndPoint.updateReadCount, body)
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
 * Get global chat list axios request (admin only).
 * @param {chatListFilter} params Filter query params.
 * @returns Axios response.
 */
export const getGlobalChatListRequest = async (params: chatListFilter) => {
  const response = await request
    .get(chatEndPoint.atsGlobalChatList, {params: params})
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
