import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {templateListInterface} from '../../services/interface/templateInterfaces';
const initialState: templateListInterface = Object(null);
const templateListFilter = createSlice({
  name: 'templateListFilter',
  initialState,
  reducers: {
    settemplateListFilter: (
      state: templateListInterface,
      action: PayloadAction<templateListInterface>,
    ) => {
      state = action.payload;
      return state;
    },
  },
});
export const {settemplateListFilter} = templateListFilter.actions;
export {templateListFilter};
