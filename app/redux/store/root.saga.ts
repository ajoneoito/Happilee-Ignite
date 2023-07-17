import {all} from 'redux-saga/effects';
import {AuthSaga} from '../middlewares/auth.saga';
import {FbLeadsSaga} from '../middlewares/fbLeads.saga';
import {newChatSaga} from '../middlewares/newChat.saga';
import {SpinnerSaga} from '../middlewares/spinner.saga';
import {projectSaga} from '../middlewares/project.saga';
import {tagListSaga} from '../middlewares/tagList.saga';
import {chatListSaga} from '../middlewares/chatlist.saga';
import {TemplateSaga} from '../middlewares/templates.saga';
import {BroadcastSaga} from '../middlewares/broadcast.saga';
import {contactListSaga} from '../middlewares/contactList.saga';
import {chatHistorySaga} from '../middlewares/chathistory.saga';
import {getAudioPlayerSaga} from '../middlewares/audioPlayer.saga';
import {getAllImagesSaga} from '../middlewares/imageToUpload.saga';
import {candidateDetails} from '../middlewares/candidateDetails.saga';

function* rootSaga() {
  // eslint-disable-next-line no-sparse-arrays
  yield all([
    AuthSaga(),
    SpinnerSaga(),
    TemplateSaga(),
    chatListSaga(),
    newChatSaga(),
    chatHistorySaga(),
    projectSaga(),
    candidateDetails(),
    contactListSaga(),
    tagListSaga(),
    getAllImagesSaga(),
    BroadcastSaga(),
    getAudioPlayerSaga(),
    FbLeadsSaga(),
  ]);
}

export {rootSaga};
