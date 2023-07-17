import {createSlice} from '@reduxjs/toolkit';
import {broadcastAction} from '../../services/interface/broadcastInterface';
import { API_LIMIT } from '../../constants/pagination';

const broadcastRecipientsFilter = createSlice({
  name: 'broadcastRecipientsFilter',
  initialState: {
    pageNumber: 1,
    limit: 100,
    search: '',
    hasNextPage: false
  },
  reducers: {
    setBroadcastRecipientsFilter: (state: any, action: broadcastAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setBroadcastRecipientsFilter} = broadcastRecipientsFilter.actions;
export {broadcastRecipientsFilter};
