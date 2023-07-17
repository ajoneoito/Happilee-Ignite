import React from 'react';
import {C} from '../../../constants';
import {View, Text} from 'react-native';
import {ClockIcon} from '../../../assets';
import ChatBoxStyle from '../ChatBox.style';
import useThemedStyles from '../../../utils/theming/useThemedStyles';

const ChatExpirationTime = ({expirationTime}: {expirationTime: string}) => {
  const dgl = C.measures.dgl;
  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);
  return (
    <View style={[ChatBoxStyles.timer, ChatBoxStyles.row]}>
      <ClockIcon height={dgl * 0.03} width={dgl * 0.015} />
      <Text style={ChatBoxStyles.timeText} numberOfLines={1}>
        {expirationTime}
      </Text>
    </View>
  );
};

export default ChatExpirationTime;
