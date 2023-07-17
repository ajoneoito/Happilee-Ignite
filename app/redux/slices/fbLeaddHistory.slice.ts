import {createSlice} from '@reduxjs/toolkit';
import {fbLeadHistoryAction} from '../../services/interface/fbLeadsInterface';
const fbLeadHistory = createSlice({
  name: 'fbLeadHistory',
  initialState: [],
  reducers: {
    setFbLeadHistory: (state: any, action: fbLeadHistoryAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setFbLeadHistory} = fbLeadHistory.actions;

export {fbLeadHistory};
