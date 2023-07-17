import {createSlice} from '@reduxjs/toolkit';
import {authAction} from '../../services/interface/preLogin';
const auth = createSlice({
  name: 'auth',
  initialState: {
    policy: false,
    logged: false,
    authToken: '',
    refreshToken: '',
    centryfugeToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjU2NyIsImV4cCI6MzIzNjU0NTQzN30.EnPf4sffPu40g6vhhkzk80Ujg28ebkgA6F-TCs91hP4',
    channelId: '',
    userRole: '',
    projectSelected: false,
    projectId: '',
    permissions: [],
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country_code: '',
    confirm: {},
    operator_id: '',
    update_info: false,
    projectName: '',
  },
  reducers: {
    setAuth: (state: any, action: authAction) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAuth} = auth.actions;

export {auth};
