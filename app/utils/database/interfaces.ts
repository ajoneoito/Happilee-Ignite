import {ChatMessage} from '../../interface/ChatboxInterface';

export interface ChatListInterface {
  id: string | undefined;
  chatName?: string;
  chatUid: string | undefined;
  fileName: string | undefined;
  messageType: string | undefined;
  candidateId?: string;
  messageText?: string;
  status?: string;
  message_created_time?: string;
  operatorid: string | undefined;
  master_operator_id: string | undefined;
  isCandidateReplied?: boolean;
  currentUnreadMessageCount?: number;
  chatExpiringTime?: string;
  chatStartedTime?: string;
  isMessageRead?: boolean;
  candidatePhoneNumber?: string;
  operator_name?: string;
  firstName?: string;
  projectId?: string;
  project_name?: string;
}

export interface ChatHistoryInterface {
  id: string | undefined;
  chatId?: string;
  whatsappMessageId?: string;
  conversationId?: string;
  ticketId?: string;
  owner?: boolean;
  messageText?: string;
  isMessageRead?: boolean;
  messageType?: string;
  senderName?: string | undefined;
  waId?: string | undefined;
  timestamp?: Date;
  messageStatusString?: string;
  chatUid?: string;
  eventType?: string;
  senderId?: string;
  recieverId?: string;
  status?: string;
  fileName?: string;
  fileType?: string;
  fileLocationUrl?: string;
  localFileLocation?: string;
  templateMessageId?: string;
  mediaId?: string;
  mime_type?: string;
  sha256?: string;
  createdAt?: Date;
  updatedAt?: Date;
  media_caption?: string;
}
export interface ProjectInterface {
  firstName?: string;
  lastName?: string;
  id?: string;
  status?: string;
  project_uuid?: string;
  is_account_verified?: boolean;
  phone_number?: any;
  project_name?: string;
  website_link?: string;
  organization_name?: string;
  package_name?: string;
  category_id?: string;
  project_creation_time?: string;
  category?: string;
}
export interface TagInterface {
  id?: any;
  tag_name?: string;
  contact_id?: string;
}
export interface ParameterInterface {
  param_id: any;
  param_value?: string;
  param_name?: string;
  contact_id?: string;
}
export interface ContactInterface {
  id?: string;
  whatsapp_availability?: string;
  projectId?: string;
  is_subscribed?: boolean;
  candidate_id?: string;
  contact_name?: string;
  phoneNumber?: string;
  created_at?: Date;
  tags?: Array<TagInterface>;
  parameters?: Array<ParameterInterface>;
}

export interface FileFromCameraInterface {
  cropRect?:
    | {
        height: number;
        width: number;
        x: number;
        y: number;
      }
    | null
    | undefined;
  height?: number;
  mime?: string;
  modificationDate?: string;
  path: string;
  size?: number;
  width?: number;
}
// export interface ViewableItemInterface {
//   index: number;
//   isViewable: boolean;
//   item: ChatMessage;
//   key: string;
// }
export interface ViewableItemInterface {
  item: ChatMessage;
  key: string;
  index: number;
  isViewable: boolean;
  section?: any;
}

export interface ImageUpload {
  id: string | null;
  path: string | null;
  uploaded: string | null;
  progress: number | string | null;
  mime: string | undefined;
  caption?: string | null;
  chatUid: string | null;
}

export interface ImageToUploadInterface {
  id: string;
  path: string;
  uploaded: string;
  progress: number;
  mime: string;
  chatId: string;
  chatUid: string;
  conversationId: string;
  createdAt: string;
  eventType: string;
  fileLocationUrl: string;
  fileName?: string | null;
  fileType?: string | null;
  isMessageRead: boolean;
  localFileLocation?: string;
  mediaId?: string | null;
  messageStatusString: string;
  messageText: string;
  messageType: string;
  mime_type?: string | null;
  owner: boolean;
  recieverId: string;
  senderId: string;
  senderName: string;
  sha256?: string | null;
  status: string;
  templateMessageId?: string | null;
  ticketId?: string | null;
  timestamp: string;
  updatedAt: string;
  waId: string;
  whatsappMessageId: string;
  firstName: string;
  media_caption: string | null;
  caption: string | undefined;
}

export interface AudioDuration {
  canPlayFastForward: boolean;
  canPlayReverse: boolean;
  canPlaySlowForward: boolean;
  canPlaySlowReverse: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  currentTime: number;
  duration: number;
  naturalSize: {
    height: number;
    orientation: string;
    width: number;
  };
}

export interface MediaFiles {
  [key: string]: {
    downloading: boolean;
    exist: boolean;
    progress: number;
  };
}

export interface fileExistdataInterface {
  [key: string]: {exist: boolean; downloading: boolean; progress: number};
}

export interface ModificationData {
  deletions: any[];
  insertions: any[];
  modifications: any[];
  newModifications: any[];
  oldModifications: any[];
}

export interface ViewToken {
  item: ChatMessage;
  key: string;
  index: number | null;
  isViewable: boolean;
  section?: any;
}

export interface RecordBackType {
  isRecording?: boolean;
  currentPosition: number;
  currentMetering?: number;
}

export interface ImagePreviewDataInterface {
  path: string;
  name: string | null;
  size: number | undefined | null;
  mime: string | undefined | null;
  id: string;
}

export interface ImagePreviewData {
  path: string;
  name: string;
  size: number;
  mime: string;
  id: string;
}
export interface BroadcastInterface {
  id?: string;
  createdAt?: string;
  name?: string;
  project_id?: string;
  status?: string;
  successCount?: string;
  updatedAt?: string | undefined;
  templateMessageId?: string;
  created_by?: string;
}

export interface img {
  path: string;
  mime: string;
  caption: string;
  uploaded: string;
  progress: number;
  size: number;
  id: string;
  name?: string;
}
