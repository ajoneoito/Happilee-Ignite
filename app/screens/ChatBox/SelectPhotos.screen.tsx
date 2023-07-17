/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Alert,
  Image,
  Modal,
  Keyboard,
  Platform,
  FlatList,
  StatusBar,
  Pressable,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {C} from '../../constants';
import {
  nativeEventInterface,
  SelectPhotoScreenParams,
} from '../../interface/ChatboxInterface';
import Animated from 'react-native-reanimated';
import {
  SEND_MEDIA_MESSAGE,
  SEND_MEDIA_MESSAGE_TO_CHAT,
} from '../../redux/actions/chathistory.action';
import measures from '../../constants/measures';
import {routeEnum} from '../../enums/route.enum';
import {useRoute} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';
import {useDispatch, useSelector} from 'react-redux';
import {SelectPhotosStyle} from './SelectPhotos.style';
import React, {useState, useEffect, useRef} from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {RootState} from '../../redux/store/root.reducer';
import DocumentPicker from 'react-native-document-picker';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {IMAGE_PATH, VIDEO_PATH} from '../../constants/folderPath';
import {goBack, navigate} from '../../navigation/useNavigationUtils';
import {ImagePreviewData, img} from '../../utils/database/interfaces';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {AddImages, CloseIcon, DeleteWhiteIcon, SendIcon} from '../../assets';
import {UPLOAD_IMAGE_PREVIEW} from '../../redux/actions/imageToUpload.action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dgl = C.measures.dgl;
let ImageArray: any = [];
const SelectPhotoScreen = () => {
  let scrollRef = useRef(null);
  const dispatch = useDispatch();
  let ref = useRef<FlatList | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [imgIndex, setImageIndex] = useState(0);
  const styles = useThemedStyles(SelectPhotosStyle);
  const [imgData, setImgData] = useState<img[]>([]);
  const [hideImage, setHideImage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {candidateId, data} = useRoute().params as SelectPhotoScreenParams;
  const imageState = useSelector((state: RootState) => state.imageToUpload);
  const image = useSelector((state: RootState) => state.imagePreviewData);

  useEffect(() => {
    try {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]).then(granted => {
          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            const imagePath = IMAGE_PATH;
            ReactNativeBlobUtil.fs
              .exists(imagePath)
              .then(response => {
                if (response === false) {
                  ReactNativeBlobUtil.fs
                    .mkdir(imagePath)
                    .then(() => {
                      processImage();
                    })
                    .catch(error => {
                      console.log(error, 'preview error');
                    });
                } else {
                  processImage();
                }
              })
              .catch(error => {
                console.log(error, 'error dir');
              });
            const videoPath = VIDEO_PATH;
            ReactNativeBlobUtil.fs
              .exists(videoPath)
              .then(response => {
                if (response === false) {
                  ReactNativeBlobUtil.fs
                    .mkdir(videoPath)
                    .then(() => {
                      processImage();
                    })
                    .catch(error => {
                      console.log(error, 'preview error');
                    });
                } else {
                  processImage();
                }
              })
              .catch(error => {
                console.log(error, 'error dir');
              });
          } else {
            Alert.alert('Allow storage_permission');
          }
        });
      } else if (Platform.OS === 'ios') {
        requestMultiple([
          PERMISSIONS.IOS.PHOTO_LIBRARY,
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        ]).then(() => {});
        const imagePath = ReactNativeBlobUtil.fs.dirs.DownloadDir;
        ReactNativeBlobUtil.fs
          .exists(imagePath)
          .then(response => {
            if (response === false) {
              ReactNativeBlobUtil.fs
                .mkdir(imagePath)
                .then(() => {
                  processImage();
                })
                .catch(error => {
                  console.log(error, 'preview error');
                });
            } else {
              processImage();
            }
          })
          .catch(error => {
            console.log(error, 'error dir');
          });
      }
    } catch (err) {
      //To handle permission related issue
      console.log('error', err);
    }
  }, []);
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setHideImage(false);
    });
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setHideImage(true);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const processImage = () => {
    ImageArray = [];
    setImageToSend(image);
  };

  const setImageToSend = (images: ImagePreviewData[]) => {
    const arrays: img[] = [];
    images?.map((item: ImagePreviewData) => {
      if (item?.size <= 16000000) {
        const fileName = item.path.replace(/^.*[\\\/]/, '');
        if (Platform.OS === 'android') {
          const filePath =
            item?.mime !== 'video/mp4'
              ? `${IMAGE_PATH}/${fileName}`
              : `${VIDEO_PATH}/${fileName}`;
          ReactNativeBlobUtil.fs.cp(item?.path, filePath);
          arrays.push({
            path: `file://${filePath}`,
            mime: item.mime,
            caption: '',
            uploaded: '',
            progress: 0,
            size: item?.size,
            id: item?.id,
          });
        } else {
          const filePath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${fileName}`;
          ReactNativeBlobUtil.fs.cp(item?.path, filePath);
          arrays.push({
            path: filePath,
            mime: item.mime,
            caption: '',
            uploaded: '',
            progress: 0,
            size: item?.size,
            id: item?.id,
          });
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'File must must be between 64kb to 16mb',
          textBody: '',
        });
      }
    });
    if (arrays?.length) {
      setImgData(arrays);
    } else {
      navigate(routeEnum.CHATBOX, {data: data});
    }
  };

  const scrollImage = ({nativeEvent}: {nativeEvent: nativeEventInterface}) => {
    if (!hideImage) {
      const slide =
        nativeEvent?.contentOffset?.x / nativeEvent?.layoutMeasurement?.width;
      ref?.current?.scrollToIndex({
        animated: true,
        index: slide - 1 >= 0 ? slide - 1 : slide,
      });
      setImageIndex(Math.round(slide));
    }
  };
  const sendFile = async () => {
    ImageArray = [];
    await imgData?.map(async item => {
      const media = await ReactNativeBlobUtil.fs.readStream(item.path, 'ascii');
      ImageArray.push({
        id: media?.streamId,
        path: Platform.OS === 'android' ? item.path : `file://${item.path}`,
        uploaded: item.uploaded,
        progress: item.progress,
        mime: item.mime,
        caption: item.caption,
        chatUid: data?.chatUid,
      });
      var filename = item.path.replace(/^.*[\\\/]/, '');
      let body = new FormData();
      body.append('file', {
        uri: Platform.OS === 'android' ? item.path : `file://${item.path}`,
        name: filename,
        filename: filename,
        type: item.mime,
      });
      body.append('caption', item.caption);
      body.append('Content-Type', item.mime);
      dispatch({
        type: SEND_MEDIA_MESSAGE,
        payload: {
          params: {
            candidate_id: candidateId,
            media_id: media?.streamId,
            file_path:
              Platform.OS === 'android'
                ? item.path
                : `file://${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${filename}`,
          },
          file: body,
        },
      });
    });
    dispatch({
      type: UPLOAD_IMAGE_PREVIEW,
      payload: [],
    });
    navigate(routeEnum.CHATBOX, {data: data});
    dispatch({
      type: SEND_MEDIA_MESSAGE_TO_CHAT,
      payload: [...imageState, ...ImageArray],
      data: data,
    });
  };

  const addImage = async () => {
    const array: ImagePreviewData[] = [...image];
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: true,
        copyTo:
          Platform.OS === 'android' ? 'documentDirectory' : 'cachesDirectory',
      });
      await res?.map(async (item: any) => {
        if (item?.size && item?.size <= 16000000) {
          const media = await ReactNativeBlobUtil.fs.readStream(
            item?.fileCopyUri,
            'ascii',
          );
          array.push({
            path:
              Platform.OS === 'android'
                ? decodeURIComponent(item?.fileCopyUri)
                : item?.uri.replace('file://', ''),
            name: item?.name,
            size: item?.size,
            mime: item?.type,
            id: media?.streamId,
          });
        }
      });
      dispatch({
        type: UPLOAD_IMAGE_PREVIEW,
        payload: array,
      });
      setImageToSend(array);
    } catch (error) {}
  };

  const deleteImage = () => {
    const imgArray = [...imgData];
    imgArray.splice(imgIndex, 1);
    setImgData(imgArray);
    dispatch({
      type: UPLOAD_IMAGE_PREVIEW,
      payload: imgArray,
    });
    if (imgArray.length <= 0) {
      goBack();
    } else {
      (scrollRef?.current as FlatList | null)?.scrollToIndex({
        animated: true,
        index: imgIndex === 0 ? imgIndex : imgIndex - 1,
      });
    }
  };

  try {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#040921'} />
        <View style={styles.headerView}>
          <Pressable
            onPress={() => {
              ImageArray = [];
              dispatch({
                type: UPLOAD_IMAGE_PREVIEW,
                payload: [],
              });
              goBack();
            }}
            style={styles.closeBtn}>
            <CloseIcon width={dgl * 0.025} height={dgl * 0.025} />
          </Pressable>
          {!hideImage && (
            <DeleteWhiteIcon
              width={dgl * 0.025}
              height={dgl * 0.025}
              onPress={deleteImage}
              marginRight={dgl * 0.01}
            />
          )}
        </View>
        <View style={styles.flatlistView}>
          {imgData && (
            <View style={styles.flatListInnerView}>
              <Animated.FlatList
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEnabled={!hideImage}
                data={imgData}
                extraData={imgData}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onScroll={!hideImage ? scrollImage : undefined}
                renderItem={({item}) => {
                  return (
                    <>
                      {item?.mime === 'video/mp4' && (
                        <MaterialCommunityIcons
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: measures.windowHeight / 3.3,
                            zIndex: 10,
                          }}
                          name="arrow-right-drop-circle"
                          size={dgl * 0.06}
                          color="#fff"
                          onPress={() => {
                            setVideoUrl(item?.path);
                            setIsModalVisible(true);
                          }}
                        />
                      )}
                      <Animated.Image
                        source={{
                          uri: item?.path,
                        }}
                        style={styles.image}
                      />
                    </>
                  );
                }}
              />
            </View>
          )}
        </View>
        {!hideImage && (
          <View style={styles.flatlist}>
            <FlatList
              data={imgData}
              horizontal
              ref={ref}
              style={{marginBottom: 6}}
              extraData={imgData}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => {
                      (scrollRef?.current as FlatList | null)?.scrollToOffset({
                        animated: true,
                        offset: index * C.measures.windowWidth,
                      });
                    }}>
                    <Image
                      source={{uri: item?.path}}
                      style={[
                        styles.smallImage,
                        {
                          borderColor:
                            imgIndex === index ? '#FFFFFF' : 'transparent',
                          backgroundColor: '#000',
                        },
                      ]}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        )}
        <View style={[styles.captionView]}>
          <View style={styles.inputText}>
            <AddImages
              onPress={addImage}
              marginLeft={dgl * 0.015}
              marginBottom={dgl * 0.017}
              alignSelf={'flex-end'}
            />
            <TextInput
              placeholder={'Add a caption'}
              placeholderTextColor={'#6A737D'}
              multiline
              style={[styles.inputStyle]}
              value={imgData[imgIndex]?.caption || ''}
              onChangeText={text => {
                const array = [...imgData];
                array[imgIndex].caption = text;
                setImgData(array);
              }}
            />
            <SendIcon
              style={styles.sendIcon}
              onPress={() => {
                sendFile();
              }}
              width={dgl * 0.038}
              height={dgl * 0.038}
            />
          </View>
        </View>
        {isModalVisible && (
          <Modal>
            <View style={styles.animatedView}>
              <StatusBar backgroundColor={'#040921'} />
              <CloseIcon
                style={{position: 'absolute', top: 21, left: 13, zIndex: 10}}
                width={dgl * 0.025}
                height={dgl * 0.025}
                onPress={() => {
                  setVideoUrl('');
                  setIsModalVisible(false);
                }}
              />
              <VideoPlayer
                video={{
                  uri: videoUrl,
                }}
                controls
                autoplay
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{
                  uri: 'https://i.picsum.photos/id/866/1600/900.jpg',
                }}
                onEnd={() => {
                  setVideoUrl('');
                  setIsModalVisible(false);
                }}
                showDuration
                style={{
                  height: measures.windowHeight / 1.3,
                }}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  } catch (error) {
    console.log(error, 'swipe video error');
  }
};

export default SelectPhotoScreen;
