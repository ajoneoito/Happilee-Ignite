import {createSlice} from '@reduxjs/toolkit';
import {contactListFiltertAction} from '../../services/interface/contactInterface';
import {API_LIMIT} from '../../constants/pagination';
const contactListFilter = createSlice({
  name: 'contactListFilter',
  initialState: {
    pageNumber: 1,
    limit: API_LIMIT,
    search: '',
    tag_filter: [],
    sort_active: 'created_at',
    direction: 'desc',
    hasNextPage: false,
  },
  reducers: {
    setContactListFilter: (state: any, action: contactListFiltertAction) => {
      state = {...state, ...action.payload};
      return state;
    },
  },
});
export const {setContactListFilter} = contactListFilter.actions;

export {contactListFilter};
