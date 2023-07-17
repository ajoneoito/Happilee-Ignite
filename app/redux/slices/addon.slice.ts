import {createSlice} from '@reduxjs/toolkit';
import {addonsListAction} from '../../services/interface/fbLeadsInterface';
const addon = createSlice({
  name: 'addon',
  initialState: {
    createdAt: '',
    description: '',
    id: '',
    logo_url: '',
    name: '',
    status: '',
    updatedAt: '',
  },
  reducers: {
    setAddon: (state: any, action: addonsListAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAddon} = addon.actions;

export {addon};
