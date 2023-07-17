/**
 * Button.component.tsx
 * @module Button Component
 * @desc Button component to trigger a range of actions
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {C} from '../../constants';
import useThemedStyles from '../../utils/theming/useThemedStyles';
const dgl = C.measures.dgl;

interface Props {
  // Button container for  style the entire button container
  ButtonContainer?: ViewStyle;
  // Text that to be write inside as button text
  ButtonText?: string | null;
  // Style the text inside the button
  TextStyle?: TextStyle;
  //Button press function
  onPress?: () => void;
  icon?: any;
  iconPress?: () => void;
  active?: boolean;
}

const Button = (props: Props) => {
  const style = useThemedStyles(styles);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={[
        style.Container,
        props.ButtonContainer,
        props.active ? {flexDirection: 'row'} : {flexDirection: 'column'},
      ]}>
      <Text style={[style.buttonLabel, props.TextStyle]}>
        {props.ButtonText}
      </Text>
      {props.active === true ? (
        <TouchableOpacity style={style.icon} onPress={props.iconPress}>
          {props.icon}
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;

export const styles = (theme: any) =>
  StyleSheet.create({
    Container: {
      width: '90%',
      borderRadius: dgl * 0.03,
      padding: dgl * 0.015,
      backgroundColor: theme.colors.TEXT_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      // flexDirection: 'row',
    },
    buttonLabel: {
      alignSelf: 'center',
      padding: 0,
      fontFamily: C.font.Regular,
      color: theme.colors.BACKGROUND,
      textAlign: 'center',
    },
    icon: {
      paddingHorizontal: dgl * 0.01,
      alignSelf: 'center',
    },
  });
