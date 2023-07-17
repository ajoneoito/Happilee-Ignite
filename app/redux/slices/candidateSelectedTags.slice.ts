import {createSlice} from '@reduxjs/toolkit';
import {PredefinedTags} from '../../services/interface/candidateProfileDetails';
const candidateSelectedTags = createSlice({
  name: 'candidateSelectedTags',
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
    setSelectedTags: (state: any, action: PredefinedTags) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setSelectedTags} = candidateSelectedTags.actions;

export {candidateSelectedTags};
