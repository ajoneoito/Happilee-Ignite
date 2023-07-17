export type paramType = {
  id: string;
  candidateId: string;
  status: string;
};
export interface ContactInfoHeader {
  edit: boolean;
  onPress: (arg0: boolean) => void;
  onBackPress: () => void;
  onPressSaveButton: () => void;
}
export interface ParamSection {
  data: {
    candidateId: string;
    createdAt: string;
    id: string;
    name: string;
    status: string;
    updatedAt: string;
    value: string;
  }[];
}

export interface Parameters {
  candidateId: string;
  createdAt?: string;
  id?: string;
  name: string;
  status?: string;
  updatedAt?: string;
  value: string;
}
export interface Notes {
  candidateId: string;
  createdAt: Date | string;
  id: string | undefined;
  note: string;
  status: string;
  updatedAt: Date | string;
}

export interface Newparameters {
  candidateId: string;
  name: string;
  value: string;
}
export interface contactInfoProfile {
  edit: boolean;
  onPress: (arg0: boolean) => void;
  candidateId: string;
  addNewTag: (arg0: string) => void;
  loadMoreTag: () => void;
  data:
    | {
        candidates: {
          clientId?: string;
          createdAt?: string;
          domainId?: string;
          googleSheetRowNumber?: string;
          id?: string;
          is_subscribed?: boolean;
          previousStatus?: string | null;
          status: string | null;
          updatedAt: string | null;
          userId: string | null;
          whatsappUid: string | null;
        }[];
        countryCode: null | string;
        createdAt: string | null;
        designation: null | string;
        email: null | string;
        firstName: string | null;
        generated_otp: string | null;
        id: string | null;
        lastName: null | string | null;
        otp_generated_time: string | null;
        phoneNumber: string | null;
        profilePicUrl: null | string;
        roleId: string | null;
        shieldUid: string | null;
        status: string | null;
        updatedAt: string | null;
      }
    | undefined;
}

export interface fileInterface {
  candidateId: string;
  createdAt: Date | string;
  fileLocationUrl: string;
  fileName: string;
  fileType: string;
  id: string;
  status: string;
  updatedAt: Date | string;
  messageType?: string;
}
export interface nameInterface {
  name: string;
}
