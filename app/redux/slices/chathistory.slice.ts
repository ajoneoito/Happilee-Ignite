import {createSlice} from '@reduxjs/toolkit';
import {setChatHistory} from '../../services/interface/chatHistory';
const chatHistory = createSlice({
  name: 'chatHistory',
  initialState: {
    pageNumber: 1,
    hasNextPage: false,
    count: 0,
    chatUid: '',
    candidatePhoneNumber: '',
  },
  reducers: {
    setchatHistory: (state: any, action: setChatHistory) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setchatHistory} = chatHistory.actions;

export {chatHistory};
