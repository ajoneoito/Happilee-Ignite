/**
 * Project Services
 * @module ProjectRequests
 * @desc Project related requests.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {projectEndPoint} from '../enums/projectEndpoints';
import {projectTokenGen} from '../interface/projectListing';
import {request} from '../request/request';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';

/**
 * Projet listing axios request.
 * @returns Axios response.
 */
export const projectListingRequest = async () => {
  const response = await request
    .get(projectEndPoint.listProjects)
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
 * Projet token generation axios request.
 * @returns Axios response.
 */
export const projectTokenGenRequest = async (body: projectTokenGen) => {
  const response = await request
    .post(projectEndPoint.generateProjectToken, body)
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
