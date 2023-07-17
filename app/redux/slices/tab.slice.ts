import {createSlice} from '@reduxjs/toolkit';
import {tabInterface} from '../../services/interface/chatInterfaces';
const tab = createSlice({
  name: 'tab',
  initialState: 'chats',
  reducers: {
    setTab: (state: any, action: tabInterface) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setTab} = tab.actions;

export {tab};
