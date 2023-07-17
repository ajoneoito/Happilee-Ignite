import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {ArrowDown, UpArrow} from '../../../assets';
import {Text, Pressable, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {statusMenu} from '../../../interface/ChatboxInterface';
import {useStatusMenuHook} from '../../../hooks/ChatBoxHooks/useStatusMenuHook';

const ChatBoxStatusMenu = (props: statusMenu) => {
  const {
    dgl,
    opended,
    upArrow,
    ChatBoxStyles,
    selectedStatus,
    selectedStatusIndex,
    onPress,
    updateArrow,
    onPressStatusMenu,
  } = useStatusMenuHook(props);
  return (
    <Menu
      onClose={() => {
        updateArrow(false);
      }}
      onBackdropPress={() => {
        onPressStatusMenu(false);
      }}
      opened={opended}
      style={ChatBoxStyles.statusMenuStyle}>
      {props.status !== 'expired' && props.status !== 'blocked' ? (
        <MenuTrigger
          onPress={() => {
            updateArrow(true);
          }}>
          <Pressable
            onPress={() => {
              onPressStatusMenu(true);
            }}
            style={[ChatBoxStyles.statusView, ChatBoxStyles.rowDirection]}>
            <Text
              style={[
                ChatBoxStyles.statusText,
                selectedStatus === 'OPEN'
                  ? ChatBoxStyles.statusTextOpen
                  : ChatBoxStyles.statusTextResolved,
              ]}
              numberOfLines={1}>
              {selectedStatus}
            </Text>
            {upArrow ? (
              <UpArrow
                height={dgl * 0.02}
                width={dgl * 0.014}
                style={{marginBottom: dgl * 0.005}}
              />
            ) : (
              <ArrowDown
                height={dgl * 0.02}
                width={dgl * 0.014}
                style={{marginBottom: dgl * 0.005}}
              />
            )}
          </Pressable>
        </MenuTrigger>
      ) : (
        <View style={ChatBoxStyles.block}>
          <Text
            style={[ChatBoxStyles.blockText, ChatBoxStyles.blockText2]}
            numberOfLines={1}>
            {props.status.toUpperCase()}
          </Text>
        </View>
      )}
      {props.status !== 'expired' && props.status !== 'blocked' ? (
        <MenuOptions optionsContainerStyle={[ChatBoxStyles.menuStyle]}>
          <MenuOption>
            <Text style={ChatBoxStyles.statusMenuHeader}>Candidate Status</Text>
            {props.statusData && (
              <FlatList
                data={props.statusData}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      onPress={() => {
                        onPress(item, index);
                        onPressStatusMenu(false);
                      }}
                      style={[
                        ChatBoxStyles.selectedBackground,
                        selectedStatusIndex === index
                          ? ChatBoxStyles.selectedBackgroundColor
                          : ChatBoxStyles.defaultBackground,
                      ]}>
                      <Text
                        style={[
                          ChatBoxStyles.statusMenuOptionText,
                          item === 'OPEN'
                            ? ChatBoxStyles.openTextColor
                            : ChatBoxStyles.resolvedTextColor,
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}
          </MenuOption>
        </MenuOptions>
      ) : null}
    </Menu>
  );
};

export default ChatBoxStatusMenu;
