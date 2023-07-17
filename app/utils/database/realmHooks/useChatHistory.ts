/**
 * Utlity hooks to manage chat history model
 * @description Contains all funtion to manage and get data of chat history schema.
 */

import realm from '../schema';
import {ChatHistoryInterface} from '../interfaces';

// Functions
// Return all chat history of given chatUid
let getChatsHistory = (chatUid?: string, offset?: number, limit?: number) => {
  return realm
    .objects('ChatHistory')
    .sorted('id', true)
    .filtered('chatUid = $0', chatUid)
    .slice(offset, limit);
};

/**
 * Add a single chathistory using props.
 * Create new instance if not exist or update existing one.
 * @param props ChatHistoryInterface
 */
let addSingleChatHistory = (props: ChatHistoryInterface) => {
  realm.write(() => {
    realm.create(
      'ChatHistory',
      {
        id: props.id,
        chatId: props.chatId,
        whatsappMessageId: props.whatsappMessageId,
        conversationId: props.conversationId,
        ticketId: props.ticketId,
        owner: props.owner,
        messageText: props.messageText,
        isMessageRead: props.isMessageRead,
        messageType: props.messageType,
        senderName: props.senderName,
        waId: props.waId,
        timestamp: new Date(props?.timestamp),
        messageStatusString: props.messageStatusString,
        chatUid: props.chatUid,
        eventType: props.eventType,
        senderId: props.senderId,
        recieverId: props.recieverId,
        status: props.status,
        fileName: props.fileName,
        fileType: props.fileType,
        fileLocationUrl: props.fileLocationUrl,
        localFileLocation: props.localFileLocation,
        templateMessageId: props.templateMessageId,
        mediaId: props.mediaId,
        mime_type: props.mime_type,
        sha256: props.sha256,
        createdAt: new Date(props.createdAt),
        updatedAt: new Date(props?.updatedAt),
        media_caption: props.media_caption,
      },
      'modified',
    );
  });
};

/**
 * Check instance exist on ChatHistory.
 * @param id of chats
 */
let checkExistChatHistory = (id: string) => {
  let history = realm.objects('ChatHistory').filtered('id = $0', id);
  return history;
};

/**
 * Add a multiple chat history using array.
 * @param Array of chat history
 */
let addMultipleChatHistory = (history: ChatHistoryInterface[]) => {
  history.map(item => {
    addSingleChatHistory(item);
  });
};

/**
 *  Remove all history from chatHistory model using chatUid
 * @param chatUid
 */
let deleteChatHisory = (chatUid?: string) => {
  realm.write(() => {
    realm.delete(getChatsHistory(chatUid));
  });
};

// Delete single chat history using chat id
let deleteSingleChatHistory = (id: string) => {
  realm.write(() => {
    const chat = realm.objects('ChatHistory').filtered('id = $0', id);
    realm.delete(chat);
  });
};

//Update single chat history using object
let updateChatHistory = (history: ChatHistoryInterface) => {
  addSingleChatHistory(history);
};

//Update multiple chat intance using array of chats
let updateMultipleChatHistroy = (history: ChatHistoryInterface[]) => {
  history.map(item => {
    addSingleChatHistory(item);
  });
};

export {
  getChatsHistory,
  addSingleChatHistory,
  checkExistChatHistory,
  addMultipleChatHistory,
  deleteChatHisory,
  deleteSingleChatHistory,
  updateChatHistory,
  updateMultipleChatHistroy,
};
