import {createSlice} from '@reduxjs/toolkit';
import {API_LIMIT} from '../../constants/pagination';
import {broadcastAction} from '../../services/interface/broadcastInterface';

const broadcastFilter = createSlice({
  name: 'broadcastFilter',
  initialState: {
    pageNumber: 1,
    limit: API_LIMIT,
    search: '',
    sort: 'createdAt',
    order: 'DESC',
  },
  reducers: {
    setBroadcastFilter: (state: any, action: broadcastAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setBroadcastFilter} = broadcastFilter.actions;
export {broadcastFilter};
