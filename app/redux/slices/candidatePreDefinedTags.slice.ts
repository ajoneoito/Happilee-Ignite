import {createSlice} from '@reduxjs/toolkit';
import {PredefinedTags} from '../../services/interface/candidateProfileDetails';
const candidatePreDefinedTags = createSlice({
  name: 'candidatePreDefinedTags',
  initialState: {
    PredefinedTags: [
      {
        clientId: null,
        createdAt: '',
        id: '',
        project_id: '',
        tagName: '',
        updatedAt: '',
      },
    ],
    count: 0,
  },
  reducers: {
    setPreDefinedTags: (state: any, action: PredefinedTags) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setPreDefinedTags} = candidatePreDefinedTags.actions;

export {candidatePreDefinedTags};
