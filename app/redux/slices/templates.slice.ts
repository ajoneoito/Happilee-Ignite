import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {templateListInterface} from '../../services/interface/templateInterfaces';

const initialState: templateListInterface[] = [];

const templates = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplates: (
      state: templateListInterface[],
      action: PayloadAction<templateListInterface[]>,
    ) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setTemplates} = templates.actions;
export {templates};
