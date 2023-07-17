import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FBLeadsProfileStyle} from './FBLeadsProfile.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {C} from '../../constants';
import InputField from '../../components/InputField/InputField.component';
import Header from '../../components/Header/Header.componenet';
import {MenuProvider} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import DropDown from '../../components/DropdownPicker/drodpDown.component';

const FBLeadsProfile = () => {
  const styles = useThemedStyles(FBLeadsProfileStyle);

  const auth = useSelector((state: RootState) => state.auth);
  const [firstName, setFirstName] = useState(auth?.first_name);
  const [lastName, setLastName] = useState(auth?.last_name);
  const [email, setEmail] = useState(auth?.email);
  const [number, setNumber] = useState(auth?.phone);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('IN');
  //default dial code.
  const [country, setCountry] = useState({
    name: 'India',
    dial_code: 91,
    code: 'IN',
    flag: '🇮🇳',
  });

  const handleFirstName = (text: string) => {
    setFirstName(text);
  };
  const handleLastName = (text: string) => {
    setLastName(text);
  };
  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handleNumber = (text: string) => {
    setNumber(text);
  };
  return (
    <MenuProvider style={styles.mainView}>
      <Header arrow title={'Edit Profile'} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.flexGrow}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerView}>
          <View style={styles.profilePic}>
            <Text style={styles.profilePicText}>F</Text>
          </View>
          <Text style={[styles.textStyle, styles.profile]}>
            Add profile image
          </Text>
          <InputField
            conatiner={styles.inputContainer}
            width="100%"
            headerText={'First Name'}
            placeholder={'First Name'}
            value={firstName}
            onChangeText={(text: string) => {
              handleFirstName(text);
            }}
          />
          <InputField
            headerText={'Last Name'}
            conatiner={styles.inputContainer}
            width="100%"
            placeholder={'Last Name'}
            value={lastName}
            onChangeText={(text: string) => {
              handleLastName(text);
            }}
            inputStyle={styles.inputStyle}
          />
          <InputField
            headerText={'Email'}
            conatiner={styles.inputContainer}
            width="100%"
            placeholder={'mail@domain.com'}
            value={email}
            onChangeText={(text: string) => {
              handleEmail(text);
            }}
            inputStyle={styles.inputStyle}
          />
          <Text
            style={[styles.textStyle, styles.inputTextStyle]}
            onPress={() => {
              // setModalType('Email');
              // setIsVisible(true);
            }}>
            Change Email ID
          </Text>

          <View style={styles.mobileInputContainer}>
            <View style={styles.dialContainer}>
              <DropDown
                // title={t('loginScreen:COUNTRY')}
                // placeholder={t('loginScreen:S_COUNTRY')}
                open={open}
                value={value}
                items={C.flags}
                schema={{
                  label: open ? 'name' : 'label', // required
                  value: 'code',
                }}
                setOpen={setOpen}
                setValue={setValue}
                onSelectItem={(item: any) => {
                  setCountry(item.flag);
                }}
              />
            </View>
            <InputField
              width="63%"
              placeholder={'phone number'}
              keyboardType="phone-pad"
              value={number}
              onChangeText={(text: string) => {
                handleNumber(text);
              }}
              inputStyle={styles.inputStyle}
            />
          </View>
          <Text
            style={[styles.textStyle, styles.inputTextStyle]}
            onPress={() => {}}>
            Change Email Mobile Number
          </Text>
        </View>
        <View style={styles.flex} />
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>SAVE CHANGES</Text>
        </View>
        {/* <ChangeEmailModal
          isVisible={isVisible}
          onBackdropPress={onBackdropPress}
          type={modalType}
        /> */}
      </ScrollView>
    </MenuProvider>
  );
};

export default FBLeadsProfile;
