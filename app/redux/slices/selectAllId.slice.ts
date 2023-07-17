import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Recipient, } from '../../services/interface/broadcastInterface';
interface SelectRecipientsIdState {
  ids: string[];
  recipients: Recipient[];
}

const initialState: SelectRecipientsIdState = {
  ids: [],
  recipients: [],
};
const selectRecipientsId = createSlice({
  name: 'selectRecipientsId',
  initialState,
  reducers: {
    setSelectRecipientsId: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        ids: action.payload,
      };
    },
    setSelectRecipients: (state, action: PayloadAction<Recipient[]>) => {
      return {
        ...state,
        recipients: action.payload,
      };
    },
  },
});
export const {setSelectRecipientsId, setSelectRecipients} =
  selectRecipientsId.actions;

export {selectRecipientsId};
  