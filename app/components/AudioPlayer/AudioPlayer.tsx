import {styles} from './styles';
import {toHHMMSS} from './utils';
import {C} from '../../constants';
import Video from 'react-native-video';
import {
  AudioDuration,
  ImageToUploadInterface,
} from '../../utils/database/interfaces';
import Lottie from 'lottie-react-native';
import {
  ChatMessage,
  ChatSession,
  ChatDataInterface,
  initialStatesInterface,
} from '../../interface/ChatboxInterface';
import {
  SET_AUDIO_TRACK,
  SET_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER,
} from '../../redux/actions/audioPlayer.action';
import {Text, View, UIManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useRef, useEffect} from 'react';
import {RootState} from '../../redux/store/root.reducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgressBar from '../PrgressBar/Components/CircularProgressBar';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const dgl = C.measures.dgl;
interface AudioProps {
  url: string;
  link?: string;
  Item: ChatSession;
  uploading?: boolean;
  index?: number | null;
  data: ChatDataInterface;
  fileExistdata?: initialStatesInterface | undefined;
  item: ChatMessage | ImageToUploadInterface;
  onToggle: () => number | null;
  downloadFile: (arg0: ChatMessage | ImageToUploadInterface) => void;
}

export const AudioPlayer = (props: AudioProps) => {
  const {
    url,
    data,
    item,
    Item,
    link,
    index,
    uploading,
    fileExistdata,
    onToggle,
    downloadFile,
  } = props;

  const dispatch = useDispatch();
  const animationRef = useRef<Lottie>(null);
  const AudioState = useSelector((state: RootState) => state.audioPlayer);
  const AudioTrack = useSelector((state: RootState) => state.audioTrack);
  const [paused, setPaused] = useState(
    AudioState?.isAudioPlaying !== null ? AudioState?.isAudioPlaying : true,
  );
  const [audioIndex, setAudioIndex] = useState<number | null | undefined>(
    index,
  );
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (AudioState?.isAudioPlaying !== null) {
      setPaused(!AudioState?.isAudioPlaying);
    }
  }, [AudioState]);

  const setAudioState = (isPlaying: boolean) => {
    dispatch({
      type: CLOSE_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: true,
      },
    });
    dispatch({
      type: SET_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: !isPlaying,
        audioPosition: AudioTrack?.audioPosition,
        audioFile: item,
        data: data,
        Item: Item,
        url: url,
        index: onToggle(),
      },
    });
    if (audioIndex !== index) {
      dispatch({
        type: SET_AUDIO_PLAYER,
        payload: {
          isAudioPlaying: true,
          audioPosition: 0,
          audioFile: item,
          data: data,
          Item: Item,
          url: url,
          index: onToggle(),
        },
      });
    }
  };

  const togglePlay = () => {
    const ind = onToggle();
    setAudioIndex(ind);
    if (index !== audioIndex) {
      dispatch({
        type: SET_AUDIO_TRACK,
        payload: {audioPosition: 0},
      });
    }
    setAudioState(!paused);
  };

  useEffect(() => {
    if (!AudioState?.isAudioPlaying || audioIndex !== AudioState?.index) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.play();
    }
  }, [AudioState?.isAudioPlaying, audioIndex, AudioState?.index]);

  try {
    return (
      <View
        style={[
          styles.messageView,
          item?.owner || uploading
            ? styles.messageSendedStyle
            : styles.messageRecievedStyle,
        ]}>
        <Video
          source={{uri: link?.includes('.ogg') ? url : link || url}}
          paused={true}
          onLoad={(duration: AudioDuration) => {
            setTotalLength(Math.floor(duration.duration));
          }}
          style={styles.videoPlayer}
          audioOnly
        />
        <View style={[styles.sliderContainer, styles.row]}>
          {!uploading ? (
            !fileExistdata?.exist && !fileExistdata?.downloading ? (
              <Icon
                onPress={() => {
                  if (!uploading) {
                    downloadFile(item);
                  }
                }}
                name="arrow-down-bold-circle"
                size={30}
              />
            ) : fileExistdata?.downloading ? (
              <View style={styles.progressBar}>
                <CircularProgressBar
                  isPercentage
                  radius={dgl * 0.015}
                  strokeWidth={5}
                  duration={10000}
                  delay={100}
                  value={100}
                  max={100}
                  color={'#199CD9'}
                  indicator={'small'}
                />
              </View>
            ) : paused || AudioState?.audioFile?.mediaId !== item?.mediaId ? (
              <Icon name="play" size={30} onPress={togglePlay} />
            ) : (
              <Icon name="pause" size={30} onPress={togglePlay} />
            )
          ) : (
            <View style={styles.progressBar}>
              <CircularProgressBar
                isPercentage
                radius={dgl * 0.015}
                strokeWidth={5}
                duration={10000}
                delay={100}
                value={100}
                max={100}
                color={'#199CD9'}
                indicator={'small'}
              />
            </View>
          )}
          {audioIndex === index ? (
            <Lottie
              source={require('../../assets/animations/sound wave.json')}
              ref={animationRef}
              style={styles.waves}
            />
          ) : (
            <Lottie
              source={require('../../assets/animations/sound wave.json')}
              style={styles.waves}
              autoPlay={false}
              loop={false}
            />
          )}
        </View>
        <View style={styles.timeText} />
        <Text style={styles.timeText}>{toHHMMSS(totalLength)}</Text>
      </View>
    );
  } catch (error) {
    return <View />;
  }
};

export default AudioPlayer;
