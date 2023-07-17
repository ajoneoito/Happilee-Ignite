import {AxiosResponse} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {routeEnum} from '../../enums/route.enum';
import {navigate} from '../../navigation/useNavigationUtils';
import {
  addNewTagServiceCall,
  addNotes,
  blockContact,
  deleteNotes,
  deleteParameters,
  editNotes,
  editParameters,
  ListAllCandidateTags,
  removeTagServiceCall,
  retrieveCandidateDetails,
  retrieveCandidatePreDefinedTags,
} from '../../services/api/candidateProfileDetails';
import {
  ADD_NEW_NOTE,
  ADD_NEW_PARAMETER,
  ADD_NEW_TAG,
  BLOCK_CONTACT,
  DELETE_NOTE,
  DELETE_PARAMETER,
  DELETE_TAG,
  EDIT_NOTE,
  GET_CANDIDATEDETAILS_ACTION,
  GET_CANDIDATE_PREDEFINED_TAGS,
} from '../actions/candidateDetails.action';
import {setcandidateDetails} from '../slices/candidateDetails.slice';
import {setPreDefinedTags} from '../slices/candidatePreDefinedTags.slice';
import {setSelectedTags} from '../slices/candidateSelectedTags.slice';
import {setSpinner, stopSpinner} from '../slices/spinner.slice';

export function* retrieveCandidateProfileDetails(action: any) {
  const response: AxiosResponse = yield call(
    retrieveCandidateDetails,
    action.payload,
  );

  const candidateTags: AxiosResponse = yield call(
    ListAllCandidateTags,
    action.payload,
  );
  if (candidateTags && candidateTags.status === 200) {
    yield put(setSelectedTags(candidateTags.data.data));
  }
  if (response && response.status === 200) {
    yield put(setcandidateDetails(response.data.data));
  }
}

export function* retrievePreDefinedTags(action: any) {
  const preDifinedTags: AxiosResponse = yield call(
    retrieveCandidatePreDefinedTags,
    action.payload,
  );
  if (preDifinedTags && preDifinedTags.status === 200) {
    yield put(setPreDefinedTags(preDifinedTags.data.data));
  }
}

export function* addNewTag(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Tag Adding.',
    }),
  );
  yield call(addNewTagServiceCall, action.payload);
  const candidateTags: AxiosResponse = yield call(ListAllCandidateTags, {
    candidateId: action.payload.candidateId,
  });
  if (candidateTags && candidateTags.status === 200) {
    yield put(setSelectedTags(candidateTags.data.data));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* removeTag(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Tag Removing.',
    }),
  );
  yield call(removeTagServiceCall, action.payload);
  const candidateTags: AxiosResponse = yield call(ListAllCandidateTags, {
    candidateId: action.payload.candidateId,
  });
  if (candidateTags && candidateTags.status === 200) {
    yield put(setSelectedTags(candidateTags.data.data));
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* markAsSpam(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Block contact.',
    }),
  );
  const response: AxiosResponse = yield call(blockContact, action.payload);
  if (response && response.status === 200) {
    navigate(routeEnum.HOMESCREEN);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: response.data?.message,
    });
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* editParameterData(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Updating Paramater',
    }),
  );
  const response: AxiosResponse = yield call(
    editParameters,
    action.payload.data,
  );
  if (response && response.status === 200) {
    const candidateResponse: AxiosResponse = yield call(
      retrieveCandidateDetails,
      action.payload.candidateId,
    );
    if (candidateResponse && candidateResponse.status === 200) {
      yield put(setcandidateDetails(candidateResponse.data.data));
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* deleteParameterData(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Deleting Paramater',
    }),
  );
  const response: AxiosResponse = yield call(
    deleteParameters,
    action.payload.data,
  );
  if (response && response.status === 200) {
    const candidateResponse: AxiosResponse = yield call(
      retrieveCandidateDetails,
      action.payload.candidateId,
    );
    if (candidateResponse && candidateResponse.status === 200) {
      yield put(setcandidateDetails(candidateResponse.data.data));
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* addNoteData(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Updating Notes',
    }),
  );
  const response: AxiosResponse = yield call(addNotes, action.payload.data);
  if (response && response.status === 200) {
    const candidateResponse: AxiosResponse = yield call(
      retrieveCandidateDetails,
      action.payload.candidateId,
    );
    if (candidateResponse && candidateResponse.status === 200) {
      yield put(setcandidateDetails(candidateResponse.data.data));
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* editNoteData(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Updating Notes',
    }),
  );
  const response: AxiosResponse = yield call(editNotes, action.payload.data);
  if (response && response.status === 200) {
    const candidateResponse: AxiosResponse = yield call(
      retrieveCandidateDetails,
      action.payload.candidateId,
    );
    if (candidateResponse && candidateResponse.status === 200) {
      yield put(setcandidateDetails(candidateResponse.data.data));
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* deleteNoteData(action: any) {
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Deleting Note',
    }),
  );
  const response: AxiosResponse = yield call(deleteNotes, action.payload.data);
  if (response && response.status === 200) {
    const candidateResponse: AxiosResponse = yield call(
      retrieveCandidateDetails,
      action.payload.candidateId,
    );
    if (candidateResponse && candidateResponse.status === 200) {
      yield put(setcandidateDetails(candidateResponse.data.data));
    }
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
export function* candidateDetails() {
  yield takeEvery(GET_CANDIDATEDETAILS_ACTION, retrieveCandidateProfileDetails);
  yield takeEvery(GET_CANDIDATE_PREDEFINED_TAGS, retrievePreDefinedTags);
  yield takeEvery(ADD_NEW_TAG, addNewTag);
  yield takeEvery(DELETE_TAG, removeTag);
  yield takeEvery(BLOCK_CONTACT, markAsSpam);
  yield takeEvery(ADD_NEW_PARAMETER, editParameterData);
  yield takeEvery(DELETE_PARAMETER, deleteParameterData);
  yield takeEvery(ADD_NEW_NOTE, addNoteData);
  yield takeEvery(EDIT_NOTE, editNoteData);
  yield takeEvery(DELETE_NOTE, deleteNoteData);
}
