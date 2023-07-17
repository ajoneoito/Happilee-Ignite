import {createSlice} from '@reduxjs/toolkit';
import {API_LIMIT} from '../../constants/pagination';
import {leadaTypeAction} from '../../services/interface/fbLeadsInterface';
const leadTypeList = createSlice({
  name: 'leadTypeList',
  initialState: [],
  reducers: {
    setLeadTypeList: (state: any, action: leadaTypeAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setLeadTypeList} = leadTypeList.actions;

export {leadTypeList};
