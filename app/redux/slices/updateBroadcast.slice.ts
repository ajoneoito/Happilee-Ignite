import {createSlice} from '@reduxjs/toolkit';
import {tabInterface} from '../../services/interface/chatInterfaces';
const updateBroadcast = createSlice({
  name: 'updateBroadcast',
  initialState: {
    update: false,
  },
  reducers: {
    setUpdateBroadcast: (state: any, action: any) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setUpdateBroadcast} = updateBroadcast.actions;

export {updateBroadcast};
