import React from 'react';
import moment from 'moment';
import Video from 'react-native-video';
import {PdfIcon} from '../../../assets';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import Headset from 'react-native-vector-icons/MaterialIcons';
import {toHHMMSS} from '../../../components/AudioPlayer/utils';
import VideoIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgressBar from '../../../components/PrgressBar/Components/CircularProgressBar';
import useRenderMediaFileComponentHook from '../../../hooks/ChatBoxHooks/useRenderMediaFileComponentHook';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import MediaAndDocStyles from '../MediaAndDoc.style';
import {AUDIO_PATH} from '../../../constants/folderPath';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {fileInterface} from '../../../interface/ContactInfoInterface';
import {ChatMessage} from '../../../interface/ChatboxInterface';

interface Props {
  item: fileInterface | ChatMessage;
  type: string;
  onSelectFile: () => void;
}

const FileDurationCalculation = (props: Props) => {
  const {item, type, onSelectFile} = props;
  const {styles} = useThemedStyles(MediaAndDocStyles);
  const {
    dgl,
    totalLength,
    thumbnailUrl,
    fileExistdata,
    fixDuration,
    downloadAttachment,
  } = useRenderMediaFileComponentHook(item, type);

  return type === 'video' ? (
    <Pressable
      onPress={() => {
        if (fileExistdata?.exist) {
          onSelectFile();
        } else {
          downloadAttachment(item, type, 'contactScreen');
        }
      }}
      style={[styles.commonFileView, styles.videoFileView]}>
      <Image
        source={{uri: thumbnailUrl}}
        resizeMode="cover"
        style={[styles.commonFileView, styles.background]}
        blurRadius={fileExistdata?.exist ? 0 : 10}
      />
      <Video
        source={{uri: item?.fileLocationUrl}}
        style={styles.videoPlayer}
        paused
        audioOnly
        onLoad={fixDuration}
      />
      <View style={styles.durationView}>
        <VideoIcon name={'videocam'} color={'#fff'} size={15} />
        <Text style={styles.durationTextStyle}>{toHHMMSS(totalLength)}</Text>
      </View>
      {fileExistdata?.downloading && (
        <View style={styles.downloadIconIndicator}>
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
      )}
    </Pressable>
  ) : type === 'document' ? (
    <Pressable
      onPress={() => {
        if (fileExistdata?.exist) {
          onSelectFile();
        } else {
          downloadAttachment(item, 'doc', 'contactScreen');
        }
      }}
      style={styles.documentMainView}>
      <View style={styles.doumentInnerView}>
        <PdfIcon width={50} height={40} />
        <View style={[styles.documentTextView]}>
          <Text numberOfLines={1} style={styles.documentName}>
            {item?.fileName}
          </Text>
          <Text numberOfLines={1} style={styles.documentTime}>
            {moment(item?.createdAt).format('DD MMM YYYY h:mm a')}
          </Text>
        </View>
        {!fileExistdata?.exist && !fileExistdata?.downloading ? (
          <MaterialCommunityIcons
            name="arrow-down-bold-circle"
            size={dgl * 0.035}
            color="#b3b3b3"
          />
        ) : (
          fileExistdata?.downloading && (
            <CircularProgressBar
              isPercentage
              radius={10}
              strokeWidth={2.5}
              duration={1000}
              delay={100}
              value={100}
              max={100}
              color={'#199CD9'}
              indicator={'small'}
            />
          )
        )}
      </View>
      <View style={styles.documentSeperatorLine} />
    </Pressable>
  ) : type === 'image' ? (
    <Pressable
      onPress={() => {
        if (fileExistdata?.exist) {
          onSelectFile();
        } else {
          downloadAttachment(item, type, 'contactScreen');
        }
      }}>
      <Image
        source={{
          uri: item?.fileLocationUrl,
        }}
        resizeMode="cover"
        style={[styles.commonFileView, {}]}
        blurRadius={fileExistdata?.exist ? 0 : 15}
      />
      {fileExistdata?.downloading && (
        <View style={[styles.downloadIconIndicator, styles.top]}>
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
      )}
    </Pressable>
  ) : (
    <Pressable
      onPress={() => {
        if (fileExistdata?.exist) {
          onSelectFile();
        } else {
          downloadAttachment(item, type, 'contactScreen');
        }
      }}
      style={[
        styles.audioFileView,
        styles.commonFileView,
        fileExistdata?.exist ? undefined : styles.audioDownloadStyle,
      ]}>
      <Headset name={'headset'} size={50} color={'#fff'} />
      <Video
        source={{
          uri: fileExistdata?.exist
            ? `${
                Platform.OS === 'android'
                  ? AUDIO_PATH
                  : ReactNativeBlobUtil.fs.dirs.DownloadDir
              }/${
                item?.fileName?.includes('.opus')
                  ? item?.fileName?.replace('.opus', '.mp3')
                  : item?.fileName?.replace('.ogg', '.mp3')
              }`
            : item?.fileLocationUrl,
        }}
        style={styles.videoPlayer}
        paused
        audioOnly
        onLoad={fixDuration}
      />
      <Text style={styles.durationTextStyle2}>
        {!fileExistdata?.exist && item?.fileLocationUrl?.includes('.ogg')
          ? ''
          : toHHMMSS(totalLength)}
      </Text>
      {fileExistdata?.downloading && (
        <View style={styles.downloadIconIndicator}>
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
      )}
    </Pressable>
  );
};

export default FileDurationCalculation;
