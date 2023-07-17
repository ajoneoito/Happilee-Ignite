/**
 * Authentication Services
 * @module AuthRequests
 * @desc Authentication related api request and firebase auth funtions.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import { authEndPoint } from "../enums/authEndpoint"
import {
  emailOtp,
  fcmSubBody,
  logoutBody,
  preLogin,
  updateInfo,
  verifyEmail,
} from "../interface/preLogin"
import { request } from "../request/request"
import { ALERT_TYPE, Toast } from "../../components/AlertComponent"
// import {CENTRIFUGE_URL} from '@env';
import Centrifuge from "centrifuge"
import { store } from "../../redux/store/store"
import { addSingleChat, deleteSingleChats } from "../../utils/database/realmHooks/useChatList"
import { addSingleContact } from "../../utils/database/realmHooks/useContacts"
import Sounds from "../../utils/functions/sounds"
import {
  addMultipleChatHistory,
  deleteChatHisory,
} from "../../utils/database/realmHooks/useChatHistory"
import i18next from "i18next"
import realm from "../../utils/database/schema"
import { UPLOAD_IMAGE } from "../../redux/actions/imageToUpload.action"
import { addFbLeads, Handle } from "../../screens/FbLeads/lead.component"

const { t } = i18next
/**
 * Login precheck axios request.
 * @param {preLogin} body Request body.
 * @returns Axios response.
 */
export const preLoginRequest = async (body: preLogin) => {
  const CENTRIFUGE_URL = ""
  const response = await request
    .post(authEndPoint.loginPrecheck, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * Operator info update request .
 * @param {updateInfo} body Request body.
 * @returns Axios response.
 */
export const updateInfoRequest = async (body: updateInfo) => {
  const response = await request
    .post(authEndPoint.updateOperatorInfo, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed",
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * Generate OTP for email verification.
 * @param {emailOtp} body Request body.
 * @returns Axios response.
 */
export const generateEmailOtpRequest = async (body: emailOtp) => {
  const response = await request
    .post(authEndPoint.generateEmailotp, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * Verify email with OTP..
 * @param {verifyEmail} body Request body.
 * @returns Axios response.
 */
export const verifyEmailOtpRequest = async (body: verifyEmail) => {
  const response = await request
    .post(authEndPoint.verifyEmail, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * Refresh auth token.
 * @returns Axios response.
 */
export const refreshAuthTokenRequest = async () => {
  const response = await request
    .post(authEndPoint.refreshAuthtoken)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * Connect to centrifuge.
 */

export const connectToCentrifuge = async (dispatch: any) => {
  try {
    const authState = store.getState().auth
    const imageState = store.getState().imageToUpload
    const centrifuge = new Centrifuge(CENTRIFUGE_URL)

    centrifuge.setToken(authState.centryfugeToken)
    centrifuge.on("connect", function () {})

    centrifuge.on("disconnect", function () {})
    const clientChannelName = authState.channelId
    centrifuge.subscribe(clientChannelName, function (ctx) {
      if (ctx?.data?.target === "chat_deleted") {
        // Delete chat hit..
        deleteSingleChats(ctx.data?.data?.deleted_chat_uid) // delete chat/contact from chatlist table.
        deleteChatHisory(ctx.data?.data?.deleted_chat_uid) // delete chat history from chatHistory table.
      } else if (
        ctx.data?.target &&
        ctx.data?.data &&
        (ctx.data?.target === "chat_list" || ctx.data?.target === "operator_chat_change")
      ) {
        addSingleChat(ctx.data.data)
      } else if (ctx?.data?.target === "chat_history") {
        ctx?.data?.data?.map((chatHistory: any) => {
          if (
            (chatHistory.messageType === "image" ||
              chatHistory.messageType === "video" ||
              chatHistory.messageType === "document" ||
              chatHistory.messageType === "audio") &&
            chatHistory.fileLocationUrl !== null &&
            chatHistory.fileLocationUrl !== undefined &&
            chatHistory.fileLocationUrl !== ""
          ) {
            const mediaId = chatHistory.mediaId
            realm.write(() => {
              const imageToDelete = realm.objects("ChatHistory").filtered("id == $0", mediaId)
              realm.delete(imageToDelete)
            })
            let imageArray: any = []
            if (imageState?.length) {
              imageState?.map((item) => {
                if (item.id !== mediaId) {
                  imageArray.push(item)
                } else {
                  return
                }
              })
              dispatch({
                type: UPLOAD_IMAGE,
                payload: imageArray,
              })
            }
            addMultipleChatHistory([chatHistory])
          } else if (
            chatHistory.messageType !== "image" &&
            chatHistory.messageType !== "document" &&
            chatHistory.messageType !== "video" &&
            chatHistory.messageType !== "audio"
          ) {
            addMultipleChatHistory([chatHistory])
          }
          //Update the chat history here
          //Check mesege ownr and notify if reciever
          // if (chatHistory.owner !== true) {
          //   Sounds.recieve.play();
          //   Toast.show({
          //     // type: ALERT_TYPE.SUCCESS,
          //     title: chatHistory?.senderName,
          //     textBody: chatHistory?.messageText,
          //   });
          // }
        })
      } else if (ctx?.data?.target === "chat_list_status") {
        let chat = realm
          .objects("ChatList")
          .filtered("candidateId = $0", ctx?.data?.data?.candidateId)
        if (chat && chat.length) {
          realm.write(() => {
            chat[0].status = ctx?.data?.data?.status
          })
        }
      } else if (ctx?.data?.target === "add_contact") {
        addSingleContact(ctx?.data?.data[0])
      } else if (ctx?.data?.target === "fb_lead_generation") {
        addFbLeads(ctx?.data?.data, dispatch)
      }
    })

    centrifuge.connect()
  } catch (error) {
    console.log(error, "centrifugo error")
  }
}

/**
 * FCM Device subscription for notification.
 * @param {fcmSubBody} body Request body.
 * @returns Axios response.
 */
export const fcmSubscribeRequest = async (body: fcmSubBody) => {
  const response = await request
    .post(authEndPoint.fcmSubscribe, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}

/**
 * FCM Device un-subscription / user logout.
 * @param {logoutBody} body Request body.
 * @returns Axios response.
 */
export const userlogoutRequest = async (body: logoutBody) => {
  const response = await request
    .post(authEndPoint.userLogout, body)
    .then((result) => {
      return result
    })
    .catch((error) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t("authRequest:ALERT_FAILED_TITLE"),
        textBody: error?.response?.data?.message,
      })
      return false
    })
  return response
}
