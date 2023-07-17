import {AxiosResponse} from 'axios';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
  projectListingRequest,
  projectTokenGenRequest,
} from '../../services/api/projectRequests';
import {
  addMultipleProject,
  deleteAllProject,
} from '../../utils/database/realmHooks/useProjects';
import {setSpinner, stopSpinner} from '../slices/spinner.slice';
import {
  GET_ALL_PROJECTS_ACTION,
  PROJECT_TOKEN_GENERATION_ACTION,
} from '../actions/project.action';
import {setAuth} from '../slices/auth.slice';
import {RootState} from '../store/root.reducer';
import {auth} from '../../services/interface/preLogin';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {routeEnum} from '../../enums/route.enum';
const MMKV = new MMKVLoader().initialize();

const getAuth = (state: RootState) => state.auth;

// List all project.
export function* listAllProjectSaga() {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Fetching assigned projects.',
    }),
  );
  //Request for latest project list.
  const response: AxiosResponse = yield call(projectListingRequest);
  if (response && response.status === 200) {
    yield deleteAllProject(); //Delete local project list.
    yield addMultipleProject(response?.data?.data); //Update latest operator project.
    //Access projects in project listing screen from local db.
    //navigate to project list page
    navigate(routeEnum.PROJECTSTACKSCREEN);
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

// Project token generation when selecting a project.
export function* projectTokenGenSaga(action: any) {
  const authState: auth = yield select(getAuth);
  //Request for new tokens and channel name.
  const response: AxiosResponse = yield call(
    projectTokenGenRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    yield put(
      setAuth({
        ...authState,
        logged: true,
        projectId: action?.payload?.project_id,
        authToken: response?.data?.tokenData?.access_token,
        refreshToken: response?.data?.tokenData?.refresh_token,
        channelId: response?.data?.channel_name,
        projectName: action?.payload?.project_name,
      }),
    );
    yield MMKV.setStringAsync(
      'authToken',
      response?.data?.tokenData?.access_token,
    );
    yield MMKV.setStringAsync(
      'refreshToken',
      response?.data?.tokenData?.refresh_token,
    );
    resetNavigation({
      index: 1,
      // navigate to project screen if user admin : future feature
      routes: [{name: routeEnum.LOGGEDSCREENS}],
    });
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Successfull',
      textBody: 'Project switching successfull',
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* projectSaga() {
  yield takeEvery(GET_ALL_PROJECTS_ACTION, listAllProjectSaga);
  yield takeEvery(PROJECT_TOKEN_GENERATION_ACTION, projectTokenGenSaga);
}
