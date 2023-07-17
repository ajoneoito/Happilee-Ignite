/* eslint-disable react-hooks/exhaustive-deps */
/**
 * NewBroadcast.Screen.tsx
 * @module  NewBroadcast screen
 * @desc Screen for listing NewBroadcast.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Text,
  View,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import Animated from 'react-native-reanimated';
import {routeEnum} from '../../enums/route.enum';
import {MenuProvider} from 'react-native-popup-menu';
import { setTab } from '../../redux/slices/tab.slice';
import { useFocusEffect } from '@react-navigation/native';
import HapticFeedback from 'react-native-haptic-feedback';
import {Cancel, RightArrow, Selected} from '../../assets';
import {navigate} from '../../navigation/useNavigationUtils';
import { useNewBroadcast } from '../../hooks/useNewBroadcast';
import Header from '../../components/Header/Header.componenet';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import {BROADCAST_RECIPIENTS_ACTION} from '../../redux/actions/broadcastList.action';
import {broadcastRecipientsInterface} from '../../services/interface/broadcastInterface';
import {setSelectRecipients,setSelectRecipientsId,} from '../../redux/slices/selectAllId.slice';

const NewBroadcast = () => {
  const {
    style,
    theme,
    active,
    search,
    options,
    selected,
    recipient,
    selectAllId,
    recipientsFilter,
    selectRecipients,
    recipientsFilterState,
    setAnimation,
    handleSearch,
    selectedProfile,
  } = useNewBroadcast();
  const dispatch = useDispatch();
  const renderItem = (item: broadcastRecipientsInterface) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAnimation();
          selectedProfile(item);
          // HapticFeedback added for selecting recipients
          HapticFeedback.trigger('impactMedium', options);
          HapticFeedback.trigger('soft', options);
        }}
        style={style.chatBox}>
        <>
          <View style={style.profileSection}>
            <Text style={style.firstL}>
              {item?.firstName?.charAt(0)?.toUpperCase()}
            </Text>
            {selectAllId.includes(item.id) ? (
              <Selected style={style.selected} />
            ) : null}
          </View>

          <View style={style.nameSection}>
            <Text numberOfLines={1} style={style.chatName}>
              {item?.firstName}
            </Text>
          </View>
        </>
      </TouchableOpacity>
    );
  };

  const renderSelectedItem = (item: broadcastRecipientsInterface) => {
    return (
      <Animated.View style={[style.selectedItemConatiner]}>
        <View style={style.wraper}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setAnimation();
              let recip = selectRecipients.filter(i => i !== item);
              dispatch(setSelectRecipients(recip));
              let ItemId = selectAllId.filter(i => i !== item.id);
              dispatch(setSelectRecipientsId(ItemId));
            }}
            style={[style.profileSection]}>
            <Text style={style.firstL}>
              {item?.firstName?.charAt(0)?.toUpperCase()}
            </Text>
            <Cancel style={style.cancel} />
          </TouchableOpacity>
          <View style={style.firstName}>
            <Text style={style.selectedName} numberOfLines={1}>
              {item.firstName}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <Text style={style.emptyText}>Oops! We are sorry - No results found</Text>
    );
  };
  const loadMoredata = () => {
    if (recipientsFilterState?.hasNextPage) {
      dispatch({
        type: BROADCAST_RECIPIENTS_ACTION,
        payload: {
          ...recipientsFilter,
          pageNumber: recipientsFilter.pageNumber + 1,
        },
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setTab('recipients'));
    }, [])
  );


  try {
  return (
    <MenuProvider>
      <Header
        searchText={search}
        setSearchText={handleSearch}
        modalFilter={true}
        subTitle={`${selectAllId.length} of ${recipient.length} selected`}
        title="New Broadcast"
        setPrimaryFilter={() => {}}
        setSecondaryFilter={() => {}}
        arrow
        search
        filter
        menu
      />
      <View style={style.mainConatiner}>
        <View style={style.container}>
          {selectRecipients[0] ? (
            <View style={style.mainWraper}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={selectRecipients}
                renderItem={({item}) => renderSelectedItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={style.horizontalLine} />
            </View>
          ) : null}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipient}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={EmptyListMessage}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              loadMoredata();
            }}
          />
        </View>
      </View>
      <RoundButton
        disabled={active ? false : true}
        backgroundColor={
          selectAllId[0] ? theme.colors.TEXT_COLOR : theme.colors.DISABLE_COLOR
        }
        onPress={() => {
          navigate(routeEnum.TEMPLATESCREEN, {
            num: selectAllId,
            key: 'broadcast',
          });
        }}
        child={<RightArrow />}
      />
    </MenuProvider>
  );
} catch (error) {
  console.warn(error)  
}
};

export default NewBroadcast;
