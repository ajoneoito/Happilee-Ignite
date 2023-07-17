import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fbLeadListAction, leadAction} from '../../services/interface/fbLeadsInterface';
const fbLeads = createSlice({
  name: 'fbLeads',
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    setFbLeadsList: (state: any, action: leadAction) => {
      return {
        ...state,
        count: action.payload.count,
        data: [...state.data, ...action.payload.data],
      };
    },
    setInitialArray: (state: any, action: PayloadAction<undefined>) => {
      return {
        count: 0,
        data: [],
      };
    },
    setNewLeadsArray: (state: any, action: leadAction) => {
      return {
        ...state,
        count: action.payload.count,
        data: [...action.payload.data, ...state.data],
      };
    },
  },
});
export const {setFbLeadsList, setInitialArray, setNewLeadsArray} =
  fbLeads.actions;

export {fbLeads};
