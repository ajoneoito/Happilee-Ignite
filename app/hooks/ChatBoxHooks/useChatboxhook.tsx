/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Linking,
  FlatList,
  Platform,
  PermissionsAndroid,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import moment from 'moment';
import {C} from '../../constants';
import {
  AUDIO_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
  DOCUMENT_PATH,
} from '../../constants/folderPath';
import {
  ViewToken,
  MediaFiles,
  ImageUpload,
  ChatHistoryInterface,
  ImageToUploadInterface,
  fileExistdataInterface,
  FileFromCameraInterface,
  ImagePreviewDataInterface,
} from '../../utils/database/interfaces';
import useStateRef from '../useStateRef';
import {
  ChatData,
  ChatMessage,
  ChatSession,
} from '../../interface/ChatboxInterface';
import AudioRecorderPlayer, {
  AudioSet,
  RecordBackType,
  AVModeIOSOption,
  AVEncodingOption,
  AudioSourceAndroidType,
  AudioEncoderAndroidType,
  AVEncoderAudioQualityIOSType,
} from 'react-native-audio-recorder-player';
import {
  TEMPLATE_LIST_ACTION,
  GLOBAL_TEMPLATE_LIST_ACTION,
} from '../../redux/actions/templates.action';
import {
  SEND_MEDIA_MESSAGE,
  GET_CHAT_HISTORY_ACTION,
  SEND_TEXT_MESSAGE_ACTION,
  CHANGE_CHAT_STATUS_ACTION,
  SEND_MEDIA_MESSAGE_TO_CHAT,
  GET_GLOBAL_CHAT_HISTORY_ACTION,
  SEND_GLOBAL_TEXT_MESSAGE_ACTION,
} from '../../redux/actions/chathistory.action';
import {
  SET_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER,
  SET_PRESENT_SCREEN,
} from '../../redux/actions/audioPlayer.action';
import realm from '../../utils/database/schema';
import {routeEnum} from '../../enums/route.enum';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_PREVIEW,
} from '../../redux/actions/imageToUpload.action';
import {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {RootState} from '../../redux/store/root.reducer';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import {navigate} from '../../navigation/useNavigationUtils';
import {PERMISSIONS, request} from 'react-native-permissions';
import ChatBoxStyle from '../../screens/ChatBox/ChatBox.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {useChatBoxExpiryTimeHook} from './useChatBoxExpiryTimeHook';
import {checkExistChat} from '../../utils/database/realmHooks/useChatList';
import {UPDATE_CHAT_COUNT_ACTION} from '../../redux/actions/chatlist.action';
import {getChatsHistory} from '../../utils/database/realmHooks/useChatHistory';
import {API_LIMIT, REALM_LIMIT, REALM_OFFSET} from '../../constants/pagination';
import {GET_CANDIDATEDETAILS_ACTION} from '../../redux/actions/candidateDetails.action';

// this hook is main chatbox hook used inside ChaBox.screen.tsx screen
let time: number = 0;
let audioLink: string = '';

const historyModal = realm.objects('ChatHistory');
const audioRecorderPlayer = new AudioRecorderPlayer();
export const useChatboxMainHook = () => {
  const dgl = C.measures.dgl;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [url, setUrl] = useState('');
  const [limit] = useState(REALM_LIMIT);
  const [imoji, setImoji] = useState(false);
  const [caption, setcaption] = useState('');
  const [paused, setPaused] = useState(false);
  const {data} = useRoute().params as ChatData;
  const [isEnlarge, setIsEnlarge] = useState('');
  const [seconds, setSeconds] = useState('00:00');
  const [showDate, setShowDate] = useState(false);
  const flatlistRef = useRef<FlatList | null>(null);
  const [paginated, setPaginated] = useState(false);
  const [isMessageCopied, setIsMessageCopied] = useState(false);
  const {expirationTime} = useChatBoxExpiryTimeHook(
    new Date(data?.chatExpiringTime),
  );
  const [textMessage, setTextMessage] = useState('');
  const [offset, setOffset] = useState(REALM_OFFSET);
  const [history, setStateRef, ref] = useStateRef([]);
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);
  const [modalVisible, setModalVisible] = useState(false);
  const endDate = moment(new Date()).format('YYYY-MM-DD');
  const toDate = moment(endDate);
  const Item = checkExistChat(data?.chatUid) as ChatSession;
  const [showImageHeader, setShowImageHeader] = useState(true);
  const [imageArray, setImageArray, imageRef] = useStateRef([]);
  const [audioIndex, setAudioIndex] = useState<number | null>(-1);
  const authState = useSelector((state: RootState) => state.auth);
  const [sectionDate, setSectionDate] = useState(
    moment(history[history[history.length - 1]]?.createdAt).format(
      'YYYY-MM-DD',
    ),
  );
  const [messageDetails, setMessageDetails] = useState<
    ChatMessage | ImageToUploadInterface
  >();
  const AudioFile = useSelector((state: RootState) => state.audioPlayer);
  const historyState = useSelector((state: RootState) => state.chatHistory);
  const imageState = useSelector((state: RootState) => state.imageToUpload);
  const sending = useSelector((state: RootState) => state.spinner.spinning);
  const AudioState = useSelector((state: RootState) => state.closeAudioPLayer);

  useEffect(() => {
    // fetching chat history
    try {
      setStateRef(getChatsHistory(data.chatUid, offset, limit));
      setOffset(offset + limit);
      historyModal.addListener(onChatHistoryChanges);
    } catch (error) {}
    return () => {
      //Update message read count, Dont remove or replace it from here.
      dispatch({
        type: UPDATE_CHAT_COUNT_ACTION,
        payload: {
          candidate_id: data?.candidateId,
          chatUid: data?.chatUid,
        },
      });
      // realm listener for checking any change is made in chathistory
      realm.removeListener('change', onChatHistoryChanges);
    };
  }, []);

  /**
   * This useEffect will whenever the chat history screen appears to enable the toggle functionality of Audio Player
   * If the present screen !== chatScreen,
   * then by pressing the global audio player,
   * it will navigate to the chat screen and will fetch curresponding chat history
   */
  useEffect(() => {
    dispatch({
      type: SET_PRESENT_SCREEN,
      payload: {presentScreen: 'chatScreen'},
    });
    return () => {
      dispatch({
        type: SET_PRESENT_SCREEN,
        payload: {presentScreen: ''},
      });
    };
  }, [navigation.isFocused()]);

  // This useEffect is used to start record audio.
  // First this hook will check the audio path is exist or not
  // and check the OS and then check the device is allowed the permission for recording audio.
  useEffect(() => {
    try {
      ReactNativeBlobUtil.fs
        .exists(AUDIO_PATH)
        .then(response => {
          if (response === false) {
            ReactNativeBlobUtil.fs
              .mkdir(AUDIO_PATH)
              .then(() => {})
              .catch(() => {});
          }
        })
        .catch(() => {});
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
          .then(grant => {
            if (isRecording && grant === 'granted') {
              onStartRecord();
            } else if (grant !== 'granted') {
              Alert.alert('Allow storage_permission');
            }
          })
          .catch(() => {});
      } else {
        request(PERMISSIONS.IOS.MICROPHONE).then(() => {
        });
      }
    } catch (error) {}
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      onStopRecord(false);
    };
  }, [isRecording]);

  useEffect(() => {
    try {
      setImagesToArray();
    } catch (error) {}
  }, [imageState]);

  const onChatHistoryChanges = (modal: any, changes: any) => {
    // Handle newly added chat history objects
    try {
      changes?.insertions?.forEach((index: number) => {
        try {
          const insertedChat = modal[index];
          const itemExists = history.find(
            (obj: ChatHistoryInterface) => obj?.id === insertedChat?.id,
          );
          let mediaId = insertedChat?.mediaId;
          if (!itemExists && insertedChat?.chatUid === data?.chatUid) {
            if (
              (insertedChat?.messageType === 'image' ||
                insertedChat?.messageType === 'video' ||
                insertedChat?.messageType === 'audio' ||
                insertedChat?.messageType === 'document') &&
              insertedChat?.fileLocationUrl !== null &&
              insertedChat?.fileLocationUrl !== undefined &&
              insertedChat?.fileLocationUrl !== ''
            ) {
              if (imageState?.length === 1 && imageState[0]?.id === '') {
              } else {
                deleteFile(mediaId);
              }
              ref.current = [insertedChat, ...ref?.current];
              setStateRef([...ref.current]);
            } else {
              ref.current = [insertedChat, ...ref?.current];
              setStateRef([...ref.current]);
            }
            if (!insertedChat?.isMessageRead && navigation.isFocused()) {
              dispatch({
                type: UPDATE_CHAT_COUNT_ACTION,
                payload: {
                  candidate_id: data.candidateId,
                  chatUid: data.chatUid,
                },
              });
            }
            if (
              insertedChat?.messageText?.toUpperCase() === 'START' ||
              insertedChat?.messageText?.toUpperCase() === 'STOP'
            ) {
              dispatch({
                type: GET_CANDIDATEDETAILS_ACTION,
                payload: {
                  candidateId: Number.parseInt(data?.candidateId, 10),
                },
              });
            }
          }
        } catch (error) {}
      });
      changes?.deletions?.forEach((_index: number) => {
        // You cannot directly access deleted objects,
        // but you can update a UI list, etc. based on the index.
      });
      // Handle chat history objects that were modified
      changes?.modifications?.forEach((_index: number) => {
        // const modifiedDog = historyModal[index];
      });
    } catch (error) {}
  };

  // To delete the preview file by media id of actual file.
  const deleteFile = (mediaId: string) => {
    try {
      let images: ImageUpload[] = [];
      if (imageState?.length) {
        imageState?.map(item => {
          if (item.id !== mediaId) {
            images.push(item);
          }
        });
        if (imageState?.length === 1 && imageState[0]?.id === '') {
        } else {
          dispatch({
            type: UPLOAD_IMAGE,
            payload: images,
          });
        }
      }
    } catch (error) {}
  };

  // paginating chat history and fetching chat and append the fetched data to the state
  const loadMoredata = () => {
    try {
      if (historyState.hasNextPage === true) {
        try {
          dispatch({
            type:
              authState.projectId === 'all'
                ? GET_GLOBAL_CHAT_HISTORY_ACTION
                : GET_CHAT_HISTORY_ACTION,
            payload: {
              chat_uid: Item?.chatUid,
              pageNumber: historyState.pageNumber + 1,
              limit: API_LIMIT,
            },
          });
        } catch (error) {}
      }
      // this condition is used to prevent continues hitting of the same api by scrolling flatlist.
      if (!paginated) {
        let paginatedArray = getChatsHistory(
          Item?.chatUid,
          offset,
          offset + limit,
        );
        setOffset(offset + limit);
        ref.current = [...ref?.current, ...paginatedArray];
        setStateRef([...ref.current]);
        if (paginatedArray?.length < limit) {
          setPaginated(true);
        }
      }
    } catch (error) {}
  };

  // To delete the preview file
  const onPressPreviewDelete = (ele: ImageUpload | ImageToUploadInterface) => {
    try {
      const array: ImageUpload[] = [];
      if (imageState?.length) {
        imageState?.map(item => {
          if (ele !== item) {
            array.push(item);
          }
        });
        dispatch({
          type: UPLOAD_IMAGE,
          payload: array,
        });
      }
    } catch (error) {}
  };

  // To get the viewable messages in chat.
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    try {
      setSectionDate(
        moment(
          ref?.current[viewableItems[viewableItems.length - 1]?.index || 0]
            ?.createdAt,
        ).format('YYYY-MM-DD'),
      );
    } catch (error) {}
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  const onPressImageView = (item: ChatMessage) => {
    if (item?.messageType === 'image' || item?.mime_type === 'image/png') {
      updateUrl(
        item?.owner
          ? item?.fileLocationUrl
          : item?.localFileLocation || item?.fileLocationUrl,
        item?.media_caption,
      );
    } else {
      if (Platform.OS === 'android') {
        updateUrl(`${VIDEO_PATH}/${item?.fileName}`, item?.media_caption);
      } else {
        updateUrl(
          `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${item?.fileName}`,
          item?.media_caption,
        );
      }
    }
    updateMessageDetails(item);
    updateFileEnlargeState(
      item?.messageType === 'image' || item?.mime_type === 'image/png'
        ? 'image'
        : 'video',
    );
  };

  // function that invokes when the send button is pressed
  const sendMessage = () => {
    if (textMessage.length) {
      dispatch({
        type:
          authState.projectId === 'all'
            ? SEND_GLOBAL_TEXT_MESSAGE_ACTION
            : SEND_TEXT_MESSAGE_ACTION,
        payload: {
          candidate_id: data?.candidateId,
          message: textMessage,
        },
      });
      setTextMessage('');
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Type somthing....',
      });
    }
  };

  // to update chat status in the header section
  // 2 values will be there > open, resolved
  const updateChatStatus = (status: string) => {
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'Please wait...',
        body: 'Updating chat status.',
      },
    });
    dispatch({
      type: CHANGE_CHAT_STATUS_ACTION,
      payload: {
        chatUid: Item?.chatUid,
        status: status.toLowerCase(),
      },
    });
  };

  // To navigate to contact information screen
  const onPressnameView = () => {
    dispatch({
      type: GET_CANDIDATEDETAILS_ACTION,
      payload: {
        candidateId: Number.parseInt(data?.candidateId, 10),
      },
    });
    navigate(routeEnum.CONTACTINFOMAINSCREEN, {
      id: data?.chatUid,
      candidateId: data?.candidateId,
      status: Item?.status || 'closed',
    });
  };

  // function to send template to chat
  const sendTemplateMsg = () => {
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'Please wait...',
        body: 'Fetching templates!',
      },
    });
    dispatch({
      type:
        authState.projectId === 'all'
          ? GLOBAL_TEMPLATE_LIST_ACTION
          : TEMPLATE_LIST_ACTION,
    });
    navigate(routeEnum.TEMPLATESCREEN, {
      num: data.candidatePhoneNumber,
      key: 'chat',
    });
  };

  // take video using camera
  const captureVideo = () => {
    try {
      dispatch({
        type: CLOSE_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: null,
        },
      });
      dispatch({
        type: SET_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: false,
          audioPosition: 0,
          audioFile: AudioFile?.audioFile,
          data: AudioFile?.data,
          Item: AudioFile?.Item,
          url: AudioFile?.url,
          index: AudioFile?.index,
        },
      });
      ImagePicker.openCamera({
        mediaType: 'video',
        width: 300,
        height: 400,
      })
        .then(image => {
          if (image) {
            fileArray(image);
          }
        })
        .catch(error => {
          console.log(error, 'error video');
        });
    } catch (error) {}
  };

  // take image using camera
  const captureImage = () => {
    try {
      dispatch({
        type: CLOSE_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: null,
        },
      });
      dispatch({
        type: SET_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: false,
          audioPosition: 0,
          audioFile: AudioFile?.audioFile,
          data: AudioFile?.data,
          Item: AudioFile?.Item,
          url: AudioFile?.url,
          index: AudioFile?.index,
        },
      });
      ImagePicker.openCamera({
        mediaType: 'photo',
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        if (image) {
          fileArray(image);
        }
      });
    } catch (error) {}
  };

  // setting the file captured using camera
  const fileArray = async (file: FileFromCameraInterface) => {
    const media = await ReactNativeBlobUtil.fs.readStream(file?.path, 'ascii');
    if (media?.streamId) {
      const array: ImagePreviewDataInterface[] = [];
      array.push({
        path: file?.path,
        name: file?.path.replace(/^.*[\\\/]/, ''),
        size: file?.size,
        mime: file?.mime,
        id: media?.streamId,
      });
      sendMediaPreview(array);
      setModalVisible(false);
      navigate(routeEnum.SELECTPHOTOSCREEN, {
        // passing the selected image data to SelectPhotoScreen.tsx
        image: file,
        candidateId: data?.candidateId,
        from: 'camera',
        data: data,
      });
    }
  };

  // picking document from file storage
  // Image, video, audio and other document file.
  const takeDocument = async () => {
    setModalVisible(false);
    dispatch({
      type: CLOSE_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: null,
      },
    });
    dispatch({
      type: SET_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: false,
        audioPosition: 0,
        audioFile: AudioFile?.audioFile,
        data: AudioFile?.data,
        Item: AudioFile?.Item,
        url: AudioFile?.url,
        index: AudioFile?.index,
      },
    });
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.video,
          DocumentPicker.types.pdf,
          DocumentPicker.types.audio,
        ],
        allowMultiSelection: true,
        copyTo: 'documentDirectory',
      });
      const previewArray: ImageUpload[] = [];
      const array: ImagePreviewDataInterface[] = [];
      await res?.map(async item => {
        if (item?.type === 'application/pdf' || item?.type?.includes('audio')) {
          if (item?.size && item?.size <= 16000000) {
            let path =
              Platform.OS === 'ios'
                ? item?.uri.replace('file://', '')
                : res[0].uri;
            const media = await ReactNativeBlobUtil.fs.readStream(
              path,
              'ascii',
            );
            if (Platform.OS === 'ios') {
            } else {
              const copyTo = item?.type?.includes('audio')
                ? AUDIO_PATH
                : DOCUMENT_PATH;
              ReactNativeBlobUtil.fs
                .exists(copyTo)
                .then(response => {
                  if (response === false) {
                    ReactNativeBlobUtil.fs
                      .mkdir(copyTo)
                      .then(() => {
                        ReactNativeBlobUtil.fs.cp(
                          decodeURIComponent(`${item?.fileCopyUri}`),
                          `${copyTo}/${item?.name}`,
                        );
                      })
                      .catch(() => {});
                  } else {
                    ReactNativeBlobUtil.fs.cp(
                      decodeURIComponent(`${item?.fileCopyUri}`),
                      `${copyTo}/${item?.name}`,
                    );
                  }
                })
                .catch(() => {});
            }
            if (media?.streamId) {
              previewArray.push({
                id: media?.streamId,
                path: item?.fileCopyUri,
                mime: item?.type,
                caption: '',
                uploaded: '',
                progress: 0,
                chatUid: data?.chatUid,
              });
              let body = new FormData();
              body.append('file', {
                uri: path,
                name: item?.name,
                filename: item?.name,
                type: item?.type,
              });
              body.append('Content-Type', item?.type);
              dispatch({
                type: SEND_MEDIA_MESSAGE,
                payload: {
                  params: {
                    candidate_id: data?.candidateId,
                    media_id: media?.streamId,
                    file_path:
                      item?.type === 'application/pdf'
                        ? `file//${DOCUMENT_PATH}/${item?.name}`
                        : `file//${AUDIO_PATH}/${item?.name}`,
                  },
                  file: body,
                },
              });
            }
          } else {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'File must must be between 64kb to 16mb',
              textBody: '',
            });
          }
        } else {
          let path =
            Platform.OS === 'ios'
              ? item?.uri.replace('file://', '')
              : res[0].uri;
          const media = await ReactNativeBlobUtil.fs.readStream(path, 'ascii');
          if (media?.streamId?.length) {
            array.push({
              path:
                Platform.OS === 'ios'
                  ? decodeURIComponent(`${item?.fileCopyUri}`).replace(
                      'file://',
                      '',
                    )
                  : decodeURIComponent(`${item?.fileCopyUri}`),
              name: item?.name,
              size: item?.size,
              mime: item?.type,
              id: media?.streamId,
            });
          }
        }
      });
      if (array?.length) {
        sendMediaPreview(array);
        navigate(routeEnum.SELECTPHOTOSCREEN, {
          // passing the selected image data to SelectPhotoScreen.tsx
          image: array,
          candidateId: data?.candidateId,
          data: data,
        });
      }
      if (previewArray?.length) {
        dispatch({
          type: SEND_MEDIA_MESSAGE_TO_CHAT,
          payload: [...imageState, ...previewArray],
          data: data,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const sendMediaPreview = (
    array: ImagePreviewDataInterface[] | ImageUpload[],
  ) => {
    dispatch({
      type: UPLOAD_IMAGE_PREVIEW,
      payload: array,
    });
  };

  // function that invokes when the 3 vertical dots pressed
  const onClickMenu = (menu: string) => {
    if (menu === 'call') {
      Linking.openURL(`tel:${Item?.candidatePhoneNumber}`);
    } else if (menu === 'sms') {
      Linking.openURL(
        `sms:${Item?.candidatePhoneNumber}?body=Hi ${Item?.chatName}`,
      );
    }
  };

  const updateMessageDetails = (val: ChatMessage | ImageToUploadInterface) => {
    setMessageDetails(val);
  };

  const updateshowImageHeader = (val: boolean) => {
    setShowImageHeader(val);
  };

  // properties of audio recorder player
  const audioSet: AudioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVModeIOS: AVModeIOSOption.measurement,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };
  const meteringEnabled = true;

  // to start audio recording
  const onStartRecord = async () => {
    dispatch({
      type: CLOSE_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: null,
      },
    });
    dispatch({
      type: SET_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: false,
        audioPosition: 0,
        audioFile: AudioFile?.audioFile,
        data: AudioFile?.data,
        Item: AudioFile?.Item,
        url: AudioFile?.url,
        index: AudioFile?.index,
      },
    });
    setPaused(false);
    const path =
      Platform.OS === 'android'
        ? `${AUDIO_PATH}/happileeAudio.mp3`
        : ReactNativeBlobUtil.fs.dirs.DownloadDir;
    const mediaId = await ReactNativeBlobUtil.fs.readStream(
      `${path}/happileeAudio.mp3`,
      'ascii',
    );
    const result = await audioRecorderPlayer.startRecorder(
      `${Platform.OS === 'android' ? AUDIO_PATH : path}/ha${
        mediaId.streamId
      }.mp3`,
      audioSet,
      meteringEnabled,
    );
    audioLink = result;
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      const secnds = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition));
      setSeconds(`${secnds.split(':')[0]}:${secnds.split(':')[1]}`);
      time = e.currentPosition;
      return;
    });
  };

  // to stop audio recording
  const onStopRecord = async (isSendAudio: boolean) => {
    const result = await audioRecorderPlayer.stopRecorder();
    const audioId = await ReactNativeBlobUtil.fs.readStream(result, 'ascii');
    audioRecorderPlayer.removeRecordBackListener();
    let previewArray = [];
    if (isSendAudio && audioId && time > 1000) {
      time = 0;
      previewArray.push({
        id: audioId?.streamId,
        path: `file://${result}`,
        mime: 'audio/mpeg',
        caption: '',
        uploaded: '',
        progress: 0,
        chatUid: data?.chatUid,
      });
      dispatch({
        type: SEND_MEDIA_MESSAGE_TO_CHAT,
        payload: [...imageState, ...previewArray],
        data: data,
      });
      let body = new FormData();
      body.append('file', {
        uri: `file://${result}`,
        name: result.replace(/^.*[\\\/]/, ''),
        filename: result.replace(/^.*[\\\/]/, ''),
        type: 'audio/mpeg',
      });
      body.append('Content-Type', 'audio/mpeg');
      dispatch({
        type: SEND_MEDIA_MESSAGE,
        payload: {
          params: {
            candidate_id: data?.candidateId,
            media_id: audioId?.streamId,
            file_path: `file://${result}`,
          },
          file: body,
        },
      });
      audioLink = '';
    } else if (!isSendAudio) {
      ReactNativeBlobUtil.fs
        .exists(audioLink)
        .then(response => {
          if (response === true) {
            ReactNativeBlobUtil.fs
              .unlink(audioLink)
              .then(() => {})
              .catch(() => {});
          }
        })
        .catch(() => {});
    }
  };
  // to pause audio record
  const onPauseRecord = async () => {
    await audioRecorderPlayer.pauseRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  // to resume paused audio record
  const onResumeRecord = async () => {
    setAudioIndex(-1);
    await audioRecorderPlayer.resumeRecorder();
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      const secnds = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition));
      setSeconds(`${secnds.split(':')[0]}:${secnds.split(':')[1]}`);
      time = e.currentPosition;
      return;
    });
  };

  // To get the currently playing audio file's index number
  const handleAudioPlayer = (index: number | null) => {
    setAudioIndex(index);
    if (isRecording) {
      onPauseRecord();
      setPaused(true);
    }
  };

  // To find the number of lines in text area
  const handleContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    const {height} = event.nativeEvent.contentSize;
    const newNumberOfLines = Math.ceil(height / 40);
    setNumberOfLines(newNumberOfLines);
  };

  // setting image preview data to state variable
  const setImagesToArray = () => {
    if (imageState?.length) {
      const image: ImageUpload[] = imageState.filter(
        (item: ImageUpload) => item.id !== '' && item.chatUid === data?.chatUid,
      );
      imageRef.current = [...image];
      setImageArray([...imageRef?.current]);
    } else {
      imageRef.current = [];
      setImageArray(imageRef?.current);
    }
  };

  // To hide and show the date section
  const handleScroll = () => {
    setShowDate(true);
  };
  const onEndScroll = () => {
    setTimeout(() => {
      setShowDate(false);
    }, 1000);
  };

  //  these functions are used to update the setState action defined in the code.
  const updateFileEnlargeState = (val: string) => {
    setIsEnlarge(val);
  };

  const updatemodalvisible = (value: boolean) => {
    setModalVisible(value);
  };

  const updateUrl = (
    uri: string | undefined,
    captionText: string | undefined | null,
  ) => {
    if (uri?.includes('.mp4')) {
      dispatch({
        type: CLOSE_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: null,
        },
      });
      dispatch({
        type: SET_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: false,
          audioPosition: 0,
          audioFile: AudioFile?.audioFile,
          data: AudioFile?.data,
          Item: AudioFile?.Item,
          url: AudioFile?.url,
          index: AudioFile?.index,
        },
      });
    }
    setUrl(uri || '');
    setcaption(captionText || '');
  };

  const onLongPressMessageText = (text: string) => {
    Clipboard.setString(text);
    setIsMessageCopied(true);
    setTimeout(() => {
      setIsMessageCopied(false);
    }, 1500);
  };

  return {
    dgl,
    url,
    data,
    Item,
    imoji,
    toDate,
    paused,
    history,
    sending,
    seconds,
    caption,
    showDate,
    imageRef,
    AudioFile,
    authState,
    isEnlarge,
    AudioState,
    AUDIO_PATH,
    VIDEO_PATH,
    audioIndex,
    imageArray,
    sectionDate,
    textMessage,
    isRecording,
    flatlistRef,
    modalVisible,
    numberOfLines,
    ChatBoxStyles,
    expirationTime,
    messageDetails,
    isMessageCopied,
    showImageHeader,
    viewabilityConfigCallbackPairs,
    setImoji,
    updateUrl,
    setPaused,
    setSeconds,
    onClickMenu,
    onEndScroll,
    sendMessage,
    loadMoredata,
    takeDocument,
    handleScroll,
    captureImage,
    captureVideo,
    onStopRecord,
    onResumeRecord,
    setTextMessage,
    setIsRecording,
    sendTemplateMsg,
    onPressnameView,
    onPressImageView,
    updateChatStatus,
    handleAudioPlayer,
    updatemodalvisible,
    onPressPreviewDelete,
    updateMessageDetails,
    updateshowImageHeader,
    updateFileEnlargeState,
    onLongPressMessageText,
    handleContentSizeChange,
  };
};
