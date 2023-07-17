/**
 * Login.Screen.tsx
 * @module Login screen
 * @desc Login screen contains phone number and email sign in methods.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import React, {useState} from 'react';
import {Text, View, ScrollView, Keyboard} from 'react-native';
import {authenticationStyles} from './Auth.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {
  HeaderSection,
  MobileLogin,
  EmailLogin,
  loginValidation,
} from './Auth.component';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button/Button.component';
import {LOGIN_PRECHECK_ACTION} from '../../redux/actions/auth.action';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
const LoginScreen = () => {
  const {t} = useTranslation();
  const style = useThemedStyles(authenticationStyles);
  const dispatch = useDispatch();
  // state loginMethod true for mobile login and false for email login.
  const [loginMethod, setLoginMethod] = useState(true);
  // state keep mobile number vale.
  const [mobileNumber, setMobileNumber] = useState(0);
  const [dialCode, setDialCode] = useState(91);
  // state keep email address.
  const [email, setEmail] = useState('');

  //toggle loggin method.
  const toggleLoginMethod = () => {
    setLoginMethod(!loginMethod);
  };

  const loginPrecheck = () => {
    //validate input before precheck {pending}
    let payload = {
      login_type: loginMethod === true ? 'number' : 'email',
      email: email,
      phone_number: mobileNumber,
      country_code: dialCode,
    };
    let valid = loginValidation(payload, t);
    if (valid) {
      dispatch({
        type: SPINNER_ACTION,
        payload: {
          spinning: true,
          title:
            loginMethod === true
              ? t('loginScreen:VERYFYING_NUMBER')
              : t('loginScreen:VERYFYING_EMAIL'),
          body: t('loginScreen:SENDING_OTP'),
        },
      });
      dispatch({type: LOGIN_PRECHECK_ACTION, payload: payload});
    }
  };

  const setValidEmail = (value: string) => {
    setEmail(value.toLowerCase().trim());
  };

  return (
    <View style={style.container}>
      <View style={style.containerOne}>
        <ScrollView
          style={style.scrollWidth}
          contentContainerStyle={style.scrollContainer}>
          {loginMethod === true ? (
            <HeaderSection
              title={t('loginScreen:MOBILE_HEADER')}
              body={t('loginScreen:MOBILE_BODY')}
            />
          ) : (
            <HeaderSection
              title={t('loginScreen:EMAIL_HEADER')}
              body={t('loginScreen:EMAIL_BODY')}
            />
          )}
          {loginMethod === true ? (
            <MobileLogin
              setDialCode={(code: number) => setDialCode(code)}
              setMobileNumber={(number: number) => setMobileNumber(number)}
            />
          ) : (
            <EmailLogin
              value={email}
              setEmail={(value: string) => setValidEmail(value)}
            />
          )}
          <Text style={style.orText}>Or</Text>
          <TouchableOpacity
            onPress={() => toggleLoginMethod()}
            activeOpacity={0.3}>
            <Text style={style.toggleButton}>
              {loginMethod
                ? t('loginScreen:LOGIN_WITH_EMAIL')
                : t('loginScreen:LOGIN_WITH_MOBILE')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={style.containerTwo}>
        <Button
          TextStyle={style.buttonText}
          ButtonContainer={style.button}
          ButtonText={t('loginScreen:NEXT')}
          onPress={() => {
            loginPrecheck();
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
