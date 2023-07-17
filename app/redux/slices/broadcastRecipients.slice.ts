import {createSlice} from '@reduxjs/toolkit';
import {broadcastRecipientsAction} from '../../services/interface/broadcastInterface';

const recipients = createSlice({
  name: 'recipients',
  initialState: [],
  reducers: {
    setBroadcastRecipients: (state: any, action: any) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setBroadcastRecipients} = recipients.actions;
export {recipients};
