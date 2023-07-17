import {createSlice} from '@reduxjs/toolkit';

const broadcastListCollection = createSlice({
  name: 'broadcastListCollection',
  initialState: [],
  reducers: {
    setBroadcastListCollection: (state: any, action: any) => {
      state = [...state, ...action.payload];
      return state;
    },
  },
});
export const {setBroadcastListCollection} = broadcastListCollection.actions;
export {broadcastListCollection};
