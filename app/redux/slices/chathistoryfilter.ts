import {createSlice} from '@reduxjs/toolkit';
import {setChatHistoryQuery} from '../../services/interface/chatHistory';
import {API_LIMIT} from '../../constants/pagination';
const chatHistoryFilter = createSlice({
  name: 'chatHistoryFilter',
  initialState: {
    pageNumber: 1,
    limit: API_LIMIT,
    chat_uid: '',
  },
  reducers: {
    setchatHistoryFilter: (state: any, action: setChatHistoryQuery) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setchatHistoryFilter} = chatHistoryFilter.actions;

export {chatHistoryFilter};
