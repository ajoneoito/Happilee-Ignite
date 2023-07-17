import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {ProgressBarProps} from '../../../interface/progressBar.interface';
import Svg, {Circle, Defs, G, LinearGradient, Stop} from 'react-native-svg';
import ProgressBarHook from '../../../hooks/ChatBoxHooks/useProgressBarHook';
import CircularPrgressBarStylesHook from '../../../hooks/ChatBoxHooks/useCircularProgressBarStylesHook';

const CircularProgressBar = ({
  contentContainerStyle,
  radius,
  color,
  strokeWidth,
  isPercentage,
  indicator,
  type,
  value,
  max,
  duration,
  delay,
  gradientColors,
}: ProgressBarProps) => {
  const {
    AnimatedCircle,
    halfCircle,
    circleCircumference,
    circleRef,
    showIndicator,
  } = ProgressBarHook(
    radius ? radius : 40,
    strokeWidth ? strokeWidth : 2,
    duration ? duration : 500,
    delay ? delay : 100,
    isPercentage ? isPercentage : false,
    max ? max : 100,
    value ? value : 50,
    // height ? height : 5,
    // type ? type : '',
  );

  const {styles} = CircularPrgressBarStylesHook(radius);
  const COLORS = gradientColors || ['#212121', '#ededed'];
  const stroke = type === 'gradient' ? 'url(#grad)' : color || '#000';

  return (
    <View style={[styles.circleMainView, contentContainerStyle]}>
      {showIndicator ? (
        <ActivityIndicator
          size={indicator ? `${indicator}` : 'large'}
          color="#199CD9"
          style={styles.marginTop}
        />
      ) : (
        <Svg viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              cx="50%"
              cy="50%"
              stroke={stroke}
              strokeWidth={strokeWidth || 2}
              r={radius || 10}
              fill="transparent"
              strokeOpacity={0.1}
            />
            <AnimatedCircle
              ref={circleRef}
              cx="50%"
              cy="50%"
              stroke={stroke}
              strokeWidth={strokeWidth || 2}
              r={radius || 10}
              fill="transparent"
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference}
              strokeLinecap="round"
            />
          </G>
          {type === 'gradient' && (
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="1" stopColor={COLORS[0]} />
                <Stop offset="0.1" stopColor={COLORS[1]} />
              </LinearGradient>
            </Defs>
          )}
        </Svg>
      )}
    </View>
  );
};

export default CircularProgressBar;
