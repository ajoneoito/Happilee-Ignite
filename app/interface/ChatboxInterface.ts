/**
 * ChatBoxInterface.ts
 * @module Chatbox interface
 * @desc All chatbox interfaces are listed here
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

export interface ChatMessage {
  chatId: string;
  chatUid: string;
  conversationId: string;
  createdAt: string;
  eventType: string;
  fileLocationUrl: string;
  fileName?: string | null;
  fileType?: string | null;
  id: string;
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
}
export interface ChatSession {
  candidateId?: string | null;
  candidatePhoneNumber?: string | null;
  chatExpiringTime?: string | null;
  chatName?: string | null;
  chatStartedTime?: string | null;
  chatUid?: string;
  currentUnreadMessageCount?: number;
  fileName?: string | null;
  firstName?: string | null;
  id?: string | null;
  isCandidateReplied?: boolean;
  isMessageRead?: boolean | null;
  messageText?: string | null;
  messageType?: string | null;
  message_created_time?: string | null;
  operator_name?: string | null;
  operatorid?: string | null;
  projectId?: string | null;
  status?: string | null;
}

export interface statusMenu {
  statusData: string[];
  status?: string;
  onChangeStatus: (item: string) => void | undefined;
}

export interface ChatBoxHeaderInterface {
  title: string;
  status?: string;
  statusData: string[];
  expirationTime: string;
  onPress: () => void;
  AudioState: any;
  onPressnameView?: () => void;
  onClickMenu: (item: string) => void | undefined;
  onChangeStatus: (item: string) => void | undefined;
}

export interface nativeEventInterface {
  contentInset: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  contentOffset: {
    x: number;
    y: number;
  };
  contentSize: {
    height: number;
    width: number;
  };
  layoutMeasurement: {
    height: number;
    width: number;
  };
  responderIgnoreScroll?: boolean;
  target?: number;
  velocity?: {
    x: number;
    y: number;
  };
}

export type ChatData = {
  data: {
    candidateId: string;
    candidatePhoneNumber: string;
    chatExpiringTime: string;
    chatName: string;
    chatStartedTime: string;
    chatUid: string;
    currentUnreadMessageCount: number;
    fileName: string | null;
    firstName: string;
    id: string;
    isCandidateReplied: boolean;
    isMessageRead: boolean;
    messageText: string;
    messageType: string;
    message_created_time: string;
    operator_name: string;
    operatorid: string;
    projectId: string;
    status: string;
  };
};

export interface ChatDataInterface {
  candidateId: string;
  candidatePhoneNumber: string;
  chatExpiringTime: string;
  chatName: string;
  chatStartedTime: string;
  chatUid: string;
  currentUnreadMessageCount: number;
  fileName: string | null;
  firstName: string;
  id: string;
  isCandidateReplied: boolean;
  isMessageRead: boolean;
  messageText: string;
  messageType: string;
  message_created_time: string;
  operator_name: string;
  operatorid: string;
  projectId: string;
  status: string;
}

export interface SelectPhotoScreenParams {
  candidateId: number;
  data: {
    candidateId: string;
    candidatePhoneNumber: string;
    chatExpiringTime: string;
    chatName: string;
    chatStartedTime: string;
    chatUid: string;
    currentUnreadMessageCount: number;
    fileName: string | null;
    firstName: string;
    id: string;
    isCandidateReplied: boolean;
    isMessageRead: boolean;
    messageText: string;
    messageType: string;
    message_created_time: string;
    operator_name: string;
    operatorid: string;
    projectId: string;
    status: string;
  };
}

export interface initialStatesInterface {
  exist: boolean | undefined;
  downloading: boolean;
  progress: number;
  id: string;
}
