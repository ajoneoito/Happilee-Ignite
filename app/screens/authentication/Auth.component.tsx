import React, {FC, useEffect, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {authenticationStyles} from './Auth.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {Icon} from '../../assets';
import {C} from '../../constants';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import {useTranslation} from 'react-i18next';
import InputField from '../../components/InputField/InputField.component';
import OtpInputs from 'react-native-otp-inputs';
import {Toast, ALERT_TYPE} from '../../components/AlertComponent';
import useTheme from '../../utils/theming/useTheme';
import {useNavigation} from '@react-navigation/native';
import {exitApp} from '../../navigation/useNavigationUtils';

const dgl = C.measures.dgl;

/**
 * Header section wich is used commonly in login and otp verify screen.
 * @param {string} title title for section.
 * @param {string} bosy body content for section.
 * @returns JSX component.
 */
interface HeaderProps {
  title: string;
  body: string;
}
export const HeaderSection = (props: HeaderProps) => {
  const style = useThemedStyles(authenticationStyles);
  return (
    <View style={style.headerSection}>
      <Icon width={dgl * 0.031} height={dgl * 0.031} />
      <Text style={style.headerText}>{props.title}</Text>
      <Text style={style.bodyText}>{props.body}</Text>
    </View>
  );
};

/**
 * Login fields if method is mobile number verify.
 * @param props
 * @param {void} setMobileNumber Callback funtion for mobilenumber.
 * @returns JSX Component.
 */
interface MobileLoginProps {
  setMobileNumber: (number: number) => void;
  setDialCode: (number: number) => void;
}

export const MobileLogin = (props: MobileLoginProps) => {
  const style = useThemedStyles(authenticationStyles);
  const {t} = useTranslation();
  const navigation = useNavigation();
  // states for country picker dropdown.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('IN');
  //default dial code.
  const [country, setCountry] = useState({
    name: 'India',
    dial_code: 91,
    code: 'IN',
    flag: '🇮🇳',
  });
  //state for saving mobile number
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, []);

  const handleBack = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    }
    return false;
  };

  return (
    <View style={style.loginMobileContainer}>
      <DropDown
        title={t('loginScreen:COUNTRY')}
        placeholder={t('loginScreen:S_COUNTRY')}
        open={open}
        value={value}
        items={C.flags}
        schema={{
          label: 'name', // required
          value: 'code',
        }}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(item: any) => {
          setCountry(item);
          props.setDialCode(item?.dial_code);
        }}
      />
      <View style={style.mobileInputContainer}>
        <View style={style.dialContainer}>
          <Text style={style.dialCode}>
            {country?.flag + '+' + country?.dial_code}
          </Text>
        </View>
        <InputField
          width="75%"
          headerText={t('loginScreen:NUMBER')}
          placeholder={t('loginScreen:MOBILE_PLACE')}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(number: string) => {
            setPhone(number);
            props.setMobileNumber(parseInt(number, 10));
          }}
        />
      </View>
    </View>
  );
};

/**
 * Login fields if method is email ID verify.
 * @param props
 * @param {void} setEmail Callback funtion for email.
 * @returns JSX Component.
 */

interface EmailLoginProps {
  value: string;
  setEmail: (email: string) => void;
}
export const EmailLogin = (props: EmailLoginProps) => {
  const [email, setEmail] = useState('');
  const {t} = useTranslation();
  //state for saving email id
  return (
    <InputField
      width="90%"
      placeholder={t('loginScreen:EMAIL_ID')}
      headerText={t('loginScreen:EMAIL')}
      keyboardType="email-address"
      value={email}
      onChangeText={(value: string) => {
        setEmail(value);
        props.setEmail(value);
      }}
    />
  );
};

/**
 * OTP input fields.
 * @param props
 * @param {void} onChangeText Callback funtion for input otp.
 * @param {string} error Error messages on otp input.
 * @returns JSX Component.
 */

interface Props {
  error: string;
  onChangeText: (e: string) => void;
}

export const Otp: FC<Props> = ({onChangeText, error}) => {
  const style = useThemedStyles(authenticationStyles);
  const theme = useTheme();
  const color = error ? theme.colors.ERROR : theme.colors.TEXT_COLOR;
  const numberOfInputs = 6;

  return (
    <View style={style.otpContainer}>
      <OtpInputs
        autofillFromClipboard
        numberOfInputs={numberOfInputs}
        style={style.content}
        inputContainerStyles={style.box}
        inputStyles={[style.text, {color: color}]}
        focusStyles={[style.focus, {borderColor: color}]}
        handleChange={onChangeText}
      />
      {error && (
        <View style={style.content}>
          <Text style={style.errorStyle}>{error}</Text>
        </View>
      )}
    </View>
  );
};

/**
 * Login form validation.
 * @param props
 * @param {string} method Login method - 'email' or 'number'.
 * @param {string} email Entered email address.
 * @param {number} phone Phone number ented.
 * @param {number} country_code Country code selected.
 * @returns {boolean} true for no error and false for error.
 */

interface validationProps {
  login_type: string;
  email: string;
  phone_number: number;
  country_code: number;
}
export const loginValidation = (props: validationProps, t: any) => {
  if (props.login_type === 'email') {
    if (props.email.length) {
      let valid = emailValidation(props.email);
      if (!valid) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: t('loginScreen:TOAST_ERROR_TITLE'),
          textBody: t('loginScreen:INVALID_EMAIL_ADDRESS'),
        });
      }
      return valid;
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t('loginScreen:TOAST_ERROR_TITLE'),
        textBody: t('loginScreen:ENTER_YOUR_EMAIL_ADDRESS'),
      });
      return false;
    }
  } else {
    if (props.phone_number !== 0) {
      let valid = phoneNumberValidation(props.phone_number);
      if (!valid) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: t('loginScreen:TOAST_ERROR_TITLE'),
          textBody: t('loginScreen:ENTER_A_VALID_MOBILE_NUMBER'),
        });
      }
      return valid;
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t('loginScreen:TOAST_ERROR_TITLE'),
        textBody: t('loginScreen:ENTER_YOUR_MOBILE_NUMBER'),
      });
      return false;
    }
  }
};

const phoneNumberValidation = (phoneNumber: number) => {
  let phone = phoneNumber.toString();
  var phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  var digits = phone?.replace(/\D/g, '');
  let t = phoneRe.test(digits);
  return t;
};

const emailValidation = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
