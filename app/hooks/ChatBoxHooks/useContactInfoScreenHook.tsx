import {useState, useEffect} from 'react';
import {
  fileInterface,
  nameInterface,
} from '../../interface/ContactInfoInterface';
import {useRoute} from '@react-navigation/native';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import MediaAndDocStyles from '../../screens/ContactInfo/MediaAndDoc.style';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from '../../constants/folderPath';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  CLOSE_AUDIO_PLAYER,
  SET_AUDIO_PLAYER,
} from '../../redux/actions/audioPlayer.action';
import {Platform} from 'react-native';
import {C} from '../../constants';

const useContactInfoScreenHook = () => {
  const {styles} = useThemedStyles(MediaAndDocStyles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState('MEDIA');
  const [isEnlargeFile, setIsEnlargeFile] = useState('');
  const [data, setData] = useState([]);
  const {files} = useRoute().params as {files: fileInterface[]};
  const {name} = useRoute().params as nameInterface;
  const types = [{type: 'MEDIA'}, {type: 'DOCS'}];
  const AudioFile = useSelector((state: RootState) => state.audioPlayer);
  const AudioState = useSelector((state: RootState) => state.closeAudioPLayer);
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [messageDetails, setMessageDetails] = useState<fileInterface>();
  const [showImageHeader, setShowImageHeader] = useState(true);
  const dgl = C.measures.dgl;

  useEffect(() => {
    onChangeTab();
  }, [selectedItem]);

  const onChangeTab = () => {
    let array: any = [];
    selectedItem === 'MEDIA'
      ? files.filter((item: fileInterface) => {
          if (
            item?.fileType === 'video' ||
            item?.fileType === 'image'
            // item?.fileType === 'audio'
          ) {
            array.push(item);
            setData(array);
          }
        })
      : files.filter((item: fileInterface) => {
          if (item?.fileType === 'document' && selectedItem === 'DOCS') {
            array.push(item);
            setData(array);
          }
        });
  };

  const onSwitchTab = (item: {type: string}, index: number) => {
    setSelectedItem(item.type);
    setSelectedIndex(index);
  };

  const IOS_PATH = ReactNativeBlobUtil.fs.dirs.DownloadDir;
  const ImagePath = Platform.OS === 'android' ? IMAGE_PATH : IOS_PATH;
  const VideoPath = Platform.OS === 'android' ? VIDEO_PATH : IOS_PATH;
  const AudioPath = Platform.OS === 'android' ? AUDIO_PATH : IOS_PATH;
  const DocumentPath = Platform.OS === 'android' ? DOCUMENT_PATH : IOS_PATH;

  const onSelectFile = (item: fileInterface) => {
    if (item?.fileType === 'image') {
      updateUrl(`${ImagePath}/${item?.fileName}`);
    } else if (item?.fileType === 'video') {
      updateUrl(`${VideoPath}/${item?.fileName}`);
    } else if (item?.fileType === 'audio') {
      updateUrl(`${AudioPath}/${item?.fileName}`);
    } else {
      updateUrl(`${DocumentPath}/${item?.fileName}`);
    }
    updateMessageDetails(item);
    updateFileEnlargeState(
      item?.fileType === 'image'
        ? 'image'
        : item?.fileType === 'video'
        ? 'video'
        : 'pdf',
    );
    console.log(`${ImagePath}/${item?.fileName}`, 'file');
  };

  const updateMessageDetails = (val: fileInterface) => {
    setMessageDetails(val);
  };
  const updateFileEnlargeState = (val: string) => {
    setIsEnlargeFile(val);
  };
  const updateUrl = (uri: string | undefined) => {
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
  };

  const updateshowImageHeader = (val: boolean) => {
    setShowImageHeader(val);
  };

  return {
    dgl,
    url,
    name,
    data,
    types,
    files,
    styles,
    AudioState,
    selectedItem,
    selectedIndex,
    isEnlargeFile,
    messageDetails,
    showImageHeader,
    onSwitchTab,
    onSelectFile,
    updateshowImageHeader,
    updateFileEnlargeState,
  };
};

export default useContactInfoScreenHook;
