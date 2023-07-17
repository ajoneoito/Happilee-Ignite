import {AxiosResponse} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {startNewChatRequest} from '../../services/api/templateRequests';
import {START_NEW_CHAT_ACTION} from '../actions/templates.action';
import {stopSpinner} from '../slices/spinner.slice';
import {navigate} from '../../navigation/useNavigationUtils';
import {routeEnum} from '../../enums/route.enum';

export function* startNewChatSaga(action: any) {
  //start new chat request.
  const response: AxiosResponse = yield call(
    startNewChatRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: response?.data?.message,
    });
    navigate(routeEnum.HOMESCREEN);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* newChatSaga() {
  yield takeEvery(START_NEW_CHAT_ACTION, startNewChatSaga);
}
