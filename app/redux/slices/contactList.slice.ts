import {createSlice} from '@reduxjs/toolkit';
import {contactListAction} from '../../services/interface/contactInterface';
const contactList = createSlice({
  name: 'contactList',
  initialState: {
    contact_list_count: 0,
  },
  reducers: {
    setContactList: (state: any, action: contactListAction) => {
      state = {...state, ...action.payload};
      return state;
    },
  },
});
export const {setContactList} = contactList.actions;

export {contactList};
