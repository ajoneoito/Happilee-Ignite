/* eslint-disable react-native/no-inline-styles */
import {View, Animated} from 'react-native';
import React from 'react';
import ProgressBarHook from '../../../hooks/useProgressBarHook';
import {ProgressBarStyles} from '../ProgressBarStyles';
import {ProgressBarProps} from '../../../interfaces/progressBar.interface';
import LinearPrgressBarStylesHook from '../../../hooks/styleHooks/ProgressbarStylesHook/useLinearPrgressBarStylesHook';

const LinearProgressBar = ({
  contentContainerStyle,
  isPercentage,
  textStyle,
  height,
  max,
  value,
  type,
  inactiveBackgroundColor,
  activeBackgroundColor,
}: ProgressBarProps) => {
  const {AnimatedInput, animatedValue, width, textRef, updateWidth} =
    ProgressBarHook(
      30,
      5,
      500,
      100,
      isPercentage ? isPercentage : false,
      max ? max : 100,
      value ? value : 50,
      height ? height : 20,
      type ? type : '',
    );
  const {styles} = LinearPrgressBarStylesHook(
    height,
    width,
    animatedValue,
    inactiveBackgroundColor,
    activeBackgroundColor,
  );
  return (
    <View style={[{width: '100%'}, contentContainerStyle]}>
      {isPercentage ? (
        <AnimatedInput
          editable={false}
          ref={textRef}
          defaultValue={`0${isPercentage ? '%' : ''}`}
          style={[ProgressBarStyles.animatedText2, textStyle, styles.left]}
        />
      ) : (
        <AnimatedInput
          editable={false}
          ref={textRef}
          defaultValue={`0/${max}`}
          style={[ProgressBarStyles.textStyle, textStyle]}
        />
      )}
      <View
        onLayout={event => {
          const newWidth = event.nativeEvent.layout.width;
          updateWidth(newWidth);
        }}
        style={[styles.fixedView]}>
        <Animated.View
          style={[styles.animatedView, ProgressBarStyles.absoluteView]}
        />
      </View>
    </View>
  );
};

export default LinearProgressBar;
