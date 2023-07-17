/**
 * OTP.Screen.tsx
 * @module OTP screen
 * @desc OTP Verification screen for login completion..
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {authenticationStyles} from './Auth.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {HeaderSection, Otp} from './Auth.component';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button/Button.component';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  LOGIN_PRECHECK_ACTION,
  VERIFY_MAIL_OTP_ACTION,
  VERIFY_MOBILE_OTP_ACTION,
} from '../../redux/actions/auth.action';
import {
  SPINNER_ACTION,
  START_SPINNER_ACTION,
} from '../../redux/actions/spinner.action';

const OTPScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const style = useThemedStyles(authenticationStyles);
  const {login_type, email, phone, country_code} = useRoute().params;
  // state for get inputed otp
  const [otp, setOtp] = useState('');
  const [optError, setOtpError] = useState('');

  //Verify otp actions.
  const verifyOTP = async () => {
    const res = await validateOtp();
    if (!res) {
      return;
    }
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'Intialising...',
        body: 'Please wait a moment',
      },
    });
    if (login_type === 'number') {
      let payload = {
        code: otp,
      };
      dispatch({type: VERIFY_MOBILE_OTP_ACTION, payload: payload});
    } else {
      let payload = {
        otp: otp,
        type: 'login',
      };
      dispatch({type: VERIFY_MAIL_OTP_ACTION, payload: payload});
    }
  };

  const validateOtp = async () => {
    if (otp.length < 6) {
      setOtpError(t('otpScreen:PLEASE_ENTER_VALID_OTP'));
      return false;
    }
    setOtpError('');
    return true;
  };

  const resendOtp = () => {
    setOtp('');
    setOtpError('');
    let payload = {
      login_type: login_type === 'number' ? 'number' : 'email',
      email: email,
      phone_number: phone,
      country_code: country_code,
    };
    dispatch({type: START_SPINNER_ACTION});
    dispatch({
      type: SPINNER_ACTION,
      title: 'Resending OTP',
    });
    dispatch({type: LOGIN_PRECHECK_ACTION, payload: payload});
  };

  return (
    <View style={style.container}>
      <View style={style.containerOne}>
        <HeaderSection
          title={
            login_type === 'number'
              ? t('otpScreen:VERIFY_NUMBER')
              : t('otpScreen:VERIFY_EMAIL')
          }
          body={
            login_type === 'number'
              ? t('otpScreen:VERIFY_BODY') + phone
              : t('otpScreen:VERIFY_BODY') + email
          }
        />
        <Otp onChangeText={(value: string) => setOtp(value)} error={optError} />
        <Pressable onPress={() => resendOtp()}>
          <Text style={style.toggleButton}>{t('otpScreen:RESEND')}</Text>
        </Pressable>
      </View>
      <View style={style.containerTwo}>
        <Button
          TextStyle={style.buttonText}
          ButtonContainer={style.button}
          ButtonText={t('otpScreen:VERIFY')}
          onPress={() => {
            verifyOTP();
          }}
        />
      </View>
    </View>
  );
};

export default OTPScreen;
