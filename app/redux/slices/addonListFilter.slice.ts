import {createSlice} from '@reduxjs/toolkit';
import {addonFilter} from '../../services/interface/fbLeadsInterface';

const addonListFilter = createSlice({
  name: 'addonListFilter',
  initialState: {
    search: '',
  },
  reducers: {
    setAddonListFilter: (state: any, action: addonFilter) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAddonListFilter} = addonListFilter.actions;
export {addonListFilter};
