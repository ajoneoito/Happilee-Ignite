/**
 * Spinner
 * @module Spinner Saga
 * @desc Middleware for manage spinning component.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {put, takeEvery} from 'redux-saga/effects';
import {
  SPINNER_ACTION,
  START_SPINNER_ACTION,
  STOP_SPINNER_ACTION,
} from '../actions/spinner.action';
import {setSpinner, startSpinner, stopSpinner} from '../slices/spinner.slice';

//Spinner manage action, change spinner content and start or stop.
export function* manageSpinnerSaga(action: any) {
  yield put(setSpinner(action.payload));
}

//Start spinner.
export function* startSpinnerSaga(action: any) {
  yield put(startSpinner(action));
}

//Stop spinner.
export function* stopSpinnerSaga(action: any) {
  yield put(stopSpinner(action));
}

export function* SpinnerSaga() {
  yield takeEvery(SPINNER_ACTION, manageSpinnerSaga);
  yield takeEvery(START_SPINNER_ACTION, startSpinnerSaga);
  yield takeEvery(STOP_SPINNER_ACTION, stopSpinnerSaga);
}
