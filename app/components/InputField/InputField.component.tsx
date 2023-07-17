/* eslint-disable react-native/no-inline-styles */
/**
 * InputField.tsx
 * @module Input field component.
 * @desc Component for text input.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * @todo Need to add error hadler
 * ...
 */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';
import {C} from '../../constants';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import useTheme from '../../utils/theming/useTheme';
import {Edit} from '../../assets';
import { Theme } from '../../services/interface/themeInterface';
const dgl = C.measures.dgl;
interface Props {
  placeholder?: string | any;
  title?: TextStyle;
  headerText?: string | any;
  keyboardType?: KeyboardTypeOptions | string;
  autoComplete?: 'sms-otp' | undefined;
  width?: string | number;
  value?: string | boolean | undefined;
  onChangeText?: any;
  edit?: boolean;
  active?: boolean;
  key?: string;
  inputStyle?: ViewStyle;
  editable?: boolean;
  contentContainerStyle?: ViewStyle | undefined;
  placeholderTextColor?: string | undefined;
  conatiner?: ViewStyle;
  svg?: any;
  focus?: (item: boolean | undefined) => void | null;
}

const InputField = (props: Props) => {
  const style = useThemedStyles(styles);
  const theme = useTheme() as Theme;
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        style.conatiner,
        props.conatiner,
        {
          width: props.width,
          borderColor: focused ? theme.colors.TEXT_COLOR : theme.colors.FIELD,
        },
        props?.contentContainerStyle ? props?.contentContainerStyle : undefined,
      ]}>
      {props.active ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {focused ? (
            <Text numberOfLines={1} style={[style.title, props.title]}>
              {props.headerText}
            </Text>
          ) : (
            <View style={{paddingVertical: dgl * 0.007}} />
          )}
        </View>
      ) : (
        <Text style={[style.title, props.title]}>{props.headerText}</Text>
      )}
      <View style={props.edit ? style.edit : null}>
        <TextInput
          key={props.key}
          placeholder={props.edit && focused ? null : props.placeholder}
          style={[style.input, props.edit ? {flex: 1} : {}, props.inputStyle]}
          keyboardType={props.keyboardType}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : theme?.colors.PRIMARY
          }
          autoCorrect
          autoComplete={props.autoComplete}
          value={props.value}
          onChangeText={(value: string) => props.onChangeText(value)}
          onFocus={() => {
            setFocused(true), props.focus && props.focus(true);
          }}
          onBlur={() => {
            setFocused(false), props.focus && props.focus(false);
          }}
        />
        {props.edit && !focused ? props.svg : null}
      </View>
    </View>
  );
};

export default InputField;

export const styles = (theme: any) =>
  StyleSheet.create({
    conatiner: {
      width: '100%',
      height: dgl * 0.065,
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: dgl * 0.008,
      paddingHorizontal: dgl * 0.016,
      backgroundColor: theme.colors.FIELD,
    },
    input: {
      justifyContent: 'center',
      backgroundColor: theme.colors.FIELD,
      color: theme.colors.PRIMARY,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
      padding: 0,
      height: dgl * 0.027,
    },
    title: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.012,
    },
    edit: {flexDirection: 'row', justifyContent: 'space-between'},
  });
