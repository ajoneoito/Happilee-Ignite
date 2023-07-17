/**
 * Tag Requests
 * @module Tag Requests
 * @desc The request used for tag list.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {tagListEndpoint} from '../enums/tagListEndpoint';
import {tagListQuery} from '../interface/tagsList';
import {request} from '../request/request';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
/**
 * Get contact list axios request.
 * @param {contactListFilter} params Filter query params.
 * @returns Axios response.
 */
export const getTagListRequest = async (params: tagListQuery) => {
  const response = await request
    .get(tagListEndpoint.tagList, {params: params})
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
