import {createSlice} from '@reduxjs/toolkit';
import {selectAllRecipientsAction} from '../../services/interface/broadcastInterface';
const selectAllRecipients = createSlice({
  name: 'selectAllRecipients',
  initialState: {
    select: false,
  },
  reducers: {
    setSelectAllRecipients: (state: any, action: selectAllRecipientsAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setSelectAllRecipients} = selectAllRecipients.actions;

export {selectAllRecipients};
