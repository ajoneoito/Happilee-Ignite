export interface CandidateDetails {
  payload: {
    candidate_custom_parameters?:
      | [
          {
            candidateId: string;
            createdAt: string;
            id: string;
            name: string;
            status: string;
            updatedAt: string;
            value: string;
          },
        ]
      | []
      | null
      | undefined;
    candidate_documents?:
      | [
          {
            id: string;
            candidateId: string;
            fileName: string;
            fileType: string;
            status: string;
            fileLocationUrl: string;
            createdAt: string;
            updatedAt: string;
          },
        ]
      | []
      | null
      | undefined;
    candidate_notes?:
      | [
          {
            id: string;
            candidateId: string;
            note: string;
            status: string;
            createdAt: string;
            updatedAt: string;
          },
        ]
      | []
      | null
      | undefined;
    users: {
      id: string;
      shieldUid: string;
      roleId: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      countryCode: string;
      status: string;
      designation: string;
      profilePicUrl: string;
      otp_generated_time: string;
      generated_otp: string;
      createdAt: string;
      updatedAt: string;
      candidates: [
        {
          id: string;
          userId: string;
          roleId: string;
          whatsappUid: string;
          status: string;
          googleSheetRowNumber: string;
          domainId: string;
          is_subscribed: true;
          createdAt: string;
          updatedAt: string;
          previousStatus: string;
        },
      ];
    };
  };
  type: string;
}

export interface PredefinedTags {
  payload: {
    PredefinedTags: [
      {
        clientId: null;
        createdAt: Date;
        id: string;
        project_id: string;
        tagName: string;
        updatedAt: string;
      },
    ];
    count: 0;
  };
  type: string;
}
