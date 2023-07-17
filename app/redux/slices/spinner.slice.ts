import {createSlice} from '@reduxjs/toolkit';
import {spinnerAction} from '../../services/interface/spinnerTypes';
const spinner = createSlice({
  name: 'spinner',
  initialState: {
    spinning: false,
    title: '',
    body: '',
  },
  reducers: {
    setSpinner: (state: any, action: spinnerAction) => {
      state = action.payload;
      return state;
    },
    startSpinner: (state: any, _action: spinnerAction) => {
      state = {
        ...state,
        spinning: true,
      };
      return state;
    },
    stopSpinner: (state: any, _action: spinnerAction) => {
      state = {
        ...state,
        spinning: false,
      };
      return state;
    },
  },
});
export const {setSpinner, startSpinner, stopSpinner} = spinner.actions;

export {spinner};
