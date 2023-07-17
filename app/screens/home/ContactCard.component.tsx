import moment from 'moment';
import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Failed, Success} from '../../assets';
import {toUpper} from '../../utils/functions/funtions';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {homeStyle} from './Home.style';
import useTheme from '../../utils/theming/useTheme';
import {BroadcastInterface} from '../../utils/database/interfaces';

const ContactCard = ({
  item,
  handleBroadcastLog,
}: {
  item: BroadcastInterface;
  handleBroadcastLog: (arg0: BroadcastInterface) => void;
}) => {
  const theme = useTheme();
  const style = useThemedStyles(homeStyle);
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        handleBroadcastLog(item);
      }}
      style={style.profileContainer}>
      <View
        style={[
          style.profileIcon,
          style.profileStatus,
          item.status === 'succeeded'
            ? {backgroundColor: theme.colors.V_LIGHT_GREEN}
            : {backgroundColor: theme.colors.LIGHT_RED},
        ]}>
        {item.status === 'succeeded' ? <Success /> : <Failed />}
      </View>
      <View>
        <>
          {item.name ? (
            <Text
              numberOfLines={1}
              style={[style.profileTitle, style.broadcastStatus]}>
              {toUpper(item.name as string)}
            </Text>
          ) : null}
          <Text style={[style.profileTitle, style.date]}>
            {moment(new Date(item.createdAt as string)).format(
              'HH:mm, ddd MMM DD',
            )}
          </Text>
        </>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ContactCard);
