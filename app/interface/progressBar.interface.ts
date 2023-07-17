import {TextStyle, ViewStyle} from 'react-native';

export interface ProgressBarProps {
  /**
   * radius: radius of the circle
   */
  radius?: number;

  /**
   * strokeWidth: strokeWidth of the circle
   */
  strokeWidth?: number;

  /**
   * duration: duration to complete the circulation
   */
  duration?: number;

  /**
   * delay: delay to start the circular motion
   */
  delay?: number;

  /**
   * value: value is the number
   */
  value?: number;

  /**
   * max: max is the maxmum number
   */
  max?: number;

  /**
   * color: color is the stroke color
   */
  color?: string;

  /**
   * gradientColors: gradientColors is the stroke gradient color
   */
  gradientColors?: string[];

  /**
   * isPercentage: to show the % symbol
   */
  isPercentage?: boolean;

  /**
   * type: to select the type of progress bar
   */
  type?: '' | 'linear' | 'circular' | 'gradient';

  /**
   * height: height of the linear progress bar
   */
  height?: number;

  /**
   * text style of the prograss bar
   */

  indicator?: string;

  /**
   * activeBackgroundColor: background color of the moving view
   */
  activeBackgroundColor?: string;

  /**
   * inactiveBackgroundColor: background color of the fixed view
   */
  inactiveBackgroundColor?: string;

  /**
   * contentContainerStyle: To style the container view.
   */
  contentContainerStyle?: ViewStyle;
}
