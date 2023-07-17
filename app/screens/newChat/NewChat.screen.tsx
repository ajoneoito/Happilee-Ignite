/**
 * New chat.Screen.tsx
 * @module NewChat screen
 * @desc Screen for New chat.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {NewChatStyle} from './NewChat.style';
import InputField from '../../components/InputField/InputField.component';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import {C} from '../../constants';
import {WhiteTickIcon} from '../../assets';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header/Header.componenet';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import useTheme from '../../utils/theming/useTheme';
import {useDispatch, useSelector} from 'react-redux';
import {TemplateList} from '../templates/Template.component';
import {TEMPLATE_LIST_FILTER_ACTION} from '../../redux/actions/templates.action';
import {routeEnum} from '../../enums/route.enum';
import {templateListInterface} from '../../services/interface/templateInterfaces';
import {RootState} from '../../redux/store/root.reducer';
import { useRoute } from '@react-navigation/native';
const NewChatScreen = ({navigation, route}) => {
  // Theme switching,access the currently active theme
  const style = useThemedStyles(NewChatStyle);
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const num = route?.params?.num;
  // const abc = useRoute().
  const { whatsappNumber } = useRoute().params;
  // states for country picker dropdown.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('IN');
  const [active, setActive] = useState(false);
  const [data, setData] = useState<templateListInterface | null>();
  //default dial code.
  const [country, setCountry] = useState({
    name: 'India',
    dial_code: 91,
    code: 'IN',
    flag: '🇮🇳',
  });
  //state for saving mobile number
  const [phone, setPhone] = useState(whatsappNumber ? whatsappNumber :'');
  const templetes = useSelector((state: RootState) => state.templates);
  useEffect(() => {
    //prefill number if its passed;
    if (num) {
      let code = num.substring(0, 2);
      let pNumber = num.substring(2);
      setPhone(pNumber);
      //search and find country useing country code
      const item = C.flags.find(({dial_code}) => dial_code === Number(code));
      setCountry(item);
    }
  }, []);
  return (
    <>
      <Header arrow title={'New Chat'} />
      <View style={style.container}>
        <View style={style.body}>
          <Text style={style.heading}>{t('newChat:CONTACT_DETAILS')}</Text>

          <View style={style.paddedView}>
            <DropDown
              title={t('newChat:COUNTRY')}
              placeholder={t('newChat:COUNTRY')}
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
              }}
            />
          </View>
          <View style={style.mobileInputContainer}>
            <View style={style.dialContainer}>
              <Text style={style.dialCode}>
                {country?.flag + '+' + country?.dial_code}
              </Text>
            </View>
            <InputField
              width="75%"
              headerText={t('newChat:NUMBER')}
              placeholder={t('newChat:NUMBER')}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(number: string) => {
                setPhone(parseInt(number, 10));
              }}
            />
          </View>

          <View style={style.paddedView}>
            <Text style={style.heading}>{t('newChat:CHOOSE_TEMPLATE')}</Text>
          </View>
          <TemplateList
            onClickItem={(item: templateListInterface | null) => {
              if (item) {
                setActive(true);
              } else if (item === null) {
                setActive(false);
              }
              setData(item);
              
            }}
            data={templetes}
          />
        </View>

        <RoundButton
          disabled={active && phone ? false : true}
          backgroundColor={
            active && phone
              ? theme.colors.TEXT_COLOR
              : theme.colors.DISABLE_COLOR
          }
          onPress={() => {
            dispatch({type: TEMPLATE_LIST_FILTER_ACTION, payload: data});
            navigation.navigate(routeEnum.TEMPLATEPARAMSCREEN, {
              num: '' + country?.dial_code + phone,
            });
          }}
          child={<WhiteTickIcon />}
        />
      </View>
    </>
  );
};

export default NewChatScreen;
