/**
 * Contact Requests
 * @module Contact Requests
 * @desc The request used for contact.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {contactPoint} from '../enums/contactEndpoint';
import {
  contactListFilter,
  addContactInterface,
} from '../interface/contactInterface';
import {request} from '../request/request';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';

/**
 * add contact axios request.
 * @param {addContactInterface}
 * @returns Axios response.
 */
export const addContactRequest = async (params: addContactInterface) => {
  const response = await request
    .post(contactPoint.addContact, params)
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
 * Get contact list axios request.
 * @param {contactListFilter} params Filter query params.
 * @returns Axios response.
 */
export const getContactListRequest = async (params: contactListFilter) => {
  const response = await request
    .post(contactPoint.contactList, params)
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
 * @param {contactDeleInterface} params chat uid as param.
 * @returns Axios response.
 */
export const deleteContactRequest = async (body: contactDeleInterface) => {
  const response = await request
    .post(contactPoint.deleteContact, body)
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
