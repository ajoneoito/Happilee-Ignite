/* eslint-disable no-useless-escape */
/**
 * ChatBox.Screen.tsx
 * @module Chat screen
 * @desc listing chat history and details
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Text,
  View,
  Image,
  Modal,
  FlatList,
  StatusBar,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  BotIcon,
  PdfIcon,
  ClipIcon,
  SendIcon,
  UserIcon,
  CloseIcon,
  LeftArrow,
  VoiceIcon,
  CameraIcon,
  DoubleTick,
  SmileImoji,
  GalleryIcon,
  DocumentIcon,
  VoiceSendIcon,
  AudioDeleteIcon,
  BackgroundImage,
} from '../../assets';
import {t} from 'i18next';
import moment from 'moment';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {C} from '../../constants';
import Pdf from 'react-native-pdf';
import React, {useCallback} from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import measures from '../../constants/measures';
import {KeyboardAvoidingView} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import ChatBoxHeader from './Component/ChatBoxHeader';
import {goBack} from '../../navigation/useNavigationUtils';
import {ChatMessage} from '../../interface/ChatboxInterface';
import RenderMediaFile from './Component/RenderImage.component';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImageToUploadInterface} from '../../utils/database/interfaces';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useChatboxMainHook} from '../../hooks/ChatBoxHooks/useChatboxhook';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Sound = require('react-native-sound');
Sound.setCategory('Playback');

const ChatBox = () => {
  const {
    url,
    dgl,
    data,
    Item,
    imoji,
    toDate,
    paused,
    caption,
    history,
    seconds,
    sending,
    showDate,
    imageRef,
    authState,
    isEnlarge,
    AudioState,
    AudioFile,
    audioIndex,
    sectionDate,
    textMessage,
    isRecording,
    flatlistRef,
    modalVisible,
    ChatBoxStyles,
    numberOfLines,
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
    updateMessageDetails,
    onPressPreviewDelete,
    updateshowImageHeader,
    updateFileEnlargeState,
    onLongPressMessageText,
    handleContentSizeChange,
  } = useChatboxMainHook();

  const renderMessage = ({item, index}: {item: ChatMessage; index: number}) => {
    try {
      const messageDate = moment(history[index - 1]?.createdAt).format(
        'YYYY-MM-DD',
      );
      const startDate = moment(messageDate);
      return (
        <>
          {moment(history[index - 1]?.createdAt).format('DD MMMM YYYY') !==
            moment(item?.createdAt).format('DD MMMM YYYY') && (
            <View style={ChatBoxStyles.eventView}>
              <Text
                style={[
                  {fontFamily: C.font.Medium},
                  ChatBoxStyles.descriptionText,
                ]}>
                {toDate.diff(startDate, 'days') === 0
                  ? 'Today'
                  : toDate.diff(startDate, 'days') === 1
                  ? 'Yesterday'
                  : moment(history[index - 1]?.createdAt).format(
                      'DD MMMM YYYY',
                    )}
              </Text>
            </View>
          )}
          {item?.eventType === 'ticket' ? (
            <View style={ChatBoxStyles.eventView}>
              <Text
                style={[
                  {fontFamily: C.font.Medium},
                  ChatBoxStyles.descriptionText,
                ]}>
                {item?.messageText}
              </Text>
            </View>
          ) : item?.messageType === 'image' ||
            item?.mime_type === 'image/png' ||
            item?.messageType === 'video' ||
            item?.messageType === 'document' ||
            item?.messageType === 'audio' ? (
            <>
              <TimeView item={item} />
              <RenderMediaFile
                onFileSelect={() => {
                  if (
                    item?.messageType === 'image' ||
                    item?.mime_type === 'image/png' ||
                    item?.messageType === 'video'
                  ) {
                    onPressImageView(item);
                  } else {
                    updateFileEnlargeState('pdf');
                    updateUrl(item?.fileLocationUrl, '');
                  }
                }}
                item={item}
                type={item?.messageType}
                data={data}
                Item={Item}
                onToggle={() => {
                  handleAudioPlayer(index);
                  return index;
                }}
                index={AudioFile?.index === index ? index : audioIndex}
              />
            </>
          ) : (
            item?.messageText && (
              <Pressable
                onLongPress={() => {
                  onLongPressMessageText(item?.messageText.trim());
                }}
                style={ChatBoxStyles.padding}>
                <View
                  style={[
                    ChatBoxStyles.messageView,
                    item?.owner
                      ? ChatBoxStyles.messageSendedStyle
                      : ChatBoxStyles.messageRecievedStyle,
                  ]}>
                  <Text style={ChatBoxStyles.messageTxt}>
                    {item?.messageText.trim()}
                  </Text>
                </View>
                <TimeView item={item} />
              </Pressable>
            )
          )}
          {index === history?.length - 1 &&
            moment(history[index - 1]?.createdAt).format('DD MMMM YYYY') ===
              moment(item?.createdAt).format('DD MMMM YYYY') && (
              <View style={ChatBoxStyles.eventView}>
                <Text
                  style={[
                    {fontFamily: C.font.Medium},
                    ChatBoxStyles.descriptionText,
                  ]}>
                  {toDate.diff(startDate, 'days') === 0
                    ? 'Today'
                    : toDate.diff(startDate, 'days') === 1
                    ? 'Yesterday'
                    : moment(history[index]?.createdAt).format('DD MMMM YYYY')}
                </Text>
              </View>
            )}
        </>
      );
    } catch (error) {
      return <View />;
    }
  };

  const TimeView = (props: {item: ChatMessage}) => {
    try {
      return props?.item?.owner ? (
        <View style={[ChatBoxStyles.messageStatusView, ChatBoxStyles.aligView]}>
          {props?.item?.messageStatusString === 'READ' && (
            <DoubleTick width={dgl * 0.03} height={dgl * 0.01} />
          )}
          <UserIcon width={dgl * 0.02} height={dgl * 0.015} />
          <View style={ChatBoxStyles.rowDirection2}>
            <Text
              style={[ChatBoxStyles.messageStatusText, {maxWidth: dgl * 0.15}]}
              numberOfLines={1}>
              {props?.item?.senderName}{' '}
            </Text>
            <Text style={ChatBoxStyles.messageStatusText}>
              {moment(props?.item?.createdAt).format('hh:mm a')}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={[ChatBoxStyles.messageStatusView, ChatBoxStyles.alignView2]}>
          <Text style={ChatBoxStyles.messageStatusText}>
            {moment(props?.item?.createdAt).format('hh:mm a')}
          </Text>
        </View>
      );
    } catch (error) {
      return <View />;
    }
  };

  const FooterComponent = () => {
    try {
      if (imageRef?.current?.length > 0) {
        return imageRef?.current?.length
          ? imageRef?.current?.map(
              (item: ImageToUploadInterface, index: number) => {
                return (
                  <View key={index} style={ChatBoxStyles.row3}>
                    {item?.mime === 'application/pdf' ? (
                      <View key={index}>
                        <Pressable
                          onPress={() => {
                            updateFileEnlargeState('pdf');
                            updateUrl(item?.path, '');
                          }}
                          style={[
                            ChatBoxStyles.pdfView,
                            ChatBoxStyles.pdfSendedStyle,
                          ]}>
                          <PdfIcon />
                          <Text numberOfLines={5} style={ChatBoxStyles.pdfText}>
                            {item?.path.replace(/^.*[\\\/]/, '')}
                          </Text>
                          <ActivityIndicator size="small" color={'#199CD9'} />
                        </Pressable>
                        <Text style={ChatBoxStyles.flexEnd}>Sending...</Text>
                      </View>
                    ) : item?.mime === 'audio/mpeg' ? (
                      <View style={ChatBoxStyles.width} key={index}>
                        <AudioPlayer
                          url={item?.path}
                          link={item?.path}
                          item={item}
                          data={data}
                          Item={Item}
                          onToggle={() => {
                            handleAudioPlayer(index);
                            return index;
                          }}
                          index={audioIndex}
                          uploading={true}
                          downloadFile={() => {}}
                        />
                        <Text style={ChatBoxStyles.flexEnd}>Sending...</Text>
                      </View>
                    ) : (
                      <View key={index}>
                        <Pressable
                          onPress={() => {
                            updateUrl(item?.path, item.caption);
                            updateMessageDetails(item);
                            updateFileEnlargeState('image');
                          }}
                          style={[
                            ChatBoxStyles.imageView,
                            ChatBoxStyles.imageSendedStyle,
                          ]}>
                          <Image
                            source={{
                              uri: item?.path,
                            }}
                            style={ChatBoxStyles.imageStyle}
                            resizeMode="cover"
                          />
                          {item.caption && (
                            <Text
                              style={[
                                ChatBoxStyles.messageTxt,
                                ChatBoxStyles.textBackground1,
                              ]}>
                              {item.caption}
                            </Text>
                          )}
                          {item.uploaded === 'cancelled' ? (
                            <MaterialCommunityIcons
                              style={ChatBoxStyles.downloadIconIndicator}
                              name="arrow-up-bold-circle"
                              size={dgl * 0.06}
                              color="grey"
                            />
                          ) : item.uploaded === '' ? (
                            <Pressable style={ChatBoxStyles.uploadIndicator}>
                              <ActivityIndicator
                                size="large"
                                color={'#199CD9'}
                              />
                            </Pressable>
                          ) : null}
                        </Pressable>
                        <Text style={ChatBoxStyles.flexEnd}>Sending...</Text>
                      </View>
                    )}
                    {item.uploaded === '' && (
                      <Pressable
                        style={ChatBoxStyles.previewDeleteBtn}
                        onPress={() => {
                          onPressPreviewDelete(item);
                        }}>
                        <CloseIcon />
                      </Pressable>
                    )}
                  </View>
                );
              },
            )
          : null;
      }
    } catch (error) {
      console.log(error, 'chatError2');
    }
  };

  const HeaderDateComponent = useCallback(() => {
    try {
      return sectionDate ? (
        <View
          style={[
            ChatBoxStyles.sectionDateView,
            AudioState?.isAudioPlaying !== null ? ChatBoxStyles.top : undefined,
          ]}>
          <Text style={[ChatBoxStyles.sectionDateText]}>
            {toDate.diff(moment(sectionDate), 'days') === 0
              ? 'Today'
              : toDate.diff(moment(sectionDate), 'days') === 1
              ? 'Yesterday'
              : moment(sectionDate).format('DD MMMM YYYY')}
          </Text>
        </View>
      ) : null;
    } catch (error) {
      console.error(error);
    }
  }, [
    toDate,
    sectionDate,
    ChatBoxStyles.top,
    AudioState?.isAudioPlaying,
    ChatBoxStyles.sectionDateView,
    ChatBoxStyles.sectionDateText,
  ]);

  const MessageCopiedToastView = useCallback(() => {
    return isMessageCopied ? (
      <View style={ChatBoxStyles.sectionDateView}>
        <Text style={ChatBoxStyles.sectionDateText}>Message Copied</Text>
      </View>
    ) : (
      <View />
    );
  }, [
    isMessageCopied,
    ChatBoxStyles.sectionDateText,
    ChatBoxStyles.sectionDateView,
  ]);

  const templateButton = () => {
    return (
      <TouchableOpacity
        style={ChatBoxStyles.templateBox}
        onPress={() => sendTemplateMsg()}>
        <Text style={ChatBoxStyles.templateText}>
          {t('chatBox:SEND_TEMPLATE')}
        </Text>
      </TouchableOpacity>
    );
  };

  const TextInputSection = () => {
    return (
      <View style={ChatBoxStyles.inputMainView}>
        <View style={ChatBoxStyles.inputSection}>
          <View
            style={[
              ChatBoxStyles.textArea,
              numberOfLines < 3
                ? [ChatBoxStyles.borderRadius]
                : numberOfLines < 8
                ? {borderRadius: 100 / numberOfLines}
                : ChatBoxStyles.borderRadius1,
              textMessage?.length
                ? ChatBoxStyles.borderColorActive
                : ChatBoxStyles.borderColorInActive,
              authState.projectId !== 'all'
                ? undefined
                : ChatBoxStyles.inputWidth,
            ]}>
            <SmileImoji
              onPress={() => {
                setImoji(true);
              }}
              style={ChatBoxStyles.imojiIcon}
            />
            <TextInput
              placeholder={t('chatBox:TYPE_MESSAGE') || 'Type a message'}
              placeholderTextColor={'#6A737D'}
              multiline
              style={[
                ChatBoxStyles.inputStyle,
                Platform.OS === 'ios'
                  ? numberOfLines < 3
                    ? {minHeight: numberOfLines * 35}
                    : numberOfLines < 5
                    ? {
                        minHeight: numberOfLines * 30,
                      }
                    : [ChatBoxStyles.borderRadius1, {minHeight: 130}]
                  : null,
              ]}
              value={textMessage}
              onChangeText={setTextMessage}
              onContentSizeChange={handleContentSizeChange}
            />
            <EmojiPicker
              onEmojiSelected={EmojiType => {
                setTextMessage(textMessage + EmojiType?.emoji);
                setImoji(true);
              }}
              open={imoji}
              onClose={() => setImoji(false)}
            />
            {!textMessage?.length && authState.projectId !== 'all' && (
              <Menu
                onBackdropPress={() => {
                  updatemodalvisible(false);
                }}
                opened={modalVisible}>
                <MenuTrigger
                  onPress={() => {
                    updatemodalvisible(true);
                  }}>
                  <ClipIcon
                    onPress={() => {
                      updatemodalvisible(!modalVisible);
                    }}
                    marginTop={13}
                  />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={ChatBoxStyles.mediaMenu}>
                  <MenuOption style={ChatBoxStyles.zindex1}>
                    <View
                      style={[
                        ChatBoxStyles.row,
                        ChatBoxStyles.justify,
                        ChatBoxStyles.wrap,
                      ]}>
                      <Pressable
                        onPress={() => {
                          captureImage();
                        }}
                        style={ChatBoxStyles.mediaOptionView}>
                        <GalleryIcon />
                        <Text style={ChatBoxStyles.mediaOptionText}>
                          Capture Image
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          captureVideo();
                        }}
                        style={ChatBoxStyles.mediaOptionView}>
                        <CameraIcon />
                        <Text style={ChatBoxStyles.mediaOptionText}>
                          Capture Video
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          takeDocument();
                        }}
                        style={ChatBoxStyles.mediaOptionView}>
                        <DocumentIcon />
                        <Text style={ChatBoxStyles.mediaOptionText}>
                          Attachments
                        </Text>
                      </Pressable>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )}
          </View>
          {!textMessage?.length && authState.projectId !== 'all' ? (
            <>
              <Pressable
                onPress={() => {
                  setIsRecording(true);
                  handleAudioPlayer(null);
                }}
                style={ChatBoxStyles.voiceIcon}>
                <VoiceSendIcon width={15} height={20} />
              </Pressable>
              <View style={ChatBoxStyles.botIcon}>
                <BotIcon width={25} height={25} />
              </View>
            </>
          ) : (
            <TouchableOpacity
              onPress={sendMessage}
              style={Platform.OS === 'android' && ChatBoxStyles.flexEnd}
              disabled={sending}>
              <SendIcon
                width={40}
                height={40}
                marginBottom={5}
                marginRight={5}
                marginLeft={5}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  try {
    return (
      <MenuProvider skipInstanceCheck={true}>
        <View style={ChatBoxStyles.container}>
          {/* Background image for the chat history section */}
          <View style={ChatBoxStyles.backgroundImage}>
            <BackgroundImage width={'100%'} height={'100%'} />
          </View>
          {/* Header section of chat screen component */}
          <ChatBoxHeader
            title={data?.firstName || 'Invalid User'}
            statusData={[t('chatBox:OPEN'), t('chatBox:SOLVED')]}
            expirationTime={expirationTime}
            status={Item?.status || 'Closed'}
            onPress={() => {
              goBack();
            }}
            AudioState={AudioState}
            onChangeStatus={updateChatStatus}
            onClickMenu={onClickMenu}
            onPressnameView={onPressnameView}
          />
          <View style={ChatBoxStyles.headerComponentView}>
            {showDate && <HeaderDateComponent />}
          </View>
          {/* Listing chat history using FlatList */}
          <FlatList
            data={history}
            renderItem={renderMessage}
            ref={flatlistRef}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            inverted
            ListHeaderComponent={FooterComponent}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              loadMoredata();
            }}
            onScrollBeginDrag={handleScroll}
            onScrollEndDrag={onEndScroll}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs?.current
            }
            viewabilityConfig={{
              itemVisiblePercentThreshold: 40,
            }}
          />
          <View style={ChatBoxStyles.toastView}>
            {isMessageCopied && <MessageCopiedToastView />}
          </View>
          {/* Message sending section */}
          {Item?.status === 'blocked' ? (
            <View style={ChatBoxStyles.blockBox}>
              <Text style={ChatBoxStyles.blockHead}>
                {t('chatBox:USER_BLOCKED')}
              </Text>
              <Text style={ChatBoxStyles.blockDesc}>
                {t('chatBox:MESSAGE_ALERT')}
              </Text>
            </View>
          ) : Item?.status !== 'open' || expirationTime.includes('-') ? (
            <View style={ChatBoxStyles.blockBox}>
              <Text style={ChatBoxStyles.blockHead}>
                {t('chatBox:CONVERSATION_CLOSED')}
              </Text>
              <Text style={ChatBoxStyles.blockDesc}>
                {t('chatBox:MESSAGE_ALERT')}
              </Text>
              {templateButton()}
            </View>
          ) : Item?.status === 'open' &&
            Item?.isCandidateReplied &&
            !isRecording ? (
            Platform.OS === 'ios' ? (
              <KeyboardAvoidingView
                style={ChatBoxStyles.keyboardAvoidView}
                behavior={'padding'}>
                {TextInputSection()}
              </KeyboardAvoidingView>
            ) : (
              <>{TextInputSection()}</>
            )
          ) : Item?.status === 'open' &&
            Item?.isCandidateReplied &&
            isRecording ? (
            <View style={ChatBoxStyles.recordSection}>
              <View style={ChatBoxStyles.recordView}>
                <VoiceIcon />
                <Text style={ChatBoxStyles.recordTime}>{seconds}</Text>
              </View>
              <View style={ChatBoxStyles.recordRowStyle}>
                <AudioDeleteIcon
                  onPress={() => {
                    setIsRecording(false);
                    setSeconds('');
                    onStopRecord(false);
                  }}
                />
                {paused && (
                  <MaterialIcons
                    name="keyboard-voice"
                    color="red"
                    size={dgl * 0.035}
                    onPress={() => {
                      setPaused(false);
                      onResumeRecord();
                    }}
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    onStopRecord(true);
                    setIsRecording(false);
                    setSeconds('');
                  }}
                  style={ChatBoxStyles.flexEnd}
                  disabled={sending}>
                  <SendIcon
                    width={40}
                    height={40}
                    marginLeft={5}
                    marginBottom={5}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={ChatBoxStyles.blockBox}>
              <Text style={ChatBoxStyles.blockHead}>Awaiting User Reply</Text>
              {templateButton()}
            </View>
          )}
        </View>
        {isEnlarge !== '' && (
          <Modal>
            {isEnlarge === 'image' ? (
              <Pressable
                onPress={() => {
                  updateshowImageHeader(!showImageHeader);
                }}
                style={[ChatBoxStyles.animatedView]}>
                <StatusBar backgroundColor={'#040921'} />
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInUp}
                    style={ChatBoxStyles.imageEnlargeAnimatedStyles}>
                    <View style={ChatBoxStyles.rowDirection2}>
                      <LeftArrow
                        onPress={() => {
                          updateFileEnlargeState('');
                        }}
                        width={dgl * 0.03}
                        height={dgl * 0.02}
                        style={ChatBoxStyles.zindex1}
                      />
                      <View style={ChatBoxStyles.senderNameView}>
                        <Text
                          style={ChatBoxStyles.senderText}
                          numberOfLines={1}>
                          {messageDetails?.owner
                            ? 'You'
                            : messageDetails?.senderName}
                        </Text>
                        <Text style={ChatBoxStyles.chatDate}>
                          {moment(messageDetails?.createdAt).format(
                            'DD/MM/YYYY',
                          )}{' '}
                          {moment(messageDetails?.createdAt).format('hh:mm A')}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={ChatBoxStyles.forwardView}>
                      <ForwardIcon
                        width={dgl * 0.025}
                        height={dgl * 0.025}
                        style={ChatBoxStyles.margin}
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
                  source={{uri: url}}
                  style={[
                    ChatBoxStyles.imageEnlargeStyle,
                    ChatBoxStyles.zindex2,
                  ]}
                  resizeMode="cover"
                />
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInDown}
                    style={ChatBoxStyles.captionView}>
                    <Text
                      style={[
                        ChatBoxStyles.senderText,
                        ChatBoxStyles.margin,
                        ChatBoxStyles.textAlign,
                      ]}>
                      {caption}
                    </Text>
                  </Animated.View>
                )}
              </Pressable>
            ) : isEnlarge === 'pdf' ? (
              <View style={ChatBoxStyles.flex}>
                <StatusBar backgroundColor={'#040921'} />
                <Pressable
                  onPress={() => {
                    updateFileEnlargeState('');
                  }}
                  style={ChatBoxStyles.closeBtn}>
                  <CloseIcon width={dgl * 0.025} height={dgl * 0.025} />
                </Pressable>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: url,
                    cache: true,
                  }}
                  style={ChatBoxStyles.pdfStyle}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  updateshowImageHeader(!showImageHeader);
                }}
                style={ChatBoxStyles.animatedView}>
                <StatusBar backgroundColor={'#040921'} />
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInUp}
                    style={[
                      ChatBoxStyles.imageEnlargeAnimatedStyles,
                      ChatBoxStyles.imageEnlargeAnimatedStylesWidth,
                    ]}>
                    <View style={ChatBoxStyles.rowDirection2}>
                      <Pressable
                        style={[
                          ChatBoxStyles.zindex1,
                          ChatBoxStyles.arrowPadding,
                        ]}
                        onPress={() => {
                          updateFileEnlargeState('');
                        }}>
                        <LeftArrow width={dgl * 0.03} height={dgl * 0.02} />
                      </Pressable>
                      <View style={ChatBoxStyles.senderNameView}>
                        <Text
                          style={ChatBoxStyles.senderText}
                          numberOfLines={1}>
                          {messageDetails?.owner
                            ? 'You'
                            : messageDetails?.senderName}
                        </Text>
                        <Text style={ChatBoxStyles.chatDate}>
                          {moment(messageDetails?.createdAt).format(
                            'DD/MM/YYYY',
                          )}{' '}
                          {moment(messageDetails?.createdAt).format('hh:mm A')}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={ChatBoxStyles.forwardView}>
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
                {showImageHeader && (
                  <Animated.View
                    entering={FadeInDown}
                    style={ChatBoxStyles.captionView}>
                    <Text
                      style={[
                        ChatBoxStyles.senderText,
                        ChatBoxStyles.margin,
                        ChatBoxStyles.textAlign,
                      ]}>
                      {caption}
                    </Text>
                  </Animated.View>
                )}
              </Pressable>
            )}
          </Modal>
        )}
      </MenuProvider>
    );
  } catch (error) {
    console.log(error, 'chatbox error');
    return <View />;
  }
};

export default ChatBox;
