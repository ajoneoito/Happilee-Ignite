import {createSlice} from '@reduxjs/toolkit';
import {broadcastListQuery} from '../../services/interface/broadcastInterface';
const broadcast = createSlice({
  name: 'broadcast',
  initialState: {
    pageNumber: 1,
    hasNextpage: false,
  },
  reducers: {
    setbroadcastList: (state: any, action: broadcastListQuery) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setbroadcastList} = broadcast.actions;

export {broadcast};
