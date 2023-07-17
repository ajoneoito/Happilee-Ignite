/**
 * Template.Screen.tsx
 * @module Template screen
 * @desc Screen for sending template.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';
import {RightArrow} from '../../assets';
import {routeEnum} from '../../enums/route.enum';
import {TemplateList} from './Template.component';
import { useTemplete } from '../../hooks/templeteScreen';
import {navigate} from '../../navigation/useNavigationUtils';
import Header from '../../components/Header/Header.componenet';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import {templateListInterface} from '../../services/interface/templateInterfaces';
import {TEMPLATE_LIST_FILTER_ACTION} from '../../redux/actions/templates.action';
const Template = () => {
  const {
    num,
    key,
    data,
    style,
    theme,
    active,
    templete,
    dispatch,
    handleData,
  } = useTemplete();

  try {
  return (
    <>
      <Header arrow title={t('template:HEADER')} />
      <View style={style.TemplateContainer}>
        <View style={style.mainWrap}>
          <TemplateList
            onClickItem={(item: templateListInterface | null) => {
              handleData(item)
            }}
            data={templete}
          />
          <RoundButton
            disabled={active ? false : true}
            backgroundColor={
              active ? theme.colors.TEXT_COLOR : theme.colors.DISABLE_COLOR
            }
            onPress={() => {
              dispatch({type: TEMPLATE_LIST_FILTER_ACTION, payload: data});
              navigate(routeEnum.TEMPLATEPARAMSCREEN, {
                num: num,
                key: key,
                text: data,
              });
            }}
            child={<RightArrow />}
          />
        </View>
      </View>
    </>
  );
} catch (error) {
    
}
};

export default Template;
