import {createSlice} from '@reduxjs/toolkit';
import {setTagListQuery} from '../../services/interface/tagsList';

const tagListQuery = createSlice({
  name: 'tagListQuery',
  initialState: {
    pageNumber: 1,
    limit: 100,
    tagName: '',
  },
  reducers: {
    settagListQuery: (state: any, action: setTagListQuery) => {
      return {...state, ...action.payload};
    },
  },
});

export const {settagListQuery} = tagListQuery.actions;

export {tagListQuery};
