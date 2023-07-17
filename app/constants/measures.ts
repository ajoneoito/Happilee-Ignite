import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
/**
 * This code calculates the diagonal length of a screen given its width and height,
 * by finding the square of the hypotenuse and taking the square root of the result.
 * The final answer is rounded to 2 decimal places.
 * Used as a screen responsive const.
 */
let diagonal = parseFloat(
  Math.sqrt(width * width + height * height).toFixed(2),
);

const SCREEN_HEIGHT = height;
const IS_IPHONE_X = SCREEN_HEIGHT >= 812;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 40 : 20) : 20;
const barHeight =
  Platform.OS === 'ios' ? STATUS_BAR_HEIGHT * 1.2 : diagonal * 0.06;
const measures = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  dgl: diagonal,
  barHeight: barHeight,
  button_width: width * 0.9,
  button_padding: 10,
  button_height: diagonal * 0.073,
};

export default measures;
