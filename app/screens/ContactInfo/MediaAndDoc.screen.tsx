import React, {memo} from 'react';
import {CloseIcon, LeftArrow} from '../../assets';
import {goBack} from '../../navigation/useNavigationUtils';
import {fileInterface} from '../../interface/ContactInfoInterface';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import FileDurationCalculation from './components/FileDurationCalculation.component';
import useContactInfoScreenHook from '../../hooks/ChatBoxHooks/useContactInfoScreenHook';
import Animated, {FadeInUp} from 'react-native-reanimated';
import moment from 'moment';
import measures from '../../constants/measures';
import VideoPlayer from 'react-native-video-player';
import Pdf from 'react-native-pdf';

interface Props {
  item: fileInterface;
  type: string;
}

const MediaAndDocScreen = memo(() => {
  const {
    dgl,
    url,
    name,
    data,
    types,
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
  } = useContactInfoScreenHook();

  const renderMediaType = ({
    item,
    index,
  }: {
    item: {type: string};
    index: number;
  }) => {
    return (
      <Pressable
        style={
          selectedIndex === index
            ? styles.selectedBtnStyle
            : styles.defaultdBtnStyle
        }
        onPress={() => {
          onSwitchTab(item, index);
        }}>
        <Text
          style={
            selectedIndex === index
              ? styles.selectedTextStyle
              : styles.defaultTextStyle
          }>
          {item.type}
        </Text>
      </Pressable>
    );
  };

  const MemoizedComponent = memo((props: Props) => {
    const {item, type} = props;
    return (
      <FileDurationCalculation
        onSelectFile={() => {
          onSelectFile(item);
        }}
        item={item}
        type={type}
      />
    );
  });
  const renderFiles = ({item}: {item: fileInterface}) => {
    return (item?.fileType === 'video' || item?.fileType === 'image') &&
      selectedItem === 'MEDIA' ? (
      <>
        {item?.fileType === 'image' ? (
          <MemoizedComponent item={item} type={'image'} />
        ) : item?.fileType === 'video' ? (
          <MemoizedComponent item={item} type={'video'} />
        ) : null}
      </>
    ) : item?.fileType === 'document' && selectedItem === 'DOCS' ? (
      <MemoizedComponent item={item} type={'document'} />
    ) : null;
  };
  try {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.headerMainView,
            AudioState?.isAudioPlaying === null ? undefined : styles.headerTop,
          ]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}
              hitSlop={{top: 10, left: 20, bottom: 10, right: 10}}>
              <LeftArrow
                onPress={() => {
                  goBack();
                }}
                width={measures.dgl * 0.03}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{name}</Text>
          </View>
          <FlatList
            data={types}
            renderItem={renderMediaType}
            horizontal
            keyExtractor={index => index.toString()}
            contentContainerStyle={styles.contentContainerStyleFlatList}
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderFiles}
          keyExtractor={index => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.margin}
        />
        {isEnlargeFile !== '' && (
          <Modal>
            {isEnlargeFile === 'image' ? (
              <Pressable
                onPress={() => {
                  updateshowImageHeader(!showImageHeader);
                }}
                style={styles.animatedView}>
                <StatusBar backgroundColor={'#040921'} />
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInUp}
                    style={styles.imageEnlargeAnimatedStyles}>
                    <View style={styles.rowDirection}>
                      <LeftArrow
                        onPress={() => {
                          updateFileEnlargeState('');
                        }}
                        width={dgl * 0.03}
                        height={dgl * 0.02}
                        style={styles.zindex1}
                      />
                      <View style={styles.senderNameView}>
                        <Text style={styles.senderText} numberOfLines={1}>
                          {messageDetails?.owner
                            ? 'You'
                            : messageDetails?.senderName}
                        </Text>
                        <Text style={styles.chatDate}>
                          {moment(messageDetails?.createdAt).format(
                            'DD/MM/YYYY',
                          )}{' '}
                          {moment(messageDetails?.createdAt).format('hh:mm A')}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={styles.forwardView}>
                      <ForwardIcon
                        width={dgl * 0.025}
                        height={dgl * 0.025}
                        style={styles.margin2}
                      />
                      <VerticalDots
                        width={dgl * 0.02}
                        height={dgl * 0.02}
                        marginLeft={-dgl * 0.005}
                      />
                    </View> */}
                  </Animated.View>
                )}
                <Image
                  source={{uri: `file://${url}`}}
                  style={[styles.imageEnlargeStyle, styles.zindex2]}
                  resizeMode="cover"
                />
              </Pressable>
            ) : isEnlargeFile === 'pdf' ? (
              <View style={styles.flex}>
                <StatusBar backgroundColor={'#040921'} />
                <Pressable
                  onPress={() => {
                    updateFileEnlargeState('');
                  }}
                  style={styles.closeBtn}>
                  <CloseIcon width={dgl * 0.025} height={dgl * 0.025} />
                </Pressable>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: url,
                    cache: true,
                  }}
                  style={styles.pdfStyle}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  updateshowImageHeader(!showImageHeader);
                }}
                style={styles.animatedView}>
                <StatusBar backgroundColor={'#040921'} />
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInUp}
                    style={[
                      styles.imageEnlargeAnimatedStyles,
                      styles.imageEnlargeAnimatedStylesWidth,
                    ]}>
                    <View style={styles.rowDirection}>
                      <Pressable
                        style={[styles.zindex1, styles.arrowPadding]}
                        onPress={() => {
                          updateFileEnlargeState('');
                        }}>
                        <LeftArrow width={dgl * 0.03} height={dgl * 0.02} />
                      </Pressable>
                      <View style={styles.senderNameView}>
                        <Text style={styles.senderText} numberOfLines={1}>
                          {messageDetails?.owner
                            ? 'You'
                            : messageDetails?.senderName}
                        </Text>
                        <Text style={styles.chatDate}>
                          {moment(messageDetails?.createdAt).format(
                            'DD/MM/YYYY',
                          )}{' '}
                          {moment(messageDetails?.createdAt).format('hh:mm A')}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={styles.forwardView}>
                      <ForwardIcon
                        width={dgl * 0.025}
                        height={dgl * 0.025}
                        style={ChatBoxStyles.margin}
                      />
                      <VerticalDots width={dgl * 0.02} height={dgl * 0.02} />
                    </View> */}
                  </Animated.View>
                )}
                <Pressable
                  onPress={() => {
                    updateshowImageHeader(!showImageHeader);
                  }}>
                  <VideoPlayer
                    video={{
                      // uri: `file://${url}`,
                      uri: url,
                    }}
                    controls
                    videoWidth={1600}
                    videoHeight={900}
                    showDuration
                    style={{
                      height: measures.windowHeight / 1.3,
                    }}
                  />
                </Pressable>
              </Pressable>
            )}
          </Modal>
        )}
      </View>
    );
  } catch (error) {
    return <View />;
  }
});

export default MediaAndDocScreen;
