/* eslint-disable react-native/no-inline-styles */
/**
 * ChatBoxDefaultMenu.tsx
 * @module ChatBoxDefaultMenu Component
 * @desc default menu section
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {C} from '../../../constants';
import ChatBoxStyle from '../ChatBox.style';
import {Text, Pressable} from 'react-native';
import {VerticalDots} from '../../../assets';
import {FlatList} from 'react-native-gesture-handler';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {useDefaultMenuHook} from '../../../hooks/ChatBoxHooks/useDefaultMenuHook';

interface Props {
  onClickMenu: (item: string) => void | undefined;
}

const ChatBoxDefaultMenu = (props: Props) => {
  const dgl = C.measures.dgl;
  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);
  const {data, selectedindex, opended, updateMenuState, onPress} =
    useDefaultMenuHook();
  return (
    <Menu
      onBackdropPress={() => {
        updateMenuState(false);
      }}
      opened={opended}>
      <MenuTrigger
        onPress={() => {
          updateMenuState(true);
        }}
        style={{padding: 5}}>
        <VerticalDots width={dgl * 0.005} height={dgl * 0.02} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={[ChatBoxStyles.menuStyle]}>
        <MenuOption style={{zIndex: 10}} />
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  onPress(index, false);
                  props.onClickMenu(item.key);
                }}
                style={[
                  ChatBoxStyles.defaultMenuIcon,
                  selectedindex === index
                    ? ChatBoxStyles.defaultMenuBackgroundSelected
                    : ChatBoxStyles.defaultMenuBackground,
                ]}>
                {item.icon}
                <Text style={ChatBoxStyles.defaultMenuText}>{item.value}</Text>
              </Pressable>
            );
          }}
        />
      </MenuOptions>
    </Menu>
  );
};

export default ChatBoxDefaultMenu;
