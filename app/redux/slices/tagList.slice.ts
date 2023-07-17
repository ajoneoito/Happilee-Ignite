import {createSlice} from '@reduxjs/toolkit';
import {setTagList} from '../../services/interface/tagsList';

const tagList = createSlice({
  name: 'tagList',
  initialState: [],
  reducers: {
    settagList: (state: any, action: setTagList) => {
      return action.payload;
    },
  },
});

export const {settagList} = tagList.actions;

export {tagList};
