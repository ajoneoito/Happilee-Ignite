/**
 * Addcontact.Screen.tsx
 * @module Addcontact screen
 * @desc Screen for Add contactlisting.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Pressable} from 'react-native';
import {AddContactStyle} from './AddContact.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import InputField from '../../components/InputField/InputField.component';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import {C} from '../../constants';
import {parametersInterface} from '../../services/interface/contactInterface';
import {DeleteIcon} from '../../assets';
import {WhiteTickIcon} from '../../assets';
import {AddIcon} from '../../assets';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header/Header.componenet';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import useTheme from '../../utils/theming/useTheme';
import {useDispatch, useSelector} from 'react-redux';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';

import {
  FETCH_TAGS_ACTION,
  UPDATE_TAG_LIST_FILTER,
} from '../../redux/actions/tagList.action';
import {ADD_CONTACT_ACTION} from '../../redux/actions/contactList.action';
const AddContactScreen = ({}) => {
  // Theme switching,access the currently active theme
  const style = useThemedStyles(AddContactStyle);
  const [name, setName] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const {tagListQuery, tagList} = useSelector(state => state);
  const {t} = useTranslation();
  // states for country picker dropdown.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('IN');
  const [tagOpen, setTagOpen] = useState(false);
  const [tagValue, setTagValue] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //const [tagItems, setTagItems] = useState([])
  //default dial code.
  const [country, setCountry] = useState({
    name: 'India',
    dial_code: 91,
    code: 'IN',
    flag: '🇮🇳',
  });
  //state for saving mobile number
  const [phone, setPhone] = useState();
  const [parameter, setParameter] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  const [items, setItems] = useState([]);
  const [parameters, setParameters] = useState<parametersInterface[]>([]);
  useEffect(() => {
    dispatch({type: FETCH_TAGS_ACTION, payload: tagListQuery});
  }, [tagListQuery]);
  useEffect(() => {
    setItems(tagList);
  }, [tagList]);
  useEffect(() => {
    dispatch({type: UPDATE_TAG_LIST_FILTER, payload: {tagName: searchTerm}});
  }, [searchTerm]);
  const addParameter = () => {
    if (parameter && parameterValue) {
      setParameters(oldArry => [
        ...oldArry,
        {name: parameter, value: parameterValue},
      ]);
      setParameter('');
      setParameterValue('');
    }
  };
  const deleteParameter = param => {
    setParameters(state => state.filter(item => item.name !== param.name));
  };
  const onSave = () => {
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: t('addContact:SAVING'),
        body: t('addContact:ADDING_NEW_CONTACT_BODY'),
      },
    });
    dispatch({
      type: ADD_CONTACT_ACTION,
      payload: {
        parameters: parameters,
        tags: tagValue,
        name: name,
        phone_number: '' + phone,
        country_code: '' + country?.dial_code,
      },
    });
  };
  return (
    <>
      <Header arrow title={'Add Contact'} />
      <View style={style.container}>
        <ScrollView contentContainerStyle={style.scroll}>
          <View style={style.body}>
            <Text style={style.heading}>{t('addContact:CONTACT_DETAILS')}</Text>
            <View style={style.paddedView}>
              <InputField
                headerText={t('addContact:NAME')}
                placeholder={t('addContact:ENTER_NAME')}
                onChangeText={(txt: string) => {
                  setName(txt);
                }}
                value={name}
                width={'100%'}
              />
            </View>

            <View style={style.paddedView}>
              <DropDown
                title={t('addContact:COUNTRY')}
                placeholder={t('addContact:COUNTRY')}
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
                headerText={t('addContact:NUMBER')}
                placeholder={t('addContact:NUMBER')}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(number: string) => {
                  setPhone(parseInt(number, 10));
                }}
              />
            </View>

            <View style={style.paddedView}>
              <DropDown
                title={t('addContact:TAGS')}
                placeholder={t('addContact:ADD_TAGS')}
                open={tagOpen}
                value={tagValue}
                items={items}
                setItems={setItems}
                schema={{
                  label: 'tagName', // required
                  value: 'id',
                }}
                multiple={true}
                setOpen={setTagOpen}
                setValue={setTagValue}
                mode="BADGE"
                onChangeSearchText={data => {
                  // console.log('search change', data);
                  setSearchTerm(data);
                }}
                badgeDotColors={[
                  '#e76f51',
                  '#00b4d8',
                  '#e9c46a',
                  '#e76f51',
                  '#8ac926',
                  '#00b4d8',
                  '#e9c46a',
                ]}
                //onChangeItem={item => setTagValue(item)}
              />
            </View>
            <View style={style.paddedView}>
              <Text style={style.heading}>
                {t('addContact:ADD_PARAMETERS')}
              </Text>
            </View>
            <View style={style.paddedView}>
              <InputField
                headerText={t('addContact:PARAMETER')}
                placeholder={t('addContact:ADD_PARAMETER')}
                onChangeText={(txt: string) => {
                  setParameter(txt);
                }}
                value={parameter}
                width={'100%'}
              />
            </View>

            <View style={style.paddedView}>
              <InputField
                headerText={t('addContact:VALUE')}
                placeholder={t('addContact:VALUE')}
                onChangeText={(txt: string) => {
                  setParameterValue(txt);
                }}
                value={parameterValue}
                width={'100%'}
              />
            </View>
            <Pressable
              style={style.addButtonView}
              onPress={() => {
                addParameter();
              }}>
              <AddIcon />
              <Text style={[style.heading, style.addheading]}>
                {t('addContact:ADD')}
              </Text>
            </Pressable>
            {parameters.map((item, index) => {
              return (
                <View style={style.parameters} key={index}>
                  <InputField
                    placeholder={t('addContact:ADD_PARAMETER')}
                    onChangeText={(txt: string) => {
                      setParameter(txt);
                    }}
                    value={item.name}
                    width={'45%'}
                    editable={false}
                  />

                  <InputField
                    placeholder={t('addContact:VALUE')}
                    onChangeText={(pValue: string) => {
                      setParameterValue(pValue);
                    }}
                    value={item.value}
                    width={'45%'}
                    editable={false}
                  />
                  <Pressable
                    onPress={() => {
                      deleteParameter(item);
                    }}>
                    <DeleteIcon style={{width: '1.4%'}} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <RoundButton
          backgroundColor={theme.colors.TEXT_COLOR}
          onPress={() => onSave()}
          child={<WhiteTickIcon />}
        />
      </View>
    </>
  );
};

export default AddContactScreen;
