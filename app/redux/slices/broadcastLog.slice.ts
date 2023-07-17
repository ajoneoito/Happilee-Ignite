import {createSlice} from '@reduxjs/toolkit';
import {broadcastLogHistoryAction} from '../../services/interface/broadcastInterface';
const broadcastLogList = createSlice({
  name: 'broadcastLogList',
  initialState: {
    broadcast_data: {
      template_body: {
        type: '',
        text: '',
      },
      template_header: {
        format: '',
        text: '',
      },
      template_file_url: '',
    },

    recipient_list: [{firstName: ''}],
  },
  reducers: {
    setBroadcastLog: (state: any, action: broadcastLogHistoryAction) => {
      const { isFirstCall, recipient_list } = action.payload;
      if (isFirstCall) {
        return {
          ...state,
          recipient_list: [...state.recipient_list, ...recipient_list],
        };
        
      } else {
        state = action.payload;
        return state;
      }
    },
  },
});
export const {setBroadcastLog} = broadcastLogList.actions;

export {broadcastLogList};

