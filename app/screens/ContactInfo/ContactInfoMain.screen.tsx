/* eslint-disable react-hooks/exhaustive-deps */
/**
 * ContactInfoMian.Screen.tsx
 * @module Contact Information screen
 * @desc displaying contact details
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {Pressable, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import ContactInfoStyle from './ContactInfo.style';
import {
  ADD_NEW_TAG,
  GET_CANDIDATEDETAILS_ACTION,
  GET_CANDIDATE_PREDEFINED_TAGS,
} from '../../redux/actions/candidateDetails.action';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {RootState} from '../../redux/store/root.reducer';
import {goBack, navigate} from '../../navigation/useNavigationUtils';
import FooterComponent from './components/Footer.component';
import HeaderComponent from './components/Header.component';
import ProfileComponent from './components/Profile.component';
import {paramType} from '../../interface/ContactInfoInterface';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {MenuProvider} from 'react-native-popup-menu';
import {routeEnum} from '../../enums/route.enum';

const ContactInfoMainScreen = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [limit, setLimit] = useState(20);
  const candidateDetails = useSelector(
    (state: RootState) => state.candidateDetails,
  );
  const {styles} = useThemedStyles(ContactInfoStyle);
  const [tagToCreate, setTagToCreate] = useState('');
  const {id, candidateId, status} = useRoute().params as paramType;
  const canditatePreDefinedTags = useSelector(
    (state: RootState) => state.canditatePreDefinedTags.PredefinedTags,
  );
  useEffect(() => {
    dispatch({
      type: GET_CANDIDATE_PREDEFINED_TAGS,
      payload: {
        limit: limit,
        pageNumber: 1,
        tagName: undefined,
      },
    });
  }, []);
  const parameters = candidateDetails?.users;
  const onPress = (value: boolean) => {
    setEdit(value);
  };

  const loadMoreTag = () => {
    setLimit(limit + 10);
    if (canditatePreDefinedTags?.length < limit) {
      dispatch({
        type: GET_CANDIDATE_PREDEFINED_TAGS,
        payload: {
          limit: limit,
          pageNumber: 1,
          tagName: undefined,
        },
      });
    }
  };

  const addNewTag = (text: string) => {
    setTagToCreate(text);
  };

  const onPressSaveButton = () => {
    if (tagToCreate?.length) {
      dispatch({
        type: ADD_NEW_TAG,
        payload: {
          tagName: tagToCreate,
          candidateId: candidateId,
        },
      });
      setTagToCreate('');
    }
  };
  try {
    return (
      <MenuProvider>
        <View style={styles.container}>
          <HeaderComponent
            onBackPress={() => {
              goBack();
            }}
            edit={edit}
            onPress={onPress}
            onPressSaveButton={onPressSaveButton}
          />
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}>
            <ProfileComponent
              edit={edit}
              onPress={onPress}
              data={parameters}
              candidateId={candidateId}
              addNewTag={addNewTag}
              loadMoreTag={loadMoreTag}
            />
            <Pressable
              onPress={() => {
                navigate(routeEnum.PARAMETERSCREEN, {
                  params: candidateDetails.candidate_custom_parameters,
                  id: candidateId,
                });
              }}
              style={styles.sections}>
              <Text style={styles.paramText}>Parameters</Text>
              <View style={styles.bottomBorder} />
            </Pressable>
            <Pressable
              style={styles.sections}
              onPress={() => {
                // dispatch({
                //   type: GET_CANDIDATEDETAILS_ACTION,
                //   payload: {
                //     candidateId: Number.parseInt(candidateId, 10),
                //   },
                // });
                navigate(routeEnum.MEDIALISTSCREEN, {
                  files: candidateDetails?.candidate_documents,
                  name: parameters?.firstName,
                });
              }}>
              <Text style={[styles.paramText, styles.marginTop]}>
                Media and Documents
              </Text>
              <View style={styles.bottomBorder} />
            </Pressable>
            <Pressable
              style={styles.sections}
              onPress={() => {
                dispatch({
                  type: GET_CANDIDATEDETAILS_ACTION,
                  payload: {
                    candidateId: Number.parseInt(candidateId, 10),
                  },
                });
                navigate(routeEnum.NOTESECTIONSCREEN, {
                  id: candidateId,
                });
              }}>
              <Text style={[styles.paramText, styles.marginTop]}>Notes</Text>
              <View style={styles.bottomBorder} />
            </Pressable>
            <View style={styles.flex} />
            <FooterComponent
              id={id}
              candidateId={candidateId}
              status={status}
            />
          </ScrollView>
        </View>
      </MenuProvider>
    );
  } catch (error) {
    return <View />;
  }
};

export default ContactInfoMainScreen;
