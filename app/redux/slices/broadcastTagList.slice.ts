import {createSlice} from '@reduxjs/toolkit';
import {broadcastTagListAction} from '../../services/interface/broadcastInterface';
const broadcastTags = createSlice({
  name: 'broadcastTags',
  initialState: [],
  reducers: {
    setbroadcastTagList: (state: any, action: broadcastTagListAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setbroadcastTagList} = broadcastTags.actions;

export {broadcastTags};
