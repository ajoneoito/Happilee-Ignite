import {createSlice} from '@reduxjs/toolkit';
import {uploadImageAction} from '../../services/interface/broadcastInterface';
const broadcastFileUpload = createSlice({
  name: 'broadcastFileUpload',
  initialState: {
    s3_url: '',
  },
  reducers: {
    setbroadcastFileUpload: (state: any, action: uploadImageAction) => {
      state = action.payload;

      return state;
    },
  },
});
export const {setbroadcastFileUpload} = broadcastFileUpload.actions;
export {broadcastFileUpload};
