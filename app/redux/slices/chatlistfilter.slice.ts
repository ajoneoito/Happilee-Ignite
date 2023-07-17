import {createSlice} from '@reduxjs/toolkit';
import {chatLisFiltertAction} from '../../services/interface/chatInterfaces';
import {API_LIMIT} from '../../constants/pagination';
const chatListFilter = createSlice({
  name: 'chatListFilter',
  initialState: {
    pageNumber: 1,
    primary_filter: '',
    secondary_filter: '',
    limit: API_LIMIT,
    search: '',
  },
  reducers: {
    setchatListFilter: (state: any, action: chatLisFiltertAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setchatListFilter} = chatListFilter.actions;

export {chatListFilter};
