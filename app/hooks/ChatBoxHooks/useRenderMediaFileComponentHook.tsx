/* eslint-disable react-hooks/exhaustive-deps */
import {C} from '../../constants';
import {
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from '../../constants/folderPath';
import {
  ChatMessage,
  initialStatesInterface,
} from '../../interface/ChatboxInterface';
import {useState, useEffect} from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {ImageToUploadInterface} from '../../utils/database/interfaces';
import {fileInterface} from '../../interface/ContactInfoInterface';

const useRenderMediaFileComponentHook = (
  item: ChatMessage | fileInterface,
  type: string,
) => {
  const dgl = C.measures.dgl;
  const [totalLength, setTotalLength] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/a/ab/BLANK.jpg',
  );
  const [fileExistdata, setfileExistdata] = useState<initialStatesInterface>();
  const IOS_PATH = ReactNativeBlobUtil.fs.dirs.DownloadDir;
  const ImagePath = Platform.OS === 'android' ? IMAGE_PATH : IOS_PATH;
  const VideoPath = Platform.OS === 'android' ? VIDEO_PATH : IOS_PATH;
  const AudioPath = Platform.OS === 'android' ? AUDIO_PATH : IOS_PATH;
  const DocumentPath = Platform.OS === 'android' ? DOCUMENT_PATH : IOS_PATH;

  useEffect(() => {
    try {
      let initialStates: initialStatesInterface = {
        exist: false,
        downloading: false,
        progress: 0,
        id: item?.id,
      };
      setfileExistdata(initialStates);
      const checkAllFilesExist = async () => {
        let directory;
        directory =
          item?.fileType === 'image'
            ? `${ImagePath}/${item?.fileName}`
            : item?.fileType === 'video'
            ? `${VideoPath}/${item?.fileName}`
            : item?.fileType === 'audio'
            ? item?.fileName?.includes('.opus')
              ? `${AudioPath}/${item?.fileName?.replace('.opus', '.mp3')}`
              : item?.fileName?.includes('.ogg') &&
                `${AudioPath}/${item?.fileName?.replace('.ogg', '.mp3')}`
            : `${DocumentPath}/${item?.fileName}`;
        const exists = await checkFileExists(directory);
        initialStates = {
          exist: exists,
          downloading: false,
          progress: 0,
          id: item?.id,
        };
        setfileExistdata(initialStates);
      };
      checkAllFilesExist();
    } catch (error) {
      console.log(error, 'check error');
    }
  }, []);

  // Checking file is exist or not
  const checkFileExists = async (path: string | undefined | false) => {
    try {
      if (path) {
        const res = await ReactNativeBlobUtil.fs.exists(
          path?.replace('file://', '') || '',
        );
        return res;
      }
    } catch (err) {}
  };

  // async function generateThumbnail() {
  //   console.log('thumbnail');
  //   try {
  //     const response = await createThumbnail({
  //       url: item?.fileLocationUrl,
  //       timeStamp: 100,
  //     });
  //     setThumbnailUrl(response.path);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   if (type === 'video') {
  //     generateThumbnail();
  //   }
  // }, []);

  const fixDuration = (duration: any) => {
    setTotalLength(Math.floor(duration.duration));
  };

  // function to check the permissions are allowed in app permissions
  const downloadAttachment = (
    file: ChatMessage | fileInterface,
    fileType: string,
    from: string,
  ) => {
    let downloadsPath: string = '';

    if (Platform.OS === 'android') {
      const deviceModel = Platform.constants.Model;

      // Check if the device is a Redmi device
      if (deviceModel && deviceModel.includes('Redmi')) {
        downloadsPath = '/storage/emulated/0/Download/';
      } else {
        downloadsPath = ReactNativeBlobUtil.fs.dirs.DownloadDir;
      }
    } else {
      downloadsPath = ReactNativeBlobUtil.fs.dirs.DocumentDir;
    }
    if (Platform.OS === 'ios') {
      downloadFile(file, from);
    } else {
      try {
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
            if (fileType === 'doc') {
              downloadDocument(file, downloadsPath);
            } else {
              downloadFile(file, from);
            }
          } else {
            Alert.alert('Allow storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
      }
    }
  };

  // To download image, video and audio files.
  const downloadFile = (
    file: ChatMessage | ImageToUploadInterface | fileInterface,
    from: string,
  ) => {
    console.log(file, 'file')
    try {
      let initialStates = {
        exist: false,
        downloading: true,
        progress: 0,
        id: item?.id,
      };
      setfileExistdata(initialStates);
      const Type =
        from === 'contactScreen' ? file?.fileType : file?.messageType;
      const path =
        Type === 'image' ? ImagePath : Type === 'audio' ? AudioPath : VideoPath;
      ReactNativeBlobUtil.fs
        .exists(path)
        .then(response => {
          if (response === false) {
            ReactNativeBlobUtil.fs
              .mkdir(path)
              .then(() => {})
              .catch(() => {});
          }
        })
        .catch(() => {});
      ReactNativeBlobUtil.config({
        path: `${path}/${
          Type === 'audio'
            ? file?.fileName?.includes('.opus')
              ? file?.fileName?.replace('.opus', '.mp3')
              : file?.fileName?.replace('.ogg', '.mp3')
            : file?.fileName
        }`,
      })
        .fetch('GET', file?.fileLocationUrl)
        .progress((received, total) => {
          updateProgress(file, (received / total) * 100);
        })
        .then(() => {
          updateProgress(file, 100);
          initialStates = {
            exist: true,
            downloading: false,
            progress: 100,
            id: file?.id,
          };
          setfileExistdata(initialStates);
        })
        .catch(() => {
          initialStates = {
            exist: false,
            downloading: false,
            progress: 0,
            id: file?.id,
          };
          setfileExistdata(initialStates);
        });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Something went wrong!',
      });
    }
  };

  // function to download document files
  const downloadDocument = (
    file: ChatMessage | fileInterface,
    path: string,
  ) => {
    // Sometimes the 'fileExistdata' may not contain the file then the catch section will work.
    try {
      let initialStates = {
        exist: false,
        downloading: true,
        progress: 0,
        id: item?.id,
      };
      setfileExistdata(initialStates);
      const {config} = ReactNativeBlobUtil;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${path}/${file?.fileName}`,
          description: `${file?.fileName}`,
        },
      };
      config(options)
        .fetch('GET', file?.fileLocationUrl)
        .progress((received, total) => {
          updateProgress(file, (received / total) * 100);
        })
        .then(() => {
          ReactNativeBlobUtil.fs
            .exists(DocumentPath)
            .then(response => {
              if (response === false && Platform.OS !== 'ios') {
                ReactNativeBlobUtil.fs
                  .mkdir(DOCUMENT_PATH)
                  .then(() => {
                    ReactNativeBlobUtil.fs.mv(
                      `${path}/${file?.fileName}`,
                      `${DOCUMENT_PATH}/${file?.fileName}`,
                    );
                  })
                  .catch(() => {});
              } else if (Platform.OS !== 'ios') {
                ReactNativeBlobUtil.fs.mv(
                  `${path}/${file?.fileName}`,
                  `${DOCUMENT_PATH}/${file?.fileName}`,
                );
              }
            })
            .catch(() => {});
          initialStates = {
            exist: true,
            downloading: false,
            progress: 0,
            id: item?.id,
          };
          setfileExistdata(initialStates);
        })
        .catch(() => {
          initialStates = {
            exist: true,
            downloading: false,
            progress: 0,
            id: item?.id,
          };
          setfileExistdata(initialStates);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Something went wrong!',
          });
        });
    } catch (error) {}
  };

  // function to update the progress of downloading a file.
  const updateProgress = (
    file: ChatMessage | fileInterface,
    progress: number,
  ) => {
    let initialStates = {
      exist: false,
      downloading: true,
      progress: progress,
      id: file?.id,
    };
    setfileExistdata(initialStates);
  };

  return {
    dgl,
    totalLength,
    thumbnailUrl,
    fileExistdata,
    fixDuration,
    downloadAttachment,
  };
};

export default useRenderMediaFileComponentHook;
