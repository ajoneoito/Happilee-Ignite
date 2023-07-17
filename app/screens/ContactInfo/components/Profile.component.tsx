/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import ContactInfoStyle from '../ContactInfo.style';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {
  DELETE_TAG,
  ADD_NEW_TAG,
} from '../../../redux/actions/candidateDetails.action';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {RootState} from '../../../redux/store/root.reducer';
import {View, Text, Pressable, TextInput} from 'react-native';
import {ALERT_TYPE, Toast} from '../../../components/AlertComponent';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {BlackCloseIcon, CirclePlus, GreyCloseIcon} from '../../../assets';
import {contactInfoProfile} from '../../../interface/ContactInfoInterface';

const ProfileComponent = (props: contactInfoProfile) => {
  const {edit, onPress, data, candidateId, addNewTag, loadMoreTag} = props;

  const canditatePreDefinedTags = useSelector(
    (state: RootState) => state.canditatePreDefinedTags.PredefinedTags,
  );
  const canditateSelectedTags = useSelector(
    (state: RootState) => state.candidateSelectedTags.PredefinedTags,
  );

  const dispatch = useDispatch();
  const {styles} = useThemedStyles(ContactInfoStyle);
  const [filterData, setfilterData] = useState(canditatePreDefinedTags);
  const [searchItem, setsearchItem] = useState('');

  const searchFilterFunction = (text: string) => {
    const newData = canditatePreDefinedTags?.filter(item => {
      if (
        item?.tagName !== '' &&
        item?.tagName !== null &&
        item?.tagName !== undefined
      ) {
        const itemData = `${item?.tagName.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    });
    setfilterData([...newData]);
    if (!filterData?.length && text) {
      addNewTag(text);
    }
    setsearchItem(text);
  };

  return (
    <>
      <View style={styles.dpView}>
        <Text style={styles.dpText}>
          {data?.firstName?.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.userName}>{data?.firstName}</Text>
      <Text style={styles.contactNumber}>
        {data?.phoneNumber && `+${data?.phoneNumber}`}
      </Text>
      {data?.candidates[0]?.is_subscribed ? (
        <Text
          style={[
            styles.status,
            {backgroundColor: '#E8F3EC', color: '#22863A'},
          ]}>
          Subscribed
        </Text>
      ) : (
        <Text
          style={[styles.status, {backgroundColor: '#C74940', color: '#fff'}]}>
          Unsubscribed
        </Text>
      )}
      <View style={styles.rowDirection}>
        <View
          style={[
            edit
              ? styles.qualificationMainViewEditTrue
              : styles.qualificationMainViewEditFalse,
            styles.qualificationMainView,
          ]}>
          <View style={[styles.wrapperView]}>
            {canditateSelectedTags?.map(item => {
              return (
                <View
                  style={[
                    styles.qualificationView,
                    edit ? styles.editTrue : styles.editFalse,
                  ]}>
                  <Text style={styles.qualificationText}>{item.tagName}</Text>
                  {edit ? (
                    <BlackCloseIcon
                      onPress={() => {
                        dispatch({
                          type: DELETE_TAG,
                          payload: {
                            predefinedTagId: item.id,
                            candidateId: candidateId,
                          },
                        });
                      }}
                    />
                  ) : (
                    <GreyCloseIcon
                      onPress={() => {
                        dispatch({
                          type: DELETE_TAG,
                          payload: {
                            predefinedTagId: item.id,
                            candidateId: candidateId,
                          },
                        });
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
          {edit && (
            <TextInput
              style={styles.searchInput}
              value={searchItem}
              onChangeText={text => {
                searchFilterFunction(text);
              }}
            />
          )}
        </View>
        {!edit && (
          <CirclePlus
            onPress={() => {
              onPress(true);
              setsearchItem('');
            }}
            style={[
              styles.qualificationView,
              {alignSelf: 'flex-start', marginTop: 22},
            ]}
          />
        )}
      </View>
      {edit && (
        <Animated.View entering={FadeInUp} style={styles.dropdown}>
          <FlatList
            data={filterData}
            nestedScrollEnabled={true}
            extraData={setfilterData}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              loadMoreTag();
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    if (canditateSelectedTags.length < 4) {
                      dispatch({
                        type: ADD_NEW_TAG,
                        payload: {
                          tagName: item.tagName,
                          candidateId: candidateId,
                        },
                      });
                      searchFilterFunction('');
                      setsearchItem('');
                    } else {
                      Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Tag limit is Four',
                      });
                    }
                  }}>
                  <Text key={index}>{item.tagName}</Text>
                </Pressable>
              );
            }}
          />
        </Animated.View>
      )}
    </>
  );
};

export default ProfileComponent;
