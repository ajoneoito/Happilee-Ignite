import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {fbLeadEndPoint} from '../enums/fbLeadsEndpoint';
import {fbLeads, fbLeadUpdate, leadHistory, listapps} from '../interface/fbLeadsInterface';
import {request} from '../request/request';

/**
 * Get addons list request.
 * @param {listapps} params addons list query params.
 * @returns Axios response.
 */
export const getFbAppListRequest = async (params: listapps) => {
  const response = await request
    .get(fbLeadEndPoint.listApps, {params: params})
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
 * Get fb leads list request.
 * @param {fbLeads} params fb leads list query params.
 * @returns Axios response.
 */
export const getfbLeadListRequest = async (params: fbLeads) => {
  const response = await request
    .get(fbLeadEndPoint.fbLeadList, {params: params})
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
 * Get fb status list request.
 * @returns Axios response.
 */
export const getfbLeadStatusRequest = async () => {
  const response = await request
    .get(fbLeadEndPoint.listStatusFilter, {})
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
 * Get fbLead History request.
 * @param {leadHistory} params fbLead History query params.
 * @returns Axios response.
 */
export const getfbLeadHistory = async (params: leadHistory) => {
  const response = await request
    .get(fbLeadEndPoint.fbLeadHistory, {params: params})
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
 * Get fbLead field type List request.
 * @returns Axios response.
 */
export const getfbLeadTypeList = async () => {
  const response = await request
    .get(fbLeadEndPoint.fieldTypeList)
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
 * fbLeadDataUpdate Request.
 * @param {fbLeadUpdate} body Request body.
 * @returns Axios response.
 */
export const fbLeadDataUpdatepRequest = async (body: fbLeadUpdate) => {
  const response = await request
    .post(fbLeadEndPoint.fbLeadDataUpdate, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        // title: t('authRequest:ALERT_FAILED_TITLE'),
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};