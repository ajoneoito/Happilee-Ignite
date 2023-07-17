import {createSlice} from '@reduxjs/toolkit';
import {API_LIMIT} from '../../constants/pagination';
import {leadFilterAction} from '../../services/interface/fbLeadsInterface';
import {formatDateStructure} from '../../utils/functions/funtions';
const leadFilter = createSlice({
  name: 'leadFilter',
  initialState: {
    search: '',
    limit: API_LIMIT,
    pageNumber: 1,
    filter_type: 'status',
    filter_key: 'new',  
    current_date: formatDateStructure(new Date()),
  },
  reducers: {
    setLeadFilter: (state: any, action: leadFilterAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setLeadFilter} = leadFilter.actions;

export {leadFilter};
