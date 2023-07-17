import React, {memo} from 'react';
import CircularProgressBar from '../../../components/PrgressBar/Components/CircularProgressBar';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import ChatBoxStyle from '../ChatBox.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AUDIO_PATH} from '../../../constants/folderPath';
import useRenderMediaFileComponentHook from '../../../hooks/ChatBoxHooks/useRenderMediaFileComponentHook';
import {PdfIcon} from '../../../assets';
import {
  ChatMessage,
  ChatSession,
  ChatDataInterface,
} from '../../../interface/ChatboxInterface';
import AudioPlayer from '../../../components/AudioPlayer/AudioPlayer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Video from 'react-native-video';
import {toHHMMSS} from '../../../components/AudioPlayer/utils';
import VideoIcon from 'react-native-vector-icons/MaterialIcons';

interface props {
  item: ChatMessage;
  type: string;
  data: ChatDataInterface;
  Item: ChatSession;
  index: number | null;
  onToggle: () => number | null;
  onFileSelect: () => void;
}

const RenderMediaFile = memo((props: props) => {
  const {item, type, data, Item, index, onToggle, onFileSelect} = props;
  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);
  const {
    dgl,
    totalLength,
    thumbnailUrl,
    fileExistdata,
    fixDuration,
    downloadAttachment,
  } = useRenderMediaFileComponentHook(item, type);
  try {
    return item?.messageType === 'image' ||
      item?.mime_type === 'image/png' ||
      item?.messageType === 'video' ? (
      <Pressable
        onPress={() => {
          if (!fileExistdata?.exist) {
            downloadAttachment(item, '', '');
          } else {
            onFileSelect();
          }
        }}
        style={[
          ChatBoxStyles.imageView,
          item?.owner
            ? ChatBoxStyles.imageSendedStyle
            : ChatBoxStyles.imageRecievedStyle,
        ]}>
        <Image
          source={{
            uri:
              item?.messageType === 'video'
                ? thumbnailUrl
                : item?.fileLocationUrl,
          }}
          style={ChatBoxStyles.imageStyle}
          resizeMode="cover"
          blurRadius={!fileExistdata?.exist ? 15 : 0}
        />
        {item?.messageType === 'video' && (
          <Video
            source={{uri: item?.fileLocationUrl}}
            style={ChatBoxStyles.videoStyle}
            paused
            audioOnly
            onLoad={fixDuration}
          />
        )}
        {item?.messageType === 'video' && (
          <View
            style={[
              ChatBoxStyles.durationView,
              item?.media_caption ? ChatBoxStyles.bottom : undefined,
            ]}>
            <VideoIcon name={'videocam'} color={'#fff'} size={20} />
            <Text style={ChatBoxStyles.durationTextStyle}>
              {toHHMMSS(totalLength)}
            </Text>
          </View>
        )}
        {item?.media_caption && (
          <Text
            style={[
              ChatBoxStyles.messageTxt,
              item?.owner
                ? ChatBoxStyles.textBackground1
                : ChatBoxStyles.textBackground2,
            ]}>
            {item?.media_caption}
          </Text>
        )}
        {!fileExistdata?.exist && !fileExistdata?.downloading ? (
          <MaterialCommunityIcons
            style={ChatBoxStyles.downloadIconIndicator}
            onPress={() => {
              downloadAttachment(item, '', '');
            }}
            name="arrow-down-bold-circle"
            size={dgl * 0.06}
            color="#b3b3b3"
          />
        ) : fileExistdata?.downloading ? (
          <View style={ChatBoxStyles.downloadIconIndicator}>
            <CircularProgressBar
              isPercentage
              radius={18}
              strokeWidth={5}
              duration={1000}
              delay={100}
              value={100}
              max={100}
              color={'#199CD9'}
            />
          </View>
        ) : !fileExistdata?.exist && fileExistdata?.progress === 100 ? (
          <View style={ChatBoxStyles.downloadIconIndicator}>
            <ActivityIndicator size={'large'} color="#199CD9" />
          </View>
        ) : (
          item?.messageType === 'video' && (
            <MaterialCommunityIcons
              style={ChatBoxStyles.downloadIconIndicator}
              name="arrow-right-drop-circle"
              size={dgl * 0.06}
              color="#b3b3b3"
            />
          )
        )}
      </Pressable>
    ) : item?.messageType === 'document' ? (
      <Pressable
        onPress={() => {
          if (!fileExistdata?.exist && !fileExistdata?.downloading) {
            downloadAttachment(item, 'doc', '');
          } else {
            onFileSelect();
          }
        }}
        style={[
          ChatBoxStyles.pdfView,
          item?.owner
            ? ChatBoxStyles.pdfSendedStyle
            : ChatBoxStyles.pdfRecievedStyle,
        ]}>
        <PdfIcon />
        <Text numberOfLines={5} style={ChatBoxStyles.pdfText}>
          {item?.fileName}
        </Text>
        {!fileExistdata?.exist && !fileExistdata?.downloading ? (
          <MaterialCommunityIcons
            style={{}}
            onPress={() => {
              downloadAttachment(item, 'doc', '');
            }}
            name="arrow-down-bold-circle"
            size={dgl * 0.035}
            color="#b3b3b3"
          />
        ) : fileExistdata?.downloading ? (
          <CircularProgressBar
            isPercentage
            radius={dgl * 0.015}
            strokeWidth={5}
            duration={1000}
            delay={100}
            value={100}
            max={100}
            color={'#199CD9'}
            indicator={'small'}
          />
        ) : (
          !fileExistdata?.exist &&
          fileExistdata?.progress === 100 && (
            <ActivityIndicator size={'small'} color="#199CD9" />
          )
        )}
      </Pressable>
    ) : (
      <AudioPlayer
        url={`${
          Platform.OS === 'android'
            ? AUDIO_PATH
            : ReactNativeBlobUtil.fs.dirs.DownloadDir
        }/${
          item?.fileName?.includes('.opus')
            ? item?.fileName?.replace('.opus', '.mp3')
            : item?.fileName?.replace('.ogg', '.mp3')
        }`}
        // url={item?.fileLocationUrl}
        link={item?.fileLocationUrl}
        item={item}
        data={data}
        Item={Item}
        onToggle={onToggle}
        index={index}
        fileExistdata={fileExistdata}
        downloadFile={(audio: ChatMessage) => {
          downloadAttachment(audio, '', '');
        }}
      />
    );
  } catch (error) {
    console.log('file render error: ', error);
    return <View />;
  }
});

export default RenderMediaFile;
