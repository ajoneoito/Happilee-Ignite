import {createSlice} from '@reduxjs/toolkit';
import {broadcastFilterAction} from '../../services/interface/broadcastInterface';

const paramsList = createSlice({
  name: 'paramsList',
  initialState: [],
  reducers: {
    setBroadcastFilterParams: (state: any, action: broadcastFilterAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setBroadcastFilterParams} = paramsList.actions;
export {paramsList};
