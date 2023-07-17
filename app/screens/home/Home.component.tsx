/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {homeStyle} from './Home.style';
import {useDispatch} from 'react-redux';
import useTheme from '../../utils/theming/useTheme';
import {setTab} from '../../redux/slices/tab.slice';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

/**
 * Components only used in home screen.
 * @param {string} title title for section.
 * @param {string} bosy body content for section.
 * @returns JSX component.
 */
interface HeaderProps {
  activeTab: (active: string) => void;
}
interface Item {
  key: string;
  name: string;
}
export const TabSection = (props: HeaderProps) => {
  const style = useThemedStyles(homeStyle);
  const [active, setActive] = useState('chats');
  const theme = useTheme();
  const dispatch = useDispatch();
  const tabs = [
    {key: 'chats', name: 'CHATS'},
    {key: 'broadcast', name: 'BROADCAST'},
    // {key: 'groups', name: 'GROUPS'},
  ];

  const switchScreens = (key: string) => {
    setActive(key);
    props.activeTab(key);
    dispatch(setTab(key));
  };

  const renderSearchNavbar = (item: Item) => {
    return (
      <TouchableOpacity
        onPress={() => switchScreens(item.key)}
        style={[
          style.navTab,
          {
            borderBottomColor:
              item.key === active
                ? theme.colors.BACKGROUND
                : theme.colors.TEXT_COLOR,
          },
        ]}>
        <Text
          style={[
            style.navTabHeader,
            {
              opacity: item.key === active ? 1 : 0.4,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.headerSection}>
      <FlatList
        // horizontal
        data={tabs}
        numColumns={2}
        keyExtractor={item => item.key}
        contentContainerStyle={style.searchNave}
        renderItem={({item}) => renderSearchNavbar(item)}
      />
    </View>
  );
};
interface Profile {
  icon: any;
  title: string;
  handleNewBroadcast?: () => void;
}
export const BroadcastProfile = (props: Profile) => {
  const style = useThemedStyles(homeStyle);
  return (
    <TouchableOpacity
      onPress={props.handleNewBroadcast}
      style={style.profileContainer}>
      <View style={style.profileIcon}>{props.icon}</View>
      <Text style={style.profileTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};
