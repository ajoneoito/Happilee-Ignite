/**
 * messaging.ts
 * @module Notification utils
 * @desc Utility funtions realted to push notification (messaging / FCM).
 * @author Saifali NeoITO.
 * @version 0.0.1
 * @access public
 * ...
 */
import messaging from '@react-native-firebase/messaging';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Alert} from 'react-native';
import {GET_CHAT_HISTORY_ACTION} from '../../redux/actions/chathistory.action';
import {API_LIMIT} from '../../constants/pagination';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
import {routeEnum} from '../../enums/route.enum';
import {ChatListInterface, ProjectInterface} from '../database/interfaces';
import {addSingleChat} from '../database/realmHooks/useChatList';
import {t} from 'i18next';
import {PROJECT_TOKEN_GENERATION_ACTION} from '../../redux/actions/project.action';
import {checkExistProject} from '../database/realmHooks/useProjects';
import {store} from '../../redux/store/store';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import Sounds from './sounds';
import { Toast } from '../../components/AlertComponent';

// Create a new Loader Class.
const MMKV = new MMKVLoader().initialize();

/**
 * @function requestMessagingPermission
 * This code is a function that asks the user for permission to receive push notifications.
 * If permission is granted, the authorization status will be logged to the console.
 * @async
 */
export async function requestMessagingPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFCMToken();
  }
}

/**
 * @function GetFCMToken
 * This function retrieves a Firebase Cloud Messaging (FCM) token.
 * If the token is not stored, it tries to get it from Firebase and store it for later use.
 * Any errors during the process are logged.
 * @async
 * @returns {string} fcmtoken
 */
export async function GetFCMToken() {
  let fcmtoken = await MMKV.getStringAsync('fcmtoken');
  // console.warn("fcmtoken",fcmtoken)
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await MMKV.setStringAsync('fcmtoken', fcmtoken);
      }
    } catch (e) {
      console.log(e);
    }
  }

  await messaging()
    .getAPNSToken()
    .then(() => {});

  return fcmtoken;
}

/**
 * @function forgroundFCMListner
 * This function listens for Firebase Cloud Messaging (FCM) notifications and displays an alert with the message when it arrives when app in a opend state.
 * It uses the onMessage method from the Firebase Cloud Messaging library to listen for incoming notifications.
 * When a notification is received, an alert is displayed with the message content.
 */
export function forgroundFCMListner(dispatch: any) {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    let data = JSON.parse(remoteMessage?.data?.data);
    // console.warn('notification in app opened state', data);
    if (data.owner !== true) {
      Sounds.recieve.play();
      Toast.show({
        // type: ALERT_TYPE.SUCCESS,
        title: data?.firstName,
        textBody: data?.messageText,
      });
    }
    //Notification on app forground state, will be handled by centrifuge,
    // Alert.alert(
    //   remoteMessage?.notification?.title,
    //   remoteMessage?.notification?.body,
    // );
  });

  //   When a notification from FCM has triggered the application to open from a quit state,
  //   this method will return a RemoteMessage containing the notification data,
  //   or null if the app was opened via another method.
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // console.log('onNotificationOpenedApp from quit state', remoteMessage);
        let data = JSON.parse(remoteMessage?.data?.data);
        checkProject(data);
        // console.warn('quit state data', data);
      }
    });

  // When the user presses a notification displayed via FCM,
  // this listener will be called if the app has opened from a background state.
  messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage) {
      // console.log(
      //   'onNotificationOpenedApp from background state',
      //   remoteMessage,
      // );
      let data = JSON.parse(remoteMessage?.data?.data);
      checkProject(data);
      // console.warn('background state data', data);
    }
  });

  /**
   * Check notification from active project or another one.
   * Ask project switching confirmation if notification is not from current project.
   * @param item ChatListInterface
   */
  const checkProject = async (item: ChatListInterface) => {
    // add project switching funtion
    // addSingleChat(item);
    const authState = store.getState().auth;
    if (authState.projectId !== item.projectId) {
      Alert.alert('Switch Project', t('project:PROJECT_ALERT_TITLE'), [
        {
          text: 'Cancel',
          onPress: () => {
            gotoChatList;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            switchProject(item);
          },
        },
      ]);
    } else {
      gotoChatHistory(item);
    }
  };

  /**
   * Project switching function.
   * @param item
   */
  const switchProject = (item: ChatListInterface) => {
    let project: ProjectInterface = checkExistProject(item?.projectId);
    if (project) {
      dispatch({
        type: SPINNER_ACTION,
        payload: {
          spinning: true,
          title: 'Please wait...',
          body: 'Switching project.',
        },
      });
      dispatch({
        type: PROJECT_TOKEN_GENERATION_ACTION,
        payload: {
          project_id: project.id,
          project_name: project.project_name,
        },
      });
    }
    // gotoChatHistory(item);
  };

  const gotoChatList = () => {
    resetNavigation({
      index: 1,
      routes: [{name: routeEnum.LOGGEDSCREENS}],
    });
  };

  const gotoChatHistory = (item: ChatListInterface) => {
    navigate(routeEnum.CHATBOX, {data: item});
    dispatch({
      type: GET_CHAT_HISTORY_ACTION,
      payload: {
        chat_uid: item.chatUid,
        pageNumber: 1,
        limit: API_LIMIT,
      },
    });
  };

  return unsubscribe;
}
