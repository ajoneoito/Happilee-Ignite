import {createSlice} from '@reduxjs/toolkit';
import {
  ChatDataInterface,
  ChatMessage,
  ChatSession,
} from '../../interface/ChatboxInterface';

interface audioPlayer {
  isAudioPlaying: boolean | null;
  audioPosition: number;
  audioFile: ChatMessage;
  data: ChatDataInterface;
  item: ChatSession;
  url: string;
  index: number | null;
}
interface audio {
  type: string;
  payload: audioPlayer;
}
const audioPlayer = createSlice({
  name: 'audioPlayer',
  initialState: {
    isAudioPlaying: null,
    audioPosition: 0,
    audioFile: {
      chatId: '',
      chatUid: '',
      conversationId: '',
      createdAt: '',
      eventType: '',
      fileLocationUrl: '',
      fileName: '',
      fileType: '',
      id: '',
      isMessageRead: false,
      localFileLocation: '',
      mediaId: null,
      messageStatusString: '',
      messageText: '',
      messageType: '',
      mime_type: '',
      owner: false,
      recieverId: '',
      senderId: '',
      senderName: '',
      sha256: '',
      status: '',
      templateMessageId: '',
      ticketId: '',
      timestamp: '',
      updatedAt: '',
      waId: '',
      whatsappMessageId: '',
      firstName: '',
      media_caption: '',
    },
    data: {},
    Item: {
      candidateId: '',
      candidatePhoneNumber: '',
      chatExpiringTime: '',
      chatName: '',
      chatStartedTime: '',
      chatUid: '',
      currentUnreadMessageCount: 0,
      fileName: '',
      firstName: '',
      id: '',
      isCandidateReplied: false,
      isMessageRead: null,
      messageText: '',
      messageType: '',
      message_created_time: '',
      operator_name: '',
      operatorid: '',
      projectId: '',
      status: '',
    },
    url: '',
    index: null,
  },
  reducers: {
    setAudioPlayer: (state: any, action: audio) => {
      state = action.payload;
      return state;
    },
  },
});
export const {setAudioPlayer} = audioPlayer.actions;

export {audioPlayer};
