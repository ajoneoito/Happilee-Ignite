import {createSlice} from '@reduxjs/toolkit';
import {CandidateDetails} from '../../services/interface/candidateProfileDetails';
const candidateDetails = createSlice({
  name: 'candidateDetails',
  initialState: {
    users: {
      id: '',
      shieldUid: '',
      roleId: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      countryCode: '',
      status: '',
      designation: '',
      profilePicUrl: '',
      otp_generated_time: '',
      generated_otp: '',
      createdAt: '',
      updatedAt: '',
      candidates: [
        {
          id: '',
          userId: '',
          roleId: '',
          whatsappUid: '',
          status: '',
          googleSheetRowNumber: '',
          domainId: '',
          is_subscribed: true,
          createdAt: '',
          updatedAt: '',
          previousStatus: '',
        },
      ],
    },
    candidate_notes: [
      {
        id: '',
        candidateId: '',
        note: '',
        status: '',
        createdAt: '',
        updatedAt: '',
      },
    ],
    candidate_custom_parameters: [
      {
        id: '',
        candidateId: '',
        name: '',
        value: '',
        status: '',
        createdAt: '',
        updatedAt: '',
      },
    ],
    candidate_documents: [
      {
        id: '',
        candidateId: '',
        fileName: '',
        fileType: '',
        status: '',
        fileLocationUrl: '',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  reducers: {
    setcandidateDetails: (state: any, action: CandidateDetails) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setcandidateDetails} = candidateDetails.actions;

export {candidateDetails};
