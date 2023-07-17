/**
 * tags list Middleware
 * @module Tags Saga
 * @desc Middleware containes tags services.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {call, put, takeEvery} from 'redux-saga/effects';
import {stopSpinner} from '../slices/spinner.slice';
import {AxiosResponse} from 'axios';
import {getTagListRequest} from '../../services/api/tagRequest';
import {settagList} from '../slices/tagList.slice';
import {settagListQuery} from '../slices/tagListQuery.slice';
import {
  FETCH_TAGS_ACTION,
  UPDATE_TAG_LIST_FILTER,
} from '../actions/tagList.action';
import {setTagListQuery} from '../../services/interface/tagsList';

//update tagName in taglist query while searching
export function* updateTagListFilter(action: setTagListQuery) {
  yield put(settagListQuery(action.payload));
}
//fetch tags list based on tag list query
export function* getTagListSaga(action: setTagListQuery) {
  const response: AxiosResponse = yield call(getTagListRequest, action.payload);
  if (response && response.status === 200) {
    yield put(settagList(response?.data?.data?.PredefinedTags ?? []));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* tagListSaga() {
  yield takeEvery(FETCH_TAGS_ACTION, getTagListSaga);
  yield takeEvery(UPDATE_TAG_LIST_FILTER, updateTagListFilter);
}
