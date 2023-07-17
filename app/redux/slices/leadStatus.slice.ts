import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fbLeadStatus} from '../../services/interface/fbLeadsInterface';
const initialState: fbLeadStatus = Object(null);

const leadStatus = createSlice({
  name: 'leadStatus',
  initialState: initialState,
  reducers: {
    setLeadStatus: (
      state: fbLeadStatus,
      action: PayloadAction<fbLeadStatus>,
    ) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setLeadStatus} = leadStatus.actions;

export {leadStatus};
