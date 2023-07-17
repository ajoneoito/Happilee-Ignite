import {createSlice} from '@reduxjs/toolkit';

interface PresentScreen {
  presentScreen: string;
}
interface audio {
  type: string;
  payload: PresentScreen;
}
const PresentScreen = createSlice({
  name: 'closeAduioPlayer',
  initialState: {
    presentScreen: '',
  },
  reducers: {
    setPresentScreen: (state: any, action: audio) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setPresentScreen} = PresentScreen.actions;

export {PresentScreen};
