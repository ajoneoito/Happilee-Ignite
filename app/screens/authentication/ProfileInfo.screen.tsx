/**
 * ProfileInfo.screen.tsx
 * @module Prfile Update screen
 * @desc Profile info screen to update operator profile info.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {View} from 'react-native';
import {C} from '../../constants';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderSection} from './Auth.component';
import {authenticationStyles} from './Auth.style';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {RootState} from '../../redux/store/root.reducer';
import Button from '../../components/Button/Button.component';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import InputField from '../../components/InputField/InputField.component';
import {OPERATOR_UPDATE_INFO_ACTION} from '../../redux/actions/auth.action';

const dgl = C.measures.dgl;

const ProfileInfo = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const style = useThemedStyles(authenticationStyles);
  const auth = useSelector((state: RootState) => state.auth);
  // state to update operator's first name
  const [firstName, setFirstName] = useState(auth?.first_name);
  // state to update operator's last name
  const [lastName, setLastName] = useState(auth?.last_name);
  // state to update operator's email id
  const [email, setEmail] = useState(auth?.email);

  // updating new added changes
  const handleChanges = () => {
    let payload = {
      operator_id: auth.operator_id,
      first_name: firstName,
      last_name: lastName,
    };
    dispatch({type: OPERATOR_UPDATE_INFO_ACTION, payload: payload});
  };

  return (
    <View style={style.container}>
      <View style={style.containerOne}>
        <ScrollView
          style={style.scrollWidth}
          contentContainerStyle={style.scrollContainer}>
          <HeaderSection
            body={t('profileUpdate:PROFILE_HEADER')}
            title={t('profileUpdate:PROFILE_INFO')}
          />
          <View style={style.info}>
            <View style={style.input}>
              <InputField
                headerText={t('profileUpdate:FIRST_NAME')}
                placeholder={t('profileUpdate:FIRST_NAME')}
                onChangeText={(name: string) => {
                  setFirstName(name);
                }}
                value={firstName}
                width={dgl * 0.4}
              />
            </View>
            <View style={style.bottomBox}>
              <InputField
                headerText={t('profileUpdate:LAST_NAME')}
                onChangeText={(name: string) => {
                  setLastName(name);
                }}
                value={lastName}
                placeholder={t('profileUpdate:LAST_NAME')}
                width={dgl * 0.4}
              />
            </View>
            <View>
              <InputField
                onChangeText={(name: string) => {
                  setEmail(name);
                }}
                headerText={t('profileUpdate:EMAIL')}
                value={email}
                placeholder={t('profileUpdate:EMAIL_ID')}
                width={dgl * 0.4}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={style.containerTwo}>
        <Button
          TextStyle={style.buttonText}
          ButtonContainer={style.button}
          ButtonText={t('loginScreen:NEXT')}
          onPress={() => {
            handleChanges();
          }}
        />
      </View>
    </View>
  );
};

export default ProfileInfo;
