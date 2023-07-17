import {createSlice} from '@reduxjs/toolkit';
import {ImagePreviewDataInterface} from '../../utils/database/interfaces';
interface image {
  type: string;
  payload: ImagePreviewDataInterface[];
}
const imagePreviewData = createSlice({
  name: 'imagePreviewData',
  initialState: [
    {
      path: '',
      name: '',
      size: 0,
      mime: '',
      id: '',
    },
  ],
  reducers: {
    setIMagePreviewData: (state: any, action: image) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setIMagePreviewData} = imagePreviewData.actions;

export {imagePreviewData};
