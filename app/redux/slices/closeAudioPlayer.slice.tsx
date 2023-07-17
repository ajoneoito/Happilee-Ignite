import {createSlice} from '@reduxjs/toolkit';

interface closeAduioPlayer {
  isAudioPlaying: boolean | null;
}
interface audio {
  type: string;
  payload: closeAduioPlayer;
}
const closeAduioPlayer = createSlice({
  name: 'closeAduioPlayer',
  initialState: {
    isAudioPlaying: null,
  },
  reducers: {
    closeAudio: (state: any, action: audio) => {
      state = action.payload;
      return state;
    },
  },
});
export const {closeAudio} = closeAduioPlayer.actions;

export {closeAduioPlayer};
