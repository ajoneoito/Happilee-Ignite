/**
 * BroadcastLog.Screen.tsx
 * @module  BroadcastLog screen
 * @desc Screen for  BroadcastLog details.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import React from 'react';
import {tab} from '../../constants/filterOptions';
import VideoPlayer from 'react-native-video-player';
import { toUpper } from '../../utils/functions/funtions';
import { ReadMoreText } from './BroadcastFilter.component';
import {useBroadcastLog} from '../../hooks/useBrodacastLog';
import Header from '../../components/Header/Header.componenet';

export interface broadcastLog {
  key: string;
  title: string;
}
export interface broadcast {
  firstName: string;
  lastName: string;
}
const BroadcastLog = () => {
  const {
    temp,
    name,
    theme,
    style,
    search,
    created,
    focused,
    activeTitle,
    thumbnailUrl,
    recipientsLog,
    handleOut,
    handleFocus,
    handleSearch,
    loadMoredata,
    switchScreens,
  } = useBroadcastLog();
  const renderTabItem = (item: broadcastLog) => {
    return (
      <TouchableOpacity
        style={[
          style.navTab,
          item.title === activeTitle ? style.titleEnable : style.title1,
        ]}
        onPress={() => {
          switchScreens(item);
        }}>
        <Text
          style={[
            style.logTitle,
            item.title === activeTitle
              ? style.activeColor
              : style.inactiveColor,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = (item: any) => {
    return (
      <View style={style.chatBox}>
        <View style={style.profileSection}>
          <Text style={style.firstL}>
            {item?.firstName?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <View style={style.nameSection}>
          <Text numberOfLines={1} style={(style.chatName, style.nameLog)}>
            {item?.firstName} {item?.lastName}
          </Text>
        </View>
      </View>
    );
  };
  const EmptyListMessage = () => {
    return (
      <Text style={style.emptyText}>
        Oops! We are sorry - No recipients found
      </Text>
    );
  };

  
  try {
  return (
    <>
      <Header
        subTitle={moment(new Date(created)).format('hh:mm, ddd MMM DD')}
        title={toUpper(name)}
        arrow
      />
      <View style={style.logConatiner}>
        <View>
          {recipientsLog?.broadcast_data?.template_body.text ||
          recipientsLog?.broadcast_data?.template_file_url ? (
            <View style={[style.textBox]}>
              {temp.length>200 ? 
               <ReadMoreText
                text={temp} 
                maxLength={100}
              />:
              <Text style={style.templateText}>{temp}</Text>
               }
              {recipientsLog?.broadcast_data?.template_header?.format ===
                'IMAGE' && recipientsLog?.broadcast_data?.template_file_url ? (
                <Image
                  style={style.image}
                  source={{
                    uri: recipientsLog?.broadcast_data?.template_file_url,
                  }}
                />
              ) : null}
              {recipientsLog?.broadcast_data?.template_header?.format ===
              'VIDEO' ? (
                <>
                  {thumbnailUrl ? (
                    <>
                      <ActivityIndicator
                        style={style.activityIndicator}
                        size="large"
                        color={theme.colors.TEXT_COLOR}
                      />
                      <VideoPlayer
                        video={{
                          uri: recipientsLog?.broadcast_data?.template_file_url,
                        }}
                        autoplay={false}
                        defaultMuted={true}
                        disableFullscreen={false}
                        thumbnail={{uri: thumbnailUrl}}
                        style={style.vedio}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
            </View>
          ) : null}
        </View>
        <View style={style.recipients}>
          <FlatList
            horizontal
            data={tab}
            renderItem={({item}) => renderTabItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={style.searchContainer}>
            <TextInput
              onFocus={() => handleFocus()}
              onBlur={() => handleOut()}
              placeholderTextColor={theme?.colors.PRIMARY}
              style={[
                style.search,
                {
                  borderColor: focused
                    ? theme.colors.TEXT_COLOR
                    : theme.colors.FIELD,
                },
              ]}
              value={search}
              onChangeText={(value: string) => {
                handleSearch(value);
              }}
              placeholder={'Search..'}
            />
          </View>
        </View>

        <View style={style.log}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipientsLog?.recipient_list}
          renderItem={({item}) => renderItem(item)}
          style={style.recipientsContainer}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListMessage}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            loadMoredata();
          }}
        />
        
        </View>
      </View>
    </>
  );
} catch (error) {
   console.warn(error) 
}
};

export default BroadcastLog;
