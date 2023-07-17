import React from 'react';
import {LeftArrow} from '../../../assets';
import ChatBoxStyle from '../ChatBox.style';
import measures from '../../../constants/measures';
import ChatBoxStatusMenu from './ChatBoxStatusMenu';
import ChatBoxDefaultMenu from './ChatBoxDefaultMenu';
import ChatExpirationTime from './ChatExpirationTime';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {ChatBoxHeaderInterface} from '../../../interface/ChatboxInterface';

const ChatBoxHeader = (props: ChatBoxHeaderInterface) => {
  const {
    title,
    status,
    AudioState,
    statusData,
    expirationTime,
    onPress,
    onClickMenu,
    onChangeStatus,
    onPressnameView,
  } = props;

  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);

  return (
    <View
      style={[
        ChatBoxStyles.rowView,
        AudioState?.isAudioPlaying === null
          ? undefined
          : ChatBoxStyles.paddingTop,
      ]}>
      <View style={ChatBoxStyles.row1}>
        <TouchableOpacity
          onPress={onPress}
          hitSlop={{top: 10, left: 20, bottom: 10, right: 10}}>
          <LeftArrow width={measures.dgl * 0.03} onPress={onPress} />
        </TouchableOpacity>
        <Pressable
          onPress={onPressnameView}
          style={[ChatBoxStyles.row1, ChatBoxStyles.width]}>
          <View style={ChatBoxStyles.dp}>
            <Text style={ChatBoxStyles.dpText}>
              {title.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={ChatBoxStyles.textStyle} numberOfLines={1}>
            {title}
          </Text>
        </Pressable>
      </View>
      <View style={ChatBoxStyles.row2}>
        {/* Only shows timer if status is open and expiry time is completed */}
        {(status === 'open' || status === 'blocked') &&
        !expirationTime.includes('-') ? (
          <ChatExpirationTime expirationTime={expirationTime} />
        ) : null}
        <ChatBoxStatusMenu
          statusData={statusData}
          status={status}
          onChangeStatus={onChangeStatus}
        />
        <ChatBoxDefaultMenu onClickMenu={onClickMenu} />
      </View>
    </View>
  );
};

export default ChatBoxHeader;
