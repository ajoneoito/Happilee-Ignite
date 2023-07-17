import {createSlice} from '@reduxjs/toolkit';
import {chatListAction} from '../../services/interface/chatInterfaces';
const chatList = createSlice({
  name: 'chatList',
  initialState: {
    chatCount: '0',
    availableChatCount: 0,
    pageNumber: 1,
    primary_filter: null,
    secondary_filter: null,
    hasNextpage: false,
  },
  reducers: {
    setchatList: (state: any, action: chatListAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setchatList} = chatList.actions;

export {chatList};
