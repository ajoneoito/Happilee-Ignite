/**
 * template  Middleware
 * @module Template Saga
 * @desc Middleware containes template services.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  GLOBAL_TEMPLATE_LIST_ACTION,
  TEMPLATE_LIST_ACTION,
  TEMPLATE_LIST_FILTER_ACTION,
} from '../actions/templates.action';
import {AxiosResponse} from 'axios';
import {stopSpinner} from '../slices/spinner.slice';
import {call, put, takeEvery} from 'redux-saga/effects';
import {setTemplates} from '../slices/templates.slice';
import {settemplateListFilter} from '../slices/templatefilter.slice';
import {
  getGlobalTemplateListRequest,
  getTemplateListRequest,
} from '../../services/api/templateRequests';

export function* templateListSaga(action: any) {
  //template list request.
  const response: AxiosResponse = yield call(
    getTemplateListRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(setTemplates(response?.data?.templates.rows));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* globalTemplateListSaga(action: any) {
  //template list request.
  const response: AxiosResponse = yield call(
    getGlobalTemplateListRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(setTemplates(response?.data?.templates.rows));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* updateTemplateListFilter(action: any) {
  yield put(settemplateListFilter(action.payload));
}

export function* TemplateSaga() {
  yield takeEvery(TEMPLATE_LIST_ACTION, templateListSaga);
  yield takeEvery(GLOBAL_TEMPLATE_LIST_ACTION, globalTemplateListSaga);
  yield takeEvery(TEMPLATE_LIST_FILTER_ACTION, updateTemplateListFilter);
}
