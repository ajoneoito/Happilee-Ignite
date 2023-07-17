import {createSlice} from '@reduxjs/toolkit';

interface audioPlayer {
  audioFile: number;
}
interface audio {
  type: string;
  payload: audioPlayer;
}
const audioTrack = createSlice({
  name: 'audioPlayer',
  initialState: {
    audioPosition: 0,
  },
  reducers: {
    setAudioPosition: (state: any, action: audio) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAudioPosition} = audioTrack.actions;

export {audioTrack};
