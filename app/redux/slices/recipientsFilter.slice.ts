import {createSlice} from '@reduxjs/toolkit';
import {broadcastListQuery} from '../../services/interface/broadcastInterface';
const recipientsFilter = createSlice({
  name: 'recipientsFilter',
  initialState: {
    pageNumber: 1,
    hasNextPage: false,
  },
  reducers: {
    setRecipientsFilter: (state: any, action: broadcastListQuery) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setRecipientsFilter} = recipientsFilter.actions;

export {recipientsFilter};
