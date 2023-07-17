import {createSlice} from '@reduxjs/toolkit';
import {addonsListAction} from '../../services/interface/fbLeadsInterface';
const addonsList = createSlice({
  name: 'addons',
  initialState: [],
  reducers: {
    setAddonsList: (state: any, action: addonsListAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAddonsList} = addonsList.actions;

export {addonsList};
