/**
 * Tab Middleware
 * @module Tab Saga
 * @desc For setting active tab of home screen on select
 * State used for working with header filter options in diffrent case.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {put, takeEvery} from 'redux-saga/effects';

import {SET_ACTIVE_TAB_ACTION} from '../actions/tab.action';
import {setTab} from '../slices/tab.slice';

//Change tab action.
export function* setActiveTabSaga(action: any) {
  yield put(setTab(action));
}

export function* TabSaga() {
  yield takeEvery(SET_ACTIVE_TAB_ACTION, setActiveTabSaga);
}
