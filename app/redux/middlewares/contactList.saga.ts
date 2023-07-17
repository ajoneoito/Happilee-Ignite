/**
 * COntacts Middleware
 * @module Contacts Saga
 * @desc Middleware containes contacts services.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {call, put, select, takeEvery} from 'redux-saga/effects';
import {stopSpinner, setSpinner} from '../slices/spinner.slice';
import {AxiosResponse} from 'axios';
import {
  addContactRequest,
  getContactListRequest,
} from '../../services/api/contactRequests';
import {setContactListFilter} from '../slices/contactListFilter.slice';
import {setContactList} from '../slices/contactList.slice';
import {
  FETCH_CONTACTS_ACTION,
  ADD_CONTACT_ACTION,
  UPDATE_CONTACT_FILTER,
} from '../actions/contactList.action';
import {API_LIMIT} from '../../constants/pagination';
import {
  addMultipleContacts,
  deleteContacts,
} from '../../utils/database/realmHooks/useContacts';
import {goBack} from '../../navigation/useNavigationUtils';
import {RootState} from '../store/root.reducer';
import {
  contactListQuery,
  addContactAction,
  contactListFiltertAction,
  contactListInterface,
} from '../../services/interface/contactInterface';
const getContactListQuery = (state: RootState) => state.contactListFilter;
const getContactsQuery = (state: RootState) => state.contactList;
const getAuth = (state: RootState) => state.auth;
//update conatcts list filter params
export function* updateContactFilter(action: contactListFiltertAction) {
  yield put(setContactListFilter(action.payload));
}
//add contacts
export function* addContactSaga(action: addContactAction) {
  const response: AxiosResponse = yield call(addContactRequest, action.payload);
  if (response && response.status === 200) {
    //go back to previous page after successfully adding new contact
    goBack();
  }
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}
//Get contact list saga
export function* getContactListSaga(action: any) {
  //Request contact list with given params.
  //Update or save the response in local db.
  yield put(
    setSpinner({
      spinning: true,
      title: 'Please wait...',
      body: 'Fetching contacts list.',
    }),
  );

  const auth: any = yield select(getAuth);
  const response: AxiosResponse = yield call(
    getContactListRequest,
    action.payload,
  );
  if (response && response.status === 200) {
    const contactListFilter: contactListQuery = yield select(
      getContactListQuery,
    );
    if (action?.payload?.pageNumber === 1) {
      yield call(deleteContacts, auth?.projectId);
    }
    const contactsList: contactListInterface = yield select(getContactsQuery);
    let hasNextPage: boolean = false;
    yield put(
      setContactList({
        ...contactsList,
        contact_list_count: response?.data?.contact_list_count,
      }),
    );
    if (response?.data?.contact_list?.length === API_LIMIT) {
      hasNextPage = true;
    }
    yield put(
      setContactListFilter({
        ...contactListFilter,
        hasNextPage: hasNextPage,
      }),
    );
  }
  yield addMultipleContacts(response?.data?.contact_list ?? []);
  yield put(
    stopSpinner({
      spinning: false,
    }),
  );
}

export function* contactListSaga() {
  yield takeEvery(FETCH_CONTACTS_ACTION, getContactListSaga);
  yield takeEvery(ADD_CONTACT_ACTION, addContactSaga);
  yield takeEvery(UPDATE_CONTACT_FILTER, updateContactFilter);
}
