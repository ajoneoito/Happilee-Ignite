/**
 * Utlity hooks to manage chatlist model
 * @description Contains all funtion to manage and get data of chat list schema.
 */

import realm from '../schema';
import {ChatListInterface} from '../interfaces';
import {store} from '../../../redux/store/store';

// Functions
// Return all chat list
let getAllChats = (
  projectId: string,
  start: number,
  end: number,
  firstName?: string,
  primary?: string,
  secondary?: string,
) => {
  const authState = store.getState().auth;
  console.log('operator', authState, authState.operator_id);
  // console.warn("chat list",chats)
  let chats = realm
    .objects('ChatList')
    .filtered("status != 'blocked'")
    .sorted('message_created_time', true);
  if (authState.projectId !== 'all') {
    chats = chats
      .filtered('projectId = $0', projectId)
      .filtered('master_operator_id = $0', authState.operator_id);
  }
  if (firstName) {
    chats = chats.filtered('firstName CONTAINS[c] $0', firstName);
  }
  if (primary) {
    switch (primary) {
      case 'ALL': {
        break;
      }
      case 'OPEN': {
        chats = chats.filtered("status = 'open'");
        break;
      }
      case 'BLOCKED': {
        chats = realm
          .objects('ChatList')
          .filtered("status = 'blocked'")
          .sorted('message_created_time', true);
        break;
      }
      case 'EXPIRED': {
        chats = chats.filtered("status = 'expired'");
        break;
      }
      case 'LAST_24_HOURS': {
        chats = chats.filtered(
          'message_created_time > $0 && message_created_time < $1',
          new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          new Date(),
        );
        break;
      }
    }
  }
  if (secondary) {
    switch (secondary) {
      case 'UNREPLIED': {
        chats = chats.filtered('isMessageRead == true');
        break;
      }
      case 'UNREAD': {
        chats = chats.filtered('isMessageRead == false');
        break;
      }
      case 'SOLVED': {
        chats = chats.filtered("status = 'solved'");
        break;
      }
    }
  }
  
  if (start >= 0 && end) {
    // console.warn('chats', start, end);
    chats = chats.slice(start, end);
    let t = JSON.parse(JSON.stringify(chats));
    return t;
  }
  // console.log('CHAT LIST ', chats.length, chats);
  return chats;
};

/**
 * Add a single chat using parameters.
 * Create new instance if not exist or update existing one.
 * @param props ChatListInterface
 */
let addSingleChat = (props: ChatListInterface) => {
  realm.write(() => {
    realm.create(
      'ChatList',
      {
        id: props.id,
        chatName: props.chatName,
        chatUid: props.chatUid,
        fileName: props.fileName,
        messageType: props.messageType,
        candidateId: props.candidateId,
        messageText: props.messageText,
        status: props.status,
        message_created_time: new Date(props?.message_created_time),
        operatorid: props.operatorid,
        master_operator_id: props.master_operator_id,
        isCandidateReplied: props.isCandidateReplied,
        currentUnreadMessageCount: props.currentUnreadMessageCount,
        chatExpiringTime: props.chatExpiringTime,
        chatStartedTime: props.chatStartedTime,
        isMessageRead: props.isMessageRead,
        candidatePhoneNumber: props.candidatePhoneNumber,
        operator_name: props.operator_name,
        firstName: props.firstName,
        projectId: props.projectId,
        project_name: props.project_name ? props.project_name : '',
      },
      'modified',
    );
  });
};

/**
 * Check instance exist on ChatList.
 * @param chatUid of chats
 */
let checkExistChat = (chatUid: string) => {
  let chat = realm.objects('ChatList').filtered('chatUid = $0', chatUid);
  return chat[0];
};

/**
 * Add a multiple chats using array.
 * @param Array of chats
 */
let addMultipleChat = (chats: ChatListInterface[]) => {
  chats
    .slice(0)
    .reverse()
    .map(item => {
      //reversing array so old item get inserted first and new item gets inserted at last
      addSingleChat(item);
    });
};

// Remove all chat from chatList model
let deleteAllChats = (projectId: string) => {
  realm.write(() => {
    realm.delete(getAllChats(projectId));
  });
};
// Remove all chat from chatList with respect to project
let deleteProjectChats = (projectId: string) => {
  let chats = realm.objects('ChatList').filtered('projectId = $0', projectId);
  realm.write(() => {
    realm.delete(chats);
  });
};
// Delete single chat from chatList model
let deleteSingleChats = (chatId: string) => {
  realm.write(() => {
    const chat = realm.objects('ChatList').filtered('chatUid = $0', chatId);
    realm.delete(chat);
  });
};

//Update single chat using chat object
let updateChat = (chat: ChatListInterface) => {
  addSingleChat(chat);
};

//Update multiple chat intance using array of chats
let updateMultipleChat = (chats: ChatListInterface[]) => {
  chats.map(item => {
    addSingleChat(item);
  });
};

//get chatlist by candidateid
let getChatItemByCandidateId = (candidateId: string) => {
  let chatItem = realm
    .objects('ChatList')
    .filtered('candidateId = $0', candidateId);
  return chatItem[0];
};

// Remove all chat from chatList model
let deleteAllGlobalChats = () => {
  realm.write(() => {
    const chat = realm.objects('ChatList');
    realm.delete(chat);
  });
};

export {
  getAllChats,
  addSingleChat,
  addMultipleChat,
  deleteAllChats,
  deleteSingleChats,
  updateChat,
  checkExistChat,
  updateMultipleChat,
  getChatItemByCandidateId,
  deleteProjectChats,
  deleteAllGlobalChats,
};
