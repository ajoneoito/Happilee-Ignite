import {
  SET_AUDIO_TRACK,
  SET_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER,
  SET_PRESENT_SCREEN,
} from '../actions/audioPlayer.action';
import {put, takeEvery} from 'redux-saga/effects';
import {setAudioPlayer} from '../slices/audioPlayer.slice';
import {setAudioPosition} from '../slices/audioTrack.slice';
import {closeAudio} from '../slices/closeAudioPlayer.slice';
import {setPresentScreen} from '../slices/screenName.slice';

export function* setAudioPlayerSaga(action: any) {
  yield put(setAudioPlayer(action.payload));
}

export function* setAudioFileToPlay(action: any) {
  yield put(setAudioPosition(action.payload));
}

export function* closeAudioPlayer(action: any) {
  yield put(closeAudio(action.payload));
}
export function* setPresentScreenName(action: any) {
  yield put(setPresentScreen(action.payload));
}

export function* getAudioPlayerSaga() {
  yield takeEvery(SET_AUDIO_PLAYER, setAudioPlayerSaga);
  yield takeEvery(SET_AUDIO_TRACK, setAudioFileToPlay);
  yield takeEvery(CLOSE_AUDIO_PLAYER, closeAudioPlayer);
  yield takeEvery(SET_PRESENT_SCREEN, setPresentScreenName);
}
