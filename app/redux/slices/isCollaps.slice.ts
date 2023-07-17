import {createSlice} from '@reduxjs/toolkit';
import {isCollapsAction} from '../../services/interface/broadcastInterface';
const isCollaps = createSlice({
  name: 'isCollaps',
  initialState: {
    collaps: true,
  },
  reducers: {
    setCollaps: (state: any, action: isCollapsAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setCollaps} = isCollaps.actions;

export {isCollaps};
