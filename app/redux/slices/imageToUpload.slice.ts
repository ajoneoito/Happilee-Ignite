import {createSlice} from '@reduxjs/toolkit';
import {ImageToUploadInterface} from '../../utils/database/interfaces';
interface image {
  type: string;
  payload: ImageToUploadInterface[];
}
const imageToUpload = createSlice({
  name: 'imageToUpload',
  initialState: [
    {
      id: '',
      path: '',
      uploaded: '',
      progress: '',
      mime: '',
      caption: '',
      chatUid: '',
    },
  ],
  reducers: {
    setIMageToUpload: (state: any, action: image) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setIMageToUpload} = imageToUpload.actions;

export {imageToUpload};
