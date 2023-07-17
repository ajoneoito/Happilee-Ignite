import {createSlice} from '@reduxjs/toolkit';

const broadcastList = createSlice({
  name: 'broadcastList',
  initialState: [],
  reducers: {
    setBroadcastListItems: (state: any, action: any) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setBroadcastListItems} = broadcastList.actions;
export {broadcastList};
