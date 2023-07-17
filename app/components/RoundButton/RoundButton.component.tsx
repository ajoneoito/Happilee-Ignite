/**
 * RoundButton.component.tsx
 * @module RoundButton Component
 * @desc RoundButton component to trigger a range of actions
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {C} from '../../constants';
const dgl = C.measures.dgl;
import useThemedStyles from '../../utils/theming/useThemedStyles';
import useTheme from '../../utils/theming/useTheme';

interface Props {
  child: any;
  backgroundColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  container?: ViewStyle;
}

const RoundButton = (props: Props) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={0.9}
      onPress={props.onPress}
      style={{
        ...style.container,
        ...props.container,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : theme.colors.TEXT_COLOR,
      }}>
      {props.child}
    </TouchableOpacity>
  );
};

export default RoundButton;

export const styles = () =>
  StyleSheet.create({
    container: {
      bottom: 15,
      right: 15,
      borderRadius: dgl * 0.034,
      height: dgl * 0.068,
      width: dgl * 0.068,
      position: 'absolute',
      alignItems: 'center',
      elevation: 6,
      justifyContent: 'center',
      zIndex: 10,
    },
  });
