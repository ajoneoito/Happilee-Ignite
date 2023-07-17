import {createSlice} from '@reduxjs/toolkit';
const skeleton = createSlice({
  name: 'skeleton',
  initialState: {
    skeleton: false
  },
  reducers: {
    setSkeletonLoading: (state: any, action: any) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setSkeletonLoading} = skeleton.actions;

export {skeleton};
