/**
 * Addons.Screen.tsx
 * @module Addons screen
 * @desc Screen for listing addons.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import { useAddonsScreen } from '../../hooks/addonScreen';
import Header from '../../components/Header/Header.componenet';
import {addonsList} from '../../services/interface/fbLeadsInterface';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
const AddonsScreen = () => {
  const {
    style,
    search,
    addonList,
    searchData,
    handleClick,
  }=useAddonsScreen();

  const EmptyListMessage = () => {
    return (
      <Text style={style.emptyText}>Oops! We are sorry - No results found</Text>
    );
  };
  const renderItem = (item: addonsList) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            handleClick(item);
          }}
          style={style.listItems}>
          <Image style={style.image} source={{uri: item.logo_url}} />

          <Text style={style.name}>{item.name}</Text>
        </TouchableOpacity>
        <View style={style.singleLine} />
      </>
    );
  };
  try {
    
 
  return (
    <>
      <Header
        arrow
        search
        searchText={search}
        setSearchText={searchData}
        title={'Add-ons'}
      />
      <View style={style.conatiner}>
        <View style={style.mainWrapper}>
          <FlatList
            data={addonList}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </View>
    </>
  );
} catch (error) {
    
}
};

export default AddonsScreen;
