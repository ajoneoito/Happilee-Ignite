/**
 * Home.Screen.tsx
 * @module Home screen
 * @desc Screen for Home listing chats, broadcast and goups.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {t} from 'i18next';
import {
  ChatListInterface,
  BroadcastInterface,
} from '../../utils/database/interfaces';
import {routeEnum} from '../../enums/route.enum';
import ContactCard from './ContactCard.component';
import {MenuProvider} from 'react-native-popup-menu';
import {toDate} from '../../utils/functions/funtions';
import {Swipeable} from 'react-native-gesture-handler';
import {navigate} from '../../navigation/useNavigationUtils';
import useHomeScreenHook from '../../hooks/useHomeScreenHook';
import {BroadcastProfile, TabSection} from './Home.component';
import Header from '../../components/Header/Header.componenet';
import {Csv, PenIcon, Broadcast, DoubleArrow} from '../../assets';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import RoundButton from '../../components/RoundButton/RoundButton.component';

const HomeScreen = () => {
  const {
    auth,
    style,
    theme,
    active,
    search,
    toggle,
    newData,
    chatsRef,
    isOnline,
    activeTab,
    broadcastListnew,
    changeTab,
    deletChat,
    handleCSV,
    searchData,
    loadMoredata,
    getChatHistory,
    handleNewestData,
    applyPrimaryFilter,
    handleBroadcastLog,
    handleNewBroadcast,
    applySecondaryFilter,
    loadMoreBroadcastList,
  } = useHomeScreenHook();

  const RightItem = (_progress: number, _item: ChatListInterface) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deletChat(_item.chatUid);
          newData.current = _item.id;
        }}
        style={style.deletBox}>
        <Text>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderChats = (item: ChatListInterface) => {
    let time_ago = toDate(item?.message_created_time);
    return (
      <Swipeable renderRightActions={progress => RightItem(progress, item)}>
        <TouchableOpacity
          style={style.chatBox}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          activeOpacity={0.9}
          onPress={() => {
            getChatHistory(item);
          }}>
          <View style={style.profileSection}>
            <Text style={style.firstL}>
              {item?.firstName?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={style.nameSection}>
            <View style={style.countBox}>
              <Text numberOfLines={1} style={style.chatName}>
                {item?.firstName}
              </Text>
              {auth.projectId === 'all' ? (
                <Text style={style.projectTitle} numberOfLines={1}>
                  {item?.project_name}
                </Text>
              ) : null}
              {item?.currentUnreadMessageCount &&
              item?.currentUnreadMessageCount > 0 ? (
                <View style={style.chatCountBox}>
                  <Text style={style.chatCount}>
                    {item?.currentUnreadMessageCount}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text numberOfLines={1} style={style.chatText}>
              {item?.messageType === 'audio'
                ? 'Audio'
                : item?.messageType === 'video'
                ? 'Video'
                : item?.messageType === 'image'
                ? 'Photo'
                : item?.messageType === 'document'
                ? 'Document'
                : item?.messageText}
            </Text>
          </View>
          <View style={style.timeSection}>
            <Text style={style.time}>{time_ago}</Text>
            <View
              style={[
                style.statusBox,
                item?.status === 'expired'
                  ? style.expiredBackgroundColor
                  : item?.status === 'open'
                  ? style.openBackgroundColor
                  : style.defaultBackgroundColor,
              ]}>
              <Text
                style={[
                  style.status,
                  item?.status === 'expired'
                    ? style.expiredColor
                    : item?.status === 'open'
                    ? style.openColor
                    : style.defaultColor,
                ]}>
                {item?.status?.toUpperCase()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  const renderBroadcast = ({item}: {item: BroadcastInterface}) => {
    return <ContactCard item={item} handleBroadcastLog={handleBroadcastLog} />;
  };

  const ChatList = () => {
    const newChat = () => {
      navigate(routeEnum.SELECTCONTACT);
    };

    return (
      <>
        <View style={style.chatContainer}>
          <FlatList
            data={chatsRef?.current}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderChats(item)}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              loadMoredata();
            }}
            ListEmptyComponent={EmptyListMessage}
            ListFooterComponent={() => {
              return !isOnline ? (
                <View style={style.footerStyle}>
                  <Text>Please Connect to a network</Text>
                </View>
              ) : (
                <View />
              );
            }}
          />
        </View>
        {auth.projectId !== 'all' ? (
          <RoundButton
            backgroundColor={theme.colors.TEXT_COLOR}
            onPress={() => newChat()}
            child={<PenIcon />}
          />
        ) : null}
      </>
    );
  };

  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <Text style={style.emptyText}>Oops! We are sorry - No results found</Text>
    );
  };

  const BroadcastScreen = () => {
    return (
      <>
        <View style={style.broadcastContainer}>
          <View style={style.broadcastWrap}>
            {!search ? (
              <View style={style.newBroadcast}>
                <BroadcastProfile
                  handleNewBroadcast={handleNewBroadcast}
                  title={t('broadcast:BROADCAST_TITLE')}
                  icon={<Broadcast />}
                />
                <BroadcastProfile
                  handleNewBroadcast={handleCSV}
                  title={t('broadcast:CSV')}
                  icon={<Csv />}
                />
              </View>
            ) : null}

            <View style={style.recentConatiner}>
              <Text numberOfLines={1} style={style.recent}>
                {t('broadcast:RECENT')}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleNewestData}
                style={style.toggle}>
                <Text style={style.newest}>
                  {toggle ? t('broadcast:NEW') : 'Oldest'}
                </Text>
                <DoubleArrow />
              </TouchableOpacity>
            </View>
            <View style={style.flex}>
              <FlatList
                onEndReached={loadMoreBroadcastList}
                onEndReachedThreshold={0.5}
                data={broadcastListnew}
                // extraData={broadcastListnew}
                keyExtractor={index => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderBroadcast}
                ListEmptyComponent={EmptyListMessage}
              />
              {/* <BroadcastFlatList /> */}
            </View>
          </View>
        </View>
      </>
    );
  };

  // const GroupsScreen = () => {
  //   return (
  //     <>
  //       <View style={style.container}>
  //         <Text>Groups Screen - inprogress</Text>
  //       </View>
  //     </>
  //   );
  // };
  try {
    return (
      <MenuProvider>
        <Header
          logo
          hamburger
          search
          // menu={activeTab !== 'chats' ? true : false}
          filter={activeTab === 'chats' ? true : false}
          searchText={search}
          setSearchText={searchData}
          setPrimaryFilter={applyPrimaryFilter}
          setSecondaryFilter={applySecondaryFilter}
        />
        <TabSection activeTab={changeTab} />
        <View style={style.container}>
          {active === 'chats' ? (
            <>{ChatList()}</>
          ) : active === 'broadcast' ? (
            <>{BroadcastScreen()}</>
          ) : null}
        </View>
      </MenuProvider>
    );
  } catch (error) {
    console.log(error, 'home screen error');
    return <View />;
  }
};

export default HomeScreen;
