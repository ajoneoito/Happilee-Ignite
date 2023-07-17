import {put, takeEvery} from 'redux-saga/effects';
import {setIMageToUpload} from '../slices/imageToUpload.slice';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_PREVIEW,
} from '../actions/imageToUpload.action';
import {setIMagePreviewData} from '../slices/imagePreviewData';

export function* getAllImages(action: any) {
  yield put(setIMageToUpload(action.payload));
}

export function* setAllImages(action: any) {
  yield put(setIMagePreviewData(action.payload));
}

export function* getAllImagesSaga() {
  yield takeEvery(UPLOAD_IMAGE, getAllImages);
  yield takeEvery(UPLOAD_IMAGE_PREVIEW, setAllImages);
}
