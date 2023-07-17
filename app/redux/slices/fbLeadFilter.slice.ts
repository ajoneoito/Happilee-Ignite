import {createSlice} from '@reduxjs/toolkit';
import {API_LIMIT} from '../../constants/pagination';
import {fbLeadFilterAction} from '../../services/interface/fbLeadsInterface';

const fbLeadFilter = createSlice({
  name: 'fbLeadFilter',
  initialState: {
    pageNumber: 1,
    limit: API_LIMIT,
    search: '',
    hasNextPage: false,
  },
  reducers: {
    setFbLeadFilter: (state: any, action: fbLeadFilterAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setFbLeadFilter} = fbLeadFilter.actions;
export {fbLeadFilter};
