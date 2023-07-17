/**
 * FbLeadList.Screen.tsx
 * @module FbLeadList screen
 * @desc Screen for listing fb leads.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import { LeadData} from './lead.component';
import {StatusButton} from './lead.component';
import {routeEnum} from '../../enums/route.enum';
import {MenuProvider} from 'react-native-popup-menu';
import { leadStates} from '../../constants/filterOptions';
import {navigate} from '../../navigation/useNavigationUtils';
import Header from '../../components/Header/Header.componenet';
import { useFbLeadListScreen } from '../../hooks/useFbLeadListScreen';
import { getDateString, toUpper} from '../../utils/functions/funtions';
import LoadingView from '../../components/Skeleton/Skeleton.component';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {leadList,statusFilter} from '../../services/interface/fbLeadsInterface';
import navigation from '../../utils/translations/languages/en/navigation';
import { useNavigation } from '@react-navigation/native';

interface items {
  key: string;
  title: string;
}
const FbLeadsList = () => {
  const {
    ref,
    style,
    leads,
    theme,
    addon,
    status,
    active,
    search,
    skeleton,
    activeStatus,
    handleSearch,   
    switchStatus,
    switchScreens,
    loadMoredata,

  }= useFbLeadListScreen();
  const renderLeadStatus = (item: statusFilter) => {
    return (
      <TouchableOpacity
        onPress={() => {
          switchStatus(item.payload_key,item);

        // if (ref.current != null) { 
        //   ref.current.scrollToItem({
        //     item: item,
        //     animated: true,
        //     viewPosition: 0.5,
        //   });
        // }
        }}
        style={[
          style.statusContainer,
          activeStatus === item.payload_key
            ? {backgroundColor:     theme.colors.TEXT_COLOR}
            : {backgroundColor: theme.colors.GRAY_BORDER},
        ]}>
        <Text
          style={[
            style.statusTitle,
            activeStatus === item.payload_key
              ? {color: theme.colors.BACKGROUND}
              : {color: theme.colors.TEXT_BLACK_},
          ]}>
          {item.name === 'new'
            ? toUpper(item.name) + ' ' + `(${item.count})`
            : toUpper(item.name)}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderTabItem = (item: items) => {
    return (
      <TouchableOpacity
        onPress={() => {switchScreens(item.key)
          // if (ref.current != null) { 
          //   ref.current.scrollToItem({
          //     item: item,
          //     animated: true,
          //     viewPosition: 0.5,
          //   });
          // }
        }}
        
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderLead = (item: leadList) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(routeEnum.FBLEADSDETAILSSCREEN, {data: item});
        }}
        style={style.leadDetailsContainer}>
        <View style={style.wraper}>
          <Text numberOfLines={1} style={style.leadName}>
            {toUpper(item?.name)}
          </Text>
          {item.status_name ? (
            <View style={style.buttonContainer}>
              <StatusButton statusLabel={item.status_name} />
            </View>
          ) : null}
        </View>
        {item.phone_number ? (
          <LeadData data={'Phone'} details={item.phone_number} />
        ) : null}
        {item.email ? <LeadData data={'Email'} details={item.email} /> : null}
        {item.updatedAt ? (
          <LeadData
            data={'Last update'}
            details={getDateString(item.updatedAt)}
          />
        ) : null}
        {item.follow_up_date ? (
          <LeadData
            data={'Next follow up date'}
            details={getDateString(item.follow_up_date)}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  const EmptyListMessage = () => {
    return (
      <>
      {!skeleton.skeleton ? 
            <Text style={style.emptyText}>
           No leads to display
         </Text>
         :!active  ?
         <Text style={style.emptyText}>Cold calling - inprogress</Text>:  <LoadingView/>
       }
      
      </>
    );
  };

  try {
    

  return (
    <MenuProvider>
      <Header
       arrow
       goBack
        search
        searchText={search}
        setSearchText={handleSearch}
        img={<Image style={style.img} source={{uri: addon.logo_url}} />}
        // menu
        title={addon.name}
      />
      <View style={style.container}>
        <View style={style.headerSection}>
          <FlatList
            numColumns={3}
            contentContainerStyle={style.searchNave}
            data={leadStates}
            renderItem={({item}) => renderTabItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[active ? style.status : '']}>
          <FlatList
            horizontal
            initialScrollIndex={0}
            ref={ref}
            disableVirtualization={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.statusNav}
            data={
              active === 'status'
                ? status.status_types
                : active === 'follow_up'
                ? status.follow_up_types
                : null
            }
            // onScrollToIndexFailed={info => {
            //   const wait = new Promise(resolve => setTimeout(resolve, 700));
            //   wait.then(() => {
            //     ref.current?.scrollToIndex({index: info.index});
            //   });
            // }}
            renderItem={({item}) => renderLeadStatus(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={style.leadHeaderSection}>
      
          <FlatList
            showsVerticalScrollIndicator={false}
            data={active === '' ? [] : leads}
            renderItem={({item}) => renderLead(item)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={EmptyListMessage}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              loadMoredata();
            }}
          />
        </View> 
      </View>
    </MenuProvider>
  );
} catch (error) {
    console.warn(error)
}
};

export default FbLeadsList;