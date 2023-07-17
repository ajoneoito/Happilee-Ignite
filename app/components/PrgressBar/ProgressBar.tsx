import React from 'react';
import {ProgressBarProps} from '../../interfaces/progressBar.interface';
import CircularProgressBar from './Components/CircularProgressBar';
import GradientProgressBar from './Components/GradientProgressBar';
import LinearProgressBar from './Components/LinearProgressBar';

/**
 *
 * @param radius:radius of the circle
 *
 * @param strokeWidth: strokeWidth of the circle
 *
 * @param duration: duration to complete the circulation
 *
 * @param delay: delay to start the circular motion
 *
 * @param value: value is the number
 *
 * @param max: max is the maxmum number
 *
 * @param color: color is the stroke color
 *
 * @param isPercentage: to show the % symbol
 *
 * @param type: to select the type of progress bar
 *
 * @param height: height of the linear progress bar;
 *
 * @param textStyle: text style of the prograss bar
 *
 * @param activeBackgroundColor: background color of the moving view
 *
 * @param inactiveBackgroundColor: background color of the fixed view
 *
 * @param contentContainerStyle: To style the container view
 *
 * @param gradientColors: gradientColors is the stroke gradient color
 *
 * @returns ProgressBar.
 */

const ProgressBar = ({
  radius,
  strokeWidth,
  duration,
  delay,
  value,
  max,
  color,
  isPercentage,
  type,
  height,
  textStyle,
  activeBackgroundColor,
  inactiveBackgroundColor,
  contentContainerStyle,
  gradientColors,
}: ProgressBarProps) => {
  return type === 'circular' || type === 'gradient' ? (
    <CircularProgressBar
      contentContainerStyle={contentContainerStyle}
      radius={radius}
      color={color}
      strokeWidth={strokeWidth}
      isPercentage={isPercentage}
      textStyle={textStyle}
      type={type}
      height={height}
      value={value}
      max={max}
      duration={duration}
      delay={delay}
      gradientColors={gradientColors}
    />
  ) : (
    <LinearProgressBar
      contentContainerStyle={contentContainerStyle}
      isPercentage={isPercentage}
      textStyle={textStyle}
      height={height}
      max={max}
      value={value}
      type={type}
      activeBackgroundColor={activeBackgroundColor}
      inactiveBackgroundColor={inactiveBackgroundColor}
    />
  );
};

export default ProgressBar;
