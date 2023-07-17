import {toHHMMSS} from './utils';
import Video from 'react-native-video';
import {CloseIcon} from '../../assets';
import {PlayerStyles} from './PlayerStyle';
import {
  GET_CHAT_HISTORY_ACTION,
  GET_GLOBAL_CHAT_HISTORY_ACTION,
} from '../../redux/actions/chathistory.action';
import {
  SET_AUDIO_TRACK,
  SET_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER,
} from '../../redux/actions/audioPlayer.action';
import {runOnJS} from 'react-native-reanimated';
import {routeEnum} from '../../enums/route.enum';
import {Platform, Pressable, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {API_LIMIT} from '../../constants/pagination';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useRef, useEffect} from 'react';
import {RootState} from '../../redux/store/root.reducer';
import {navigate} from '../../navigation/useNavigationUtils';
import Headset from 'react-native-vector-icons/MaterialIcons';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UPDATE_CHAT_COUNT_ACTION} from '../../redux/actions/chatlist.action';

const Player = () => {
  const dispatch = useDispatch();
  const styles = useThemedStyles(PlayerStyles);
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<Video | null>(null);
  const [totalLength, setTotalLength] = useState(0);
  const {auth} = useSelector(state => state) as any;
  const [currentPosition, setCurrentPosition] = useState(0);
  const AudioState = useSelector((state: RootState) => state.audioPlayer);
  const [url, setUrl] = useState(AudioState?.url);
  //   const AudioTrack = useSelector((state: RootState) => state.audioTrack);
  const screen = useSelector((state: RootState) => state.PresentScreen);
  const isAudioPlaying = useSelector(
    (state: RootState) => state.closeAudioPLayer,
  );

  useEffect(() => {
    if (AudioState?.isAudioPlaying !== null) {
      setPaused(!AudioState?.isAudioPlaying);
      setUrl(AudioState?.url);
    }
  }, [AudioState]);

  const onSeek = (time: number) => {
    time = Math.round(time);
    setCurrentPosition(time);
    videoRef && videoRef?.current?.seek(time);
    dispatch({
      type: SET_AUDIO_TRACK,
      payload: {audioPosition: currentPosition},
    });
  };
  const fixDuration = (duration: any) => {
    setTotalLength(Math.floor(duration.duration));
  };

  const setTime = (details: any) => {
    setCurrentPosition(Math.floor(details.currentTime));
  };

  const resetAudio = () => {
    setPaused(true);
    setCurrentPosition(0);
    dispatch({
      type: SET_AUDIO_PLAYER,
      payload: {
        isAudioPlaying: false,
        audioPosition: 0,
        audioFile: AudioState?.audioFile,
        data: AudioState?.data,
        Item: AudioState?.Item,
        url: AudioState?.url,
        index: AudioState?.index,
      },
    });
    runOnJS(dispatch)({
      type: SET_AUDIO_TRACK,
      payload: {audioPosition: 0},
    });
  };

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
        audioPosition: currentPosition,
        audioFile: AudioState?.audioFile,
        data: AudioState?.data,
        Item: AudioState?.Item,
        url: AudioState?.url,
        index: AudioState?.index,
      },
    });
  };

  const togglePlay = () => {
    setAudioState(!paused);
  };
  return isAudioPlaying?.isAudioPlaying ? (
    <Pressable
      onPress={() => {
        if (screen.presentScreen !== 'chatScreen') {
          dispatch({
            type:
              auth.projectId === 'all'
                ? GET_GLOBAL_CHAT_HISTORY_ACTION
                : GET_CHAT_HISTORY_ACTION,
            payload: {
              chat_uid: AudioState?.Item.chatUid,
              pageNumber: 1,
              limit: API_LIMIT,
            },
          });
          dispatch({
            type: UPDATE_CHAT_COUNT_ACTION,
            payload: {
              candidate_id: AudioState?.Item?.candidateId,
              chatUid: AudioState?.Item?.chatUid,
            },
          });
          navigate(routeEnum.CHATBOX, {
            data: AudioState?.Item,
            isAudioPressed: true,
          });
        }
      }}
      style={styles.container}>
      <Video
        source={{
          uri: url,
        }}
        ref={videoRef}
        playInBackground={true}
        audioOnly={true}
        playWhenInactive={true}
        paused={paused}
        onEnd={() => {
          setUrl('empty');
          resetAudio();
        }}
        onLoad={fixDuration}
        onProgress={setTime}
        style={styles.videoPlayer}
      />
      <View style={styles.subContainer}>
        {paused ? (
          <Icon
            name="play"
            size={30}
            onPress={() => {
              togglePlay();
            }}
            color={'#edede3'}
          />
        ) : (
          <Icon
            name="pause"
            size={30}
            onPress={() => {
              togglePlay();
            }}
            color={'#edede3'}
          />
        )}
        <View style={styles.row}>
          {AudioState?.isAudioPlaying === null ? (
            <Text style={styles.timeText}>{toHHMMSS(totalLength)}</Text>
          ) : (
            <Text style={styles.timeText}>
              {toHHMMSS(currentPosition)} / {toHHMMSS(totalLength)}
            </Text>
          )}
          <View style={styles.profileView}>
            <Headset name="headset" size={18} style={styles.headset} />
          </View>
          <Text style={styles.nameText} numberOfLines={1}>
            {AudioState?.audioFile?.senderName}
          </Text>
        </View>
        <Pressable
          style={styles.padding}
          onPress={() => {
            setCurrentPosition(0);
            dispatch({
              type: SET_AUDIO_TRACK,
              payload: {audioPosition: 0},
            });
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
                audioFile: AudioState?.audioFile,
                data: AudioState?.data,
                Item: AudioState?.Item,
              },
            });
          }}>
          <CloseIcon width={40} height={15} />
        </Pressable>
      </View>
      <Slider
        style={styles.sliderStyle}
        minimumValue={0}
        maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
        minimumTrackTintColor={'#E1E4E8'}
        maximumTrackTintColor={'#197DAB'}
        onSlidingComplete={onSeek}
        value={currentPosition}
        thumbTintColor={Platform.OS === 'android' ? '#E1E4E8' : 'transparent'}
      />
    </Pressable>
  ) : (
    <View />
  );
};

export default Player;
